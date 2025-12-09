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
        {/* Paw print - 5 circles positioned absolutely */}
        {/* Bottom main pad - largest */}
        <div style={{ position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'white' }} />
        {/* Middle two pads */}
        <div style={{ position: 'absolute', bottom: '160px', left: '140px', width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'white' }} />
        <div style={{ position: 'absolute', bottom: '160px', right: '140px', width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'white' }} />
        {/* Top two pads */}
        <div style={{ position: 'absolute', bottom: '240px', left: '180px', width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'white' }} />
        <div style={{ position: 'absolute', bottom: '240px', right: '180px', width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'white' }} />
      </div>
    ),
    {
      ...size,
    }
  );
}

