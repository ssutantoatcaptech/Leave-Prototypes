import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const employees = [
  { name: 'Chris Jones', type: 'Continuous leave', dates: 'Jan 1 - Jan 30', returnDate: 'Feb 3', blocks: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] },
  { name: 'Morgan Lee', type: 'Intermittent leave', ada: true, dates: 'Dec 4 - Feb 4', returnDate: 'N/A', blocks: [0,0,0,1,1,0,1,0,1,1,0,1,0,0,0] },
  { name: 'Michael Chen', type: 'Reduced schedule leave', dates: 'Oct 30 - N/A', returnDate: 'N/A', blocks: [0,0,0,0,0,0,0,0,0,0,0,2,2,2,2] },
  { name: 'Katherine Anderson', type: 'Intermittent leave', ada: true, dates: 'Nov 15 - Jan 31', returnDate: 'N/A', blocks: [2,0,2,0,2,0,2,0,0,0,0,0,0,0,0] },
  { name: 'Amy Smith', type: 'Continuous leave', dates: 'Jan 1 - Jan 11', returnDate: 'Jan 12', blocks: [1,1,1,1,1,1,1,1,1,1,1,1,3,0,0] },
];

const daysOfWeek = ['Thu','Fri','Sat','Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun','Mon','Tue','Wed','Thu'];
const dayNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

export default function AbsenceCalendarPage() {
  const navigate = useNavigate();
  const [selectedDay] = useState(12);

  const todayEmployees = employees.filter(e => e.blocks[selectedDay - 1] > 0);
  const fullDay = todayEmployees.filter(e => e.blocks[selectedDay - 1] === 1).length;
  const partial = todayEmployees.filter(e => e.blocks[selectedDay - 1] === 2).length;
  const returning = todayEmployees.filter(e => e.blocks[selectedDay - 1] === 3).length;

  return (
    <div className="mgr-page">
      <h1 className="mgr-page-title">Absence Calendar</h1>
      <p className="mgr-page-subtitle">
        View absences for employees on your team with active leaves, this calendar does not reflect all employees on your team or employees taking vacation or sick time. Click any date to see more details for employees with absences that day.
      </p>

      <div className="mgr-card">
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
              <button className="mgr-calendar-nav">&lsaquo;</button>
              <span className="mgr-calendar-month">January 2026</span>
              <button className="mgr-calendar-nav">&rsaquo;</button>
            </div>
            <table className="mgr-calendar-table">
              <thead>
                <tr>
                  <th style={{ minWidth: 160 }}>EMPLOYEES</th>
                  {daysOfWeek.map((d, i) => (
                    <th key={i} className={dayNumbers[i] === selectedDay ? 'today' : ''}>
                      {d}<br/>{dayNumbers[i]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.name}>
                    <td className="employee-name">
                      {emp.name}
                      {emp.ada && <span className="mgr-ada-tag">ADA</span>}
                      <br/><span className="sub">{emp.type}</span>
                    </td>
                    {emp.blocks.map((block, i) => (
                      <td key={i}>
                        {block === 1 && <div className="mgr-calendar-block mgr-calendar-block--full" />}
                        {block === 2 && <div className="mgr-calendar-block mgr-calendar-block--partial" />}
                        {block === 3 && <div className="mgr-calendar-block mgr-calendar-block--returning">&#9733;</div>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mgr-calendar-sidebar">
            <div className="mgr-sidebar-date">
              January 12, 2026
              <span className="mgr-sidebar-today">Today</span>
            </div>
            <div className="mgr-sidebar-day">Monday</div>

            <div className="mgr-sidebar-total">
              <div className="mgr-sidebar-total-label">Total with Absence Events Today</div>
              <div className="mgr-sidebar-total-value">{todayEmployees.length} employees</div>
            </div>

            <div className="mgr-sidebar-stat-row">
              <div className="mgr-sidebar-stat">
                <div className="mgr-sidebar-stat-label">Full Day</div>
                <div className="mgr-sidebar-stat-value">{fullDay} employee</div>
              </div>
              <div className="mgr-sidebar-stat">
                <div className="mgr-sidebar-stat-label">Partial Day</div>
                <div className="mgr-sidebar-stat-value">{partial} employees</div>
              </div>
              <div className="mgr-sidebar-stat">
                <div className="mgr-sidebar-stat-label">Returning</div>
                <div className="mgr-sidebar-stat-value">{returning} employee</div>
              </div>
            </div>

            <div className="mgr-sidebar-employee-card">
              <div className="mgr-sidebar-employee-card-header">
                <div>
                  <div className="mgr-sidebar-employee-name">Chris Jones</div>
                  <div className="mgr-sidebar-employee-type">Continuous leave</div>
                </div>
              </div>
              <div className="mgr-sidebar-employee-meta">
                <div><strong>Start & End Dates</strong>Jan 1 - Jan 30</div>
                <div><strong>Return</strong>Feb 3</div>
              </div>
              <button className="mgr-btn mgr-btn-outline mgr-btn-sm" style={{ marginTop: 10 }} onClick={() => navigate('/manager/my-team/chris-jones')}>View Details</button>
            </div>

            <div className="mgr-sidebar-employee-card">
              <div className="mgr-sidebar-employee-card-header">
                <div>
                  <div className="mgr-sidebar-employee-name">Morgan Lee</div>
                  <div className="mgr-sidebar-employee-type">Intermittent leave</div>
                </div>
                <span className="mgr-ada-tag">ADA</span>
              </div>
              <div className="mgr-sidebar-employee-meta">
                <div><strong>Timeframe Missed</strong>12pm - 5pm</div>
              </div>
              <button className="mgr-btn mgr-btn-outline mgr-btn-sm" style={{ marginTop: 10 }} onClick={() => navigate('/manager/my-team/morgan-lee')}>View Details</button>
            </div>

            <div className="mgr-sidebar-employee-card">
              <div className="mgr-sidebar-employee-card-header">
                <div>
                  <div className="mgr-sidebar-employee-name">Amy Smith</div>
                  <div className="mgr-sidebar-employee-type">Continuous leave</div>
                </div>
                <span className="mgr-returning-badge">&#9632; Returning to work</span>
              </div>
              <div className="mgr-sidebar-employee-meta">
                <div><strong>Start & End Dates</strong>Jan 1 - Jan 11</div>
                <div><strong>Return</strong>Jan 12</div>
              </div>
              <button className="mgr-btn mgr-btn-outline mgr-btn-sm" style={{ marginTop: 10 }} onClick={() => navigate('/manager/my-team/amy-smith')}>View Details</button>
            </div>

            <button className="mgr-btn mgr-btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/manager/return-to-work')}>
              Confirm Return to Work Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
