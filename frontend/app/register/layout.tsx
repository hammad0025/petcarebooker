import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create an Account | PetCareBooker',
  description: 'Create your PetCareBooker account to save pets, manage appointments, and book faster.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://www.petcarebooker.com/register',
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

