import { useState } from 'react';
import { Link } from 'react-router-dom';
import useBasePath from './useBasePath';

export default function StdClaimDetailPage() {
  const base = useBasePath();
  const [completedExpanded, setCompletedExpanded] = useState(false);

  return (
    <div className="cl-page">
      {/* Breadcrumb */}
      <div className="cl-breadcrumb">
        <Link to={base} className="cl-breadcrumb-link">Home</Link>
        <span className="cl-breadcrumb-sep">&gt;</span>
        <Link to={`${base}/claims`} className="cl-breadcrumb-link">My Claims</Link>
        <span className="cl-breadcrumb-sep">&gt;</span>
        <span>STD Claim</span>
      </div>

      {/* Page Header */}
      <div className="cl-std-header">
        <div className="cl-std-header-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 5v6c0 5.5 3.4 10.7 8 12 4.6-1.3 8-6.5 8-12V5l-8-3z" stroke="#fff" strokeWidth="1.5" fill="none"/>
            <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="cl-std-header-content">
          <h1 className="cl-page-title">Short-Term Disability Claim</h1>
          <div className="cl-std-header-meta">
            <span className="cl-std-badge cl-std-badge--approved">APPROVED</span>
            <span className="cl-std-meta-sep">|</span>
            <span className="cl-std-meta-id">CLM-94820</span>
            <span className="cl-std-meta-sep">|</span>
            <span className="cl-std-meta-date">Filed May 4, 2026</span>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="cl-std-grid">
        {/* Main content (left) */}
        <div className="cl-std-main">
          {/* Claim Details Card */}
          <div className="cl-std-card">
            <div className="cl-std-card-header">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="14" height="14" rx="2" stroke="#0f172a" strokeWidth="1.3"/>
                <path d="M6 7h6M6 10h6M6 13h4" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <h2 className="cl-std-card-title">Claim Details</h2>
            </div>

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
                <span className="cl-std-field-value">May 4, 2026</span>
              </div>
              <div className="cl-std-field">
                <span className="cl-std-field-label">Benefits Begin</span>
                <span className="cl-std-field-value">May 11, 2026</span>
              </div>
              <div className="cl-std-field">
                <span className="cl-std-field-label">Expected RTW</span>
                <span className="cl-std-field-value">Aug 5, 2026</span>
              </div>
              <div className="cl-std-field">
                <span className="cl-std-field-label">Max Benefit Duration</span>
                <span className="cl-std-field-value">12 weeks</span>
              </div>
              <div className="cl-std-field">
                <span className="cl-std-field-label">Weeks Remaining</span>
                <span className="cl-std-field-value">4 of 12 weeks</span>
              </div>
            </div>

            <div className="cl-std-divider" />

            {/* Benefits Usage */}
            <div className="cl-std-usage">
              <div className="cl-std-usage-header">
                <span className="cl-std-usage-label">Benefits Usage</span>
                <span className="cl-std-usage-value">8 of 12 weeks used</span>
              </div>
              <div className="cl-std-progress">
                <div className="cl-std-progress-bar" style={{ width: '66.6%' }} />
              </div>
              <div className="cl-std-usage-dates">
                <span>May 11, 2026</span>
                <span>Aug 3, 2026</span>
              </div>
            </div>
          </div>

          {/* Associated Payments Card */}
          <div className="cl-std-card">
            <div className="cl-std-card-header">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="1" y="4" width="16" height="11" rx="2" stroke="#0f172a" strokeWidth="1.3"/>
                <path d="M1 8h16" stroke="#0f172a" strokeWidth="1.3"/>
                <path d="M5 12h3" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <h2 className="cl-std-card-title">Associated Payments</h2>
            </div>
            <p className="cl-std-card-subtitle">Bi-weekly payments via direct deposit. Net of federal &amp; state tax withholding.</p>

            <div className="cl-std-payments-grid">
              <div className="cl-std-field">
                <span className="cl-std-field-label">Most Recent Payment</span>
                <span className="cl-std-field-value cl-std-field-value--lg">$1,036.59</span>
              </div>
              <div className="cl-std-field">
                <span className="cl-std-field-label">Total Paid to Date</span>
                <span className="cl-std-field-value cl-std-field-value--lg">$6,219.51</span>
              </div>
              <div className="cl-std-field">
                <span className="cl-std-field-label">Expected Next Payment</span>
                <span className="cl-std-field-value">Jul 26, 2026</span>
              </div>
              <div className="cl-std-field">
                <span className="cl-std-field-label">Expected Weekly Benefit</span>
                <span className="cl-std-field-value">$1,036.59</span>
              </div>
            </div>

            <div className="cl-std-card-action">
              <Link to={`${base}/payments`} className="cl-btn cl-btn--outline">VIEW ALL PAYMENTS &gt;</Link>
            </div>
          </div>
        </div>

        {/* Sidebar (right) */}
        <div className="cl-std-sidebar">
          {/* Items Requiring Attention */}
          <div className="cl-std-card">
            <div className="cl-std-card-header">
              <h2 className="cl-std-card-title">Items Requiring Attention</h2>
              <span className="cl-std-badge cl-std-badge--needed">1 needed</span>
            </div>

            <div className="cl-std-attention-item">
              <h4 className="cl-std-attention-title">Upload Medical Certification</h4>
              <p className="cl-std-attention-desc">Due Jul 25 &middot; Required to continue benefits past Aug 3</p>
              <button className="cl-std-btn-dark">Upload</button>
            </div>

            <button
              className="cl-std-completed-toggle"
              onClick={() => setCompletedExpanded(!completedExpanded)}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: completedExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                <path d="M4 2l4 4-4 4" stroke="#0033a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              +2 completed
            </button>

            {completedExpanded && (
              <div className="cl-std-completed-list">
                <div className="cl-std-completed-item">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" fill="#16a34a"/>
                    <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Initial medical documentation submitted</span>
                </div>
                <div className="cl-std-completed-item">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" fill="#16a34a"/>
                    <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Employer verification received</span>
                </div>
              </div>
            )}
          </div>

          {/* Claim Status */}
          <div className="cl-std-card">
            <div className="cl-std-card-header">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#0f172a" strokeWidth="1.3"/>
                <path d="M8 4v4l2.5 1.5" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h2 className="cl-std-card-title">Claim Status</h2>
            </div>

            <div className="cl-std-status-current">
              <span className="cl-std-badge cl-std-badge--approved">APPROVED</span>
              <span className="cl-std-status-since">Since May 10, 2026</span>
            </div>

            <div className="cl-std-timeline">
              <div className="cl-std-timeline-item">
                <div className="cl-std-timeline-dot" />
                <div className="cl-std-timeline-content">
                  <span className="cl-std-timeline-title">Claim Filed</span>
                  <span className="cl-std-timeline-date">May 4, 2026</span>
                </div>
              </div>
              <div className="cl-std-timeline-item">
                <div className="cl-std-timeline-dot" />
                <div className="cl-std-timeline-content">
                  <span className="cl-std-timeline-title">Documentation Received</span>
                  <span className="cl-std-timeline-date">May 7, 2026</span>
                </div>
              </div>
              <div className="cl-std-timeline-item">
                <div className="cl-std-timeline-dot" />
                <div className="cl-std-timeline-content">
                  <span className="cl-std-timeline-title">Claim Approved</span>
                  <span className="cl-std-timeline-date">May 10, 2026</span>
                  <span className="cl-std-timeline-note">7-day elimination period waived.</span>
                </div>
              </div>
              <div className="cl-std-timeline-item cl-std-timeline-item--active">
                <div className="cl-std-timeline-dot" />
                <div className="cl-std-timeline-content">
                  <span className="cl-std-timeline-title">Benefits In Payment</span>
                  <span className="cl-std-timeline-date">Since May 11, 2026</span>
                  <span className="cl-std-timeline-note">Next payment Jul 26.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Documents & EOBs */}
          <div className="cl-std-card">
            <div className="cl-std-card-header">
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                <path d="M2 1h8l4 4v11a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1z" stroke="#0f172a" strokeWidth="1.3"/>
                <path d="M10 1v4h4" stroke="#0f172a" strokeWidth="1.3"/>
                <path d="M5 9h6M5 12h6" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <h2 className="cl-std-card-title">Documents &amp; EOBs</h2>
            </div>

            <div className="cl-std-doc-list">
              <div className="cl-std-doc-item">
                <div className="cl-std-doc-info">
                  <span className="cl-std-doc-name">Explanation of Benefits — Jul 12</span>
                  <span className="cl-std-doc-meta">PDF &middot; Generated Jul 12, 2026</span>
                </div>
                <button className="cl-link-btn">Download</button>
              </div>
              <div className="cl-std-doc-item">
                <div className="cl-std-doc-info">
                  <span className="cl-std-doc-name">Explanation of Benefits — Jun 28</span>
                  <span className="cl-std-doc-meta">PDF &middot; Generated Jun 28, 2026</span>
                </div>
                <button className="cl-link-btn">Download</button>
              </div>
              <div className="cl-std-doc-item">
                <div className="cl-std-doc-info">
                  <span className="cl-std-doc-name">Explanation of Benefits — Jun 14</span>
                  <span className="cl-std-doc-meta">PDF &middot; Generated Jun 14, 2026</span>
                </div>
                <button className="cl-link-btn">Download</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
