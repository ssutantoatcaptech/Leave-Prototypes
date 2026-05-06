import { useState, useMemo } from 'react';
import { NavLink, Link } from 'react-router-dom';

const dentalData = [
  {
    date: 'Oct 10, 2024',
    claimNum: 'DNT-2024-04521',
    member: 'Sarah Johnson',
    provider: 'Dr. Emily Chen, DDS',
    billed: '$1,240.00',
    memberPays: '$186.00',
    status: 'Approved',
    statusColor: 'green',
    details: [
      { code: 'D0120', service: 'Periodic Oral Evaluation', billed: '$65.00', planPays: '$58.50', youPay: '$6.50' },
      { code: 'D0274', service: 'Bitewings - Four Films', billed: '$95.00', planPays: '$85.50', youPay: '$9.50' },
      { code: 'D1110', service: 'Prophylaxis - Adult', billed: '$130.00', planPays: '$117.00', youPay: '$13.00' },
      { code: 'D2392', service: 'Resin Composite - Two Surfaces', billed: '$950.00', planPays: '$793.00', youPay: '$157.00' },
    ],
  },
  {
    date: 'Sep 5, 2024',
    claimNum: 'DNT-2024-04210',
    member: 'Michael Johnson',
    provider: 'Bright Smiles Dental',
    billed: '$320.00',
    memberPays: '$48.00',
    status: 'Approved',
    statusColor: 'green',
    details: [
      { code: 'D0120', service: 'Periodic Oral Evaluation', billed: '$65.00', planPays: '$58.50', youPay: '$6.50' },
      { code: 'D1120', service: 'Prophylaxis - Child', billed: '$100.00', planPays: '$90.00', youPay: '$10.00' },
      { code: 'D1208', service: 'Topical Fluoride', billed: '$45.00', planPays: '$40.50', youPay: '$4.50' },
      { code: 'D1351', service: 'Sealant - Per Tooth', billed: '$110.00', planPays: '$83.00', youPay: '$27.00' },
    ],
  },
  {
    date: 'Aug 12, 2024',
    claimNum: 'DNT-2024-03987',
    member: 'Sarah Johnson',
    provider: 'Dr. Emily Chen, DDS',
    billed: '$2,100.00',
    memberPays: '$420.00',
    status: 'Pending',
    statusColor: 'blue',
    details: [
      { code: 'D2740', service: 'Crown - Porcelain/Ceramic', billed: '$1,400.00', planPays: '$1,120.00', youPay: '$280.00' },
      { code: 'D2950', service: 'Core Buildup', billed: '$350.00', planPays: '$280.00', youPay: '$70.00' },
      { code: 'D0220', service: 'Periapical Radiograph', billed: '$35.00', planPays: '$31.50', youPay: '$3.50' },
      { code: 'D9215', service: 'Local Anesthesia', billed: '$315.00', planPays: '$248.50', youPay: '$66.50' },
    ],
  },
];

const categoryTabs = ['Dental', 'Vision', 'Supplemental', 'Leave and Disability', 'Life'];

