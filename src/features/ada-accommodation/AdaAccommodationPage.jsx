import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBasePath from '../claims-and-leave/useBasePath';
import './ada-accommodation.css';

function WelcomeView({ onContinue, onBack }) {
  return (
    <>
      <button className="ada-back" type="button" onClick={onBack}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Back
      </button>

      <div className="ada-welcome-card">
        <h1 className="ada-title">Request an ADA Accommodation</h1>
        <p className="ada-subtitle">
          We're here to support you at work. The process is confidential and handled with care.
        </p>

        <div className="ada-steps-container">
          <h3 className="ada-card-title">What you'll need to complete</h3>
          <ol className="ada-steps-list">
            <li className="ada-step-item">
              <div className="ada-step-num">1</div>
              <div className="ada-step-text">
                <h4>Tell us what you need</h4>
                <p>Share what difficulty you're having at work, what accommodation would help, and when you need it.</p>
              </div>
            </li>
            <li className="ada-step-item">
              <div className="ada-step-num">2</div>
              <div className="ada-step-text">
                <h4>Upload documentation</h4>
                <p>Attach supporting documents from your healthcare provider, if available.</p>
              </div>
            </li>
            <li className="ada-step-item">
              <div className="ada-step-num">3</div>
              <div className="ada-step-text">
                <h4>Review &amp; submit</h4>
                <p>Confirm everything looks right before sending your request.</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="ada-reassurance">
          <div className="ada-reassurance-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1a4 4 0 014 4v2h.5a1.5 1.5 0 011.5 1.5v5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 13.5v-5A1.5 1.5 0 013.5 7H4V5a4 4 0 014-4z" stroke="#525252" strokeWidth="1.2"/><circle cx="8" cy="11" r="1" fill="#525252"/></svg>
            <span>Your information is secure and confidential.</span>
          </div>
          <div className="ada-reassurance-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#525252" strokeWidth="1.2"/><path d="M8 5v3" stroke="#525252" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="11" r="0.6" fill="#525252"/></svg>
            <span>You do not need to say "ADA." Just let us know what you need.</span>
          </div>
        </div>

        <button className="ada-btn-primary ada-btn-full" type="button" onClick={onContinue}>
          Get Started
        </button>
      </div>
    </>
  );
}

