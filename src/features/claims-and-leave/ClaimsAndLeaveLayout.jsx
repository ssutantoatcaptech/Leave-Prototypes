import { NavLink, Outlet, useLocation } from 'react-router-dom';
import './claims-and-leave.css';

const navLinks = [
  { label: 'Dashboard', to: '/' },
  { label: 'Benefits', to: '#' },
  { label: 'Claims & Leave', to: '/claims-and-leave' },
  { label: 'Documents', to: '#' },
  { label: 'Support', to: '#' },
];

const subNavTabs = [
  { label: 'Claim Center', to: '/claims-and-leave' },
  { label: 'File a Claim or Leave', to: '/claims-and-leave/file-claim' },
  { label: 'My Cases', to: '/claims-and-leave/my-cases' },
  { label: 'Leave Planning Tool', to: '/claims-and-leave/leave-planning' },
  { label: 'Enter My Time', to: '/claims-and-leave/enter-time' },
  { label: 'Payments', to: '/claims-and-leave/payments' },
];

export default function ClaimsAndLeaveLayout() {
  const location = useLocation();

  return (
    <div className="cl-layout">
      {/* Top header bar */}
      <header className="cl-header">
        <div className="cl-header-inner">
          <div className="cl-header-left">
            <NavLink to="/" className="cl-brand">Benefits Hub</NavLink>
            <nav className="cl-main-nav">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) =>
                    `cl-main-nav-link${link.to === '/claims-and-leave' && location.pathname.startsWith('/claims-and-leave') ? ' cl-main-nav-link--active' : isActive && link.to !== '#' ? ' cl-main-nav-link--active' : ''}`
                  }
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="cl-header-right">
            <button className="cl-header-action">ID Cards</button>
            <button className="cl-header-action">Messages</button>
            <button className="cl-header-icon-btn" aria-label="Notifications">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 18a2 2 0 01-2-2h4a2 2 0 01-2 2zm6-4V9a6 6 0 10-12 0v5l-1.5 1.5V16h15v-.5L16 14z" fill="currentColor"/>
              </svg>
            </button>
            <div className="cl-avatar">
              <span className="cl-avatar-circle">SJ</span>
              <span className="cl-avatar-name">Sarah Johnson</span>
            </div>
          </div>
        </div>
      </header>

      {/* Sub-navigation tabs */}
      <nav className="cl-subnav">
        <div className="cl-subnav-inner">
          {subNavTabs.map((tab) => {
            const isActive = tab.to === '/claims-and-leave'
              ? location.pathname === '/claims-and-leave' || location.pathname === '/claims-and-leave/dental'
              : location.pathname === tab.to;
            return (
              <NavLink
                key={tab.label}
                to={tab.to}
                className={`cl-subnav-tab${isActive ? ' cl-subnav-tab--active' : ''}`}
                end={tab.to === '/claims-and-leave'}
              >
                {tab.label}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Page content */}
      <main className="cl-main">
        <Outlet />
      </main>
    </div>
  );
}
