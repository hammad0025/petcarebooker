import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 20 }}>🐾</div>
        <div style={{ fontSize: 60 }}>PetCareBooker</div>
        <div style={{ fontSize: 40, marginTop: 20, opacity: 0.9 }}>
          Book Pet Grooming in Seconds
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

