import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Endless Reply - Never Miss Another Lead';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M11 1L3 12H10L9 19L17 8H10L11 1Z"
                fill="white"
              />
            </svg>
          </div>
          <span
            style={{
              fontSize: '36px',
              fontWeight: 700,
              color: '#1e293b',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Endless Reply
          </span>
        </div>

        {/* Main headline */}
        <h1
          style={{
            fontSize: '64px',
            fontWeight: 800,
            color: '#0f172a',
            textAlign: 'center',
            lineHeight: 1.1,
            margin: '0 0 24px 0',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Never Miss Another Lead
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: '28px',
            color: '#475569',
            textAlign: 'center',
            margin: 0,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          AI-powered 24/7 phone, email & chat agents
        </p>

        {/* Stats bar */}
        <div
          style={{
            display: 'flex',
            gap: '48px',
            marginTop: '48px',
            padding: '24px 48px',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '36px', fontWeight: 700, color: '#2563eb' }}>80-230%</span>
            <span style={{ fontSize: '16px', color: '#64748b' }}>More Revenue</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '36px', fontWeight: 700, color: '#2563eb' }}>24/7</span>
            <span style={{ fontSize: '16px', color: '#64748b' }}>Availability</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '36px', fontWeight: 700, color: '#2563eb' }}>&lt;3 min</span>
            <span style={{ fontSize: '16px', color: '#64748b' }}>Response Time</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
