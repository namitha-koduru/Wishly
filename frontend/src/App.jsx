import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

// Placeholder view components for initial foundation
function HomePage() {
  return (
    <div className="card">
      <h2>Welcome to Whishly 🎉</h2>
      <p>Turn moments into unforgettable birthday memories with custom websites.</p>
      <div className="actions">
        <Link to="/templates" className="btn btn-primary">
          Explore Templates
        </Link>
      </div>
    </div>
  );
}

function TemplatesPage() {
  return (
    <div className="card">
      <h2>Select a Birthday Template 🎨</h2>
      <p>Choose a theme to personalize for the birthday person.</p>
      <div className="template-demo-list">
        <div className="template-card">
          <h3>Sample Template #1</h3>
          <p>Playful & Colorful theme</p>
          <Link to="/customize/sample-1" className="btn btn-outline">
            Customize This
          </Link>
        </div>
      </div>
    </div>
  );
}

function CustomizePage() {
  const { templateId } = useParams();
  return (
    <div className="card">
      <h2>Customize Template: <code>{templateId}</code> ✨</h2>
      <p>Enter the birthday person's name, upload photos, and craft personalized wishes.</p>
      <div className="actions">
        <Link to="/birthday/demo-project" className="btn btn-secondary">
          View Demo Birthday Page
        </Link>
      </div>
    </div>
  );
}

function BirthdayPage() {
  const { projectId } = useParams();
  return (
    <div className="card celebration-card">
      <h2>🎂 Happy Birthday!</h2>
      <p>Personalized birthday website preview for project ID: <code>{projectId}</code></p>
      <p className="subtext">Shareable birthday memories will be displayed here.</p>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="card">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">Go to Home</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="navbar">
          <div className="brand">
            <Link to="/" className="brand-logo">Whishly ✨</Link>
            <span className="brand-tagline">Turn moments into memories</span>
          </div>
          <nav className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/templates" className="nav-link">Templates</Link>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/customize/:templateId" element={<CustomizePage />} />
            <Route path="/birthday/:projectId" element={<BirthdayPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>Whishly &copy; {new Date().getFullYear()} — College Project Foundation</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
