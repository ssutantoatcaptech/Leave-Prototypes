import { NavLink, useLocation } from 'react-router-dom';
import '../claims-and-leave/claims-and-leave.css';
import './claims-and-leave-mobile.css';

const navLinks = [
  { label: 'Dashboard', to: '/claims-and-leave-mobile' },
  { label: 'Coverage', to: '#' },
  { label: 'Claims', to: '#' },
  { label: 'Absence', to: '#' },
  { label: 'Support', to: '#' },
];

export default function ClaimsAndLeaveMobilePage() {
  const location = useLocation();

  return (
    <div className="clm-layout">
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
                    `cl-main-nav-link${link.to === '/claims-and-leave-mobile' && location.pathname === '/claims-and-leave-mobile' ? ' cl-main-nav-link--active' : isActive && link.to !== '#' && link.to !== '/claims-and-leave-mobile' ? ' cl-main-nav-link--active' : ''}`
                  }
                  end
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
              <span className="cl-avatar-circle">LC</span>
              <span className="cl-avatar-name">Lynne Connor</span>
            </div>
          </div>
        </div>
      </header>

      <section className="clm-hero">
        <h1 className="clm-hero-title">Welcome Back, Lynne</h1>
      </section>

      <main className="clm-main">
        <h2 className="clm-section-title">Items Requiring Action</h2>

        <div className="clm-content-grid">
          <div className="clm-content-left">
            {/* Status Banner */}
            <div className="clm-status-banner">
              <div className="clm-status-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#171717" strokeWidth="1.5"/>
                  <path d="M8 12l3 3 5-5" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="clm-status-content">
                <div className="clm-status-header">
                  <h3 className="clm-status-title">You're All Caught Up</h3>
                  <button className="clm-status-dismiss" aria-label="Dismiss">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 1l12 12M13 1L1 13" stroke="#737373" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
                <p className="clm-status-desc">No pending actions required at this time. All claims and leave requests are up to date.</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="clm-card">
              <div className="clm-card-header">
                <h3 className="clm-card-title">Recent Activity</h3>
              </div>
              <div className="clm-card-empty">
                <div className="clm-empty-icon">
                  <svg width="27" height="24" viewBox="0 0 27 24" fill="none">
                    <path d="M2 7h23v13a2 2 0 01-2 2H4a2 2 0 01-2-2V7z" stroke="#a3a3a3" strokeWidth="1.5"/>
                    <path d="M2 7l3-5h17l3 5" stroke="#a3a3a3" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M10 11h7" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h4 className="clm-empty-title">No Recent Activity</h4>
                <p className="clm-empty-desc">You have no recent updates right now.<br/>New account activity will appear here.</p>
                <button className="clm-btn-dark">View your benefits</button>
              </div>
            </div>
          </div>

          <aside className="clm-sidebar">
            {/* Quick Actions */}
            <div className="clm-card">
              <div className="clm-card-body">
                <h3 className="clm-sidebar-title">Quick Actions</h3>
                <div className="clm-quick-actions">
                  <button className="clm-action-row">
                    <span className="clm-action-icon">
                      <svg width="16" height="14" viewBox="0 0 16 14" fill="none"><rect x="0.5" y="0.5" width="15" height="11" rx="1.5" stroke="#404040"/><rect x="0.5" y="11.5" width="15" height="2" rx="0.5" stroke="#404040"/></svg>
                    </span>
                    <span className="clm-action-label">View ID Cards</span>
                    <span className="clm-action-chevron">&rsaquo;</span>
                  </button>
                  <button className="clm-action-row">
                    <span className="clm-action-icon">
                      <svg width="14" height="16" viewBox="0 0 14 16" fill="none"><rect x="0.5" y="0.5" width="13" height="15" rx="1.5" stroke="#404040"/><path d="M4 5h6M4 8h6M4 11h3" stroke="#404040" strokeLinecap="round"/></svg>
                    </span>
                    <span className="clm-action-label">Submit New Claim</span>
                    <span className="clm-action-chevron">&rsaquo;</span>
                  </button>
                  <button className="clm-action-row">
                    <span className="clm-action-icon">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="0.5" y="2.5" width="13" height="11" rx="1.5" stroke="#404040"/><path d="M4 0.5v4M10 0.5v4" stroke="#404040" strokeLinecap="round"/></svg>
                    </span>
                    <span className="clm-action-label">Request Leave</span>
                    <span className="clm-action-chevron">&rsaquo;</span>
                  </button>
                  <button className="clm-action-row">
                    <span className="clm-action-icon">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="3.5" stroke="#404040"/><path d="M1 13.5c0-3 2.5-5 6-5s6 2 6 5" stroke="#404040" strokeLinecap="round"/></svg>
                    </span>
                    <span className="clm-action-label">Manage Preferences</span>
                    <span className="clm-action-chevron">&rsaquo;</span>
                  </button>
                  <button className="clm-action-row">
                    <span className="clm-action-icon">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6.5" stroke="#404040"/><path d="M7 4v3l2 2" stroke="#404040" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span className="clm-action-label">Contact Support</span>
                    <span className="clm-action-chevron">&rsaquo;</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Active Benefits */}
            <div className="clm-card">
              <div className="clm-card-header clm-card-header--border">
                <div className="clm-benefits-heading">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1l2 3h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-3z" stroke="#171717" strokeWidth="1.2" strokeLinejoin="round"/>
                  </svg>
                  <h3 className="clm-card-title">Active Benefits</h3>
                </div>
              </div>
              <div className="clm-card-body">
                {/* Dental */}
                <div className="clm-benefit-item">
                  <div className="clm-benefit-row">
                    <div className="clm-benefit-icon">
                      <svg width="14" height="16" viewBox="0 0 14 16" fill="none"><path d="M7 1C4.5 1 1 2.5 1 5.5c0 4 3 9.5 4.5 9.5 1 0 1-2 1.5-2s.5 2 1.5 2C10 15 13 9.5 13 5.5 13 2.5 9.5 1 7 1z" stroke="#171717" strokeWidth="1.2"/></svg>
                    </div>
                    <div className="clm-benefit-info">
                      <span className="clm-benefit-name">Dental Insurance</span>
                      <span className="clm-benefit-plan">Premier PPO Dental Plan</span>
                    </div>
                  </div>
                  <div className="clm-benefit-usage">
                    <div className="clm-benefit-usage-header">
                      <span className="clm-benefit-usage-label">Dental Max Used</span>
                      <span className="clm-benefit-usage-value">$340 / $2,000</span>
                    </div>
                    <div className="clm-progress-track">
                      <div className="clm-progress-fill" style={{ width: '17%' }}></div>
                    </div>
                  </div>
                </div>

                {/* STD */}
                <div className="clm-benefit-item clm-benefit-item--simple">
                  <div className="clm-benefit-row">
                    <div className="clm-benefit-icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#171717" strokeWidth="1.2"/><path d="M8 4v4l3 2" stroke="#171717" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div className="clm-benefit-info">
                      <span className="clm-benefit-name">Short Term Disability</span>
                      <span className="clm-benefit-plan">Base Plan</span>
                    </div>
                  </div>
                </div>

                {/* Missing Benefit */}
                <div className="clm-missing-benefit">
                  <div className="clm-missing-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l3 5h6l-4.5 4.5 1.5 6L12 14l-6 3.5 1.5-6L3 7h6l3-5z" stroke="#a3a3a3" strokeWidth="1.2" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 className="clm-missing-title">Missing a Benefit?</h4>
                  <p className="clm-missing-desc">We're still setting up your benefits information with your employer. Some coverages may take a little longer to appear. Please check back soon.</p>
                </div>

                <div className="clm-benefit-footer">
                  <button className="clm-btn-outline">Get Support</button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
