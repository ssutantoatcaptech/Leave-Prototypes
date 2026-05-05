import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import OverviewReactPage from './features/overview/OverviewReactPage';
import PlanAbsenceReactPage from './features/plan-absence/PlanAbsenceReactPage';
import RequestLeaveReactPage from './features/request-leave/RequestLeaveReactPage';
import AbsenceDetailsReactPage from './features/absence-details/AbsenceDetailsReactPage';
import AbsenceHistoryReactPage from './features/absence-history/AbsenceHistoryReactPage';
import ReturnToWorkPage from './features/return-to-work/ReturnToWorkPage';
import MyLeavesPage from './features/my-leaves/MyLeavesPage';
import LeaveDocumentsPage from './features/leave-documents/LeaveDocumentsPage';
import LeaveDetailPage from './features/leave-detail/LeaveDetailPage';
import LeaveDetailV2Page from './features/leave-detail/LeaveDetailV2Page';
import LeaveDetailV2bPage from './features/leave-detail/LeaveDetailV2bPage';
import LeaveDetailV2cPage from './features/leave-detail/LeaveDetailV2cPage';
import LeaveDetailV2dPage from './features/leave-detail/LeaveDetailV2dPage';
import LeaveDetailV2ePage from './features/leave-detail/LeaveDetailV2ePage';
import LeaveDetailV2fPage from './features/leave-detail/LeaveDetailV2fPage';
import LeaveDetailV3Page from './features/leave-detail/LeaveDetailV3Page';
import LeaveDetailV3bPage from './features/leave-detail/LeaveDetailV3bPage';
import LeaveDetailV3cPage from './features/leave-detail/LeaveDetailV3cPage';
import LeaveDetailSupplementalPage from './features/leave-detail/LeaveDetailSupplementalPage';
import LeavePaymentsPage from './features/leave-detail/LeavePaymentsPage';

function Home() {
  return (
    <main className="app-shell app-home">
      <section className="home-panel">
        <p className="app-eyebrow">Leave Management</p>
        <h1>Experience Prototype</h1>
        <p className="app-description">
          Select an experience below to explore.
        </p>

        <div className="route-grid">
          <NavLink className="route-card" to="/overview-react">
            <span className="route-card-label">Prototype</span>
            <strong className="route-card-title">Working Prototype</strong>
            <span className="route-card-meta">Interactive leave management experience with full navigation</span>
          </NavLink>

          <div className="route-card route-card--disabled">
            <span className="route-card-label">Testing</span>
            <strong className="route-card-title">User Testing</strong>
            <span className="route-card-meta">Coming soon — link will be provided</span>
          </div>

          <div className="route-card route-card--disabled">
            <span className="route-card-label">New</span>
            <strong className="route-card-title">Claims and Leave</strong>
            <span className="route-card-meta">Coming soon</span>
          </div>
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
    location.pathname.includes('/return-to-work') ||
    location.pathname.startsWith('/leave-detail') ||
    location.pathname === '/supplemental-health' ||
    location.pathname === '/leave-payments';
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
        <Route path="/my-leaves" element={<MyLeavesPage />} />
        <Route path="/leave-documents" element={<LeaveDocumentsPage />} />
        <Route path="/absence-details/:caseId/return-to-work" element={<ReturnToWorkPage />} />
        <Route path="/leave-detail" element={<LeaveDetailPage />} />
        <Route path="/leave-detail-v2" element={<LeaveDetailV2Page />} />
        <Route path="/leave-detail-v2b" element={<LeaveDetailV2bPage />} />
        <Route path="/leave-detail-v2c" element={<LeaveDetailV2cPage />} />
        <Route path="/leave-detail-v2d" element={<LeaveDetailV2dPage />} />
        <Route path="/leave-detail-v2e" element={<LeaveDetailV2ePage />} />
        <Route path="/leave-detail-v2f" element={<LeaveDetailV2fPage />} />
        <Route path="/leave-detail-v3" element={<LeaveDetailV3Page />} />
        <Route path="/leave-detail-v3b" element={<LeaveDetailV3bPage />} />
        <Route path="/leave-detail-v3c" element={<LeaveDetailV3cPage />} />
        <Route path="/supplemental-health" element={<LeaveDetailSupplementalPage />} />
        <Route path="/leave-payments" element={<LeavePaymentsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
