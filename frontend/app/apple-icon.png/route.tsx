import { ImageResponse } from 'next/og';

// Generate 180x180 apple-icon.png
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #9333ea 50%, #ec4899 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          borderRadius: '20%',
        }}
      >
        {/* Improved paw print - more defined shape for 180x180 */}
        {/* Bottom main pad - largest (ellipse for natural shape) */}
        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '65px', height: '50px', borderRadius: '50%', backgroundColor: 'white' }} />
        {/* Middle left pad */}
        <div style={{ position: 'absolute', bottom: '55px', left: '45px', width: '45px', height: '45px', borderRadius: '50%', backgroundColor: 'white' }} />
        {/* Middle right pad */}
        <div style={{ position: 'absolute', bottom: '55px', right: '45px', width: '45px', height: '45px', borderRadius: '50%', backgroundColor: 'white' }} />
        {/* Top left pad */}
        <div style={{ position: 'absolute', bottom: '90px', left: '55px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white' }} />
        {/* Top right pad */}
        <div style={{ position: 'absolute', bottom: '90px', right: '55px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white' }} />
      </div>
    ),
    {
      width: 180,
      height: 180,
    }
  );
}

