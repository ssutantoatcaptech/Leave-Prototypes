import { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import './manager-view.css';

export default function ManagerLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(function () {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return function () { document.removeEventListener('mousedown', handleClickOutside); };
  }, []);

  const navLinks = [
    { label: 'Absence Calendar', to: '/manager/absence-calendar' },
    { label: 'My Team', to: '/manager/my-team' },
    { label: 'My Actions', to: '/manager/my-actions', badge: true },
    { label: 'Return to Work', to: '/manager/return-to-work' },
    { label: 'Support', to: '/manager/support' },
  ];

  return (
    <div className="mgr-shell">
      <div className="mgr-header-wrapper">
      <header className="mgr-header">
        <div className="mgr-header-left">
          <span className="mgr-header-brand">my<strong>Mutual</strong></span>
          <span className="mgr-header-badge">Manager</span>
          <nav className="mgr-header-nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {link.label}
                {link.badge && <span className="mgr-nav-badge" />}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="mgr-header-right">
          <button className="mgr-header-bell" aria-label="Notifications">
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
              <path d="M9 1c-1.3 0-2.5.5-3.3 1.3C4.8 3.2 4.2 4.7 4.2 6.2v4L3 12.2V13.5h12v-1.3l-1.2-2V6.2c0-1.5-.6-3-1.5-4C11.5 1.5 10.3 1 9 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M6.8 13.5v.3a2.2 2.2 0 004.4 0v-.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <div className={`mgr-avatar-dropdown${profileOpen ? ' open' : ''}`} ref={profileRef}>
            <button className="mgr-header-avatar" type="button" onClick={() => setProfileOpen(!profileOpen)}>
              <span className="mgr-avatar-circle">SJ</span>
              <span className="mgr-avatar-name">Sarah Johnson - Manager</span>
            </button>
            <div className="mgr-avatar-dropdown-menu">
              <div className="mgr-avatar-dropdown-header">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4-4M2 7l4 4M2 7h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Accounts
              </div>
              <button className="mgr-avatar-dropdown-account" type="button" onClick={() => { setProfileOpen(false); navigate('/claims-and-leave'); }}>
                <span className="mgr-avatar-circle">SJ</span>
                <div className="mgr-avatar-dropdown-account-info">
                  <strong>Sarah Johnson</strong>
                  <span>Employee Account</span>
                </div>
              </button>
              <button className="mgr-avatar-dropdown-account" type="button" onClick={() => setProfileOpen(false)}>
                <span className="mgr-avatar-circle">SJ</span>
                <div className="mgr-avatar-dropdown-account-info">
                  <strong>Sarah Johnson - Manager</strong>
                  <span>Manager Account</span>
                </div>
                <span className="mgr-avatar-dropdown-selected">
                  Selected <svg viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </button>
              <div className="mgr-avatar-dropdown-divider" />
              <button className="mgr-avatar-dropdown-item" type="button" onClick={() => setProfileOpen(false)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2h7v7M12 2L2 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>
      </div>
      <Outlet />
      <footer className="mgr-footer">
        <div className="mgr-footer-inner">
          <div className="mgr-footer-left">
            <span className="mgr-footer-brand">Mutual of Omaha</span>
            <span className="mgr-footer-divider" />
            <span className="mgr-footer-text">Manager Portal</span>
          </div>
          <div className="mgr-footer-right">
            <a href="#" className="mgr-footer-link">Privacy Policy</a>
            <a href="#" className="mgr-footer-link">Terms of Use</a>
            <a href="#" className="mgr-footer-link">Contact Support</a>
          </div>
        </div>
        <div className="mgr-footer-inner mgr-footer-bottom">
          <span className="mgr-footer-copyright">&copy; {new Date().getFullYear()} Mutual of Omaha Insurance Company. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
