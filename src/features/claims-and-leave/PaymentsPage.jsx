import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import useBasePath from './useBasePath';

const paymentsData = [
  {
    date: 'Aug 12, 2026',
    claim: 'CLM-2026-08832',
    caseRef: 'NTN-9312-GDC-81',
    type: 'Short-Term Disability',
    net: '$1,150.00',
    method: 'Direct Deposit',
    statement: 'View',
    gross: '$1,538.46',
    adjustments: [],
    adjustmentNote: null,
    deductions: [
      { label: 'Federal Tax Withholding', amount: '-$230.77' },
      { label: 'State Tax Withholding', amount: '-$92.31' },
      { label: 'Social Security (FICA)', amount: '-$95.38' },
      { label: 'Medicare', amount: '-$22.31' },
    ],
    deposit: 'Direct Deposit — Chase ****4521',
  },
  {
    date: 'Aug 5, 2026',
    claim: 'CLM-2026-08510',
    caseRef: 'NTN-4501-GDC-10',
    type: 'Short-Term Disability',
    net: '$1,150.00',
    method: 'Direct Deposit',
    statement: 'View',
    gross: '$1,538.46',
    adjustments: [],
    adjustmentNote: null,
    deductions: [
      { label: 'Federal Tax Withholding', amount: '-$230.77' },
      { label: 'State Tax Withholding', amount: '-$92.31' },
      { label: 'Social Security (FICA)', amount: '-$95.38' },
      { label: 'Medicare', amount: '-$22.31' },
    ],
    deposit: 'Direct Deposit — Chase ****4521',
  },
  {
    date: 'Jul 29, 2026',
    claim: 'CLM-2026-08220',
    caseRef: 'NTN-9312-GDC-81',
    type: 'Short-Term Disability',
    net: '$1,150.00',
    method: 'Direct Deposit',
    statement: 'View',
    gross: '$1,538.46',
    adjustments: [],
    adjustmentNote: null,
    deductions: [
      { label: 'Federal Tax Withholding', amount: '-$230.77' },
      { label: 'State Tax Withholding', amount: '-$92.31' },
      { label: 'Social Security (FICA)', amount: '-$95.38' },
      { label: 'Medicare', amount: '-$22.31' },
    ],
    deposit: 'Direct Deposit — Chase ****4521',
  },
  {
    date: 'Jul 22, 2026',
    claim: 'CLM-2026-07994',
    caseRef: 'NTN-5220-FLI-31',
    type: 'Short-Term Disability',
    net: '$1,150.00',
    method: 'Direct Deposit',
    statement: 'View',
    gross: '$1,538.46',
    adjustments: [],
    adjustmentNote: null,
    deductions: [
      { label: 'Federal Tax Withholding', amount: '-$230.77' },
      { label: 'State Tax Withholding', amount: '-$92.31' },
      { label: 'Social Security (FICA)', amount: '-$95.38' },
      { label: 'Medicare', amount: '-$22.31' },
    ],
    deposit: 'Direct Deposit — Chase ****4521',
  },
  {
    date: 'Aug 19, 2026',
    claim: 'CLM-2026-09100',
    caseRef: 'NTN-9312-GDC-81',
    type: 'Short-Term Disability',
    net: '$1,150.00',
    method: 'Check',
    statement: 'View',
    gross: '$1,538.46',
    adjustments: [],
    adjustmentNote: null,
    deductions: [
      { label: 'Federal Tax Withholding', amount: '-$230.77' },
      { label: 'State Tax Withholding', amount: '-$92.31' },
      { label: 'Social Security (FICA)', amount: '-$95.38' },
      { label: 'Medicare', amount: '-$22.31' },
    ],
    deposit: 'Check mailed to address on file',
  },
];

const PAGE_SIZE = 5;
const TOTAL_ENTRIES = 24;

