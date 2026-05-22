import { Navigate, Route, Routes } from 'react-router-dom';
import ManagerPortalLayout from './features/manager-view/ManagerPortalLayout';
import AbsenceCalendarPage from './features/manager-view/AbsenceCalendarPage';
import MyTeamPage from './features/manager-view/MyTeamPage';
import MyActionsPage from './features/manager-view/MyActionsPage';
import EmployeeDetailPage from './features/manager-view/EmployeeDetailPage';
import ReturnToWorkWizardPage from './features/manager-view/ReturnToWorkWizardPage';
import ManagerSupportPage from './features/manager-view/SupportPage';

export default function ManagerApp() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/manager/absence-calendar" replace />} />
      <Route path="/manager" element={<ManagerPortalLayout />}>
        <Route index element={<Navigate to="/manager/absence-calendar" replace />} />
        <Route path="absence-calendar" element={<AbsenceCalendarPage />} />
        <Route path="my-team" element={<MyTeamPage />} />
        <Route path="my-team/:employeeId" element={<EmployeeDetailPage />} />
        <Route path="my-actions" element={<MyActionsPage />} />
        <Route path="return-to-work" element={<ReturnToWorkWizardPage />} />
        <Route path="support" element={<ManagerSupportPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/manager/absence-calendar" replace />} />
    </Routes>
  );
}
