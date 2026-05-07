import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import OverviewReactPage from './features/overview/OverviewReactPage';
import PlanAbsenceReactPage from './features/plan-absence/PlanAbsenceReactPage';
import RequestLeaveReactPage from './features/request-leave/RequestLeaveReactPage';
import AbsenceDetailsReactPage from './features/absence-details/AbsenceDetailsReactPage';
import AbsenceHistoryReactPage from './features/absence-history/AbsenceHistoryReactPage';
import ReturnToWorkPage from './features/return-to-work/ReturnToWorkPage';
import ReturnToWorkEmbeddedPage from './features/return-to-work/ReturnToWorkEmbeddedPage';
import ReturnToWorkPregnancyEmbeddedPage from './features/return-to-work/ReturnToWorkPregnancyEmbeddedPage';
import LeaveDetailPregnancyPage from './features/leave-detail/LeaveDetailPregnancyPage';
import LeaveDetailCaregiverPage from './features/leave-detail/LeaveDetailCaregiverPage';
import ReturnToWorkCaregiverEmbeddedPage from './features/return-to-work/ReturnToWorkCaregiverEmbeddedPage';
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
import LeaveDetailNewCasePage from './features/leave-detail/LeaveDetailNewCasePage';
import LeavePaymentsPage from './features/leave-detail/LeavePaymentsPage';

import ClaimsAndLeaveLayout from './features/claims-and-leave/ClaimsAndLeaveLayout';
import ClaimCenterPage from './features/claims-and-leave/ClaimCenterPage';
import FileClaimPage from './features/claims-and-leave/FileClaimPage';
import DentalClaimsPage from './features/claims-and-leave/DentalClaimsPage';
import ClaimsMyLeavesPage from './features/claims-and-leave/MyLeavesPage';
import MyCasesPage from './features/claims-and-leave/MyCasesPage';
import LeavePlanningPage from './features/claims-and-leave/LeavePlanningPage';
import EnterMyTimePage from './features/claims-and-leave/EnterMyTimePage';
import PaymentsPage from './features/claims-and-leave/PaymentsPage';
import DashboardPage from './features/claims-and-leave/DashboardPage';
import StdClaimDetailPage from './features/claims-and-leave/StdClaimDetailPage';
import MobileFrameWrapper from './features/claims-and-leave/MobileFrameWrapper';

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

          <NavLink className="route-card" to="/claims-and-leave">
            <span className="route-card-label">New</span>
            <strong className="route-card-title">Claims and Leave (desktop)</strong>
            <span className="route-card-meta">Benefits hub with claims tracking, leave management, and payments</span>
          </NavLink>

          <NavLink className="route-card" to="/claims-and-leave-mobile/dashboard">
            <span className="route-card-label">New</span>
            <strong className="route-card-title">New Claims and Leave (mobile)</strong>
            <span className="route-card-meta">Mobile-optimized claims and leave experience</span>
          </NavLink>
        </div>
      </section>
    </main>
  );
}


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/claims-and-leave/file-claim" replace />} />
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

        {/* Claims & Leave Mobile — mirrors desktop, wrapped in mobile phone frame */}
        <Route path="/claims-and-leave-mobile/dashboard" element={<MobileFrameWrapper><DashboardPage /></MobileFrameWrapper>} />
        <Route path="/claims-and-leave-mobile" element={<MobileFrameWrapper><ClaimsAndLeaveLayout /></MobileFrameWrapper>}>
          <Route index element={<DentalClaimsPage />} />
          <Route path="claims" element={<ClaimCenterPage />} />
          <Route path="file-claim" element={<FileClaimPage />} />
          <Route path="file-claim/request-leave" element={<RequestLeaveReactPage />} />
          <Route path="dental" element={<DentalClaimsPage />} />
          <Route path="my-leaves" element={<ClaimsMyLeavesPage />} />
          <Route path="my-cases" element={<MyCasesPage />} />
          <Route path="leave-planning" element={<LeavePlanningPage />} />
          <Route path="leave-planning/wizard" element={<PlanAbsenceReactPage />} />
          <Route path="enter-time" element={<EnterMyTimePage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="case-detail" element={<LeaveDetailV2ePage />} />
          <Route path="case-detail/return-to-work" element={<ReturnToWorkEmbeddedPage />} />
          <Route path="case-detail-new" element={<LeaveDetailNewCasePage />} />
          <Route path="case-detail-pregnancy" element={<LeaveDetailPregnancyPage />} />
          <Route path="case-detail-pregnancy/return-to-work" element={<ReturnToWorkPregnancyEmbeddedPage />} />
          <Route path="case-detail-caregiver" element={<LeaveDetailCaregiverPage />} />
          <Route path="case-detail-caregiver/return-to-work" element={<ReturnToWorkCaregiverEmbeddedPage />} />
          <Route path="std-claim-detail" element={<StdClaimDetailPage />} />
        </Route>

        {/* Claims & Leave Dashboard (standalone, no subnav) */}
        <Route path="/claims-and-leave/dashboard" element={<DashboardPage />} />

        {/* Claims & Leave section */}
        <Route path="/claims-and-leave" element={<ClaimsAndLeaveLayout />}>
          <Route index element={<DentalClaimsPage />} />
          <Route path="claims" element={<ClaimCenterPage />} />
          <Route path="file-claim" element={<FileClaimPage />} />
          <Route path="file-claim/request-leave" element={<RequestLeaveReactPage />} />
          <Route path="dental" element={<DentalClaimsPage />} />
          <Route path="my-leaves" element={<ClaimsMyLeavesPage />} />
          <Route path="my-cases" element={<MyCasesPage />} />
          <Route path="leave-planning" element={<LeavePlanningPage />} />
          <Route path="leave-planning/wizard" element={<PlanAbsenceReactPage />} />
          <Route path="enter-time" element={<EnterMyTimePage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="case-detail" element={<LeaveDetailV2ePage />} />
          <Route path="case-detail/return-to-work" element={<ReturnToWorkEmbeddedPage />} />
          <Route path="case-detail-new" element={<LeaveDetailNewCasePage />} />
          <Route path="case-detail-pregnancy" element={<LeaveDetailPregnancyPage />} />
          <Route path="case-detail-pregnancy/return-to-work" element={<ReturnToWorkPregnancyEmbeddedPage />} />
          <Route path="case-detail-caregiver" element={<LeaveDetailCaregiverPage />} />
          <Route path="case-detail-caregiver/return-to-work" element={<ReturnToWorkCaregiverEmbeddedPage />} />
          <Route path="std-claim-detail" element={<StdClaimDetailPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/claims-and-leave/file-claim" replace />} />
      </Routes>
    </>
  );
}
