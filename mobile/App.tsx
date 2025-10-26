import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi, bookingsApi, servicesApi, shopsApi } from './src/api/client';

interface Booking {
  id: number;
  customer_name: string;
  pet_name: string;
  pet_type: string;
  pet_breed: string;
  appointment_date: string;
  status: string;
  service: {
    name: string;
    price: number;
  };
}

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  category: string;
}

type TabType = 'bookings' | 'services' | 'hours' | 'profile';

interface DayHours {
  open: string;
  close: string;
  is_closed: boolean;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [token, setToken] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('bookings');
  const [shopProfile, setShopProfile] = useState<any>(null);
  const [businessHours, setBusinessHours] = useState<Record<string, DayHours>>({
    monday: { open: '09:00', close: '17:00', is_closed: false },
    tuesday: { open: '09:00', close: '17:00', is_closed: false },
    wednesday: { open: '09:00', close: '17:00', is_closed: false },
    thursday: { open: '09:00', close: '17:00', is_closed: false },
    friday: { open: '09:00', close: '17:00', is_closed: false },
    saturday: { open: '10:00', close: '15:00', is_closed: false },
    sunday: { open: '10:00', close: '15:00', is_closed: true },
  });
  const [autoApprove, setAutoApprove] = useState(true);
  const [bufferMinutes, setBufferMinutes] = useState(15);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const savedToken = await AsyncStorage.getItem('token');
      if (savedToken) {
        setToken(savedToken);
        setIsLoggedIn(true);
        loadData(savedToken);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadData = async (authToken: string) => {
    loadBookings(authToken);
    loadServices(authToken);
    loadProfile(authToken);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await authApi.login(email, password);
      await AsyncStorage.setItem('token', response.access_token);
      setToken(response.access_token);
      setIsLoggedIn(true);
      loadData(response.access_token);
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
    setToken('');
    setBookings([]);
    setServices([]);
  };

  const loadBookings = async (authToken: string) => {
    try {
      const data = await bookingsApi.getMyBookings(authToken);
      setBookings(data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    }
  };

  const loadServices = async (authToken: string) => {
    try {
      const profile = await shopsApi.getMyProfile(authToken);
      const data = await servicesApi.getByShop(profile.slug);
      setServices(data);
    } catch (error) {
      console.error('Failed to load services:', error);
    }
  };

  const loadProfile = async (authToken: string) => {
    try {
      const data = await shopsApi.getMyProfile(authToken);
      setShopProfile(data);
      
      // Load business hours if they exist
      if (data.business_hours) {
        try {
          const hours = JSON.parse(data.business_hours);
          setBusinessHours(hours);
        } catch (e) {
          console.error('Failed to parse business hours');
        }
      }
      
      if (data.auto_approve_bookings !== undefined) {
        setAutoApprove(data.auto_approve_bookings);
      }
      if (data.booking_buffer_minutes !== undefined) {
        setBufferMinutes(data.booking_buffer_minutes);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  const handleSaveBusinessHours = async () => {
    try {
      await shopsApi.updateBusinessHours({
        ...businessHours,
        auto_approve_bookings: autoApprove,
        booking_buffer_minutes: bufferMinutes,
      }, token);
      Alert.alert('Success!', 'Business hours saved successfully ✓');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleUpdateStatus = async (bookingId: number, status: string) => {
    try {
      await bookingsApi.update(bookingId, { status }, token);
      loadBookings(token);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleDeleteService = async (serviceId: number) => {
    Alert.alert(
      'Delete Service',
      'Are you sure you want to delete this service?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await servicesApi.delete(serviceId, token);
              loadServices(token);
            } catch (error: any) {
              Alert.alert('Error', error.message);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.title}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loginContainer}>
          <Text style={styles.logo}>🐾 PetCareBooker</Text>
          <Text style={styles.subtitle}>Groomer Dashboard</Text>
          
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🐾 {shopProfile?.business_name || 'Dashboard'}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'bookings' && styles.activeTab]}
          onPress={() => setActiveTab('bookings')}
        >
          <Text style={[styles.tabText, activeTab === 'bookings' && styles.activeTabText]}>
            📅 Bookings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'services' && styles.activeTab]}
          onPress={() => setActiveTab('services')}
        >
          <Text style={[styles.tabText, activeTab === 'services' && styles.activeTabText]}>
            ✂️ Services
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'hours' && styles.activeTab]}
          onPress={() => setActiveTab('hours')}
        >
          <Text style={[styles.tabText, activeTab === 'hours' && styles.activeTabText]}>
            ⏰ Hours
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
          onPress={() => setActiveTab('profile')}
        >
          <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>
            🏪 Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {activeTab === 'bookings' && (
          <>
            {bookings.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>📅</Text>
                <Text style={styles.emptyTitle}>No bookings yet</Text>
                <Text style={styles.emptyText}>New bookings will appear here</Text>
              </View>
            ) : (
              bookings.map((booking) => (
                <View key={booking.id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{booking.customer_name}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
                      <Text style={[styles.statusText, { color: getStatusTextColor(booking.status) }]}>
                        {booking.status}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={styles.cardInfo}>🐕 {booking.pet_name} • {booking.pet_breed}</Text>
                  <Text style={styles.cardInfo}>📋 {booking.service.name} • ${booking.service.price}</Text>
                  <Text style={styles.cardDate}>📅 {new Date(booking.appointment_date).toLocaleString()}</Text>

                  {booking.status === 'pending' && (
                    <View style={styles.actionButtons}>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.approveButton]}
                        onPress={() => handleUpdateStatus(booking.id, 'confirmed')}
                      >
                        <Text style={styles.actionButtonText}>✓ Approve</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.denyButton]}
                        onPress={() => handleUpdateStatus(booking.id, 'cancelled')}
                      >
                        <Text style={styles.actionButtonText}>✕ Deny</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {booking.status === 'confirmed' && (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.completeButton]}
                      onPress={() => handleUpdateStatus(booking.id, 'completed')}
                    >
                      <Text style={styles.actionButtonText}>Mark Complete</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))
            )}
          </>
        )}

        {activeTab === 'services' && (
          <>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => Alert.alert('Add Service', 'Use the web dashboard to add services for now')}
            >
              <Text style={styles.addButtonText}>+ Add Service</Text>
            </TouchableOpacity>

            {services.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>✂️</Text>
                <Text style={styles.emptyTitle}>No services yet</Text>
                <Text style={styles.emptyText}>Add services via web dashboard</Text>
              </View>
            ) : (
              services.map((service) => (
                <View key={service.id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{service.name}</Text>
                    <Text style={styles.priceText}>${service.price}</Text>
                  </View>
                  {service.description && (
                    <Text style={styles.cardInfo}>{service.description}</Text>
                  )}
                  <Text style={styles.cardInfo}>⏱️ {service.duration_minutes} minutes</Text>
                  {service.category && (
                    <Text style={styles.categoryBadge}>{service.category}</Text>
                  )}
                  <TouchableOpacity
                    style={[styles.actionButton, styles.denyButton, { marginTop: 8 }]}
                    onPress={() => handleDeleteService(service.id)}
                  >
                    <Text style={styles.actionButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </>
        )}

        {activeTab === 'hours' && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>⏰ Business Hours</Text>
              <Text style={styles.cardInfo}>Set your availability for customer bookings</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Booking Settings</Text>
              
              <View style={styles.settingRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingLabel}>Auto-Approve Bookings</Text>
                  <Text style={styles.settingDescription}>Bookings are instantly confirmed (Booksy-style)</Text>
                </View>
                <TouchableOpacity
                  style={[styles.toggle, autoApprove && styles.toggleActive]}
                  onPress={() => setAutoApprove(!autoApprove)}
                >
                  <View style={[styles.toggleCircle, autoApprove && styles.toggleCircleActive]} />
                </TouchableOpacity>
              </View>

              <View style={styles.settingRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingLabel}>Buffer Time: {bufferMinutes} min</Text>
                  <Text style={styles.settingDescription}>Time between appointments</Text>
                </View>
              </View>
              <View style={styles.bufferButtons}>
                {[0, 15, 30, 45].map((min) => (
                  <TouchableOpacity
                    key={min}
                    style={[styles.bufferButton, bufferMinutes === min && styles.bufferButtonActive]}
                    onPress={() => setBufferMinutes(min)}
                  >
                    <Text style={[styles.bufferButtonText, bufferMinutes === min && styles.bufferButtonTextActive]}>
                      {min}m
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {Object.entries(businessHours).map(([day, hours]) => (
              <View key={day} style={styles.card}>
                <View style={styles.dayHeader}>
                  <Text style={styles.dayName}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
                  <TouchableOpacity
                    style={[styles.toggle, !hours.is_closed && styles.toggleActive]}
                    onPress={() => setBusinessHours(prev => ({
                      ...prev,
                      [day]: { ...prev[day], is_closed: !prev[day].is_closed }
                    }))}
                  >
                    <View style={[styles.toggleCircle, !hours.is_closed && styles.toggleCircleActive]} />
                  </TouchableOpacity>
                </View>

                {!hours.is_closed && (
                  <View style={styles.timeInputs}>
                    <View style={styles.timeInputGroup}>
                      <Text style={styles.timeLabel}>Open</Text>
                      <TextInput
                        style={styles.timeInput}
                        value={hours.open}
                        onChangeText={(text) => setBusinessHours(prev => ({
                          ...prev,
                          [day]: { ...prev[day], open: text }
                        }))}
                        placeholder="09:00"
                      />
                    </View>
                    <Text style={styles.timeSeparator}>to</Text>
                    <View style={styles.timeInputGroup}>
                      <Text style={styles.timeLabel}>Close</Text>
                      <TextInput
                        style={styles.timeInput}
                        value={hours.close}
                        onChangeText={(text) => setBusinessHours(prev => ({
                          ...prev,
                          [day]: { ...prev[day], close: text }
                        }))}
                        placeholder="17:00"
                      />
                    </View>
                  </View>
                )}

                {hours.is_closed && (
                  <Text style={styles.closedText}>Closed</Text>
                )}
              </View>
            ))}

            <TouchableOpacity style={styles.button} onPress={handleSaveBusinessHours}>
              <Text style={styles.buttonText}>💾 Save Business Hours</Text>
            </TouchableOpacity>
          </>
        )}

        {activeTab === 'profile' && shopProfile && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Business Profile</Text>
            <View style={styles.profileRow}>
              <Text style={styles.profileLabel}>Business Name:</Text>
              <Text style={styles.profileValue}>{shopProfile.business_name}</Text>
            </View>
            {shopProfile.description && (
              <View style={styles.profileRow}>
                <Text style={styles.profileLabel}>Description:</Text>
                <Text style={styles.profileValue}>{shopProfile.description}</Text>
              </View>
            )}
            <View style={styles.profileRow}>
              <Text style={styles.profileLabel}>Location:</Text>
              <Text style={styles.profileValue}>{shopProfile.city}, {shopProfile.state}</Text>
            </View>
            <View style={styles.profileRow}>
              <Text style={styles.profileLabel}>Owner:</Text>
              <Text style={styles.profileValue}>{shopProfile.owner_name}</Text>
            </View>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => Alert.alert('Edit Profile', 'Use the web dashboard at localhost:3000/dashboard to edit your profile')}
            >
              <Text style={styles.buttonText}>Edit on Web Dashboard</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'pending': return '#FEF3C7';
    case 'confirmed': return '#D1FAE5';
    case 'completed': return '#DBEAFE';
    case 'cancelled': return '#FEE2E2';
    default: return '#F3F4F6';
  }
}

function getStatusTextColor(status: string) {
  switch (status) {
    case 'pending': return '#92400E';
    case 'confirmed': return '#065F46';
    case 'completed': return '#1E40AF';
    case 'cancelled': return '#991B1B';
    default: return '#374151';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 48,
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  button: {
    backgroundColor: '#9333EA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#9333EA',
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#9333EA',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  cardInfo: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
    marginTop: 4,
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9333EA',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E7FF',
    color: '#3730A3',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#10B981',
  },
  denyButton: {
    backgroundColor: '#EF4444',
  },
  completeButton: {
    backgroundColor: '#3B82F6',
    marginTop: 12,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
  addButton: {
    backgroundColor: '#9333EA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileRow: {
    marginBottom: 16,
  },
  profileLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  profileValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#6B7280',
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#D1D5DB',
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#9333EA',
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
  toggleCircleActive: {
    alignSelf: 'flex-end',
  },
  bufferButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  bufferButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  bufferButtonActive: {
    borderColor: '#9333EA',
    backgroundColor: '#F3E8FF',
  },
  bufferButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  bufferButtonTextActive: {
    color: '#9333EA',
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  timeInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeInputGroup: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 6,
  },
  timeInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },
  timeSeparator: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 20,
  },
  closedText: {
    fontSize: 16,
    color: '#DC2626',
    fontStyle: 'italic',
  },
});
