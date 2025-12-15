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
        {/* Improved paw print - more defined shape */}
        {/* Bottom main pad - largest (ellipse for natural shape) */}
        <div style={{ position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)', width: '140px', height: '110px', borderRadius: '50%', backgroundColor: 'white' }} />
        {/* Middle left pad */}
        <div style={{ position: 'absolute', bottom: '150px', left: '120px', width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'white' }} />
        {/* Middle right pad */}
        <div style={{ position: 'absolute', bottom: '150px', right: '120px', width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'white' }} />
        {/* Top left pad */}
        <div style={{ position: 'absolute', bottom: '220px', left: '160px', width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'white' }} />
        {/* Top right pad */}
        <div style={{ position: 'absolute', bottom: '220px', right: '160px', width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'white' }} />
      </div>
    ),
    {
      ...size,
    }
  );
}

