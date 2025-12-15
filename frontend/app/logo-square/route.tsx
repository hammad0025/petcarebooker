import { ImageResponse } from 'next/og';

// Generate 1080x1080 square logo with text for Instagram profile/posts
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #9333ea 50%, #ec4899 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '80px',
        }}
      >
        {/* Paw print icon - larger and more defined */}
        <div style={{ position: 'relative', width: '400px', height: '400px', marginBottom: '60px' }}>
          {/* Bottom main pad (ellipse for natural shape) */}
          <div style={{ position: 'absolute', bottom: '0px', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '160px', borderRadius: '50%', backgroundColor: 'white' }} />
          {/* Middle left pad */}
          <div style={{ position: 'absolute', bottom: '120px', left: '60px', width: '140px', height: '140px', borderRadius: '50%', backgroundColor: 'white' }} />
          {/* Middle right pad */}
          <div style={{ position: 'absolute', bottom: '120px', right: '60px', width: '140px', height: '140px', borderRadius: '50%', backgroundColor: 'white' }} />
          {/* Top left pad */}
          <div style={{ position: 'absolute', bottom: '240px', left: '100px', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'white' }} />
          {/* Top right pad */}
          <div style={{ position: 'absolute', bottom: '240px', right: '100px', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'white' }} />
        </div>
        
        {/* Text */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '72px', fontWeight: 'bold', color: 'white', marginBottom: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            PetCareBooker
          </div>
          <div style={{ fontSize: '32px', color: 'white', opacity: 0.9, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Booking Software for Groomers
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1080,
    }
  );
}

