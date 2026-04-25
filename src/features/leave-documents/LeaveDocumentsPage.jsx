import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../overview/overview-react.css';
import './leave-documents.css';

var DOCUMENTS = [
  { id: 1, name: 'State Paid Family Leave Packet (New York)', size: 'PDF • 1.2 MB', category: 'Benefit Guide', year: 2025, date: '2025-01-15' },
  { id: 2, name: 'Return-To-Work Form', size: 'PDF • 850 KB', category: 'Forms', year: 2025, date: '2025-01-10' },
  { id: 3, name: 'FMLA Medical Certification – Employee’s Health Condition', size: 'PDF • 500 KB', category: 'Forms', year: 2025, date: '2024-12-01' },
  { id: 4, name: 'Leave Approval Letter', size: 'PDF • 500 KB', category: 'Forms', year: 2025, date: '2024-12-01' },
  { id: 5, name: 'Authorization to Release Medical Information (HIPAA)', size: 'PDF • 500 KB', category: 'Forms', year: 2025, date: '2024-12-01' },
  { id: 6, name: 'Short-Term Disability Claim Form', size: 'PDF • 420 KB', category: 'Forms', year: 2024, date: '2024-09-15' },
  { id: 7, name: 'Employer Statement of Earnings', size: 'PDF • 380 KB', category: 'Benefit Guide', year: 2024, date: '2024-08-20' },
  { id: 8, name: 'ADA Reasonable Accommodation Request', size: 'PDF • 310 KB', category: 'Forms', year: 2024, date: '2024-07-01' },
  { id: 9, name: 'Physician’s Fitness-for-Duty Certification', size: 'PDF • 450 KB', category: 'Forms', year: 2024, date: '2024-06-12' },
  { id: 10, name: 'Benefits Summary Statement', size: 'PDF • 620 KB', category: 'Benefit Guide', year: 2024, date: '2024-05-01' },
  { id: 11, name: 'Leave Extension Request Form', size: 'PDF • 290 KB', category: 'Forms', year: 2024, date: '2024-04-18' },
  { id: 12, name: 'Intermittent Leave Tracking Sheet', size: 'PDF • 340 KB', category: 'Forms', year: 2024, date: '2024-03-10' },
];

var PAGE_SIZE = 4;

function formatDate(iso) {
  if (!iso) return '—';
  var d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}

function PdfIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 2h8l5 5v11a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="#737373" strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M12 2v5h5" stroke="#737373" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="5" y="15" fill="#ef4444" fontSize="6" fontWeight="700" fontFamily="Source Sans Pro, sans-serif">PDF</text>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1v7.5M3 6.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 10.5h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

