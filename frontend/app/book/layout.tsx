import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book an Appointment - PetCareBooker',
  description: 'Book a pet grooming appointment with trusted groomers near you. Select your pet, choose a groomer, and schedule your appointment online.',
  alternates: {
    canonical: 'https://www.petcarebooker.com/book',
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

