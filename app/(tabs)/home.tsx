import React, { useState, useEffect } from 'react';
import { Mic, Search } from 'lucide-react';

const calmingSentences = [
  "Breathe deeply, find your center.",
  "You are exactly where you need to be.",
  "This moment is your own, embrace it.",
  "Let go of what you cannot change.",
  "Find peace in the present moment.",
  "Your thoughts are clouds passing in the sky.",
  "Inhale calm, exhale tension.",
  "You are stronger than you know.",
  "Each breath brings new beginnings.",
  "Be gentle with yourself today."
];

export default function HomePage() {
  const [currentSentence, setCurrentSentence] = useState(calmingSentences[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * calmingSentences.length);
      setCurrentSentence(calmingSentences[randomIndex]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: '#7e22ce',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    background: 'linear-gradient(to bottom, #f5f3ff, #ede9fe)'
  };

  const imageFrameStyle: React.CSSProperties = {
    borderRadius: '9999px',
    backgroundColor: 'white',
    padding: '0.75rem',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '-2rem',
    zIndex: 10
  };

  const innerCircleStyle: React.CSSProperties = {
    borderRadius: '9999px',
    backgroundColor: '#f3e8ff',
    height: '96px',
    width: '96px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem'
  };

  const sentenceBoxStyle: React.CSSProperties = {
    maxWidth: '28rem',
    width: '100%',
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    position: 'relative',
    border: '4px solid #c084fc',
    paddingTop: '2.5rem',
    marginTop: '5rem'
  };

  const glowStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: '0.75rem',
    backgroundColor: '#c084fc',
    opacity: 0.5,
    filter: 'blur(10px)',
    zIndex: -1
  };

  const sentenceStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    color: '#7e22ce',
    fontStyle: 'italic',
    fontWeight: 300,
    minHeight: '4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const footerStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '1rem',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
  };

  const buttonRowStyle: React.CSSProperties = {
    maxWidth: '28rem',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-around'
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#a855f7',
    color: 'white',
    fontWeight: 500,
    padding: '0.5rem 1.5rem',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  };

  const spectButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#c084fc'
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', fontFamily: 'serif' }}>EmoTune</h1>
      </header>

      <main style={mainStyle}>
        <div style={imageFrameStyle}>
          <div style={innerCircleStyle}>😌</div>
        </div>

        <div style={sentenceBoxStyle}>
          <div style={glowStyle}></div>
          <p style={sentenceStyle}>"{currentSentence}"</p>
        </div>
      </main>

      <div style={footerStyle}>
        <div style={buttonRowStyle}>
          <button
            style={buttonStyle}
            onClick={() => console.log('Speak clicked')}
          >
            <Mic size={20} />
            <span>Speak</span>
          </button>

          <button
            style={spectButtonStyle}
            onClick={() => console.log('Spect clicked')}
          >
            <Search size={20} />
            <span>Spect</span>
          </button>
        </div>
      </div>
    </div>
  );
}
