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
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: 200,
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          🐾
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            fontFamily: 'system-ui',
            letterSpacing: '-0.02em',
          }}
        >
          PCB
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

