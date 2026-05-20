import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const employees = [
  { id: 'chris-jones', name: 'Chris Jones', type: 'Continuous leave', ada: false, dates: 'Jan 1 - Jan 30', returnDate: 'Feb 3', timeframe: null, blocks: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] },
  { id: 'morgan-lee', name: 'Morgan Lee', type: 'Intermittent leave', ada: true, dates: 'Dec 4 - Feb 4', returnDate: 'N/A', timeframe: '12pm - 5pm', blocks: [0,0,0,1,1,0,1,0,1,1,0,1,0,0,0] },
  { id: 'michael-chen', name: 'Michael Chen', type: 'Reduced schedule leave', ada: false, dates: 'Oct 30 - N/A', returnDate: 'N/A', timeframe: null, blocks: [0,0,0,0,0,0,0,0,0,0,0,2,2,2,2] },
  { id: 'kathrine-anderson', name: 'Katherine Anderson', type: 'Intermittent leave', ada: true, dates: 'Nov 15 - Jan 31', returnDate: 'N/A', timeframe: null, blocks: [2,0,2,0,2,0,2,0,0,0,0,0,0,0,0] },
  { id: 'amy-smith', name: 'Amy Smith', type: 'Continuous leave', ada: false, dates: 'Jan 1 - Jan 11', returnDate: 'Jan 12', timeframe: null, blocks: [1,1,1,1,1,1,1,1,1,1,1,1,3,0,0] },
];

const daysOfWeek = ['Thu','Fri','Sat','Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun','Mon','Tue','Wed','Thu'];
const dayNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

