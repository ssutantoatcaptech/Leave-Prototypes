import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import useBasePath from './useBasePath';

const paymentsData = [
  {
    date: 'Oct 14, 2024',
    claim: 'CLM-2024-08832',
    caseRef: 'NTN-9312-GDC-81',
    type: 'Short-Term Disability',
    net: '$2,450.00',
    method: 'Direct Deposit',
    statement: 'View',
    gross: '$3,076.92',
    adjustments: [{ label: 'Accrued PTO Payout', amount: '+$480.00' }],
    adjustmentNote: 'Your employer is paying accrued PTO alongside your disability benefit this period. This does not reduce your benefit.',
    deductions: [
      { label: 'Federal Tax Withholding', amount: '-$461.54' },
      { label: 'State Tax Withholding', amount: '-$184.62' },
      { label: 'Social Security (FICA)', amount: '-$190.77' },
      { label: 'Medicare', amount: '-$44.62' },
      { label: 'Health Insurance Premium', amount: '-$225.37' },
    ],
    deposit: 'Direct Deposit — Chase ****4521',
  },
  {
    date: 'Sep 30, 2024',
    claim: 'CLM-2024-08832',
    caseRef: 'NTN-9312-GDC-81',
    type: 'Short-Term Disability',
    net: '$2,450.00',
    method: 'Direct Deposit',
    statement: 'View',
    gross: '$3,076.92',
    adjustments: [],
    adjustmentNote: null,
    deductions: [
      { label: 'Federal Tax Withholding', amount: '-$461.54' },
      { label: 'State Tax Withholding', amount: '-$184.62' },
      { label: 'Social Security (FICA)', amount: '-$190.77' },
      { label: 'Medicare', amount: '-$44.62' },
      { label: 'Health Insurance Premium', amount: '-$225.37' },
    ],
    deposit: 'Direct Deposit — Chase ****4521',
  },
  {
    date: 'Sep 16, 2024',
    claim: 'CLM-2024-08832',
    caseRef: 'NTN-9312-GDC-81',
    type: 'Short-Term Disability',
    net: '$2,450.00',
    method: 'Direct Deposit',
    statement: 'View',
    gross: '$3,076.92',
    adjustments: [],
    adjustmentNote: null,
    deductions: [
      { label: 'Federal Tax Withholding', amount: '-$461.54' },
      { label: 'State Tax Withholding', amount: '-$184.62' },
      { label: 'Social Security (FICA)', amount: '-$190.77' },
      { label: 'Medicare', amount: '-$44.62' },
      { label: 'Health Insurance Premium', amount: '-$225.37' },
    ],
    deposit: 'Direct Deposit — Chase ****4521',
  },
  {
    date: 'Sep 2, 2024',
    claim: 'CLM-2024-08510',
    caseRef: 'NTN-4501-GDC-10',
    type: 'Short-Term Disability',
    net: '$2,150.00',
    method: 'Direct Deposit',
    statement: 'View',
    gross: '$2,692.31',
    adjustments: [],
    adjustmentNote: null,
    deductions: [
      { label: 'Federal Tax Withholding', amount: '-$403.85' },
      { label: 'State Tax Withholding', amount: '-$161.54' },
      { label: 'Social Security (FICA)', amount: '-$166.92' },
      { label: 'Medicare', amount: '-$39.04' },
      { label: 'Health Insurance Premium', amount: '-$225.37' },
    ],
    deposit: 'Direct Deposit — Chase ****4521',
  },
  {
    date: 'Aug 19, 2024',
    claim: 'CLM-2024-07994',
    caseRef: 'NTN-5220-FLI-31',
    type: 'AD&D Benefit',
    net: '$15,000.00',
    method: 'Check',
    statement: 'View',
    gross: '$15,000.00',
    adjustments: [],
    adjustmentNote: null,
    deductions: [],
    deposit: 'Check mailed to address on file',
  },
];

