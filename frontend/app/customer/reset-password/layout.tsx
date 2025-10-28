import { Suspense } from 'react';

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    }>
      {children}
    </Suspense>
  );
}