const blockLabels = { 1: 'Out Full Day', 2: 'Partially Missed Day', 3: 'Returning to Work' };
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function AbsenceCalendarPage() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(12);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef(null);

  const todayEmployees = employees.filter(e => e.blocks[selectedDay - 1] > 0);
  const fullDay = todayEmployees.filter(e => e.blocks[selectedDay - 1] === 1).length;
  const partial = todayEmployees.filter(e => e.blocks[selectedDay - 1] === 2).length;
  const returning = todayEmployees.filter(e => e.blocks[selectedDay - 1] === 3).length;

  function handleCellHover(e, emp, dayIdx) {
    const block = emp.blocks[dayIdx];
    if (block === 0) { setHoveredCell(null); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top - 8 });
    setHoveredCell({ employee: emp.name, day: dayNumbers[dayIdx], type: blockLabels[block], empId: emp.id });
  }

  function getDateLabel(day) {
    const date = new Date(2026, 0, day);
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
        </div>

        <div className="mgr-calendar-container">
          <div className="mgr-calendar-grid">
            <div className="mgr-calendar-header">
              <button className="mgr-calendar-nav" aria-label="Previous month">&lsaquo;</button>
              <span className="mgr-calendar-month">January 2026</span>
              <button className="mgr-calendar-nav" aria-label="Next month">&rsaquo;</button>
            </div>
            <table className="mgr-calendar-table">
              <thead>
                <tr>
                  <th className="mgr-cal-employee-col">EMPLOYEES</th>
                  {daysOfWeek.map((d, i) => (
                    <th
                      key={i}
                      className={`mgr-cal-day-header${dayNumbers[i] === selectedDay ? ' today' : ''}${dayNumbers[i] === selectedDay ? ' selected' : ''}`}
                      onClick={() => setSelectedDay(dayNumbers[i])}
                      title={getDateLabel(dayNumbers[i])}
                    >
                      <span className="mgr-cal-day-name">{d}</span>
                      <span className="mgr-cal-day-num">{dayNumbers[i]}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, empIdx) => (
                  <tr
                    key={emp.id}
                    className={`mgr-cal-row${hoveredRow === empIdx ? ' hovered' : ''}`}
                    onMouseEnter={() => setHoveredRow(empIdx)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="mgr-cal-employee-cell" onClick={() => navigate(`/manager/my-team/${emp.id}`)}>
                      <div className="mgr-cal-employee-info">
                        <img
                          className="mgr-cal-employee-avatar"
                          src={`https://i.pravatar.cc/68?u=${emp.id}`}
                          alt={emp.name}
                        />
                        <div>
                          <div className="mgr-cal-employee-name">
                            {emp.name}
                            {emp.ada && <span className="mgr-ada-tag">ADA</span>}
                          </div>
                          <div className="mgr-cal-employee-type">{emp.type}</div>
                        </div>
                      </div>
                    </td>
                    {emp.blocks.map((block, dayIdx) => (
                      <td
                        key={dayIdx}
                        className={`mgr-cal-block-cell${dayNumbers[dayIdx] === selectedDay ? ' selected-col' : ''}`}
                        onMouseEnter={(e) => handleCellHover(e, emp, dayIdx)}
                        onMouseLeave={() => setHoveredCell(null)}
                        onClick={() => setSelectedDay(dayNumbers[dayIdx])}
                      >
                        {block === 1 && <div className="mgr-calendar-block mgr-calendar-block--full" />}
                        {block === 2 && <div className="mgr-calendar-block mgr-calendar-block--partial" />}
                        {block === 3 && (
                          <div className="mgr-calendar-block mgr-calendar-block--returning">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#555" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mgr-calendar-sidebar">
            <div className="mgr-sidebar-date-header">
              <div className="mgr-sidebar-date">
                {getDateLabel(selectedDay).split(',')[0]},
                <span className="mgr-sidebar-date-day"> January {selectedDay}, 2026</span>
                {selectedDay === 12 && <span className="mgr-sidebar-today">Today</span>}
              </div>
              <div className="mgr-sidebar-day">{new Date(2026, 0, selectedDay).toLocaleDateString('en-US', { weekday: 'long' })}</div>
            </div>

            <div className="mgr-sidebar-total">
              <div className="mgr-sidebar-total-label">Total with Absence Events Today</div>
              <div className="mgr-sidebar-total-value">{todayEmployees.length} employee{todayEmployees.length !== 1 ? 's' : ''}</div>
            </div>

            <div className="mgr-sidebar-stat-row">
              <div className="mgr-sidebar-stat">
                <div className="mgr-sidebar-stat-label">Full Day</div>
                <div className="mgr-sidebar-stat-value">{fullDay} employee{fullDay !== 1 ? 's' : ''}</div>
              </div>
              <div className="mgr-sidebar-stat">
                <div className="mgr-sidebar-stat-label">Partial Day</div>
                <div className="mgr-sidebar-stat-value">{partial} employee{partial !== 1 ? 's' : ''}</div>
              </div>
              <div className="mgr-sidebar-stat">
                <div className="mgr-sidebar-stat-label">Returning</div>
                <div className="mgr-sidebar-stat-value">{returning} employee{returning !== 1 ? 's' : ''}</div>
              </div>
            </div>

            <div className="mgr-sidebar-employees">
              {todayEmployees.map((emp) => {
                const blockType = emp.blocks[selectedDay - 1];
                return (
                  <div className="mgr-sidebar-employee-card" key={emp.id}>
                    <div className="mgr-sidebar-employee-card-header">
                      <div>
                        <div className="mgr-sidebar-employee-name">{emp.name}</div>
                        <div className="mgr-sidebar-employee-type">{emp.type}</div>
                      </div>
                      {emp.ada && <span className="mgr-ada-tag">ADA</span>}
                      {blockType === 3 && <span className="mgr-returning-badge"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="1" y="1" width="8" height="8" stroke="#555" strokeWidth="1.2"/></svg> Returning to work</span>}
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
        </div>
      </div>

      {/* Tooltip */}
      {hoveredCell && (
        <div
          className="mgr-cal-tooltip"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
          ref={tooltipRef}
        >
          <strong>{hoveredCell.employee}</strong>
          <span>Jan {hoveredCell.day}, 2026</span>
          <span className="mgr-cal-tooltip-type">{hoveredCell.type}</span>
        </div>
      )}
    </div>
  );
}
