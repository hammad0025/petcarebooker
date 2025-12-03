import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard – Services | PetCareBooker',
  description: 'Manage your grooming services and pricing.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

