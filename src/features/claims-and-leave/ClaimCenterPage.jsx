import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useBasePath from './useBasePath';

const leaveAndDisabilityData = [
  {
    id: 'NTN-204871',
    kind: 'leave',
    description: 'Birthing Parent (Continuous)',
    startDate: 'Mar 15, 2026',
    endDate: 'Jun 07, 2026',
    status: 'Approved',
    lastUpdate: 'Apr 28, 2026',
    benefits: [
      { type: 'FMLA', status: 'Approved', startDate: 'Mar 15, 2026', endDate: 'Jun 07, 2026', duration: '12 weeks' },
      { type: 'Short-Term Disability (STD)', status: 'Approved', startDate: 'Mar 15, 2026', endDate: 'May 10, 2026', weeklyBenefit: '$1,125.00', duration: '8 weeks' },
      { type: 'Paid Family & Medical Leave (PFML)', status: 'Approved', startDate: 'May 11, 2026', endDate: 'Jun 07, 2026', weeklyBenefit: '$981.00', duration: '4 weeks' },
    ],
    accommodations: [
      { type: 'Ergonomic Workstation', status: 'Active', startDate: 'Jun 08, 2026', endDate: 'Sep 08, 2026', notes: 'Standing desk and ergonomic chair upon return' },
    ],
  },
  {
    id: 'CLM-301822',
    kind: 'std',
    description: 'Short-Term Disability',
    condition: 'Post-surgical recovery (knee)',
    startDate: 'Feb 10, 2026',
    endDate: 'Apr 06, 2026',
    status: 'Closed',
    lastUpdate: 'Apr 08, 2026',
    weeklyBenefit: '$1,125.00',
    duration: '8 weeks',
  },
  {
    id: 'LTD-401822',
    kind: 'ltd',
    description: 'Long-Term Disability',
    condition: 'Post-surgical recovery (knee)',
    startDate: 'Apr 07, 2026',
    endDate: 'Oct 06, 2026',
    status: 'Active',
    lastUpdate: 'Apr 10, 2026',
    weeklyBenefit: '$900.00',
    duration: '26 weeks',
  },
  {
    id: 'NTN-198432',
    kind: 'leave',
    description: 'Own Serious Health Condition (Intermittent)',
    startDate: 'Jan 10, 2026',
    endDate: 'Jul 10, 2026',
    status: 'Approved',
    lastUpdate: 'Mar 12, 2026',
    benefits: [
      { type: 'FMLA', status: 'Approved', startDate: 'Jan 10, 2026', endDate: 'Jul 10, 2026', duration: '480 hours' },
      { type: 'Short-Term Disability (STD)', status: 'Approved', startDate: 'Jan 10, 2026', endDate: 'Jul 10, 2026', weeklyBenefit: '$1,125.00', duration: 'Per episode' },
    ],
  },
  {
    id: 'CLM-289514',
    kind: 'std',
    description: 'Short-Term Disability',
    condition: 'Lower back injury',
    startDate: 'Dec 01, 2025',
    endDate: 'Jan 26, 2026',
    status: 'Closed',
    lastUpdate: 'Feb 02, 2026',
    weeklyBenefit: '$1,125.00',
    duration: '8 weeks',
  },
  {
    id: 'NTN-187205',
    kind: 'leave',
    description: 'Cared for Sick Family (Reduced Hours)',
    startDate: 'Nov 01, 2025',
    endDate: 'Jan 31, 2026',
    status: 'Closed',
    lastUpdate: 'Feb 14, 2026',
    benefits: [
      { type: 'FMLA', status: 'Exhausted', startDate: 'Nov 01, 2025', endDate: 'Jan 31, 2026', duration: '12 weeks' },
      { type: 'Paid Family Leave (PFL)', status: 'Closed', startDate: 'Nov 01, 2025', endDate: 'Dec 15, 2025', weeklyBenefit: '$840.00', duration: '6 weeks' },
    ],
  },
  {
    id: 'NTN-175890',
    kind: 'leave',
    description: 'Non-Birthing Parent (Continuous)',
    startDate: 'Aug 20, 2025',
    endDate: 'Oct 15, 2025',
    status: 'Closed',
    lastUpdate: 'Oct 20, 2025',
    benefits: [
      { type: 'FMLA', status: 'Exhausted', startDate: 'Aug 20, 2025', endDate: 'Oct 15, 2025', duration: '8 weeks' },
      { type: 'Paid Family & Medical Leave (PFML)', status: 'Closed', startDate: 'Aug 20, 2025', endDate: 'Oct 15, 2025', weeklyBenefit: '$981.00', duration: '8 weeks' },
    ],
  },
  {
    id: 'NTN-163201',
    kind: 'leave',
    description: 'Own Serious Health Condition (Continuous)',
    startDate: 'May 05, 2025',
    endDate: 'Jul 18, 2025',
    status: 'Denied',
    lastUpdate: 'May 20, 2025',
    benefits: [
      { type: 'FMLA', status: 'Denied', startDate: 'May 05, 2025', endDate: 'Jul 18, 2025', duration: '10 weeks' },
      { type: 'Long-Term Disability (LTD)', status: 'Denied', startDate: 'May 05, 2025', endDate: 'Jul 18, 2025', weeklyBenefit: '--', duration: '--' },
    ],
  },
  {
    id: 'CLM-254091',
    kind: 'std',
    description: 'Short-Term Disability',
    condition: 'Cardiac event recovery',
    startDate: 'Jun 15, 2025',
    endDate: 'Sep 07, 2025',
    status: 'Closed',
    lastUpdate: 'Sep 12, 2025',
    weeklyBenefit: '$1,125.00',
    duration: '12 weeks',
  },
  {
    id: 'LTD-387201',
    kind: 'ltd',
    description: 'Long-Term Disability',
    condition: 'Degenerative disc disease',
    startDate: 'Jan 15, 2026',
    endDate: 'Ongoing',
    status: 'Active',
    lastUpdate: 'Apr 10, 2026',
    weeklyBenefit: '$900.00',
    duration: 'Ongoing',
  },
  {
    id: 'ADA-110245',
    kind: 'ada',
    description: 'Reduced Schedule',
    condition: 'Chronic migraine management',
    startDate: 'Mar 01, 2026',
    endDate: 'Aug 31, 2026',
    status: 'Active',
    lastUpdate: 'Mar 05, 2026',
    notes: '6-hour workday, flexible start time',
  },
  {
    id: 'NTN-152088',
    kind: 'leave',
    description: 'Military Caregiver Leave (Continuous)',
    startDate: 'Mar 10, 2025',
    endDate: 'May 02, 2025',
    status: 'Closed',
    lastUpdate: 'May 08, 2025',
    benefits: [
      { type: 'FMLA', status: 'Exhausted', startDate: 'Mar 10, 2025', endDate: 'May 02, 2025', duration: '8 weeks' },
    ],
  },
];

