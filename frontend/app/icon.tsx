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
        }}
      >
        {/* Simple paw print using circles */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Top two pads */}
          <div style={{ display: 'flex', gap: '60px', marginBottom: '20px' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'white',
              }}
            />
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'white',
              }}
            />
          </div>
          {/* Middle two pads */}
          <div style={{ display: 'flex', gap: '100px', marginBottom: '20px' }}>
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: 'white',
              }}
            />
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: 'white',
              }}
            />
          </div>
          {/* Bottom main pad */}
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

