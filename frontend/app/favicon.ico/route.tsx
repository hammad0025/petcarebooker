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
          {/* Paw print - 5 circles - larger sizes for 32x32 */}
          {/* Bottom main pad - largest */}
          <div
            style={{
              position: 'absolute',
              bottom: '6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
          {/* Middle two pads */}
          <div
            style={{
              position: 'absolute',
              bottom: '14px',
              left: '4px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '14px',
              right: '4px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
          {/* Top two pads */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '7px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '7px',
              width: '10px',
              height: '10px',
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

