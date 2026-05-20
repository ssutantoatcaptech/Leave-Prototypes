import { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import './claims-and-leave.css';
import './responsive.css';

export default function ClaimsAndLeaveLayout() {
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [claimsExpanded, setClaimsExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(function () {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return function () { document.removeEventListener('mousedown', handleClickOutside); };
  }, []);

  useEffect(function () {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return function () { document.body.style.overflow = ''; };
  }, [mobileNavOpen]);
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
    { label: 'My Leave', to: `${base}/my-cases` },
    { label: 'Leave Planning Tool', to: `${base}/leave-planning` },
    { label: 'File a Claim or Leave', to: `${base}/file-claim` },
    { label: 'Enter Missed Time', to: `${base}/enter-time` },
    { label: 'Payments', to: `${base}/payments` },
  ];

  return (
    <div className="cl-layout">
      {/* Brand Header Bar */}
      <div className="cl-brand-bar">
        <div className="cl-brand-bar-inner">
          <div className="cl-brand-bar-logo">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="white" strokeWidth="1.5"/><path d="M5 10c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5z" stroke="white" strokeWidth="1"/><path d="M7 8l3 2 3-2" stroke="white" strokeWidth="1" strokeLinecap="round"/></svg>
            <span className="cl-brand-bar-name">Mutual of Omaha</span>
          </div>
          <div className="cl-brand-bar-right">
            <span className="cl-brand-bar-label">GROUP ID:</span>
            <span className="cl-brand-bar-value">G000CSM5</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
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
            <NavLink to={`${base}/dashboard`} className="cl-brand">my<strong>Mutual</strong></NavLink>
            {/* Desktop nav */}
            <nav className="cl-main-nav">
              {navLinks.map((link) => (
                link.label === 'Claims & Leave' ? (
                  <div key={link.label} className={`cl-nav-dropdown${dropdownOpen ? ' open' : ''}`} ref={dropdownRef}>
                    <button
                      type="button"
                      className={`cl-main-nav-link cl-main-nav-link--btn${location.pathname.startsWith(base) ? ' cl-main-nav-link--active' : ''}`}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
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
                          onClick={() => setDropdownOpen(false)}
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
            <div className="cl-header-lang">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/><ellipse cx="8" cy="8" rx="3" ry="6.5" stroke="currentColor" strokeWidth="1.2"/><path d="M1.5 8h13" stroke="currentColor" strokeWidth="1.2"/></svg>
              <span>ENG</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 4l2.5 2.5L7.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <button className="cl-header-icon-btn" aria-label="ID Cards">
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                <rect x="1" y="1" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="8.5" cy="7" r="2" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M5 13c0-2 1.5-3 3.5-3s3.5 1 3.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M14 5h4M14 7.5h4M14 10h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span className="cl-header-icon-label">ID Cards</span>
            </button>
            <button className="cl-header-icon-btn cl-header-bell" aria-label="Notifications">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                <path d="M9 1c-1.3 0-2.5.5-3.3 1.3C4.8 3.2 4.2 4.7 4.2 6.2v4L3 12.2V13.5h12v-1.3l-1.2-2V6.2c0-1.5-.6-3-1.5-4C11.5 1.5 10.3 1 9 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M6.8 13.5v.3a2.2 2.2 0 004.4 0v-.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="cl-bell-dot" />
            </button>
            <div className={`cl-avatar-dropdown${profileOpen ? ' open' : ''}`} ref={profileRef}>
              <button className="cl-avatar" type="button" onClick={() => setProfileOpen(!profileOpen)}>
                <span className="cl-avatar-circle">AB</span>
                <span className="cl-avatar-name">Name Here</span>
                <svg className="cl-avatar-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 4l2.5 2.5L7.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div className="cl-avatar-dropdown-menu">
                <button className="cl-avatar-dropdown-item" type="button" onClick={() => { setProfileOpen(false); }}>
                  Switch to Manager View
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile nav fullscreen overlay */}
      {mobileNavOpen && (
        <div className="cl-mobile-nav-overlay" aria-label="Mobile navigation">
          {/* Close button */}
          <button className="cl-mobile-nav-close" aria-label="Close menu" onClick={() => setMobileNavOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="#0f0f14" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Brand header */}
          <div className="cl-mobile-nav-brand">
            <div className="cl-mobile-nav-brand-logos">
              <span className="cl-mobile-nav-brand-moo">Mutual<em>of</em>Omaha</span>
              <span className="cl-mobile-nav-brand-divider"></span>
              <span className="cl-mobile-nav-brand-partner">CapTech</span>
            </div>
            <span className="cl-mobile-nav-brand-group">GROUP ID: G000CSM5</span>
          </div>

          {/* Primary navigation */}
          <div className="cl-mobile-nav-primary">
            <NavLink to={`${base}/dashboard`} className="cl-mobile-nav-item" onClick={() => setMobileNavOpen(false)}>
              <span>Dashboard</span>
            </NavLink>
            <button type="button" className="cl-mobile-nav-item cl-mobile-nav-item--expandable">
              <span>Benefits</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button
              type="button"
              className={`cl-mobile-nav-item cl-mobile-nav-item--expandable${claimsExpanded ? ' cl-mobile-nav-item--expanded' : ''}`}
              onClick={() => setClaimsExpanded(!claimsExpanded)}
            >
              <span>Claims and Leave</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: claimsExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><path d="M4 6l4 4 4-4" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {claimsExpanded && (
              <div className="cl-mobile-nav-submenu">
                {subNavTabs.map((tab) => (
                  <NavLink
                    key={tab.label}
                    to={tab.to}
                    className="cl-mobile-nav-subitem"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    {tab.label}
                  </NavLink>
                ))}
              </div>
            )}
            <button type="button" className="cl-mobile-nav-item cl-mobile-nav-item--expandable">
              <span>Documents</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button type="button" className="cl-mobile-nav-item cl-mobile-nav-item--expandable">
              <span>Support</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
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
      {/* Desktop Footer */}
      <footer className="cl-footer cl-footer--desktop">
        <div className="cl-footer-inner">
          <h2 className="cl-footer-brand">my<strong>Mutual</strong></h2>
          <div className="cl-footer-grid">
            <div className="cl-footer-col">
              <h4 className="cl-footer-heading">Benefits</h4>
              <a href="#" className="cl-footer-link">All Benefits</a>
              <a href="#" className="cl-footer-link">Dental</a>
              <a href="#" className="cl-footer-link">Life</a>
              <a href="#" className="cl-footer-link">Accident</a>
              <a href="#" className="cl-footer-link">Hospital Indemnity</a>
            </div>
            <div className="cl-footer-col">
              <h4 className="cl-footer-heading">Claims</h4>
              <a href="#" className="cl-footer-link">Dental</a>
              <a href="#" className="cl-footer-link">Placeholder</a>
              <a href="#" className="cl-footer-link">Placeholder</a>
              <a href="#" className="cl-footer-link">Placeholder</a>
              <a href="#" className="cl-footer-link">Placeholder</a>
            </div>
            <div className="cl-footer-col">
              <h4 className="cl-footer-heading">Leave</h4>
              <a href="#" className="cl-footer-link">My Leave</a>
              <a href="#" className="cl-footer-link">Request New Leave</a>
              <a href="#" className="cl-footer-link">Leave Status</a>
              <a href="#" className="cl-footer-link">Documents &amp; Payments</a>
              <a href="#" className="cl-footer-link">Resources</a>
            </div>
            <div className="cl-footer-col">
              <h4 className="cl-footer-heading">Get Assistance</h4>
              <a href="#" className="cl-footer-link cl-footer-link--chat">
                Chat Support
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1h9v7H5l-3 3V8H1V1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
              </a>
              <div className="cl-footer-support-row">
                <div className="cl-footer-support-item">
                  <span className="cl-footer-support-label">General Support</span>
                  <a href="#" className="cl-footer-link">1-800-555-0123</a>
                </div>
                <div className="cl-footer-support-item">
                  <span className="cl-footer-support-label">Dental Support</span>
                  <a href="#" className="cl-footer-link">1-800-555-0124</a>
                </div>
                <div className="cl-footer-support-item">
                  <span className="cl-footer-support-label">Vision Support</span>
                  <a href="#" className="cl-footer-link">1-800-555-0124</a>
                </div>
              </div>
              <div className="cl-footer-support-row">
                <div className="cl-footer-support-item">
                  <span className="cl-footer-support-label">Leave &amp; Supplementary Health Support</span>
                  <a href="#" className="cl-footer-link">1-800-555-0125</a>
                </div>
              </div>
            </div>
          </div>
          <div className="cl-footer-bottom">
            <div className="cl-footer-legal-links">
              <a href="#" className="cl-footer-legal-link">Privacy Policy</a>
              <a href="#" className="cl-footer-legal-link">Manage Cookie Preferences</a>
              <a href="#" className="cl-footer-legal-link">Terms of Use</a>
              <a href="#" className="cl-footer-legal-link">Accessibility Services</a>
            </div>
            <span className="cl-footer-copyright">&copy; 2026 Mutual of Omaha Insurance Company. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* Mobile Footer */}
      <footer className="cl-footer cl-footer--mobile">
        <h2 className="cl-mfooter-brand">Benefit Hub</h2>
        <div className="cl-mfooter-sections">
          <div className="cl-mfooter-section">
            <h4 className="cl-mfooter-heading">Support</h4>
            <div className="cl-mfooter-link-row">
              <a href="#" className="cl-mfooter-link">Send a Message</a>
              <a href="#" className="cl-mfooter-link">Live Chat</a>
            </div>
          </div>
          <div className="cl-mfooter-section">
            <h4 className="cl-mfooter-heading">Quick Links</h4>
            <div className="cl-mfooter-link-grid">
              <div className="cl-mfooter-link-row">
                <a href="#" className="cl-mfooter-link">File a Claim</a>
                <a href="#" className="cl-mfooter-link">ID Cards</a>
              </div>
              <div className="cl-mfooter-link-row">
                <a href="#" className="cl-mfooter-link">Documents &amp; Forms</a>
                <a href="#" className="cl-mfooter-link">Request a Leave</a>
              </div>
            </div>
          </div>
          <div className="cl-mfooter-section">
            <h4 className="cl-mfooter-heading">Language Preference</h4>
            <div className="cl-mfooter-lang">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#105fa8" strokeWidth="1.5"/><path d="M2 12h20M12 2c2.5 2.5 4 5.5 4 10s-1.5 7.5-4 10M12 2c-2.5 2.5-4 5.5-4 10s1.5 7.5 4 10" stroke="#105fa8" strokeWidth="1.5"/></svg>
              <span className="cl-mfooter-lang-text">English</span>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5l5 5 5-5" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
        <div className="cl-mfooter-legal">
          <div className="cl-mfooter-legal-row">
            <a href="#" className="cl-mfooter-legal-link">Privacy Policy</a>
            <a href="#" className="cl-mfooter-legal-link">Manage Cookie Preferences</a>
          </div>
          <div className="cl-mfooter-legal-row">
            <a href="#" className="cl-mfooter-legal-link">Terms of Use</a>
            <a href="#" className="cl-mfooter-legal-link">Accessibility Services</a>
          </div>
          <span className="cl-mfooter-copyright">&copy; 2026 Mutual of Omaha Insurance Company. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
