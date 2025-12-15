import { NextResponse } from 'next/server';
import { ImageResponse } from 'next/og';

// Generate favicon.ico - browsers will accept PNG for .ico requests
export const runtime = 'edge';
export const contentType = 'image/x-icon';

export async function GET() {
  try {
    const response = new ImageResponse(
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
          {/* Professional paw print for 32x32 */}
          {/* Bottom main pad */}
          <div
            style={{
              position: 'absolute',
              bottom: '2px',
              left: '16px',
              width: '18px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
          {/* Middle left pad */}
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '2px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
          {/* Middle right pad */}
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '2px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
          {/* Top left pad */}
          <div
            style={{
              position: 'absolute',
              bottom: '18px',
              left: '6px',
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
              right: '6px',
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
    
    // Clone response and add headers for Google
    const headers = new Headers(response.headers);
    headers.set('Content-Type', 'image/x-icon');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  } catch (error) {
    console.error('Error generating favicon:', error);
    // Fallback: redirect to SVG
    return NextResponse.redirect(new URL('/favicon.svg', 'https://www.petcarebooker.com'));
  }
}

