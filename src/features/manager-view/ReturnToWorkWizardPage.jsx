import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const employeeNames = {
  'amy-smith': 'Amy Smith',
  'chris-jones': 'Chris Jones',
  'karen-new': 'Karen New',
};

export default function ReturnToWorkWizardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const employeeId = searchParams.get('employee') || 'amy-smith';
  const employeeName = employeeNames[employeeId] || 'Amy Smith';

  const [openStep, setOpenStep] = useState('returned');
  const [done, setDone] = useState({ returned: false, date: false, schedule: false, ada: false, reason: false });
  const [editing, setEditing] = useState(null);
  const [snapshot, setSnapshot] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [didReturn, setDidReturn] = useState('');
  const [returnDate, setReturnDate] = useState('2026-01-13');
  const [schedule, setSchedule] = useState('');
  const [adaAccommodation, setAdaAccommodation] = useState('');
  const [noReturnReason, setNoReturnReason] = useState('Leave Extended');

  const yesPath = didReturn === 'yes';
  const noPath = didReturn === 'no';

  function getSteps() {
    if (yesPath) {
      const steps = ['returned', 'date', 'schedule'];
      if (schedule === 'Reduced Schedule') steps.push('ada');
      return steps;
    }
    if (noPath) return ['returned', 'reason'];
    return ['returned'];
  }

  const steps = getSteps();
  const completedCount = steps.filter(s => done[s]).length;
  const allDone = steps.every(s => done[s]);

  function saveStep(stepKey) {
    setDone(prev => ({ ...prev, [stepKey]: true }));
    setEditing(null);
    setSnapshot(null);
    const idx = steps.indexOf(stepKey);
    const next = steps[idx + 1];
    if (next && !done[next]) {
      setOpenStep(next);
    } else {
      setOpenStep(null);
    }
  }

  function startEdit(stepKey) {
    setSnapshot({ didReturn, returnDate, schedule, adaAccommodation, noReturnReason });
    setEditing(stepKey);
    setOpenStep(stepKey);
  }

  function discardEdit() {
    if (snapshot) {
      setDidReturn(snapshot.didReturn);
      setReturnDate(snapshot.returnDate);
      setSchedule(snapshot.schedule);
      setAdaAccommodation(snapshot.adaAccommodation);
      setNoReturnReason(snapshot.noReturnReason);
    }
    setEditing(null);
    setSnapshot(null);
    setOpenStep(null);
  }

  function toggleStep(stepKey) {
    if (editing) return;
    setOpenStep(current => current === stepKey ? null : stepKey);
  }

  function canSave(stepKey) {
    if (stepKey === 'returned') return didReturn !== '';
    if (stepKey === 'date') return returnDate !== '';
    if (stepKey === 'schedule') return schedule !== '';
    if (stepKey === 'ada') return adaAccommodation !== '';
    if (stepKey === 'reason') return noReturnReason !== '';
    return true;
  }

  function stepTag(stepKey) {
    if (done[stepKey]) return <span className="mgr-rtw-tag mgr-rtw-tag--done">Done</span>;
    return <span className="mgr-rtw-tag mgr-rtw-tag--todo">To Do</span>;
  }

  function stepSummary(stepKey) {
    if (!done[stepKey]) return null;
    if (stepKey === 'returned') return yesPath ? 'Yes' : 'No';
    if (stepKey === 'date') return new Date(returnDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    if (stepKey === 'schedule') return schedule;
    if (stepKey === 'ada') return adaAccommodation;
    if (stepKey === 'reason') return noReturnReason;
    return null;
  }

  function stepTitle(stepKey) {
    if (stepKey === 'returned') return 'Did the employee return to work?';
    if (stepKey === 'date') return 'Return date';
    if (stepKey === 'schedule') return 'Return schedule';
    if (stepKey === 'ada') return 'ADA accommodation';
    if (stepKey === 'reason') return 'Reason not returned';
    return '';
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mgr-page">
        <div className="mgr-rtw-page-content">
          <button className="mgr-rtw-back" type="button" onClick={() => navigate('/manager/my-team')}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to My Team
          </button>
          <div className="mgr-rtw-confirm-card">
            <div className="mgr-rtw-success-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h2 className="mgr-rtw-confirm-title">{employeeName}'s return to work details have been recorded</h2>
            {noPath && <p className="mgr-rtw-confirm-subtitle">Thank you for providing details on this change to your employee's return to work. Mutual of Omaha will reach out to this employee.</p>}
            <div className="mgr-rtw-summary-grid">
              <div className="mgr-rtw-summary-item">
                <dt>Did the Employee Return to Work?</dt>
                <dd>{yesPath ? 'Yes' : 'No'}</dd>
              </div>
              {yesPath && (
                <>
                  <div className="mgr-rtw-summary-item">
                    <dt>Return Date</dt>
                    <dd>{new Date(returnDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</dd>
                  </div>
                  <div className="mgr-rtw-summary-item">
                    <dt>Return Schedule</dt>
                    <dd>{schedule}</dd>
                  </div>
                  {adaAccommodation && (
                    <div className="mgr-rtw-summary-item">
                      <dt>ADA Accommodation?</dt>
                      <dd>{adaAccommodation}</dd>
                    </div>
                  )}
                </>
              )}
              {noPath && (
                <div className="mgr-rtw-summary-item">
                  <dt>Reason</dt>
                  <dd>{noReturnReason}</dd>
                </div>
              )}
            </div>
            <button className="mgr-btn mgr-btn-primary mgr-rtw-done-btn" onClick={() => navigate('/manager/my-team')}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mgr-page">
      <div className="mgr-rtw-page-content">
        <button className="mgr-rtw-back" type="button" onClick={() => navigate(-1)}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back
        </button>

        <div className="mgr-rtw-confirm-card">
          <div className="mgr-rtw-confirm-header">
            <h2>{employeeName}'s Return to Work</h2>
            <p>Confirm or update this employee's return to work details.</p>
          </div>

          <div className="mgr-rtw-progress-wrap">
            <div className="mgr-rtw-progress-label">{completedCount} of {steps.length} completed</div>
            <div className="mgr-rtw-progress-track">
              <div className="mgr-rtw-progress-fill" style={{ width: `${(completedCount / steps.length) * 100}%` }} />
            </div>
          </div>

          {/* Step: Did the employee return? */}
          <div className={`mgr-rtw-accordion${openStep === 'returned' ? ' open' : ''}`}>
            <button className="mgr-rtw-accordion-header" type="button" onClick={() => toggleStep('returned')}>
              <div className={`mgr-rtw-accordion-num${done.returned ? ' done' : ''}`}>
                {done.returned ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 7l2.5 2.5L10.5 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : '1'}
              </div>
              <div className="mgr-rtw-accordion-info">
                <div className="mgr-rtw-accordion-title">{stepTitle('returned')}</div>
                {done.returned && openStep !== 'returned' && <div className="mgr-rtw-accordion-summary">{stepSummary('returned')}</div>}
              </div>
              {stepTag('returned')}
              {done.returned && editing !== 'returned' && <button className="mgr-rtw-accordion-edit" type="button" onClick={(e) => { e.stopPropagation(); startEdit('returned'); }}>Edit</button>}
            </button>
            {openStep === 'returned' && (
              <div className="mgr-rtw-accordion-body">
                <div className="mgr-rtw-radio-group">
                  <label className={`mgr-rtw-radio${didReturn === 'yes' ? ' selected' : ''}`}>
                    <input type="radio" name="didReturn" value="yes" checked={didReturn === 'yes'} onChange={() => setDidReturn('yes')} />
                    Yes
                  </label>
                  <label className={`mgr-rtw-radio${didReturn === 'no' ? ' selected' : ''}`}>
                    <input type="radio" name="didReturn" value="no" checked={didReturn === 'no'} onChange={() => setDidReturn('no')} />
                    No
                  </label>
                </div>
                <div className="mgr-rtw-accordion-actions">
                  {editing === 'returned' && <button className="mgr-btn mgr-btn-outline mgr-btn-sm" type="button" onClick={discardEdit}>Discard</button>}
                  <button className="mgr-btn mgr-btn-primary mgr-btn-sm" type="button" disabled={!canSave('returned')} onClick={() => saveStep('returned')}>Save</button>
                </div>
              </div>
            )}
          </div>

          {/* Step: Return date (yes path) */}
          {yesPath && (
            <div className={`mgr-rtw-accordion${openStep === 'date' ? ' open' : ''}`}>
              <button className="mgr-rtw-accordion-header" type="button" onClick={() => toggleStep('date')}>
                <div className={`mgr-rtw-accordion-num${done.date ? ' done' : ''}`}>
                  {done.date ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 7l2.5 2.5L10.5 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : '2'}
                </div>
                <div className="mgr-rtw-accordion-info">
                  <div className="mgr-rtw-accordion-title">{stepTitle('date')}</div>
                  {done.date && openStep !== 'date' && <div className="mgr-rtw-accordion-summary">{stepSummary('date')}</div>}
                </div>
                {stepTag('date')}
                {done.date && editing !== 'date' && <button className="mgr-rtw-accordion-edit" type="button" onClick={(e) => { e.stopPropagation(); startEdit('date'); }}>Edit</button>}
              </button>
              {openStep === 'date' && (
                <div className="mgr-rtw-accordion-body">
                  <div className="mgr-rtw-field">
                    <label>What date did the employee return to work?</label>
                    <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
                  </div>
                  <div className="mgr-rtw-accordion-actions">
                    {editing === 'date' && <button className="mgr-btn mgr-btn-outline mgr-btn-sm" type="button" onClick={discardEdit}>Discard</button>}
                    <button className="mgr-btn mgr-btn-primary mgr-btn-sm" type="button" disabled={!canSave('date')} onClick={() => saveStep('date')}>Save</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step: Schedule (yes path) */}
          {yesPath && (
            <div className={`mgr-rtw-accordion${openStep === 'schedule' ? ' open' : ''}`}>
              <button className="mgr-rtw-accordion-header" type="button" onClick={() => toggleStep('schedule')}>
                <div className={`mgr-rtw-accordion-num${done.schedule ? ' done' : ''}`}>
                  {done.schedule ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 7l2.5 2.5L10.5 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : '3'}
                </div>
                <div className="mgr-rtw-accordion-info">
                  <div className="mgr-rtw-accordion-title">{stepTitle('schedule')}</div>
                  {done.schedule && openStep !== 'schedule' && <div className="mgr-rtw-accordion-summary">{stepSummary('schedule')}</div>}
                </div>
                {stepTag('schedule')}
                {done.schedule && editing !== 'schedule' && <button className="mgr-rtw-accordion-edit" type="button" onClick={(e) => { e.stopPropagation(); startEdit('schedule'); }}>Edit</button>}
              </button>
              {openStep === 'schedule' && (
                <div className="mgr-rtw-accordion-body">
                  <p className="mgr-rtw-field-desc">What is the employee's schedule upon return?</p>
                  <div className="mgr-rtw-radio-group">
                    <label className={`mgr-rtw-radio${schedule === 'Full-Time' ? ' selected' : ''}`}>
                      <input type="radio" name="schedule" value="Full-Time" checked={schedule === 'Full-Time'} onChange={() => setSchedule('Full-Time')} />
                      Full-Time
                    </label>
                    <label className={`mgr-rtw-radio${schedule === 'Part-Time' ? ' selected' : ''}`}>
                      <input type="radio" name="schedule" value="Part-Time" checked={schedule === 'Part-Time'} onChange={() => setSchedule('Part-Time')} />
                      Part-Time
                    </label>
                    <label className={`mgr-rtw-radio${schedule === 'Reduced Schedule' ? ' selected' : ''}`}>
                      <input type="radio" name="schedule" value="Reduced Schedule" checked={schedule === 'Reduced Schedule'} onChange={() => setSchedule('Reduced Schedule')} />
                      Reduced Schedule
                    </label>
                  </div>
                  <div className="mgr-rtw-accordion-actions">
                    {editing === 'schedule' && <button className="mgr-btn mgr-btn-outline mgr-btn-sm" type="button" onClick={discardEdit}>Discard</button>}
                    <button className="mgr-btn mgr-btn-primary mgr-btn-sm" type="button" disabled={!canSave('schedule')} onClick={() => saveStep('schedule')}>Save</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step: ADA (yes path, reduced schedule only) */}
          {yesPath && schedule === 'Reduced Schedule' && (
            <div className={`mgr-rtw-accordion${openStep === 'ada' ? ' open' : ''}`}>
              <button className="mgr-rtw-accordion-header" type="button" onClick={() => toggleStep('ada')}>
                <div className={`mgr-rtw-accordion-num${done.ada ? ' done' : ''}`}>
                  {done.ada ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 7l2.5 2.5L10.5 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : '4'}
                </div>
                <div className="mgr-rtw-accordion-info">
                  <div className="mgr-rtw-accordion-title">{stepTitle('ada')}</div>
                  {done.ada && openStep !== 'ada' && <div className="mgr-rtw-accordion-summary">{stepSummary('ada')}</div>}
                </div>
                {stepTag('ada')}
                {done.ada && editing !== 'ada' && <button className="mgr-rtw-accordion-edit" type="button" onClick={(e) => { e.stopPropagation(); startEdit('ada'); }}>Edit</button>}
              </button>
              {openStep === 'ada' && (
                <div className="mgr-rtw-accordion-body">
                  <p className="mgr-rtw-field-desc">Is this schedule change due to an ADA accommodation?</p>
                  <div className="mgr-rtw-radio-group mgr-rtw-radio-group--inline">
                    <label className={`mgr-rtw-radio${adaAccommodation === 'Yes' ? ' selected' : ''}`}>
                      <input type="radio" name="ada" value="Yes" checked={adaAccommodation === 'Yes'} onChange={() => setAdaAccommodation('Yes')} />
                      Yes
                    </label>
                    <label className={`mgr-rtw-radio${adaAccommodation === 'No' ? ' selected' : ''}`}>
                      <input type="radio" name="ada" value="No" checked={adaAccommodation === 'No'} onChange={() => setAdaAccommodation('No')} />
                      No
                    </label>
                    <label className={`mgr-rtw-radio${adaAccommodation === 'Unsure' ? ' selected' : ''}`}>
                      <input type="radio" name="ada" value="Unsure" checked={adaAccommodation === 'Unsure'} onChange={() => setAdaAccommodation('Unsure')} />
                      Unsure
                    </label>
                  </div>
                  <div className="mgr-rtw-accordion-actions">
                    {editing === 'ada' && <button className="mgr-btn mgr-btn-outline mgr-btn-sm" type="button" onClick={discardEdit}>Discard</button>}
                    <button className="mgr-btn mgr-btn-primary mgr-btn-sm" type="button" disabled={!canSave('ada')} onClick={() => saveStep('ada')}>Save</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step: Reason (no path) */}
          {noPath && (
            <div className={`mgr-rtw-accordion${openStep === 'reason' ? ' open' : ''}`}>
              <button className="mgr-rtw-accordion-header" type="button" onClick={() => toggleStep('reason')}>
                <div className={`mgr-rtw-accordion-num${done.reason ? ' done' : ''}`}>
                  {done.reason ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 7l2.5 2.5L10.5 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : '2'}
                </div>
                <div className="mgr-rtw-accordion-info">
                  <div className="mgr-rtw-accordion-title">{stepTitle('reason')}</div>
                  {done.reason && openStep !== 'reason' && <div className="mgr-rtw-accordion-summary">{stepSummary('reason')}</div>}
                </div>
                {stepTag('reason')}
                {done.reason && editing !== 'reason' && <button className="mgr-rtw-accordion-edit" type="button" onClick={(e) => { e.stopPropagation(); startEdit('reason'); }}>Edit</button>}
              </button>
              {openStep === 'reason' && (
                <div className="mgr-rtw-accordion-body">
                  <div className="mgr-rtw-field">
                    <label>Select reason why the employee did not return to work</label>
                    <select value={noReturnReason} onChange={(e) => setNoReturnReason(e.target.value)}>
                      <option value="Leave Extended">Leave Extended</option>
                      <option value="Terminated">Terminated</option>
                      <option value="Resigned">Resigned</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="mgr-rtw-accordion-actions">
                    {editing === 'reason' && <button className="mgr-btn mgr-btn-outline mgr-btn-sm" type="button" onClick={discardEdit}>Discard</button>}
                    <button className="mgr-btn mgr-btn-primary mgr-btn-sm" type="button" disabled={!canSave('reason')} onClick={() => saveStep('reason')}>Save</button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mgr-rtw-submit-area">
            <button className="mgr-btn mgr-btn-primary mgr-rtw-submit-btn" type="button" disabled={!allDone} onClick={handleSubmit}>
              Confirm Return to Work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