const claimsData = [
  {
    date: 'Feb 23, 2026',
    claimType: 'CLM-98234',
    member: 'Sarah Johnson',
    provider: 'Dr. Guy Smith',
    billedAmount: '$250.00',
    memberPays: '$50.00',
    status: 'Processed',
    payments: [
      { service: 'Preventive — Exam', billed: '$95.00', planPaid: '$95.00', youPay: '$0.00' },
      { service: 'Preventive — Cleaning', billed: '$85.00', planPaid: '$85.00', youPay: '$0.00' },
      { service: 'Basic — X-Rays (Bitewing)', billed: '$70.00', planPaid: '$20.00', youPay: '$50.00' },
    ],
  },
  {
    date: 'Dec 08, 2025',
    claimType: 'CLM-87412',
    member: 'Sarah Johnson',
    provider: 'DDS Dentistry',
    billedAmount: '$64.00',
    memberPays: 'Pending',
    status: 'Pending',
    payments: [
      { service: 'Preventive — Fluoride Treatment', billed: '$64.00', planPaid: 'Pending', youPay: 'Pending' },
    ],
  },
  {
    date: 'Aug 15, 2025',
    claimType: 'CLM-76523',
    member: 'Jack Johnson',
    provider: 'Dr. Guy Smith',
    billedAmount: '$145.00',
    memberPays: 'Pending',
    status: 'Pending',
    payments: [
      { service: 'Basic — Filling (Composite)', billed: '$145.00', planPaid: 'Pending', youPay: 'Pending' },
    ],
  },
  {
    date: 'May 02, 2025',
    claimType: 'CLM-65891',
    member: 'Jimmy Johnson',
    provider: 'Dr. Guy Smith',
    billedAmount: '$128.00',
    memberPays: '$46.00',
    status: 'Reprocessed',
    payments: [
      { service: 'Basic — Extraction (Simple)', billed: '$128.00', planPaid: '$82.00', youPay: '$46.00' },
    ],
  },
  {
    date: 'Nov 08, 2024',
    claimType: 'CLM-54302',
    member: 'Sarah Johnson',
    provider: 'Orthodontics United',
    billedAmount: '$324.00',
    memberPays: '$162.00',
    status: 'Processed',
    payments: [
      { service: 'Major — Crown (Porcelain)', billed: '$324.00', planPaid: '$162.00', youPay: '$162.00' },
    ],
  },
  {
    date: 'Sep 22, 2024',
    claimType: 'CLM-43217',
    member: 'Jack Johnson',
    provider: 'City Dental Group',
    billedAmount: '$89.00',
    memberPays: '$25.00',
    status: 'Processed',
    payments: [
      { service: 'Preventive — Sealant (per tooth)', billed: '$89.00', planPaid: '$64.00', youPay: '$25.00' },
    ],
  },
  {
    date: 'Jul 14, 2024',
    claimType: 'CLM-32198',
    member: 'Sarah Johnson',
    provider: 'Dr. Guy Smith',
    billedAmount: '$175.00',
    memberPays: '$52.00',
    status: 'Processed',
    payments: [
      { service: 'Basic — Root Planing (per quadrant)', billed: '$175.00', planPaid: '$123.00', youPay: '$52.00' },
    ],
  },
  {
    date: 'Jun 03, 2024',
    claimType: 'CLM-21456',
    member: 'Jimmy Johnson',
    provider: 'DDS Dentistry',
    billedAmount: '$210.00',
    memberPays: '$63.00',
    status: 'Processed',
    payments: [
      { service: 'Basic — Filling (Amalgam)', billed: '$110.00', planPaid: '$77.00', youPay: '$33.00' },
      { service: 'Preventive — X-Rays (Panoramic)', billed: '$100.00', planPaid: '$70.00', youPay: '$30.00' },
    ],
  },
  {
    date: 'Apr 18, 2024',
    claimType: 'CLM-10987',
    member: 'Sarah Johnson',
    provider: 'Smile Care Associates',
    billedAmount: '$412.00',
    memberPays: '$124.00',
    status: 'Processed',
    payments: [
      { service: 'Major — Bridge (3-unit)', billed: '$412.00', planPaid: '$288.00', youPay: '$124.00' },
    ],
  },
  {
    date: 'Feb 05, 2024',
    claimType: 'CLM-09876',
    member: 'Jack Johnson',
    provider: 'Dr. Guy Smith',
    billedAmount: '$98.00',
    memberPays: '$29.00',
    status: 'Processed',
    payments: [
      { service: 'Preventive — Exam', billed: '$55.00', planPaid: '$55.00', youPay: '$0.00' },
      { service: 'Preventive — X-Rays (Bitewing)', billed: '$43.00', planPaid: '$14.00', youPay: '$29.00' },
    ],
  },
];

