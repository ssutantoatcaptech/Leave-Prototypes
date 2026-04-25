import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getAbsenceDetailCase } from '../../data/overviewData';
import '../overview/overview-react.css';
import './return-to-work.css';

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
            <a>Phone: 1-800-HR-HELP</a><a>Email: hrbenefits@company.com</a><a>Hours: Mon–Fri, 8am–6pm EST</a>
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

function formatDate(isoDate) {
  if (!isoDate) return 'TBD';
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getDaysRemaining(endDate) {
  if (!endDate) return 0;
  const end = new Date(`${endDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.ceil((end - today) / 86400000);
  return Math.max(0, diff);
}

function WelcomeView({ caseData, onContinue, onBack }) {
  return (
    <>
      <button className="rtw-back" type="button" onClick={onBack}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Back to Absence Details
      </button>

      <div className="rtw-welcome-card">
        <h1 className="rtw-title">Welcome Back</h1>
        <p className="rtw-subtitle">
          We're glad you're preparing to return. Here's what to expect so you can be ready before confirming your return to work.
        </p>

        <div className="rtw-leave-context">
          <div className="rtw-leave-context-info">
            <span className="rtw-leave-context-title">{caseData.title}</span>
            <span className="rtw-leave-context-sep" />
            <span className="rtw-leave-context-id">{caseData.id}</span>
          </div>
          <span className="rtw-badge approved">{caseData.status}</span>
        </div>

        <div className="rtw-steps-container">
          <h3 className="rtw-card-title">What you'll need to complete</h3>
          <ol className="rtw-steps-list">
            <li className="rtw-step-item">
              <div className="rtw-step-num">1</div>
              <div className="rtw-step-text">
                <h4>Confirm your return date</h4>
                <p>Verify or update when you plan to come back to work.</p>
              </div>
            </li>
            <li className="rtw-step-item">
              <div className="rtw-step-num">2</div>
              <div className="rtw-step-text">
                <h4>Set your work schedule</h4>
                <p>Choose to return full-time or ease back in with a gradual schedule.</p>
              </div>
            </li>
            <li className="rtw-step-item">
              <div className="rtw-step-num">3</div>
              <div className="rtw-step-text">
                <h4>Medical clearance &amp; accommodations</h4>
                <p>Provide clearance documents if needed and request any workplace adjustments.</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="rtw-info-note">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#525252" strokeWidth="1.2"/><path d="M8 5v3" stroke="#525252" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="11" r="0.6" fill="#525252"/></svg>
          Once confirmed, your manager and absence administrator will be notified of your return plan.
        </div>

        <button className="rtw-btn-primary rtw-btn-full" type="button" onClick={onContinue}>
          Continue to Confirm Return
        </button>
      </div>
    </>
  );
}

function ConfirmView({ caseData, rtwState, setRtwState, done, setDone, editing, setEditing, snapshot, setSnapshot, onSubmit, onBack, initialOpenStep = 'date' }) {
  const [openStep, setOpenStep] = useState(initialOpenStep);
  const daysRemaining = getDaysRemaining(caseData.endDate);
  const completedCount = [done.date, done.schedule, done.clearance].filter(Boolean).length;
  const allRequiredDone = done.date && done.schedule && done.clearance;

  function saveStep(stepKey) {
    setDone((prev) => ({ ...prev, [stepKey]: true }));
    setEditing(null);
    setSnapshot(null);
    const order = ['date', 'schedule', 'clearance', 'accommodations'];
    const nextIndex = order.indexOf(stepKey) + 1;
    if (nextIndex < order.length && !done[order[nextIndex]]) {
      setOpenStep(order[nextIndex]);
    } else {
      setOpenStep(null);
    }
  }

  function startEdit(stepKey) {
    setSnapshot({ ...rtwState });
    setEditing(stepKey);
    setOpenStep(stepKey);
  }

  function discardEdit() {
    if (snapshot) setRtwState(snapshot);
    setEditing(null);
    setSnapshot(null);
    setOpenStep(null);
  }

  function toggleStep(stepKey) {
    if (editing) return;
    setOpenStep((current) => (current === stepKey ? null : stepKey));
  }

  function stepTag(stepKey, isOptional) {
    if (done[stepKey]) return <span className="rtw-tag done">DONE</span>;
    if (isOptional) return <span className="rtw-tag optional">OPTIONAL</span>;
    return <span className="rtw-tag todo">TO DO</span>;
  }

  function stepSummary(stepKey) {
    if (!done[stepKey]) return null;
    if (stepKey === 'date') {
      const dateToShow = rtwState.returnDateChange ? rtwState.newReturnDate : rtwState.returnDate;
      return formatDate(dateToShow);
    }
    if (stepKey === 'schedule') {
      if (rtwState.scheduleType === 'full') return 'Full schedule';
      return `Gradual return — ${rtwState.gradualStartHours} hrs/week for ${rtwState.gradualWeeks} weeks`;
    }
    if (stepKey === 'clearance') {
      if (!rtwState.needsClearance) return 'Not applicable';
      return `Clearance from ${rtwState.clearanceProvider}`;
    }
    if (stepKey === 'accommodations') {
      if (!rtwState.needsAccommodations) return 'No accommodations needed';
      return `${rtwState.accommodationType} requested`;
    }
    return null;
  }

  return (
    <>
      <button className="rtw-back" type="button" onClick={onBack}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Back
      </button>

      <div className="rtw-confirm-card">
      <div className="rtw-confirm-header">
        <h2>Confirm Your Return</h2>
        <div className="rtw-confirm-meta">
          <span>Return date: {formatDate(rtwState.returnDate)}</span>
          <span>{daysRemaining} days remaining</span>
        </div>
      </div>

      <div className="rtw-progress-wrap">
        <div className="rtw-progress-label">{completedCount} of 3 completed</div>
        <div className="rtw-progress-track">
          <div className="rtw-progress-fill" style={{ width: `${(completedCount / 3) * 100}%` }} />
        </div>
      </div>

      <div className="rtw-leave-context">
        <div className="rtw-leave-context-info">
          <span className="rtw-leave-context-title">{caseData.title}</span>
          <span className="rtw-leave-context-sep" />
          <span className="rtw-leave-context-id">{caseData.id}</span>
        </div>
        <span className="rtw-badge approved">{caseData.status}</span>
      </div>

      <div className={`rtw-accordion ${openStep === 'date' ? 'open' : ''}`}>
        <button className="rtw-accordion-header" type="button" onClick={() => toggleStep('date')}>
          <div className={`rtw-accordion-num ${done.date ? 'done' : ''}`}>
            {done.date ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 7l2.5 2.5L10.5 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : '1'}
          </div>
          <div className="rtw-accordion-info">
            <div className="rtw-accordion-title">Return date</div>
            {done.date && openStep !== 'date' && <div className="rtw-accordion-summary">{stepSummary('date')}</div>}
          </div>
          {stepTag('date', false)}
          {done.date && editing !== 'date' && <button className="rtw-accordion-edit" type="button" onClick={(e) => { e.stopPropagation(); startEdit('date'); }}>Edit</button>}
        </button>
        {openStep === 'date' && (
          <div className="rtw-accordion-body">
            <div className="rtw-date-card">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="13" rx="2" stroke="#525252" strokeWidth="1.3"/><path d="M2 7h14" stroke="#525252" strokeWidth="1.3"/><path d="M6 1v4M12 1v4" stroke="#525252" strokeWidth="1.3" strokeLinecap="round"/></svg>
              <div>
                <div className="rtw-date-card-label">Current return date</div>
                <div className="rtw-date-card-value">{formatDate(rtwState.returnDate)}</div>
              </div>
            </div>

            <div className="rtw-radio-group">
              <label className={`rtw-radio-item ${!rtwState.returnDateChange ? 'selected' : ''}`}>
                <input type="radio" name="dateChange" checked={!rtwState.returnDateChange} onChange={() => setRtwState((s) => ({ ...s, returnDateChange: false }))} />
                <div className="rtw-radio-label">
                  <div className="rtw-radio-label-text">No, I'll return on {formatDate(rtwState.returnDate)}</div>
                </div>
              </label>
              <label className={`rtw-radio-item ${rtwState.returnDateChange ? 'selected' : ''}`}>
                <input type="radio" name="dateChange" checked={rtwState.returnDateChange} onChange={() => setRtwState((s) => ({ ...s, returnDateChange: true }))} />
                <div className="rtw-radio-label">
                  <div className="rtw-radio-label-text">Yes, I need a different date</div>
                </div>
              </label>
            </div>

            {rtwState.returnDateChange && (
              <div className="rtw-reveal">
                <div className="rtw-input-group">
                  <label htmlFor="rtw-new-date">New return date</label>
                  <input id="rtw-new-date" type="date" value={rtwState.newReturnDate} onChange={(e) => setRtwState((s) => ({ ...s, newReturnDate: e.target.value }))} />
                </div>
              </div>
            )}

            <div className="rtw-actions">
              {editing === 'date' && <button className="rtw-btn-discard" type="button" onClick={discardEdit}>Discard</button>}
              <button className="rtw-btn-save" type="button" onClick={() => saveStep('date')}>Save</button>
            </div>
          </div>
        )}
      </div>

      <div className={`rtw-accordion ${openStep === 'schedule' ? 'open' : ''}`}>
        <button className="rtw-accordion-header" type="button" onClick={() => toggleStep('schedule')}>
          <div className={`rtw-accordion-num ${done.schedule ? 'done' : ''}`}>
            {done.schedule ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 7l2.5 2.5L10.5 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : '2'}
          </div>
          <div className="rtw-accordion-info">
            <div className="rtw-accordion-title">Work schedule</div>
            {done.schedule && openStep !== 'schedule' && <div className="rtw-accordion-summary">{stepSummary('schedule')}</div>}
          </div>
          {stepTag('schedule', false)}
          {done.schedule && editing !== 'schedule' && <button className="rtw-accordion-edit" type="button" onClick={(e) => { e.stopPropagation(); startEdit('schedule'); }}>Edit</button>}
        </button>
        {openStep === 'schedule' && (
          <div className="rtw-accordion-body">
            <p className="rtw-field-desc">You can return to your full schedule right away or ease in gradually.</p>

            <div className="rtw-radio-group">
              <label className={`rtw-radio-item ${rtwState.scheduleType === 'full' ? 'selected' : ''}`}>
                <input type="radio" name="schedule" checked={rtwState.scheduleType === 'full'} onChange={() => setRtwState((s) => ({ ...s, scheduleType: 'full' }))} />
                <div className="rtw-radio-label">
                  <div className="rtw-radio-label-text">Return to full schedule</div>
                  <div className="rtw-radio-label-hint">40 hrs/week</div>
                </div>
              </label>
              <label className={`rtw-radio-item ${rtwState.scheduleType === 'gradual' ? 'selected' : ''}`}>
                <input type="radio" name="schedule" checked={rtwState.scheduleType === 'gradual'} onChange={() => setRtwState((s) => ({ ...s, scheduleType: 'gradual' }))} />
                <div className="rtw-radio-label">
                  <div className="rtw-radio-label-text">Gradual return</div>
                  <div className="rtw-radio-label-hint">Start with fewer hours and ramp up</div>
                </div>
              </label>
            </div>

            {rtwState.scheduleType === 'gradual' && (
              <div className="rtw-reveal">
                <div className="rtw-input-group">
                  <label htmlFor="rtw-start-hours">Starting hours per week</label>
                  <input id="rtw-start-hours" type="number" value={rtwState.gradualStartHours} onChange={(e) => setRtwState((s) => ({ ...s, gradualStartHours: e.target.value }))} />
                </div>
                <div className="rtw-input-group">
                  <label htmlFor="rtw-grad-weeks">Weeks to full schedule</label>
                  <input id="rtw-grad-weeks" type="number" value={rtwState.gradualWeeks} onChange={(e) => setRtwState((s) => ({ ...s, gradualWeeks: e.target.value }))} />
                </div>
              </div>
            )}

            <div className="rtw-actions">
              {editing === 'schedule' && <button className="rtw-btn-discard" type="button" onClick={discardEdit}>Discard</button>}
              <button className="rtw-btn-save" type="button" disabled={!rtwState.scheduleType} onClick={() => saveStep('schedule')}>Save</button>
            </div>
          </div>
        )}
      </div>

      <div className={`rtw-accordion ${openStep === 'clearance' ? 'open' : ''}`}>
        <button className="rtw-accordion-header" type="button" onClick={() => toggleStep('clearance')}>
          <div className={`rtw-accordion-num ${done.clearance ? 'done' : ''}`}>
            {done.clearance ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 7l2.5 2.5L10.5 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : '3'}
          </div>
          <div className="rtw-accordion-info">
            <div className="rtw-accordion-title">Medical clearance</div>
            {done.clearance && openStep !== 'clearance' && <div className="rtw-accordion-summary">{stepSummary('clearance')}</div>}
          </div>
          {stepTag('clearance', false)}
          {done.clearance && editing !== 'clearance' && <button className="rtw-accordion-edit" type="button" onClick={(e) => { e.stopPropagation(); startEdit('clearance'); }}>Edit</button>}
        </button>
        {openStep === 'clearance' && (
          <div className="rtw-accordion-body">
            <p className="rtw-field-desc">Some absences require a fitness-for-duty clearance from your healthcare provider before returning to work.</p>

            <div className="rtw-radio-group">
              <label className={`rtw-radio-item ${rtwState.needsClearance === true ? 'selected' : ''}`}>
                <input type="radio" name="clearance" checked={rtwState.needsClearance === true} onChange={() => setRtwState((s) => ({ ...s, needsClearance: true }))} />
                <div className="rtw-radio-label">
                  <div className="rtw-radio-label-text">I have or will have clearance</div>
                </div>
              </label>
              <label className={`rtw-radio-item ${rtwState.needsClearance === false ? 'selected' : ''}`}>
                <input type="radio" name="clearance" checked={rtwState.needsClearance === false} onChange={() => setRtwState((s) => ({ ...s, needsClearance: false }))} />
                <div className="rtw-radio-label">
                  <div className="rtw-radio-label-text">Not applicable</div>
                </div>
              </label>
            </div>

            {rtwState.needsClearance && (
              <div className="rtw-reveal">
                <div className="rtw-input-group">
                  <label htmlFor="rtw-provider">Provider name</label>
                  <input id="rtw-provider" type="text" value={rtwState.clearanceProvider} onChange={(e) => setRtwState((s) => ({ ...s, clearanceProvider: e.target.value }))} />
                </div>
                <div className="rtw-input-group">
                  <label htmlFor="rtw-clearance-date">Expected date</label>
                  <input id="rtw-clearance-date" type="date" value={rtwState.clearanceDate} onChange={(e) => setRtwState((s) => ({ ...s, clearanceDate: e.target.value }))} />
                </div>
                {rtwState.clearanceUploaded && (
                  <div className="rtw-uploaded-badge">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 7l2.5 2.5L10.5 4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Return to Work Clearance uploaded
                  </div>
                )}
              </div>
            )}

            <div className="rtw-actions">
              {editing === 'clearance' && <button className="rtw-btn-discard" type="button" onClick={discardEdit}>Discard</button>}
              <button className="rtw-btn-save" type="button" onClick={() => saveStep('clearance')}>Save</button>
            </div>
          </div>
        )}
      </div>

      <div className={`rtw-accordion ${openStep === 'accommodations' ? 'open' : ''}`}>
        <button className="rtw-accordion-header" type="button" onClick={() => toggleStep('accommodations')}>
          <div className={`rtw-accordion-num ${done.accommodations ? 'done' : ''}`}>
            {done.accommodations ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 7l2.5 2.5L10.5 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : '4'}
          </div>
          <div className="rtw-accordion-info">
            <div className="rtw-accordion-title">Workplace accommodations</div>
            {done.accommodations && openStep !== 'accommodations' && <div className="rtw-accordion-summary">{stepSummary('accommodations')}</div>}
          </div>
          {stepTag('accommodations', !done.accommodations)}
          {done.accommodations && editing !== 'accommodations' && <button className="rtw-accordion-edit" type="button" onClick={(e) => { e.stopPropagation(); startEdit('accommodations'); }}>Edit</button>}
        </button>
        {openStep === 'accommodations' && (
          <div className="rtw-accordion-body">
            <p className="rtw-field-desc">Let us know if you need any workplace adjustments when you return.</p>

            <div className="rtw-radio-group">
              <label className={`rtw-radio-item ${rtwState.needsAccommodations === false ? 'selected' : ''}`}>
                <input type="radio" name="accommodations" checked={rtwState.needsAccommodations === false} onChange={() => setRtwState((s) => ({ ...s, needsAccommodations: false }))} />
                <div className="rtw-radio-label">
                  <div className="rtw-radio-label-text">No accommodations needed</div>
                </div>
              </label>
              <label className={`rtw-radio-item ${rtwState.needsAccommodations === true ? 'selected' : ''}`}>
                <input type="radio" name="accommodations" checked={rtwState.needsAccommodations === true} onChange={() => setRtwState((s) => ({ ...s, needsAccommodations: true }))} />
                <div className="rtw-radio-label">
                  <div className="rtw-radio-label-text">I need accommodations</div>
                </div>
              </label>
            </div>

            {rtwState.needsAccommodations && (
              <div className="rtw-reveal">
                <div className="rtw-input-group">
                  <label htmlFor="rtw-accom-type">Type</label>
                  <select id="rtw-accom-type" value={rtwState.accommodationType} onChange={(e) => setRtwState((s) => ({ ...s, accommodationType: e.target.value }))}>
                    <option value="">Select type...</option>
                    <option value="Modified duties">Modified duties</option>
                    <option value="Ergonomic adjustments">Ergonomic adjustments</option>
                    <option value="Flexible schedule">Flexible schedule</option>
                    <option value="Remote work">Remote work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="rtw-input-group">
                  <label htmlFor="rtw-accom-details">Description</label>
                  <textarea id="rtw-accom-details" value={rtwState.accommodationDetails} onChange={(e) => setRtwState((s) => ({ ...s, accommodationDetails: e.target.value }))} placeholder="Describe any workplace adjustments you need..." />
                </div>
              </div>
            )}

            <div className="rtw-actions">
              {editing === 'accommodations' && <button className="rtw-btn-discard" type="button" onClick={discardEdit}>Discard</button>}
              <button className="rtw-btn-save" type="button" disabled={rtwState.needsAccommodations === null} onClick={() => saveStep('accommodations')}>Save</button>
            </div>
          </div>
        )}
      </div>

      <div className="rtw-submit-area">
        <button className="rtw-btn-primary rtw-btn-full" type="button" disabled={!allRequiredDone} onClick={onSubmit}>
          Confirm Return to Work
        </button>
      </div>
      </div>
    </>
  );
}

function SuccessView({ rtwState }) {
  const returnDate = rtwState.returnDateChange && rtwState.newReturnDate ? rtwState.newReturnDate : rtwState.returnDate;
  const schedule = rtwState.scheduleType === 'full' ? 'Full schedule' : `Gradual — ${rtwState.gradualStartHours} hrs/week`;
  const confirmationNumber = `RTW-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  return (
    <div className="rtw-success-card">
      <div className="rtw-success-icon">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M7 14l5 5L21 9" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <h2 className="rtw-success-title">Return to Work Confirmed</h2>
      <p className="rtw-success-desc">
        Your return plan has been submitted. Your manager and absence administrator have been notified.
      </p>
      <div className="rtw-summary-grid">
        <div>
          <div className="rtw-summary-item-label">Return Date</div>
          <div className="rtw-summary-item-value">{formatDate(returnDate)}</div>
        </div>
        <div>
          <div className="rtw-summary-item-label">Schedule</div>
          <div className="rtw-summary-item-value">{schedule}</div>
        </div>
        <div>
          <div className="rtw-summary-item-label">Manager Notified</div>
          <div className="rtw-summary-item-value">Yes</div>
        </div>
        <div>
          <div className="rtw-summary-item-label">Confirmation</div>
          <div className="rtw-summary-item-value">{confirmationNumber}</div>
        </div>
      </div>
    </div>
  );
}

const STATE_PRESETS = {
  0: {},
  1: { view: 'confirm' },
  2: { view: 'confirm', rtwState: { returnDateChange: false } },
  3: { view: 'confirm', rtwState: { returnDateChange: true, newReturnDate: '2026-07-15' } },
  4: { view: 'confirm', done: { date: true }, openStep: 'schedule', rtwState: { scheduleType: 'full' } },
  5: { view: 'confirm', done: { date: true }, openStep: 'schedule', rtwState: { scheduleType: 'gradual', gradualStartHours: '20', gradualWeeks: '2' } },
  6: { view: 'confirm', done: { date: true, schedule: true }, openStep: 'clearance', rtwState: { scheduleType: 'full', needsClearance: true, clearanceProvider: 'Dr. Dempsey', clearanceDate: '2026-09-10', clearanceUploaded: true } },
  7: { view: 'confirm', done: { date: true, schedule: true }, openStep: 'clearance', rtwState: { scheduleType: 'full', needsClearance: false } },
  8: { view: 'confirm', done: { date: true, schedule: true, clearance: true }, openStep: 'accommodations', rtwState: { scheduleType: 'full', needsClearance: true, clearanceProvider: 'Dr. Dempsey', needsAccommodations: false } },
  9: { view: 'confirm', done: { date: true, schedule: true, clearance: true }, openStep: 'accommodations', rtwState: { scheduleType: 'full', needsClearance: true, clearanceProvider: 'Dr. Dempsey', needsAccommodations: true, accommodationType: 'Modified duties', accommodationDetails: 'Need a standing desk and reduced lifting for the first 4 weeks.' } },
  10: { view: 'confirm', done: { date: true, schedule: true, clearance: true, accommodations: true }, openStep: null, rtwState: { scheduleType: 'full', needsClearance: true, clearanceProvider: 'Dr. Dempsey', needsAccommodations: false } },
  11: { view: 'confirm', done: { date: true, schedule: true, clearance: true }, openStep: 'schedule', editing: 'schedule', rtwState: { scheduleType: 'full', needsClearance: true, clearanceProvider: 'Dr. Dempsey' } },
  12: { view: 'success', rtwState: { scheduleType: 'full' } },
};

export default function ReturnToWorkPage() {
  const navigate = useNavigate();
  const { caseId } = useParams();
  const [searchParams] = useSearchParams();
  const caseData = getAbsenceDetailCase(caseId);

  const stateParam = searchParams.get('state');
  const preset = stateParam != null ? STATE_PRESETS[Number(stateParam)] : null;

  const defaultRtwState = {
    returnDate: caseData?.endDate || '2026-07-01',
    returnDateChange: false,
    newReturnDate: '',
    scheduleType: '',
    gradualWeeks: '2',
    gradualStartHours: '20',
    needsClearance: true,
    clearanceUploaded: true,
    clearanceProvider: 'Dr. Dempsey',
    clearanceDate: '2026-09-10',
    needsAccommodations: null,
    accommodationType: '',
    accommodationDetails: '',
  };

  const [view, setView] = useState(preset?.view || 'welcome');
  const [rtwState, setRtwState] = useState({ ...defaultRtwState, ...(preset?.rtwState || {}) });
  const [done, setDone] = useState({ date: false, schedule: false, clearance: false, accommodations: false, ...(preset?.done || {}) });
  const [editing, setEditing] = useState(preset?.editing || null);
  const [snapshot, setSnapshot] = useState(preset?.editing ? { ...defaultRtwState, ...(preset?.rtwState || {}) } : null);
  const initialOpenStep = preset?.openStep !== undefined ? preset.openStep : 'date';

  return (
    <div className="ovx-page-shell rtw-page">
      <SiteNav />
      <div className="rtw-content">
        {view === 'welcome' && (
          <WelcomeView
            caseData={caseData}
            onContinue={() => setView('confirm')}
            onBack={() => navigate(`/absence-details/${caseId}`)}
          />
        )}
        {view === 'confirm' && (
          <ConfirmView
            caseData={caseData}
            rtwState={rtwState}
            setRtwState={setRtwState}
            done={done}
            setDone={setDone}
            editing={editing}
            setEditing={setEditing}
            snapshot={snapshot}
            setSnapshot={setSnapshot}
            onSubmit={() => setView('success')}
            onBack={() => setView('welcome')}
            initialOpenStep={initialOpenStep}
          />
        )}
        {view === 'success' && <SuccessView rtwState={rtwState} />}
      </div>
      <SiteFooter />
    </div>
  );
}