function ConfirmView({ adaState, setAdaState, done, setDone, editing, setEditing, snapshot, setSnapshot, onSubmit, onBack }) {
  const [openStep, setOpenStep] = useState('details');
  const completedCount = [done.details, done.docs, done.review].filter(Boolean).length;
  const totalSteps = 3;
  const allRequiredDone = done.details && done.review;

  function saveStep(stepKey) {
    setDone((prev) => ({ ...prev, [stepKey]: true }));
    setEditing(null);
    setSnapshot(null);
    const order = ['details', 'docs', 'review'];
    const nextIndex = order.indexOf(stepKey) + 1;
    if (nextIndex < order.length && !done[order[nextIndex]]) {
      setOpenStep(order[nextIndex]);
    } else {
      setOpenStep(null);
    }
  }

  function startEdit(stepKey) {
    setSnapshot({ ...adaState });
    setEditing(stepKey);
    setOpenStep(stepKey);
  }

  function discardEdit() {
    if (snapshot) setAdaState(snapshot);
    setEditing(null);
    setSnapshot(null);
    setOpenStep(null);
  }

  function toggleStep(stepKey) {
    if (editing) return;
    setOpenStep((current) => (current === stepKey ? null : stepKey));
  }

  function stepTag(stepKey, isOptional) {
    if (done[stepKey]) return <span className="ada-tag done">DONE</span>;
    if (isOptional) return <span className="ada-tag optional">OPTIONAL</span>;
    return <span className="ada-tag todo">TO DO</span>;
  }

  function stepSummary(stepKey) {
    if (!done[stepKey]) return null;
    if (stepKey === 'details') {
      const parts = [adaState.accommodationType, adaState.duration === 'ongoing' ? 'Ongoing' : 'Temporary'].filter(Boolean);
      return parts.join(' · ') || 'Details provided';
    }
    if (stepKey === 'docs') {
      if (adaState.files.length === 0) return 'No documents uploaded';
      return `${adaState.files.length} file${adaState.files.length > 1 ? 's' : ''} uploaded`;
    }
    if (stepKey === 'review') return 'Reviewed and confirmed';
    return null;
  }

  function addFile() {
    const mockFiles = [
      { name: 'Provider_Documentation.pdf', size: '245 KB' },
      { name: 'Functional_Limitations.pdf', size: '128 KB' },
      { name: 'Treatment_Plan.pdf', size: '312 KB' },
    ];
    const next = mockFiles[adaState.files.length % mockFiles.length];
    setAdaState((s) => ({ ...s, files: [...s.files, { ...next, id: Date.now() }] }));
  }

  function removeFile(id) {
    setAdaState((s) => ({ ...s, files: s.files.filter((f) => f.id !== id) }));
  }

  return (
    <>
      <button className="ada-back" type="button" onClick={onBack}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Back
      </button>

      <div className="ada-confirm-card">
        <div className="ada-confirm-header">
          <h2>Request an Accommodation</h2>
          <p>Complete each section below. Your information is kept confidential.</p>
        </div>

        <div className="ada-progress-wrap">
          <div className="ada-progress-label">{completedCount} of {totalSteps} completed</div>
          <div className="ada-progress-track">
            <div className="ada-progress-fill" style={{ width: `${(completedCount / totalSteps) * 100}%` }} />
          </div>
        </div>

        {/* Step 1: Tell us what you need */}
        <div className={`ada-accordion ${openStep === 'details' ? 'open' : ''}`}>
          <button className="ada-accordion-header" type="button" onClick={() => toggleStep('details')}>
            <div className={`ada-accordion-num ${done.details ? 'done' : ''}`}>
              {done.details ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 7l2.5 2.5L10.5 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : '1'}
            </div>
            <div className="ada-accordion-info">
              <div className="ada-accordion-title">Tell us what you need</div>
              {done.details && openStep !== 'details' && <div className="ada-accordion-summary">{stepSummary('details')}</div>}
            </div>
            {stepTag('details', false)}
            {done.details && editing !== 'details' && <button className="ada-accordion-edit" type="button" onClick={(e) => { e.stopPropagation(); startEdit('details'); }}>Edit</button>}
          </button>
          {openStep === 'details' && (
            <div className="ada-accordion-body">
              <p className="ada-field-desc">Please provide some details so we can best understand your request.</p>

              <div className="ada-input-group">
                <label htmlFor="ada-for">What is the accommodation for?</label>
                <select id="ada-for" value={adaState.accommodationFor} onChange={(e) => setAdaState((s) => ({ ...s, accommodationFor: e.target.value }))}>
                  <option value="">Select...</option>
                  <option value="Physical Condition">Physical Condition</option>
                  <option value="Mental Health">Mental Health</option>
                  <option value="Chronic Illness">Chronic Illness</option>
                  <option value="Temporary Injury">Temporary Injury</option>
                  <option value="Pregnancy-Related">Pregnancy-Related</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="ada-input-group">
                <label htmlFor="ada-impact">How is your condition affecting your ability to work?</label>
                <textarea
                  id="ada-impact"
                  value={adaState.impact}
                  onChange={(e) => setAdaState((s) => ({ ...s, impact: e.target.value.slice(0, 500) }))}
                  placeholder="Share a few details (optional)"
                />
                <div className="ada-char-count">{adaState.impact.length}/500</div>
              </div>

              <div className="ada-input-group">
                <label htmlFor="ada-type">What type of accommodation are you requesting?</label>
                <select id="ada-type" value={adaState.accommodationType} onChange={(e) => setAdaState((s) => ({ ...s, accommodationType: e.target.value }))}>
                  <option value="">Select...</option>
                  <option value="Remote work">Remote work</option>
                  <option value="Flexible schedule">Flexible schedule</option>
                  <option value="Extra breaks">Extra breaks</option>
                  <option value="Equipment adjustments">Equipment adjustments</option>
                  <option value="Modified duties">Modified duties</option>
                  <option value="Workspace changes">Workspace changes</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="ada-input-group">
                <label htmlFor="ada-start-date">When do you need this accommodation to start?</label>
                <input id="ada-start-date" type="date" value={adaState.startDate} onChange={(e) => setAdaState((s) => ({ ...s, startDate: e.target.value }))} />
              </div>

              <div className="ada-input-group">
                <label>Is this accommodation temporary or ongoing?</label>
                <div className="ada-radio-group" style={{ marginBottom: 0 }}>
                  <label className={`ada-radio-item ${adaState.duration === 'temporary' ? 'selected' : ''}`}>
                    <input type="radio" name="duration" checked={adaState.duration === 'temporary'} onChange={() => setAdaState((s) => ({ ...s, duration: 'temporary' }))} />
                    <div className="ada-radio-label">
                      <div className="ada-radio-label-text">Temporary</div>
                      <div className="ada-radio-label-hint">I expect to need this for a limited time</div>
                    </div>
                  </label>
                  <label className={`ada-radio-item ${adaState.duration === 'ongoing' ? 'selected' : ''}`}>
                    <input type="radio" name="duration" checked={adaState.duration === 'ongoing'} onChange={() => setAdaState((s) => ({ ...s, duration: 'ongoing' }))} />
                    <div className="ada-radio-label">
                      <div className="ada-radio-label-text">Ongoing</div>
                      <div className="ada-radio-label-hint">I need this on a permanent or indefinite basis</div>
                    </div>
                  </label>
                </div>
              </div>

              {adaState.duration === 'temporary' && (
                <div className="ada-input-group">
                  <label htmlFor="ada-end-date">Expected end date (if known)</label>
                  <input id="ada-end-date" type="date" value={adaState.endDate} onChange={(e) => setAdaState((s) => ({ ...s, endDate: e.target.value }))} />
                </div>
              )}

              <div className="ada-actions">
                {editing === 'details' && <button className="ada-btn-discard" type="button" onClick={discardEdit}>Discard</button>}
                <button className="ada-btn-save" type="button" disabled={!adaState.accommodationFor || !adaState.duration} onClick={() => saveStep('details')}>Save</button>
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Upload documentation */}
        <div className={`ada-accordion ${openStep === 'docs' ? 'open' : ''}`}>
          <button className="ada-accordion-header" type="button" onClick={() => toggleStep('docs')}>
            <div className={`ada-accordion-num ${done.docs ? 'done' : ''}`}>
              {done.docs ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 7l2.5 2.5L10.5 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : '2'}
            </div>
            <div className="ada-accordion-info">
              <div className="ada-accordion-title">Upload documentation</div>
              {done.docs && openStep !== 'docs' && <div className="ada-accordion-summary">{stepSummary('docs')}</div>}
            </div>
            {stepTag('docs', true)}
            {done.docs && editing !== 'docs' && <button className="ada-accordion-edit" type="button" onClick={(e) => { e.stopPropagation(); startEdit('docs'); }}>Edit</button>}
          </button>
          {openStep === 'docs' && (
            <div className="ada-accordion-body">
              <p className="ada-field-desc">Medical documentation helps us understand your needs and explore appropriate accommodations. Documentation is often required, especially if the need is not obvious.</p>

              <div className="ada-upload-area" onClick={addFile} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && addFile()}>
                <div className="ada-upload-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 16V8m0 0l-3 3m3-3l3 3" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 16.8A4 4 0 0018 9a5 5 0 00-9.6-1.8A3.5 3.5 0 005 10.5 3.5 3.5 0 006 17" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="ada-upload-text">Upload files</div>
                <div className="ada-upload-hint">or drag and drop — PDF, JPG, PNG (Max 10MB each)</div>
              </div>

              {adaState.files.map((file) => (
                <div className="ada-upload-file" key={file.id}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#525252" strokeWidth="1.2"/><path d="M10 2v4h4" stroke="#525252" strokeWidth="1.2"/></svg>
                  <div className="ada-upload-file-info">
                    <div className="ada-upload-file-name">{file.name}</div>
                    <div className="ada-upload-file-size">{file.size}</div>
                  </div>
                  <button className="ada-upload-file-remove" type="button" onClick={() => removeFile(file.id)}>Remove</button>
                </div>
              ))}

              <div className="ada-what-needed">
                <div className="ada-what-needed-title">What we typically need:</div>
                <ul className="ada-what-needed-list">
                  <li>Provider information</li>
                  <li>Functional limitations</li>
                  <li>Suggested accommodations</li>
                  <li>Expected duration (if known)</li>
                </ul>
              </div>

              <div className="ada-actions">
                {editing === 'docs' && <button className="ada-btn-discard" type="button" onClick={discardEdit}>Discard</button>}
                <button className="ada-btn-save" type="button" onClick={() => saveStep('docs')}>
                  {adaState.files.length === 0 ? 'Skip for now' : 'Save'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Step 4: Review & Submit */}
        <div className={`ada-accordion ${openStep === 'review' ? 'open' : ''}`}>
          <button className="ada-accordion-header" type="button" onClick={() => toggleStep('review')}>
            <div className={`ada-accordion-num ${done.review ? 'done' : ''}`}>
              {done.review ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 7l2.5 2.5L10.5 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : '3'}
            </div>
            <div className="ada-accordion-info">
              <div className="ada-accordion-title">Review &amp; submit</div>
              {done.review && openStep !== 'review' && <div className="ada-accordion-summary">{stepSummary('review')}</div>}
            </div>
            {stepTag('review', false)}
          </button>
          {openStep === 'review' && (
            <div className="ada-accordion-body">
              <p className="ada-field-desc">Please review your information before submitting.</p>

              <div className="ada-review-grid">
                <div>
                  <div className="ada-review-item-label">Accommodation for</div>
                  <div className="ada-review-item-value">{adaState.accommodationFor || '—'}</div>
                </div>
                <div>
                  <div className="ada-review-item-label">Type requested</div>
                  <div className="ada-review-item-value">{adaState.accommodationType || '—'}</div>
                </div>
                <div>
                  <div className="ada-review-item-label">Start date</div>
                  <div className="ada-review-item-value">{adaState.startDate ? new Date(adaState.startDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Not specified'}</div>
                </div>
                <div>
                  <div className="ada-review-item-label">Duration</div>
                  <div className="ada-review-item-value">{adaState.duration === 'ongoing' ? 'Ongoing' : adaState.duration === 'temporary' ? 'Temporary' : '—'}{adaState.duration === 'temporary' && adaState.endDate ? ` (until ${new Date(adaState.endDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})` : ''}</div>
                </div>
                <div className="ada-review-full">
                  <div className="ada-review-item-label">Impact at work</div>
                  <div className="ada-review-item-value">{adaState.impact || 'Not provided'}</div>
                </div>
                <div>
                  <div className="ada-review-item-label">Documentation</div>
                  <div className="ada-review-item-value">
                    {adaState.files.length > 0
                      ? `${adaState.files.length} file${adaState.files.length > 1 ? 's' : ''} uploaded`
                      : 'None uploaded'}
                  </div>
                </div>
              </div>

              <label className="ada-confirm-checkbox">
                <input
                  type="checkbox"
                  checked={adaState.confirmed}
                  onChange={(e) => setAdaState((s) => ({ ...s, confirmed: e.target.checked }))}
                />
                <span>I confirm that the information provided is accurate.</span>
              </label>

              <div className="ada-actions">
                <button className="ada-btn-save" type="button" disabled={!adaState.confirmed || !done.details} onClick={() => { saveStep('review'); onSubmit(); }}>
                  Submit Request
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function SuccessView({ adaState, onGoToRequests, onBack }) {
  const confirmationNumber = `ADA-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  return (
    <>
      <div className="ada-success-card">
        <div className="ada-success-icon">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M7 14l5 5L21 9" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h2 className="ada-success-title">Your request has been submitted</h2>
        <p className="ada-success-desc">
          We've received your accommodation request and will be in touch soon. Confirmation: {confirmationNumber}
        </p>

        <div className="ada-whats-next">
          <div className="ada-whats-next-title">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="#0f0f14" strokeWidth="1.2"/><path d="M2 5.5l6 4 6-4" stroke="#0f0f14" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            What's next?
          </div>
          <ul className="ada-whats-next-list">
            <li className="ada-whats-next-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#525252" strokeWidth="1.2"/><path d="M8 5v3l2 1.5" stroke="#525252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>We will review your request and schedule a time to talk with you about possible accommodations.</span>
            </li>
            <li className="ada-whats-next-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4l6 4 6-4" stroke="#525252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="#525252" strokeWidth="1.2"/></svg>
              <span>You will receive updates here and by email.</span>
            </li>
            <li className="ada-whats-next-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8h8M8 4v8" stroke="#525252" strokeWidth="1.2" strokeLinecap="round"/></svg>
              <span>You can check the status of your request anytime.</span>
            </li>
          </ul>
        </div>

        <div className="ada-success-actions">
          <button className="ada-btn-primary" type="button" onClick={onGoToRequests}>Go to My Requests</button>
          <button className="ada-btn-secondary" type="button" onClick={onBack}>Back to Home</button>
        </div>
      </div>

      <div className="ada-expect">
        <h3 className="ada-expect-title">What to expect</h3>
        <div className="ada-expect-steps">
          <div className="ada-expect-step">
            <div className="ada-expect-step-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v5l3 2" stroke="#525252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8" cy="8" r="6" stroke="#525252" strokeWidth="1.2"/></svg>
            </div>
            <div className="ada-expect-step-text">We'll reach out to start an interactive process</div>
          </div>
          <div className="ada-expect-step">
            <div className="ada-expect-step-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h2l2-3 2 6 2-3h2" stroke="#525252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="ada-expect-step-text">We'll discuss your needs and explore reasonable options</div>
          </div>
          <div className="ada-expect-step">
            <div className="ada-expect-step-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8l3 3 5-5" stroke="#525252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="ada-expect-step-text">Your employer will make a decision and notify you</div>
          </div>
          <div className="ada-expect-step">
            <div className="ada-expect-step-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3a5 5 0 11-5 5" stroke="#525252" strokeWidth="1.2" strokeLinecap="round"/><path d="M3 5l0 3 3 0" stroke="#525252" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="ada-expect-step-text">We'll work together to implement the solution and support you</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AdaAccommodationPage() {
  const navigate = useNavigate();
  const base = useBasePath();

  const [view, setView] = useState('welcome');
  const [adaState, setAdaState] = useState({
    accommodationFor: '',
    impact: '',
    accommodationType: '',
    startDate: '',
    duration: '',
    endDate: '',
    files: [],
    confirmed: false,
  });
  const [done, setDone] = useState({ details: false, docs: false, review: false });
  const [editing, setEditing] = useState(null);
  const [snapshot, setSnapshot] = useState(null);

  return (
    <div className="ada-page ada-embedded">
      <div className="ada-content">
        {view === 'welcome' && (
          <WelcomeView
            onContinue={() => setView('confirm')}
            onBack={() => navigate(`${base}/file-claim`)}
          />
        )}
        {view === 'confirm' && (
          <ConfirmView
            adaState={adaState}
            setAdaState={setAdaState}
            done={done}
            setDone={setDone}
            editing={editing}
            setEditing={setEditing}
            snapshot={snapshot}
            setSnapshot={setSnapshot}
            onSubmit={() => setView('success')}
            onBack={() => setView('welcome')}
          />
        )}
        {view === 'success' && (
          <SuccessView
            adaState={adaState}
            onGoToRequests={() => navigate(`${base}/ada-requests`)}
            onBack={() => navigate(`${base}/file-claim`)}
          />
        )}
      </div>
    </div>
  );
}