const categoryTabs = ['Dental', 'Vision', 'Supplemental', 'Leave and Disability', 'Life'];

const INITIAL_VISIBLE = 5;
const LOAD_MORE_COUNT = 5;

export default function ClaimCenterPage() {
  const base = useBasePath();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Leave and Disability');
  const [memberFilter, setMemberFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [expandedDentalRow, setExpandedDentalRow] = useState(null);
  const [expandedLeaveRow, setExpandedLeaveRow] = useState(null);
  const [v2SortCol, setV2SortCol] = useState('period');
  const [v2SortAsc, setV2SortAsc] = useState(false);
  const [v2Page, setV2Page] = useState(0);
  const V2_PAGE_SIZE = 10;

  const handleV2Sort = (col) => {
    if (v2SortCol === col) { setV2SortAsc(!v2SortAsc); }
    else { setV2SortCol(col); setV2SortAsc(false); }
    setV2Page(0);
  };

  const sortedLeaveData = useMemo(() => {
    return [...leaveAndDisabilityData].sort((a, b) => {
      let cmp = 0;
      if (v2SortCol === 'id') cmp = a.id.localeCompare(b.id);
      else if (v2SortCol === 'type') cmp = a.kind.localeCompare(b.kind);
      else if (v2SortCol === 'description') cmp = (a.description + (a.condition || '')).localeCompare(b.description + (b.condition || ''));
      else if (v2SortCol === 'period') cmp = new Date(a.startDate) - new Date(b.startDate);
      else if (v2SortCol === 'status') cmp = a.status.localeCompare(b.status);
      else if (v2SortCol === 'lastUpdate') cmp = new Date(a.lastUpdate) - new Date(b.lastUpdate);
      return v2SortAsc ? cmp : -cmp;
    });
  }, [v2SortCol, v2SortAsc]);

  const v2PageData = sortedLeaveData.slice(v2Page * V2_PAGE_SIZE, (v2Page + 1) * V2_PAGE_SIZE);
  const v2TotalPages = Math.ceil(sortedLeaveData.length / V2_PAGE_SIZE);

  const filtered = useMemo(() => {
    return claimsData.filter((row) => {
      if (memberFilter !== 'All' && row.member !== memberFilter) return false;
      if (dateFilter !== 'All') {
        const d = new Date(row.date);
        const now = new Date('2026-03-01');
        const diff = (now - d) / (1000 * 60 * 60 * 24);
        if (dateFilter === 'Last 30 Days' && diff > 30) return false;
        if (dateFilter === 'Last 90 Days' && diff > 90) return false;
        if (dateFilter === 'Last Year' && diff > 365) return false;
      }
      return true;
    });
  }, [memberFilter, dateFilter]);

  const visibleItems = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="cl-page cl-ml-page" style={{ position: 'relative', overflow: 'clip' }}>
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
          <p className="cl-ml-subtitle">Manage your insurance claims, leave cases, and disability benefits.</p>
        </div>
        <div className="cl-ml-header-action">
          <button className="cl-ml-btn-new">Start a New Claim</button>
        </div>
      </div>

      {/* Start a New Claim button (mobile) */}
      <button className="cl-ml-btn-new cl-ml-btn-new--mobile">+ Start a New Claim</button>

      {activeCategory !== 'Leave and Disability' && (
      <>
      {/* Table Card */}
      <div className="cl-ml-table-card">
        {/* Category tabs (desktop) */}
        <div className="cl-category-tabs">
          {categoryTabs.map((tab) => (
            <button
              key={tab}
              className={`cl-category-tab${tab === activeCategory ? ' cl-category-tab--active' : ''}`}
              onClick={() => setActiveCategory(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Category dropdown (mobile) */}
        <div className="cl-category-dropdown-mobile">
          <label className="cl-ml-filter-label">CATEGORY</label>
          <select
            className="cl-ml-filter-select"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            {categoryTabs.map((tab) => (
              <option key={tab} value={tab}>{tab}</option>
            ))}
          </select>
        </div>

        {/* Filter Toolbar */}
        <div className="cl-ml-filters">
          <div className="cl-ml-filter-group">
            <label className="cl-ml-filter-label">Select Member</label>
            <select
              className="cl-ml-filter-select"
              value={memberFilter}
              onChange={(e) => { setMemberFilter(e.target.value); }}
            >
              <option value="All">All Members</option>
              <option value="Sarah Johnson">Sarah Johnson</option>
              <option value="Jack Johnson">Jack Johnson</option>
              <option value="Jimmy Johnson">Jimmy Johnson</option>
            </select>
          </div>
          <div className="cl-ml-filter-group">
            <label className="cl-ml-filter-label">Date Range</label>
            <select
              className="cl-ml-filter-select"
              value={dateFilter}
              onChange={(e) => { setDateFilter(e.target.value); }}
            >
              <option value="All">All</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 90 Days">Last 90 Days</option>
              <option value="Last Year">Last Year</option>
            </select>
          </div>
          <div className="cl-ml-filter-group cl-ml-filter-group--export">
            <button className="cl-ml-btn-export">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 10v3a1 1 0 001 1h10a1 1 0 001-1v-3M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Export History (CSV)
            </button>
          </div>
        </div>

        {/* Claims table */}
        <table className="cl-ml-table">
          <thead>
            <tr>
              <th className="cl-ml-th-first">
                <span className="cl-ml-th-sortable">
                  Date
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </th>
              <th>Claim Type</th>
              <th>Member Name</th>
              <th>Provider</th>
              <th>Billed Amount</th>
              <th>Member Pays</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan="8" style={{ textAlign: 'center', padding: '32px 16px', color: '#5d5d5d' }}>No claims match your filters.</td></tr>
            )}
            {visibleItems.map((row, i) => (
              <React.Fragment key={i}>
              <tr className={'cl-ml-row' + (expandedDentalRow === i ? ' cl-ml-row--expanded' : '')} onClick={() => setExpandedDentalRow(expandedDentalRow === i ? null : i)} style={{ cursor: 'pointer' }}>
                <td className="cl-ml-td-first">
                  <span style={{ fontSize: '14px', color: '#222' }}>{row.date}</span>
                </td>
                <td className="cl-ml-td">{row.claimType}</td>
                <td className="cl-ml-td">{row.member}</td>
                <td className="cl-ml-td">{row.provider}</td>
                <td className="cl-ml-td">{row.billedAmount}</td>
                <td className="cl-ml-td">{row.memberPays}</td>
                <td className="cl-ml-td">
                  <span className="cl-ml-status-pill">{row.status}</span>
                </td>
                <td className="cl-ml-td">
                  <span className="cl-ml-action-link">
                    View Details
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ marginLeft: '4px', transform: expandedDentalRow === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}><path d="M1 1l4 4 4-4" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </td>
              </tr>
              {expandedDentalRow === i && (
                <tr className="cl-dental-accordion-row">
                  <td colSpan="8" className="cl-dental-accordion-cell">
                    <div className="cl-dental-accordion-content">
                      <h4 className="cl-dental-accordion-title">Payment Breakdown</h4>
                      <table className="cl-dental-payments-table">
                        <thead>
                          <tr>
                            <th>Service</th>
                            <th>Billed</th>
                            <th>Plan Paid</th>
                            <th>You Pay</th>
                          </tr>
                        </thead>
                        <tbody>
                          {row.payments.map((p, pi) => (
                            <tr key={pi}>
                              <td>{p.service}</td>
                              <td>{p.billed}</td>
                              <td>{p.planPaid}</td>
                              <td>{p.youPay}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Load More */}
        {hasMore && (
          <div className="cl-ml-load-more">
            <button className="cl-ml-load-more-btn" onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}>
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Mobile card view */}
      <div className="cl-cards-mobile">
        {filtered.length === 0 && (
          <div className="cl-card-empty-mobile">No claims match your filters.</div>
        )}
        {visibleItems.map((row, i) => (
          <div key={i} className="cl-card-mobile">
            <div className="cl-card-mobile-header">
              <span className="cl-card-mobile-primary">{row.claimType}</span>
              <span className="cl-ml-status-pill">{row.status}</span>
            </div>
            <span className="cl-card-mobile-type">{row.provider}</span>
            <div className="cl-card-mobile-details">
              <div className="cl-card-mobile-field">
                <span className="cl-card-mobile-label">Member</span>
                <span className="cl-card-mobile-value">{row.member}</span>
              </div>
              <div className="cl-card-mobile-field">
                <span className="cl-card-mobile-label">Date</span>
                <span className="cl-card-mobile-value">{row.date}</span>
              </div>
              <div className="cl-card-mobile-field">
                <span className="cl-card-mobile-label">Billed</span>
                <span className="cl-card-mobile-value">{row.billedAmount}</span>
              </div>
              <div className="cl-card-mobile-field">
                <span className="cl-card-mobile-label">Member Pays</span>
                <span className="cl-card-mobile-value">{row.memberPays}</span>
              </div>
            </div>
            <span className="cl-ml-action-link" onClick={() => setExpandedDentalRow(expandedDentalRow === i ? null : i)}>
              View Details
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ marginLeft: '4px', transform: expandedDentalRow === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}><path d="M1 1l4 4 4-4" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            {expandedDentalRow === i && (
              <div className="cl-dental-accordion-content" style={{ marginTop: 12 }}>
                <h4 className="cl-dental-accordion-title">Payment Breakdown</h4>
                <table className="cl-dental-payments-table">
                  <thead>
                    <tr><th>Service</th><th>Billed</th><th>Plan Paid</th><th>You Pay</th></tr>
                  </thead>
                  <tbody>
                    {row.payments.map((p, pi) => (
                      <tr key={pi}><td>{p.service}</td><td>{p.billed}</td><td>{p.planPaid}</td><td>{p.youPay}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
        {hasMore && (
          <div className="cl-ml-load-more">
            <button className="cl-ml-load-more-btn" onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}>
              Load More
            </button>
          </div>
        )}
      </div>
      </>
      )}

      {activeCategory === 'Leave and Disability' && (
      <>
      <div className="cl-ml-table-card">
        {/* Category tabs (desktop) */}
        <div className="cl-category-tabs">
          {categoryTabs.map((tab) => (
            <button
              key={tab}
              className={`cl-category-tab${tab === 'Leave and Disability' ? ' cl-category-tab--active' : ''}`}
              onClick={() => setActiveCategory(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Category dropdown (mobile) */}
        <div className="cl-category-dropdown-mobile">
          <label className="cl-ml-filter-label">CATEGORY</label>
          <select className="cl-ml-filter-select" value="Leave and Disability" onChange={(e) => setActiveCategory(e.target.value)}>
            {categoryTabs.map((tab) => (
              <option key={tab} value={tab}>{tab}</option>
            ))}
          </select>
        </div>

        {/* Leave & Disability table */}
        <table className="cl-ml-table cl-claims-v2-table">
          <thead>
            <tr>
              {[{col:'id',label:'ID'},{col:'type',label:'Type'},{col:'description',label:'Description'},{col:'period',label:'Period'},{col:'status',label:'Status'},{col:'lastUpdate',label:'Last Update'}].map(({col,label}) => (
                <th key={col} className={col === 'id' ? 'cl-ml-th-first cl-v2-th-sort' : 'cl-v2-th-sort'} onClick={() => handleV2Sort(col)} style={{ cursor: 'pointer' }}>
                  <span className="cl-ml-th-sortable">
                    {label}
                    {v2SortCol === col && <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ marginLeft: 4, transform: v2SortAsc ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}><path d="M1 1l4 4 4-4" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </span>
                </th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {v2PageData.map((claim) => {
              const isExpanded = expandedLeaveRow === claim.id;
              return (
              <React.Fragment key={claim.id}>
              <tr className={'cl-ml-row cl-claims-v2-row' + (isExpanded ? ' cl-ml-row--expanded' : '')} onClick={() => setExpandedLeaveRow(isExpanded ? null : claim.id)} style={{ cursor: 'pointer' }}>
                <td className="cl-ml-td-first">
                  <span className="cl-claims-v2-id">{claim.id}</span>
                </td>
                <td className="cl-ml-td">
                  <span className={'cl-claims-v2-kind cl-claims-v2-kind--' + claim.kind}>{claim.kind === 'leave' ? 'Leave' : claim.kind === 'ada' ? 'ADA' : claim.kind === 'ltd' ? 'LTD Claim' : 'STD Claim'}</span>
                  {claim.kind === 'leave' && claim.accommodations && claim.accommodations.length > 0 && (
                    <span className="cl-claims-v2-kind cl-claims-v2-kind--ada" style={{ marginLeft: 4 }}>ADA</span>
                  )}
                </td>
                <td className="cl-ml-td">{claim.description}{claim.condition ? ` — ${claim.condition}` : ''}</td>
                <td className="cl-ml-td">{claim.startDate} – {claim.endDate}</td>
                <td className="cl-ml-td">
                  <span className={'cl-ml-status-pill cl-ml-status-pill--' + claim.status.toLowerCase().replace(' ', '')}>{claim.status}</span>
                </td>
                <td className="cl-ml-td">{claim.lastUpdate}</td>
                <td className="cl-ml-td">
                  <span className="cl-ml-action-link">
                    View Details
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ marginLeft: '4px', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}><path d="M1 1l4 4 4-4" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </td>
              </tr>
              {isExpanded && (
                <tr className="cl-dental-accordion-row">
                  <td colSpan="7" className="cl-dental-accordion-cell">
                    <div className="cl-dental-accordion-content">
                      <div className="cl-v2-accordion-card">
                        {claim.kind === 'leave' && claim.benefits && (
                          <>
                          <h4 className="cl-dental-accordion-title">Benefits</h4>
                          <table className="cl-dental-payments-table">
                            <thead>
                              <tr><th>Benefit Type</th><th>Status</th><th>Period</th><th>Duration</th><th>Weekly Benefit</th></tr>
                            </thead>
                            <tbody>
                              {claim.benefits.map((b, bi) => (
                                <tr key={bi}>
                                  <td>{b.type}</td>
                                  <td>{b.status}</td>
                                  <td>{b.startDate} – {b.endDate}</td>
                                  <td>{b.duration}</td>
                                  <td>{b.weeklyBenefit || '—'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          </>
                        )}
                        {claim.kind === 'leave' && claim.accommodations && claim.accommodations.length > 0 && (
                          <div style={{ marginTop: 12 }}>
                            <h4 className="cl-dental-accordion-title">ADA Accommodation</h4>
                            {claim.accommodations.map((a, ai) => (
                              <div key={ai} className="cl-v2-accordion-detail-row">
                                <span><strong>{a.type}</strong> — {a.notes}</span>
                                <span className="cl-v2-accordion-meta">{a.startDate} – {a.endDate} · {a.status}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {(claim.kind === 'std' || claim.kind === 'ltd') && (
                          <>
                          <h4 className="cl-dental-accordion-title">{claim.kind === 'std' ? 'Short-Term' : 'Long-Term'} Disability Details</h4>
                          <div className="cl-v2-accordion-detail-grid">
                            <div className="cl-v2-accordion-detail-item"><span className="cl-v2-accordion-label">Condition</span><span>{claim.condition}</span></div>
                            <div className="cl-v2-accordion-detail-item"><span className="cl-v2-accordion-label">Weekly Benefit</span><span>{claim.weeklyBenefit}</span></div>
                            <div className="cl-v2-accordion-detail-item"><span className="cl-v2-accordion-label">Duration</span><span>{claim.duration}</span></div>
                            <div className="cl-v2-accordion-detail-item"><span className="cl-v2-accordion-label">Period</span><span>{claim.startDate} – {claim.endDate}</span></div>
                          </div>
                          </>
                        )}
                        {claim.kind === 'ada' && (
                          <>
                          <h4 className="cl-dental-accordion-title">ADA Accommodation Details</h4>
                          <div className="cl-v2-accordion-detail-grid">
                            <div className="cl-v2-accordion-detail-item"><span className="cl-v2-accordion-label">Condition</span><span>{claim.condition}</span></div>
                            <div className="cl-v2-accordion-detail-item"><span className="cl-v2-accordion-label">Accommodation</span><span>{claim.notes}</span></div>
                            <div className="cl-v2-accordion-detail-item"><span className="cl-v2-accordion-label">Period</span><span>{claim.startDate} – {claim.endDate}</span></div>
                          </div>
                          </>
                        )}
                        <div className="cl-v2-accordion-actions">
                          {claim.kind === 'leave' && (
                            <button className="cl-v2-accordion-btn" type="button" onClick={(e) => { e.stopPropagation(); navigate(`${base}/case-detail`); }}>
                              View Leave Details
                              <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                          )}
                          {(claim.kind === 'std' || claim.kind === 'ltd') && (
                            <button className="cl-v2-accordion-btn" type="button" onClick={(e) => { e.stopPropagation(); navigate(`${base}/${claim.kind === 'ltd' ? 'ltd-claim-detail' : 'std-claim-detail'}`); }}>
                              View Claim Details
                              <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                          )}
                          {claim.kind === 'ada' && (
                            <button className="cl-v2-accordion-btn cl-v2-accordion-btn--edit" type="button" onClick={(e) => e.stopPropagation()}>
                              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M10.5 1.5l2 2-8 8H2.5v-2l8-8z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              Edit Accommodation
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              </React.Fragment>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        {v2TotalPages > 1 && (
          <div className="cl-v2-pagination">
            <span className="cl-v2-pagination-info">Showing <strong>{v2Page * V2_PAGE_SIZE + 1}-{Math.min((v2Page + 1) * V2_PAGE_SIZE, sortedLeaveData.length)}</strong> of <strong>{sortedLeaveData.length}</strong> results</span>
            <div className="cl-v2-pagination-nav">
              <button type="button" className="cl-v2-page-btn cl-v2-page-arrow" disabled={v2Page <= 0} onClick={() => setV2Page(v2Page - 1)}>
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {Array.from({ length: v2TotalPages }, (_, i) => (
                <button key={i} type="button" className={'cl-v2-page-btn' + (v2Page === i ? ' active' : '')} onClick={() => setV2Page(i)}>
                  {i + 1}
                </button>
              ))}
              <button type="button" className="cl-v2-page-btn cl-v2-page-arrow" disabled={v2Page >= v2TotalPages - 1} onClick={() => setV2Page(v2Page + 1)}>
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        )}

        {/* Mobile card view for v2 */}
        <div className="cl-cards-mobile cl-claims-v2-cards">
          {v2PageData.map((claim) => {
            const isExpanded = expandedLeaveRow === claim.id;
            return (
            <div key={claim.id} className="cl-card-mobile cl-claims-v2-card">
              <div className="cl-card-mobile-header">
                <span className="cl-claims-v2-id">{claim.id}</span>
                <span className={'cl-ml-status-pill cl-ml-status-pill--' + claim.status.toLowerCase().replace(' ', '')}>{claim.status}</span>
              </div>
              <div className="cl-card-mobile-header" style={{ marginTop: '4px' }}>
                <span className={'cl-claims-v2-kind cl-claims-v2-kind--' + claim.kind}>{claim.kind === 'leave' ? 'Leave' : claim.kind === 'ada' ? 'ADA' : claim.kind === 'ltd' ? 'LTD Claim' : 'STD Claim'}</span>
                {claim.kind === 'leave' && claim.accommodations && claim.accommodations.length > 0 && (
                  <span className="cl-claims-v2-kind cl-claims-v2-kind--ada" style={{ marginLeft: 4 }}>ADA</span>
                )}
              </div>
              <span className="cl-card-mobile-type">{claim.description}{claim.condition ? ` — ${claim.condition}` : ''}</span>
              <div className="cl-card-mobile-details">
                <div className="cl-card-mobile-field">
                  <span className="cl-card-mobile-label">Period</span>
                  <span className="cl-card-mobile-value">{claim.startDate} – {claim.endDate}</span>
                </div>
                <div className="cl-card-mobile-field">
                  <span className="cl-card-mobile-label">Last Update</span>
                  <span className="cl-card-mobile-value">{claim.lastUpdate}</span>
                </div>
              </div>
              <span className="cl-ml-action-link" onClick={() => setExpandedLeaveRow(isExpanded ? null : claim.id)}>
                View Details
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ marginLeft: '4px', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}><path d="M1 1l4 4 4-4" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              {isExpanded && (
                <div className="cl-dental-accordion-content" style={{ marginTop: 12 }}>
                  <div className="cl-v2-accordion-card">
                    {claim.kind === 'leave' && claim.benefits && (
                      <>
                      <h4 className="cl-dental-accordion-title">Benefits</h4>
                      <table className="cl-dental-payments-table">
                        <thead><tr><th>Type</th><th>Status</th><th>Duration</th><th>Weekly</th></tr></thead>
                        <tbody>
                          {claim.benefits.map((b, bi) => (
                            <tr key={bi}><td>{b.type}</td><td>{b.status}</td><td>{b.duration}</td><td>{b.weeklyBenefit || '—'}</td></tr>
                          ))}
                        </tbody>
                      </table>
                      </>
                    )}
                    {claim.kind === 'leave' && claim.accommodations && claim.accommodations.length > 0 && (
                      <div style={{ marginTop: 10 }}>
                        <h4 className="cl-dental-accordion-title">ADA Accommodation</h4>
                        {claim.accommodations.map((a, ai) => (
                          <div key={ai} className="cl-v2-accordion-detail-row">
                            <span><strong>{a.type}</strong> — {a.notes}</span>
                            <span className="cl-v2-accordion-meta">{a.startDate} – {a.endDate}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {(claim.kind === 'std' || claim.kind === 'ltd') && (
                      <div className="cl-v2-accordion-detail-grid">
                        <div className="cl-v2-accordion-detail-item"><span className="cl-v2-accordion-label">Condition</span><span>{claim.condition}</span></div>
                        <div className="cl-v2-accordion-detail-item"><span className="cl-v2-accordion-label">Weekly Benefit</span><span>{claim.weeklyBenefit}</span></div>
                        <div className="cl-v2-accordion-detail-item"><span className="cl-v2-accordion-label">Duration</span><span>{claim.duration}</span></div>
                      </div>
                    )}
                    {claim.kind === 'ada' && (
                      <div className="cl-v2-accordion-detail-grid">
                        <div className="cl-v2-accordion-detail-item"><span className="cl-v2-accordion-label">Condition</span><span>{claim.condition}</span></div>
                        <div className="cl-v2-accordion-detail-item"><span className="cl-v2-accordion-label">Accommodation</span><span>{claim.notes}</span></div>
                      </div>
                    )}
                    <div className="cl-v2-accordion-actions">
                      {claim.kind === 'leave' && (
                        <button className="cl-v2-accordion-btn" type="button" onClick={() => navigate(`${base}/case-detail`)}>
                          View Leave Details
                          <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      )}
                      {(claim.kind === 'std' || claim.kind === 'ltd') && (
                        <button className="cl-v2-accordion-btn" type="button" onClick={() => navigate(`${base}/${claim.kind === 'ltd' ? 'ltd-claim-detail' : 'std-claim-detail'}`)}>
                          View Claim Details
                          <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      )}
                      {claim.kind === 'ada' && (
                        <button className="cl-v2-accordion-btn cl-v2-accordion-btn--edit" type="button">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M10.5 1.5l2 2-8 8H2.5v-2l8-8z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          Edit Accommodation
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            );
          })}
        </div>

      </div>

      {/* Legend — outside table card */}
      <div className="cl-claims-v2-legend">
        <div className="cl-claims-v2-legend__item">
          <span className="cl-claims-v2-kind cl-claims-v2-kind--leave">Leave</span>
          <span className="cl-claims-v2-legend__desc">Fully managed by us — leave approval, benefits, and payments</span>
        </div>
        <div className="cl-claims-v2-legend__item">
          <span className="cl-claims-v2-kind cl-claims-v2-kind--std">STD Claim</span>
          <span className="cl-claims-v2-legend__desc">Payments and documents only — leave managed by your employer</span>
        </div>
        <div className="cl-claims-v2-legend__item">
          <span className="cl-claims-v2-kind cl-claims-v2-kind--ltd">LTD Claim</span>
          <span className="cl-claims-v2-legend__desc">Long-term disability — often follows an STD claim</span>
        </div>
        <div className="cl-claims-v2-legend__item">
          <span className="cl-claims-v2-kind cl-claims-v2-kind--ada">ADA</span>
          <span className="cl-claims-v2-legend__desc">Workplace accommodation — may be linked to a leave or standalone</span>
        </div>
      </div>
      </>
      )}

    </div>
  );
}
