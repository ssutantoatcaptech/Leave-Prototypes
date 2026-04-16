import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAbsenceDetailCase } from '../../data/overviewData';
import '../overview/overview-react.css';
import './absence-details-react.css';

const TAB_OPTIONS = [
  { id: 'tasks', label: 'Tasks' },
  { id: 'coverage', label: 'Coverage & Benefits' },
  { id: 'details', label: 'Details' },
  { id: 'documents', label: 'Documents' },
  { id: 'payment', label: 'Payment' },
];

function SiteNav() {
  return (
    <div className="top-nav">
      <div className="nav-main">
        <div className="nav-main-left">
          <div className="nav-brand">my<span>Mutual</span></div>
          <nav className="nav-links">
            <button className="nav-link" type="button">Dashboard</button>
            <button className="nav-link" type="button">My Coverages <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <button className="nav-link" type="button">Claims</button>
            <button className="nav-link active" type="button">Absences</button>
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
        <button className="nav-tab" type="button">Overview</button>
        <button className="nav-tab" type="button">Plan &amp; Request Absence</button>
        <button className="nav-tab active" type="button">My Absences</button>
      </div>
    </div>
  );
}

function formatDate(isoDate, options = { month: 'short', day: 'numeric', year: 'numeric' }) {
  if (!isoDate) return 'TBD';
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-US', options);
}

function formatShortDate(isoDate) {
  return formatDate(isoDate, { month: 'short', day: 'numeric' });
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

      <SidebarCard title="Quick Actions">
        {caseData.quickActions.map((label) => {
          const handleClick = () => {
            if (label === 'Upload Documents') onTabChange('documents');
            if (label === 'View Payment Schedule') onTabChange('payment');
          };

          return (
            <button key={label} className="dt-quick-item" type="button" onClick={handleClick}>
              <span>{label}</span>
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M1.5 1L6.5 6l-5 5" stroke="#3d3d47" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          );
        })}
      </SidebarCard>

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
    </div>
  );
}

function BenefitSteps({ steps }) {
  return (
    <div className="dt-benefit-steps">
      {steps.map((step) => (
        <div key={step.label} className="dt-benefit-step">
          <div className={`dt-benefit-dot ${step.status === 'current' ? 'current' : step.status}`} />
          <div className="dt-benefit-step-text">{step.label}</div>
        </div>
      ))}
    </div>
  );
}

