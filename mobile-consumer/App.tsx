import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shopsApi, servicesApi, bookingsApi, customerApi } from './src/api/client';

interface Shop {
  id: number;
  business_name: string;
  slug: string;
  city: string;
  state: string;
  description: string;
}

interface Service {
  id: number;
  name: string;
  price: number;
  duration_minutes: number;
}

type Screen = 'browse' | 'shopDetail' | 'booking' | 'login';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('browse');
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);
  const [customerToken, setCustomerToken] = useState('');

  useEffect(() => {
    loadShops();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('customerToken');
    if (token) {
      setCustomerToken(token);
    }
  };

  const loadShops = async () => {
    try {
      const data = await shopsApi.getAll();
      setShops(data);
    } catch (error) {
      console.error('Failed to load shops:', error);
    }
  };

  const handleShopSelect = async (shop: Shop) => {
    try {
      setSelectedShop(shop);
      const serviceData = await servicesApi.getByShop(shop.slug);
      setServices(serviceData);
      setCurrentScreen('shopDetail');
    } catch (error) {
      Alert.alert('Error', 'Failed to load shop details');
    }
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setCurrentScreen('booking');
  };

  const handleBooking = async (customerName: string, phone: string, email: string, petName: string, petType: string) => {
    if (!selectedShop || !selectedService) return;

    try {
      setLoading(true);
      await bookingsApi.create(selectedShop.slug, {
        service_id: selectedService.id,
        customer_name: customerName,
        customer_phone: phone,
        customer_email: email,
        pet_name: petName,
        pet_type: petType,
        appointment_date: new Date().toISOString(),
      });
      Alert.alert('Success!', 'Booking confirmed! ✅', [
        { text: 'OK', onPress: () => setCurrentScreen('browse') }
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (currentScreen === 'browse') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🐾 Find Groomers</Text>
          {customerToken ? (
            <Text style={styles.headerSubtitle}>Welcome back!</Text>
          ) : (
            <TouchableOpacity onPress={() => setCurrentScreen('login')}>
              <Text style={styles.loginButton}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <ScrollView style={styles.content}>
          {shops.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🐶</Text>
              <Text style={styles.emptyTitle}>No groomers found</Text>
              <Text style={styles.emptyText}>Check back soon!</Text>
            </View>
          ) : (
            shops.map((shop) => (
              <TouchableOpacity
                key={shop.id}
                style={styles.shopCard}
                onPress={() => handleShopSelect(shop)}
              >
                <Text style={styles.shopEmoji}>🐕</Text>
                <View style={styles.shopInfo}>
                  <Text style={styles.shopName}>{shop.business_name}</Text>
                  <Text style={styles.shopLocation}>📍 {shop.city}, {shop.state}</Text>
                  {shop.description && (
                    <Text style={styles.shopDescription} numberOfLines={2}>{shop.description}</Text>
                  )}
                </View>
                <Text style={styles.arrow}>→</Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (currentScreen === 'shopDetail' && selectedShop) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('browse')}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{selectedShop.business_name}</Text>
          <View style={{width: 60}} />
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.sectionTitle}>Select a Service</Text>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => handleServiceSelect(service)}
            >
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDuration}>⏱️ {service.duration_minutes} min</Text>
              </View>
              <Text style={styles.servicePrice}>${service.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (currentScreen === 'booking' && selectedService && selectedShop) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('shopDetail')}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Appointment</Text>
          <View style={{width: 60}} />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.bookingForm}>
            <Text style={styles.formTitle}>✂️ {selectedService.name}</Text>
            <Text style={styles.formSubtitle}>${selectedService.price} • {selectedService.duration_minutes} min</Text>
            
            <BookingForm 
              onSubmit={handleBooking}
              loading={loading}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return <View style={styles.container}><Text>Loading...</Text></View>;
}

function BookingForm({ onSubmit, loading }: any) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('dog');

  return (
    <>
      <Text style={styles.inputLabel}>Your Name</Text>
      <TextInput
        style={styles.input}
        value={customerName}
        onChangeText={setCustomerName}
        placeholder="John Doe"
      />

      <Text style={styles.inputLabel}>Phone</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="(555) 123-4567"
        keyboardType="phone-pad"
      />

      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.inputLabel}>Pet Name</Text>
      <TextInput
        style={styles.input}
        value={petName}
        onChangeText={setPetName}
        placeholder="Max"
      />

      <Text style={styles.inputLabel}>Pet Type</Text>
      <View style={styles.petTypeContainer}>
        <TouchableOpacity
          style={[styles.petTypeButton, petType === 'dog' && styles.petTypeButtonActive]}
          onPress={() => setPetType('dog')}
        >
          <Text style={[styles.petTypeText, petType === 'dog' && styles.petTypeTextActive]}>🐕 Dog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.petTypeButton, petType === 'cat' && styles.petTypeButtonActive]}
          onPress={() => setPetType('cat')}
        >
          <Text style={[styles.petTypeText, petType === 'cat' && styles.petTypeTextActive]}>🐈 Cat</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.bookButton, loading && styles.bookButtonDisabled]}
        onPress={() => onSubmit(customerName, phone, email, petName, petType)}
        disabled={loading || !customerName || !phone || !email || !petName}
      >
        <Text style={styles.bookButtonText}>
          {loading ? 'Booking...' : '✓ Confirm Booking'}
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#9333EA',
    padding: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'white',
  },
  backButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  loginButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
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
  shopCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shopEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  shopInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  shopLocation: {
    fontSize: 14,
    color: '#9333EA',
    marginBottom: 4,
  },
  shopDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  arrow: {
    fontSize: 24,
    color: '#9333EA',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  serviceDuration: {
    fontSize: 14,
    color: '#6B7280',
  },
  servicePrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9333EA',
  },
  bookingForm: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  petTypeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  petTypeButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  petTypeButtonActive: {
    borderColor: '#9333EA',
    backgroundColor: '#F3E8FF',
  },
  petTypeText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  petTypeTextActive: {
    color: '#9333EA',
  },
  bookButton: {
    backgroundColor: '#9333EA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
