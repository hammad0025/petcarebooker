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
        {/* Professional paw print for 180x180 */}
        <div style={{ position: 'relative', width: '140px', height: '140px', display: 'block' }}>
          {/* Bottom main pad */}
          <div style={{ 
            position: 'absolute', 
            bottom: '0px', 
            left: '70px', 
            width: '80px', 
            height: '65px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 3px 8px rgba(0,0,0,0.15)'
          }} />
          {/* Middle left pad */}
          <div style={{ 
            position: 'absolute', 
            bottom: '55px', 
            left: '30px', 
            width: '55px', 
            height: '55px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }} />
          {/* Middle right pad */}
          <div style={{ 
            position: 'absolute', 
            bottom: '55px', 
            right: '30px', 
            width: '55px', 
            height: '55px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }} />
          {/* Top left pad */}
          <div style={{ 
            position: 'absolute', 
            bottom: '100px', 
            left: '50px', 
            width: '48px', 
            height: '48px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }} />
          {/* Top right pad */}
          <div style={{ 
            position: 'absolute', 
            bottom: '100px', 
            right: '50px', 
            width: '48px', 
            height: '48px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }} />
        </div>
      </div>
    ),
    {
      width: 180,
      height: 180,
    }
  );
}

