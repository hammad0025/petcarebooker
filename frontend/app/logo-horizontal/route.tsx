import { ImageResponse } from 'next/og';

export const contentType = 'image/png';
export const runtime = 'edge';

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
        {/* Professional paw icon on left */}
        <div style={{ position: 'relative', width: '240px', height: '240px', marginRight: '50px' }}>
          {/* Bottom main pad */}
          <div style={{ 
            position: 'absolute', 
            bottom: '0px', 
            left: '120px', 
            width: '140px', 
            height: '115px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }} />
          {/* Middle left pad */}
          <div style={{ 
            position: 'absolute', 
            bottom: '95px', 
            left: '30px', 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 3px 10px rgba(0,0,0,0.2)'
          }} />
          {/* Middle right pad */}
          <div style={{ 
            position: 'absolute', 
            bottom: '95px', 
            right: '30px', 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 3px 10px rgba(0,0,0,0.2)'
          }} />
          {/* Top left pad */}
          <div style={{ 
            position: 'absolute', 
            bottom: '175px', 
            left: '70px', 
            width: '85px', 
            height: '85px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 3px 10px rgba(0,0,0,0.2)'
          }} />
          {/* Top right pad */}
          <div style={{ 
            position: 'absolute', 
            bottom: '175px', 
            right: '70px', 
            width: '85px', 
            height: '85px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 3px 10px rgba(0,0,0,0.2)'
          }} />
        </div>
        
        {/* Text on right */}
        <div>
          <div style={{ fontSize: '64px', fontWeight: 'bold', color: 'white', marginBottom: '16px', fontFamily: 'system-ui, -apple-system, sans-serif', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
            PetCareBooker
          </div>
          <div style={{ fontSize: '28px', color: 'white', opacity: 0.95, fontFamily: 'system-ui, -apple-system, sans-serif', textShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
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
