import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
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
        {/* Paw print - 5 circles positioned absolutely */}
        {/* Bottom main pad - largest */}
        <div style={{ position: 'absolute', bottom: '45px', left: '50%', transform: 'translateX(-50%)', width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'white' }} />
        {/* Middle two pads */}
        <div style={{ position: 'absolute', bottom: '75px', left: '60px', width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'white' }} />
        <div style={{ position: 'absolute', bottom: '75px', right: '60px', width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'white' }} />
        {/* Top two pads */}
        <div style={{ position: 'absolute', bottom: '100px', left: '75px', width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'white' }} />
        <div style={{ position: 'absolute', bottom: '100px', right: '75px', width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'white' }} />
      </div>
    ),
    {
      ...size,
    }
  );
}

