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
  },
  {
    id: 'CLM-301822',
    kind: 'std',
    description: 'Short-Term Disability',
    condition: 'Post-surgical recovery (knee)',
    startDate: 'Feb 10, 2026',
    endDate: 'Apr 06, 2026',
    status: 'Approved',
    lastUpdate: 'Mar 18, 2026',
    weeklyBenefit: '$1,125.00',
    duration: '8 weeks',
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
    link: 'std-claim-detail',
  },
  {
    date: 'Dec 08, 2025',
    claimType: 'CLM-87412',
    member: 'Sarah Johnson',
    provider: 'DDS Dentistry',
    billedAmount: '$64.00',
    memberPays: 'Pending',
    status: 'Pending',
    link: 'std-claim-detail',
  },
  {
    date: 'Aug 15, 2025',
    claimType: 'CLM-76523',
    member: 'Jack Johnson',
    provider: 'Dr. Guy Smith',
    billedAmount: '$145.00',
    memberPays: 'Pending',
    status: 'Pending',
    link: 'ltd-claim-detail',
  },
  {
    date: 'May 02, 2025',
    claimType: 'CLM-65891',
    member: 'Jimmy Johnson',
    provider: 'Dr. Guy Smith',
    billedAmount: '$128.00',
    memberPays: '$46.00',
    status: 'Reprocessed',
    link: 'std-claim-detail',
  },
  {
    date: 'Nov 08, 2024',
    claimType: 'CLM-54302',
    member: 'Sarah Johnson',
    provider: 'Orthodontics United',
    billedAmount: '$324.00',
    memberPays: '$162.00',
    status: 'Processed',
    link: 'ltd-claim-detail',
  },
  {
    date: 'Sep 22, 2024',
    claimType: 'CLM-43217',
    member: 'Jack Johnson',
    provider: 'City Dental Group',
    billedAmount: '$89.00',
    memberPays: '$25.00',
    status: 'Processed',
    link: 'std-claim-detail',
  },
  {
    date: 'Jul 14, 2024',
    claimType: 'CLM-32198',
    member: 'Sarah Johnson',
    provider: 'Dr. Guy Smith',
    billedAmount: '$175.00',
    memberPays: '$52.00',
    status: 'Processed',
    link: 'ltd-claim-detail',
  },
  {
    date: 'Jun 03, 2024',
    claimType: 'CLM-21456',
    member: 'Jimmy Johnson',
    provider: 'DDS Dentistry',
    billedAmount: '$210.00',
    memberPays: '$63.00',
    status: 'Processed',
    link: 'std-claim-detail',
  },
  {
    date: 'Apr 18, 2024',
    claimType: 'CLM-10987',
    member: 'Sarah Johnson',
    provider: 'Smile Care Associates',
    billedAmount: '$412.00',
    memberPays: '$124.00',
    status: 'Processed',
    link: 'std-claim-detail',
  },
  {
    date: 'Feb 05, 2024',
    claimType: 'CLM-09876',
    member: 'Jack Johnson',
    provider: 'Dr. Guy Smith',
    billedAmount: '$98.00',
    memberPays: '$29.00',
    status: 'Processed',
    link: 'std-claim-detail',
  },
];

const categoryTabs = ['Dental', 'Vision', 'Supplemental', 'Leave and Disability', 'Life'];

const INITIAL_VISIBLE = 5;
const LOAD_MORE_COUNT = 5;