export default function DentalClaimsPage() {
  const [expandedRow, setExpandedRow] = useState(0);
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  const filtered = useMemo(() => {
    return dentalData.filter((row) => {
      if (statusFilter !== 'All' && row.status !== statusFilter) return false;
      if (dateFilter !== 'All') {
        const d = new Date(row.date);
        const now = new Date('2024-10-20');
        const diff = (now - d) / (1000 * 60 * 60 * 24);
        if (dateFilter === 'Last 30 Days' && diff > 30) return false;
        if (dateFilter === 'Last 90 Days' && diff > 90) return false;
        if (dateFilter === 'Last Year' && diff > 365) return false;
      }
      return true;
    });
  }, [statusFilter, dateFilter]);

  return (
    <div className="cl-page">
      <div className="cl-breadcrumb">
        <Link to="/claims-and-leave" className="cl-breadcrumb-link">Claims &amp; Leave</Link>
        <span className="cl-breadcrumb-sep">&gt;</span>
        <span>Dental Claims</span>
      </div>

      <div className="cl-page-header">
        <div>
          <h1 className="cl-page-title">Claims Center</h1>
          <p className="cl-page-desc">Track and manage your dental claims.</p>
        </div>
        <button className="cl-btn cl-btn--dark">+ Start a New Claim</button>
      </div>

      {/* Category tabs */}
      <div className="cl-category-tabs">
        {categoryTabs.map((tab) => (
          <NavLink
            key={tab}
            to={tab === 'Leave and Disability' ? '/claims-and-leave' : '#'}
            className={`cl-category-tab${tab === 'Dental' ? ' cl-category-tab--active' : ''}`}
          >
            {tab}
          </NavLink>
        ))}
      </div>

      {/* Filter bar */}
      <div className="cl-filter-bar">
        <select className="cl-select" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setExpandedRow(-1); }}>
          <option value="All">All Statuses</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
        </select>
        <select className="cl-select" value={dateFilter} onChange={(e) => { setDateFilter(e.target.value); setExpandedRow(-1); }}>
          <option value="All">Date Range</option>
          <option value="Last 30 Days">Last 30 Days</option>
          <option value="Last 90 Days">Last 90 Days</option>
          <option value="Last Year">Last Year</option>
        </select>
        <button className="cl-btn cl-btn--outline">Export History (CSV)</button>
      </div>

      <div className="cl-pagination-info">Showing {filtered.length} of {dentalData.length} claims</div>

      {/* Dental claims table */}
      <div className="cl-table-wrap">
        <table className="cl-table">
          <thead>
            <tr>
              <th></th>
              <th>Submission Date</th>
              <th>Claim #</th>
              <th>Member Name</th>
              <th>Provider</th>
              <th>Billed Amount</th>
              <th>Member Pays</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan="9" style={{ textAlign: 'center', padding: '32px 16px', color: '#6b7280' }}>No claims match your filters.</td></tr>
            )}
            {filtered.map((row, i) => (
              <>
                <tr key={i} className={expandedRow === i ? 'cl-table-row--expanded' : ''}>
                  <td>
                    <button
                      className="cl-expand-btn"
                      onClick={() => setExpandedRow(expandedRow === i ? -1 : i)}
                      aria-label="Expand row"
                    >
                      {expandedRow === i ? '−' : '+'}
                    </button>
                  </td>
                  <td>{row.date}</td>
                  <td className="cl-cell-mono">{row.claimNum}</td>
                  <td>{row.member}</td>
                  <td>{row.provider}</td>
                  <td>{row.billed}</td>
                  <td>{row.memberPays}</td>
                  <td>
                    <span className={`cl-badge cl-badge--${row.statusColor}`}>{row.status}</span>
                  </td>
                  <td>
                    <button className="cl-link-btn">View Details</button>
                  </td>
                </tr>
                {expandedRow === i && (
                  <tr key={`${i}-detail`} className="cl-detail-row">
                    <td colSpan="9">
                      <div className="cl-payment-detail">
                        <h4 className="cl-detail-title">Claim Line Items</h4>
                        <div className="cl-payment-breakdown">
                          <table className="cl-detail-table">
                            <thead>
                              <tr>
                                <th>Code</th>
                                <th>Service</th>
                                <th>Billed</th>
                                <th>Plan Pays</th>
                                <th>You Pay</th>
                              </tr>
                            </thead>
                            <tbody>
                              {row.details.map((d, j) => (
                                <tr key={j}>
                                  <td className="cl-cell-mono">{d.code}</td>
                                  <td>{d.service}</td>
                                  <td>{d.billed}</td>
                                  <td>{d.planPays}</td>
                                  <td>{d.youPay}</td>
                                </tr>
                              ))}
                              <tr className="cl-detail-totals">
                                <td></td>
                                <td><strong>Total</strong></td>
                                <td><strong>{row.billed}</strong></td>
                                <td><strong>${(row.details.reduce((acc, d) => acc + parseFloat(d.planPays.replace(/[$,]/g, '')), 0)).toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong></td>
                                <td><strong>{row.memberPays}</strong></td>
                              </tr>
                            </tbody>
                          </table>
                          <a href="#" className="cl-eob-link">View Explanation of Benefits (PDF)</a>
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
    </div>
  );
}
