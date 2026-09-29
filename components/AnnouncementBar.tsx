'use client';

export default function AnnouncementBar() {
  const text = "✨ Instant Response 11am-11pm • Trusted & Verified • Delivery Time is 45 minutes✨";
  const repeatedText = `${text} • ${text} • ${text} • ${text} • ${text} • ${text} • ${text} • ${text}`;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
        backgroundColor: '#111111',
        color: '#ffffff',
        padding: '8px 0',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      <div
        style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          animation: 'marquee 30s linear infinite'
        }}
      >
        <span style={{ fontSize: '12px sm:14px', fontWeight: 'bold' }}>
          {repeatedText}
        </span>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
