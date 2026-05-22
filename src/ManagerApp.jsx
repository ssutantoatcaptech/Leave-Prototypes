import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ManagerPortalLayout from './features/manager-view/ManagerPortalLayout';
import AbsenceCalendarPage from './features/manager-view/AbsenceCalendarPage';
import MyTeamPage from './features/manager-view/MyTeamPage';
import MyActionsPage from './features/manager-view/MyActionsPage';
import EmployeeDetailPage from './features/manager-view/EmployeeDetailPage';
import ReturnToWorkWizardPage from './features/manager-view/ReturnToWorkWizardPage';
import ManagerSupportPage from './features/manager-view/SupportPage';

const PASS = 'absencemanager2026!';
const SESSION_KEY = 'manager_portal_auth';

function PasswordGate({ children }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true');
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (input === PASS) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setAuthed(true);
    } else {
      setError(true);
    }
  }

  if (authed) return children;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f7fa', fontFamily: 'Source Sans Pro, sans-serif' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '48px 40px', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', maxWidth: 380, width: '100%', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 700, color: '#1e293b' }}>Manager Portal</h2>
        <p style={{ margin: '0 0 24px', fontSize: 14, color: '#64748b' }}>Enter the password to continue.</p>
        <input
          type="password"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(false); }}
          placeholder="Password"
          autoFocus
          style={{ width: '100%', padding: '12px 14px', fontSize: 15, border: `1.5px solid ${error ? '#dc2626' : '#d1d5db'}`, borderRadius: 8, outline: 'none', boxSizing: 'border-box' }}
        />
        {error && <p style={{ margin: '8px 0 0', fontSize: 13, color: '#dc2626' }}>Incorrect password. Please try again.</p>}
        <button type="submit" style={{ marginTop: 16, width: '100%', padding: '12px', fontSize: 15, fontWeight: 600, background: '#105fa8', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Continue</button>
      </form>
    </div>
  );
}

export default function ManagerApp() {
  return (
    <PasswordGate>
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
    </PasswordGate>
  );
}
