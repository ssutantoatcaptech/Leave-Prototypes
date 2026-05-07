import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useBasePath from './useBasePath';
import './claims-and-leave.css';
import './responsive.css';

export default function DashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const base = useBasePath();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [claimsExpanded, setClaimsExpanded] = useState(false);

  const navLinks = [
    { label: 'Dashboard', to: `${base}/dashboard` },
    { label: 'Benefits', to: '#' },
    { label: 'Claims & Leave', dropdown: true },
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
      <header className="cl-header">
        <div className="cl-header-inner">
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
            <nav className="cl-main-nav">
              {navLinks.map((link) => (
                link.dropdown ? (
                  <div key={link.label} className="cl-nav-dropdown">
                    <button
                      type="button"
                      className="cl-main-nav-link cl-main-nav-link--btn"
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
                    className={() =>
                      `cl-main-nav-link${link.to === `${base}/dashboard` && location.pathname === `${base}/dashboard` ? ' cl-main-nav-link--active' : ''}`
                    }
                    end
                  >
                    {link.label}
                  </NavLink>
                )
              ))}
            </nav>
          </div>
          <div className="cl-header-right">
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
          <button className="cl-mobile-nav-close" aria-label="Close menu" onClick={() => setMobileNavOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="#0f0f14" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="cl-mobile-nav-brand">
            <span className="cl-mobile-nav-brand-name">Benefits Hub</span>
          </div>
          <div className="cl-mobile-nav-primary">
            <NavLink to={`${base}/dashboard`} className="cl-mobile-nav-item" onClick={() => setMobileNavOpen(false)}>
              <span>Dashboard</span>
            </NavLink>
            <div className="cl-mobile-nav-item cl-mobile-nav-item--disabled">
              <span>Benefits</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
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
            <div className="cl-mobile-nav-item cl-mobile-nav-item--disabled">
              <span>Documents</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="cl-mobile-nav-item cl-mobile-nav-item--disabled">
              <span>Support</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div className="cl-mobile-nav-utility">
            <button className="cl-mobile-nav-utility-item" onClick={() => setMobileNavOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 26 20" fill="none"><rect x="1" y="1" width="24" height="18" rx="2" stroke="white" strokeWidth="1.5"/><circle cx="10" cy="9" r="2.5" stroke="white" strokeWidth="1.2"/><path d="M5.5 16c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="white" strokeWidth="1.2" strokeLinecap="round"/><path d="M17 7h4M17 10h4M17 13h3" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></svg>
              <span>ID Card</span>
            </button>
            <button className="cl-mobile-nav-utility-item" onClick={() => setMobileNavOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 20 22" fill="none"><path d="M10 1c-1.5 0-2.8.6-3.8 1.5C5.2 3.6 4.5 5.2 4.5 7v4.5L3 13.5V15h14v-1.5l-1.5-2V7c0-1.8-.7-3.4-1.7-4.5C12.8 1.6 11.5 1 10 1z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/><path d="M7.5 15v.5a2.5 2.5 0 005 0V15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <span>Notifications</span>
            </button>
            <button className="cl-mobile-nav-utility-item" onClick={() => setMobileNavOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 18" fill="none"><rect x="1" y="1" width="22" height="16" rx="2" stroke="white" strokeWidth="1.5"/><path d="M1 4l11 7 11-7" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/></svg>
              <span>Messages</span>
            </button>
            <button className="cl-mobile-nav-utility-item" onClick={() => setMobileNavOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 22" fill="none"><path d="M2 2h14v10H8l-4 4v-4H2V2z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/><path d="M18 6h4v10h-2v4l-4-4h-4v-4" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/></svg>
              <span>Chat</span>
            </button>
            <button className="cl-mobile-nav-utility-item" onClick={() => setMobileNavOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="white" strokeWidth="1.5"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <span>Profile</span>
            </button>
          </div>
        </div>
      )}

      <section className="cldb-hero">
        <h1 className="cldb-hero-title">Welcome Back, Sarah</h1>
      </section>

      <main className="cldb-main">
        <h2 className="cldb-section-title cldb-hide-mobile">Items Requiring Action</h2>

        <div className="cldb-content-grid">
          {/* Status Banner — order 1 on mobile */}
          <div className="cldb-status-banner cldb-grid-status">
            <div className="cldb-status-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#0033a0" strokeWidth="1.5"/>
                <path d="M8 12l3 3 5-5" stroke="#0033a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="cldb-status-content">
              <div className="cldb-status-header">
                <h3 className="cldb-status-title">You're All Caught Up</h3>
                <button className="cldb-status-dismiss" aria-label="Dismiss">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <p className="cldb-status-desc">No pending actions required at this time. All claims and leave requests are up to date.</p>
            </div>
          </div>

          {/* Quick Actions — order 2 on mobile, sidebar on desktop */}
          <div className="cldb-card cldb-grid-actions">
            <div className="cldb-card-body">
              <h3 className="cldb-sidebar-title">Quick Actions</h3>
              <div className="cldb-quick-actions">
                <button className="cldb-action-row">
                  <span className="cldb-action-icon">
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none"><rect x="0.5" y="0.5" width="15" height="11" rx="1.5" stroke="#374151"/><rect x="0.5" y="11.5" width="15" height="2" rx="0.5" stroke="#374151"/></svg>
                  </span>
                  <span className="cldb-action-label">View ID Cards</span>
                  <span className="cldb-action-chevron">&rsaquo;</span>
                </button>
                <button className="cldb-action-row">
                  <span className="cldb-action-icon">
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none"><rect x="0.5" y="0.5" width="13" height="15" rx="1.5" stroke="#374151"/><path d="M4 5h6M4 8h6M4 11h3" stroke="#374151" strokeLinecap="round"/></svg>
                  </span>
                  <span className="cldb-action-label">Submit New Claim</span>
                  <span className="cldb-action-chevron">&rsaquo;</span>
                </button>
                <button className="cldb-action-row" onClick={() => navigate(`${base}/file-claim`)}>
                  <span className="cldb-action-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="0.5" y="2.5" width="13" height="11" rx="1.5" stroke="#374151"/><path d="M4 0.5v4M10 0.5v4" stroke="#374151" strokeLinecap="round"/></svg>
                  </span>
                  <span className="cldb-action-label">Request Leave</span>
                  <span className="cldb-action-chevron">&rsaquo;</span>
                </button>
                <button className="cldb-action-row">
                  <span className="cldb-action-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="3.5" stroke="#374151"/><path d="M1 13.5c0-3 2.5-5 6-5s6 2 6 5" stroke="#374151" strokeLinecap="round"/></svg>
                  </span>
                  <span className="cldb-action-label">Manage Preferences</span>
                  <span className="cldb-action-chevron">&rsaquo;</span>
                </button>
                <button className="cldb-action-row">
                  <span className="cldb-action-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6.5" stroke="#374151"/><path d="M7 4v3l2 2" stroke="#374151" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="cldb-action-label">Contact Support</span>
                  <span className="cldb-action-chevron">&rsaquo;</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Benefits — right after Quick Actions on desktop */}
          <div className="cldb-card cldb-grid-benefits">
            <div className="cldb-card-header cldb-card-header--border">
              <div className="cldb-benefits-heading">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1l2 3h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-3z" stroke="#0f172a" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
                <h3 className="cldb-card-title">Active Benefits</h3>
              </div>
            </div>
            <div className="cldb-card-body">
              {/* Missing a Benefit */}
              <div className="cldb-missing-benefit">
                <div className="cldb-missing-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3 5h6l-4.5 4.5 1.5 6L12 14l-6 3.5 1.5-6L3 7h6l3-5z" stroke="#9ca3af" strokeWidth="1.2" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className="cldb-missing-title">Missing a Benefit?</h4>
                <p className="cldb-missing-desc">We're still setting up your benefits information with your employer. Some coverages may take a little longer to appear. Please check back soon.</p>
              </div>

              <div className="cldb-benefit-footer">
                <button className="cldb-btn-outline">Get Support</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