function SortIcon({ direction }) {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
      <path d="M4 8l3 3 3-3" stroke={direction === 'asc' ? '#737373' : '#b0b0b0'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 4L7 1 4 4" stroke={direction === 'desc' ? '#737373' : '#b0b0b0'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="9" height="14" viewBox="0 0 9 14" fill="none">
      <path d="M7.5 1L1.5 7l6 6" stroke="#737373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="9" height="14" viewBox="0 0 9 14" fill="none">
      <path d="M1.5 1l6 6-6 6" stroke="#737373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 4.5l3 3 3-3" stroke="#525252" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SiteNav() {
  return (
    <div className="top-nav">
      <div className="nav-main">
        <div className="nav-main-left">
          <div className="nav-brand">my<span>Mutual</span></div>
          <nav className="nav-links">
            <button className="nav-link" type="button">Dashboard</button>
            <button className="nav-link" type="button">My Coverages <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <button className="nav-link" type="button">Claims</button>
            <button className="nav-link active" type="button">Leaves</button>
            <button className="nav-link" type="button">Support</button>
          </nav>
        </div>
        <div className="nav-utilities">
          <button className="nav-util" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 9h12M6 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Find ID Card
          </button>
          <button className="nav-util" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Messages
          </button>
          <button className="nav-bell" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3C8.69 3 6 5.69 6 9v4l-2 3h16l-2-3V9c0-3.31-2.69-6-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 21a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span className="nav-bell-dot"/>
          </button>
          <div className="nav-avatar">
            <div className="nav-avatar-circle">SJ</div>
            <span className="nav-avatar-name">Sarah Johnson</span>
          </div>
        </div>
      </div>
      <div className="nav-secondary">
        <Link className="nav-tab" to="/overview-react">My Leave</Link>
        <Link className="nav-tab" to="/plan-absence">Plan Leave</Link>
        <Link className="nav-tab" to="/wizard">Request Leave</Link>
        <Link className="nav-tab" to="/absence-history">Leave History</Link>
        <Link className="nav-tab active" to="/leave-documents">Leave Documents</Link>
      </div>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div className="site-footer-col"><h4>Resources</h4><a>Absence Policies</a><a>FAQs</a><a>Forms &amp; Documents</a></div>
          <div className="site-footer-col"><h4>Support</h4><a>Contact HR</a><a>Help Center</a><a>Report an Issue</a></div>
          <div className="site-footer-col"><h4>Legal</h4><a>Privacy Policy</a><a>Terms of Use</a><a>Accessibility</a></div>
          <div className="site-footer-col"><h4>Contact</h4><a>Phone: 1-800-HR-HELP</a><a>Email: hrbenefits@company.com</a><a>Hours: Mon–Fri, 8am–6pm EST</a></div>
        </div>
        <div className="site-footer-bottom">
          <span>&copy; 2026 HR Benefits Portal. All rights reserved.</span>
          <div className="site-footer-social">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.5v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.12 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" stroke="currentColor" strokeWidth="1.5"/></svg>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LeaveDocumentsPage() {
  var [typeFilter, setTypeFilter] = useState('all');
  var [yearFilter, setYearFilter] = useState('all');
  var [sortField, setSortField] = useState('date');
  var [sortDir, setSortDir] = useState('desc');
  var [page, setPage] = useState(1);

  var categories = useMemo(function () {
    var set = {};
    DOCUMENTS.forEach(function (d) { set[d.category] = true; });
    return Object.keys(set).sort();
  }, []);

  var years = useMemo(function () {
    var set = {};
    DOCUMENTS.forEach(function (d) { set[d.year] = true; });
    return Object.keys(set).sort().reverse();
  }, []);

  var filtered = useMemo(function () {
    var rows = DOCUMENTS.filter(function (d) {
      if (typeFilter !== 'all' && d.category !== typeFilter) return false;
      if (yearFilter !== 'all' && String(d.year) !== yearFilter) return false;
      return true;
    });
    rows.sort(function (a, b) {
      var va, vb;
      if (sortField === 'name') { va = a.name.toLowerCase(); vb = b.name.toLowerCase(); }
      else { va = a.date; vb = b.date; }
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return rows;
  }, [typeFilter, yearFilter, sortField, sortDir]);

  var totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  var pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSort(field) {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir(field === 'name' ? 'asc' : 'desc');
    }
    setPage(1);
  }

  function handleTypeChange(e) { setTypeFilter(e.target.value); setPage(1); }
  function handleYearChange(e) { setYearFilter(e.target.value); setPage(1); }

  return (
    <div className="ld-page">
      <SiteNav />

      <div className="ld-content">
        <h1 className="ld-heading">Leave Documents</h1>
        <p className="ld-subtext">
          All your Leaves and submitted requests in one place.
          <span className="ld-count"> Showing {filtered.length} of {DOCUMENTS.length} documents</span>
        </p>

        <div className="ld-table-wrap">
          {/* Toolbar */}
          <div className="ld-toolbar">
            <div className="ld-toolbar-left">
              <select className="ld-filter-select" value={typeFilter} onChange={handleTypeChange}>
                <option value="all">All Document Types</option>
                {categories.map(function (c) { return <option key={c} value={c}>{c}</option>; })}
              </select>
              <select className="ld-filter-select" value={yearFilter} onChange={handleYearChange}>
                <option value="all">All Years</option>
                {years.map(function (y) { return <option key={y} value={y}>{y}</option>; })}
              </select>
            </div>
            <button type="button" className="ld-view-all-btn">View All Documents</button>
          </div>

          {/* Table */}
          <table className="ld-table">
            <thead>
              <tr>
                <th>
                  <span className="ld-th-sortable" onClick={function () { handleSort('name'); }}>
                    Document Name <SortIcon direction={sortField === 'name' ? sortDir : null} />
                  </span>
                </th>
                <th style={{ textAlign: 'center' }}>Category</th>
                <th>Year</th>
                <th>
                  <span className="ld-th-sortable" onClick={function () { handleSort('date'); }}>
                    Date Available <SortIcon direction={sortField === 'date' ? sortDir : null} />
                  </span>
                </th>
                <th className="ld-th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map(function (doc) {
                return (
                  <tr key={doc.id}>
                    <td>
                      <div className="ld-doc-cell">
                        <div className="ld-doc-icon"><PdfIcon /></div>
                        <div className="ld-doc-info">
                          <span className="ld-doc-name">{doc.name}</span>
                          <span className="ld-doc-size">{doc.size}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}><span className="ld-category">{doc.category}</span></td>
                    <td>{doc.year}</td>
                    <td>{formatDate(doc.date)}</td>
                    <td>
                      <div className="ld-actions-cell">
                        <button type="button" className="ld-btn-view">View</button>
                        <button type="button" className="ld-btn-save"><DownloadIcon /> Save</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="ld-pagination">
            <span className="ld-pagination-info">
              Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)} to {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} results
            </span>
            <div className="ld-pagination-nav">
              <button type="button" className="ld-page-btn ld-page-arrow" disabled={page <= 1} onClick={function () { setPage(page - 1); }}>
                <ChevronLeft />
              </button>
              {Array.from({ length: totalPages }, function (_, i) {
                return (
                  <button key={i + 1} type="button" className={'ld-page-btn' + (page === i + 1 ? ' active' : '')} onClick={function () { setPage(i + 1); }}>
                    {i + 1}
                  </button>
                );
              })}
              <button type="button" className="ld-page-btn ld-page-arrow" disabled={page >= totalPages} onClick={function () { setPage(page + 1); }}>
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
