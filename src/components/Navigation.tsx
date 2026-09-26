//

const Navigation = () => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      padding: '1.5rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 50,
      mixBlendMode: 'difference'
    }}>
      <div className="font-mono text-tiny" style={{ letterSpacing: '0.1em' }}>
        ANUNAY_NAMAN
      </div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {['WORK', 'ABOUT', 'LAB'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} className="font-mono text-tiny" style={{
            opacity: 0.7,
            transition: 'opacity 0.2s',
          }}
          onMouseOver={e => (e.currentTarget.style.opacity = '1')}
          onMouseOut={e => (e.currentTarget.style.opacity = '0.7')}
          >
            [{item}]
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
