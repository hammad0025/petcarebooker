import { ImageResponse } from 'next/og';

// Generate 1080x566 horizontal logo with text for Instagram stories
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
          padding: '60px',
        }}
      >
        {/* Paw icon on left */}
        <div style={{ position: 'relative', width: '200px', height: '200px', marginRight: '40px' }}>
          {/* Bottom main pad (ellipse) */}
          <div style={{ position: 'absolute', bottom: '0px', left: '50%', transform: 'translateX(-50%)', width: '100px', height: '80px', borderRadius: '50%', backgroundColor: 'white' }} />
          {/* Middle left pad */}
          <div style={{ position: 'absolute', bottom: '60px', left: '20px', width: '70px', height: '70px', borderRadius: '50%', backgroundColor: 'white' }} />
          {/* Middle right pad */}
          <div style={{ position: 'absolute', bottom: '60px', right: '20px', width: '70px', height: '70px', borderRadius: '50%', backgroundColor: 'white' }} />
          {/* Top left pad */}
          <div style={{ position: 'absolute', bottom: '120px', left: '50px', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'white' }} />
          {/* Top right pad */}
          <div style={{ position: 'absolute', bottom: '120px', right: '50px', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'white' }} />
        </div>
        
        {/* Text on right */}
        <div>
          <div style={{ fontSize: '64px', fontWeight: 'bold', color: 'white', marginBottom: '16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            PetCareBooker
          </div>
          <div style={{ fontSize: '28px', color: 'white', opacity: 0.9, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Booking Software for Groomers
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 566,
    }
  );
}