export default function PaymentsPage() {
  const base = useBasePath();
  const [searchParams] = useSearchParams();
  const claimParam = searchParams.get('claim') || '';
  const [expandedRow, setExpandedRow] = useState(-1);
  const [search, setSearch] = useState(claimParam);
  const [typeFilter, setTypeFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('Last 90 Days');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return paymentsData.filter((row) => {
      if (search) {
        const q = search.toLowerCase();
        const matchFields = [row.date, row.claim, row.caseRef, row.type, row.net, row.method].join(' ').toLowerCase();
        if (!matchFields.includes(q)) return false;
      }
      if (typeFilter !== 'All' && row.type !== typeFilter) return false;
      if (dateFilter !== 'All' && dateFilter !== 'Last 90 Days') {
        const d = new Date(row.date);
        const now = new Date('2026-08-19');
        const diff = (now - d) / (1000 * 60 * 60 * 24);
        if (dateFilter === 'Last 30 Days' && diff > 30) return false;
        if (dateFilter === 'Year to Date' && diff > 365) return false;
      }
      return true;
    });
  }, [search, typeFilter, dateFilter]);

  const totalPages = 5;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setExpandedRow(-1);
    }
  };

  return (
    <div className="cl-payments-page">
      <div className="cl-payments-breadcrumb">
        <Link to={base} className="cl-payments-breadcrumb-link">Claims &amp; Leave</Link>
        <span className="cl-payments-breadcrumb-sep">&gt;</span>
        <span className="cl-payments-breadcrumb-current">Payments</span>
      </div>

      <div className="cl-payments-header">
        <h1 className="cl-payments-title">Payments</h1>
        <div className="cl-payments-summary-cards">
          <div className="cl-payments-summary-card">
            <span className="cl-payments-summary-label">YTD RECEIVED</span>
            <span className="cl-payments-summary-value">$14,250.00</span>
          </div>
          <div className="cl-payments-summary-card">
            <span className="cl-payments-summary-label">NEXT PAYMENT</span>
            <span className="cl-payments-summary-value">May 12, 2026</span>
          </div>
        </div>
      </div>

      {/* Filter bar + Table card */}
      <div className="cl-payments-card">
        <div className="cl-payments-filter-bar">
          <div className="cl-payments-filter-group">
            <label className="cl-payments-filter-label">SEARCH PAYMENTS</label>
            <div className="cl-payments-search-wrap">
              <svg className="cl-payments-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="#9ca3af" strokeWidth="1.4"/>
                <path d="M11 11L14 14" stroke="#9ca3af" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                className="cl-payments-search-input"
                placeholder="Search by date, type, or claim number"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setExpandedRow(-1); }}
              />
            </div>
          </div>
          <div className="cl-payments-filter-group cl-payments-filter-group--narrow">
            <label className="cl-payments-filter-label">CLAIM TYPE</label>
            <select className="cl-payments-select" value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setExpandedRow(-1); }}>
              <option value="All">All</option>
              <option value="Short-Term Disability">Short-Term Disability</option>
              <option value="Long-Term Disability">Long-Term Disability</option>
              <option value="AD&D Benefit">AD&D</option>
            </select>
          </div>
          <div className="cl-payments-filter-group cl-payments-filter-group--narrow">
            <label className="cl-payments-filter-label">DATE RANGE</label>
            <select className="cl-payments-select" value={dateFilter} onChange={(e) => { setDateFilter(e.target.value); setExpandedRow(-1); }}>
              <option value="Last 90 Days">Last 90 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Year to Date">Year to Date</option>
              <option value="All">All Time</option>
            </select>
          </div>
          <div className="cl-payments-filter-group cl-payments-filter-group--btn">
            <button className="cl-payments-download-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v8M8 10l-3-3M8 10l3-3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 12h10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Download CSV
            </button>
          </div>
          {(search || typeFilter !== 'All' || (dateFilter !== 'All' && dateFilter !== 'Last 90 Days')) && (
            <button className="cl-payments-clear-btn" onClick={() => { setSearch(''); setTypeFilter('All'); setDateFilter('Last 90 Days'); setExpandedRow(-1); }}>Clear Filters</button>
          )}
        </div>

        {/* Payments table */}
        <div className="cl-payments-table-wrap">
          <table className="cl-payments-table">
            <thead>
              <tr>
                <th>Payment Date</th>
                <th>Claim Details</th>
                <th>Net Amount</th>
                <th>Method</th>
                <th>Statement</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '32px 16px', color: '#6b7280' }}>No payments match your filters.</td></tr>
              )}
              {filtered.map((row, i) => (
                <>
                  <tr key={i} className={expandedRow === i ? 'cl-payments-row--expanded' : ''}>
                    <td>{row.date}</td>
                    <td>
                      <div className="cl-payments-claim-cell">
                        <span className="cl-payments-claim-link">{row.claim}</span>
                        <span className="cl-payments-claim-type">{row.type}</span>
                      </div>
                    </td>
                    <td className="cl-payments-amount">{row.net}</td>
                    <td>{row.method}</td>
                    <td><button className="cl-payments-link-btn">{row.statement}</button></td>
                    <td>
                      <button className="cl-payments-link-btn cl-payments-details-btn" onClick={() => setExpandedRow(expandedRow === i ? -1 : i)}>
                        View Details
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 4, transform: expandedRow === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                          <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                  {expandedRow === i && (
                    <tr key={`${i}-detail`} className="cl-payments-detail-row">
                      <td colSpan="6">
                        <div className="cl-payment-detail">
                          <h4 className="cl-detail-title">Payment Breakdown</h4>
                          <div className="cl-payment-breakdown">
                            <div className="cl-breakdown-row">
                              <span>Gross Pay (Bi-weekly Benefit)</span>
                              <span>{row.gross}</span>
                            </div>
                            {(row.adjustments.length > 0 || row.adjustmentNote) && (
                              <div className="cl-breakdown-section">
                                <div className="cl-breakdown-row cl-breakdown-row--sub">
                                  <span>Adjustments</span>
                                  <span></span>
                                </div>
                                {row.adjustmentNote && (
                                  <div className="cl-breakdown-info">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                      <circle cx="7" cy="7" r="6" stroke="#0033a0" strokeWidth="1.2"/>
                                      <path d="M7 6v4M7 4.5h.01" stroke="#0033a0" strokeWidth="1.2" strokeLinecap="round"/>
                                    </svg>
                                    <span>{row.adjustmentNote}</span>
                                  </div>
                                )}
                                {row.adjustments.map((adj, j) => (
                                  <div key={j} className="cl-breakdown-row cl-breakdown-row--indent">
                                    <span>{adj.label}</span>
                                    <span>{adj.amount}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {row.deductions.length > 0 && (
                              <div className="cl-breakdown-section">
                                <div className="cl-breakdown-row cl-breakdown-row--sub">
                                  <span>Taxes &amp; Deductions</span>
                                  <span></span>
                                </div>
                                {row.deductions.map((ded, j) => (
                                  <div key={j} className="cl-breakdown-row cl-breakdown-row--indent">
                                    <span>{ded.label}</span>
                                    <span>{ded.amount}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="cl-breakdown-row cl-breakdown-row--total">
                              <span>Net Amount</span>
                              <span>{row.net}</span>
                            </div>
                            <div className="cl-breakdown-row cl-breakdown-row--method">
                              <span>Deposit Method</span>
                              <span>{row.deposit}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="cl-payments-pagination">
          <div className="cl-payments-pagination-buttons">
            <button
              className="cl-payments-page-btn"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lt;
            </button>
            <button
              className={`cl-payments-page-btn ${currentPage === 1 ? 'cl-payments-page-btn--active' : ''}`}
              onClick={() => handlePageChange(1)}
            >
              1
            </button>
            <button
              className={`cl-payments-page-btn ${currentPage === 2 ? 'cl-payments-page-btn--active' : ''}`}
              onClick={() => handlePageChange(2)}
            >
              2
            </button>
            <button
              className={`cl-payments-page-btn ${currentPage === 3 ? 'cl-payments-page-btn--active' : ''}`}
              onClick={() => handlePageChange(3)}
            >
              3
            </button>
            <span className="cl-payments-page-ellipsis">...</span>
            <button
              className={`cl-payments-page-btn ${currentPage === 5 ? 'cl-payments-page-btn--active' : ''}`}
              onClick={() => handlePageChange(5)}
            >
              5
            </button>
            <button
              className="cl-payments-page-btn"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &gt;
            </button>
          </div>
          <div className="cl-payments-pagination-info">
            Showing 1 to {PAGE_SIZE} of {TOTAL_ENTRIES} entries
          </div>
        </div>
      </div>

      {/* Mobile card view */}
      <div className="cl-cards-mobile">
        {filtered.length === 0 && (
          <div className="cl-card-empty-mobile">No payments match your filters.</div>
        )}
        {filtered.map((row, i) => (
          <div key={i} className="cl-card-mobile">
            <div className="cl-card-mobile-header">
              <span className="cl-card-mobile-primary">{row.net}</span>
              <span className="cl-card-mobile-date">{row.date}</span>
            </div>
            <span className="cl-card-mobile-type">{row.claim} — {row.type}</span>
            <div className="cl-card-mobile-details">
              <div className="cl-card-mobile-field">
                <span className="cl-card-mobile-label">Method</span>
                <span className="cl-card-mobile-value">{row.method}</span>
              </div>
              <div className="cl-card-mobile-field">
                <span className="cl-card-mobile-label">Gross</span>
                <span className="cl-card-mobile-value">{row.gross}</span>
              </div>
            </div>
            <div className="cl-card-mobile-actions-row">
              <button className="cl-card-mobile-action">View Statement</button>
              <button className="cl-card-mobile-action cl-card-mobile-action--outline" onClick={() => setExpandedRow(expandedRow === i ? -1 : i)}>
                {expandedRow === i ? 'Hide Details' : 'Payment Details'}
              </button>
            </div>
            {expandedRow === i && (
              <div className="cl-card-mobile-expand">
                <div className="cl-card-mobile-field">
                  <span className="cl-card-mobile-label">Gross Pay</span>
                  <span className="cl-card-mobile-value">{row.gross}</span>
                </div>
                {row.adjustments.length > 0 && (
                  <>
                    <div className="cl-card-mobile-field cl-card-mobile-field--section">
                      <span className="cl-card-mobile-label">Offsets / Adjustments</span>
                    </div>
                    {row.adjustments.map((adj, j) => (
                      <div key={j} className="cl-card-mobile-field cl-card-mobile-field--indent">
                        <span className="cl-card-mobile-label">{adj.label}</span>
                        <span className="cl-card-mobile-value">{adj.amount}</span>
                      </div>
                    ))}
                  </>
                )}
                {row.deductions.length > 0 && (
                  <>
                    <div className="cl-card-mobile-field cl-card-mobile-field--section">
                      <span className="cl-card-mobile-label">Taxes & Deductions</span>
                    </div>
                    {row.deductions.map((ded, j) => (
                      <div key={j} className="cl-card-mobile-field cl-card-mobile-field--indent">
                        <span className="cl-card-mobile-label">{ded.label}</span>
                        <span className="cl-card-mobile-value">{ded.amount}</span>
                      </div>
                    ))}
                  </>
                )}
                <div className="cl-card-mobile-field cl-card-mobile-field--total">
                  <span className="cl-card-mobile-label">Net Amount</span>
                  <span className="cl-card-mobile-value">{row.net}</span>
                </div>
                <div className="cl-card-mobile-field">
                  <span className="cl-card-mobile-label">Deposit</span>
                  <span className="cl-card-mobile-value">{row.deposit}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom info cards */}
      <div className="cl-payments-bottom-cards">
        <div className="cl-payments-info-card">
          <div className="cl-payments-info-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="cl-payments-info-title">Manage Direct Deposit</h3>
          <p className="cl-payments-info-text">Payments are processed bi-weekly on alternating Mondays. Your next payment is estimated based on your current claim schedule.</p>
          <button className="cl-payments-info-btn">View Payment Calendar</button>
        </div>
        <div className="cl-payments-info-card">
          <div className="cl-payments-info-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 2h8l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="#105fa8" strokeWidth="1.5" fill="none"/>
              <path d="M14 2v6h6" stroke="#105fa8" strokeWidth="1.5" fill="none"/>
              <path d="M8 13h8M8 17h5" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h3 className="cl-payments-info-title">Tax Documents</h3>
          <p className="cl-payments-info-text">Your 1099 forms for disability payments will be available in January for the prior tax year. Access current and past statements anytime.</p>
          <button className="cl-payments-info-btn">View Tax Documents</button>
        </div>
      </div>
    </div>
  );
}
