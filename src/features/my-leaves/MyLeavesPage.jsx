import { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { overviewActiveAbsences, absenceHistoryAbsences } from '../../data/overviewData';
import '../overview/overview-react.css';
import './my-leaves.css';

function formatDate(iso) {
  if (!iso) return 'TBD';
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatShortDate(iso) {
  if (!iso) return '—';
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const LEAVE_ICONS = {
  medical: { color: '#0ea5e9', svg: <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M6.5 2h3v4.5H14v3H9.5V14h-3V9.5H2v-3h4.5V2z" stroke="#0ea5e9" strokeWidth="1.3" strokeLinejoin="round"/></svg> },
  family: { color: '#ec4899', svg: <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><circle cx="5.5" cy="5" r="2" stroke="#ec4899" strokeWidth="1.2"/><circle cx="10.5" cy="5" r="2" stroke="#ec4899" strokeWidth="1.2"/><path d="M1 14c0-2.5 2-4.5 4.5-4.5.7 0 1.4.2 2 .5m3 4c0-2.5-2-4.5-4.5-4.5" stroke="#ec4899" strokeWidth="1.2" strokeLinecap="round"/></svg> },
  pregnancy: { color: '#f59e0b', svg: <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="4" r="2.5" stroke="#f59e0b" strokeWidth="1.2"/><path d="M4 14c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#f59e0b" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="11" r="1" fill="#f59e0b"/></svg> },
  personal: { color: '#6b7280', svg: <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="#6b7280" strokeWidth="1.2"/><path d="M3 14c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round"/></svg> },
};

const STATUS_MAP = {
  PENDING: { label: 'Pending', cls: 'ml-st-pending' },
  APPROVED: { label: 'Approved', cls: 'ml-st-approved' },
  COMPLETED: { label: 'Completed', cls: 'ml-st-completed' },
  DENIED: { label: 'Denied', cls: 'ml-st-denied' },
};

const LEAVE_TABS = [
  { id: 'tasks', label: 'Status & Tasks' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'payments', label: 'Payments' },
  { id: 'documents', label: 'Documents' },
];

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div className="site-footer-col"><h4>Resources</h4><a>Absence Policies</a><a>FAQs</a><a>Forms &amp; Documents</a></div>
          <div className="site-footer-col"><h4>Support</h4><a>Contact HR</a><a>Help Center</a><a>Report an Issue</a></div>
          <div className="site-footer-col"><h4>Legal</h4><a>Privacy Policy</a><a>Terms of Use</a><a>Accessibility</a></div>
          <div className="site-footer-col"><h4>Contact</h4><a>Phone: 1-800-HR-HELP</a><a>Email: hrbenefits@company.com</a><a>Hours: Mon&ndash;Fri, 8am&ndash;6pm EST</a></div>
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

function SiteNav({ activeTab }) {
  const location = useLocation();
  return (
    <div className="top-nav">
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
        <Link className={"nav-tab" + (activeTab === 'overview' ? ' active' : '')} to="/overview-react">My Leave</Link>
        <Link className={"nav-tab" + (activeTab === 'leaves' ? ' active' : '')} to="/my-leaves">My Leaves</Link>
        <Link className={"nav-tab" + (activeTab === 'documents' ? ' active' : '')} to="/my-leaves?view=documents">Documents</Link>
      </div>
    </div>
  );
}

function LeaveStatusBadge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP.PENDING;
  return <span className={`ml-status ${s.cls}`}><span className="ml-status-dot" />{s.label}</span>;
}

function TaskItem({ task }) {
  return (
    <div className={`ml-task-item ${task.done ? 'done' : ''}`}>
      <div className={`ml-task-check ${task.done ? 'checked' : ''}`}>
        {task.done && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
      <div className="ml-task-content">
        <div className="ml-task-label">{task.label}</div>
        {task.due && <div className="ml-task-due">{task.due}</div>}
      </div>
      {task.action && <button type="button" className="ml-task-action">{task.action}</button>}
    </div>
  );
}

function TimelineEvent({ event, isLast }) {
  return (
    <div className="ml-timeline-item">
      <div className="ml-timeline-marker-col">
        <div className={`ml-timeline-dot ${event.active ? 'active' : ''} ${event.future ? 'future' : ''}`} />
        {!isLast && <div className="ml-timeline-line" />}
      </div>
      <div className="ml-timeline-content">
        <div className="ml-timeline-date">{event.date}</div>
        <div className="ml-timeline-title">{event.title}</div>
        {event.detail && <div className="ml-timeline-detail">{event.detail}</div>}
      </div>
    </div>
  );
}

function PaymentRow({ payment }) {
  return (
    <div className="ml-payment-row">
      <div className="ml-payment-date">{payment.date}</div>
      <div className="ml-payment-desc">
        <div className="ml-payment-label">{payment.label}</div>
        <div className="ml-payment-method">{payment.method}</div>
      </div>
      <div className="ml-payment-amount">{payment.amount}</div>
    </div>
  );
}

function DocumentRow({ doc }) {
  return (
    <div className="ml-doc-row">
      <div className="ml-doc-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M9 1H4a1.5 1.5 0 00-1.5 1.5v11A1.5 1.5 0 004 15h8a1.5 1.5 0 001.5-1.5V5.5L9 1z" stroke="#525252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 1v5h4.5" stroke="#525252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <div className="ml-doc-info">
        <div className="ml-doc-name">{doc.name}</div>
        <div className="ml-doc-meta">{doc.meta}</div>
      </div>
      <div className="ml-doc-actions">
        {doc.status && <span className={`ml-doc-status ${doc.statusClass || ''}`}>{doc.status}</span>}
        <button type="button" className="ml-doc-btn">{doc.action || 'View'}</button>
      </div>
    </div>
  );
}

function LeaveWorkspace({ leave }) {
  const [activeTab, setActiveTab] = useState('tasks');
  const icon = LEAVE_ICONS[leave.type] || LEAVE_ICONS.personal;

  const tasks = [
    { label: 'Submit FMLA certification form', due: 'Due Apr 15, 2026', done: false, action: 'Upload' },
    { label: 'Confirm start date with employer', done: true },
    { label: 'Review coverage & benefits summary', done: true },
    { label: 'Set up direct deposit for payments', due: 'Recommended', done: false, action: 'Set up' },
  ];

  const timeline = [
    { date: formatDate(leave.submittedAt || leave.startDate), title: 'Request submitted', detail: 'Case ' + leave.id + ' created', active: false },
    { date: formatDate(leave.startDate), title: 'Leave begins', detail: leave.frequency + ' schedule', active: true },
    { date: formatDate(leave.endDate), title: 'Estimated end date', future: true },
    { date: formatDate(leave.returnDate), title: 'Return to work', future: true },
  ];

  const payments = [
    { date: 'Mar 26, 2026', label: 'STD + PFML Payment', method: 'Direct deposit ****4628', amount: '$1,385' },
    { date: 'Apr 9, 2026', label: 'STD Payment', method: 'Direct deposit ****4628', amount: '$1,960' },
  ];

  const documents = [
    { name: 'FMLA Certification Form', meta: 'Required · PDF', status: 'Needed', statusClass: 'urgent', action: 'Upload' },
    { name: 'Leave Approval Letter', meta: 'PDF · Jan 28, 2026', status: 'Received', statusClass: 'ok', action: 'View' },
    { name: 'Benefits Summary', meta: 'PDF · Auto-generated', action: 'View' },
  ];

  return (
    <div className="ml-workspace">
      <div className="ml-workspace-header">
        <div className="ml-workspace-icon" style={{ borderColor: icon.color }}>{icon.svg}</div>
        <div className="ml-workspace-info">
          <div className="ml-workspace-title-row">
            <h3>{leave.title}</h3>
            <LeaveStatusBadge status={leave.status} />
          </div>
          <div className="ml-workspace-meta">
            Case #{leave.id} &middot; {leave.frequency} &middot; {formatShortDate(leave.startDate)} &ndash; {formatShortDate(leave.endDate)} &middot; {leave.duration}
          </div>
          {leave.benefits && <div className="ml-workspace-benefits">{leave.benefits}</div>}
        </div>
      </div>

      <div className="ml-leave-tabs">
        {LEAVE_TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`ml-leave-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.id === 'tasks' && <span className="ml-tab-badge">2</span>}
          </button>
        ))}
      </div>

      <div className="ml-tab-panel">
        {activeTab === 'tasks' && (
          <div className="ml-tasks-panel">
            <div className="ml-panel-intro">
              <div className="ml-progress-bar">
                <div className="ml-progress-fill" style={{ width: '50%' }} />
              </div>
              <div className="ml-progress-label">2 of 4 tasks complete</div>
            </div>
            <div className="ml-task-list">
              {tasks.map((t, i) => <TaskItem key={i} task={t} />)}
            </div>
          </div>
        )}
        {activeTab === 'timeline' && (
          <div className="ml-timeline-panel">
            {timeline.map((e, i) => <TimelineEvent key={i} event={e} isLast={i === timeline.length - 1} />)}
          </div>
        )}
        {activeTab === 'payments' && (
          <div className="ml-payments-panel">
            <div className="ml-payments-summary">
              <div className="ml-payments-total-label">Total received</div>
              <div className="ml-payments-total">$3,345</div>
            </div>
            <div className="ml-payment-list">
              {payments.map((p, i) => <PaymentRow key={i} payment={p} />)}
            </div>
          </div>
        )}
        {activeTab === 'documents' && (
          <div className="ml-docs-panel">
            {documents.map((d, i) => <DocumentRow key={i} doc={d} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyLeavesPage() {
  const location = useLocation();
  const isDocView = new URLSearchParams(location.search).get('view') === 'documents';

  const allLeaves = useMemo(() => {
    const active = overviewActiveAbsences.map(a => ({ ...a, isActive: true }));
    const past = absenceHistoryAbsences
      .filter(h => !overviewActiveAbsences.some(a => a.id === h.id))
      .map(h => ({ ...h, isActive: false }));
    return [...active, ...past];
  }, []);

  const activeLeaves = allLeaves.filter(l => l.isActive);
  const pastLeaves = allLeaves.filter(l => !l.isActive);

  if (isDocView) {
    return (
      <div className="ovx-page-shell">
        <SiteNav activeTab="documents" />
        <div className="ml-page">
          <div className="ml-page-header">
            <h1>Documents</h1>
            <p>All documents across your leaves in one place.</p>
          </div>
          <div className="ml-docs-global">
            <div className="ml-docs-global-card">
              {allLeaves.filter(l => l.isActive).map(leave => (
                <div key={leave.id} className="ml-docs-group">
                  <div className="ml-docs-group-header">
                    <span className="ml-docs-group-title">{leave.title}</span>
                    <span className="ml-docs-group-case">#{leave.id}</span>
                  </div>
                  <DocumentRow doc={{ name: 'FMLA Certification Form', meta: 'Required · PDF', status: 'Needed', statusClass: 'urgent', action: 'Upload' }} />
                  <DocumentRow doc={{ name: 'Leave Approval Letter', meta: 'PDF · Jan 28, 2026', status: 'Received', statusClass: 'ok', action: 'View' }} />
                  <DocumentRow doc={{ name: 'Benefits Summary', meta: 'PDF · Auto-generated', action: 'View' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="ovx-page-shell">
      <SiteNav activeTab="leaves" />
      <div className="ml-page">
        <div className="ml-page-header">
          <div className="ml-page-header-left">
            <h1>My Leaves</h1>
            <p>Track, manage, and complete tasks for each of your leaves.</p>
          </div>
          <div className="ml-page-actions">
            <Link to="/plan-absence" className="ml-btn-secondary">Plan a Leave</Link>
            <Link to="/wizard" className="ml-btn-primary">Request Leave</Link>
          </div>
        </div>

        {activeLeaves.length > 0 && (
          <section className="ml-section">
            <div className="ml-section-label">Active Leaves</div>
            <div className="ml-workspace-list">
              {activeLeaves.map(leave => <LeaveWorkspace key={leave.id} leave={leave} />)}
            </div>
          </section>
        )}

        {pastLeaves.length > 0 && (
          <section className="ml-section">
            <div className="ml-section-label">Past Leaves</div>
            <div className="ml-past-list">
              {pastLeaves.map(leave => {
                const icon = LEAVE_ICONS[leave.type] || LEAVE_ICONS.personal;
                return (
                  <div key={leave.id} className="ml-past-card">
                    <div className="ml-past-icon" style={{ borderColor: icon.color }}>{icon.svg}</div>
                    <div className="ml-past-info">
                      <div className="ml-past-title">{leave.title}</div>
                      <div className="ml-past-meta">#{leave.id} &middot; {formatShortDate(leave.startDate)} &ndash; {formatShortDate(leave.endDate)} &middot; {leave.duration}</div>
                    </div>
                    <LeaveStatusBadge status={leave.status} />
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
