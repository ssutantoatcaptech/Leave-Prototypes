import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const employeeAbsences = {
  'chris-jones': { '2026-4': [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], '2026-5': [1,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
  'morgan-lee': { '2026-4': [0,0,0,1,1,0,1,0,1,1,0,1,0,0,0,1,0,1,1,0,1,0,0,1,0,1,1,0,1,0,0], '2026-5': [1,0,0,1,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
  'michael-chen': { '2026-4': [0,0,0,0,2,2,2,2,0,0,0,0,2,2,2,2,0,0,0,0,2,2,2,2,0,0,0,0,2,2,2], '2026-5': [0,0,0,0,2,2,2,2,0,0,0,0,2,2,2,2,0,0,0,0,2,2,2,2,0,0,0,0,0,0] },
  'kathrine-anderson': { '2026-4': [2,0,2,0,2,0,0,0,0,2,0,2,0,2,0,0,0,0,2,0,2,0,2,0,0,0,0,2,0,2,0], '2026-5': [2,0,0,0,0,2,0,2,0,2,0,0,0,0,2,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0] },
  'amy-smith': { '2026-4': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1], '2026-5': [1,1,1,1,1,1,1,1,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
  'david-park': { '2026-4': [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], '2026-5': [1,1,1,1,1,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
  'lisa-nguyen': { '2026-4': [0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0], '2026-5': [0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0] },
  'james-wilson': { '2026-4': [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0], '2026-5': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
  'sarah-martinez': { '2026-4': [0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0], '2026-5': [2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,0,0,0] },
  'evan-blue': { '2026-4': [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], '2026-5': [1,1,1,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
};

const employeesMeta = [
  { id: 'chris-jones', name: 'Chris Jones', type: 'Continuous', status: 'approved', ada: false, dates: 'May 1 - Jun 5', returnDate: 'Jun 6', timeframe: null },
  { id: 'morgan-lee', name: 'Morgan Lee', type: 'Intermittent', status: 'approved', ada: true, dates: 'Apr 15 - Jun 15', returnDate: 'N/A', timeframe: '12pm - 5pm' },
  { id: 'michael-chen', name: 'Michael Chen', type: 'Reduced Schedule', status: 'approved', ada: false, dates: 'Mar 10 - N/A', returnDate: 'N/A', timeframe: null },
  { id: 'kathrine-anderson', name: 'Katherine Anderson', type: 'Intermittent', status: 'approved', ada: true, dates: 'Apr 1 - Jun 30', returnDate: 'N/A', timeframe: null },
  { id: 'amy-smith', name: 'Amy Smith', type: 'Continuous', status: 'approved', ada: false, dates: 'May 19 - Jun 12', returnDate: 'Jun 13', timeframe: null },
  { id: 'david-park', name: 'David Park', type: 'Continuous', status: 'pending', ada: false, dates: 'May 12 - Jun 9', returnDate: 'Jun 10', timeframe: null },
  { id: 'lisa-nguyen', name: 'Lisa Nguyen', type: 'Intermittent', status: 'approved', ada: false, dates: 'Apr 20 - Jun 20', returnDate: 'N/A', timeframe: '8am - 12pm' },
  { id: 'james-wilson', name: 'James Wilson', type: 'Continuous', status: 'approved', ada: false, dates: 'May 1 - May 20', returnDate: 'May 21', timeframe: null },
  { id: 'sarah-martinez', name: 'Sarah Martinez', type: 'Reduced Schedule', status: 'approved', ada: true, dates: 'Apr 1 - Jun 30', returnDate: 'N/A', timeframe: null },
  { id: 'evan-blue', name: 'Evan Blue', type: 'Continuous', status: 'pending', ada: false, dates: 'May 13 - Jun 7', returnDate: 'Jun 8', timeframe: null },
];

const blockLabels = { 1: 'Out Full Day', 2: 'Partially Missed Day', 3: 'Returning to Work' };
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const dayAbbrevs = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const avatarConfig = {
  'chris-jones': { type: 'photo' },
  'morgan-lee': { type: 'initials', color: 'teal' },
  'michael-chen': { type: 'photo' },
  'kathrine-anderson': { type: 'initials', color: 'amber' },
  'amy-smith': { type: 'photo' },
  'david-park': { type: 'initials', color: 'navy' },
  'lisa-nguyen': { type: 'photo' },
  'james-wilson': { type: 'initials', color: 'green' },
  'sarah-martinez': { type: 'initials', color: 'indigo' },
  'evan-blue': { type: 'photo' },
};

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase();
}

function EmployeeAvatar({ emp, size }) {
  const config = avatarConfig[emp.id];
  const className = size === 'mobile' ? 'mgr-cal-mobile-avatar' : 'mgr-cal-employee-avatar';
  const initialsClass = size === 'mobile' ? 'mgr-cal-mobile-avatar-initials' : 'mgr-cal-employee-avatar-initials';

  if (!config || config.type === 'photo') {
    return <img className={className} src={`https://i.pravatar.cc/68?u=${emp.id}`} alt={emp.name} />;
  }
  return (
    <div className={`${initialsClass} mgr-avatar-color-${config.color}`}>
      {getInitials(emp.name)}
    </div>
  );
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function buildDayColumns(year, month) {
  const total = getDaysInMonth(year, month);
  const cols = [];
  for (let d = 1; d <= total; d++) {
    const date = new Date(year, month, d);
    cols.push({ day: d, dow: dayAbbrevs[date.getDay()] });
  }
  return cols;
}

export default function AbsenceCalendarPage() {
  const navigate = useNavigate();
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(4);
  const [selectedDay, setSelectedDay] = useState(20);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const gridRef = useRef(null);

  const dayColumns = buildDayColumns(year, month);
  const monthKey = `${year}-${month}`;
  const today = 20;

  function getBlocks(empId) {
    return employeeAbsences[empId]?.[monthKey] || new Array(dayColumns.length).fill(0);
  }

  const todayEmployees = employeesMeta.filter(e => {
    const blocks = getBlocks(e.id);
    return blocks[selectedDay - 1] > 0;
  });
  const fullDay = todayEmployees.filter(e => getBlocks(e.id)[selectedDay - 1] === 1).length;
  const partial = todayEmployees.filter(e => getBlocks(e.id)[selectedDay - 1] === 2).length;
  const returning = todayEmployees.filter(e => getBlocks(e.id)[selectedDay - 1] === 3).length;

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else { setMonth(month - 1); }
    setSelectedDay(1);
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else { setMonth(month + 1); }
    setSelectedDay(1);
  }

  function handleCellHover(e, emp, dayIdx) {
    const blocks = getBlocks(emp.id);
    const block = blocks[dayIdx];
    if (block === 0) { setHoveredCell(null); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top - 8 });
    setHoveredCell({ employee: emp.name, day: dayColumns[dayIdx].day, type: blockLabels[block] });
  }

  function getDateLabel(day) {
    const date = new Date(year, month, day);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }

  return (
    <div className="mgr-page">
      <h1 className="mgr-page-title">Absence Calendar</h1>
      <p className="mgr-page-subtitle">
        View absences for employees on your team with active leaves, this calendar does not reflect all employees on your team or employees taking vacation or sick time. Click any date to see more details for employees with absences that day.
      </p>

      <div className="mgr-card mgr-calendar-card">
        <div className="mgr-calendar-legend">
          <div className="mgr-calendar-legend-item">
            <span className="mgr-legend-dot mgr-legend-dot--full" />
            Out Full Day
          </div>
          <div className="mgr-calendar-legend-item">
            <span className="mgr-legend-dot mgr-legend-dot--partial" />
            Partially Missed Day
          </div>
          <div className="mgr-calendar-legend-item">
            <span className="mgr-legend-dot mgr-legend-dot--returning" />
            Returning to Work
          </div>
          <button
            className="mgr-sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              {sidebarOpen ? (
                <path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="rotate(180 8 8)"/>
              ) : (
                <path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              )}
            </svg>
            {sidebarOpen ? 'Hide Details' : 'Show Details'}
          </button>
        </div>

        <div className={`mgr-calendar-container${sidebarOpen ? '' : ' mgr-calendar-container--collapsed'}`}>
          <div className="mgr-calendar-grid" ref={gridRef}>
            <div className="mgr-calendar-header">
              <button className="mgr-calendar-nav" aria-label="Previous month" onClick={prevMonth}>&lsaquo;</button>
              <span className="mgr-calendar-month">{monthNames[month]} {year}</span>
              <button className="mgr-calendar-nav" aria-label="Next month" onClick={nextMonth}>&rsaquo;</button>
            </div>
            <div className="mgr-calendar-scroll-wrapper">
              <table className="mgr-calendar-table">
                <thead>
                  <tr>
                    <th className="mgr-cal-employee-col mgr-cal-sticky-col">EMPLOYEES</th>
                    {dayColumns.map((col, i) => (
                      <th
                        key={i}
                        className={`mgr-cal-day-header${col.day === selectedDay ? ' selected' : ''}${col.day === today && month === 4 && year === 2026 ? ' today' : ''}`}
                        onClick={() => setSelectedDay(col.day)}
                        title={getDateLabel(col.day)}
                      >
                        <span className="mgr-cal-day-name">{col.dow}</span>
                        <span className="mgr-cal-day-num">{col.day}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employeesMeta.map((emp, empIdx) => {
                    const blocks = getBlocks(emp.id);
                    return (
                      <tr
                        key={emp.id}
                        className={`mgr-cal-row${hoveredRow === empIdx ? ' hovered' : ''}`}
                        onMouseEnter={() => setHoveredRow(empIdx)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td className="mgr-cal-employee-cell mgr-cal-sticky-col" onClick={() => navigate(`/manager/my-team/${emp.id}`)}>
                          <div className="mgr-cal-employee-info">
                            <EmployeeAvatar emp={emp} size="desktop" />
                            <div>
                              <div className="mgr-cal-employee-name">
                                {emp.name}
                                {emp.ada && <span className="mgr-ada-tag">ADA</span>}
                              </div>
                              <div className="mgr-cal-employee-tags">
                                <span className="mgr-cal-type-pill">{emp.type}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        {blocks.map((block, dayIdx) => (
                          <td
                            key={dayIdx}
                            className={`mgr-cal-block-cell${dayColumns[dayIdx].day === selectedDay ? ' selected-col' : ''}`}
                            onMouseEnter={(e) => handleCellHover(e, emp, dayIdx)}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => setSelectedDay(dayColumns[dayIdx].day)}
                          >
                            {block === 1 && <div className="mgr-calendar-block mgr-calendar-block--full" />}
                            {block === 2 && <div className="mgr-calendar-block mgr-calendar-block--partial" />}
                            {block === 3 && (
                              <div className="mgr-calendar-block mgr-calendar-block--returning">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#2e7d5e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              </div>
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {sidebarOpen && (
            <div className="mgr-calendar-sidebar">
              <div className="mgr-sidebar-date-header">
                <div className="mgr-sidebar-date">
                  <span className="mgr-sidebar-date-day">
                    {new Date(year, month, selectedDay).toLocaleDateString('en-US', { weekday: 'long' })}, {monthNames[month]} {selectedDay}, {year}
                  </span>
                  {selectedDay === today && month === 4 && year === 2026 && <span className="mgr-sidebar-today">Today</span>}
                </div>
              </div>

              <div className="mgr-sidebar-total">
                <div className="mgr-sidebar-total-label">Total with Absence Events</div>
                <div className="mgr-sidebar-total-value">{todayEmployees.length} employee{todayEmployees.length !== 1 ? 's' : ''}</div>
              </div>

              <div className="mgr-sidebar-stat-row">
                <div className="mgr-sidebar-stat">
                  <div className="mgr-sidebar-stat-label">Full Day</div>
                  <div className="mgr-sidebar-stat-value">{fullDay}</div>
                </div>
                <div className="mgr-sidebar-stat">
                  <div className="mgr-sidebar-stat-label">Partial Day</div>
                  <div className="mgr-sidebar-stat-value">{partial}</div>
                </div>
                <div className="mgr-sidebar-stat">
                  <div className="mgr-sidebar-stat-label">Returning</div>
                  <div className="mgr-sidebar-stat-value">{returning}</div>
                </div>
              </div>

              <div className="mgr-sidebar-employees">
                {todayEmployees.length === 0 && (
                  <div className="mgr-empty-state" style={{ padding: 20, fontSize: 13 }}>No absences on this date.</div>
                )}
                {todayEmployees.map((emp) => {
                  const blockType = getBlocks(emp.id)[selectedDay - 1];
                  return (
                    <div className="mgr-sidebar-employee-card" key={emp.id}>
                      <div className="mgr-sidebar-employee-card-header">
                        <div>
                          <div className="mgr-sidebar-employee-name">{emp.name}</div>
                          <div className="mgr-sidebar-employee-type">{emp.type}</div>
                        </div>
                        {emp.ada && <span className="mgr-ada-tag">ADA</span>}
                        {blockType === 3 && <span className="mgr-returning-badge"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#2e7d5e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> Returning</span>}
                      </div>
                      <div className="mgr-sidebar-employee-meta">
                        {emp.timeframe && blockType !== 3 ? (
                          <div><strong>Timeframe Missed</strong>{emp.timeframe}</div>
                        ) : (
                          <>
                            <div><strong>Start & End Dates</strong>{emp.dates}</div>
                            <div><strong>Return</strong>{emp.returnDate}</div>
                          </>
                        )}
                      </div>
                      <button className="mgr-btn mgr-btn-outline mgr-btn-sm" onClick={() => navigate(`/manager/my-team/${emp.id}`)}>View Details</button>
                    </div>
                  );
                })}
              </div>

              {returning > 0 && (
                <button
                  className="mgr-btn mgr-btn-primary mgr-sidebar-rtw-btn"
                  onClick={() => navigate('/manager/return-to-work?employee=amy-smith')}
                >
                  Confirm Return to Work Details
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {hoveredCell && (
        <div
          className="mgr-cal-tooltip"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <strong>{hoveredCell.employee}</strong>
          <span>{monthNames[month]} {hoveredCell.day}, {year}</span>
          <span className="mgr-cal-tooltip-type">{hoveredCell.type}</span>
        </div>
      )}

      {/* Mobile day-focused view */}
      <div className="mgr-cal-mobile">
        <div className="mgr-cal-mobile-body">
          <div className="mgr-cal-mobile-nav">
            <button className="mgr-cal-mobile-arrow" onClick={() => setSelectedDay(Math.max(1, selectedDay - 1))} aria-label="Previous day">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="mgr-cal-mobile-date">
              <span className="mgr-cal-mobile-date-text">
                {new Date(year, month, selectedDay).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              {selectedDay === today && month === 4 && year === 2026 && <span className="mgr-sidebar-today">Today</span>}
            </div>
            <button className="mgr-cal-mobile-arrow" onClick={() => setSelectedDay(Math.min(dayColumns.length, selectedDay + 1))} aria-label="Next day">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          <div className="mgr-cal-mobile-summary">
            <span className="mgr-cal-mobile-summary-total">{todayEmployees.length} employee{todayEmployees.length !== 1 ? 's' : ''} with absences</span>
            <div className="mgr-cal-mobile-summary-breakdown">
              {fullDay > 0 && <span>{fullDay} Full Day</span>}
              {partial > 0 && <span>{partial} Partial</span>}
              {returning > 0 && <span>{returning} Returning</span>}
            </div>
          </div>

          <div className="mgr-cal-mobile-legend">
            <div className="mgr-calendar-legend-item"><span className="mgr-legend-dot mgr-legend-dot--full" />Full Day</div>
            <div className="mgr-calendar-legend-item"><span className="mgr-legend-dot mgr-legend-dot--partial" />Partial</div>
            <div className="mgr-calendar-legend-item"><span className="mgr-legend-dot mgr-legend-dot--returning" />Returning</div>
          </div>

          <div className="mgr-cal-mobile-list">
            {todayEmployees.length === 0 && (
              <div className="mgr-cal-mobile-empty">No absences on this date.</div>
            )}
            {todayEmployees.map((emp) => {
              const blockType = getBlocks(emp.id)[selectedDay - 1];
              return (
                <div className="mgr-cal-mobile-card" key={emp.id} onClick={() => navigate(`/manager/my-team/${emp.id}`)}>
                  <div className="mgr-cal-mobile-card-left">
                    <div className={`mgr-cal-mobile-indicator mgr-cal-mobile-indicator--${blockType === 1 ? 'full' : blockType === 2 ? 'partial' : 'returning'}`} />
                    <EmployeeAvatar emp={emp} size="mobile" />
                  </div>
                  <div className="mgr-cal-mobile-card-content">
                    <div className="mgr-cal-mobile-card-name">
                      {emp.name}
                      {emp.ada && <span className="mgr-ada-tag">ADA</span>}
                    </div>
                    <div className="mgr-cal-mobile-card-meta">
                      <span className="mgr-cal-mobile-card-type">{emp.type}</span>
                      <span className="mgr-cal-mobile-card-status">{blockLabels[blockType]}</span>
                    </div>
                    <div className="mgr-cal-mobile-card-dates">{emp.dates}</div>
                  </div>
                  <svg className="mgr-cal-mobile-card-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              );
            })}
          </div>

          {returning > 0 && (
            <button
              className="mgr-btn mgr-btn-primary mgr-cal-mobile-rtw-btn"
              onClick={() => navigate('/manager/return-to-work?employee=amy-smith')}
            >
              Confirm Return to Work Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
