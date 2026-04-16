import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import OverviewReactPage from './features/overview/OverviewReactPage';

function FrameView({ eyebrow, title, description, src, standaloneLabel }) {
  return (
    <main className="app-shell">
      <header className="app-header">
        <div className="app-header-copy">
          <p className="app-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="app-description">{description}</p>
        </div>
        <a className="app-link" href={src} target="_blank" rel="noreferrer">
          {standaloneLabel}
        </a>
      </header>

      <section className="iframe-panel" aria-label={`${title} preview`}>
        <iframe className="wizard-frame" title={title} src={src} />
      </section>
    </main>
  );
}

function Home() {
  return (
    <main className="app-shell app-home">
      <section className="home-panel">
        <p className="app-eyebrow">React Views</p>
        <h1>Experience Prototype</h1>
        <p className="app-description">
          The original HTML experiences are now available as dedicated React routes. Choose a view below.
        </p>

        <div className="route-grid">
          <NavLink className="route-card" to="/overview-react">
            <span className="route-card-label">Overview</span>
            <strong className="route-card-title">React Decomposed</strong>
            <span className="route-card-meta">Structured React files with content preserved from the original overview</span>
          </NavLink>

          <NavLink className="route-card" to="/wizard">
            <span className="route-card-label">Leave Intake</span>
            <strong className="route-card-title">Wizard Flow</strong>
            <span className="route-card-meta">Original single-file experience embedded intact</span>
          </NavLink>

          <NavLink className="route-card" to="/coverage">
            <span className="route-card-label">Coverage</span>
            <strong className="route-card-title">Coverage Wireframe</strong>
            <span className="route-card-meta">Standalone coverage page view</span>
          </NavLink>
        </div>
      </section>
    </main>
  );
}

function AppNav() {
  return (
    <nav className="app-nav" aria-label="Prototype routes">
      <div className="app-nav-inner">
        <NavLink className="app-nav-brand" to="/">
          MOO Experience React
        </NavLink>
        <div className="app-nav-links">
          <NavLink className="app-nav-link" to="/">
            Home
          </NavLink>
          <NavLink className="app-nav-link" to="/wizard">
            Wizard
          </NavLink>
          <NavLink className="app-nav-link" to="/overview-react">
            Overview React
          </NavLink>
          <NavLink className="app-nav-link" to="/coverage">
            Coverage
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  const location = useLocation();
  const hideAppNav = location.pathname === '/overview-react';
  return (
    <>
      {!hideAppNav && <AppNav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview-react" element={<OverviewReactPage />} />
        <Route
          path="/wizard"
          element={
            <FrameView
              eyebrow="React Route"
              title="Leave Intake Wizard"
              description="This route preserves the full original HTML structure and interactions inside the React app."
              src="/leave-intake-wizard.html"
              standaloneLabel="Open standalone wizard"
            />
          }
        />
        <Route
          path="/coverage"
          element={
            <FrameView
              eyebrow="React Route"
              title="Coverage Wireframe"
              description="This route serves the low-fidelity coverage experience as its own dedicated React view."
              src="/coverage-wireframe.html"
              standaloneLabel="Open standalone coverage page"
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
