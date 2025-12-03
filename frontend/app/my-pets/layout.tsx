import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Pets | PetCareBooker',
  description: 'View and manage your saved pets and grooming appointments in your PetCareBooker account.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://www.petcarebooker.com/my-pets',
  },
};

export default function MyPetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

