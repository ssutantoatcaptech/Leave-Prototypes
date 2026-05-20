import { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import './manager-view.css';

export default function ManagerLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
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

  useEffect(function () {
    setMobileNavOpen(false);
  }, [location.pathname]);

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
          <button
            className="mgr-hamburger"
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            {mobileNavOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
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

      {/* Mobile full-screen nav overlay */}
      {mobileNavOpen && (
        <div className="mgr-mobile-nav-overlay">
          <button className="mgr-mobile-nav-close" aria-label="Close menu" onClick={() => setMobileNavOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="#0f0f14" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="mgr-mobile-nav-brand">
            <span className="mgr-mobile-nav-brand-name">my<strong>Mutual</strong></span>
            <span className="mgr-mobile-nav-brand-tag">Manager Portal</span>
          </div>
          <div className="mgr-mobile-nav-primary">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) => `mgr-mobile-nav-item${isActive ? ' mgr-mobile-nav-item--active' : ''}`}
                onClick={() => setMobileNavOpen(false)}
              >
                <span>{link.label}</span>
                {link.badge && <span className="mgr-mobile-nav-badge" />}
              </NavLink>
            ))}
          </div>
          <div className="mgr-mobile-nav-utility">
            <button className="mgr-mobile-nav-utility-item" onClick={() => setMobileNavOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 20 22" fill="none"><path d="M10 1c-1.5 0-2.8.6-3.8 1.5C5.2 3.6 4.5 5.2 4.5 7v4.5L3 13.5V15h14v-1.5l-1.5-2V7c0-1.8-.7-3.4-1.7-4.5C12.8 1.6 11.5 1 10 1z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/><path d="M7.5 15v.5a2.5 2.5 0 005 0V15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <span>Notifications</span>
            </button>
            <button className="mgr-mobile-nav-utility-item" onClick={() => { setMobileNavOpen(false); navigate('/claims-and-leave'); }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8 7h12M8 12h12M8 17h12M4 7h0M4 12h0M4 17h0" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
              <span>Employee View</span>
            </button>
            <button className="mgr-mobile-nav-utility-item" onClick={() => setMobileNavOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="white" strokeWidth="1.5"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <span>Profile</span>
            </button>
            <button className="mgr-mobile-nav-utility-item" onClick={() => setMobileNavOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 2h7v7M12 2L2 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      <Outlet />
      <footer className="mgr-footer">
        <div className="mgr-footer-inner">
          <span className="mgr-footer-brand">my<strong>Mutual</strong></span>
        </div>
      </footer>
    </div>
  );
}
