import { ImageResponse } from 'next/og';

export const size = {
  width: 512,
  height: 512,
};

export const contentType = 'image/png';

export default function Icon() {
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
        {/* Professional paw print with better proportions */}
        <div style={{ position: 'relative', width: '280px', height: '280px' }}>
          {/* Bottom main pad - larger, more natural */}
          <div style={{ 
            position: 'absolute', 
            bottom: '0px', 
            left: '140px', 
            width: '160px', 
            height: '130px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }} />
          {/* Middle left pad */}
          <div style={{ 
            position: 'absolute', 
            bottom: '110px', 
            left: '60px', 
            width: '110px', 
            height: '110px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 3px 10px rgba(0,0,0,0.15)'
          }} />
          {/* Middle right pad */}
          <div style={{ 
            position: 'absolute', 
            bottom: '110px', 
            right: '60px', 
            width: '110px', 
            height: '110px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 3px 10px rgba(0,0,0,0.15)'
          }} />
          {/* Top left pad */}
          <div style={{ 
            position: 'absolute', 
            bottom: '200px', 
            left: '100px', 
            width: '95px', 
            height: '95px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 3px 10px rgba(0,0,0,0.15)'
          }} />
          {/* Top right pad */}
          <div style={{ 
            position: 'absolute', 
            bottom: '200px', 
            right: '100px', 
            width: '95px', 
            height: '95px', 
            borderRadius: '50%', 
            backgroundColor: 'white',
            boxShadow: '0 3px 10px rgba(0,0,0,0.15)'
          }} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

