import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
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
        }}
      >
        {/* Paw print - 5 circles */}
        <div style={{ position: 'relative', width: '24px', height: '24px' }}>
          {/* Bottom main pad */}
          <div style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'white' }} />
          {/* Middle two pads */}
          <div style={{ position: 'absolute', bottom: '6px', left: '4px', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'white' }} />
          <div style={{ position: 'absolute', bottom: '6px', right: '4px', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'white' }} />
          {/* Top two pads */}
          <div style={{ position: 'absolute', top: '2px', left: '6px', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'white' }} />
          <div style={{ position: 'absolute', top: '2px', right: '6px', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'white' }} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

