import { useMemo, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { absenceDetailCases, absenceHistoryAbsences, overviewActiveAbsences } from '../../data/overviewData';
import { EpisodeModal } from '../absence-details/AbsenceDetailsReactPage';
import '../absence-details/absence-details-react.css';
import '../overview/overview-react.css';
import './absence-history-react.css';

function formatDate(isoDate) {
  if (!isoDate) return 'TBD';
  const d = new Date(`${isoDate}T00:00:00`);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}


function formatShortDate(isoDate) {
  if (!isoDate) return '—';
  const d = new Date(`${isoDate}T00:00:00`);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function addOneDay(isoDate) {
  if (!isoDate) return null;
  const d = new Date(`${isoDate}T00:00:00`);
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function frequencyLabel(frequency) {
  if (!frequency) return 'Continuous';
  return frequency;
}

function statusClass(status) {
  if (status === 'APPROVED') return 'st-approved';
  if (status === 'COMPLETED') return 'st-completed';
  return 'st-pending';
}

function statusValue(status) {
  if (status === 'APPROVED') return 'approved';
  if (status === 'COMPLETED') return 'completed';
  if (status === 'DENIED') return 'denied';
  return 'pending';
}

function toIso(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const LEAVE_COLORS = {
  pregnancy: '#2d2d2d',
  family: '#6b6b6b',
  medical: '#4a4a4a',
  personal: '#999999',
};

var KIND_GRAYS = {
  approved: '#404040',
  pending: '#b0b0b0',
  logged: '#737373',
};

function buildCalendarEntries(absences) {
  var entries = [];
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var loggedMissedDates = new Set();

  absences.forEach(function (absence) {
    if (!absence.startDate || !absence.endDate) return;
    var start = new Date(absence.startDate + 'T00:00:00');
    var end = new Date(absence.endDate + 'T00:00:00');
    var color = LEAVE_COLORS[absence.type] || '#6b7280';
    var benefits = absence.benefits || '';

    function pushEntry(d, hours, isLogged) {
      var kind = isLogged ? 'logged' : (d < today ? 'approved' : 'pending');
      entries.push({ date: toIso(d), leaveId: absence.id, leaveTitle: absence.title, type: absence.type, color: color, hours: hours, kind: kind, status: absence.status, benefits: benefits });
    }

    if (absence.frequency === 'Intermittent') {
      var cur = new Date(start);
      var count = 0;
      while (cur <= end && count < 60) {
        var dow = cur.getDay();
        if (dow !== 0 && dow !== 6) {
          if (count % 3 === 0 || count % 7 === 0) {
            var isLogged = cur < today && count % 7 === 0 && !loggedMissedDates.has(toIso(cur));
            if (isLogged) loggedMissedDates.add(toIso(cur));
            pushEntry(cur, count % 7 === 0 ? 4 : 8, isLogged);
          }
        }
        cur.setDate(cur.getDate() + 1);
        count++;
      }
    } else if (absence.frequency === 'Reduced Schedule') {
      var cur2 = new Date(start);
      var count2 = 0;
      while (cur2 <= end && count2 < 200) {
        var dow2 = cur2.getDay();
        if (dow2 !== 0 && dow2 !== 6) {
          pushEntry(cur2, 4, false);
        }
        cur2.setDate(cur2.getDate() + 1);
        count2++;
      }
    } else {
      var cur3 = new Date(start);
      var count3 = 0;
      while (cur3 <= end && count3 < 200) {
        var dow3 = cur3.getDay();
        if (dow3 !== 0 && dow3 !== 6) {
          pushEntry(cur3, 8, false);
        }
        cur3.setDate(cur3.getDate() + 1);
        count3++;
      }
    }

    if (absence.returnDate) {
      entries.push({ date: absence.returnDate, leaveId: absence.id, leaveTitle: absence.title, type: absence.type, color: color, hours: 0, kind: 'return', status: absence.status, benefits: benefits });
    }
  });

  return entries;
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div className="site-footer-col">
            <h4>Resources</h4>
            <a>Absence Policies</a><a>FAQs</a><a>Forms &amp; Documents</a>
          </div>
          <div className="site-footer-col">
            <h4>Support</h4>
            <a>Contact HR</a><a>Help Center</a><a>Report an Issue</a>
          </div>
          <div className="site-footer-col">
            <h4>Legal</h4>
            <a>Privacy Policy</a><a>Terms of Use</a><a>Accessibility</a>
          </div>
          <div className="site-footer-col">
            <h4>Contact</h4>
            <a>Phone: 1-800-HR-HELP</a><a>Email: hrbenefits@company.com</a><a>Hours: Mon&ndash;Fri, 8am&ndash;6pm EST</a>
          </div>
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
        <Link className="nav-tab active" to="/absence-history">Leave History</Link>
        <Link className="nav-tab" to="/leave-documents">Leave Documents</Link>
      </div>
    </div>
  );
}

/* ── Calendar View ── */

function CalendarView({ entries, absences, onLogMissedTime }) {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var [viewYear, setViewYear] = useState(today.getFullYear());
  var [viewMonth, setViewMonth] = useState(today.getMonth());
  var [selectedDate, setSelectedDate] = useState(toIso(today));

  var goToday = useCallback(function () {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setSelectedDate(toIso(today));
  }, []);

  var goPrev = useCallback(function () {
    setViewMonth(function (m) {
      if (m === 0) { setViewYear(function (y) { return y - 1; }); return 11; }
      return m - 1;
    });
  }, []);

  var goNext = useCallback(function () {
    setViewMonth(function (m) {
      if (m === 11) { setViewYear(function (y) { return y + 1; }); return 0; }
      return m + 1;
    });
  }, []);

  var entryMap = useMemo(function () {
    var map = {};
    entries.forEach(function (e) {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    return map;
  }, [entries]);

  var returnDates = useMemo(function () {
    var s = new Set();
    entries.forEach(function (e) { if (e.kind === 'return') s.add(e.date); });
    return s;
  }, [entries]);

  var calendarDays = useMemo(function () {
    var first = new Date(viewYear, viewMonth, 1);
    var startDow = first.getDay();
    var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    var cells = [];
    for (var i = 0; i < startDow; i++) cells.push(null);
    for (var d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }, [viewYear, viewMonth]);

  var selectedEntries = useMemo(function () {
    if (!selectedDate) return [];
    return (entryMap[selectedDate] || []).filter(function (e) { return e.kind !== 'return'; });
  }, [selectedDate, entryMap]);

  var selectedTotalHours = useMemo(function () {
    return selectedEntries.reduce(function (sum, e) { return sum + e.hours; }, 0);
  }, [selectedEntries]);

  var isReturnDay = selectedDate && returnDates.has(selectedDate);

  var navigate = useNavigate();

  return (
    <div className="ah-cal-two-col">
      {/* Left: Calendar */}
      <div className="ah-cal-left">
        <div className="ah-cal-panel">
          <div className="ah-cal-topbar">
            <button type="button" className="ah-cal-today-btn" onClick={goToday}>Today</button>
            <div className="ah-cal-month-nav">
              <button type="button" className="ah-cal-arrow" onClick={goPrev}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L3 6l5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <span className="ah-cal-month-label">{MONTH_NAMES[viewMonth]} {viewYear}</span>
              <button type="button" className="ah-cal-arrow" onClick={goNext}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2l5 4-5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>

          <div className="ah-cal-grid ah-cal-day-headers">
            {DAY_HEADERS.map(function (d) { return <div key={d} className="ah-cal-dh">{d}</div>; })}
          </div>

          <div className="ah-cal-grid ah-cal-body">
            {calendarDays.map(function (day, i) {
              if (day === null) return <div key={'e' + i} className="ah-cal-cell ah-cal-cell-empty" />;
              var iso = viewYear + '-' + String(viewMonth + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
              var dayEntries = (entryMap[iso] || []).filter(function (e) { return e.kind !== 'return'; });
              var isToday = iso === toIso(today);
              var isSel = selectedDate === iso;
              var isRet = returnDates.has(iso);
              var dow = new Date(viewYear, viewMonth, day).getDay();
              var isWeekend = dow === 0 || dow === 6;

              return (
                <div
                  key={iso}
                  className={'ah-cal-cell' + (isToday ? ' is-today' : '') + (isSel ? ' is-selected' : '') + (isWeekend ? ' is-weekend' : '')}
                  onClick={function () { setSelectedDate(iso); }}
                >
                  <span className="ah-cal-num">{day}</span>
                  <div className="ah-cal-cell-bars">
                    {dayEntries.slice(0, 3).map(function (e, ei) {
                      return <div key={ei} className={'ah-cal-bar ' + e.kind} style={{ '--bar-color': e.color }} />;
                    })}
                    {dayEntries.length > 3 && <span className="ah-cal-more">+{dayEntries.length - 3}</span>}
                  </div>
                  {isRet && <div className="ah-cal-ret-badge">RTW</div>}
                </div>
              );
            })}
          </div>

          <div className="ah-cal-legend">
            <span className="ah-cal-legend-item"><span className="ah-cal-legend-swatch approved" />Approved</span>
            <span className="ah-cal-legend-item"><span className="ah-cal-legend-swatch pending" />Pending</span>
            <span className="ah-cal-legend-item"><span className="ah-cal-legend-swatch logged" />Logged / Missed</span>
            <span className="ah-cal-legend-item"><span className="ah-cal-ret-badge" style={{ position: 'static', fontSize: 9 }}>RTW</span>Return to work</span>
          </div>
        </div>
      </div>

      {/* Right: Side panel */}
      <div className="ah-cal-sidebar">
        {/* Selected day detail */}
        <div className="ah-cal-side-card">
          {selectedDate ? (
            <div className="ah-cal-side-day">
              <div className="ah-cal-side-day-date">
                {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="ah-cal-side-day-total">Total logged: {selectedTotalHours}h</div>
              {selectedEntries.length > 0 ? (
                <div className="ah-cal-side-entries">
                  {selectedEntries.map(function (entry, i) {
                    var kindLabel = entry.kind === 'approved' ? 'Approved' : entry.kind === 'logged' ? 'Logged' : 'Pending';
                    return (
                      <div key={i} className="ah-cal-side-entry">
                        <div className="ah-cal-side-entry-bar" style={{ background: entry.color }} />
                        <div className="ah-cal-side-entry-body">
                          <div className="ah-cal-side-entry-title">{entry.hours}h &middot; {kindLabel}</div>
                          <div className="ah-cal-side-entry-meta">{entry.leaveTitle}</div>
                        </div>
                      </div>
                    );
                  })}
                  <button type="button" className="ah-cal-log-btn" onClick={onLogMissedTime}>
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    Log missed time
                  </button>
                </div>
              ) : isReturnDay ? (
                <div className="ah-cal-side-empty">Return to work scheduled.</div>
              ) : (
                <div className="ah-cal-side-empty">No time off on this day.</div>
              )}
            </div>
          ) : (
            <div className="ah-cal-side-empty">Select a date to see details.</div>
          )}
        </div>

        {/* Active leaves */}
        <div className="ah-cal-side-card">
          <div className="ah-cal-side-card-header">
            <h4>Active Leaves</h4>
            <span className="ah-cal-side-count">{overviewActiveAbsences.length}</span>
          </div>
          <div className="ah-cal-side-leaves">
            {overviewActiveAbsences.map(function (lv) {
              var color = LEAVE_COLORS[lv.type] || '#6b7280';
              var stCls = statusClass(lv.status);
              return (
                <div key={lv.id} className="ah-cal-side-leave" onClick={function () { navigate('/absence-details/' + lv.id); }}>
                  <div className="ah-cal-side-leave-bar" style={{ background: color }} />
                  <div className="ah-cal-side-leave-body">
                    <div className="ah-cal-side-leave-title">{lv.title}</div>
                    <div className="ah-cal-side-leave-meta">{lv.frequency} &middot; {formatShortDate(lv.startDate)} – {formatShortDate(lv.endDate)}</div>
                    {lv.benefits && <div className="ah-cal-side-leave-benefits">{lv.benefits}</div>}
                  </div>
                  <span className={'ah-cal-side-leave-status ' + stCls}>{lv.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main page ── */

export default function AbsenceHistoryReactPage() {
  var navigate = useNavigate();
  var [statusFilter, setStatusFilter] = useState('all');
  var [sortFilter, setSortFilter] = useState('newest');
  var [viewMode, setViewMode] = useState('calendar');
  var [expandedCards, setExpandedCards] = useState({});
  var [isLogModalOpen, setIsLogModalOpen] = useState(false);

  function toggleCardExpand(id, e) {
    e.stopPropagation();
    setExpandedCards(function (prev) {
      var next = Object.assign({}, prev);
      next[id] = !next[id];
      return next;
    });
  }

  var totalCount = absenceHistoryAbsences.length;

  var visibleRows = useMemo(function () {
    var sorted = [].concat(absenceHistoryAbsences).sort(function (a, b) {
      var aDate = a.submittedAt || a.startDate || '';
      var bDate = b.submittedAt || b.startDate || '';
      if (sortFilter === 'oldest') return aDate.localeCompare(bDate);
      return bDate.localeCompare(aDate);
    });
    return sorted.filter(function (row) {
      if (statusFilter !== 'all' && statusValue(row.status) !== statusFilter) return false;
      return true;
    });
  }, [statusFilter, sortFilter]);

  var calendarEntries = useMemo(function () { return buildCalendarEntries(absenceHistoryAbsences); }, []);

  return (
    <div className="ah-page-shell">
      <SiteNav />

      <div className="overview-page">
        <div className="overview-header ah-header-row ah-header-wide">
          <div className="ah-header-copy">
            <h1>All time off</h1>
            <p>View all your approved, pending, and completed leaves in one place.{viewMode === 'list' && <span className="ah-result-count"> Showing {visibleRows.length} of {totalCount} absences</span>}</p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="ah-filter-bar ah-filter-wide">
          <div className="ah-filter-bar-left">
            <select className="ah-select" value={statusFilter} onChange={function (event) { setStatusFilter(event.target.value); }}>
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed</option>
              <option value="denied">Denied</option>
            </select>
            <select className="ah-select" value={sortFilter} onChange={function (event) { setSortFilter(event.target.value); }}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
          <div className="ah-filter-bar-right">
            <div className="ah-view-toggle">
              <button type="button" className={'ah-view-btn' + (viewMode === 'calendar' ? ' active' : '')} onClick={function () { setViewMode('calendar'); }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Calendar
              </button>
              <button type="button" className={'ah-view-btn' + (viewMode === 'list' ? ' active' : '')} onClick={function () { setViewMode('list'); }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                List view
              </button>
            </div>
          </div>
        </div>

        {/* Calendar view */}
        {viewMode === 'calendar' && (
          <div className="ah-cal-container">
            <CalendarView entries={calendarEntries} absences={absenceHistoryAbsences} onLogMissedTime={function () { setIsLogModalOpen(true); }} />
          </div>
        )}

        {/* List view (cards) */}
        {viewMode === 'list' && (
          <div className="ah-card-list">
            {!visibleRows.length ? <div className="lh-no-results">No absences match this filter.</div> : null}

            {visibleRows.map(function (row) {
              var hasDetailRoute = Boolean(absenceDetailCases[row.id]);
              var returnToWork = row.returnDate || addOneDay(row.endDate);
              var leftCols = [
                { label: 'Start Date', value: formatShortDate(row.startDate) },
                { label: 'End Date', value: formatShortDate(row.endDate) },
                {
                  label: row.frequency === 'Reduced Schedule' ? 'Schedule' : row.frequency === 'Intermittent' ? 'Frequency' : 'Return to Work',
                  value: row.frequency === 'Reduced Schedule' ? 'Reduced schedule' : row.frequency === 'Intermittent' ? frequencyLabel(row.frequency) : formatShortDate(returnToWork),
                },
                { label: 'Duration', value: row.duration || '—' },
              ];

              var detailCase = absenceDetailCases[row.id];
              var logEntries = detailCase && detailCase.episodeLog ? detailCase.episodeLog : [];
              var isExpanded = !!expandedCards[row.id];

              var cardInner = (
                <div className="ov-active-card-body">
                  <div className="ov-active-card-header">
                    <div className="ov-active-card-icon ah-history-icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="#525252" strokeWidth="1.3"/><path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke="#525252" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    </div>
                    <span className="ov-active-card-title">{row.title}</span>
                    <span className={'ov-history-status ' + statusClass(row.status)}>
                      <span className="dot" />
                      {row.status}
                    </span>
                  </div>
                  <div className="ov-active-card-desc">Case #{row.id} &middot; {frequencyLabel(row.frequency)} Absence</div>

                  <div className="ov-active-card-fields">
                    {leftCols.map(function (field) {
                      return <div key={row.id + '-' + field.label + '-label'} className="ov-active-card-flabel">{field.label}</div>;
                    })}
                    {leftCols.map(function (field) {
                      return <div key={row.id + '-' + field.label + '-value'} className="ov-active-card-fvalue">{field.value}</div>;
                    })}
                  </div>

                  {logEntries.length > 0 && (
                    <div className="ah-log-accordion">
                      <button
                        type="button"
                        className={'ah-log-accordion-toggle' + (isExpanded ? ' open' : '')}
                        onClick={function (e) { toggleCardExpand(row.id, e); }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M12 8v4l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span>Logged Hours ({logEntries.length})</span>
                        <svg className="ah-log-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                      {isExpanded && (
                        <div className="ah-log-accordion-body">
                          {logEntries.map(function (entry, idx) {
                            return (
                              <div key={entry.date + '-' + idx} className="ah-log-entry">
                                <span className="ah-log-entry-date">{entry.date}</span>
                                <span className="ah-log-entry-hours">{entry.hours}h</span>
                                <span className="ah-log-entry-reason">{entry.reason}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="ov-active-card-footer">
                    {hasDetailRoute ? (
                      <span className="ov-active-card-btn">View Details
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M1.5 1L6.5 6l-5 5" stroke="#3d3d47" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    ) : (
                      <span className="ah-action-disabled">No React detail yet</span>
                    )}
                  </div>
                </div>
              );

              if (hasDetailRoute) {
                return (
                  <div
                    key={row.id}
                    className="ov-active-card ah-card-link"
                    role="link"
                    tabIndex={0}
                    onClick={function () { navigate('/absence-details/' + row.id); }}
                    onKeyDown={function (event) {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        navigate('/absence-details/' + row.id);
                      }
                    }}
                  >
                    {cardInner}
                  </div>
                );
              }

              return (
                <div key={row.id} className="ov-active-card ah-card-link is-disabled">
                  {cardInner}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <SiteFooter />

      {isLogModalOpen && (
        <EpisodeModal
          onSave={function () { setIsLogModalOpen(false); }}
          onClose={function () { setIsLogModalOpen(false); }}
        />
      )}
    </div>
  );
}
