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
          {/* Improved paw print - more defined for 32x32 */}
          {/* Bottom main pad - largest (ellipse) */}
          <div
            style={{
              position: 'absolute',
              bottom: '4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '16px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
          {/* Middle left pad */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '2px',
              width: '11px',
              height: '11px',
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
          {/* Middle right pad */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '2px',
              width: '11px',
              height: '11px',
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
          {/* Top left pad */}
          <div
            style={{
              position: 'absolute',
              bottom: '18px',
              left: '5px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
          {/* Top right pad */}
          <div
            style={{
              position: 'absolute',
              bottom: '18px',
              right: '5px',
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

