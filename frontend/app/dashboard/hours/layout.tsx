import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard – Business Hours | PetCareBooker',
  description: 'Manage your business hours and availability settings.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BusinessHoursLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

