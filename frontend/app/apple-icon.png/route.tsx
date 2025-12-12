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
        {/* Paw print - 5 circles positioned absolutely */}
        {/* Bottom main pad - largest, centered at bottom */}
        <div style={{ position: 'absolute', bottom: '25px', left: '50%', transform: 'translateX(-50%)', width: '55px', height: '55px', borderRadius: '50%', backgroundColor: 'white' }} />
        {/* Middle two pads - side by side, above bottom pad */}
        <div style={{ position: 'absolute', bottom: '60px', left: '50px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white' }} />
        <div style={{ position: 'absolute', bottom: '60px', right: '50px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white' }} />
        {/* Top two pads - toes, above middle pads, spread wider */}
        <div style={{ position: 'absolute', bottom: '95px', left: '60px', width: '35px', height: '35px', borderRadius: '50%', backgroundColor: 'white' }} />
        <div style={{ position: 'absolute', bottom: '95px', right: '60px', width: '35px', height: '35px', borderRadius: '50%', backgroundColor: 'white' }} />
      </div>
    ),
    {
      width: 180,
      height: 180,
    }
  );
}

