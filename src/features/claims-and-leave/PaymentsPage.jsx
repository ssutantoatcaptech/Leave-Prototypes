import { useState } from 'react';

const paymentsData = [
  {
    date: 'Oct 14, 2024',
    claim: 'CLM-2024-08832',
    type: 'Short-Term Disability',
    net: '$2,450.00',
    method: 'Direct Deposit',
    statement: 'View',
    expandable: true,
  },
  {
    date: 'Sep 30, 2024',
    claim: 'CLM-2024-08832',
    type: 'Short-Term Disability',
    net: '$2,450.00',
    method: 'Direct Deposit',
    statement: 'View',
    expandable: false,
  },
  {
    date: 'Sep 16, 2024',
    claim: 'CLM-2024-08832',
    type: 'Short-Term Disability',
    net: '$2,450.00',
    method: 'Direct Deposit',
    statement: 'View',
    expandable: false,
  },
  {
    date: 'Sep 2, 2024',
    claim: 'CLM-2024-08510',
    type: 'Short-Term Disability',
    net: '$2,150.00',
    method: 'Direct Deposit',
    statement: 'View',
    expandable: false,
  },
  {
    date: 'Aug 19, 2024',
    claim: 'CLM-2024-07994',
    type: 'AD&D Benefit',
    net: '$15,000.00',
    method: 'Check',
    statement: 'View',
    expandable: false,
  },
];

export default function PaymentsPage() {
  const [expandedRow, setExpandedRow] = useState(0);

  return (
    <div className="cl-page">
      <div className="cl-breadcrumb">
        <span>Claims &amp; Leave</span>
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
        <input type="text" className="cl-input cl-input--search" placeholder="Search payments..." />
        <select className="cl-select">
          <option>Claim Type</option>
          <option>Short-Term Disability</option>
          <option>Long-Term Disability</option>
          <option>AD&D</option>
        </select>
        <select className="cl-select">
          <option>Date Range</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Year to Date</option>
        </select>
        <button className="cl-btn cl-btn--outline">Export CSV</button>
      </div>

      <div className="cl-pagination-info">Showing 1–5 of 42 payments</div>

      {/* Payments table */}
      <div className="cl-table-wrap">
        <table className="cl-table">
          <thead>
            <tr>
              <th></th>
              <th>Payment Date</th>
              <th>Claim Details</th>
              <th>Net Amount</th>
              <th>Method</th>
              <th>Statement</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentsData.map((row, i) => (
              <>
                <tr key={i} className={expandedRow === i ? 'cl-table-row--expanded' : ''}>
                  <td>
                    {row.expandable && (
                      <button
                        className="cl-expand-btn"
                        onClick={() => setExpandedRow(expandedRow === i ? -1 : i)}
                        aria-label="Expand row"
                      >
                        {expandedRow === i ? '−' : '+'}
                      </button>
                    )}
                  </td>
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
                  <td><button className="cl-link-btn">Details</button></td>
                </tr>
                {expandedRow === i && row.expandable && (
                  <tr key={`${i}-detail`} className="cl-detail-row">
                    <td colSpan="7">
                      <div className="cl-payment-detail">
                        <h4 className="cl-detail-title">Payment Breakdown</h4>
                        <div className="cl-payment-breakdown">
                          <div className="cl-breakdown-row">
                            <span>Gross Pay (Bi-weekly Benefit)</span>
                            <span>$3,076.92</span>
                          </div>
                          <div className="cl-breakdown-section">
                            <div className="cl-breakdown-row cl-breakdown-row--sub">
                              <span>Adjustments</span>
                              <span></span>
                            </div>
                            <div className="cl-breakdown-info">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <circle cx="7" cy="7" r="6" stroke="#0033a0" strokeWidth="1.2"/>
                                <path d="M7 6v4M7 4.5h.01" stroke="#0033a0" strokeWidth="1.2" strokeLinecap="round"/>
                              </svg>
                              <span>Accrued PTO Payout: Your employer is paying accrued PTO alongside your disability benefit this period. This does not reduce your benefit.</span>
                            </div>
                            <div className="cl-breakdown-row cl-breakdown-row--indent">
                              <span>Accrued PTO Payout</span>
                              <span>+$480.00</span>
                            </div>
                          </div>
                          <div className="cl-breakdown-section">
                            <div className="cl-breakdown-row cl-breakdown-row--sub">
                              <span>Taxes &amp; Deductions</span>
                              <span></span>
                            </div>
                            <div className="cl-breakdown-row cl-breakdown-row--indent">
                              <span>Federal Tax Withholding</span>
                              <span>-$461.54</span>
                            </div>
                            <div className="cl-breakdown-row cl-breakdown-row--indent">
                              <span>State Tax Withholding</span>
                              <span>-$184.62</span>
                            </div>
                            <div className="cl-breakdown-row cl-breakdown-row--indent">
                              <span>Social Security (FICA)</span>
                              <span>-$190.77</span>
                            </div>
                            <div className="cl-breakdown-row cl-breakdown-row--indent">
                              <span>Medicare</span>
                              <span>-$44.62</span>
                            </div>
                            <div className="cl-breakdown-row cl-breakdown-row--indent">
                              <span>Health Insurance Premium</span>
                              <span>-$225.37</span>
                            </div>
                          </div>
                          <div className="cl-breakdown-row cl-breakdown-row--total">
                            <span>Net Amount</span>
                            <span>$2,450.00</span>
                          </div>
                          <div className="cl-breakdown-row cl-breakdown-row--method">
                            <span>Deposit Method</span>
                            <span>Direct Deposit — Chase ****4521</span>
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

      {/* Bottom info cards */}
      <div className="cl-bottom-cards">
        <div className="cl-info-card">
          <h3 className="cl-info-card-title">Understanding Your Payment</h3>
          <ul className="cl-faq-list">
            <li><strong>When will I receive my payment?</strong> Payments are processed bi-weekly on alternating Mondays.</li>
            <li><strong>Why is my net different from gross?</strong> Taxes, insurance premiums, and other deductions are applied.</li>
            <li><strong>Can I change my deposit method?</strong> Yes, update your payment preferences in Account Settings.</li>
          </ul>
        </div>
        <div className="cl-info-card">
          <h3 className="cl-info-card-title">Tax Documents</h3>
          <p className="cl-info-card-text">
            Your 1099 forms for disability payments will be available in January for the prior tax year.
          </p>
          <a href="#" className="cl-link-btn">View Tax Documents</a>
        </div>
      </div>
    </div>
  );
}
