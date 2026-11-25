import React from 'react';

export default class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background:
              'radial-gradient(circle at 65% 35%, rgba(34,211,238,0.18), transparent 45%), #040714',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: '24px',
            color: '#94a3b8',
            fontSize: '0.8rem',
          }}
        >
          <span>3D WebGL viewport unavailable on this device — interactive HUD active.</span>
        </div>
      );
    }
    return this.props.children;
  }
}