function TasksPanel({ caseData, onTabChange }) {
  const complete = caseData.statusKey === 'approved';

  return (
    <div className="details-grid">
      <div className="details-main">
        <LeaveSummaryCard caseData={caseData} onDocumentsClick={() => onTabChange('documents')} />

        <div className="dt-benefits-section">
          <div className="dt-dark-banner" style={{ marginBottom: 24 }}>
            <div className={`icon ${complete ? 'success' : 'info'}`}>
              {complete ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 7l2.5 2.5L10.5 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#fff" strokeWidth="1.2"/><path d="M7 4v3l2.5 1.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </div>
            <div>
              <div className="title">{complete ? 'All tasks complete' : `Action required - ${caseData.taskSummary.todo} items need your attention`}</div>
              <div className="desc">
                {complete ? 'All required documentation has been submitted and your absence is approved.' : 'Submit the required items below to keep your eligibility review moving.'}
              </div>
            </div>
          </div>

          <div className="task-summary-bar">
            <div className="task-summary-stat"><strong>{caseData.taskSummary.todo}</strong> to do</div>
            <div className="task-summary-stat"><strong>{caseData.taskSummary.completed}</strong> completed</div>
            <div className="task-summary-stat"><strong>{caseData.taskSummary.total}</strong> total</div>
          </div>

          {caseData.taskGroups.map((group) => (
            <div key={group.title} className="task-group">
              <div className="task-group-header">
                <h4>{group.title}</h4>
                <div className="task-group-count">{group.progress}</div>
              </div>

              <div className="bp-accordion open">
                <div className="bp-accordion-toggle">
                  <div className="bp-accordion-left">
                    <span className="bp-accordion-title">Status</span>
                    <span className="bp-accordion-badge">{group.badge}</span>
                  </div>
                </div>
                <div className="bp-accordion-body" style={{ display: 'block' }}>
                  <div className="dt-benefit-progress">
                    <div className="dt-benefit-card">
                      <BenefitSteps steps={group.steps} />
                    </div>
                  </div>
                </div>
              </div>

              {group.items.map((item) => (
                <button
                  key={item.title}
                  className="task-item ad-task-item-button"
                  type="button"
                  onClick={() => item.actionTab && onTabChange(item.actionTab)}
                >
                  <div className={`task-icon ${item.status}`}>{taskIcon(item.status)}</div>
                  <div className="task-body">
                    <div className="task-title">{item.title}</div>
                    <div className="task-sub">{item.subtitle}</div>
                  </div>
                  <span className={`task-badge ${item.status}`}>{item.status === 'todo' ? 'TO DO' : item.status.toUpperCase()}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <DetailsSidebar caseData={caseData} activeTab="tasks" onTabChange={onTabChange} />
    </div>
  );
}

function CoveragePanel({ caseData, selectedCoverageId, onCoverageSelect, onTabChange }) {
  const selectedCoverage = caseData.coverage.find((item) => item.id === selectedCoverageId) || caseData.coverage[0];

  return (
    <div className="details-grid">
      <div className="details-main">
        <LeaveSummaryCard caseData={caseData} onDocumentsClick={() => onTabChange('documents')} />

        <div className="dt-timeline-wrap">
          <div className="ad-section-header">
            <div>
              <h3>Absence Timeline</h3>
              <p>{caseData.title} · Estimates subject to final approval</p>
            </div>
          </div>
          <p className="ad-section-helper">Select a benefit row to see the current estimate and coverage details.</p>

          <div className="dt-benefits-grid ad-benefits-grid">
            {caseData.coverage.map((item) => (
              <button
                key={item.id}
                className={`dt-benefit-item ad-benefit-button ${selectedCoverage?.id === item.id ? 'highlighted' : ''}`}
                data-tl-color="true"
                style={{ '--tl-color': item.accent }}
                type="button"
                onClick={() => onCoverageSelect(item.id)}
              >
                <div className="dt-benefit-left">
                  <div className="name"><span className="dt-color-dot" style={{ background: item.accent }} />{item.name}</div>
                  <div className="range">{item.range} · {item.weeks}</div>
                </div>
                <div className="dt-benefit-right">
                  <span className={`dt-badge ${badgeClass(caseData.statusKey)}`}>{item.status}</span>
                </div>
              </button>
            ))}
          </div>

          {selectedCoverage && (
            <div className="ad-coverage-detail">
              <div className="ad-coverage-detail-head">
                <div>
                  <h4>{selectedCoverage.name}</h4>
                  <p>{selectedCoverage.pay}</p>
                </div>
                <span className="ad-coverage-chip" style={{ borderColor: selectedCoverage.accent, color: selectedCoverage.accent }}>{selectedCoverage.label}</span>
              </div>
              <div className="ad-coverage-grid">
                {selectedCoverage.details.map((detail) => (
                  <div key={detail.label} className="ad-coverage-field">
                    <div className="dt-info-field-label">{detail.label}</div>
                    <div className="dt-info-field-value">{detail.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="dt-benefits-section">
          <div className="ad-section-header">
            <div>
              <h3>Employer Policies</h3>
              <p>Your employer offers the following absence programs. Final eligibility is determined during review.</p>
            </div>
          </div>
          <div className="ad-policy-grid">
            {caseData.employerPolicies.map((policy) => (
              <div key={policy.title} className="ad-policy-card">
                <div className="ad-policy-title">{policy.title}</div>
                <div className="ad-policy-copy">{policy.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DetailsSidebar caseData={caseData} activeTab="coverage" onTabChange={onTabChange} />
    </div>
  );
}

function DetailsPanel({ caseData, onTabChange }) {
  return (
    <div className="details-grid">
      <div className="details-main">
        <div className="dt-info-section">
          {caseData.detailsData.sections.map((section) => (
            <div key={section.title} className="dt-info-block">
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
  return (
    <div className="details-grid">
      <div className="details-main">
        <div className="ad-upload-card">
          <div className="ad-section-header">
            <div>
              <h3>Upload Document</h3>
              <p>{caseData.documentsData.uploadHint}</p>
            </div>
          </div>
          <div className="ad-upload-dropzone">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 8l-5-5-5 5" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 3v12" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div>Drag and drop files here, or</div>
            <button className="dt-upload-btn" type="button">Browse Files</button>
          </div>
        </div>

        {caseData.documentsData.sections.map((section) => (
          <div key={section.title} className="ad-table-card">
            <div className="ad-section-header">
              <div>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>
            </div>
            <table className="ad-table">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.type}</td>
                    <td>{row.date}</td>
                    <td><span className={`ad-doc-badge ${row.status.toLowerCase()}`}>{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <DetailsSidebar caseData={caseData} activeTab="documents" onTabChange={onTabChange} />
    </div>
  );
}

function PaymentPanel({ caseData, onTabChange }) {
  const paymentData = caseData.paymentData;

  return (
    <div className="details-grid">
      <div className="details-main">
        {!paymentData.rows ? (
          <div className="ad-empty-card">
            <h3>{paymentData.emptyStateTitle}</h3>
            <p>{paymentData.emptyStateDescription}</p>
          </div>
        ) : (
          <>
            <div className="ad-payment-summary-grid">
              {paymentData.summaryCards.map((card) => (
                <div key={card.label} className="dt-cov-box">
                  <div className="label">{card.label}</div>
                  <div className="value">{card.value}</div>
                </div>
              ))}
            </div>

            <div className="ad-table-card">
              <div className="ad-section-header">
                <div>
                  <h3>Payment Schedule</h3>
                  <p>Issued payments associated with this absence.</p>
                </div>
              </div>
              <table className="ad-table">
                <thead>
                  <tr>
                    <th>Benefit Period</th>
                    <th>Benefit</th>
                    <th>Amount</th>
                    <th>Issued</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentData.rows.map((row) => (
                    <tr key={`${row.period}-${row.amount}`}>
                      <td>{row.period}</td>
                      <td>{row.benefit}</td>
                      <td>{row.amount}</td>
                      <td>{row.issued}</td>
                      <td><span className="ad-doc-badge received">{row.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <DetailsSidebar caseData={caseData} activeTab="payment" onTabChange={onTabChange} />
    </div>
  );
}

export default function AbsenceDetailsReactPage() {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const caseData = getAbsenceDetailCase(caseId);
  const [activeTab, setActiveTab] = useState('tasks');
  const [selectedCoverageId, setSelectedCoverageId] = useState(caseData?.coverage?.[0]?.id ?? null);

  useEffect(() => {
    setActiveTab('tasks');
    setSelectedCoverageId(caseData?.coverage?.[0]?.id ?? null);
  }, [caseId, caseData]);

  if (!caseData) {
    return (
      <div className="ovx-page-shell">
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
    <div className="ovx-page-shell">
      <SiteNav />

      <div className="details-page header-mode">
        <button className="details-back" type="button" onClick={() => navigate('/overview-react')}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to overview
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
            <span className="dt-meta-sep" />
            <span>Return {formatShortDate(caseData.returnDate)}</span>
            <span className="dt-meta-sep" />
            <span>{caseData.duration}</span>
          </div>
        </div>

        <div className="dt-content-wrap">
          <div className="details-tabs">
            {TAB_OPTIONS.map((tab) => (
              <button
                key={tab.id}
                className={`details-tab ${activeTab === tab.id ? 'active' : ''}`}
                type="button"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'tasks' && <TasksPanel caseData={caseData} onTabChange={setActiveTab} />}
          {activeTab === 'coverage' && (
            <CoveragePanel
              caseData={caseData}
              selectedCoverageId={selectedCoverageId}
              onCoverageSelect={setSelectedCoverageId}
              onTabChange={setActiveTab}
            />
          )}
          {activeTab === 'details' && <DetailsPanel caseData={caseData} onTabChange={setActiveTab} />}
          {activeTab === 'documents' && <DocumentsPanel caseData={caseData} onTabChange={setActiveTab} />}
          {activeTab === 'payment' && <PaymentPanel caseData={caseData} onTabChange={setActiveTab} />}
        </div>
      </div>
    </div>
  );
}