import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './claims-and-leave.css';

const navLinks = [
  { label: 'Dashboard', to: '/claims-and-leave/dashboard' },
  { label: 'Benefits', to: '#' },
  { label: 'Claims & Leave', dropdown: true },
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

export default function DashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="cl-layout">
      <header className="cl-header">
        <div className="cl-header-inner">
          <div className="cl-header-left">
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
                      `cl-main-nav-link${link.to === '/claims-and-leave/dashboard' && location.pathname === '/claims-and-leave/dashboard' ? ' cl-main-nav-link--active' : ''}`
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

      <section className="cldb-hero">
        <h1 className="cldb-hero-title">Welcome Back, Sarah</h1>
      </section>

      <main className="cldb-main">
        <h2 className="cldb-section-title">Items Requiring Action</h2>

        <div className="cldb-content-grid">
          <div className="cldb-content-left">
            {/* Status Banner */}
            <div className="cldb-status-banner">
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
                      <path d="M1 1l12 12M13 1L1 13" stroke="#737373" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
                <p className="cldb-status-desc">No pending actions required at this time. All claims and leave requests are up to date.</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="cldb-card">
              <div className="cldb-card-header">
                <h3 className="cldb-card-title">Recent Activity</h3>
              </div>
              <div className="cldb-card-empty">
                <div className="cldb-empty-icon">
                  <svg width="27" height="24" viewBox="0 0 27 24" fill="none">
                    <path d="M2 7h23v13a2 2 0 01-2 2H4a2 2 0 01-2-2V7z" stroke="#a3a3a3" strokeWidth="1.5"/>
                    <path d="M2 7l3-5h17l3 5" stroke="#a3a3a3" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M10 11h7" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h4 className="cldb-empty-title">No Recent Activity</h4>
                <p className="cldb-empty-desc">You have no recent updates right now.<br/>New account activity will appear here.</p>
                <button className="cldb-btn-dark">View your benefits</button>
              </div>
            </div>
          </div>

          <aside className="cldb-sidebar">
            {/* Quick Actions */}
            <div className="cldb-card">
              <div className="cldb-card-body">
                <h3 className="cldb-sidebar-title">Quick Actions</h3>
                <div className="cldb-quick-actions">
                  <button className="cldb-action-row">
                    <span className="cldb-action-icon">
                      <svg width="16" height="14" viewBox="0 0 16 14" fill="none"><rect x="0.5" y="0.5" width="15" height="11" rx="1.5" stroke="#404040"/><rect x="0.5" y="11.5" width="15" height="2" rx="0.5" stroke="#404040"/></svg>
                    </span>
                    <span className="cldb-action-label">View ID Cards</span>
                    <span className="cldb-action-chevron">&rsaquo;</span>
                  </button>
                  <button className="cldb-action-row">
                    <span className="cldb-action-icon">
                      <svg width="14" height="16" viewBox="0 0 14 16" fill="none"><rect x="0.5" y="0.5" width="13" height="15" rx="1.5" stroke="#404040"/><path d="M4 5h6M4 8h6M4 11h3" stroke="#404040" strokeLinecap="round"/></svg>
                    </span>
                    <span className="cldb-action-label">Submit New Claim</span>
                    <span className="cldb-action-chevron">&rsaquo;</span>
                  </button>
                  <button className="cldb-action-row" onClick={() => navigate('/claims-and-leave/file-claim/request-leave?step=1')}>
                    <span className="cldb-action-icon">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="0.5" y="2.5" width="13" height="11" rx="1.5" stroke="#404040"/><path d="M4 0.5v4M10 0.5v4" stroke="#404040" strokeLinecap="round"/></svg>
                    </span>
                    <span className="cldb-action-label">Request Leave</span>
                    <span className="cldb-action-chevron">&rsaquo;</span>
                  </button>
                  <button className="cldb-action-row">
                    <span className="cldb-action-icon">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="3.5" stroke="#404040"/><path d="M1 13.5c0-3 2.5-5 6-5s6 2 6 5" stroke="#404040" strokeLinecap="round"/></svg>
                    </span>
                    <span className="cldb-action-label">Manage Preferences</span>
                    <span className="cldb-action-chevron">&rsaquo;</span>
                  </button>
                  <button className="cldb-action-row">
                    <span className="cldb-action-icon">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6.5" stroke="#404040"/><path d="M7 4v3l2 2" stroke="#404040" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span className="cldb-action-label">Contact Support</span>
                    <span className="cldb-action-chevron">&rsaquo;</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Active Benefits */}
            <div className="cldb-card">
              <div className="cldb-card-header cldb-card-header--border">
                <div className="cldb-benefits-heading">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1l2 3h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-3z" stroke="#171717" strokeWidth="1.2" strokeLinejoin="round"/>
                  </svg>
                  <h3 className="cldb-card-title">Active Benefits</h3>
                </div>
              </div>
              <div className="cldb-card-body">
                <div className="cldb-missing-benefit">
                  <div className="cldb-missing-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l3 5h6l-4.5 4.5 1.5 6L12 14l-6 3.5 1.5-6L3 7h6l3-5z" stroke="#a3a3a3" strokeWidth="1.2" strokeLinejoin="round"/>
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
          </aside>
        </div>
      </main>
    </div>
  );
}