export default function PaymentsPage() {
  const base = useBasePath();
  const [searchParams] = useSearchParams();
  const claimParam = searchParams.get('claim') || '';
  const [expandedRow, setExpandedRow] = useState(0);
  const [search, setSearch] = useState(claimParam);
  const [typeFilter, setTypeFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  const filtered = useMemo(() => {
    return paymentsData.filter((row) => {
      if (search) {
        const q = search.toLowerCase();
        const matchFields = [row.date, row.claim, row.caseRef, row.type, row.net, row.method].join(' ').toLowerCase();
        if (!matchFields.includes(q)) return false;
      }
      if (typeFilter !== 'All' && row.type !== typeFilter) return false;
      if (dateFilter !== 'All') {
        const d = new Date(row.date);
        const now = new Date('2024-10-20');
        const diff = (now - d) / (1000 * 60 * 60 * 24);
        if (dateFilter === 'Last 30 Days' && diff > 30) return false;
        if (dateFilter === 'Last 90 Days' && diff > 90) return false;
        if (dateFilter === 'Year to Date' && diff > 365) return false;
      }
      return true;
    });
  }, [search, typeFilter, dateFilter]);

  return (
    <div className="cl-page">
      <div className="cl-breadcrumb">
        <Link to={base} className="cl-breadcrumb-link">Claims &amp; Leave</Link>
        <span className="cl-breadcrumb-sep">&gt;</span>
        <span>Payments</span>
      </div>

      <div className="cl-page-header">
        <div>
          <h1 className="cl-page-title">Payments</h1>
          <p className="cl-page-desc">View and manage your benefit payments and payment history.</p>
        </div>
        <div className="cl-payment-badges">
          <div className="cl-payment-badge">
            <span className="cl-payment-badge-label">YTD Received</span>
            <span className="cl-payment-badge-value">$14,250.00</span>
          </div>
          <div className="cl-payment-badge">
            <span className="cl-payment-badge-label">Next Payment</span>
            <span className="cl-payment-badge-value">Oct 28, 2024</span>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="cl-filter-bar">
        <input
          type="text"
          className="cl-input cl-input--search"
          placeholder="Search payments..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setExpandedRow(-1); }}
        />
        <select className="cl-select" value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setExpandedRow(-1); }}>
          <option value="All">Claim Type</option>
          <option value="Short-Term Disability">Short-Term Disability</option>
          <option value="Long-Term Disability">Long-Term Disability</option>
          <option value="AD&D Benefit">AD&D</option>
        </select>
        <select className="cl-select" value={dateFilter} onChange={(e) => { setDateFilter(e.target.value); setExpandedRow(-1); }}>
          <option value="All">Date Range</option>
          <option value="Last 30 Days">Last 30 Days</option>
          <option value="Last 90 Days">Last 90 Days</option>
          <option value="Year to Date">Year to Date</option>
        </select>
        <button className="cl-btn cl-btn--outline">Export CSV</button>
        {(search || typeFilter !== 'All' || dateFilter !== 'All') && (
          <button className="cl-link-btn" onClick={() => { setSearch(''); setTypeFilter('All'); setDateFilter('All'); setExpandedRow(-1); }}>Clear Filters</button>
        )}
      </div>

      <div className="cl-pagination-info">
        Showing {filtered.length} of {paymentsData.length} payments
        {search && <span style={{ marginLeft: 8, color: '#0033a0', fontWeight: 600 }}>— filtered by "{search}"</span>}
      </div>

      {/* Payments table */}
      <div className="cl-table-wrap">
        <table className="cl-table">
          <thead>
            <tr>
              <th>Payment Date</th>
              <th>Claim Details</th>
              <th>Net Amount</th>
              <th>Method</th>
              <th>Statement</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '32px 16px', color: '#6b7280' }}>No payments match your filters.</td></tr>
            )}
            {filtered.map((row, i) => (
              <>
                <tr key={i} className={expandedRow === i ? 'cl-table-row--expanded' : ''}>
                  <td>{row.date}</td>
                  <td>
                    <div className="cl-cell-stacked">
                      <span className="cl-cell-primary cl-cell-mono">{row.claim}</span>
                      <span className="cl-cell-secondary">{row.type}</span>
                    </div>
                  </td>
                  <td className="cl-cell-amount">{row.net}</td>
                  <td>{row.method}</td>
                  <td><button className="cl-link-btn">{row.statement}</button></td>
                  <td><button className="cl-link-btn" onClick={() => setExpandedRow(expandedRow === i ? -1 : i)}>{expandedRow === i ? 'Hide' : 'Details'}</button></td>
                </tr>
                {expandedRow === i && (
                  <tr key={`${i}-detail`} className="cl-detail-row">
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
                {row.deductions.map((ded, j) => (
                  <div key={j} className="cl-card-mobile-field">
                    <span className="cl-card-mobile-label">{ded.label}</span>
                    <span className="cl-card-mobile-value">{ded.amount}</span>
                  </div>
                ))}
                <div className="cl-card-mobile-field cl-card-mobile-field--total">
                  <span className="cl-card-mobile-label">Net Amount</span>
                  <span className="cl-card-mobile-value">{row.net}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom info cards */}
      <div className="cl-bottom-cards">
        <div className="cl-info-card">
          <div className="cl-info-card-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4l2.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h3 className="cl-info-card-title">Payment Schedule</h3>
          <p className="cl-info-card-text">Payments are processed bi-weekly on alternating Mondays. Your next payment is estimated based on your current claim schedule.</p>
          <button className="cl-info-card-btn">View Payment Calendar</button>
        </div>
        <div className="cl-info-card">
          <div className="cl-info-card-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 3h8l4 4v9a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.4" fill="none"/><path d="M12 3v4h4" stroke="currentColor" strokeWidth="1.4" fill="none"/><path d="M6 11h8M6 14h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
          </div>
          <h3 className="cl-info-card-title">Tax Documents</h3>
          <p className="cl-info-card-text">Your 1099 forms for disability payments will be available in January for the prior tax year. Access current and past statements anytime.</p>
          <button className="cl-info-card-btn">View Tax Documents</button>
        </div>
      </div>
    </div>
  );
}
