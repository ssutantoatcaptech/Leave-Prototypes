import React, { useState, useMemo } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import useBasePath from './useBasePath';

const dentalData = [
  {
    date: 'Oct 10, 2026',
    claimNum: 'DNT-2026-04521',
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
    date: 'Sep 5, 2026',
    claimNum: 'DNT-2026-04210',
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
    date: 'Aug 12, 2026',
    claimNum: 'DNT-2026-03987',
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
  const base = useBasePath();
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(-1);
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  const filtered = useMemo(() => {
    return dentalData.filter((row) => {
      if (statusFilter !== 'All' && row.status !== statusFilter) return false;
      if (dateFilter !== 'All') {
        const d = new Date(row.date);
        const now = new Date('2026-10-20');
        const diff = (now - d) / (1000 * 60 * 60 * 24);
        if (dateFilter === 'Last 30 Days' && diff > 30) return false;
        if (dateFilter === 'Last 90 Days' && diff > 90) return false;
        if (dateFilter === 'Last Year' && diff > 365) return false;
      }
      return true;
    });
  }, [statusFilter, dateFilter]);

  return (
    <div className="cl-ml-page" style={{ position: 'relative', overflow: 'clip' }}>
      {/* Background decorative icon */}
      <div className="cl-bg-icon" aria-hidden="true">
        <svg width="388" height="388" viewBox="0 0 388 388" fill="none">
          <rect x="20" y="52" width="348" height="316" rx="32" fill="url(#cal-bg-grad-dn)" opacity="0.45"/>
          <rect x="44" y="120" width="300" height="228" rx="16" fill="white" opacity="0.5"/>
          <rect x="120" y="8" width="28" height="64" rx="14" fill="url(#cal-bg-grad-dn)" opacity="0.45"/>
          <rect x="240" y="8" width="28" height="64" rx="14" fill="url(#cal-bg-grad-dn)" opacity="0.45"/>
          <rect x="80" y="164" width="52" height="44" rx="10" fill="url(#cal-bg-grad-dn)" opacity="0.35"/>
          <rect x="156" y="164" width="52" height="44" rx="10" fill="url(#cal-bg-grad-dn)" opacity="0.35"/>
          <rect x="232" y="164" width="52" height="44" rx="10" fill="url(#cal-bg-grad-dn)" opacity="0.35"/>
          <rect x="80" y="232" width="52" height="44" rx="10" fill="url(#cal-bg-grad-dn)" opacity="0.35"/>
          <rect x="156" y="232" width="52" height="44" rx="10" fill="url(#cal-bg-grad-dn)" opacity="0.35"/>
          <rect x="232" y="232" width="52" height="44" rx="10" fill="url(#cal-bg-grad-dn)" opacity="0.35"/>
          <defs>
            <linearGradient id="cal-bg-grad-dn" x1="0" y1="0" x2="388" y2="388" gradientUnits="userSpaceOnUse">
              <stop stopColor="#105fa8" stopOpacity="0.15"/>
              <stop offset="1" stopColor="#0a9b8c" stopOpacity="0.12"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Breadcrumb */}
      <div className="cl-ml-breadcrumb">
        <Link to={base} className="cl-ml-breadcrumb-link">Claims &amp; Leave</Link>
        <span className="cl-ml-breadcrumb-sep">&gt;</span>
        <span className="cl-ml-breadcrumb-current">Claims Center</span>
      </div>

      {/* Page Header */}
      <div className="cl-ml-header">
        <div className="cl-ml-header-text">
          <h1 className="cl-ml-title">Claims Center</h1>
          <p className="cl-ml-subtitle">Track and manage your dental claims.</p>
        </div>
        <div className="cl-ml-header-action">
          <button className="cl-ml-btn-new">+ Start a New Claim</button>
        </div>
      </div>

      {/* Table Card */}
      <div className="cl-ml-table-card">
        {/* Category tabs */}
        <div className="cl-category-tabs">
          {categoryTabs.map((tab) => (
            <NavLink
              key={tab}
              to={tab === 'Leave and Disability' ? `${base}/claims` : tab === 'Dental' ? `${base}/dental` : '#'}
              className={`cl-category-tab${tab === 'Dental' ? ' cl-category-tab--active' : ''}`}
              onClick={(e) => { if (tab !== 'Leave and Disability' && tab !== 'Dental') e.preventDefault(); }}
            >
              {tab}
            </NavLink>
          ))}
        </div>

        {/* Filter Toolbar */}
        <div className="cl-ml-filters">
          <div className="cl-ml-filter-group">
            <label className="cl-ml-filter-label">STATUS</label>
            <select
              className="cl-ml-filter-select"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setExpandedRow(-1); }}
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="cl-ml-filter-group">
            <label className="cl-ml-filter-label">DATE RANGE</label>
            <select
              className="cl-ml-filter-select"
              value={dateFilter}
              onChange={(e) => { setDateFilter(e.target.value); setExpandedRow(-1); }}
            >
              <option value="All">All Dates</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 90 Days">Last 90 Days</option>
              <option value="Last Year">Last Year</option>
            </select>
          </div>
        </div>

        {/* Dental claims table */}
        <table className="cl-ml-table">
          <thead>
            <tr>
              <th className="cl-ml-th-first">Submission Date</th>
              <th>Claim # &amp; Provider</th>
              <th>Member Name</th>
              <th>Billed Amount</th>
              <th>Member Pays</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '32px 16px', color: '#5d5d5d' }}>No claims match your filters.</td></tr>
            )}
            {filtered.map((row, i) => (
              <React.Fragment key={i}>
                <tr className="cl-ml-row">
                  <td className="cl-ml-td-first">
                    <span style={{ fontSize: '14px', color: '#222' }}>{row.date}</span>
                  </td>
                  <td className="cl-ml-td">
                    <div className="cl-ml-cell-stacked">
                      <span className="cl-ml-cell-type">{row.claimNum}</span>
                      <span className="cl-ml-cell-id">{row.provider}</span>
                    </div>
                  </td>
                  <td className="cl-ml-td">{row.member}</td>
                  <td className="cl-ml-td">{row.billed}</td>
                  <td className="cl-ml-td">{row.memberPays}</td>
                  <td className="cl-ml-td">
                    <span className="cl-ml-status-pill">{row.status}</span>
                  </td>
                  <td className="cl-ml-td">
                    <span
                      className="cl-ml-action-link"
                      onClick={() => setExpandedRow(expandedRow === i ? -1 : i)}
                    >{expandedRow === i ? 'Hide Details' : 'View Details'} ›</span>
                  </td>
                </tr>
                {expandedRow === i && (
                  <tr className="cl-dental-detail-row">
                    <td colSpan="7">
                      <div className="cl-dental-detail-content">
                        <h4 className="cl-dental-detail-title">Claim Line Items</h4>
                        <table className="cl-dental-detail-table">
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
                                <td className="cl-dental-cell-mono">{d.code}</td>
                                <td>{d.service}</td>
                                <td>{d.billed}</td>
                                <td>{d.planPays}</td>
                                <td>{d.youPay}</td>
                              </tr>
                            ))}
                            <tr className="cl-dental-detail-totals">
                              <td></td>
                              <td><strong>Total</strong></td>
                              <td><strong>{row.billed}</strong></td>
                              <td><strong>${(row.details.reduce((acc, d) => acc + parseFloat(d.planPays.replace(/[$,]/g, '')), 0)).toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong></td>
                              <td><strong>{row.memberPays}</strong></td>
                            </tr>
                          </tbody>
                        </table>
                        <a href="#" className="cl-dental-eob-link" onClick={(e) => e.preventDefault()}>View Explanation of Benefits (PDF)</a>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Pagination info */}
        <div className="cl-ml-pagination">
          <p className="cl-ml-pagination-info">
            Showing {filtered.length} of {dentalData.length} claims
          </p>
        </div>
      </div>

      {/* Mobile card view */}
      <div className="cl-cards-mobile">
        {filtered.length === 0 && (
          <div className="cl-card-empty-mobile">No claims match your filters.</div>
        )}
        {filtered.map((row, i) => (
          <div key={i} className="cl-card-mobile">
            <div className="cl-card-mobile-header">
              <span className="cl-card-mobile-primary">{row.claimNum}</span>
              <span className="cl-ml-status-pill">{row.status}</span>
            </div>
            <span className="cl-card-mobile-type">{row.member} — {row.provider}</span>
            <div className="cl-card-mobile-details">
              <div className="cl-card-mobile-field">
                <span className="cl-card-mobile-label">Date</span>
                <span className="cl-card-mobile-value">{row.date}</span>
              </div>
              <div className="cl-card-mobile-field">
                <span className="cl-card-mobile-label">Billed</span>
                <span className="cl-card-mobile-value">{row.billed}</span>
              </div>
              <div className="cl-card-mobile-field">
                <span className="cl-card-mobile-label">You Pay</span>
                <span className="cl-card-mobile-value">{row.memberPays}</span>
              </div>
            </div>
            <button className="cl-card-mobile-action" onClick={() => setExpandedRow(expandedRow === i ? -1 : i)}>
              {expandedRow === i ? 'Hide Details' : 'View Details'}
            </button>
            {expandedRow === i && (
              <div className="cl-card-mobile-expand">
                {row.details.map((d, j) => (
                  <div key={j} className="cl-card-mobile-field">
                    <span className="cl-card-mobile-label">{d.code} — {d.service}</span>
                    <span className="cl-card-mobile-value">{d.youPay}</span>
                  </div>
                ))}
                <div className="cl-card-mobile-field cl-card-mobile-field--total">
                  <span className="cl-card-mobile-label">Total You Pay</span>
                  <span className="cl-card-mobile-value">{row.memberPays}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
