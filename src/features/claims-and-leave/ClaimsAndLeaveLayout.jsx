import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import './claims-and-leave.css';
import './responsive.css';

export default function ClaimsAndLeaveLayout() {
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const base = location.pathname.startsWith('/claims-and-leave-mobile') ? '/claims-and-leave-mobile' : '/claims-and-leave';

  const navLinks = [
    { label: 'Dashboard', to: `${base}/dashboard` },
    { label: 'Benefits', to: '#' },
    { label: 'Claims & Leave', to: base },
    { label: 'Documents', to: '#' },
    { label: 'Support', to: '#' },
  ];

  const subNavTabs = [
    { label: 'Claims Center', to: base },
    { label: 'File a Claim or Leave', to: `${base}/file-claim` },
    { label: 'My Cases', to: `${base}/my-cases` },
    { label: 'Leave Planning Tool', to: `${base}/leave-planning` },
    { label: 'Enter My Time', to: `${base}/enter-time` },
    { label: 'Payments', to: `${base}/payments` },
  ];

  return (
    <div className="cl-layout">
      {/* Top header bar */}
      <header className="cl-header">
        <div className="cl-header-inner">
          {/* Mobile: hamburger + brand */}
          <div className="cl-header-left">
            <button
              className="cl-hamburger"
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
            <NavLink to="/" className="cl-brand">Benefits Hub</NavLink>
            {/* Desktop nav */}
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
          {/* Right: utility icons + avatar */}
          <div className="cl-header-right">
            <button className="cl-header-action">ID Cards</button>
            <button className="cl-header-action">Messages</button>
            <button className="cl-header-icon-btn" aria-label="ID Cards">
              <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
                <rect x="1" y="1" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="10" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M5.5 16c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M17 7h4M17 10h4M17 13h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="cl-header-icon-btn cl-header-bell" aria-label="Notifications">
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                <path d="M10 1c-1.5 0-2.8.6-3.8 1.5C5.2 3.6 4.5 5.2 4.5 7v4.5L3 13.5V15h14v-1.5l-1.5-2V7c0-1.8-.7-3.4-1.7-4.5C12.8 1.6 11.5 1 10 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M7.5 15v.5a2.5 2.5 0 005 0V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="cl-bell-dot" />
            </button>
            <div className="cl-avatar">
              <span className="cl-avatar-circle">SJ</span>
              <span className="cl-avatar-name">Sarah Johnson</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile nav fullscreen overlay */}
      {mobileNavOpen && (
        <div className="cl-mobile-nav-overlay" aria-label="Mobile navigation">
          {/* Close button */}
          <button className="cl-mobile-nav-close" aria-label="Close menu" onClick={() => setMobileNavOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="#0f0f14" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Brand header */}
          <div className="cl-mobile-nav-brand">
            <span className="cl-mobile-nav-brand-name">Benefits Hub</span>
          </div>

          {/* Primary navigation */}
          <div className="cl-mobile-nav-primary">
            <NavLink to={`${base}/dashboard`} className="cl-mobile-nav-item" onClick={() => setMobileNavOpen(false)}>
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="#" className="cl-mobile-nav-item" onClick={() => setMobileNavOpen(false)}>
              <span>Benefits</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </NavLink>
            <NavLink to={base} className="cl-mobile-nav-item" onClick={() => setMobileNavOpen(false)}>
              <span>Claims and Leave</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </NavLink>
            <NavLink to="#" className="cl-mobile-nav-item" onClick={() => setMobileNavOpen(false)}>
              <span>Documents</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </NavLink>
            <NavLink to="#" className="cl-mobile-nav-item" onClick={() => setMobileNavOpen(false)}>
              <span>Support</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </NavLink>
          </div>

          {/* Utility navigation - dark navy section */}
          <div className="cl-mobile-nav-utility">
            <button className="cl-mobile-nav-utility-item" onClick={() => setMobileNavOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 26 20" fill="none">
                <rect x="1" y="1" width="24" height="18" rx="2" stroke="white" strokeWidth="1.5"/>
                <circle cx="10" cy="9" r="2.5" stroke="white" strokeWidth="1.2"/>
                <path d="M5.5 16c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M17 7h4M17 10h4M17 13h3" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span>ID Card</span>
            </button>
            <button className="cl-mobile-nav-utility-item" onClick={() => setMobileNavOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 20 22" fill="none">
                <path d="M10 1c-1.5 0-2.8.6-3.8 1.5C5.2 3.6 4.5 5.2 4.5 7v4.5L3 13.5V15h14v-1.5l-1.5-2V7c0-1.8-.7-3.4-1.7-4.5C12.8 1.6 11.5 1 10 1z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M7.5 15v.5a2.5 2.5 0 005 0V15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Notifications</span>
            </button>
            <button className="cl-mobile-nav-utility-item" onClick={() => setMobileNavOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 18" fill="none">
                <rect x="1" y="1" width="22" height="16" rx="2" stroke="white" strokeWidth="1.5"/>
                <path d="M1 4l11 7 11-7" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              <span>Messages</span>
            </button>
            <button className="cl-mobile-nav-utility-item" onClick={() => setMobileNavOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 22" fill="none">
                <path d="M2 2h14v10H8l-4 4v-4H2V2z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M18 6h4v10h-2v4l-4-4h-4v-4" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              <span>Chat</span>
            </button>
            <button className="cl-mobile-nav-utility-item" onClick={() => setMobileNavOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="1.5"/>
                <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Profile</span>
            </button>
          </div>
        </div>
      )}

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
