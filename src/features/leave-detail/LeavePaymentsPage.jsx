import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './leave-detail-b.css';

function SiteNav({ user, initials }) {
  return (
    <div className="ldb-top-nav">
      <div className="ldb-nav-main">
        <div className="ldb-nav-main-left">
          <span className="ldb-nav-brand">Benefits<span> Hub</span></span>
          <div className="ldb-nav-links">
            <a href="#" className="ldb-nav-link">Dashboard</a>
            <a href="#" className="ldb-nav-link">Benefits</a>
            <a href="#" className="ldb-nav-link active">Claims &amp; Leave</a>
            <a href="#" className="ldb-nav-link">Documents</a>
            <a href="#" className="ldb-nav-link">Support</a>
          </div>
        </div>
        <div className="ldb-nav-utilities">
          <button type="button" className="ldb-nav-util">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M5 7h6M5 9.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            ID Cards
          </button>
          <button type="button" className="ldb-nav-util">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
            Messages
          </button>
          <button type="button" className="ldb-nav-bell">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2C5.79 2 4 3.79 4 6v2.67L3 10h10l-1-1.33V6c0-2.21-1.79-4-4-4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.5 12a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          </button>
          <div className="ldb-nav-avatar">
            <div className="ldb-nav-avatar-circle">{initials}</div>
            <span className="ldb-nav-avatar-name">{user}</span>
          </div>
        </div>
      </div>
      <div className="ldb-nav-secondary">
        <a href="#" className="ldb-nav-tab">File a Claim or Leave</a>
        <a href="#" className="ldb-nav-tab">My Leaves</a>
        <a href="#" className="ldb-nav-tab">Claim Center</a>
        <a href="#" className="ldb-nav-tab">Leave Planning Tool</a>
        <a href="#" className="ldb-nav-tab">Manage My Absences</a>
        <a href="#" className="ldb-nav-tab active">Payments</a>
      </div>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="ldb-site-footer">
      <div className="ldb-site-footer-inner">
        <div className="ldb-site-footer-grid">
          <div className="ldb-site-footer-col">
            <h4>Resources</h4>
            <a href="#">Leave Policies</a>
            <a href="#">FAQs</a>
            <a href="#">Forms &amp; Documents</a>
          </div>
          <div className="ldb-site-footer-col">
            <h4>Support</h4>
            <a href="#">Contact HR</a>
            <a href="#">Help Center</a>
            <a href="#">Report an Issue</a>
          </div>
          <div className="ldb-site-footer-col">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Accessibility</a>
          </div>
          <div className="ldb-site-footer-col">
            <h4>Contact</h4>
            <a href="#">Phone: 1-800-HR-HELP</a>
            <a href="#">Email: hrbenefits@company.com</a>
            <a href="#">Hours: Mon-Fri, 8am-6pm EST</a>
          </div>
        </div>
        <div className="ldb-site-footer-bottom">
          <span>&copy; 2026 HR Benefits Portal. All rights reserved.</span>
          <div className="ldb-site-footer-social">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.5v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.12 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" stroke="currentColor" strokeWidth="1.5"/></svg>
          </div>
        </div>
      </div>
    </footer>
  );
}

var PAYMENTS = [
  { id: 'PMT-4421', date: 'Aug 12, 2024', claimType: 'Short-Term Disability', claimId: '#CL-44201987', claimSub: 'Weekly Benefit', amount: '$1,150.00', taxLabel: 'TAXABLE', method: 'direct', methodDetail: 'Direct Deposit (••42)', status: 'PROCESSED', hasStatement: true },
  { id: 'PMT-4420', date: 'Aug 5, 2024', claimType: 'Short-Term Disability', claimId: '#CL-44201987', claimSub: 'Weekly Benefit', amount: '$1,150.00', taxLabel: 'TAXABLE', method: 'direct', methodDetail: 'Direct Deposit (••42)', status: 'PROCESSED', hasStatement: true },
  { id: 'PMT-4419', date: 'Jul 29, 2024', claimType: 'Short-Term Disability', claimId: '#CL-44201987', claimSub: 'Weekly Benefit', amount: '$1,150.00', taxLabel: 'TAXABLE', method: 'direct', methodDetail: 'Direct Deposit (••42)', status: 'PROCESSED', hasStatement: true },
  { id: 'PMT-4418', date: 'Jul 22, 2024', claimType: 'Short-Term Disability', claimId: '#CL-44201987', claimSub: 'Partial Week', amount: '$575.00', taxLabel: 'TAXABLE', method: 'direct', methodDetail: 'Direct Deposit (••42)', status: 'PROCESSED', hasStatement: true },
  { id: 'PMT-4417', date: 'Aug 19, 2024', claimType: 'Short-Term Disability', claimId: '#CL-44201987', claimSub: 'Weekly Benefit', amount: '$1,150.00', taxLabel: 'ESTIMATED', method: 'direct', methodDetail: 'Direct Deposit (••42)', status: 'PENDING', hasStatement: false },
];

