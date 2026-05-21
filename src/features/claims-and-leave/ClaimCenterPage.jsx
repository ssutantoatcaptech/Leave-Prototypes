import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useBasePath from './useBasePath';

const leaveAndDisabilityData = [
  {
    id: 'NTN-210455',
    kind: 'leave',
    description: 'Pregnancy, Birth & Bonding (Continuous)',
    startDate: 'Jun 02, 2026',
    endDate: 'Sep 22, 2026',
    status: 'Pending',
    lastUpdate: 'May 16, 2026',
    benefits: [
      { type: 'FMLA', status: 'Pending', startDate: 'Jun 02, 2026', endDate: 'Sep 22, 2026', duration: '12 weeks' },
      { type: 'Short-Term Disability (STD)', status: 'Pending', startDate: 'Jun 02, 2026', endDate: 'Jul 28, 2026', weeklyBenefit: 'TBD', duration: '8 weeks' },
      { type: 'Paid Family & Medical Leave (PFML)', status: 'Pending', startDate: 'Jul 29, 2026', endDate: 'Sep 22, 2026', weeklyBenefit: 'TBD', duration: '8 weeks' },
    ],
    accommodations: [],
  },
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

const paymentsData = {
  'CLM-301822': [
    { date: 'Feb 21, 2026', period: 'Feb 21 - Feb 27', gross: '$1,456.00', deductions: '$212.00', net: '$1,244.00', status: 'Processed' },
    { date: 'Mar 5, 2026', period: 'Feb 28 - Mar 6', gross: '$1,456.00', deductions: '$212.00', net: '$1,244.00', status: 'Processed' },
    { date: 'Mar 19, 2026', period: 'Mar 7 - Mar 20', gross: '$1,456.00', deductions: '$212.00', net: '$1,244.00', status: 'Processed' },
    { date: 'Apr 2, 2026', period: 'Mar 21 - Apr 3', gross: '$1,456.00', deductions: '$212.00', net: '$1,244.00', status: 'Processed' },
  ],
  'NTN-210455': [
    { date: 'Jun 13, 2026', period: 'Jun 02 - Jun 13', gross: '$1,312.00', deductions: '$198.00', net: '$1,114.00', status: 'Scheduled' },
    { date: 'Jun 27, 2026', period: 'Jun 14 - Jun 27', gross: '$1,312.00', deductions: '$198.00', net: '$1,114.00', status: 'Scheduled' },
  ],
  'NTN-204871': [
    { date: 'Mar 28, 2026', period: 'Mar 15 - Mar 28', gross: '$1,125.00', deductions: '$168.00', net: '$957.00', status: 'Processed' },
    { date: 'Apr 11, 2026', period: 'Mar 29 - Apr 11', gross: '$1,125.00', deductions: '$168.00', net: '$957.00', status: 'Processed' },
    { date: 'Apr 25, 2026', period: 'Apr 12 - Apr 25', gross: '$1,125.00', deductions: '$168.00', net: '$957.00', status: 'Processed' },
    { date: 'May 9, 2026', period: 'Apr 26 - May 9', gross: '$1,125.00', deductions: '$168.00', net: '$957.00', status: 'Processed' },
    { date: 'May 23, 2026', period: 'May 10 - May 23', gross: '$981.00', deductions: '$147.00', net: '$834.00', status: 'Processed' },
  ],
};

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
      { code: 'D0120', service: 'Periodic Oral Evaluation (Established) Patient', billed: '$100.00', planPaid: '$100.00', youPay: '$0.00' },
      { code: 'D1110', service: 'Routine Cleaning', billed: '$100.00', planPaid: '$100.00', youPay: '$0.00' },
      { code: 'D0274', service: 'X-Rays', billed: '$50.00', planPaid: '$0.00', youPay: '$50.00' },
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
      { code: 'D1208', service: 'Fluoride Treatment', billed: '$64.00', planPaid: 'Pending', youPay: 'Pending' },
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
      { code: 'D2391', service: 'Filling (Composite)', billed: '$145.00', planPaid: 'Pending', youPay: 'Pending' },
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
      { code: 'D7140', service: 'Extraction (Simple)', billed: '$128.00', planPaid: '$82.00', youPay: '$46.00' },
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
      { code: 'D2740', service: 'Crown (Porcelain)', billed: '$324.00', planPaid: '$162.00', youPay: '$162.00' },
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
      { code: 'D1351', service: 'Sealant (per tooth)', billed: '$89.00', planPaid: '$64.00', youPay: '$25.00' },
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
      { code: 'D4341', service: 'Root Planing (per quadrant)', billed: '$175.00', planPaid: '$123.00', youPay: '$52.00' },
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
      { code: 'D2140', service: 'Filling (Amalgam)', billed: '$110.00', planPaid: '$77.00', youPay: '$33.00' },
      { code: 'D0330', service: 'X-Rays (Panoramic)', billed: '$100.00', planPaid: '$70.00', youPay: '$30.00' },
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
      { code: 'D6740', service: 'Bridge (3-unit)', billed: '$412.00', planPaid: '$288.00', youPay: '$124.00' },
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
      { code: 'D0120', service: 'Periodic Oral Evaluation', billed: '$55.00', planPaid: '$55.00', youPay: '$0.00' },
      { code: 'D0272', service: 'X-Rays (Bitewing)', billed: '$43.00', planPaid: '$14.00', youPay: '$29.00' },
    ],
  },
];

