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
  { label: 'Manage My Absences', to: '/claims-and-leave/enter-time' },
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
              : tab.to === '/claims-and-leave/my-cases'
              ? location.pathname === '/claims-and-leave/my-cases' || location.pathname === '/claims-and-leave/case-detail'
              : tab.to === '/claims-and-leave/leave-planning'
              ? location.pathname.startsWith('/claims-and-leave/leave-planning')
              : tab.to === '/claims-and-leave/file-claim'
              ? location.pathname.startsWith('/claims-and-leave/file-claim')
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

      {/* Footer */}
      <footer className="cl-footer">
        <div className="cl-footer-inner">
          <div className="cl-footer-grid">
            <div className="cl-footer-col">
              <h4 className="cl-footer-heading">Resources</h4>
              <a href="#" className="cl-footer-link">Leave Policies</a>
              <a href="#" className="cl-footer-link">FAQs</a>
              <a href="#" className="cl-footer-link">Forms &amp; Documents</a>
            </div>
            <div className="cl-footer-col">
              <h4 className="cl-footer-heading">Support</h4>
              <a href="#" className="cl-footer-link">Contact Us</a>
              <a href="#" className="cl-footer-link">Help Center</a>
              <a href="#" className="cl-footer-link">Report an Issue</a>
            </div>
            <div className="cl-footer-col">
              <h4 className="cl-footer-heading">Legal</h4>
              <a href="#" className="cl-footer-link">Privacy Policy</a>
              <a href="#" className="cl-footer-link">Terms of Use</a>
              <a href="#" className="cl-footer-link">Accessibility</a>
            </div>
            <div className="cl-footer-col">
              <h4 className="cl-footer-heading">Contact</h4>
              <a href="#" className="cl-footer-link">Phone: 1-800-555-1234</a>
              <a href="#" className="cl-footer-link">Email: benefits@company.com</a>
              <a href="#" className="cl-footer-link">Hours: Mon–Fri, 8am–6pm EST</a>
            </div>
          </div>
          <div className="cl-footer-bottom">
            <span>&copy; 2026 Benefits Hub. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