var TOTAL_PAYMENTS = 12;
var PER_PAGE = 5;

export default function LeavePaymentsPage() {
  var [searchParams, setSearchParams] = useSearchParams();
  var claimParam = searchParams.get('claim');
  var caseParam = searchParams.get('case');
  var [searchTerm, setSearchTerm] = useState('');
  var [claimTypeFilter, setClaimTypeFilter] = useState('std');
  var [dateRangeFilter, setDateRangeFilter] = useState('90');
  var [currentPage, setCurrentPage] = useState(1);

  var totalPages = Math.ceil(TOTAL_PAYMENTS / PER_PAGE);
  var startItem = (currentPage - 1) * PER_PAGE + 1;
  var endItem = Math.min(currentPage * PER_PAGE, TOTAL_PAYMENTS);

  function getStatusClass(status) {
    if (status === 'PROCESSED') return 'ldb-pmt-status ldb-pmt-status--processed';
    if (status === 'ISSUED') return 'ldb-pmt-status ldb-pmt-status--issued';
    return 'ldb-pmt-status ldb-pmt-status--pending';
  }

  return (
    <div className="ldb-page">
      <SiteNav user="Sarah Johnson" initials="SJ" />

      <div className="ldb-content">
        {/* Breadcrumb */}
        <div className="ldb-breadcrumb">
          <Link to="/leave-detail-v2d" className="ldb-breadcrumb-link">Claims &amp; Leave</Link>
          <span className="ldb-bc-sep">&gt;</span>
          <Link to="/leave-detail-v2d" className="ldb-breadcrumb-link">Medical Leave</Link>
          <span className="ldb-bc-sep">&gt;</span>
          <span style={{ fontWeight: 600, color: '#0f0f14' }}>Payments</span>
        </div>

        {/* Filter Banner — shown when navigating from a case */}
        {claimParam && (
          <div className="ldb-pmt-filter-banner">
            <div className="ldb-pmt-filter-banner-left">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 3h12l-4.5 5.5V13l-3 1.5V8.5L2 3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>Filtered: <strong>{claimParam}</strong>{caseParam ? ' from case ' + caseParam : ''}</span>
            </div>
            <button type="button" className="ldb-pmt-filter-banner-clear" onClick={function () { setSearchParams({}); }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              Clear filter
            </button>
          </div>
        )}

        {/* Page Header Row: title left, summary cards right */}
        <div className="ldb-pmt-hero">
          <div className="ldb-pmt-hero-left">
            <h1 className="ldb-pmt-page-title">Payments</h1>
            <p className="ldb-pmt-page-desc">{claimParam ? 'Group Disability Claim (STD) · ' + claimParam : 'Medical Leave — Back Surgery Recovery • NTN-44201987'}</p>
          </div>
          <div className="ldb-pmt-hero-right">
            <div className="ldb-pmt-hero-card">
              <span className="ldb-pmt-hero-card-label">TOTAL PAID</span>
              <span className="ldb-pmt-hero-card-value">$4,025.00</span>
            </div>
            <div className="ldb-pmt-hero-card">
              <span className="ldb-pmt-hero-card-label">NEXT PAYMENT</span>
              <span className="ldb-pmt-hero-card-value">Aug 19, 2024</span>
            </div>
          </div>
        </div>

        {/* Filter Bar with labels */}
        <div className="ldb-pmt-filter-bar">
          <div className="ldb-pmt-filter-group ldb-pmt-filter-group--search">
            <label className="ldb-pmt-filter-label">SEARCH PAYMENTS</label>
            <div className="ldb-pmt-search-wrap">
              <svg className="ldb-pmt-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3"/><path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              <input
                type="text"
                className="ldb-pmt-search-input"
                placeholder="Search by claim # or amount..."
                value={searchTerm}
                onChange={function (e) { setSearchTerm(e.target.value); }}
              />
            </div>
          </div>
          <div className="ldb-pmt-filter-group">
            <label className="ldb-pmt-filter-label">CLAIM TYPE</label>
            <select
              className="ldb-pmt-select"
              value={claimTypeFilter}
              onChange={function (e) { setClaimTypeFilter(e.target.value); }}
            >
              <option value="all">All Benefit Types</option>
              <option value="std">Short-Term Disability</option>
              <option value="fmla">Family Medical Leave</option>
              <option value="ltd">Long-Term Disability</option>
            </select>
          </div>
          <div className="ldb-pmt-filter-group">
            <label className="ldb-pmt-filter-label">DATE RANGE</label>
            <select
              className="ldb-pmt-select"
              value={dateRangeFilter}
              onChange={function (e) { setDateRangeFilter(e.target.value); }}
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="365">Last 12 Months</option>
              <option value="all">All Time</option>
            </select>
          </div>
          <div className="ldb-pmt-filter-group ldb-pmt-filter-group--export">
            <button type="button" className="ldb-pmt-export-btn">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M14 2H6a2 2 0 00-2 2v1M10 1v4h4M10 1l4 4M2 9v5a2 2 0 002 2h8a2 2 0 002-2V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Export CSV
            </button>
          </div>
        </div>

        {/* Payment Table */}
        <div className="ldb-pmt-table-card">
          <table className="ldb-pmt-table">
            <thead>
              <tr>
                <th>PAYMENT DATE</th>
                <th>CLAIM DETAILS</th>
                <th>AMOUNT</th>
                <th>METHOD</th>
                <th>STATUS</th>
                <th>STATEMENT</th>
              </tr>
            </thead>
            <tbody>
              {PAYMENTS.map(function (pmt) {
                return (
                  <tr key={pmt.id}>
                    <td>
                      <div className="ldb-pmt-td-date">
                        <span className="ldb-pmt-date-main">{pmt.date}</span>
                        <span className="ldb-pmt-date-sub">Payment ID (if applicable)</span>
                      </div>
                    </td>
                    <td>
                      <div className="ldb-pmt-td-claim">
                        <span className="ldb-pmt-claim-type">{pmt.claimType}</span>
                        <span className="ldb-pmt-claim-id">Claim {pmt.claimId} &bull; {pmt.claimSub}</span>
                      </div>
                    </td>
                    <td>
                      <div className="ldb-pmt-td-amount">
                        <span className="ldb-pmt-amount">{pmt.amount}</span>
                        <span className={'ldb-pmt-tax-label' + (pmt.taxLabel === 'TAXABLE' ? ' ldb-pmt-tax--taxable' : pmt.taxLabel === 'ESTIMATED' ? ' ldb-pmt-tax--estimated' : '')}>{pmt.taxLabel}</span>
                      </div>
                    </td>
                    <td>
                      <div className="ldb-pmt-td-method">
                        {pmt.method === 'direct' ? (
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="4" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M1 7h14" stroke="currentColor" strokeWidth="1.2"/></svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
                        )}
                        <span>{pmt.methodDetail}</span>
                      </div>
                    </td>
                    <td>
                      <span className={getStatusClass(pmt.status)}>
                        <span className="ldb-pmt-status-dot" />
                        {pmt.status}
                      </span>
                    </td>
                    <td className="ldb-pmt-td-statement">
                      {pmt.hasStatement && (
                        <button type="button" className="ldb-pmt-statement-btn" title="Download Statement">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h5l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 2v4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="ldb-pmt-pagination">
            <span className="ldb-pmt-pagination-info">Showing <strong>{startItem}-{endItem}</strong> of <strong>{TOTAL_PAYMENTS}</strong> payments</span>
            <div className="ldb-pmt-pagination-buttons">
              <button
                type="button"
                className="ldb-pmt-page-btn"
                disabled={currentPage === 1}
                onClick={function () { setCurrentPage(currentPage - 1); }}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {[1, 2, 3].map(function (page) {
                return (
                  <button
                    key={page}
                    type="button"
                    className={'ldb-pmt-page-btn' + (page === currentPage ? ' active' : '')}
                    onClick={function () { setCurrentPage(page); }}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                type="button"
                className="ldb-pmt-page-btn"
                disabled={currentPage === totalPages}
                onClick={function () { setCurrentPage(currentPage + 1); }}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="ldb-pmt-info-row">
          <div className="ldb-pmt-info-card">
            <div className="ldb-pmt-info-icon ldb-pmt-info-icon--circle">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div className="ldb-pmt-info-content">
              <h3>Understanding Your Payment</h3>
              <p>Learn about tax withholdings, processing times, and benefit calculations.</p>
              <a href="#" className="ldb-pmt-info-link">Read FAQ Guide <span>&rarr;</span></a>
            </div>
          </div>
          <div className="ldb-pmt-info-card">
            <div className="ldb-pmt-info-icon ldb-pmt-info-icon--circle">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6M9 15h6M9 11h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="ldb-pmt-info-content">
              <h3>Tax Documents</h3>
              <p>Access your 1099-G or other tax related forms for your benefit income.</p>
              <a href="#" className="ldb-pmt-info-link">View Tax Forms <span>&rarr;</span></a>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
