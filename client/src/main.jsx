import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles.css';

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="fatal-error">
          <div className="fatal-card">
            <div className="fatal-logo">J</div>
            <h1>JobNest couldn't load</h1>
            <p>The frontend started, but a browser error stopped the page from rendering.</p>
            <pre>{this.state.error?.message || 'Unknown frontend error'}</pre>
            <button onClick={() => window.location.reload()}>Reload JobNest</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppErrorBoundary>
  </React.StrictMode>
);
