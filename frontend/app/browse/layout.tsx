import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Pet Groomers Near You | PetCareBooker',
  description: 'Browse and book trusted pet groomers in your area. Compare prices, read reviews, and book instantly with verified professionals.',
  alternates: {
    canonical: 'https://www.petcarebooker.com/browse',
  },
  openGraph: {
    title: 'Find Pet Groomers Near You | PetCareBooker',
    description: 'Browse and book trusted pet groomers in your area. Compare prices, read reviews, and book instantly.',
    url: 'https://www.petcarebooker.com/browse',
    type: 'website',
  },
};

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

