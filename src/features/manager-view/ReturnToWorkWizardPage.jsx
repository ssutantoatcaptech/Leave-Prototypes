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

  const [step, setStep] = useState(1);
  const [didReturn, setDidReturn] = useState('');
  const [returnDate, setReturnDate] = useState('2026-01-13');
  const [schedule, setSchedule] = useState('');
  const [adaAccommodation, setAdaAccommodation] = useState('');
  const [noReturnReason, setNoReturnReason] = useState('Leave Extended');

  function getMaxSteps() {
    if (didReturn === 'yes') {
      if (schedule === 'Reduced Schedule') return 4;
      return 3;
    }
    if (didReturn === 'no') return 2;
    return 8;
  }

  function handleNext() {
    if (step === 1) {
      if (didReturn === 'yes') setStep(2);
      else if (didReturn === 'no') setStep(10);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (schedule === 'Reduced Schedule') setStep(4);
      else setStep(100);
    } else if (step === 4) {
      setStep(100);
    } else if (step === 10) {
      setStep(101);
    }
  }

  function handleBack() {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 4) setStep(3);
    else if (step === 10) setStep(1);
    else if (step === 100) {
      if (schedule === 'Reduced Schedule') setStep(4);
      else setStep(3);
    }
    else if (step === 101) setStep(10);
  }

  function canContinue() {
    if (step === 1) return didReturn !== '';
    if (step === 2) return returnDate !== '';
    if (step === 3) return schedule !== '';
    if (step === 4) return adaAccommodation !== '';
    if (step === 10) return noReturnReason !== '';
    return true;
  }

  function getCurrentStepLabel() {
    if (step >= 100) return `Step ${getMaxSteps()} of ${getMaxSteps()}`;
    let s = step;
    if (step === 10) s = 2;
    return `Step ${s} of ${getMaxSteps()}`;
  }

  if (step === 100) {
    return (
      <div className="mgr-rtw-shell">
        <div className="mgr-rtw-step-indicator">{getCurrentStepLabel()}</div>
        <div className="mgr-rtw-card">
          <h2 className="mgr-rtw-title">{employeeName}'s Return to work details have been recorded</h2>
          <div className="mgr-rtw-confirmation-grid" style={{ marginTop: 20 }}>
            <dl className="mgr-rtw-confirmation-item">
              <dt>Did the Employee Return to Work?</dt>
              <dd>Yes</dd>
            </dl>
            <dl className="mgr-rtw-confirmation-item">
              <dt>Return Date</dt>
              <dd>{new Date(returnDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).replace(',', ',')} {new Date(returnDate).getDate()}, {new Date(returnDate).getFullYear()}</dd>
            </dl>
            <dl className="mgr-rtw-confirmation-item">
              <dt>Return Schedule</dt>
              <dd>{schedule === 'Reduced Schedule' ? 'Reduced' : schedule}</dd>
            </dl>
            {adaAccommodation && (
              <dl className="mgr-rtw-confirmation-item">
                <dt>ADA Accommodation?</dt>
                <dd>{adaAccommodation}</dd>
              </dl>
            )}
          </div>
          <div className="mgr-rtw-footer">
            <button className="mgr-btn mgr-btn-outline" onClick={handleBack}>&larr; Back</button>
            <button className="mgr-btn mgr-btn-primary" onClick={() => navigate('/manager/my-team')}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 101) {
    return (
      <div className="mgr-rtw-shell">
        <div className="mgr-rtw-step-indicator">{getCurrentStepLabel()}</div>
        <div className="mgr-rtw-card">
          <h2 className="mgr-rtw-title">{employeeName}'s Return to work details have been recorded</h2>
          <p className="mgr-rtw-subtitle">Thank you for providing details on this change to your employee's return to work. Mutual of Omaha will reach out to this employee.</p>
          <div className="mgr-rtw-confirmation-grid" style={{ marginTop: 20 }}>
            <dl className="mgr-rtw-confirmation-item">
              <dt>Did the Employee Return to Work?</dt>
              <dd>No</dd>
            </dl>
            <dl className="mgr-rtw-confirmation-item">
              <dt>Reason</dt>
              <dd>{noReturnReason}</dd>
            </dl>
          </div>
          <div className="mgr-rtw-footer">
            <button className="mgr-btn mgr-btn-outline" onClick={handleBack}>&larr; Back</button>
            <button className="mgr-btn mgr-btn-primary" onClick={() => navigate('/manager/my-team')}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mgr-rtw-shell">
      <div className="mgr-rtw-step-indicator">{getCurrentStepLabel()}</div>
      <div className="mgr-rtw-card">
        <h2 className="mgr-rtw-title">{employeeName}'s Return to work</h2>
        <p className="mgr-rtw-subtitle">Confirm or update this employee's return to work details.</p>

        {step === 1 && (
          <div className="mgr-rtw-question-card">
            <div className="mgr-rtw-question">Did the employee return to work?</div>
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
          </div>
        )}

        {step === 2 && (
          <div className="mgr-rtw-question-card">
            <div className="mgr-rtw-question">What date did the employee return to work?</div>
            <div className="mgr-rtw-field">
              <label>Return date</label>
              <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mgr-rtw-question-card">
            <div className="mgr-rtw-question">What is the employee's schedule upon return?</div>
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
          </div>
        )}

        {step === 4 && (
          <div className="mgr-rtw-question-card">
            <div className="mgr-rtw-question">Is this schedule change due to an ADA accommodation?</div>
            <div className="mgr-rtw-inline-radios">
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
          </div>
        )}

        {step === 10 && (
          <div className="mgr-rtw-question-card">
            <div className="mgr-rtw-question">Select reason why the employee did not return to work</div>
            <div className="mgr-rtw-field">
              <label>Reason</label>
              <select value={noReturnReason} onChange={(e) => setNoReturnReason(e.target.value)}>
                <option value="Leave Extended">Leave Extended</option>
                <option value="Terminated">Terminated</option>
                <option value="Resigned">Resigned</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        )}

        <div className="mgr-rtw-footer">
          {step === 1 ? (
            <button className="mgr-btn mgr-btn-outline" onClick={() => navigate(-1)}>Cancel</button>
          ) : (
            <button className="mgr-btn mgr-btn-outline" onClick={handleBack}>&larr; Back</button>
          )}
          <button className="mgr-btn mgr-btn-primary" disabled={!canContinue()} onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
