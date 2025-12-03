import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | PetCareBooker',
  description: 'Login to your PetCareBooker account to manage your grooming business.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://www.petcarebooker.com/login',
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

