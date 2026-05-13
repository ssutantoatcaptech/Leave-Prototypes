import { useState } from 'react';
import { Link } from 'react-router-dom';
import useBasePath from './useBasePath';

export default function StdClaimDetailPage() {
  const base = useBasePath();
  const [completedExpanded, setCompletedExpanded] = useState(false);

  return (
    <div className="cl-std-page">
      {/* Breadcrumb */}
      <div className="cl-std-breadcrumb">
        <Link to={base} className="cl-std-breadcrumb-link">Claims &amp; Leave</Link>
        <span className="cl-std-breadcrumb-sep">
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
            <path d="M1 1l4 4-4 4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <Link to={`${base}/claims`} className="cl-std-breadcrumb-link">Claims Center</Link>
        <span className="cl-std-breadcrumb-sep">
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
            <path d="M1 1l4 4-4 4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span className="cl-std-breadcrumb-current">CL-954412</span>
      </div>

      {/* Page Header */}
      <div className="cl-std-header">
        <div className="cl-std-header-title-row">
          <h1 className="cl-std-title">Long-Term Disability (LTD) Claim</h1>
          <span className="cl-std-pill cl-std-pill--denied">Denied</span>
        </div>
        <div className="cl-std-header-meta">
          <span className="cl-std-meta-id">CL-954412</span>
          <span className="cl-std-meta-date">Filed May 4, 2024</span>
        </div>
      </div>

      {/* Two-column grid */}
      <div className="cl-std-grid">
        {/* Main column */}
        <div className="cl-std-main">
          {/* Claim Details Card */}
          <div className="cl-std-card">
            <h2 className="cl-std-card-title">Claim Details</h2>

            <div className="cl-std-details-subcard">
              <div className="cl-std-details-grid">
                <div className="cl-std-field">
                  <span className="cl-std-field-label">Claim Number</span>
                  <span className="cl-std-field-value">CLM-94820</span>
                </div>
                <div className="cl-std-field">
                  <span className="cl-std-field-label">Policy</span>
                  <span className="cl-std-field-value">Group STD — Employer Paid</span>
                </div>
                <div className="cl-std-field">
                  <span className="cl-std-field-label">Diagnosis</span>
                  <span className="cl-std-field-value">Lumbar disc herniation</span>
                </div>
                <div className="cl-std-field">
                  <span className="cl-std-field-label">Leave Start</span>
                  <span className="cl-std-field-value">May 4, 2024</span>
                </div>
                <div className="cl-std-field">
                  <span className="cl-std-field-label">Benefits Begin</span>
                  <span className="cl-std-field-value">May 11, 2024</span>
                </div>
                <div className="cl-std-field">
                  <span className="cl-std-field-label">Expected RTW</span>
                  <span className="cl-std-field-value">Aug 5, 2024</span>
                </div>
                <div className="cl-std-field cl-std-field--border-bottom">
                  <span className="cl-std-field-label">Max Benefit Duration</span>
                  <span className="cl-std-field-value">12 weeks</span>
                </div>
                <div className="cl-std-field cl-std-field--border-bottom">
                  <span className="cl-std-field-label">Weeks Remaining</span>
                  <span className="cl-std-field-value">4 of 12 weeks</span>
                </div>
              </div>
            </div>

            {/* Benefits Usage */}
            <div className="cl-std-usage-subcard">
              <div className="cl-std-usage-header">
                <span className="cl-std-usage-label">Benefits Usage</span>
                <span className="cl-std-usage-value">$100 of $150 used</span>
              </div>
              <div className="cl-std-progress">
                <div className="cl-std-progress-bar" style={{ width: '66.6%' }} />
              </div>
              <div className="cl-std-usage-dates">
                <span>May 11, 2024</span>
                <span>Aug 3, 2024</span>
              </div>
            </div>
          </div>

          {/* Associated Payments Card */}
          <div className="cl-std-card">
            <h2 className="cl-std-card-title">Associated Payments</h2>
            <p className="cl-std-card-subtitle">Bi-weekly payments via direct deposit. Net of federal &amp; state tax withholding.</p>

            <div className="cl-std-payments-grid">
              <div className="cl-std-field">
                <span className="cl-std-field-label">Most Recent Payment</span>
                <span className="cl-std-field-value">$1,036.59</span>
              </div>
              <div className="cl-std-field">
                <span className="cl-std-field-label">Total Paid to Date</span>
                <span className="cl-std-field-value">$6,219.51</span>
              </div>
              <div className="cl-std-field">
                <span className="cl-std-field-label">Expected Next Payment</span>
                <span className="cl-std-field-value">Jul 26, 2024</span>
              </div>
              <div className="cl-std-field">
                <span className="cl-std-field-label">Expected Weekly Benefit</span>
                <span className="cl-std-field-value">$1,036.59</span>
              </div>
            </div>

            <div className="cl-std-card-action">
              <Link to={`${base}/payments`} className="cl-std-btn-primary">View All Payments</Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="cl-std-sidebar">
          {/* Items Requiring Action */}
          <div className="cl-std-sidebar-card cl-std-sidebar-card--action">
            <div className="cl-std-sidebar-header">
              <h2 className="cl-std-sidebar-title">Items Requiring Action</h2>
              <span className="cl-std-needed-count">1 Needed</span>
            </div>

            <div className="cl-std-action-item">
              <div className="cl-std-action-item-row">
                <svg className="cl-std-action-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#dc2626"/>
                  <path d="M12 8v4M12 16h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div className="cl-std-action-text">
                  <span className="cl-std-action-title">Upload Medical Certification</span>
                  <span className="cl-std-action-desc">Due Jul 25 &middot; Required to continue benefits past Aug 3</span>
                </div>
                <button className="cl-std-btn-upload">Upload</button>
              </div>
            </div>

            <button
              className="cl-std-completed-toggle"
              onClick={() => setCompletedExpanded(!completedExpanded)}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: completedExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                <path d="M4 2l4 4-4 4" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              +2 Completed
            </button>

            {completedExpanded && (
              <div className="cl-std-completed-list">
                <div className="cl-std-completed-item">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" fill="#1fa668"/>
                    <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Initial medical documentation submitted</span>
                </div>
                <div className="cl-std-completed-item">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" fill="#1fa668"/>
                    <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Employer verification received</span>
                </div>
              </div>
            )}
          </div>

          {/* Claim Status */}
          <div className="cl-std-sidebar-card">
            <div className="cl-std-sidebar-header">
              <h2 className="cl-std-sidebar-title">Claim Status</h2>
              <span className="cl-std-pill cl-std-pill--approved">
                <span className="cl-std-pill-dot cl-std-pill-dot--green"></span>
                Approved
              </span>
            </div>
            <p className="cl-std-status-since">Since May 10, 2024</p>

            <div className="cl-std-status-list">
              <div className="cl-std-status-item">
                <svg className="cl-std-status-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#1fa668"/>
                  <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="cl-std-status-text">
                  <span className="cl-std-status-title">Claim Filed</span>
                  <span className="cl-std-status-date">May 4, 2024</span>
                </div>
              </div>
              <div className="cl-std-status-item">
                <svg className="cl-std-status-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#1fa668"/>
                  <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="cl-std-status-text">
                  <span className="cl-std-status-title">Documentation Received</span>
                  <span className="cl-std-status-date">May 7, 2024</span>
                </div>
              </div>
              <div className="cl-std-status-item">
                <svg className="cl-std-status-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#1fa668"/>
                  <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="cl-std-status-text">
                  <span className="cl-std-status-title">Claim Approved</span>
                  <span className="cl-std-status-date">May 10, 2024</span>
                  <span className="cl-std-status-note">7-day elimination period waived.</span>
                </div>
              </div>
              <div className="cl-std-status-item">
                <svg className="cl-std-status-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#1fa668"/>
                  <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="cl-std-status-text">
                  <span className="cl-std-status-title">Benefits In Payment</span>
                  <span className="cl-std-status-date">Since May 11, 2024</span>
                  <span className="cl-std-status-note">Next payment Jul 26.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Documents & EOBs */}
          <div className="cl-std-sidebar-card cl-std-sidebar-card--docs">
            <h2 className="cl-std-sidebar-title">Documents &amp; EOBs</h2>

            <div className="cl-std-doc-list">
              <div className="cl-std-doc-item">
                <div className="cl-std-doc-info">
                  <span className="cl-std-doc-name">Explanation of Benefits — Jul 12</span>
                  <span className="cl-std-doc-meta">PDF &middot; Generated Jul 12, 2024</span>
                </div>
                <button className="cl-std-doc-download">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v8M8 10l-3-3M8 10l3-3" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 13h10" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div className="cl-std-doc-item">
                <div className="cl-std-doc-info">
                  <span className="cl-std-doc-name">Explanation of Benefits — Jun 28</span>
                  <span className="cl-std-doc-meta">PDF &middot; Generated Jun 28, 2024</span>
                </div>
                <button className="cl-std-doc-download">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v8M8 10l-3-3M8 10l3-3" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 13h10" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div className="cl-std-doc-item">
                <div className="cl-std-doc-info">
                  <span className="cl-std-doc-name">Explanation of Benefits — Jun 14</span>
                  <span className="cl-std-doc-meta">PDF &middot; Generated Jun 14, 2024</span>
                </div>
                <button className="cl-std-doc-download">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v8M8 10l-3-3M8 10l3-3" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 13h10" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
