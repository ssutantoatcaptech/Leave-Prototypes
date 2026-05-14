import { useState, useEffect, useRef } from 'react';
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(function () {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return function () { document.removeEventListener('mousedown', handleClickOutside); };
  }, []);

  const navLinks = [
    { label: 'Dashboard', to: `${base}/dashboard` },
    { label: 'Benefits', to: '#' },
    { label: 'Claims & Leave', dropdown: true },
    { label: 'Documents', to: '#' },
    { label: 'Support', to: '#' },
  ];

  const subNavTabs = [
    { label: 'Claims Center', to: base },
    { label: 'My Leave', to: `${base}/my-cases` },
    { label: 'Leave Planning Tool', to: `${base}/leave-planning` },
    { label: 'File a Claim or Leave', to: `${base}/file-claim` },
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
            <NavLink to="/" className="cl-brand">my<strong>Mutual</strong></NavLink>
            <nav className="cl-main-nav">
              {navLinks.map((link) => (
                link.dropdown ? (
                  <div key={link.label} className={`cl-nav-dropdown${dropdownOpen ? ' open' : ''}`} ref={dropdownRef}>
                    <button
                      type="button"
                      className="cl-main-nav-link cl-main-nav-link--btn"
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

      {mobileNavOpen && (
        <div className="cl-mobile-nav-overlay" aria-label="Mobile navigation">
          <button className="cl-mobile-nav-close" aria-label="Close menu" onClick={() => setMobileNavOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="#0f0f14" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="cl-mobile-nav-brand">
            <div className="cl-mobile-nav-brand-logos">
              <span className="cl-mobile-nav-brand-moo">Mutual<em>of</em>Omaha</span>
              <span className="cl-mobile-nav-brand-divider"></span>
              <span className="cl-mobile-nav-brand-partner">CapTech</span>
            </div>
            <span className="cl-mobile-nav-brand-group">GROUP ID: G000CSM5</span>
          </div>
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

      {/* Hero */}
      <section className="cldb-hero-v2">
        <div className="cldb-hero-v2-content">
          <span className="cldb-hero-v2-greeting">Good Morning, Sarah</span>
          <h1 className="cldb-hero-v2-title">Here are your activities today.</h1>
          <div className="cldb-hero-v2-pill">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#067ac1" strokeWidth="1.5"/>
              <path d="M8 4.5v4M8 10.5v.5" stroke="#067ac1" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>2 actions required</span>
            <span className="cldb-hero-v2-pill-dot">·</span>
            <span>Leave request in review</span>
          </div>
        </div>
        <div className="cldb-hero-v2-circles" aria-hidden="true">
          <svg className="cldb-hero-circle" viewBox="0 0 517 517" fill="none">
            <circle cx="258.5" cy="258.5" r="249.4" stroke="url(#hg1)" strokeWidth="17.56" opacity="0.12"/>
            <defs><linearGradient id="hg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#105FA6"/><stop offset="100%" stopColor="#03A0AD"/></linearGradient></defs>
          </svg>
          <svg className="cldb-hero-circle" viewBox="0 0 517 517" fill="none">
            <circle cx="258.5" cy="258.5" r="249.4" stroke="url(#hg2)" strokeWidth="17.56" opacity="0.12"/>
            <defs><linearGradient id="hg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#105FA6"/><stop offset="100%" stopColor="#03A0AD"/></linearGradient></defs>
          </svg>
          <svg className="cldb-hero-circle cldb-hero-circle--teal" viewBox="0 0 517 517" fill="none">
            <circle cx="258.5" cy="258.5" r="249.4" stroke="url(#hg3)" strokeWidth="17.56" opacity="0.12"/>
            <defs><linearGradient id="hg3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#03A0AD"/><stop offset="100%" stopColor="#105FA6"/></linearGradient></defs>
          </svg>
        </div>
      </section>

      {/* Main two-column content */}
      <main className="cldb-v2-main">
        <div className="cldb-v2-grid">
          {/* Left column */}
          <div className="cldb-v2-left">
            {/* Items Requiring Action */}
            <div className="cldb-v2-card cldb-v2-card--flush">
              <div className="cldb-v2-card-header cldb-v2-card-header--padded">
                <h2 className="cldb-v2-section-title">Items Requiring Action</h2>
                <button className="cldb-v2-link-btn">View all <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
              </div>
              <div className="cldb-v2-actions cldb-v2-actions--padded">
                {/* Action 1 */}
                <div className="cldb-v2-action-item">
                  <div className="cldb-v2-action-body">
                    <div className="cldb-v2-action-tag">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#d32f2f" strokeWidth="1.3"/><path d="M7 4v3.5M7 9v.5" stroke="#d32f2f" strokeWidth="1.3" strokeLinecap="round"/></svg>
                      <span className="cldb-v2-action-tag-label cldb-v2-action-tag--red">Action Required</span>
                    </div>
                    <div className="cldb-v2-action-title-row">
                      <h3 className="cldb-v2-action-title">Updated Terms Require Your Review</h3>
                      <span className="cldb-v2-pill-outline">General</span>
                    </div>
                    <p className="cldb-v2-action-desc">Review and accept the updated terms to continue using your benefits.</p>
                    <p className="cldb-v2-action-meta">From: Mar 18, 2026 &nbsp; Due: 2 days</p>
                  </div>
                  <div className="cldb-v2-action-cta">
                    <button className="cldb-v2-btn-outline">Review Terms</button>
                  </div>
                </div>
                {/* Action 2 */}
                <div className="cldb-v2-action-item">
                  <div className="cldb-v2-action-body">
                    <div className="cldb-v2-action-tag">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" fill="#f5a623" stroke="#f5a623" strokeWidth="0.5"/><path d="M7 4.5v3" stroke="white" strokeWidth="1.3" strokeLinecap="round"/><circle cx="7" cy="9.5" r="0.6" fill="white"/></svg>
                      <span className="cldb-v2-action-tag-label cldb-v2-action-tag--amber">Suggested Action</span>
                    </div>
                    <div className="cldb-v2-action-title-row">
                      <h3 className="cldb-v2-action-title">Jimmy Johnson Has Turned 18</h3>
                      <span className="cldb-v2-pill-outline">General</span>
                    </div>
                    <p className="cldb-v2-action-desc">Jimmy Johnson is now eligible to manage his own health info. Review and grant access if needed.</p>
                    <p className="cldb-v2-action-meta">From: Mar 18, 2026</p>
                  </div>
                  <div className="cldb-v2-action-cta cldb-v2-action-cta--multi">
                    <button className="cldb-v2-btn-outline">Dismiss</button>
                    <button className="cldb-v2-btn-outline">Update Access</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="cldb-v2-card cldb-v2-card--flush">
              <div className="cldb-v2-card-header cldb-v2-card-header--padded">
                <h2 className="cldb-v2-section-title">Recent Activity</h2>
                <div className="cldb-v2-member-select">
                  <span className="cldb-v2-member-label">Member</span>
                  <select className="cldb-v2-select">
                    <option>You + Family</option>
                    <option>Sarah Johnson</option>
                  </select>
                </div>
              </div>
              <div className="cldb-v2-activity-list">
                <div className="cldb-v2-activity-row">
                  <div className="cldb-v2-activity-content">
                    <span className="cldb-v2-activity-title">Jimmy's Dental EOB Available</span>
                    <span className="cldb-v2-activity-desc">Dental explanation of benefits from Dec 10, 2025 is now available.</span>
                    <span className="cldb-v2-activity-date">Feb 21, 2026</span>
                  </div>
                  <button className="cldb-v2-activity-view">View <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                </div>
                <div className="cldb-v2-activity-row">
                  <div className="cldb-v2-activity-content">
                    <span className="cldb-v2-activity-title">Claim Processed</span>
                    <span className="cldb-v2-activity-desc">Dental claim #VC-2025-4412</span>
                    <span className="cldb-v2-activity-date">Feb 21, 2026</span>
                  </div>
                  <button className="cldb-v2-activity-view">View <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                </div>
                <div className="cldb-v2-activity-row">
                  <div className="cldb-v2-activity-content">
                    <span className="cldb-v2-activity-title">Leave Request Approved</span>
                    <span className="cldb-v2-activity-desc">Your leave to Feb 10th, 2026 through Feb 18th, 2026 has been approved.</span>
                    <span className="cldb-v2-activity-date">Jan 15, 2026</span>
                  </div>
                  <button className="cldb-v2-activity-view">View <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                </div>
                <div className="cldb-v2-activity-footer">
                  <button className="cldb-v2-btn-primary" onClick={() => navigate(`${base}/my-cases`)}>View All <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                </div>
              </div>
            </div>

            {/* Leave Request */}
            <div className="cldb-v2-card cldb-v2-card--flush">
              <div className="cldb-v2-card-header cldb-v2-card-header--border-bottom">
                <h2 className="cldb-v2-section-title">Leave Request</h2>
              </div>
              <div className="cldb-v2-leave-body">
                <div className="cldb-v2-leave-plan-card">
                  <div className="cldb-v2-leave-plan-header">
                    <div className="cldb-v2-leave-plan-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#105fa8"/></svg>
                    </div>
                    <div className="cldb-v2-leave-plan-info">
                      <div className="cldb-v2-leave-plan-title-row">
                        <h3 className="cldb-v2-leave-plan-title">Pregnancy Leave</h3>
                        <span className="cldb-v2-pill-success">
                          <span className="cldb-v2-pill-dot-green"></span>
                          Approved
                        </span>
                      </div>
                      <p className="cldb-v2-leave-plan-case">Case #LV-2025-9031 · Continuous Leave</p>
                    </div>
                  </div>
                  <div className="cldb-v2-leave-dates">
                    <div className="cldb-v2-leave-date-card">
                      <span className="cldb-v2-leave-date-label">Start Date</span>
                      <span className="cldb-v2-leave-date-value">March 16, 2025</span>
                    </div>
                    <div className="cldb-v2-leave-date-card">
                      <span className="cldb-v2-leave-date-label">End Date</span>
                      <span className="cldb-v2-leave-date-value">June 30, 2026</span>
                    </div>
                    <div className="cldb-v2-leave-date-card">
                      <span className="cldb-v2-leave-date-label">Return Date</span>
                      <span className="cldb-v2-leave-date-value">June 31st, 2025</span>
                    </div>
                    <div className="cldb-v2-leave-date-card">
                      <span className="cldb-v2-leave-date-label">Duration</span>
                      <span className="cldb-v2-leave-date-value">107 days</span>
                    </div>
                  </div>
                  <button className="cldb-v2-btn-primary" onClick={() => navigate(`${base}/case-detail-pregnancy`)}>View Details <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                </div>
              </div>
            </div>
          </div>

          {/* Right column (sidebar) */}
          <div className="cldb-v2-right">
            {/* Quick Links */}
            <div className="cldb-v2-card cldb-v2-card--flush cldb-v2-quick-links">
              <div className="cldb-v2-ql-header">
                <h2 className="cldb-v2-section-title">Quick Links</h2>
              </div>
              <div className="cldb-v2-ql-list">
                <button className="cldb-v2-ql-row">
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><rect x="1" y="1" width="16" height="12" rx="2" stroke="#003a70" strokeWidth="1.3"/><circle cx="7" cy="6" r="2" stroke="#003a70" strokeWidth="1.1"/><path d="M3.5 12c0-2 1.5-3 3.5-3s3.5 1 3.5 3" stroke="#003a70" strokeWidth="1.1" strokeLinecap="round"/><path d="M12 5h3M12 7.5h3M12 10h2" stroke="#003a70" strokeWidth="1.1" strokeLinecap="round"/></svg>
                  <span>View ID Cards</span>
                  <svg className="cldb-v2-ql-chevron" width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1l5 5-5 5" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="cldb-v2-ql-row">
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none"><rect x="1" y="1" width="14" height="16" rx="2" stroke="#003a70" strokeWidth="1.3"/><path d="M4.5 6h7M4.5 9h7M4.5 12h4" stroke="#003a70" strokeWidth="1.1" strokeLinecap="round"/></svg>
                  <span>Submit New Claim</span>
                  <svg className="cldb-v2-ql-chevron" width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1l5 5-5 5" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="cldb-v2-ql-row" onClick={() => navigate(`${base}/file-claim`)}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="12" rx="2" stroke="#003a70" strokeWidth="1.3"/><path d="M4.5 1v4M11.5 1v4" stroke="#003a70" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  <span>Request Leave</span>
                  <svg className="cldb-v2-ql-chevron" width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1l5 5-5 5" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="cldb-v2-ql-row">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3.5" stroke="#003a70" strokeWidth="1.3"/><path d="M2 15c0-3 2.5-5 6-5s6 2 6 5" stroke="#003a70" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  <span>Manage Preferences</span>
                  <svg className="cldb-v2-ql-chevron" width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1l5 5-5 5" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="cldb-v2-ql-row">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#003a70" strokeWidth="1.3"/><path d="M8 5v3l2.5 1.5" stroke="#003a70" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>Get Support</span>
                  <svg className="cldb-v2-ql-chevron" width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1l5 5-5 5" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>

            {/* Enrolled Benefits */}
            <div className="cldb-v2-card cldb-v2-card--flush">
              <div className="cldb-v2-eb-header">
                <h2 className="cldb-v2-section-title">Enrolled Benefits</h2>
              </div>
              <div className="cldb-v2-eb-body">
                {/* Dental */}
                <div className="cldb-v2-eb-plan">
                  <div className="cldb-v2-eb-plan-top">
                    <div className="cldb-v2-eb-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C9.5 2 7.5 3.5 7 5.5 6 8 5 10 5 12c0 3 1 5 2.5 7.5.5.8 1 1.5 1.5 2 .4.4.8.5 1.2.5.5 0 1-.3 1.3-.8l.5-1.2c.3-.6.5-1.5 1-1.5s.7.9 1 1.5l.5 1.2c.3.5.8.8 1.3.8.4 0 .8-.1 1.2-.5.5-.5 1-1.2 1.5-2C20 17 21 15 21 12c0-2-1-4-2-6.5C18.5 3.5 16.5 2 14 2h-2z" stroke="#003a70" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                    </div>
                    <div className="cldb-v2-eb-plan-info">
                      <span className="cldb-v2-eb-plan-name">Dental Insurance</span>
                      <span className="cldb-v2-eb-plan-type">Premier PPO Dental Plan</span>
                    </div>
                  </div>
                  <div className="cldb-v2-eb-progress">
                    <div className="cldb-v2-eb-progress-labels">
                      <span>Dental Max Used</span>
                      <span className="cldb-v2-eb-progress-value">$340 / $2,000</span>
                    </div>
                    <div className="cldb-v2-eb-progress-bar">
                      <div className="cldb-v2-eb-progress-fill" style={{ width: '17%' }}></div>
                    </div>
                  </div>
                </div>
                {/* Vision */}
                <div className="cldb-v2-eb-plan">
                  <div className="cldb-v2-eb-plan-top">
                    <div className="cldb-v2-eb-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="#003a70" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="#003a70" strokeWidth="1.5"/></svg>
                    </div>
                    <div className="cldb-v2-eb-plan-info">
                      <span className="cldb-v2-eb-plan-name">Vision Insurance</span>
                      <span className="cldb-v2-eb-plan-type">Premier PPO Dental Plan</span>
                    </div>
                  </div>
                </div>
                {/* STD */}
                <div className="cldb-v2-eb-plan">
                  <div className="cldb-v2-eb-plan-top">
                    <div className="cldb-v2-eb-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M10 2v6h4V2M8 22v-4h8v4M12 8v10M6 12h12" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div className="cldb-v2-eb-plan-info">
                      <span className="cldb-v2-eb-plan-name">Short-Term Disability</span>
                      <span className="cldb-v2-eb-plan-type">Base Plan</span>
                    </div>
                  </div>
                </div>
                {/* LTD */}
                <div className="cldb-v2-eb-plan">
                  <div className="cldb-v2-eb-plan-top">
                    <div className="cldb-v2-eb-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#003a70" strokeWidth="1.5"/><path d="M12 7v4M8 16h8M9 13h6" stroke="#003a70" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </div>
                    <div className="cldb-v2-eb-plan-info">
                      <span className="cldb-v2-eb-plan-name">Long-Term Disability</span>
                      <span className="cldb-v2-eb-plan-type">Base Plan</span>
                    </div>
                  </div>
                </div>
                <button className="cldb-v2-btn-primary cldb-v2-btn-full">View Coverage <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Desktop Footer */}
      <footer className="cl-footer cl-footer--desktop">
        <div className="cl-footer-inner">
          <div className="cl-footer-brand">
            <span className="cl-footer-mymutual">my<strong>Mutual</strong></span>
          </div>
          <div className="cl-footer-grid">
            <div className="cl-footer-col">
              <h4 className="cl-footer-heading">Mutual of Omaha Sites</h4>
              <a href="#" className="cl-footer-link">www.website.com <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 1h8v8M11 1L1 11" stroke="#105fa8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
              <a href="#" className="cl-footer-link">www.website.com <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 1h8v8M11 1L1 11" stroke="#105fa8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
            </div>
            <div className="cl-footer-col">
              <h4 className="cl-footer-heading">Support</h4>
              <a href="#" className="cl-footer-link">Get Help</a>
              <a href="#" className="cl-footer-link">FAQs</a>
              <a href="#" className="cl-footer-link">Send a Message</a>
              <a href="#" className="cl-footer-link">Live Chat</a>
            </div>
            <div className="cl-footer-col">
              <h4 className="cl-footer-heading">Quick Links</h4>
              <a href="#" className="cl-footer-link">File a Claim</a>
              <a href="#" className="cl-footer-link">ID Cards</a>
              <a href="#" className="cl-footer-link">Documents &amp; Forms</a>
              <a href="#" className="cl-footer-link">Request a Leave</a>
            </div>
          </div>
          <div className="cl-footer-bottom">
            <div className="cl-footer-legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Manage Cookie Preferences</a>
              <a href="#">Terms of Use</a>
              <a href="#">Accessibility Services</a>
            </div>
            <span>&copy; 2026 Mutual of Omaha Insurance Company. All rights reserved.</span>
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
