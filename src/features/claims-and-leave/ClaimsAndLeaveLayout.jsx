import { NavLink, Outlet, useLocation } from 'react-router-dom';
import './claims-and-leave.css';

export default function ClaimsAndLeaveLayout() {
  const location = useLocation();
  const base = location.pathname.startsWith('/claims-and-leave-mobile') ? '/claims-and-leave-mobile' : '/claims-and-leave';

  const navLinks = [
    { label: 'Dashboard', to: `${base}/dashboard` },
    { label: 'Benefits', to: '#' },
    { label: 'Claims & Leave', to: base },
    { label: 'Documents', to: '#' },
    { label: 'Support', to: '#' },
  ];

  const subNavTabs = [
    { label: 'Claim Center', to: base },
    { label: 'File a Claim or Leave', to: `${base}/file-claim` },
    { label: 'My Cases', to: `${base}/my-cases` },
    { label: 'Leave Planning Tool', to: `${base}/leave-planning` },
    { label: 'Manage My Absences', to: `${base}/enter-time` },
    { label: 'Payments', to: `${base}/payments` },
  ];

  return (
    <div className="cl-layout">
      {/* Top header bar */}
      <header className="cl-header">
        <div className="cl-header-inner">
          <div className="cl-header-left">
            <NavLink to="/" className="cl-brand">Benefits Hub</NavLink>
            <nav className="cl-main-nav">
              {navLinks.map((link) => (
                link.label === 'Claims & Leave' ? (
                  <div key={link.label} className="cl-nav-dropdown">
                    <button
                      type="button"
                      className={`cl-main-nav-link cl-main-nav-link--btn${location.pathname.startsWith(base) ? ' cl-main-nav-link--active' : ''}`}
                    >
                      {link.label}
                      <svg className="cl-nav-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 4l2.5 2.5L7.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <div className="cl-nav-dropdown-menu">
                      {subNavTabs.map((tab) => (
                        <NavLink
                          key={tab.label}
                          to={tab.to}
                          className="cl-nav-dropdown-item"
                          end={tab.to === base}
                        >
                          {tab.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    className={({ isActive }) =>
                      `cl-main-nav-link${isActive && link.to !== '#' ? ' cl-main-nav-link--active' : ''}`
                    }
                    end={link.to === '/'}
                  >
                    {link.label}
                  </NavLink>
                )
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
            const isActive = tab.to === base
              ? location.pathname === base || location.pathname === `${base}/dental`
              : tab.to === `${base}/my-cases`
              ? location.pathname === `${base}/my-cases` || location.pathname.startsWith(`${base}/case-detail`)
              : tab.to === `${base}/leave-planning`
              ? location.pathname.startsWith(`${base}/leave-planning`)
              : tab.to === `${base}/file-claim`
              ? location.pathname.startsWith(`${base}/file-claim`)
              : location.pathname === tab.to;
            return (
              <NavLink
                key={tab.label}
                to={tab.to}
                className={`cl-subnav-tab${isActive ? ' cl-subnav-tab--active' : ''}`}
                end={tab.to === base}
              >
                {tab.label}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Page content */}
      <main className="cl-main">
        <Outlet context={{ base }} />
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
