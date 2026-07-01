export default function TabProfile({ profile }) {
  if (!profile?.description) return <div style={{ padding: '32px 20px', fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: .35 }}>No company description available.</div>;
  return (
    <div style={{ padding: '20px', fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.7, color: 'var(--color-ink)', opacity: .75 }}>
      {profile.description}
    </div>
  );
}
