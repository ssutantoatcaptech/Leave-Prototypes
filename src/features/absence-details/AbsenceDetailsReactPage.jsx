import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAbsenceDetailCase } from '../../data/overviewData';
import '../overview/overview-react.css';
import './absence-details-react.css';

const TAB_OPTIONS = [
  { id: 'tasks', label: 'Tasks' },
  { id: 'coverage', label: 'Coverage & Benefits' },
  { id: 'details', label: 'Details' },
  { id: 'documents', label: 'Documents' },
  { id: 'payment', label: 'Payments' },
  { id: 'absenceLog', label: 'Absence Log' },
];

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div className="site-footer-col">
            <h4>Resources</h4>
            <a>Absence Policies</a><a>FAQs</a><a>Forms &amp; Documents</a>
          </div>
          <div className="site-footer-col">
            <h4>Support</h4>
            <a>Contact HR</a><a>Help Center</a><a>Report an Issue</a>
          </div>
          <div className="site-footer-col">
            <h4>Legal</h4>
            <a>Privacy Policy</a><a>Terms of Use</a><a>Accessibility</a>
          </div>
          <div className="site-footer-col">
            <h4>Contact</h4>
            <a>Phone: 1-800-HR-HELP</a><a>Email: hrbenefits@company.com</a><a>Hours: Mon–Fri, 8am–6pm EST</a>
          </div>
        </div>
        <div className="site-footer-bottom">
          <span>&copy; 2026 HR Benefits Portal. All rights reserved.</span>
          <div className="site-footer-social">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.5v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.12 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" stroke="currentColor" strokeWidth="1.5"/></svg>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SiteNav() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedPrimary, setExpandedPrimary] = useState('absence');
  const mobilePrimaryItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'coverage', label: 'Coverage' },
    { id: 'claims', label: 'Claims' },
    { id: 'absence', label: 'Absence', active: true },
    { id: 'support', label: 'Support' },
  ];
  const mobileSubNavItems = [
    { id: 'overview', label: 'My Leave', to: '/overview-react' },
    { id: 'plan', label: 'Plan Leave', to: '/plan-absence' },
    { id: 'request', label: 'Request Leave', to: '/wizard' },
    { id: 'history', label: 'Leave History', to: '/absence-history' },
    { id: 'documents', label: 'Leave Documents', to: '/leave-documents' },
  ];
  const mobileUtilityItems = [
    'ID Card',
    'Messages',
    'Notifications',
    'Profile',
  ];
  const activeSubNavId = location.pathname === '/plan-absence'
    ? 'plan'
    : location.pathname === '/wizard' || location.pathname === '/request-leave-react'
      ? 'request'
      : location.pathname === '/absence-history' || location.pathname.startsWith('/absence-details/') || location.pathname.includes('/return-to-work')
        ? 'history'
        : 'overview';

  return (
    <div className="top-nav">
      <div className="nav-mobile-bar" role="navigation" aria-label="Mobile header">
        <button className="nav-mobile-icon-btn" type="button" aria-label="Open menu" onClick={() => setMobileMenuOpen(true)}>
          <svg width="30" height="24" viewBox="0 0 30 24" fill="none"><path d="M3 3h24M3 12h24M3 21h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <button className="nav-mobile-id" type="button" aria-label="ID Cards">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><circle cx="8" cy="12" r="2" stroke="currentColor" strokeWidth="1.6"/><path d="M12.5 10h5M12.5 13h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          <span>ID Cards</span>
        </button>
        <button className="nav-mobile-icon-btn nav-mobile-bell" type="button" aria-label="Notifications">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 3C8.69 3 6 5.69 6 9v4l-2 3h16l-2-3V9c0-3.31-2.69-6-6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 21a2 2 0 004 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <span className="nav-bell-dot"/>
        </button>
        <button className="nav-mobile-avatar" type="button" aria-label="Profile">SJ</button>
      </div>

      <div className={"nav-mobile-drawer-overlay " + (mobileMenuOpen ? 'open' : '')} onClick={() => setMobileMenuOpen(false)}>
        <aside className="nav-mobile-drawer" aria-label="Mobile menu" onClick={(e) => e.stopPropagation()}>
          <div className="nav-mobile-drawer-top">
            <div className="nav-mobile-drawer-heading">
              <span className="nav-mobile-kicker">Low-fidelity</span>
              <strong>Mobile menu</strong>
            </div>
            <button className="nav-mobile-close" type="button" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}>
              Close
            </button>
          </div>

          <nav className="nav-mobile-primary" aria-label="Primary navigation">
            {mobilePrimaryItems.map((item) => {
              const isExpandable = item.id === 'absence';
              const isExpanded = expandedPrimary === item.id;

              return (
                <div key={item.id} className={"nav-mobile-accordion" + (item.active ? ' active' : '')}>
                  <button
                    type="button"
                    className={"nav-mobile-accordion-trigger" + (item.active ? ' active' : '')}
                    aria-expanded={isExpandable ? isExpanded : undefined}
                    onClick={() => {
                      if (!isExpandable) return;
                      setExpandedPrimary(isExpanded ? '' : item.id);
                    }}
                  >
                    <span className="nav-mobile-item-title">{item.label}</span>
                    <span className="nav-mobile-accordion-icon" aria-hidden="true">{isExpandable ? (isExpanded ? '−' : '+') : '--'}</span>
                  </button>
                  {isExpandable && isExpanded && (
                    <div className="nav-mobile-subnav" aria-label="Absence sub-navigation">
                      {mobileSubNavItems.map((subNavItem) => (
                        <Link
                          key={subNavItem.id}
                          className={"nav-mobile-subnav-link" + (activeSubNavId === subNavItem.id ? ' active' : '')}
                          to={subNavItem.to}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span>{subNavItem.label}</span>
                          <span className="nav-mobile-subnav-marker" aria-hidden="true">{activeSubNavId === subNavItem.id ? 'Current' : '--'}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="nav-mobile-utility-panel" aria-label="Utility actions">
            <div className="nav-mobile-section-title">Utilities</div>
            {mobileUtilityItems.map((item) => (
              <button key={item} type="button">
                <span className="nav-mobile-item-title">{item}</span>
                <span className="nav-mobile-subnav-marker" aria-hidden="true">--</span>
              </button>
            ))}
          </div>
        </aside>
      </div>

      <div className="nav-main">
        <div className="nav-main-left">
          <div className="nav-brand">my<span>Mutual</span></div>
          <nav className="nav-links">
            <button className="nav-link" type="button">Dashboard</button>
            <button className="nav-link" type="button">My Coverages <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <button className="nav-link" type="button">Claims</button>
            <button className="nav-link active" type="button">Leaves</button>
            <button className="nav-link" type="button">Support</button>
          </nav>
        </div>
        <div className="nav-utilities">
          <button className="nav-util" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 9h12M6 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Find ID Card
          </button>
          <button className="nav-util" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Messages
          </button>
          <button className="nav-bell" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3C8.69 3 6 5.69 6 9v4l-2 3h16l-2-3V9c0-3.31-2.69-6-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 21a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span className="nav-bell-dot"/>
          </button>
          <div className="nav-avatar">
            <div className="nav-avatar-circle">SJ</div>
            <span className="nav-avatar-name">Sarah Johnson</span>
          </div>
        </div>
      </div>
      <div className="nav-secondary">
        <Link className="nav-tab" to="/overview-react">My Leave</Link>
        <Link className="nav-tab" to="/plan-absence">Plan Leave</Link>
        <Link className="nav-tab" to="/wizard">Request Leave</Link>
        <Link className="nav-tab active" to="/absence-history">Leave History</Link>
        <Link className="nav-tab" to="/leave-documents">Leave Documents</Link>
      </div>
    </div>
  );
}

function formatDate(isoDate, options = { month: 'short', day: 'numeric', year: 'numeric' }) {
  if (!isoDate) return 'TBD';
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return parsed.toLocaleDateString('en-US', options);
}

function formatShortDate(isoDate) {
  return formatDate(isoDate, { month: 'short', day: 'numeric' });
}

function parseRangeDate(value) {
  if (!value) return null;
  const parsed = new Date(value.trim());
  if (Number.isNaN(parsed.getTime())) return null;
  parsed.setHours(0, 0, 0, 0);
  return parsed;
}

function monthAxisFromDate(startDate) {
  const start = parseRangeDate(startDate);
  const axisStart = start || new Date();
  axisStart.setDate(1);
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
  return Array.from({ length: 5 }, (_, index) => {
    const current = new Date(axisStart);
    current.setMonth(axisStart.getMonth() + index);
    return formatter.format(current).toUpperCase();
  });
}

function parseCurrencyAmount(value) {
  if (!value) return 0;
  const normalized = String(value).replace(/[^0-9.-]/g, '');
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrencyAmount(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatMonthDividerLabel(value) {
  if (!value) return 'Schedule';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function isoFromFriendlyDate(value) {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toISOString().slice(0, 10);
}

function badgeClass(statusKey) {
  if (statusKey === 'approved') return 'approved';
  if (statusKey === 'denied') return 'denied';
  return 'pending';
}

function badgeLabel(statusKey) {
  if (statusKey === 'approved') return 'APPROVED';
  if (statusKey === 'denied') return 'DENIED';
  return 'PENDING';
}

function timelineStepClass(status) {
  if (status === 'done') return 'done';
  if (status === 'in-progress' || status === 'current') return 'in-progress';
  if (status === 'denied') return 'denied';
  return 'pending';
}

function taskIcon(status) {
  if (status === 'done') {
    return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6l2.5 2.5L9.5 3.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }
  if (status === 'upcoming') {
    return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#737373" strokeWidth="1.2"/><path d="M6 3.5v2.5l2 1.5" stroke="#737373" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="2" y="1" width="8" height="10" rx="1" stroke="#fff" strokeWidth="1.2"/><path d="M4.5 4h3M4.5 6h3M4.5 8h1.5" stroke="#fff" strokeWidth="1" strokeLinecap="round"/></svg>;
}

function getDurationMetrics(caseData) {
  const totalDays = Number.parseInt(caseData.duration, 10) || 0;
  if (!caseData.startDate || !totalDays) {
    return { totalDays: 0, elapsedDays: 0, remainingDays: 0 };
  }

  const start = new Date(`${caseData.startDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const elapsedDays = today <= start ? 0 : Math.min(totalDays, Math.floor((today - start) / 86400000));
  return {
    totalDays,
    elapsedDays,
    remainingDays: Math.max(0, totalDays - elapsedDays),
  };
}

function LeaveSummaryCard({ caseData, onDocumentsClick }) {
  return (
    <div className="dt-leave-card">
      <div className="dt-leave-header">
        <h3>{caseData.title}</h3>
        <span className={`dt-badge ${badgeClass(caseData.statusKey)}`}>{badgeLabel(caseData.statusKey)}</span>
      </div>
      <div className="dt-case-id">Case Number: {caseData.id}</div>
      {caseData.banner && (
        <div className="dt-dark-banner">
          <div className={`icon ${caseData.banner.kind}`}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 4v4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="7" cy="11" r="1" fill="#fff"/></svg>
          </div>
          <div>
            <div className="title">{caseData.banner.title}</div>
            <div className="desc">
              {caseData.banner.description}
              {caseData.statusKey === 'pending' && (
                <button className="ad-inline-link" type="button" onClick={onDocumentsClick}>View Documents</button>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="dt-date-cards">
        <div className="dt-date-card">
          <div className="label">START DATE</div>
          <div className="value">{formatDate(caseData.startDate)}</div>
        </div>
        <div className="dt-date-card">
          <div className="label">END DATE</div>
          <div className="value">{formatDate(caseData.endDate)}</div>
        </div>
        <div className="dt-date-card">
          <div className="label">RETURN TO WORK</div>
          <div className="value">{formatDate(caseData.returnDate)}</div>
        </div>
        <div className="dt-date-card">
          <div className="label">DURATION</div>
          <div className="value">{caseData.duration}</div>
        </div>
      </div>
    </div>
  );
}

function SidebarCard({ title, children }) {
  return (
    <div className="dt-sidebar-card">
      <h4>{title}</h4>
      {children}
    </div>
  );
}

function DetailsSidebar({ caseData, activeTab, onTabChange }) {
  const metrics = getDurationMetrics(caseData);
  const employeeInfo = caseData.detailsData?.employeeInfo;

  return (
    <div className="details-sidebar">
      {activeTab === 'details' && employeeInfo && (
        <SidebarCard title={employeeInfo.title}>
          <div className="ad-sidebar-note">{employeeInfo.note}</div>
          <div className="ad-sidebar-field-list">
            {employeeInfo.fields.map((field) => (
              <div key={field.label} className="ad-sidebar-field">
                <div className="dt-info-field-label">{field.label}</div>
                <div className="dt-info-field-value">{field.value}</div>
              </div>
            ))}
          </div>
        </SidebarCard>
      )}

      {(activeTab === 'payment' || activeTab === 'coverage') && (
        <SidebarCard title="Quick Actions">
          {caseData.quickActions.map((label) => {
            const handleClick = () => {
              if (label === 'Upload Documents') onTabChange('documents');
              if (label === 'View Payment Schedule') onTabChange('payment');
              if (label === 'View Time Tracking') onTabChange('absenceLog');
              if (label === 'Report Time') onTabChange('absenceLog');
            };

            return (
              <button key={label} className="dt-quick-item" type="button" onClick={handleClick}>
                <span>{label}</span>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M1.5 1L6.5 6l-5 5" stroke="#3d3d47" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            );
          })}
        </SidebarCard>
      )}

      {(activeTab === 'coverage' || (activeTab !== 'documents' && activeTab !== 'details')) && (
        <SidebarCard title="Leave Duration">
          <div className="dt-cov-summary">
            <div className="dt-cov-box">
              <div className="label">TOTAL LEAVE</div>
              <div className="value">{metrics.totalDays ? `${metrics.totalDays} days` : caseData.duration}</div>
            </div>
            <div className="ad-sidebar-split">
              <div className="dt-cov-box ad-compact-box">
                <div className="label">ELAPSED</div>
                <div className="value">{metrics.elapsedDays} days</div>
              </div>
              <div className="dt-cov-box ad-compact-box">
                <div className="label">REMAINING</div>
                <div className="value">{metrics.remainingDays} days</div>
              </div>
            </div>
          </div>
        </SidebarCard>
      )}

      {activeTab !== 'documents' && activeTab !== 'details' && activeTab !== 'coverage' && (
        <SidebarCard title="Status Timeline">
          <div className="dt-timeline ad-status-timeline">
            {caseData.statusTimeline.map((item) => (
              <div key={item.title} className="dt-timeline-item">
                <div className={`dt-timeline-dot ${timelineStepClass(item.status)}`}>
                  {item.status === 'done' ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 7l2.5 2.5L10.5 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  ) : item.status === 'in-progress' ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="3" fill="#fff"/></svg>
                  ) : (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="3" fill="#d0d0d5"/></svg>
                  )}
                </div>
                <div className="dt-timeline-text">
                  <div className="title">{item.title}</div>
                  <div className="ad-timeline-date">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </SidebarCard>
      )}

      {activeTab === 'documents' && (
        <SidebarCard title="Need Help?">
          <div className="ad-need-help">
            <p className="ad-need-help-desc">Have questions about your documents or need assistance uploading?</p>
            <div className="ad-need-help-contacts">
              <div className="ad-need-help-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14.05 11.17l-2.68-.77a1 1 0 00-1.01.29l-1.09 1.09a11.36 11.36 0 01-4.93-4.93l1.09-1.09a1 1 0 00.29-1.01l-.77-2.68A1 1 0 003.97 1.2l-2.13.53A1 1 0 001.1 2.8 13.94 13.94 0 0013.2 14.9a1 1 0 001.07-.74l.53-2.13a1 1 0 00-.75-.86z" stroke="#525252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>1-800-HR-HELP</span>
              </div>
              <div className="ad-need-help-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="1.5" stroke="#525252" strokeWidth="1.2"/><path d="M1 4.5l7 4.5 7-4.5" stroke="#525252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>hrbenefits@company.com</span>
              </div>
              <div className="ad-need-help-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#525252" strokeWidth="1.2"/><path d="M8 4.5v4l2.5 1.5" stroke="#525252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>Mon–Fri, 8am–6pm EST</span>
              </div>
            </div>
          </div>
        </SidebarCard>
      )}
    </div>
  );
}

function parseEpisodeDate(value) {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  const raw = String(value).trim();

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
    const [mm, dd, yyyy] = raw.split('/').map(Number);
    return new Date(yyyy, mm - 1, dd);
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const [yyyy, mm, dd] = raw.split('-').map(Number);
    return new Date(yyyy, mm - 1, dd);
  }

  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatEpisodeDate(value) {
  const parsed = parseEpisodeDate(value);
  if (!parsed) return String(value || '');
  const mm = String(parsed.getMonth() + 1).padStart(2, '0');
  const dd = String(parsed.getDate()).padStart(2, '0');
  const yyyy = parsed.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

function startOfWeekSunday(value) {
  const parsed = parseEpisodeDate(value);
  if (!parsed) return null;
  const next = new Date(parsed);
  next.setHours(0, 0, 0, 0);
  const day = next.getDay();
  const offset = -day;
  next.setDate(next.getDate() + offset);
  return next;
}

function addDays(date, amount) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function formatWeekRange(weekStart) {
  const weekEnd = addDays(weekStart, 6);
  const startLabel = weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endLabel = weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return `${startLabel} - ${endLabel}`;
}

function formatDayLabel(date) {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function formatMinutesAsHHMM(minutes) {
  const safeMinutes = Number.isFinite(minutes) ? Math.max(0, minutes) : 0;
  const hours = String(Math.floor(safeMinutes / 60)).padStart(2, '0');
  const remainder = String(safeMinutes % 60).padStart(2, '0');
  return `${hours}:${remainder}`;
}

function normalizeHHMM(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';

  if (/^\d{1,2}$/.test(raw)) {
    return `${raw.padStart(2, '0')}:00`;
  }

  if (/^\d{1,2}:\d{1,2}$/.test(raw)) {
    const [hours, minutes] = raw.split(':').map(Number);
    const hh = String(Math.max(0, Math.min(23, hours))).padStart(2, '0');
    const mm = String(Math.max(0, Math.min(59, minutes))).padStart(2, '0');
    return `${hh}:${mm}`;
  }

  if (/^\d{3,4}$/.test(raw)) {
    const hh = raw.length === 3 ? `0${raw[0]}` : raw.slice(0, 2);
    const mm = raw.slice(-2);
    return normalizeHHMM(`${hh}:${mm}`);
  }

  return raw;
}

function cellKey(rowId, dateKey) {
  return `${rowId}::${dateKey}`;
}

const DEFAULT_TIME_TRACKING_REASON = 'Tracked missed time';
const MISSED_TIME_TYPE_OPTIONS = [
  { value: 'flare-up', label: 'Flare-up — unable to work' },
  { value: 'treatment', label: 'Treatment appointment + recovery' },
  { value: 'appointment', label: 'Medical appointment' },
  { value: 'initial-onset', label: 'Initial onset — full day absence' },
  { value: 'family', label: 'Family care' },
  { value: 'other', label: 'Other' },
];

const LOG_REASON_OPTIONS = [
  { value: 'Treatment', label: 'Treatment' },
  { value: 'Episode', label: 'Episode' },
];

const DEFAULT_WEEK_SCHEDULE = [0, 8, 8, 8, 8, 8, 0];

function createTimeRows(count = 3) {
  return Array.from({ length: count }, (_, index) => ({
    id: `time-row-${index + 1}`,
  }));
}

function makeTimeRowId() {
  return `time-row-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function TimeTrackingContent({ episodes, isActive, onEpisodesReplace }) {
  const totalMinutes = episodes.reduce((sum, entry) => sum + parseHHMM(entry.hours), 0);
  const totalLabel = formatTotalFromMinutes(totalMinutes);
  const latestWeekStart = useMemo(() => {
    const parsedDates = episodes.map((entry) => parseEpisodeDate(entry.date)).filter(Boolean).sort((left, right) => right - left);
    return startOfWeekSunday(parsedDates[0] || new Date());
  }, [episodes]);

  const [weekStart, setWeekStart] = useState(latestWeekStart);
  const [editingEntry, setEditingEntry] = useState(null);
  const [addingForDate, setAddingForDate] = useState(null);
  const hasInitializedWeekRef = useRef(false);

  useEffect(() => {
    if (hasInitializedWeekRef.current) return;
    setWeekStart(latestWeekStart);
    hasInitializedWeekRef.current = true;
  }, [latestWeekStart]);

  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)), [weekStart]);
  const weekDateKeys = useMemo(() => weekDays.map((day) => formatEpisodeDate(day)), [weekDays]);
  const weekEnd = useMemo(() => addDays(weekStart, 6), [weekStart]);

  const weeklyEntries = useMemo(() => {
    return episodes
      .filter((entry) => {
        const parsed = parseEpisodeDate(entry.date);
        if (!parsed) return false;
        const current = new Date(parsed);
        current.setHours(0, 0, 0, 0);
        return current >= weekStart && current <= weekEnd;
      })
      .sort((left, right) => {
        const leftDate = parseEpisodeDate(left.date);
        const rightDate = parseEpisodeDate(right.date);
        if (!leftDate && !rightDate) return 0;
        if (!leftDate) return 1;
        if (!rightDate) return -1;
        return leftDate - rightDate;
      });
  }, [episodes, weekStart, weekEnd]);

  const entriesByDate = useMemo(() => {
    const map = {};
    weeklyEntries.forEach((entry) => {
      if (!map[entry.date]) map[entry.date] = [];
      map[entry.date].push(entry);
    });
    return map;
  }, [weeklyEntries]);

  const dayTotals = useMemo(() => {
    return weekDateKeys.map((dateKey) => {
      const dayEntries = entriesByDate[dateKey] || [];
      return dayEntries.reduce((sum, entry) => sum + parseHHMM(entry.hours), 0);
    });
  }, [weekDateKeys, entriesByDate]);

  const weeklyTotalMinutes = useMemo(() => weeklyEntries.reduce((sum, entry) => sum + parseHHMM(entry.hours), 0), [weeklyEntries]);

  function handleEditEntry(entry) {
    setEditingEntry(entry);
  }

  function handleSaveEditEntry(updatedEntry) {
    const nextEntries = episodes.map((entry) =>
      entry.date === editingEntry.date && entry.hours === editingEntry.hours && entry.reason === editingEntry.reason
        ? updatedEntry
        : entry
    );
    onEpisodesReplace(nextEntries);
    setEditingEntry(null);
  }

  function handleDeleteEntry(entryToDelete) {
    const nextEntries = episodes.filter((entry) =>
      !(entry.date === entryToDelete.date && entry.hours === entryToDelete.hours && entry.reason === entryToDelete.reason)
    );
    onEpisodesReplace(nextEntries);
    setEditingEntry(null);
  }

  function handleSaveNewEntries(newEntries) {
    let merged = [...episodes];
    for (const newEntry of newEntries) {
      const existingIdx = merged.findIndex(
        (e) => e.date === newEntry.date && e.reason === newEntry.reason
      );
      if (existingIdx !== -1) {
        const existing = merged[existingIdx];
        const totalMinutes = parseHHMM(existing.hours) + parseHHMM(newEntry.hours);
        merged[existingIdx] = { ...existing, hours: formatMinutesAsHHMM(totalMinutes), reported: newEntry.reported };
      } else {
        merged.push(newEntry);
      }
    }
    onEpisodesReplace(merged);
    setAddingForDate(null);
  }

  return (
    <>
      <div className="ad-timesheet-card">
        <div className="ad-timesheet-header">
          <div>
            <div className="ad-timesheet-title">Log Missing Hours</div>
            <p className="ad-episode-helper">{totalLabel} tracked overall.</p>
          </div>
          <div className="ad-timesheet-week-controls">
            <div className="ad-timesheet-weeknav">
              <button type="button" onClick={() => setWeekStart((prev) => addDays(prev, -7))} aria-label="Previous week">‹</button>
              <strong>{formatWeekRange(weekStart)}</strong>
              <button type="button" onClick={() => setWeekStart((prev) => addDays(prev, 7))} aria-label="Next week">›</button>
            </div>
            <div className="ad-timesheet-week-total">
              <span>Week Total</span>
              <strong>{formatMinutesAsHHMM(weeklyTotalMinutes)}</strong>
            </div>
          </div>
        </div>

        <div className="ad-workday-grid">
          <div className="ad-workday-grid-header">
            {weekDays.map((day, idx) => (
              <div key={day.toISOString()} className="ad-workday-day-col">
                <div className="ad-workday-day-label">{formatDayLabel(day)}</div>
                <div className="ad-workday-day-hours">Hours: {formatMinutesAsHHMM(dayTotals[idx])}</div>
              </div>
            ))}
          </div>

          <div className="ad-workday-grid-body">
            {weekDays.map((day, dayIdx) => {
              const dateKey = weekDateKeys[dayIdx];
              const dayEntries = entriesByDate[dateKey] || [];
              return (
                <div className="ad-workday-day-col" key={`body-${dateKey}`}>
                  <div className="ad-workday-entries">
                    {dayEntries.map((entry, entryIdx) => (
                      <div
                        key={`${entry.date}-${entryIdx}`}
                        className="ad-workday-entry-card"
                        role="button"
                        tabIndex={0}
                      >
                        <div className="ad-workday-entry-header">
                          <div className="ad-workday-entry-title">*{entry.reason}</div>
                          <button
                            type="button"
                            className="ad-workday-entry-remove"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteEntry(entry);
                            }}
                            title="Remove entry"
                            aria-label="Remove entry"
                          >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                          </button>
                        </div>
                        <div className="ad-workday-entry-hours" onClick={() => handleEditEntry(entry)}>{entry.hours}</div>
                        <div className="ad-workday-entry-detail" onClick={() => handleEditEntry(entry)}>{entry.reason}</div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="ad-workday-add-btn-col"
                      onClick={() => setAddingForDate(dateKey)}
                      title="Add entry"
                      aria-label="Add entry"
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      Add
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {editingEntry && (
        <EpisodeModal
          episode={editingEntry}
          onSave={(entries) => {
            const updated = Array.isArray(entries) ? entries[0] : entries;
            if (updated) handleSaveEditEntry(updated);
            setEditingEntry(null);
          }}
          onDelete={() => handleDeleteEntry(editingEntry)}
          onClose={() => setEditingEntry(null)}
        />
      )}

      {addingForDate && (
        <EpisodeModal
          episode={null}
          initialDate={addingForDate}
          onSave={handleSaveNewEntries}
          onClose={() => setAddingForDate(null)}
        />
      )}
    </>
  );
}

function TimeTrackingPanel({ caseData, episodes, onEpisodesReplace }) {
  const isActive = caseData.statusKey === 'approved' || caseData.statusKey === 'active' || caseData.statusKey === 'pending';

  return (
    <div className="details-grid">
      <div className="details-main">
        <TimeTrackingContent
          episodes={episodes}
          isActive={isActive}
          onEpisodesReplace={onEpisodesReplace}
        />
      </div>
      <DetailsSidebar caseData={caseData} activeTab="timeTracking" onTabChange={() => {}} />
    </div>
  );
}

function BenefitSteps({ steps }) {
  return (
    <div className="dt-benefit-steps">
      {steps.map((step) => (
        <div key={step.label} className="dt-benefit-step">
          <div className={`dt-benefit-dot ${step.status === 'current' ? 'current' : step.status}`} />
          <div className="dt-benefit-step-text-wrap">
            <div className="dt-benefit-step-text">{step.label}</div>
            <div className="dt-benefit-step-date">{step.date || 'Pending'}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function findMissedHoursTask(taskGroups) {
  for (const group of taskGroups) {
    for (const item of group.items || []) {
      const text = `${item.title || ''} ${item.subtitle || ''}`.toLowerCase();
      if (item.actionTab === 'absenceLog' && (text.includes('missed') || text.includes('time'))) {
        return item;
      }
    }
  }
  return null;
}

function TasksSidebar({ caseData, complete, onTabChange, missedHoursTask, onOpenLogHoursModal }) {
  const protectionLabels = caseData.coverage
    .map((item) => item.name)
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div className="details-sidebar">
      <div className="ad-sidebar-missed-hours">
        <div className="ad-sidebar-missed-hours-label">Leave Hours</div>
        <h4>Log your leave hours</h4>
        <p>Keep your timesheet up to date by recording any hours missed due to your absence.</p>
        <button className="ad-missed-time-cta" type="button" onClick={onOpenLogHoursModal}>
          Log Hours
        </button>
      </div>

      <div className="dt-sidebar-card">
        <h4>Quick Actions</h4>
        <button className="dt-quick-item" type="button" onClick={() => onTabChange('documents')}>
          <span>Upload Documents</span>
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M1.5 1L6.5 6l-5 5" stroke="#3d3d47" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        {complete ? (
          <button className="dt-quick-item" type="button">
            <span>Manage Return to Work</span>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M1.5 1L6.5 6l-5 5" stroke="#3d3d47" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        ) : null}
        <button className="dt-quick-item" type="button">
          <span>Send a Message</span>
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M1.5 1L6.5 6l-5 5" stroke="#3d3d47" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      <div className="ad-protection-card">
        <h4>Your Benefits &amp; Protections</h4>
        <div className="ad-protection-list">
          {protectionLabels.map((label) => (
            <div key={label} className="ad-protection-item">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1a7 7 0 100 14A7 7 0 008 1z" stroke="#2563eb" strokeWidth="1.2"/><path d="M5.5 8l2 2 3.5-3.5" stroke="#2563eb" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function parseHHMM(value) {
  const [h, m] = String(value).split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

function formatTotalFromMinutes(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function formatTimestamp() {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const yyyy = now.getFullYear();
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  return `${mm}/${dd}/${yyyy} · ${hh}:${min}`;
}

function EditEntryModal({ entry, onSave, onDelete, onClose }) {
  const [date, setDate] = useState(entry?.date || '');
  const [hours, setHours] = useState(entry?.hours || '');
  const [reason, setReason] = useState(entry?.reason || '');

  const normalizedDate = formatEpisodeDate(date || '');
  const normalizedHours = normalizeHHMM(hours || '');
  const canSave = !!normalizedDate && !!normalizedHours && parseHHMM(normalizedHours) > 0;

  function handleSave(e) {
    e.preventDefault();
    if (!canSave) return;
    onSave({
      date: normalizedDate,
      hours: normalizedHours,
      reason,
      reported: entry.reported || formatTimestamp(),
    });
  }

  return (
    <div className="ad-modal-backdrop" onClick={onClose}>
      <div className="ad-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ad-modal-header">
          <h3>Edit Logged Time</h3>
          <button className="ad-modal-close" type="button" onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <form className="ad-modal-body" onSubmit={handleSave}>
          <div className="ad-modal-field">
            <label htmlFor="edit-date">Date</label>
            <input id="edit-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="ad-modal-field">
            <label htmlFor="edit-hours">Duration (HH:MM)</label>
            <input id="edit-hours" type="text" placeholder="08:00" value={hours} onChange={(e) => setHours(e.target.value)} required />
          </div>
          <div className="ad-modal-field">
            <label htmlFor="edit-reason">Reason (Comment)</label>
            <input id="edit-reason" type="text" placeholder="e.g. Medical appointment" value={reason} onChange={(e) => setReason(e.target.value)} />
          </div>

          <div className="ad-modal-actions">
            <button className="btn btn-back" type="button" onClick={() => onDelete(entry)}>Delete</button>
            <div style={{ flex: 1 }} />
            <button className="btn btn-back" type="button" onClick={onClose}>Cancel</button>
            <button className="btn btn-next" type="submit" disabled={!canSave}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function toInputDate(mmddyyyy) {
  if (!mmddyyyy) return '';
  const parsed = parseEpisodeDate(mmddyyyy);
  if (!parsed) return mmddyyyy;
  const yyyy = parsed.getFullYear();
  const mm = String(parsed.getMonth() + 1).padStart(2, '0');
  const dd = String(parsed.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function EpisodeModal({ episode, initialDate, onSave, onDelete, onClose }) {
  const isEdit = !!episode;
  const [date, setDate] = useState(isEdit ? toInputDate(episode.date) : (toInputDate(initialDate) || ''));
  const [hours, setHours] = useState(episode?.hours || '');
  const [reason, setReason] = useState(episode?.reason || 'Treatment');
  const [queuedEntries, setQueuedEntries] = useState([]);
  const [showReasonTooltip, setShowReasonTooltip] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(false);
  const [savedWeeks, setSavedWeeks] = useState([[...DEFAULT_WEEK_SCHEDULE]]);
  const [draftWeeks, setDraftWeeks] = useState([[...DEFAULT_WEEK_SCHEDULE]]);

  const weeks = editingSchedule ? draftWeeks : savedWeeks;
  const scheduleTotal = savedWeeks[0].reduce((s, v) => s + (Number(v) || 0), 0);
  const scheduleWeekRange = useMemo(() => {
    const now = new Date();
    const dow = now.getDay();
    const sun = new Date(now);
    sun.setDate(now.getDate() - dow);
    const fmt = (d) => d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    return `${fmt(sun)} | ${scheduleTotal} hours per week`;
  }, [scheduleTotal]);

  function handleEditSchedule() {
    setDraftWeeks(savedWeeks.map((w) => [...w]));
    setEditingSchedule(true);
  }

  function handleCancelSchedule() {
    setEditingSchedule(false);
  }

  function handleSaveSchedule() {
    setSavedWeeks(draftWeeks.map((w) => [...w]));
    setEditingSchedule(false);
  }

  function handleAddWeek() {
    setDraftWeeks((prev) => [...prev, [...DEFAULT_WEEK_SCHEDULE]]);
  }

  function handleRemoveWeek(weekIdx) {
    setDraftWeeks((prev) => prev.filter((_, i) => i !== weekIdx));
  }

  function handleDraftDayChange(weekIdx, dayIdx, value) {
    const val = value.replace(/[^0-9]/g, '');
    const hrs = Math.min(24, parseInt(val, 10) || 0);
    setDraftWeeks((prev) => {
      const next = prev.map((w) => [...w]);
      next[weekIdx][dayIdx] = hrs;
      return next;
    });
  }

  function buildEntry() {
    const normalized = normalizeHHMM(hours);
    if (!date || !normalized || parseHHMM(normalized) <= 0) return null;
    const normalizedDate = formatEpisodeDate(date);
    return { date: normalizedDate, hours: normalized, reason: reason || DEFAULT_TIME_TRACKING_REASON, reported: formatTimestamp() };
  }

  function handleAddAnother() {
    const entry = buildEntry();
    if (!entry) return;
    setQueuedEntries((prev) => [...prev, entry]);
    setDate('');
    setHours('');
  }

  function handleSubmit() {
    const entry = buildEntry();
    const all = entry ? [...queuedEntries, entry] : queuedEntries;
    if (!all.length) return;
    onSave(all);
  }

  function handleRemoveQueued(idx) {
    setQueuedEntries((prev) => prev.filter((_, i) => i !== idx));
  }

  const totalMinutes = useMemo(() => {
    let sum = queuedEntries.reduce((s, e) => s + parseHHMM(e.hours), 0);
    const current = normalizeHHMM(hours);
    if (current && parseHHMM(current) > 0) sum += parseHHMM(current);
    return sum;
  }, [queuedEntries, hours]);

  const totalHours = Math.floor(totalMinutes / 60);
  const totalMins = totalMinutes % 60;
  const totalLabel = totalMins > 0
    ? `${totalHours} HOUR${totalHours !== 1 ? 'S' : ''}, ${totalMins} MINUTES`
    : `${totalHours} HOUR${totalHours !== 1 ? 'S' : ''}`;

  const canSubmit = (buildEntry() !== null) || queuedEntries.length > 0;
  const dayLabels = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="ad-modal-backdrop" onClick={onClose}>
      <div className="ad-modal ltm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ad-modal-header">
          <h3>Log missed time</h3>
          <button className="ad-modal-close" type="button" onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <div className="ad-modal-body">
          <h2 className="ltm-title">Log missed time</h2>
          <p className="ltm-subtitle">Log the time you were unable to work for this absence. You can log past or future time.</p>

          <div className="ltm-schedule-card">
            <div className="ltm-schedule-left">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><rect x="4" y="6" width="28" height="24" rx="3" stroke="#0f0f14" strokeWidth="1.8"/><path d="M4 12h28M12 4v4M24 4v4" stroke="#0f0f14" strokeWidth="1.8" strokeLinecap="round"/><rect x="9" y="16" width="4" height="4" rx="0.5" fill="#d4d4d8"/><rect x="16" y="16" width="4" height="4" rx="0.5" fill="#d4d4d8"/><rect x="23" y="16" width="4" height="4" rx="0.5" fill="#d4d4d8"/><rect x="9" y="23" width="4" height="4" rx="0.5" fill="#d4d4d8"/><rect x="16" y="23" width="4" height="4" rx="0.5" fill="#d4d4d8"/></svg>
              <div>
                <div className="ltm-schedule-title">Your Current Work Schedule</div>
                <div className="ltm-schedule-meta">{scheduleWeekRange}</div>
              </div>
            </div>
            {editingSchedule ? (
              <div className="ltm-schedule-card-actions">
                <button className="ltm-cancel-btn" type="button" onClick={handleCancelSchedule}>Cancel</button>
                <button className="ltm-submit-btn" type="button" onClick={handleSaveSchedule}>Save</button>
              </div>
            ) : (
              <button className="ltm-edit-schedule-btn" type="button" onClick={handleEditSchedule}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Edit schedule
              </button>
            )}
          </div>

          {editingSchedule && (
            <div className="ltm-schedule-editor">
              {draftWeeks.map((week, weekIdx) => {
                const weekTotal = week.reduce((s, v) => s + (Number(v) || 0), 0);
                return (
                  <div key={weekIdx} className="ltm-schedule-week-block">
                    <div className="ltm-schedule-editor-header">
                      <div className="ltm-schedule-editor-left">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        <strong>Week {weekIdx + 1}</strong>
                      </div>
                      <div className="ltm-schedule-editor-right">
                        <span className="ltm-schedule-editor-total">{weekTotal} hrs / week</span>
                        {draftWeeks.length > 1 && (
                          <button className="ltm-remove-week-btn" type="button" onClick={() => handleRemoveWeek(weekIdx)} aria-label="Remove week">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                          </button>
                        )}
                      </div>
                    </div>
                    {weekIdx === 0 && <div className="ltm-schedule-editor-hint">Click each day to enter hours. Default is 8 hours/day for weekdays.</div>}
                    <div className="ltm-schedule-days">
                      {dayLabels.map((label, dayIdx) => (
                        <div key={label} className="ltm-schedule-day-col">
                          <div className="ltm-schedule-day-label">{label}</div>
                          <input
                            type="text"
                            className="ltm-schedule-day-input"
                            value={String(week[dayIdx]).padStart(2, '0') + ':00'}
                            onChange={(e) => handleDraftDayChange(weekIdx, dayIdx, e.target.value)}
                          />
                          <div className="ltm-schedule-day-unit">hrs | mm</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              <button className="ltm-add-week-btn" type="button" onClick={handleAddWeek}>+ Add another week</button>
            </div>
          )}

          <div className="ltm-form-card">
            <h4 className="ltm-form-heading">Log missed time</h4>
            <div className="ltm-form-row">
              <div className="ltm-form-field">
                <label>DATE MISSED</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="MM/DD/YYYY" />
              </div>
              <div className="ltm-form-field">
                <label>TIME MISSED</label>
                <input type="text" placeholder="HH:MM" value={hours} onChange={(e) => setHours(e.target.value)} />
                <span className="ltm-form-hint">Enter total hours missed (exclude unpaid breaks like lunch)</span>
              </div>
            </div>

            <div className="ltm-form-field ltm-reason-field">
              <label>
                PROVIDE REASON
                <button className="ltm-reason-info" type="button" onClick={() => setShowReasonTooltip(!showReasonTooltip)} aria-label="Reason info">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/><path d="M8 7v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="5" r="0.8" fill="currentColor"/></svg>
                </button>
              </label>
              <div className="ltm-reason-select-wrap">
                <select value={reason} onChange={(e) => setReason(e.target.value)}>
                  <option value="">Select Reason</option>
                  {LOG_REASON_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {showReasonTooltip && (
                  <div className="ltm-reason-tooltip">
                    <strong>Reason for Absence</strong>
                    <ul>
                      <li><strong>Treatment</strong>: Scheduled Care (e.g., doctor visit, therapy, dialysis)</li>
                      <li><strong>Episode</strong>: Unexpected Symptoms or flare up</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {queuedEntries.length > 0 && (
              <div className="ltm-entered-times">
                <div className="ltm-entered-times-title">ENTERED TIMES ({queuedEntries.length})</div>
                {queuedEntries.map((entry, idx) => (
                  <div key={`${entry.date}-${entry.hours}-${idx}`} className="ltm-entered-row">
                    <span className="ltm-entered-date">{entry.date}</span>
                    <span className="ltm-entered-hours">{Math.floor(parseHHMM(entry.hours) / 60)} hrs</span>
                    <span className="ltm-entered-reason">{entry.reason}</span>
                    <button type="button" className="ltm-entered-remove" onClick={() => handleRemoveQueued(idx)} aria-label="Remove">&times;</button>
                  </div>
                ))}
              </div>
            )}

            {totalMinutes > 0 && (
              <div className="ltm-total-bar">TOTAL TIME MISSED: {totalLabel}</div>
            )}
          </div>

          <div className="ltm-actions">
            {isEdit && onDelete && (
              <button className="ltm-delete-btn" type="button" onClick={onDelete}>Delete</button>
            )}
            <button className="ltm-cancel-btn" type="button" onClick={onClose}>Cancel</button>
            {!isEdit && (
              <button className="ltm-add-day-btn" type="button" onClick={handleAddAnother} disabled={!buildEntry()}>Add Another Day</button>
            )}
            <button className="ltm-submit-btn" type="button" onClick={handleSubmit} disabled={!canSubmit}>
              {isEdit ? 'Save Changes' : 'Log missed time'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AbsenceLogPanel({ caseData, episodes, onEpisodesReplace, onTabChange }) {
  const navigate = useNavigate();
  const [calMonth, setCalMonth] = useState(() => new Date().getMonth());
  const [calYear, setCalYear] = useState(() => new Date().getFullYear());
  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  const absenceEntries = useMemo(() => {
    return [...episodes].sort((a, b) => {
      const da = parseEpisodeDate(a.date);
      const db = parseEpisodeDate(b.date);
      if (!da && !db) return 0;
      if (!da) return 1;
      if (!db) return -1;
      return da - db;
    });
  }, [episodes]);

  const totalMinutes = useMemo(() => episodes.reduce((sum, e) => sum + parseHHMM(e.hours), 0), [episodes]);

  const loggedDateMap = useMemo(() => {
    const map = {};
    episodes.forEach((e) => {
      const parsed = parseEpisodeDate(e.date);
      if (!parsed) return;
      const key = `${parsed.getFullYear()}-${parsed.getMonth()}-${parsed.getDate()}`;
      const minutes = parseHHMM(e.hours);
      map[key] = (map[key] || 0) + minutes;
    });
    return map;
  }, [episodes]);

  const calendarDays = useMemo(() => {
    const first = new Date(calYear, calMonth, 1);
    const startDow = first.getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startDow; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }, [calMonth, calYear]);

  const monthLabel = new Date(calYear, calMonth, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const today = new Date();

  function calDayClass(day) {
    if (!day) return 'ah-cal-empty';
    const key = `${calYear}-${calMonth}-${day}`;
    const minutes = loggedDateMap[key] || 0;
    const isToday = day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
    let cls = 'ah-cal-day';
    if (isToday) cls += ' today';
    if (minutes > 0) cls += ' logged';
    return cls;
  }

  function handleSaveNewEntries(newEntries) {
    let merged = [...episodes];
    for (const newEntry of newEntries) {
      const existingIdx = merged.findIndex((e) => e.date === newEntry.date && e.reason === newEntry.reason);
      if (existingIdx !== -1) {
        const existing = merged[existingIdx];
        const totalMin = parseHHMM(existing.hours) + parseHHMM(newEntry.hours);
        merged[existingIdx] = { ...existing, hours: formatMinutesAsHHMM(totalMin), reported: newEntry.reported };
      } else {
        merged.push(newEntry);
      }
    }
    onEpisodesReplace(merged);
    setShowModal(false);
  }

  function handleSaveEdit(updated) {
    const next = episodes.map((e) =>
      e.date === editingEntry.date && e.hours === editingEntry.hours && e.reason === editingEntry.reason ? updated : e
    );
    onEpisodesReplace(next);
    setEditingEntry(null);
  }

  function handleDeleteEdit(entry) {
    const next = episodes.filter((e) => !(e.date === entry.date && e.hours === entry.hours && e.reason === entry.reason));
    onEpisodesReplace(next);
    setEditingEntry(null);
  }

  function formatHoursLabel(hhMM) {
    const m = parseHHMM(hhMM);
    const h = Math.floor(m / 60);
    return h + ' hrs';
  }

  function formatReasonShort(reason) {
    if (!reason) return '—';
    if (reason.toLowerCase().includes('treatment')) return 'Treatment';
    if (reason.toLowerCase().includes('episode') || reason.toLowerCase().includes('flare') || reason.toLowerCase().includes('onset')) return 'Episode';
    if (reason.toLowerCase().includes('medical') || reason.toLowerCase().includes('appointment')) return 'Treatment';
    return reason.length > 20 ? reason.slice(0, 20) + '…' : reason;
  }

  function formatAddedOn(reported) {
    if (!reported) return '—';
    const datePart = reported.split('·')[0].trim();
    const parsed = parseEpisodeDate(datePart);
    if (!parsed) return datePart;
    return String(parsed.getMonth() + 1).padStart(2, '0') + '/' + String(parsed.getDate()).padStart(2, '0') + '/' + parsed.getFullYear();
  }

  return (
    <div className="details-grid">
      <div className="details-main">
        <div className="al-card">
          <div className="al-card-header">
            <h3>Absence Log</h3>
            <div className="al-header-stats">
              Total hours logged: <strong>{formatMinutesAsHHMM(totalMinutes)}</strong>
              <span className="al-header-sep" />
              Total Entries: <strong>{episodes.length}</strong>
            </div>
          </div>

          {absenceEntries.length === 0 ? (
            <div className="al-empty">
              <div className="al-empty-icon">
                <svg width="40" height="40" fill="none" stroke="#a3a3a3" strokeWidth="1.3"><circle cx="20" cy="20" r="16"/><path d="M20 13v7l5 3"/></svg>
              </div>
              <h4>No absences logged yet</h4>
              <p>Log the time you were unable to work for this absence. You can log past or future time.</p>
            </div>
          ) : (
            <div className="al-table-wrap">
              <table className="al-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Hours Missed</th>
                    <th>Reason</th>
                    <th>Added On</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {absenceEntries.map((entry, idx) => (
                    <tr key={`${entry.date}-${idx}`}>
                      <td>{entry.date}</td>
                      <td>{formatHoursLabel(entry.hours)}</td>
                      <td>{formatReasonShort(entry.reason)}</td>
                      <td>{formatAddedOn(entry.reported)}</td>
                      <td>
                        <button className="al-edit-btn" type="button" onClick={() => setEditingEntry(entry)}>
                          <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="al-footer">
            <button className="al-log-btn" type="button" onClick={() => setShowModal(true)}>
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6.5 2v9M2 6.5h9"/></svg>
              Log missed time
            </button>
            <button className="al-view-all-btn" type="button" onClick={() => navigate('/absence-history')}>
              View all of my Absences
            </button>
          </div>
        </div>

        {showModal && (
          <EpisodeModal episode={null} onSave={handleSaveNewEntries} onClose={() => setShowModal(false)} />
        )}
        {editingEntry && (
          <EpisodeModal
            episode={editingEntry}
            onSave={(entries) => {
              const updated = Array.isArray(entries) ? entries[0] : entries;
              if (updated) handleSaveEdit(updated);
              setEditingEntry(null);
            }}
            onDelete={() => { handleDeleteEdit(editingEntry); }}
            onClose={() => setEditingEntry(null)}
          />
        )}
      </div>

      <div className="details-sidebar">
        <div className="ah-card">
          <div className="ah-cal-header">
            <h3>{monthLabel}</h3>
            <div className="ah-cal-nav">
              <button type="button" onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear((y) => y - 1); } else setCalMonth((m) => m - 1); }} aria-label="Previous month">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2L4 6l4 4"/></svg>
              </button>
              <button type="button" onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear((y) => y + 1); } else setCalMonth((m) => m + 1); }} aria-label="Next month">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 2l4 4-4 4"/></svg>
              </button>
            </div>
          </div>
          <div className="ah-cal-grid">
            {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((d) => (
              <div key={d} className="ah-cal-head">{d}</div>
            ))}
            {calendarDays.map((day, idx) => (
              <div key={idx} className={calDayClass(day)}>{day || ''}</div>
            ))}
          </div>
          <div className="ah-cal-legend">
            <span><span className="ah-legend-dot logged" /> Log missed time</span>
            <span><span className="ah-legend-dot today-ring" /> Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TasksPanel({ caseData, onTabChange, onPlanRtw, onOpenLogHoursModal }) {
  const complete = caseData.statusKey === 'approved';
  const taskGroups = complete
    ? [
        ...caseData.taskGroups,
        {
          title: 'Return to Work',
          progress: '',
          badge: '',
          steps: [],
          items: [
            { title: 'Confirm Return Date', subtitle: `Expected ${formatDate(caseData.returnDate)}`, status: 'upcoming' },
            { title: 'Complete Return to Work Checklist', subtitle: 'Available closer to return date', status: 'upcoming' },
          ],
        },
      ]
    : caseData.taskGroups;
  const missedHoursTask = findMissedHoursTask(taskGroups);

  const [openGroups, setOpenGroups] = useState({});

  useEffect(() => {
    const initial = {};
    taskGroups.forEach((group, index) => {
      if (group.steps && group.steps.length > 0) {
        initial[group.title] = index === 0;
      }
    });
    setOpenGroups(initial);
  }, [caseData.id, complete]);

  function toggleGroup(title) {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  }

  return (
    <div className="details-grid">
      <div className="details-main">
        <div className="dt-benefits-section">
          <div className="ltm-reminder-banner">
            <div className="ltm-reminder-left">
              <div className="ltm-reminder-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div>
                <div className="ltm-reminder-title">Don't forget to log missed time</div>
                <div className="ltm-reminder-desc">Intermittent leave requires logging missed time.</div>
              </div>
            </div>
            <button className="ltm-reminder-cta" type="button" onClick={onOpenLogHoursModal}>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 1v10M1 6h10"/></svg>
              Log missed time
            </button>
          </div>

          <div className="dt-dark-banner" style={{ marginBottom: 24 }}>
            <div className={`icon ${complete ? 'success' : 'info'}`}>
              {complete ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 7l2.5 2.5L10.5 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#fff" strokeWidth="1.2"/><path d="M7 4v3l2.5 1.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div className="title ad-task-banner-title">
                <span>{complete ? 'All tasks complete' : `Action required — ${caseData.taskSummary.todo} items need your attention`}</span>
                {complete ? <button type="button" className="btn btn-next ad-rtw-btn" onClick={onPlanRtw}>Plan Return to Work</button> : null}
              </div>
              <div className="desc">
                {complete ? 'All required documentation has been submitted and your absence is approved. When you are ready, plan your return to work.' : 'Submit required documentation to continue processing your absence request. Your eligibility review is in progress.'}
              </div>
            </div>
          </div>

          <div className="task-summary-bar">
            <div className="task-summary-stat"><strong>{caseData.taskSummary.todo}</strong> to do</div>
            <div className="task-summary-stat"><strong>{caseData.taskSummary.completed}</strong> completed</div>
            <div className="task-summary-stat"><strong>{caseData.taskSummary.total}</strong> total</div>
          </div>

          {taskGroups.map((group) => (
            <div key={group.title} className="task-group">
              <div className="task-group-header">
                <h4>{group.title}</h4>
                {group.progress ? <div className="task-group-count">{group.progress}</div> : null}
              </div>

              {group.steps && group.steps.length > 0 ? (
                <div className="bp-accordion open">
                  <button type="button" className="bp-accordion-toggle" onClick={() => toggleGroup(group.title)}>
                    <div className="bp-accordion-left">
                      <span className="bp-accordion-title">Status Activity</span>
                      <span className="bp-accordion-badge">{group.badge}</span>
                    </div>
                    <span className={`bp-accordion-chevron ${openGroups[group.title] ? 'open' : ''}`}>
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#737373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </button>
                  <div className="bp-accordion-body" style={{ display: openGroups[group.title] ? 'block' : 'none' }}>
                    <div className="dt-benefit-progress">
                      <div className="dt-benefit-card">
                        <BenefitSteps steps={group.steps} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {group.items.map((item) => (
                <button
                  key={item.title}
                  className="task-item ad-task-item-button"
                  type="button"
                  onClick={() => {
                    if (item.actionTab === 'absenceLog') {
                      onOpenLogHoursModal();
                      return;
                    }
                    if (item.actionTab) onTabChange(item.actionTab);
                  }}
                >
                  <div className={`task-icon ${item.status}`}>{taskIcon(item.status)}</div>
                  <div className="task-body">
                    <div className="task-title">{item.title}</div>
                    <div className="task-sub">{item.subtitle}</div>
                  </div>
                  <span className={`task-badge ${item.status}`}>
                    {item.status === 'todo' ? 'TO DO' : item.status === 'upcoming' ? 'UPCOMING' : item.status.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          ))}

        </div>
      </div>

      <TasksSidebar
        caseData={caseData}
        complete={complete}
        onTabChange={onTabChange}
        missedHoursTask={missedHoursTask}
        onOpenLogHoursModal={onOpenLogHoursModal}
      />
    </div>
  );
}

function CoveragePanel({ caseData, selectedCoverageId, onCoverageSelect, onTabChange }) {
  const selectedCoverage = caseData.coverage.find((item) => item.id === selectedCoverageId) || caseData.coverage[0];
  const [tooltipCoverageId, setTooltipCoverageId] = useState(null);
  const [timelineView, setTimelineView] = useState(new URLSearchParams(window.location.search).get('view') || 'protection');
  const timelineMonths = monthAxisFromDate(caseData.startDate);
  const grayscaleAccents = ['#1f1f1f', '#4b4b4b', '#737373', '#a3a3a3'];
  const additionalBenefits = [
    {
      name: 'CA State Disability Insurance',
      tag: 'Potential Payment Source',
      description: 'Apply through your state benefits portal to determine eligibility.',
    },
    {
      name: 'CA Paid Family Leave',
      tag: 'Potential Payment Source',
      description: 'May provide wage replacement during family care or bonding time.',
    },
    {
      name: 'CA Pregnancy Disability Leave',
      description: 'May provide additional leave protections based on medical certification.',
    },
    {
      name: 'CA Family Rights Act (CFRA)',
      description: 'May provide state-level job protection for eligible leave reasons.',
    },
  ];

  const leaveStart = parseRangeDate(caseData.startDate) || parseRangeDate(selectedCoverage?.range?.split(' - ')[0]);
  const leaveEnd = parseRangeDate(caseData.endDate) || parseRangeDate(selectedCoverage?.range?.split(' - ')[1]);
  const timelineSpanMs = leaveStart && leaveEnd ? Math.max(leaveEnd - leaveStart, 1) : 1;

  useEffect(() => {
    setTooltipCoverageId(null);
    setTimelineView('protection');
  }, [caseData.id]);

  function segmentMetrics(rangeText) {
    if (!leaveStart || !leaveEnd || !rangeText) {
      return { left: 0, width: 100 };
    }
    const [rawStart, rawEnd] = rangeText.split(' - ');
    const segmentStart = parseRangeDate(rawStart) || leaveStart;
    const segmentEnd = parseRangeDate(rawEnd) || leaveEnd;
    const startPct = ((segmentStart - leaveStart) / timelineSpanMs) * 100;
    const endPct = ((segmentEnd - leaveStart) / timelineSpanMs) * 100;
    const left = Math.max(0, Math.min(100, startPct));
    const width = Math.max(2, Math.min(100 - left, endPct - startPct));
    return { left, width };
  }

  function handleTimelineClick(coverageId) {
    const coverageItem = caseData.coverage.find((item) => item.id === coverageId);
    if (coverageItem) onCoverageSelect(coverageId);
    setTooltipCoverageId((current) => (current === coverageId ? null : coverageId));
  }

  function lowFiAccent(index) {
    return grayscaleAccents[index % grayscaleAccents.length];
  }

  function unpaidGapRow() {
    const payableCoverage = caseData.coverage
      .filter((item) => !item.pay.toLowerCase().includes('unpaid'))
      .map((item) => ({ ...item, end: parseRangeDate(item.range.split(' - ')[1]) }))
      .filter((item) => item.end);

    if (!payableCoverage.length || !leaveEnd) return null;

    const latestPaidEnd = payableCoverage.reduce((latest, item) => (item.end > latest ? item.end : latest), payableCoverage[0].end);
    if (latestPaidEnd >= leaveEnd) return null;

    const gapStart = new Date(latestPaidEnd);
    gapStart.setDate(gapStart.getDate() + 1);

    return {
      id: 'unpaid-gap',
      label: 'Unpaid',
      name: 'Unpaid Gap',
      weeks: `${Math.max(1, Math.round((leaveEnd - gapStart) / 86400000 / 7))} weeks`,
      range: `${formatDate(gapStart.toISOString().slice(0, 10))} - ${formatDate(caseData.endDate)}`,
      pay: '$0 - Use PTO or go unpaid',
      status: caseData.statusKey === 'approved' ? 'Planned' : 'Pending',
      accent: '#d4d4d4',
      paymentValue: '—',
    };
  }

  const protectionRows = caseData.coverage.map((item) => ({ ...item, paymentValue: item.status }));
  const paymentRows = [
    ...caseData.coverage
      .filter((item) => !item.pay.toLowerCase().includes('unpaid'))
      .map((item) => ({
        ...item,
        pay: item.pay.toLowerCase().includes('payroll') ? '100% - Full Pay via Payroll' : item.pay,
        paymentValue: item.pay.toLowerCase().includes('payroll') ? '~$6,923/wk' : item.pay.includes('60%') ? '~$4,154/wk' : item.pay.includes('67%') ? '~$4,638/wk' : '—',
      })),
    ...(unpaidGapRow() ? [unpaidGapRow()] : []),
  ];

  const activeTimelineRows = timelineView === 'payment' ? paymentRows : [...protectionRows, ...(unpaidGapRow() ? [unpaidGapRow()] : [])];
  const tooltipCoverage = activeTimelineRows.find((item) => item.id === tooltipCoverageId) || null;
  const tooltipIndex = tooltipCoverage ? activeTimelineRows.findIndex((item) => item.id === tooltipCoverage.id) : -1;
  const tooltipMetrics = tooltipCoverage ? segmentMetrics(tooltipCoverage.range) : null;
  const estimatedIncome = caseData.paymentData?.rows
    ? caseData.paymentData.rows.reduce((sum, row) => sum + parseCurrencyAmount(row.amount), 0)
    : 74848;

  const policyLinkVisible = caseData.employerPolicies?.length > 0;

  return (
    <div className="details-grid">
      <div className="details-main">
        <div className="dt-timeline-wrap">
          <div className="ad-section-header">
            <div>
              <h3>Absence Timeline</h3>
              <p>{caseData.title} · Estimates subject to final approval</p>
            </div>
            <div className="dt-tl-toggle">
              <button type="button" className={timelineView === 'protection' ? 'active' : ''} onClick={() => setTimelineView('protection')}>Protection</button>
              <button type="button" className={timelineView === 'payment' ? 'active' : ''} onClick={() => setTimelineView('payment')}>Payment</button>
            </div>
          </div>
          <p className="ad-section-helper">Click a row to see details</p>

          <div className="dlp-timeline">
            <div className="dlp-tl-rows">
              {activeTimelineRows.map((item, index) => (
                <button
                  key={item.id}
                  className={`dlp-tl-row ${tooltipCoverageId === item.id || (tooltipCoverageId === null && selectedCoverage?.id === item.id) ? 'active' : ''}`}
                  type="button"
                  onClick={() => handleTimelineClick(item.id)}
                >
                  <div className="dlp-tl-row-label">{item.label || item.name}</div>
                  <div className="dlp-tl-row-bar">
                    <div className="dlp-tl-seg" style={{ left: `${segmentMetrics(item.range).left}%`, width: `${segmentMetrics(item.range).width}%`, background: lowFiAccent(index) }} />
                  </div>
                </button>
              ))}
            </div>

            {tooltipCoverage && tooltipMetrics ? (
              <div
                className="ad-coverage-tooltip ad-coverage-tooltip-floating"
                style={{
                  '--tooltip-top': `${tooltipIndex * 38 + 10}px`,
                  '--tooltip-left': `${Math.max(24, Math.min(92, tooltipMetrics.left + (tooltipMetrics.width / 2)))}%`,
                }}
              >
                <div className="ad-coverage-tooltip-head">
                  <div className="title">{tooltipCoverage.name}</div>
                  <button
                    className="ad-coverage-tooltip-close"
                    type="button"
                    aria-label="Close coverage details"
                    onClick={() => setTooltipCoverageId(null)}
                  >
                    ×
                  </button>
                </div>
                <div className="ad-coverage-tooltip-grid">
                  <div>
                    <div className="label">{timelineView === 'payment' ? 'Est. Weekly' : 'Status'}</div>
                    <div className="value">{timelineView === 'payment' ? tooltipCoverage.paymentValue : tooltipCoverage.status}</div>
                  </div>
                  <div>
                    <div className="label">Duration</div>
                    <div className="value">{tooltipCoverage.weeks}</div>
                  </div>
                  <div>
                    <div className="label">Dates</div>
                    <div className="value">{tooltipCoverage.range}</div>
                  </div>
                  <div>
                    <div className="label">Pay</div>
                    <div className="value">{tooltipCoverage.pay}</div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="dlp-tl-months">
              {timelineMonths.map((month) => <span key={month}>{month}</span>)}
            </div>

            <div className="dlp-legend">
              {(timelineView === 'payment'
                ? [
                    { id: 'full-pay', label: 'Full Pay (100%)', accent: '#1f1f1f' },
                    { id: 'partial-pay', label: 'Partial Pay', accent: '#737373' },
                    { id: 'unpaid', label: 'Unpaid', accent: '#d4d4d4' },
                  ]
                : activeTimelineRows).map((item, index) => (
                <div key={`legend-${item.id}`} className="dlp-legend-item">
                  <div className="dlp-legend-dot" style={{ background: item.accent || lowFiAccent(index) }} />
                  {item.label || item.name}
                </div>
              ))}
            </div>

            {timelineView === 'payment' ? (
              <div className="dt-payment-summary">
                <div className="dt-payment-summary-title">Estimated total income during leave</div>
                <div className="dt-payment-summary-value">{formatCurrencyAmount(estimatedIncome)}</div>
                <div className="dt-payment-summary-note">Based on current salary · Actual amounts may vary after approval</div>
              </div>
            ) : null}
          </div>

          <div className="dt-benefits-grid ad-benefits-grid">
            {caseData.coverage.map((item, index) => (
              <button
                key={item.id}
                className={`dt-benefit-item ad-benefit-button ${selectedCoverage?.id === item.id ? 'highlighted' : ''}`}
                data-tl-color="true"
                style={{ '--tl-color': lowFiAccent(index) }}
                type="button"
                onClick={() => onCoverageSelect(item.id)}
              >
                <div className="dt-benefit-left">
                  <div className="name"><span className="dt-color-dot" style={{ background: lowFiAccent(index) }} />{item.name}</div>
                  <div className="range">{item.range} · {item.weeks}</div>
                </div>
                <div className="dt-benefit-right">
                  <span className={`dt-badge ${badgeClass(caseData.statusKey)}`}>{item.status}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="dt-other">
          <h3>Additional Benefits</h3>
          <div className="dt-other-notice">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#1e40af" strokeWidth="1.2"/><path d="M8 5v3" stroke="#1e40af" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="11" r="0.6" fill="#1e40af"/></svg>
            You may still need to apply for state benefits on your state site.
          </div>
          {additionalBenefits.map((item) => (
            <div key={item.name} className="dt-other-item">
              <div>
                <div className="name">{item.name}</div>
                {item.description ? <div className="ad-other-item-desc">{item.description}</div> : null}
              </div>
              <div className="dt-other-item-right">
                {item.tag ? <span className="tag">{item.tag}</span> : null}
                <button className="dt-learn-btn" type="button">Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DetailsSidebar caseData={caseData} activeTab="coverage" onTabChange={onTabChange} />
    </div>
  );
}

function DetailsPanel({ caseData, onTabChange }) {
  const detailsSections = useMemo(() => {
    return caseData.detailsData.sections.map((section) => {
      if (section.title !== 'Absence Details') return section;

      const normalizedReturnDate = String(caseData.returnDate || '').trim().toLowerCase() === 'ongoing'
        ? 'Ongoing'
        : formatDate(caseData.returnDate);

      return {
        ...section,
        fields: section.fields.map((field) => {
          if (field.label === 'Absence Type') {
            return { ...field, value: caseData.frequency || field.value };
          }
          if (field.label === 'Absence Start Date') {
            return { ...field, value: formatDate(caseData.startDate) };
          }
          if (field.label === 'Absence End Date') {
            return { ...field, value: formatDate(caseData.endDate) };
          }
          if (field.label === 'Expected Return Date') {
            return { ...field, value: normalizedReturnDate };
          }
          if (field.label === 'Duration') {
            return { ...field, value: caseData.duration || field.value };
          }
          if (field.label === 'Schedule' && caseData.schedule) {
            return { ...field, value: caseData.schedule };
          }
          return field;
        }),
      };
    });
  }, [caseData]);

  return (
    <div className="details-grid">
      <div className="details-main">
        <div className="dt-info-section">
          {detailsSections.map((section) => (
            <div
              key={section.title}
              className={`dt-info-block ${section.title === 'Contact Information' ? 'dt-info-contact' : ''}`.trim()}
            >
              <div className="dt-info-block-header">
                <h4>{section.title}</h4>
                {section.editable && (
                  <button className="dt-info-edit-btn" type="button" aria-label={`Edit ${section.title}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                )}
              </div>
              <div className="dt-info-grid">
                {section.fields.map((field) => (
                  <div key={field.label}>
                    <div className="dt-info-field-label">{field.label}</div>
                    <div className="dt-info-field-value">{field.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <DetailsSidebar caseData={caseData} activeTab="details" onTabChange={onTabChange} />
    </div>
  );
}

function DocumentsPanel({ caseData, onTabChange }) {
  const isPending = caseData.statusKey === 'pending';
  const rows = caseData.documentsData.sections.flatMap((section) =>
    section.rows.map((row) => ({
      ...row,
      sourceTitle: section.title,
      statusLabel: row.status === 'Received' ? 'RECEIVED' : isPending ? 'AWAITING' : 'PENDING',
    })),
  );
  const receivedCount = rows.filter((row) => row.status === 'Received').length;
  const countLabel = isPending ? `${receivedCount} of ${rows.length}` : `${rows.length} FILES`;

  return (
    <div className="details-grid">
      <div className="details-main">
        {isPending ? (
          <div className="dt-dark-banner" style={{ marginBottom: 16 }}>
            <div className="icon info">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 4v4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="7" cy="11" r="1" fill="#fff"/></svg>
            </div>
            <div>
              <div className="title">Documents required to continue processing</div>
              <div className="desc">Please upload your required certification and medical documentation to complete eligibility review.</div>
            </div>
          </div>
        ) : null}

        <div className="doc-upload-card">
          <div className="doc-upload-head">
            <h3>Upload Document</h3>
            <span>{caseData.documentsData.uploadHint}</span>
          </div>
          <div className="ad-upload-dropzone">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 8l-5-5-5 5" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 3v12" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div>Drag and drop files here, or</div>
            <button className="dt-upload-btn" type="button">Browse Files</button>
          </div>
        </div>

        <div className="doc-table-card">
          <div className="doc-table-head">
            <div>
              <h3>Documents</h3>
              <p>{isPending ? 'Upload required documents to continue.' : 'All documents related to your absence request.'}</p>
            </div>
            <span className="doc-count-badge">{countLabel}</span>
          </div>
          <table className="doc-table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.sourceTitle}-${row.name}`}>
                  <td data-label="Document Name">
                    <div className="doc-name-wrap">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M9.5 1.5H4a1 1 0 00-1 1v11a1 1 0 001 1h8a1 1 0 001-1V5L9.5 1.5z" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 1.5V5H13" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span>{row.name}</span>
                    </div>
                  </td>
                  <td data-label="Type">{row.type === 'Certification' || row.type === 'Clinical Records' || row.type === 'Application' || row.type === 'Decision Notice' || row.type === 'Employer Notice' ? row.type : '—'}</td>
                  <td data-label="Date">{row.date}</td>
                  <td data-label="Status"><span className={`doc-status-badge ${row.status === 'Received' ? 'received' : isPending ? 'awaiting' : 'pending'}`}>{row.statusLabel}</span></td>
                  <td data-label="Actions" className="doc-actions-cell">
                    <button className="doc-download-btn" type="button" aria-label={`Download ${row.name}`}>
                      <svg width="13" height="13" viewBox="0 0 18 18" fill="none"><path d="M3 12v3a1 1 0 001 1h10a1 1 0 001-1v-3" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 3v8m0 0l3-3m-3 3L6 8" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span className="doc-download-label">Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DetailsSidebar caseData={caseData} activeTab="documents" onTabChange={onTabChange} />
    </div>
  );
}

function PaymentPanel({ caseData, onTabChange }) {
  const paymentData = caseData.paymentData;
  const paymentRows = paymentData.rows || [];
  const [openCards, setOpenCards] = useState({});
  const [quickRange, setQuickRange] = useState('all');
  const [sortKey, setSortKey] = useState('date-newest');
  const [benefitFilter, setBenefitFilter] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const normalizedRows = useMemo(() => paymentRows.map((row) => {
    const benefitLabels = {
      STD: 'Short-Term Disability (STD)',
      PFML: 'State Paid Family & Medical Leave (PFML)',
      Company: 'Employer-Paid Corporate Leave',
    };
    const recipientLabels = {
      STD: 'Paid to you · Direct deposit ****4829',
      PFML: 'Paid by state agency · Direct deposit ****4829',
      Company: 'Paid by employer · Mutual of Omaha',
    };
    const benefitLabel = benefitLabels[row.benefit] || row.benefit;
    const amount = parseCurrencyAmount(row.amount);
    const gross = amount / 0.82;
    const taxes = gross - amount;
    return {
      ...row,
      benefitLabel,
      issuedIso: isoFromFriendlyDate(row.issued),
      amountValue: amount,
      grossValue: gross,
      taxesValue: taxes,
      recipient: recipientLabels[row.benefit] || 'Paid by employer · Mutual of Omaha',
    };
  }), [paymentRows]);

  const availableBenefitTypes = useMemo(() => {
    const types = [...new Set(normalizedRows.map((row) => row.benefit))];
    return types.sort();
  }, [normalizedRows]);

  useEffect(() => {
    if (!normalizedRows.length) return;
    const dates = normalizedRows.map((row) => row.issuedIso).filter(Boolean).sort();
    setFromDate(dates[0]);
    setToDate(dates[dates.length - 1]);
    setQuickRange('all');
    setSortKey('date-newest');
    setBenefitFilter('all');
    const initialState = {};
    normalizedRows.forEach((row, idx) => {
      initialState[`${row.period}-${row.amount}-${row.benefit}`] = idx < 3;
    });
    setOpenCards(initialState);
  }, [caseData.id]);

  function toggleCard(cardId) {
    setOpenCards((current) => ({ ...current, [cardId]: !current[cardId] }));
  }

  const filteredRows = useMemo(() => {
    let rows = [...normalizedRows];

    if (benefitFilter !== 'all') {
      rows = rows.filter((row) => row.benefit === benefitFilter);
    }

    if (fromDate) {
      rows = rows.filter((row) => row.issuedIso >= fromDate);
    }

    if (toDate) {
      rows = rows.filter((row) => row.issuedIso <= toDate);
    }

    if (sortKey === 'date-oldest') {
      rows.sort((a, b) => a.issuedIso.localeCompare(b.issuedIso));
    } else if (sortKey === 'amount-high') {
      rows.sort((a, b) => b.amountValue - a.amountValue);
    } else if (sortKey === 'amount-low') {
      rows.sort((a, b) => a.amountValue - b.amountValue);
    } else {
      rows.sort((a, b) => b.issuedIso.localeCompare(a.issuedIso));
    }

    return rows;
  }, [normalizedRows, benefitFilter, fromDate, toDate, sortKey]);

  const totalPaid = filteredRows.reduce((sum, row) => sum + row.amountValue, 0);
  const totalsByBenefit = filteredRows.reduce((totals, row) => {
    totals[row.benefit] = (totals[row.benefit] || 0) + row.amountValue;
    return totals;
  }, {});
  const visibleDateRange = useMemo(() => {
    if (!filteredRows.length) return 'No payments';
    const sorted = [...filteredRows].sort((a, b) => a.issuedIso.localeCompare(b.issuedIso));
    return `${sorted[0].issued} – ${sorted[sorted.length - 1].issued}`;
  }, [filteredRows]);
  const benefitTypeCount = Object.keys(totalsByBenefit).length;

  function applyQuickRange(range) {
    setQuickRange(range);
    if (!normalizedRows.length) return;
    const sortedDates = normalizedRows.map((row) => row.issuedIso).filter(Boolean).sort();
    const maxDate = sortedDates[sortedDates.length - 1];
    if (range === 'all') {
      setFromDate(sortedDates[0]);
      setToDate(maxDate);
      return;
    }

    const days = range === '30d' ? 30 : range === '60d' ? 60 : 90;
    const end = new Date(`${maxDate}T00:00:00`);
    const start = new Date(end);
    start.setDate(end.getDate() - days);
    setFromDate(start.toISOString().slice(0, 10));
    setToDate(maxDate);
  }

  return (
    <div className="details-grid">
      <div className="details-main">
        {!paymentData.rows ? (
          <div className="pmt-empty-card">
            <div className="pmt-empty-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <rect x="6" y="10" width="36" height="30" rx="4" stroke="#d4d4d8" strokeWidth="1.5"/>
                <path d="M6 18h36" stroke="#d4d4d8" strokeWidth="1.5"/>
                <circle cx="24" cy="30" r="5" stroke="#d4d4d8" strokeWidth="1.5"/>
                <path d="M22 30h4M24 28v4" stroke="#d4d4d8" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="pmt-empty-title">No payments yet</div>
            <div className="pmt-empty-desc">Payments will appear here once your eligibility review is complete and your absence has been approved.</div>
          </div>
        ) : (
          <>
            <div className="pmt-header-card">
              <div className="pmt-header-top">
                <div>
                  <h3 className="pmt-header-title">Payment History</h3>
                  <p className="pmt-header-range">Payments received for your absence · {visibleDateRange}</p>
                </div>
                <div className="pmt-header-metrics">
                  <span>{filteredRows.length}</span> payments · <span>{formatCurrencyAmount(totalPaid)}</span>
                </div>
              </div>
              <div className="pmt-recipient-callout pmt-header-callout">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="8" stroke="#067ac1" strokeWidth="1.3"/><path d="M9 8v5" stroke="#067ac1" strokeWidth="1.3" strokeLinecap="round"/><circle cx="9" cy="5.5" r="0.85" fill="#067ac1"/></svg>
                <div><strong>Your payments may come from multiple sources.</strong> Depending on your benefits, some payments may be issued by Mutual of Omaha, your employer, or your state. Amounts shown here may reflect adjustments.</div>
              </div>
            </div>

            <div className="pmt-toolbar-card">
              <div className="pmt-toolbar-row">
                <div className="pmt-toolbar-group">
                  <label htmlFor="pmtQuickRange">Time Period</label>
                  <div className="pmt-select-wrap">
                    <select id="pmtQuickRange" value={quickRange} onChange={(event) => applyQuickRange(event.target.value)}>
                      <option value="30d">Last 30 days</option>
                      <option value="60d">Last 60 days</option>
                      <option value="90d">Last 90 days</option>
                      <option value="all">All payments</option>
                    </select>
                    <span className="pmt-select-text" aria-hidden="true">{quickRange === '30d' ? 'Last 30 days' : quickRange === '60d' ? 'Last 60 days' : quickRange === '90d' ? 'Last 90 days' : 'All payments'}</span>
                  </div>
                </div>
                <div className="pmt-toolbar-group">
                  <label htmlFor="pmtSort">Sort By</label>
                  <div className="pmt-select-wrap">
                    <select id="pmtSort" value={sortKey} onChange={(event) => setSortKey(event.target.value)}>
                      <option value="date-newest">Date: Newest first</option>
                      <option value="date-oldest">Date: Oldest first</option>
                      <option value="amount-high">Amount: Highest first</option>
                      <option value="amount-low">Amount: Lowest first</option>
                    </select>
                    <span className="pmt-select-text" aria-hidden="true">{sortKey === 'date-newest' ? 'Date: Newest first' : sortKey === 'date-oldest' ? 'Date: Oldest first' : sortKey === 'amount-high' ? 'Amount: Highest' : 'Amount: Lowest'}</span>
                  </div>
                </div>
                <div className="pmt-toolbar-date-group">
                  <div className="pmt-toolbar-group compact">
                    <label htmlFor="pmtFrom">From</label>
                    <input id="pmtFrom" type="text" inputMode="numeric" placeholder="MM/DD/YYYY" value={fromDate ? fromDate.replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1') : ''} onChange={(event) => { const v = event.target.value; const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/); if (m) setFromDate(`${m[3]}-${m[1]}-${m[2]}`); else if (!v) setFromDate(''); }} />
                  </div>
                  <span className="pmt-date-sep">to</span>
                  <div className="pmt-toolbar-group compact">
                    <label htmlFor="pmtTo">To</label>
                    <input id="pmtTo" type="text" inputMode="numeric" placeholder="MM/DD/YYYY" value={toDate ? toDate.replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1') : ''} onChange={(event) => { const v = event.target.value; const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/); if (m) setToDate(`${m[3]}-${m[1]}-${m[2]}`); else if (!v) setToDate(''); }} />
                  </div>
                </div>
              </div>
            </div>

            {filteredRows.map((row) => {
                  const cardId = `${row.period}-${row.amount}-${row.benefit}`;
                  const isOpen = !!openCards[cardId];
                  const offsets = row.offsets || [];
                  const totalOffset = offsets.reduce((sum, offset) => sum + (Number(offset.amount) || 0), 0);
                  return (
                    <div key={cardId} className={`pmt-benefit-card ${isOpen ? '' : 'collapsed'}`}>
                      <div className="pmt-benefit-header">
                        <div>
                          <div className="pmt-benefit-type">{row.benefitLabel}</div>
                          <div className="pmt-benefit-paydate">Paid {row.issued}</div>
                          <div className="pmt-benefit-recipient">{row.recipient}</div>
                        </div>
                        <div className="pmt-benefit-net">
                          <div className="pmt-benefit-net-label">Net pay</div>
                          <div className="pmt-benefit-net-amount">{row.amount}</div>
                        </div>
                      </div>
                      <button className="pmt-breakdown-toggle" type="button" onClick={() => toggleCard(cardId)}>
                        <span>View breakdown</span>
                        <span className="pmt-chevron-sm" />
                      </button>
                      {isOpen ? (
                        <div className="pmt-breakdown-wrap">
                          <div className="pmt-line-item main"><span>Gross pay</span><span>{formatCurrencyAmount(row.grossValue)}</span></div>
                          <div className="pmt-line-sub"><span>Weekly {row.benefit} benefit</span><span>{formatCurrencyAmount(row.grossValue)}</span></div>
                          <div className="pmt-line-item main pmt-line-section"><span>Adjustments</span><span>{offsets.length ? `-${formatCurrencyAmount(totalOffset)}` : '$0.00'}</span></div>
                          <div className="pmt-line-helper">Includes benefits you may receive from other sources like state programs.</div>
                          {offsets.length ? offsets.map((offset, index) => (
                            <div key={`${cardId}-offset-${index}`}>
                              <div className="pmt-line-sub"><span>{offset.label}</span><span>-{formatCurrencyAmount(offset.amount)}</span></div>
                              <div className="pmt-adjust-reason">{offset.reason}</div>
                            </div>
                          )) : <div className="pmt-line-sub"><span>No adjustments applied</span><span>—</span></div>}
                          <div className="pmt-line-item main pmt-line-section"><span>Taxes &amp; deductions</span><span>-{formatCurrencyAmount(row.taxesValue)}</span></div>
                          <div className="pmt-line-sub"><span>Federal income tax</span><span>-{formatCurrencyAmount(row.taxesValue * 0.56)}</span></div>
                          <div className="pmt-line-sub"><span>State income tax</span><span>-{formatCurrencyAmount(row.taxesValue * 0.28)}</span></div>
                          <div className="pmt-line-sub"><span>Medicare</span><span>-{formatCurrencyAmount(row.taxesValue * 0.081)}</span></div>
                          <div className="pmt-line-sub"><span>Social Security</span><span>-{formatCurrencyAmount(row.taxesValue * 0.079)}</span></div>
                          <hr className="pmt-line-divider" />
                          <div className="pmt-line-total"><span className="pmt-total-label">Net amount</span><span className="pmt-total-amount">{row.amount}</span></div>
                          <div className="pmt-deposit-inline pmt-deposit-inline-card">
                            <div><span>Method:</span> <span>Direct deposit</span></div>
                            <div><span>Account:</span> <span>****4829</span></div>
                            <div><span>Deposited:</span> <span>{row.issued}</span></div>
                            <div className="pmt-deposit-action">
                              <button className="pmt-action-link" type="button">Manage Direct Deposit
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
          </>
        )}
      </div>

      <div className="details-sidebar">
        <div className="pmt-sidebar-stack">
          <div className="pmt-sidebar-card">
            <h3>Total Received</h3>
            <div className="pmt-summary-total">{formatCurrencyAmount(totalPaid)}</div>
            <div className="pmt-summary-label">{benefitTypeCount} benefit types · {visibleDateRange}</div>
            <div>
              {Object.entries(totalsByBenefit).map(([benefit, total]) => (
                <div key={benefit} className="pmt-summary-row"><span>{benefit === 'STD' ? 'STD' : benefit}</span><span>{formatCurrencyAmount(total)}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AbsenceDetailsReactPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { caseId } = useParams();

  const stateOverrideCaseId = useMemo(() => {
    const stateParam = new URLSearchParams(location.search).get('state');
    const normalized = String(stateParam || '').toLowerCase();
    if (normalized === 'approved') return 'LV-2026-4518';
    if (normalized === 'pending') return 'LV-2026-8472';
    return null;
  }, [location.search]);

  const resolvedCaseId = stateOverrideCaseId || caseId;
  const caseData = getAbsenceDetailCase(resolvedCaseId);
  const initialTab = new URLSearchParams(location.search).get('tab') || 'tasks';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedCoverageId, setSelectedCoverageId] = useState(caseData?.coverage?.[0]?.id ?? null);
  const [episodes, setEpisodes] = useState(caseData?.episodeLog || []);
  const [isEpisodeModalOpen, setIsEpisodeModalOpen] = useState(
    new URLSearchParams(location.search).get('modal') === 'log'
  );
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setActiveTab(new URLSearchParams(window.location.search).get('tab') || 'tasks');
    setSelectedCoverageId(caseData?.coverage?.[0]?.id ?? null);
    setEpisodes(caseData?.episodeLog || []);
    setIsEpisodeModalOpen(false);
    setToastMessage('');
  }, [resolvedCaseId, caseData]);

  useEffect(() => {
    if (!toastMessage) return undefined;
    const timeoutId = window.setTimeout(() => setToastMessage(''), 2800);
    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  const episodeTotalMinutes = useMemo(() => episodes.reduce((s, e) => s + parseHHMM(e.hours), 0), [episodes]);

  const liveFmlaBalance = useMemo(() => {
    if (!caseData?.fmlaBalance) return null;
    const usedHours = episodeTotalMinutes / 60;
    return { ...caseData.fmlaBalance, used: Math.round(usedHours * 10) / 10 };
  }, [caseData?.fmlaBalance, episodeTotalMinutes]);

  const liveCaseData = useMemo(() => {
    if (!caseData) return null;
    return liveFmlaBalance ? { ...caseData, fmlaBalance: liveFmlaBalance } : caseData;
  }, [caseData, liveFmlaBalance]);

  const isPendingStatus = useMemo(
    () => String(liveCaseData?.statusKey || '').trim().toLowerCase() === 'pending',
    [liveCaseData?.statusKey]
  );

  const isIntermittent = useMemo(
    () => String(liveCaseData?.frequency || '').trim().toLowerCase() === 'intermittent',
    [liveCaseData?.frequency]
  );

  const visibleTabs = useMemo(
    () => TAB_OPTIONS,
    []
  );

  const handleTabChange = useCallback(
    (nextTab) => {
      setActiveTab(nextTab);
    },
    []
  );

  const handleEpisodesReplace = useCallback((nextEpisodes) => {
    setEpisodes(nextEpisodes);
  }, []);

  const handleOpenLogHoursModal = useCallback(() => {
    setIsEpisodeModalOpen(true);
  }, []);

  const handleCloseLogHoursModal = useCallback(() => {
    setIsEpisodeModalOpen(false);
  }, []);

  const handleSaveEpisodeFromModal = useCallback((entries) => {
    const sourceEntries = Array.isArray(entries) ? entries : [entries];
    const normalizedEntries = sourceEntries
      .map((entry) => {
        const normalizedHours = normalizeHHMM(entry?.hours || '');
        const normalizedDate = formatEpisodeDate(entry?.date || '');
        if (!normalizedDate || !normalizedHours || parseHHMM(normalizedHours) <= 0) return null;
        return {
          date: normalizedDate,
          hours: normalizedHours,
          reason: entry?.reason?.trim() || DEFAULT_TIME_TRACKING_REASON,
          reported: entry?.reported || formatTimestamp(),
        };
      })
      .filter(Boolean);

    if (!normalizedEntries.length) return;

    setEpisodes((prev) => {
      const merged = [...prev, ...normalizedEntries].sort((left, right) => {
        const leftDate = parseEpisodeDate(left.date);
        const rightDate = parseEpisodeDate(right.date);
        if (!leftDate && !rightDate) return 0;
        if (!leftDate) return 1;
        if (!rightDate) return -1;
        return rightDate - leftDate;
      });
      return merged;
    });

    setIsEpisodeModalOpen(false);
    handleTabChange('absenceLog');
    setToastMessage('Time has been logged.');
  }, [handleTabChange]);

  const forcedView = useMemo(() => {
    const queryValue = new URLSearchParams(location.search).get('view');
    const normalized = String(queryValue || '').toLowerCase();
    if (normalized === 'mobile') return 'mobile';
    if (normalized === 'tablet') return 'tablet';
    return '';
  }, [location.search]);

  const forcedWidth = useMemo(() => {
    const widthValue = new URLSearchParams(location.search).get('width');
    const parsed = Number.parseInt(String(widthValue || ''), 10);
    if (!Number.isFinite(parsed)) return null;
    if (parsed < 280 || parsed > 1024) return null;
    return parsed;
  }, [location.search]);

  const pageClassName = [
    'ovx-page-shell',
    forcedView === 'mobile' ? 'ad-force-mobile' : '',
    forcedView === 'tablet' ? 'ad-force-tablet' : '',
    forcedView === 'mobile' && forcedWidth ? 'ad-force-width' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const pageStyle = forcedView === 'mobile' && forcedWidth
    ? { '--ad-force-mobile-width': `${forcedWidth}px` }
    : undefined;

  if (!caseData) {
    return (
      <div className={pageClassName} style={pageStyle}>
        <SiteNav />
        <div className="details-page header-mode">
          <button className="details-back" type="button" onClick={() => navigate('/overview-react')}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to overview
          </button>
          <div className="ad-empty-card">
            <h3>Absence not found</h3>
            <p>The selected absence could not be loaded from the current prototype data.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={pageClassName} style={pageStyle}>
      <SiteNav />

      <div className="details-page header-mode">
        <button className="details-back" type="button" onClick={() => navigate('/overview-react')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to My Leaves
        </button>

        <div className="dt-case-header show">
          <div className="dt-case-header-row1">
            <div className="dt-case-header-title">
              <h2>{caseData.title}</h2>
              <span className={`dt-badge ${badgeClass(caseData.statusKey)}`}>{badgeLabel(caseData.statusKey)}</span>
            </div>
          </div>
          <div className="dt-case-meta-line">
            <span>{caseData.id}</span>
            <span className="dt-meta-sep" />
            <span>Submitted {formatDate(caseData.submittedAt)}</span>
            <span className="dt-meta-sep" />
            <span>Leave: {formatShortDate(caseData.startDate)} - {formatShortDate(caseData.endDate)}</span>
            <span className="dt-meta-sep dt-meta-sep-return" />
            <span className="dt-case-meta-return">Return {formatShortDate(caseData.returnDate)}</span>
            <span className="dt-meta-sep" />
            <span>{caseData.duration}</span>
          </div>
        </div>

        <div className="dt-content-wrap">
          <div className="details-tabs">
            {visibleTabs.map((tab) => (
              <button
                key={tab.id}
                className={`details-tab ${activeTab === tab.id ? 'active' : ''}`}
                type="button"
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'tasks' && (
            <TasksPanel
              caseData={liveCaseData}
              onTabChange={handleTabChange}
              onPlanRtw={() => navigate(`/absence-details/${caseData.id}/return-to-work`)}
              onOpenLogHoursModal={handleOpenLogHoursModal}
            />
          )}
          {activeTab === 'coverage' && (
            <CoveragePanel
              caseData={liveCaseData}
              selectedCoverageId={selectedCoverageId}
              onCoverageSelect={setSelectedCoverageId}
              onTabChange={handleTabChange}
            />
          )}
          {activeTab === 'details' && <DetailsPanel caseData={liveCaseData} onTabChange={handleTabChange} />}
          {activeTab === 'documents' && <DocumentsPanel caseData={liveCaseData} onTabChange={handleTabChange} />}
          {activeTab === 'payment' && <PaymentPanel caseData={liveCaseData} onTabChange={handleTabChange} />}
          {activeTab === 'absenceLog' && (
            <AbsenceLogPanel
              caseData={liveCaseData}
              episodes={episodes}
              onEpisodesReplace={handleEpisodesReplace}
              onTabChange={handleTabChange}
            />
          )}
        </div>
      </div>

      {isEpisodeModalOpen ? (
        <EpisodeModal
          episode={null}
          onSave={handleSaveEpisodeFromModal}
          onClose={handleCloseLogHoursModal}
        />
      ) : null}

      {toastMessage ? (
        <div className="ad-toast" role="status" aria-live="polite">{toastMessage}</div>
      ) : null}

      <SiteFooter />
    </div>
  );
}