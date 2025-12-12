import { NextResponse } from 'next/server';
import { ImageResponse } from 'next/og';

// Generate favicon.ico as a PNG (browsers accept PNG for .ico requests)
export async function GET() {
  const image = new ImageResponse(
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
        }}
      >
        {/* Paw print - 5 circles positioned absolutely */}
        {/* Bottom main pad - largest */}
        <div style={{ position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'white' }} />
        {/* Middle two pads */}
        <div style={{ position: 'absolute', bottom: '160px', left: '140px', width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'white' }} />
        <div style={{ position: 'absolute', bottom: '160px', right: '140px', width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'white' }} />
        {/* Top two pads */}
        <div style={{ position: 'absolute', bottom: '240px', left: '180px', width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'white' }} />
        <div style={{ position: 'absolute', bottom: '240px', right: '180px', width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'white' }} />
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  );

  return new NextResponse(image.body, {
    headers: {
      'Content-Type': 'image/x-icon',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

