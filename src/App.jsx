import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import OverviewReactPage from './features/overview/OverviewReactPage';
import PlanAbsenceReactPage from './features/plan-absence/PlanAbsenceReactPage';
import RequestLeaveReactPage from './features/request-leave/RequestLeaveReactPage';
import AbsenceDetailsReactPage from './features/absence-details/AbsenceDetailsReactPage';
import AbsenceHistoryReactPage from './features/absence-history/AbsenceHistoryReactPage';
import ReturnToWorkPage from './features/return-to-work/ReturnToWorkPage';
import MyLeavesPage from './features/my-leaves/MyLeavesPage';
import LeaveDocumentsPage from './features/leave-documents/LeaveDocumentsPage';

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

          <NavLink className="route-card" to="/plan-absence">
            <span className="route-card-label">Plan Absence</span>
            <strong className="route-card-title">React Flow</strong>
            <span className="route-card-meta">React version of the original plan-absence wizard and welcome state</span>
          </NavLink>

          <NavLink className="route-card" to="/wizard">
            <span className="route-card-label">Leave Intake</span>
            <strong className="route-card-title">React Wizard</strong>
            <span className="route-card-meta">Fully React leave-intake flow with no embedded HTML iframe</span>
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
            Leave Wizard
          </NavLink>
          <NavLink className="app-nav-link" to="/overview-react">
            Overview React
          </NavLink>
          <NavLink className="app-nav-link" to="/plan-absence">
            Plan for Absence
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
  const hideAppNav =
    location.pathname === '/overview-react' ||
    location.pathname === '/absence-history' ||
    location.pathname === '/request-leave-react' ||
    location.pathname === '/wizard' ||
    location.pathname === '/plan-absence' ||
    location.pathname === '/my-leaves' ||
    location.pathname === '/leave-documents' ||
    location.pathname.startsWith('/absence-details/') ||
    location.pathname.includes('/return-to-work');
  return (
    <>
      {!hideAppNav && <AppNav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<Navigate to="/overview-react" replace />} />
        <Route path="/overview-react" element={<OverviewReactPage />} />
        <Route path="/absence-history" element={<AbsenceHistoryReactPage />} />
        <Route path="/absence-details/:caseId" element={<AbsenceDetailsReactPage />} />
        <Route path="/plan-absence" element={<PlanAbsenceReactPage />} />
        <Route path="/request-leave-react" element={<RequestLeaveReactPage />} />
        <Route path="/wizard" element={<RequestLeaveReactPage />} />
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
        <Route path="/my-leaves" element={<MyLeavesPage />} />
        <Route path="/leave-documents" element={<LeaveDocumentsPage />} />
        <Route path="/absence-details/:caseId/return-to-work" element={<ReturnToWorkPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
