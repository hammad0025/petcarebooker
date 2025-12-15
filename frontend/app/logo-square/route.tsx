import { ImageResponse } from 'next/og';

export const contentType = 'image/png';
export const runtime = 'edge';

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
        {/* Professional paw print icon */}
        <div style={{ position: 'relative', width: '500px', height: '500px', marginBottom: '60px' }}>
          {/* Bottom main pad */}
          <div style={{ 
            position: 'absolute', 
            bottom: '0px', 
            left: '250px', 
            width: '280px', 
            height: '230px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
          }} />
          {/* Middle left pad */}
          <div style={{ 
            position: 'absolute', 
            bottom: '190px', 
            left: '100px', 
            width: '200px', 
            height: '200px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
          }} />
          {/* Middle right pad */}
          <div style={{ 
            position: 'absolute', 
            bottom: '190px', 
            right: '100px', 
            width: '200px', 
            height: '200px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
          }} />
          {/* Top left pad */}
          <div style={{ 
            position: 'absolute', 
            bottom: '360px', 
            left: '180px', 
            width: '170px', 
            height: '170px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
          }} />
          {/* Top right pad */}
          <div style={{ 
            position: 'absolute', 
            bottom: '360px', 
            right: '180px', 
            width: '170px', 
            height: '170px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
          }} />
        </div>
        
        {/* Text */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '72px', fontWeight: 'bold', color: 'white', marginBottom: '20px', fontFamily: 'system-ui, -apple-system, sans-serif', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
            PetCareBooker
          </div>
          <div style={{ fontSize: '32px', color: 'white', opacity: 0.95, fontFamily: 'system-ui, -apple-system, sans-serif', textShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
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