const categoryTabs = ['Dental', 'Vision', 'Supplemental', 'Leave and Disability', 'Life'];

const DENTAL_PAGE_SIZE = 10;
const LEAVE_PAGE_SIZE = 10;

function getClaimTypeLabel(kind) {
  switch (kind) {
    case 'std': return 'Short Term Disability';
    case 'ltd': return 'Long Term Disability';
    case 'leave': return 'Leave';
    case 'ada': return 'ADA Accommodation';
    default: return kind;
  }
}

function truncateText(text, maxLen = 30) {
  if (!text) return '';
  if (text.length <= maxLen) return text;
  return text.substring(0, maxLen) + '...';
}

function PaginationNumbered({ currentPage, totalPages, onPageChange, totalItems, pageSize }) {
  const startItem = currentPage * pageSize + 1;
  const endItem = Math.min((currentPage + 1) * pageSize, totalItems);

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(0);
      if (currentPage > 2) {
        pages.push('ellipsis-start');
      }
      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPages - 2, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 3) {
        pages.push('ellipsis-end');
      }
      if (!pages.includes(totalPages - 1)) {
        pages.push(totalPages - 1);
      }
    }
    return pages;
  };

  return (
    <>
      <div className="cl-pagination-numbered">
        <button
          className="cl-page-num cl-page-num--arrow"
          disabled={currentPage <= 0}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        {renderPageNumbers().map((page, idx) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return <span key={page} className="cl-page-num cl-page-num--ellipsis">...</span>;
          }
          return (
            <button
              key={idx}
              className={`cl-page-num${currentPage === page ? ' cl-page-num--active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page + 1}
            </button>
          );
        })}
        <button
          className="cl-page-num cl-page-num--arrow"
          disabled={currentPage >= totalPages - 1}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      <div className="cl-pagination-info">
        Showing {startItem} to {endItem} of {totalItems} entries
      </div>
    </>
  );
}

export default function ClaimCenterPage() {
  const base = useBasePath();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Leave and Disability');
  const [memberFilter, setMemberFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [dentalPage, setDentalPage] = useState(0);
  const [expandedDentalRow, setExpandedDentalRow] = useState(null);
  const [expandedLeaveRow, setExpandedLeaveRow] = useState(null);
  const [v2SortCol, setV2SortCol] = useState('period');
  const [v2SortAsc, setV2SortAsc] = useState(false);
  const [v2Page, setV2Page] = useState(0);

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

  const v2PageData = sortedLeaveData.slice(v2Page * LEAVE_PAGE_SIZE, (v2Page + 1) * LEAVE_PAGE_SIZE);
  const v2TotalPages = Math.ceil(sortedLeaveData.length / LEAVE_PAGE_SIZE);

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

  const dentalTotalPages = Math.ceil(filtered.length / DENTAL_PAGE_SIZE);
  const dentalPageData = filtered.slice(dentalPage * DENTAL_PAGE_SIZE, (dentalPage + 1) * DENTAL_PAGE_SIZE);

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
          <p className="cl-ml-subtitle">View and manage your claims across all benefit types.</p>
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
              onChange={(e) => { setMemberFilter(e.target.value); setDentalPage(0); }}
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
              onChange={(e) => { setDateFilter(e.target.value); setDentalPage(0); }}
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
              <th>Claim ID</th>
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
            {dentalPageData.map((row, i) => {
              const globalIndex = dentalPage * DENTAL_PAGE_SIZE + i;
              return (
              <React.Fragment key={globalIndex}>
              <tr className={'cl-ml-row' + (expandedDentalRow === globalIndex ? ' cl-ml-row--expanded' : '')} onClick={() => setExpandedDentalRow(expandedDentalRow === globalIndex ? null : globalIndex)} style={{ cursor: 'pointer' }}>
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
                    {expandedDentalRow === globalIndex ? 'Hide Details' : 'View Details'}
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ marginLeft: '4px', transform: expandedDentalRow === globalIndex ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}><path d="M1 1l4 4 4-4" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </td>
              </tr>
              {expandedDentalRow === globalIndex && (
                <tr className="cl-dental-accordion-row">
                  <td colSpan="8" className="cl-dental-accordion-cell">
                    <div className="cl-dental-accordion-content">
                      <table className="cl-dental-detail-table">
                        <thead>
                          <tr>
                            <th>DATE</th>
                            <th>CODE</th>
                            <th>SERVICE</th>
                            <th>TOTAL BILLED</th>
                            <th>PLAN PAYS</th>
                            <th>YOU PAY</th>
                          </tr>
                        </thead>
                        <tbody>
                          {row.payments.map((p, pi) => (
                            <tr key={pi}>
                              <td>{row.date}</td>
                              <td><span className="cl-detail-code">{p.code}</span></td>
                              <td>{p.service}</td>
                              <td>{p.billed}</td>
                              <td>{p.planPaid}</td>
                              <td>{p.youPay}</td>
                            </tr>
                          ))}
                          <tr className="cl-detail-total-row">
                            <td><strong>Total</strong></td>
                            <td></td>
                            <td></td>
                            <td><strong>{row.billedAmount}</strong></td>
                            <td><strong>{(() => { const nums = row.payments.map(p => parseFloat(p.planPaid.replace(/[^0-9.]/g, '')) || 0); return '$' + nums.reduce((a, b) => a + b, 0).toFixed(2); })()}</strong></td>
                            <td><strong>{row.memberPays}</strong></td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="cl-detail-footer">
                        <div className="cl-detail-documents">
                          <span className="cl-detail-documents-label">Documents</span>
                          <div className="cl-detail-documents-row">
                            <span className="cl-detail-documents-date">Feb 29, 2026:</span>
                            <a href="#" className="cl-detail-eob-link" onClick={(e) => e.stopPropagation()}>
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 1h5l3 3v8a1 1 0 01-1 1H3a1 1 0 01-1-1V2a1 1 0 011-1z" stroke="#105fa8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 1v3h3M5 7h4M5 9h4" stroke="#105fa8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              Explanation of Benefits (PDF)
                            </a>
                          </div>
                        </div>
                        <button className="cl-detail-view-btn" onClick={(e) => { e.stopPropagation(); navigate(`${base}/dental-claim-detail`); }}>
                          View Claim Details
                          <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true"><path d="M1.5 1l5 5-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
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
        {dentalTotalPages > 0 && (
          <PaginationNumbered
            currentPage={dentalPage}
            totalPages={dentalTotalPages}
            onPageChange={(p) => { setDentalPage(p); setExpandedDentalRow(null); }}
            totalItems={filtered.length}
            pageSize={DENTAL_PAGE_SIZE}
          />
        )}
      </div>

      {/* Mobile card view */}
      <div className="cl-cards-mobile">
        {filtered.length === 0 && (
          <div className="cl-card-empty-mobile">No claims match your filters.</div>
        )}
        {dentalPageData.map((row, i) => {
          const globalIndex = dentalPage * DENTAL_PAGE_SIZE + i;
          return (
          <div key={globalIndex} className="cl-card-mobile">
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
            <span className="cl-ml-action-link" onClick={() => setExpandedDentalRow(expandedDentalRow === globalIndex ? null : globalIndex)}>
              View Details
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ marginLeft: '4px', transform: expandedDentalRow === globalIndex ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}><path d="M1 1l4 4 4-4" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            {expandedDentalRow === globalIndex && (
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
          );
        })}
        {dentalTotalPages > 0 && (
          <PaginationNumbered
            currentPage={dentalPage}
            totalPages={dentalTotalPages}
            onPageChange={(p) => { setDentalPage(p); setExpandedDentalRow(null); }}
            totalItems={filtered.length}
            pageSize={DENTAL_PAGE_SIZE}
          />
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
              <th className="cl-ml-th-first cl-v2-th-sort" onClick={() => handleV2Sort('id')} style={{ cursor: 'pointer' }}>
                <span className="cl-ml-th-sortable">
                  Claim ID
                  {v2SortCol === 'id' && <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ marginLeft: 4, transform: v2SortAsc ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}><path d="M1 1l4 4 4-4" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </span>
              </th>
              <th className="cl-v2-th-sort" onClick={() => handleV2Sort('type')} style={{ cursor: 'pointer' }}>
                <span className="cl-ml-th-sortable">
                  Claim Type
                  {v2SortCol === 'type' && <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ marginLeft: 4, transform: v2SortAsc ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}><path d="M1 1l4 4 4-4" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </span>
              </th>
              <th className="cl-v2-th-sort" onClick={() => handleV2Sort('description')} style={{ cursor: 'pointer' }}>
                <span className="cl-ml-th-sortable">
                  Associated Case
                  {v2SortCol === 'description' && <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ marginLeft: 4, transform: v2SortAsc ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}><path d="M1 1l4 4 4-4" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </span>
              </th>
              <th className="cl-v2-th-sort" onClick={() => handleV2Sort('lastUpdate')} style={{ cursor: 'pointer' }}>
                <span className="cl-ml-th-sortable">
                  Filed Date
                  {v2SortCol === 'lastUpdate' && <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ marginLeft: 4, transform: v2SortAsc ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}><path d="M1 1l4 4 4-4" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </span>
              </th>
              <th className="cl-v2-th-sort" onClick={() => handleV2Sort('period')} style={{ cursor: 'pointer' }}>
                <span className="cl-ml-th-sortable">
                  Benefit Period
                  {v2SortCol === 'period' && <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ marginLeft: 4, transform: v2SortAsc ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}><path d="M1 1l4 4 4-4" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </span>
              </th>
              <th className="cl-v2-th-sort" onClick={() => handleV2Sort('status')} style={{ cursor: 'pointer' }}>
                <span className="cl-ml-th-sortable">
                  Status
                  {v2SortCol === 'status' && <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ marginLeft: 4, transform: v2SortAsc ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}><path d="M1 1l4 4 4-4" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </span>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {v2PageData.map((claim) => {
              const isExpanded = expandedLeaveRow === claim.id;
              const claimPayments = paymentsData[claim.id];
              return (
              <React.Fragment key={claim.id}>
              <tr className={'cl-ml-row cl-claims-v2-row' + (isExpanded ? ' cl-ml-row--expanded' : '')} onClick={() => setExpandedLeaveRow(isExpanded ? null : claim.id)} style={{ cursor: 'pointer' }}>
                <td className="cl-ml-td-first">
                  <span className="cl-claims-v2-id">{claim.id}</span>
                </td>
                <td className="cl-ml-td">
                  <span className="cl-claim-type-text">{getClaimTypeLabel(claim.kind)}</span>
                </td>
                <td className="cl-ml-td">
                  <span
                    className="cl-associated-case-link"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (claim.kind === 'leave') {
                        navigate(`${base}/case-detail`);
                      } else if (claim.kind === 'std') {
                        navigate(`${base}/std-claim-detail`);
                      } else if (claim.kind === 'ltd') {
                        navigate(`${base}/ltd-claim-detail`);
                      }
                    }}
                  >
                    {truncateText(claim.description + (claim.condition ? ` — ${claim.condition}` : ''))}
                  </span>
                </td>
                <td className="cl-ml-td">{claim.startDate}</td>
                <td className="cl-ml-td">{claim.startDate} - {claim.endDate}</td>
                <td className="cl-ml-td">
                  <span className={'cl-ml-status-pill cl-ml-status-pill--' + claim.status.toLowerCase().replace(' ', '')}>{claim.status}</span>
                </td>
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
                    <div className="cl-expanded-payments">
                      <h4>Associated Payments</h4>
                      {claimPayments && claimPayments.length > 0 ? (
                        <>
                          <table className="cl-expanded-payments-table">
                            <thead>
                              <tr>
                                <th>Payment Date</th>
                                <th>Period Covered</th>
                                <th>Gross Amount</th>
                                <th>Deductions</th>
                                <th>Net Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {claimPayments.map((pmt, pi) => (
                                <tr key={pi}>
                                  <td>{pmt.date}</td>
                                  <td>{pmt.period}</td>
                                  <td>{pmt.gross}</td>
                                  <td>{pmt.deductions}</td>
                                  <td>{pmt.net}</td>
                                  <td>
                                    <span className={'cl-ml-status-pill cl-ml-status-pill--' + pmt.status.toLowerCase()}>{pmt.status}</span>
                                  </td>
                                  <td>
                                    <span className="cl-eob-link">View EOB</span>
                                  </td>
                                </tr>
                              ))}
                              <tr className="cl-total-row">
                                <td colSpan="2"><strong>Total</strong></td>
                                <td><strong>${claimPayments.reduce((sum, p) => sum + parseFloat(p.gross.replace(/[$,]/g, '')), 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong></td>
                                <td><strong>${claimPayments.reduce((sum, p) => sum + parseFloat(p.deductions.replace(/[$,]/g, '')), 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong></td>
                                <td><strong>${claimPayments.reduce((sum, p) => sum + parseFloat(p.net.replace(/[$,]/g, '')), 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong></td>
                                <td></td>
                                <td></td>
                              </tr>
                            </tbody>
                          </table>

                          <div className="cl-expanded-meta">
                            <div className="cl-expanded-meta-item">
                              <span className="cl-expanded-meta-label">Last updated</span>
                              <span className="cl-expanded-meta-value">{claim.id} - {claim.lastUpdate}</span>
                            </div>
                          </div>

                          <div className="cl-expanded-meta" style={{ borderTop: 'none', paddingTop: 8, marginTop: 8 }}>
                            <div className="cl-expanded-meta-item">
                              <span className="cl-expanded-meta-label">Documents</span>
                              <a className="cl-expanded-doc-link" href="#" onClick={(e) => e.stopPropagation()}>
                                Explanation of Benefits (PDF)
                                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M11 8v3a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1h3M8 2h4v4M6 8l6-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              </a>
                            </div>
                          </div>
                        </>
                      ) : (
                        <p style={{ fontSize: '14px', color: '#5d5d5d', margin: '0 0 16px' }}>No payment records available.</p>
                      )}

                      <div className="cl-expanded-actions">
                        <button
                          className="cl-btn-view-details"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (claim.kind === 'leave') {
                              navigate(`${base}/case-detail`);
                            } else if (claim.kind === 'std') {
                              navigate(`${base}/std-claim-detail`);
                            } else if (claim.kind === 'ltd') {
                              navigate(`${base}/ltd-claim-detail`);
                            }
                          }}
                        >
                          View Claim Details
                          <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
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
        {v2TotalPages > 0 && (
          <PaginationNumbered
            currentPage={v2Page}
            totalPages={v2TotalPages}
            onPageChange={(p) => { setV2Page(p); setExpandedLeaveRow(null); }}
            totalItems={sortedLeaveData.length}
            pageSize={LEAVE_PAGE_SIZE}
          />
        )}

        {/* Mobile card view for v2 */}
        <div className="cl-cards-mobile cl-claims-v2-cards">
          {v2PageData.map((claim) => {
            const isExpanded = expandedLeaveRow === claim.id;
            const claimPayments = paymentsData[claim.id];
            return (
            <div key={claim.id} className="cl-card-mobile cl-claims-v2-card">
              <div className="cl-card-mobile-header">
                <span className="cl-claims-v2-id">{claim.id}</span>
                <span className={'cl-ml-status-pill cl-ml-status-pill--' + claim.status.toLowerCase().replace(' ', '')}>{claim.status}</span>
              </div>
              <div className="cl-card-mobile-header" style={{ marginTop: '4px' }}>
                <span className="cl-claim-type-text">{getClaimTypeLabel(claim.kind)}</span>
              </div>
              <span className="cl-card-mobile-type">
                <span
                  className="cl-associated-case-link"
                  onClick={() => {
                    if (claim.kind === 'leave') navigate(`${base}/case-detail`);
                    else if (claim.kind === 'std') navigate(`${base}/std-claim-detail`);
                    else if (claim.kind === 'ltd') navigate(`${base}/ltd-claim-detail`);
                  }}
                >
                  {truncateText(claim.description + (claim.condition ? ` — ${claim.condition}` : ''))}
                </span>
              </span>
              <div className="cl-card-mobile-details">
                <div className="cl-card-mobile-field">
                  <span className="cl-card-mobile-label">Filed Date</span>
                  <span className="cl-card-mobile-value">{claim.startDate}</span>
                </div>
                <div className="cl-card-mobile-field">
                  <span className="cl-card-mobile-label">Benefit Period</span>
                  <span className="cl-card-mobile-value">{claim.startDate} - {claim.endDate}</span>
                </div>
              </div>
              <span className="cl-ml-action-link" onClick={() => setExpandedLeaveRow(isExpanded ? null : claim.id)}>
                View Details
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ marginLeft: '4px', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}><path d="M1 1l4 4 4-4" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              {isExpanded && (
                <div className="cl-expanded-payments" style={{ marginTop: 12, padding: '16px 0' }}>
                  <h4>Associated Payments</h4>
                  {claimPayments && claimPayments.length > 0 ? (
                    <>
                      <div style={{ overflowX: 'auto' }}>
                        <table className="cl-expanded-payments-table">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Period</th>
                              <th>Gross</th>
                              <th>Net</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {claimPayments.map((pmt, pi) => (
                              <tr key={pi}>
                                <td>{pmt.date}</td>
                                <td>{pmt.period}</td>
                                <td>{pmt.gross}</td>
                                <td>{pmt.net}</td>
                                <td><span className={'cl-ml-status-pill cl-ml-status-pill--' + pmt.status.toLowerCase()}>{pmt.status}</span></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="cl-expanded-meta">
                        <div className="cl-expanded-meta-item">
                          <span className="cl-expanded-meta-label">Documents</span>
                          <a className="cl-expanded-doc-link" href="#" onClick={(e) => e.stopPropagation()}>
                            Explanation of Benefits (PDF)
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M11 8v3a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1h3M8 2h4v4M6 8l6-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p style={{ fontSize: '14px', color: '#5d5d5d', margin: '0 0 16px' }}>No payment records available.</p>
                  )}
                  <div className="cl-expanded-actions">
                    <button
                      className="cl-btn-view-details"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (claim.kind === 'leave') navigate(`${base}/case-detail`);
                        else if (claim.kind === 'std') navigate(`${base}/std-claim-detail`);
                        else if (claim.kind === 'ltd') navigate(`${base}/ltd-claim-detail`);
                      }}
                    >
                      View Claim Details
                      <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
            );
          })}
        </div>

      </div>
      </>
      )}

    </div>
  );
}