export default function ClaimCenterPage() {
  const base = useBasePath();
  const navigate = useNavigate();
  const [pageVersion, setPageVersion] = useState(1);
  const [activeCategory, setActiveCategory] = useState('Dental');
  const [memberFilter, setMemberFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [expandedLeave, setExpandedLeave] = useState(null);

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
          <p className="cl-ml-subtitle">Track and manage your insurance claims.</p>
        </div>
        <div className="cl-ml-header-action">
          <button className="cl-ml-btn-new">Start a New Claim</button>
        </div>
      </div>

      {/* Start a New Claim button (mobile) */}
      <button className="cl-ml-btn-new cl-ml-btn-new--mobile">+ Start a New Claim</button>

      {pageVersion === 1 && (
      <>
      {/* Table Card */}
      <div className="cl-ml-table-card">
        {/* Category tabs (desktop) */}
        <div className="cl-category-tabs">
          {categoryTabs.map((tab) => (
            <button
              key={tab}
              className={`cl-category-tab${tab === activeCategory ? ' cl-category-tab--active' : ''}`}
              onClick={() => { setActiveCategory(tab); if (tab === 'Leave and Disability') setPageVersion(2); }}
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
            onChange={(e) => { setActiveCategory(e.target.value); if (e.target.value === 'Leave and Disability') setPageVersion(2); }}
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
              <tr key={i} className="cl-ml-row">
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
                  <span
                    className="cl-ml-action-link"
                    onClick={() => { if (row.link) navigate(`${base}/${row.link}`); }}
                  >
                    View Details
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ marginLeft: '4px' }}><path d="M1 1l4 4 4-4" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </td>
              </tr>
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
            <span className="cl-ml-action-link" onClick={() => { if (row.link) navigate(`${base}/${row.link}`); }}>View Details ›</span>
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

      {pageVersion === 2 && (
      <div className="cl-ml-table-card">
        {/* Category tabs (desktop) */}
        <div className="cl-category-tabs">
          {categoryTabs.map((tab) => (
            <button
              key={tab}
              className={`cl-category-tab${tab === 'Leave and Disability' ? ' cl-category-tab--active' : ''}`}
              onClick={() => { setActiveCategory(tab); if (tab !== 'Leave and Disability') setPageVersion(1); }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Category dropdown (mobile) */}
        <div className="cl-category-dropdown-mobile">
          <label className="cl-ml-filter-label">CATEGORY</label>
          <select className="cl-ml-filter-select" value="Leave and Disability" onChange={(e) => { setActiveCategory(e.target.value); if (e.target.value !== 'Leave and Disability') setPageVersion(1); }}>
            {categoryTabs.map((tab) => (
              <option key={tab} value={tab}>{tab}</option>
            ))}
          </select>
        </div>

        {/* Leave & Disability table */}
        <table className="cl-ml-table cl-claims-v2-table">
          <thead>
            <tr>
              <th className="cl-ml-th-first">ID</th>
              <th>Type</th>
              <th>Description</th>
              <th>Period</th>
              <th>Status</th>
              <th>Last Update</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveAndDisabilityData.map((claim) => (
              <React.Fragment key={claim.id}>
                <tr className={'cl-ml-row cl-claims-v2-row' + (expandedLeave === claim.id ? ' cl-claims-v2-row--expanded' : '')} onClick={() => { if (claim.kind === 'leave') setExpandedLeave(expandedLeave === claim.id ? null : claim.id); }}>
                  <td className="cl-ml-td-first">
                    <span className="cl-claims-v2-id">{claim.id}</span>
                  </td>
                  <td className="cl-ml-td">
                    <span className={'cl-claims-v2-kind cl-claims-v2-kind--' + claim.kind}>{claim.kind === 'leave' ? 'Leave' : 'STD Claim'}</span>
                  </td>
                  <td className="cl-ml-td">{claim.description}{claim.condition ? ` — ${claim.condition}` : ''}</td>
                  <td className="cl-ml-td">{claim.startDate} – {claim.endDate}</td>
                  <td className="cl-ml-td">
                    <span className={'cl-ml-status-pill cl-ml-status-pill--' + claim.status.toLowerCase().replace(' ', '')}>{claim.status}</span>
                  </td>
                  <td className="cl-ml-td">{claim.lastUpdate}</td>
                  <td className="cl-ml-td">
                    {claim.kind === 'leave' ? (
                      <button className="cl-claims-v2-expand-btn" type="button">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: expandedLeave === claim.id ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {expandedLeave === claim.id ? 'Hide' : 'View'} Details
                      </button>
                    ) : (
                      <button className="cl-claims-v2-expand-btn" type="button" onClick={(e) => { e.stopPropagation(); navigate(`${base}/std-claim-detail`); }}>
                        View Details
                        <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    )}
                  </td>
                </tr>
                {claim.kind === 'leave' && expandedLeave === claim.id && (
                  <tr className="cl-claims-v2-accordion-row">
                    <td colSpan="7">
                      <div className="cl-claims-v2-accordion">
                        <div className="cl-claims-v2-accordion__header">
                          <h4 className="cl-claims-v2-accordion__title">Associated Benefits</h4>
                          <span className="cl-claims-v2-accordion__count">{claim.benefits.length} benefit{claim.benefits.length > 1 ? 's' : ''}</span>
                        </div>
                        <div className="cl-claims-v2-benefits">
                          {claim.benefits.map((b, idx) => (
                            <div key={idx} className="cl-claims-v2-benefit">
                              <div className="cl-claims-v2-benefit__type">{b.type} <span className={'cl-ml-status-pill cl-ml-status-pill--' + b.status.toLowerCase().replace(' ', '')}>{b.status}</span></div>
                              <div className="cl-claims-v2-benefit__details">
                                <span className="cl-claims-v2-benefit__field"><span className="cl-claims-v2-benefit__label">Period</span>{b.startDate} – {b.endDate}</span>
                                <span className="cl-claims-v2-benefit__field"><span className="cl-claims-v2-benefit__label">Duration</span>{b.duration}</span>
                                {b.weeklyBenefit && <span className="cl-claims-v2-benefit__field"><span className="cl-claims-v2-benefit__label">Weekly Benefit</span>{b.weeklyBenefit}</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                        <button className="cl-claims-v2-detail-btn" onClick={(e) => { e.stopPropagation(); navigate(`${base}/case-detail`); }}>
                          View Full Leave Details
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Mobile card view for v2 */}
        <div className="cl-cards-mobile cl-claims-v2-cards">
          {leaveAndDisabilityData.map((claim) => (
            <div key={claim.id} className="cl-card-mobile cl-claims-v2-card">
              <div className="cl-card-mobile-header">
                <span className="cl-claims-v2-id">{claim.id}</span>
                <span className={'cl-ml-status-pill cl-ml-status-pill--' + claim.status.toLowerCase().replace(' ', '')}>{claim.status}</span>
              </div>
              <div className="cl-card-mobile-header" style={{ marginTop: '4px' }}>
                <span className={'cl-claims-v2-kind cl-claims-v2-kind--' + claim.kind}>{claim.kind === 'leave' ? 'Leave' : 'STD Claim'}</span>
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
                {claim.kind === 'std' && (
                  <>
                    <div className="cl-card-mobile-field">
                      <span className="cl-card-mobile-label">Weekly Benefit</span>
                      <span className="cl-card-mobile-value">{claim.weeklyBenefit}</span>
                    </div>
                    <div className="cl-card-mobile-field">
                      <span className="cl-card-mobile-label">Duration</span>
                      <span className="cl-card-mobile-value">{claim.duration}</span>
                    </div>
                  </>
                )}
              </div>
              {claim.kind === 'leave' ? (
                <>
                  <button className="cl-claims-v2-expand-btn" type="button" onClick={() => setExpandedLeave(expandedLeave === claim.id ? null : claim.id)}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: expandedLeave === claim.id ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {expandedLeave === claim.id ? 'Hide' : 'View'} Benefits
                  </button>
                  {expandedLeave === claim.id && (
                    <div className="cl-claims-v2-accordion">
                      <div className="cl-claims-v2-accordion__header">
                        <h4 className="cl-claims-v2-accordion__title">Associated Benefits</h4>
                      </div>
                      <div className="cl-claims-v2-benefits">
                        {claim.benefits.map((b, idx) => (
                          <div key={idx} className="cl-claims-v2-benefit">
                            <div className="cl-claims-v2-benefit__type">{b.type} <span className={'cl-ml-status-pill cl-ml-status-pill--' + b.status.toLowerCase().replace(' ', '')}>{b.status}</span></div>
                            <div className="cl-claims-v2-benefit__details">
                              <span className="cl-claims-v2-benefit__field"><span className="cl-claims-v2-benefit__label">Period</span>{b.startDate} – {b.endDate}</span>
                              <span className="cl-claims-v2-benefit__field"><span className="cl-claims-v2-benefit__label">Duration</span>{b.duration}</span>
                              {b.weeklyBenefit && <span className="cl-claims-v2-benefit__field"><span className="cl-claims-v2-benefit__label">Weekly Benefit</span>{b.weeklyBenefit}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="cl-claims-v2-detail-btn" onClick={() => navigate(`${base}/case-detail`)}>
                        View Full Leave Details
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button className="cl-claims-v2-expand-btn" type="button" onClick={() => navigate(`${base}/std-claim-detail`)}>
                  View Claim Details
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      )}

      {/* Version toggle */}
      <div className="cl-version-toolbar">
        <button className="cl-version-btn" disabled={pageVersion <= 1} onClick={() => setPageVersion(pageVersion - 1)}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span className="cl-version-label">v{pageVersion}</span>
        <button className="cl-version-btn" disabled={pageVersion >= 2} onClick={() => setPageVersion(pageVersion + 1)}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
}
