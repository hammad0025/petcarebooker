import { NextResponse } from 'next/server';
import { ImageResponse } from 'next/og';

// Generate favicon.ico - browsers will accept PNG for .ico requests
export async function GET() {
  try {
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
          }}
        >
          {/* Paw print - 5 circles */}
          {/* Bottom main pad */}
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
          {/* Middle two pads */}
          <div
            style={{
              position: 'absolute',
              bottom: '18px',
              left: '6px',
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '18px',
              right: '6px',
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
          {/* Top two pads */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '9px',
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '9px',
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
        </div>
      ),
      {
        width: 32,
        height: 32,
      }
    );
  } catch (error) {
    console.error('Error generating favicon:', error);
    // Fallback: redirect to SVG
    return NextResponse.redirect(new URL('/favicon.svg', 'https://www.petcarebooker.com'));
  }
}

