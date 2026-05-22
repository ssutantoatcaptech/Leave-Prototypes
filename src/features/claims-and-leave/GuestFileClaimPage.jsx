import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './file-claim-wizard.css';
import './guest-file-claim.css';
import './claim-status.css';

const DRAFT_KEY = 'guestFileClaimDraft';

const initialState = {
  // Entry
  role: 'member',
  stateLocation: 'Missouri',
  // Identity verification
  firstName: 'Jane',
  lastName: 'Mitchell',
  dob: '1990-04-15',
  ssn4: '7842',
  employerName: 'EnterpriseCorp Inc.',
  groupId: 'GOOO-12RF',
  // Claim intake
  claimType: 'std',
  dateOfEvent: '2026-05-08',
  description: 'I am experiencing severe lower back pain due to a herniated disc that is preventing me from sitting or standing for extended periods, making it impossible to perform my normal work duties.',
  providerName: 'Dr. Julia Kelly, MD — Orthopedic Spine',
  consent: true,
  // Guided triage
  whatHappened: 'work_condition',
  unableToWork: 'yes',
  howLong: '7_90',
};

const stateOptions = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming','District of Columbia'];

const roleOptions = [
  { id: 'individual', label: 'an Individual Policyholder' },
  { id: 'administrator', label: 'a Plan Administrator (Employer)' },
  { id: 'member', label: 'a Plan Member (Employee)' },
  { id: 'beneficiary', label: 'a Beneficiary' },
];

const claimTypes = [
  { id: 'std', label: 'Short-Term Disability', desc: 'Income replacement when you can\'t work due to illness or injury' },
  { id: 'accident', label: 'Accident', desc: 'Coverage for injuries resulting from an accident' },
  { id: 'hospital', label: 'Hospital Indemnity', desc: 'Benefits for hospital stays and related expenses' },
  { id: 'critical', label: 'Critical Illness', desc: 'Lump-sum benefit for diagnosis of a covered illness' },
  { id: 'dental', label: 'Dental', desc: 'Coverage for dental procedures and treatments' },
];

function CalendarIcon() {
  return (
    <svg className="input-icon input-icon--calendar" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function DateInput({ value, onChange, placeholder = 'mm/dd/yyyy', ...props }) {
  const displayValue = value ? new Date(`${value}T00:00:00`).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : '';
  return (
    <div className="date-input-wrapper">
      <input type="text" value={displayValue} readOnly placeholder={placeholder} onClick={(e) => { const hidden = e.target.nextSibling; if (hidden) hidden.showPicker?.(); }} {...props} />
      <input type="date" className="date-input-hidden" value={value} onChange={onChange} tabIndex={-1} />
      <CalendarIcon />
    </div>
  );
}

function CommCheckbox({ checked, onChange, label }) {
  return (
    <label className="comm-check" onClick={(e) => { e.preventDefault(); onChange({ target: { checked: !checked } }); }}>
      <span className={`comm-check-box${checked ? ' checked' : ''}`}>
        {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </span>
      {label}
    </label>
  );
}

function GuestHeader() {
  return (
    <div className="gc-header-wrapper">
      <header className="gc-header">
        <div className="gc-header-left">
          <span className="gc-header-brand">my<strong>Mutual</strong></span>
        </div>
        <div className="gc-header-right">
          <a href="/claims-and-leave" className="gc-header-signin">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Sign In
          </a>
        </div>
      </header>
    </div>
  );
}

function GuestFooter() {
  return (
    <footer className="gc-footer">
      <div className="gc-footer-inner">
        <span className="gc-footer-brand">my<strong>Mutual</strong></span>
        <div className="gc-footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Accessibility Services</a>
        </div>
        <span className="gc-footer-copyright">&copy; 2026 Mutual of Omaha Insurance Company. All rights reserved.</span>
      </div>
    </footer>
  );
}

function GuestFileClaimContent() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [formState, setFormState] = useState(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(DRAFT_KEY));
      if (saved && saved.formState) return { ...initialState, ...saved.formState };
    } catch { /* ignore */ }
    return initialState;
  });

  const [phase, setPhase] = useState(() => {
    const urlPhase = searchParams.get('phase');
    if (urlPhase) return urlPhase;
    return 'entry';
  });

  const [verificationError, setVerificationError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [triageResult, setTriageResult] = useState('');

  useEffect(() => {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ formState, phase }));
  }, [formState, phase]);

  function updateField(key, value) {
    setFormState((prev) => ({ ...prev, [key]: value }));
  }

  function scrollToTop() {
    setTimeout(() => {
      window.scrollTo({ top: 0 });
      const frames = document.querySelectorAll('.mobile-frame-screen');
      frames.forEach((f) => { f.scrollTop = 0; });
    }, 0);
  }

  function goToPhase(p) {
    setPhase(p);
    setSearchParams({ phase: p });
    scrollToTop();
  }

  function handleVerify() {
    setVerifying(true);
    setVerificationError('');
    setTimeout(() => {
      setVerifying(false);
      if (formState.firstName && formState.lastName && formState.dob && formState.ssn4) {
        goToPhase('claim-type');
      } else {
        setVerificationError('Please complete all required fields to verify your identity.');
      }
    }, 1500);
  }

  function computeTriageResult() {
    if (formState.unableToWork === 'yes' && formState.howLong !== 'less_7') return 'std';
    if (formState.whatHappened === 'injury') return 'accident';
    if (formState.whatHappened === 'hospitalization') return 'hospital';
    if (formState.whatHappened === 'illness') return 'critical';
    if (formState.whatHappened === 'dental') return 'dental';
    return 'std';
  }

  function handleTriageComplete() {
    const result = computeTriageResult();
    setTriageResult(result);
    updateField('claimType', result);
    goToPhase('triage-result');
  }

  function handleSubmit() {
    setSubmitting(true);
    scrollToTop();
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      scrollToTop();
    }, 2500);
  }

  function getClaimLabel(type) {
    const t = type || formState.claimType;
    const labels = { std: 'Short-Term Disability', accident: 'Accident', hospital: 'Hospital Indemnity', critical: 'Critical Illness', dental: 'Dental' };
    return labels[t] || 'Claim';
  }

  // === SUBMITTING STATE ===
  if (submitting) {
    return (
      <div className="fc-wiz-shell">
        <div className="fc-wiz-wrap">
          <div className="fc-wiz-card" style={{ textAlign: 'center', padding: '80px 40px' }}>
            <div style={{ width: 64, height: 64, margin: '0 auto 24px', borderRadius: '50%', border: '4px solid var(--color-brand-primary)', borderTopColor: 'transparent', animation: 'fcWizSpin 1s linear infinite' }} />
            <h2>Submitting your claim...</h2>
            <p className="fc-wiz-subtitle">Please wait while we process your information.</p>
            <style>{`@keyframes fcWizSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </div>
    );
  }

  // === CONFIRMATION ===
  if (submitted) {
    return (
      <div className="fc-wiz-shell">
        <div className="fc-wiz-wrap">
          <div className="fc-wiz-card">
            <div className="fc-wiz-confirmation">
              <div className="fc-wiz-success-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="14" fill="#16a34a"/>
                  <path d="M10 16l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2>Claim Submitted Successfully</h2>
              <p className="fc-wiz-subtitle">Your claim has been received and is being processed.</p>

              <div className="gc-confirm-id-card">
                <span className="gc-confirm-id-label">Your Claim ID</span>
                <span className="gc-confirm-id-value">GC-2026-48291</span>
                <span className="gc-confirm-id-hint">Save this number — you'll need it to check your claim status</span>
              </div>

              <div className="fc-wiz-case-card">
                <div className="fc-wiz-case-card-header">
                  <span className="fc-wiz-case-card-title">{getClaimLabel()} Claim</span>
                  <span className="fc-wiz-badge-pending">Under Review</span>
                </div>
                <div className="gc-case-card-detail">
                  <div className="gc-case-detail-row">
                    <span className="gc-case-detail-label">Date of Event</span>
                    <span className="gc-case-detail-value">{formState.dateOfEvent ? new Date(`${formState.dateOfEvent}T00:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—'}</span>
                  </div>
                  <div className="gc-case-detail-row">
                    <span className="gc-case-detail-label">Claimant</span>
                    <span className="gc-case-detail-value">{formState.firstName} {formState.lastName}</span>
                  </div>
                </div>
              </div>

              <div className="fc-wiz-next-steps">
                <h3>What happens next</h3>
                <div className="fc-wiz-next-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>We'll review your claim within 1–2 business days</span>
                </div>
                <div className="fc-wiz-next-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>You may need to provide supporting documents (medical records, etc.)</span>
                </div>
                <div className="fc-wiz-next-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M9 14l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>Check your status anytime with your Claim ID + Date of Birth</span>
                </div>
              </div>

              <div className="gc-post-submit-paths">
                <h3>What would you like to do?</h3>
                <div className="gc-path-cards">
                  <div className="gc-path-card" onClick={() => goToPhase('create-account')}>
                    <div className="gc-path-card-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </div>
                    <div className="gc-path-card-text">
                      <strong>Create an Account</strong>
                      <span>Register now and your claim will be linked automatically</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div className="gc-path-card" onClick={() => navigate('/claim-status')}>
                    <div className="gc-path-card-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </div>
                    <div className="gc-path-card-text">
                      <strong>Check Claim Status</strong>
                      <span>Use your Claim ID and Date of Birth anytime</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div className="gc-path-card" onClick={() => { sessionStorage.removeItem(DRAFT_KEY); setFormState(initialState); goToPhase('entry'); }}>
                    <div className="gc-path-card-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12h18M3 12l6-6M3 12l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div className="gc-path-card-text">
                      <strong>Done for Now</strong>
                      <span>You can come back later with your Claim ID</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === ENTRY / ROLE SELECTION ===
  if (phase === 'entry') {
    return (
      <div className="fc-wiz-shell">
        <div className="fc-wiz-wrap">
          <div className="fc-wiz-card gc-entry-card">
            <div className="gc-entry-header">
              <h2>File a Claim</h2>
              <p className="fc-wiz-subtitle">Tell us a bit about yourself so we can guide you to the right place.</p>
            </div>

            <div className="gc-entry-form">
              <div className="gc-entry-field">
                <label className="gc-entry-label">I am...</label>
                <div className="gc-role-options">
                  {roleOptions.map((role) => (
                    <div
                      key={role.id}
                      className={`gc-role-option${formState.role === role.id ? ' selected' : ''}`}
                      onClick={() => updateField('role', role.id)}
                    >
                      <div className="gc-role-radio" />
                      <span>{role.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="gc-entry-field">
                <label className="gc-entry-label">My state is...</label>
                <select
                  className="gc-entry-select"
                  value={formState.stateLocation}
                  onChange={(e) => updateField('stateLocation', e.target.value)}
                >
                  <option value="">Select a state</option>
                  {stateOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <button className="gc-forms-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>View Forms</span>
              </button>
            </div>

            <div className="fc-wiz-footer">
              <div className="fc-wiz-footer-left" />
              <div className="fc-wiz-footer-right">
                <button className="btn btn-next" disabled={!formState.role || !formState.stateLocation} onClick={() => goToPhase('landing')}>Continue</button>
              </div>
            </div>

            <div className="cs-lookup-alt">
              <span>Already filed?</span>
              <button className="cs-lookup-alt-link" onClick={() => navigate('/claim-status')}>Check claim status</button>
            </div>

            <div className="gc-entry-address">
              <h4>Our Address</h4>
              <p>
                Mutual of Omaha Insurance Company (Mutual of Omaha)<br />
                3300 Mutual of Omaha Plaza<br />
                Omaha, Nebraska 68175
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === LANDING / ACCOUNT GATE ===
  if (phase === 'landing') {
    return (
      <div className="fc-wiz-shell">
        <div className="fc-wiz-wrap">
          <div className="fc-wiz-card gc-landing-card">
            <div className="gc-landing-header">
              <div className="gc-landing-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="var(--color-brand-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="var(--color-brand-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2>File a Claim</h2>
              <p className="fc-wiz-subtitle">Submit a claim online. You don't need an account to get started — we'll verify your identity using your coverage information.</p>
            </div>

            <div className="gc-gate-options">
              <button className="gc-gate-btn gc-gate-btn--primary" onClick={() => goToPhase('verify')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div className="gc-gate-btn-text">
                  <strong>Continue Without an Account</strong>
                  <span>Verify your identity and file a claim now</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button className="gc-gate-btn gc-gate-btn--secondary" onClick={() => navigate('/claims-and-leave/file-claim/start-claim?step=0')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <div className="gc-gate-btn-text">
                  <strong>Sign In to Your Account</strong>
                  <span>Already have an account? Sign in for a faster experience</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>

            <div className="gc-landing-footer">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1"/><path d="M8 7v4M8 5.5v.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              <span>Takes approximately 5–10 minutes. Your information is encrypted and secure.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === IDENTITY VERIFICATION ===
  if (phase === 'verify') {
    return (
      <div className="fc-wiz-shell">
        <div className="fc-wiz-wrap">
          <div className="fc-wiz-stepper">
            <span className="fc-wiz-stepper-counter"><strong>Step 1</strong> of 4 — Identity Verification</span>
          </div>
          <div className="fc-wiz-progress-bar"><div className="fc-wiz-progress-fill" style={{ width: '25%' }} /></div>

          <div className="fc-wiz-card">
            <h2>Verify Your Identity</h2>
            <p className="fc-wiz-subtitle">We need to confirm your coverage before you can file a claim. Enter the information below exactly as it appears on your benefits enrollment.</p>

            {verificationError && (
              <div className="gc-error-banner">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.2"/><path d="M9 6v4M9 12v.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                <span>{verificationError}</span>
              </div>
            )}

            <div className="form-row cols-2">
              <div className="form-group">
                <label>First Name <span className="req">*</span></label>
                <input type="text" value={formState.firstName} onChange={(e) => updateField('firstName', e.target.value)} placeholder="Enter first name" />
              </div>
              <div className="form-group">
                <label>Last Name <span className="req">*</span></label>
                <input type="text" value={formState.lastName} onChange={(e) => updateField('lastName', e.target.value)} placeholder="Enter last name" />
              </div>
            </div>

            <div className="form-row cols-2">
              <div className="form-group">
                <label>Date of Birth <span className="req">*</span></label>
                <DateInput value={formState.dob} onChange={(e) => updateField('dob', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Last 4 Digits of SSN <span className="req">*</span></label>
                <input type="text" maxLength={4} value={formState.ssn4} onChange={(e) => updateField('ssn4', e.target.value.replace(/\D/g, ''))} placeholder="••••" />
              </div>
            </div>

            <div className="gc-optional-divider">
              <span>Optional — helps us match your records faster</span>
            </div>

            <div className="form-row cols-2">
              <div className="form-group">
                <label>Employer Name</label>
                <input type="text" value={formState.employerName} onChange={(e) => updateField('employerName', e.target.value)} placeholder="e.g. EnterpriseCorp Inc." />
              </div>
              <div className="form-group">
                <label>Group / Policy ID</label>
                <input type="text" value={formState.groupId} onChange={(e) => updateField('groupId', e.target.value)} placeholder="Found on your benefits card" />
              </div>
            </div>

            <div className="fc-wiz-footer">
              <div className="fc-wiz-footer-left">
                <button className="btn btn-secondary" onClick={() => goToPhase('landing')}>Back</button>
              </div>
              <div className="fc-wiz-footer-right">
                <button className="btn btn-next" onClick={handleVerify} disabled={verifying}>
                  {verifying ? 'Verifying...' : 'Verify & Continue'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === CLAIM TYPE SELECTION ===
  if (phase === 'claim-type') {
    return (
      <div className="fc-wiz-shell">
        <div className="fc-wiz-wrap">
          <div className="fc-wiz-stepper">
            <span className="fc-wiz-stepper-counter"><strong>Step 2</strong> of 4 — Claim Type</span>
          </div>
          <div className="fc-wiz-progress-bar"><div className="fc-wiz-progress-fill" style={{ width: '50%' }} /></div>

          <div className="fc-wiz-card">
            <h2>What type of claim would you like to file?</h2>
            <p className="fc-wiz-subtitle">Select the claim type that matches your situation, or let us help you figure it out.</p>

            <div className="gc-claim-type-grid">
              {claimTypes.map((ct) => (
                <div
                  key={ct.id}
                  className={`gc-claim-type-card${formState.claimType === ct.id ? ' selected' : ''}`}
                  onClick={() => updateField('claimType', ct.id)}
                >
                  <div className="gc-claim-type-radio" />
                  <div className="gc-claim-type-text">
                    <strong>{ct.label}</strong>
                    <span>{ct.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="gc-not-sure-section">
              <div className="gc-not-sure-divider"><span>or</span></div>
              <button className="gc-not-sure-btn" onClick={() => goToPhase('triage')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M9 9a3 3 0 015.12 2.13c0 2-3.12 2.75-3.12 2.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/></svg>
                <span>I'm not sure — help me figure it out</span>
              </button>
            </div>

            <div className="fc-wiz-footer">
              <div className="fc-wiz-footer-left">
                <button className="btn btn-secondary" onClick={() => goToPhase('verify')}>Back</button>
              </div>
              <div className="fc-wiz-footer-right">
                <button className="btn btn-next" disabled={!formState.claimType} onClick={() => goToPhase('intake')}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === GUIDED TRIAGE ===
  if (phase === 'triage') {
    return (
      <div className="fc-wiz-shell">
        <div className="fc-wiz-wrap">
          <div className="fc-wiz-stepper">
            <span className="fc-wiz-stepper-counter"><strong>Step 2</strong> of 4 — Guided Assessment</span>
          </div>
          <div className="fc-wiz-progress-bar"><div className="fc-wiz-progress-fill" style={{ width: '50%' }} /></div>

          <div className="fc-wiz-card">
            <h2>Let's find the right claim type</h2>
            <p className="fc-wiz-subtitle">Answer a few quick questions and we'll recommend the best option for your situation.</p>

            <div className="gc-triage-questions">
              <div className="gc-triage-question">
                <h3>What best describes your situation?</h3>
                <div className="fc-wiz-radio-cards">
                  {[
                    { id: 'illness', label: 'I was diagnosed with a serious illness' },
                    { id: 'injury', label: 'I was injured in an accident' },
                    { id: 'hospitalization', label: 'I was hospitalized' },
                    { id: 'dental', label: 'I need dental treatment' },
                    { id: 'work_condition', label: 'A health condition is preventing me from working' },
                  ].map((opt) => (
                    <div key={opt.id} className={`fc-wiz-radio-card${formState.whatHappened === opt.id ? ' selected' : ''}`} onClick={() => updateField('whatHappened', opt.id)}>
                      <div className="fc-wiz-radio-dot" />
                      <div className="fc-wiz-radio-card-text"><h4>{opt.label}</h4></div>
                    </div>
                  ))}
                </div>
              </div>

              {formState.whatHappened && (
                <div className="gc-triage-question">
                  <h3>Are you unable to work because of this?</h3>
                  <div className="fc-wiz-radio-cards fc-wiz-radio-cards--inline">
                    {[
                      { id: 'yes', label: 'Yes' },
                      { id: 'no', label: 'No' },
                      { id: 'not_sure', label: 'Not sure yet' },
                    ].map((opt) => (
                      <div key={opt.id} className={`fc-wiz-radio-card${formState.unableToWork === opt.id ? ' selected' : ''}`} onClick={() => updateField('unableToWork', opt.id)}>
                        <div className="fc-wiz-radio-dot" />
                        <div className="fc-wiz-radio-card-text"><h4>{opt.label}</h4></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {formState.unableToWork === 'yes' && (
                <div className="gc-triage-question">
                  <h3>How long do you expect to be out of work?</h3>
                  <div className="fc-wiz-radio-cards fc-wiz-radio-cards--inline">
                    {[
                      { id: 'less_7', label: 'Less than 7 days' },
                      { id: '7_90', label: '7–90 days' },
                      { id: 'more_90', label: 'More than 90 days' },
                    ].map((opt) => (
                      <div key={opt.id} className={`fc-wiz-radio-card${formState.howLong === opt.id ? ' selected' : ''}`} onClick={() => updateField('howLong', opt.id)}>
                        <div className="fc-wiz-radio-dot" />
                        <div className="fc-wiz-radio-card-text"><h4>{opt.label}</h4></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="fc-wiz-footer">
              <div className="fc-wiz-footer-left">
                <button className="btn btn-secondary" onClick={() => goToPhase('claim-type')}>Back</button>
              </div>
              <div className="fc-wiz-footer-right">
                <button className="btn btn-next" disabled={!formState.whatHappened || (formState.unableToWork === 'yes' && !formState.howLong)} onClick={handleTriageComplete}>See Recommendation</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === TRIAGE RESULT / RECOMMENDATION ===
  if (phase === 'triage-result') {
    return (
      <div className="fc-wiz-shell">
        <div className="fc-wiz-wrap">
          <div className="fc-wiz-stepper">
            <span className="fc-wiz-stepper-counter"><strong>Step 2</strong> of 4 — Recommendation</span>
          </div>
          <div className="fc-wiz-progress-bar"><div className="fc-wiz-progress-fill" style={{ width: '50%' }} /></div>

          <div className="fc-wiz-card">
            <div className="gc-recommendation">
              <div className="gc-recommendation-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="var(--color-brand-primary)" strokeWidth="1.5"/>
                  <path d="M9 12l2 2 4-4" stroke="var(--color-brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2>We recommend: {getClaimLabel(triageResult)}</h2>
              <p className="fc-wiz-subtitle">Based on your answers, this is the claim type that best fits your situation.</p>

              <div className="gc-recommendation-card">
                <strong>{getClaimLabel(triageResult)}</strong>
                <span>{claimTypes.find((c) => c.id === triageResult)?.desc}</span>
              </div>

              <div className="gc-recommendation-actions">
                <button className="btn btn-next" onClick={() => goToPhase('intake')}>Continue with {getClaimLabel(triageResult)}</button>
                <button className="btn btn-secondary" onClick={() => goToPhase('claim-type')}>Choose a different type</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === CLAIM INTAKE (SIMPLIFIED) ===
  if (phase === 'intake') {
    return (
      <div className="fc-wiz-shell">
        <div className="fc-wiz-wrap">
          <div className="fc-wiz-stepper">
            <span className="fc-wiz-stepper-counter"><strong>Step 3</strong> of 4 — Claim Details</span>
          </div>
          <div className="fc-wiz-progress-bar"><div className="fc-wiz-progress-fill" style={{ width: '75%' }} /></div>

          <div className="fc-wiz-card">
            <h2>Tell us about your claim</h2>
            <p className="fc-wiz-subtitle">Provide the basic details. You can add supporting documents later.</p>

            <div className="gc-claim-type-badge">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.67 3.5H2.33A.83.83 0 001.5 4.33v7a.83.83 0 00.83.83h9.34a.83.83 0 00.83-.83v-7a.83.83 0 00-.83-.83zM9.33 3.5V2.67a1.17 1.17 0 00-1.16-1.17H5.83a1.17 1.17 0 00-1.16 1.17V3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>{getClaimLabel()} Claim</span>
            </div>

            <div className="form-row cols-2">
              <div className="form-group">
                <label>Date of Event / Onset <span className="req">*</span></label>
                <DateInput value={formState.dateOfEvent} onChange={(e) => updateField('dateOfEvent', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Treating Provider (optional)</label>
                <input type="text" value={formState.providerName} onChange={(e) => updateField('providerName', e.target.value)} placeholder="Doctor or facility name" />
              </div>
            </div>

            <div className="form-group">
              <label>Brief Description <span className="req">*</span></label>
              <textarea value={formState.description} onChange={(e) => updateField('description', e.target.value)} placeholder="Briefly describe what happened and how it affects you (1–2 sentences)" rows={3} maxLength={300} />
              <span className="gc-char-count">{formState.description.length}/300</span>
            </div>

            <div className="gc-upload-section">
              <label>Supporting Documents (optional)</label>
              <div className="gc-upload-area">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>Drag files here or <strong>browse</strong></span>
                <span className="gc-upload-hint">You can always upload documents later</span>
              </div>
            </div>

            <div className="gc-consent-section">
              <CommCheckbox
                checked={formState.consent}
                onChange={(e) => updateField('consent', e.target.checked)}
                label="I confirm the information provided is accurate to the best of my knowledge and I authorize the release of relevant medical records for claim processing."
              />
            </div>

            <div className="fc-wiz-footer">
              <div className="fc-wiz-footer-left">
                <button className="btn btn-secondary" onClick={() => goToPhase('claim-type')}>Back</button>
              </div>
              <div className="fc-wiz-footer-right">
                <button className="btn btn-next" disabled={!formState.dateOfEvent || !formState.description || !formState.consent} onClick={() => goToPhase('review')}>Review & Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === REVIEW & SUBMIT ===
  if (phase === 'review') {
    return (
      <div className="fc-wiz-shell">
        <div className="fc-wiz-wrap">
          <div className="fc-wiz-stepper">
            <span className="fc-wiz-stepper-counter"><strong>Step 4</strong> of 4 — Review & Submit</span>
          </div>
          <div className="fc-wiz-progress-bar"><div className="fc-wiz-progress-fill" style={{ width: '100%' }} /></div>

          <div className="fc-wiz-card">
            <h2>Review Your Claim</h2>
            <p className="fc-wiz-subtitle">Please verify the information below before submitting.</p>

            <div className="gc-review-section">
              <div className="gc-review-section-header">
                <h3>Your Information</h3>
                <button className="gc-review-edit" onClick={() => goToPhase('verify')}>Edit</button>
              </div>
              <div className="gc-review-grid">
                <div className="gc-review-field">
                  <span className="gc-review-label">Name</span>
                  <span className="gc-review-value">{formState.firstName} {formState.lastName}</span>
                </div>
                <div className="gc-review-field">
                  <span className="gc-review-label">Date of Birth</span>
                  <span className="gc-review-value">{formState.dob ? new Date(`${formState.dob}T00:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—'}</span>
                </div>
                <div className="gc-review-field">
                  <span className="gc-review-label">SSN (last 4)</span>
                  <span className="gc-review-value">••••{formState.ssn4}</span>
                </div>
                {formState.employerName && (
                  <div className="gc-review-field">
                    <span className="gc-review-label">Employer</span>
                    <span className="gc-review-value">{formState.employerName}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="gc-review-section">
              <div className="gc-review-section-header">
                <h3>Claim Details</h3>
                <button className="gc-review-edit" onClick={() => goToPhase('intake')}>Edit</button>
              </div>
              <div className="gc-review-grid">
                <div className="gc-review-field">
                  <span className="gc-review-label">Claim Type</span>
                  <span className="gc-review-value">{getClaimLabel()}</span>
                </div>
                <div className="gc-review-field">
                  <span className="gc-review-label">Date of Event</span>
                  <span className="gc-review-value">{formState.dateOfEvent ? new Date(`${formState.dateOfEvent}T00:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—'}</span>
                </div>
                {formState.providerName && (
                  <div className="gc-review-field">
                    <span className="gc-review-label">Provider</span>
                    <span className="gc-review-value">{formState.providerName}</span>
                  </div>
                )}
                <div className="gc-review-field gc-review-field--full">
                  <span className="gc-review-label">Description</span>
                  <span className="gc-review-value">{formState.description}</span>
                </div>
              </div>
            </div>

            <div className="fc-wiz-footer">
              <div className="fc-wiz-footer-left">
                <button className="btn btn-secondary" onClick={() => goToPhase('intake')}>Back</button>
              </div>
              <div className="fc-wiz-footer-right">
                <button className="btn btn-next" onClick={handleSubmit}>Submit Claim</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === CLAIM LOOKUP (post-submission) ===
  if (phase === 'claim-lookup') {
    return (
      <div className="fc-wiz-shell">
        <div className="fc-wiz-wrap">
          <div className="fc-wiz-card">
            <h2>Check Your Claim Status</h2>
            <p className="fc-wiz-subtitle">You can look up your claim at any time using the information below.</p>

            <div className="gc-lookup-info">
              <div className="gc-lookup-card">
                <div className="gc-lookup-card-row">
                  <span className="gc-lookup-card-label">Claim ID</span>
                  <span className="gc-lookup-card-value">GC-2026-48291</span>
                </div>
                <div className="gc-lookup-card-row">
                  <span className="gc-lookup-card-label">Verification</span>
                  <span className="gc-lookup-card-value">Date of Birth</span>
                </div>
              </div>

              <div className="gc-lookup-instructions">
                <h3>How to check your status</h3>
                <ol>
                  <li>Visit the claim status page</li>
                  <li>Enter your Claim ID: <strong>GC-2026-48291</strong></li>
                  <li>Verify with your Date of Birth</li>
                  <li>View your claim status and any required actions</li>
                </ol>
              </div>

              <div className="gc-lookup-reminder">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1"/><path d="M8 7v4M8 5.5v.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                <span>We recommend saving or printing this page for your records.</span>
              </div>
            </div>

            <div className="fc-wiz-footer">
              <div className="fc-wiz-footer-left" />
              <div className="fc-wiz-footer-right">
                <button className="btn btn-next" onClick={() => { sessionStorage.removeItem(DRAFT_KEY); setFormState(initialState); goToPhase('entry'); }}>Done</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === CREATE ACCOUNT (post-submission placeholder) ===
  if (phase === 'create-account') {
    return (
      <div className="fc-wiz-shell">
        <div className="fc-wiz-wrap">
          <div className="fc-wiz-card">
            <h2>Create Your Account</h2>
            <p className="fc-wiz-subtitle">Register an account to manage your claims, upload documents, and track status all in one place. Your recently submitted claim will be linked automatically.</p>

            <div className="gc-create-account-benefits">
              <div className="gc-benefit-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="var(--color-status-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke="var(--color-status-success)" strokeWidth="1.5"/></svg>
                <span>Track claim status in real-time</span>
              </div>
              <div className="gc-benefit-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="var(--color-status-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke="var(--color-status-success)" strokeWidth="1.5"/></svg>
                <span>Upload documents securely</span>
              </div>
              <div className="gc-benefit-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="var(--color-status-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke="var(--color-status-success)" strokeWidth="1.5"/></svg>
                <span>Receive notifications and updates</span>
              </div>
              <div className="gc-benefit-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="var(--color-status-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke="var(--color-status-success)" strokeWidth="1.5"/></svg>
                <span>File future claims faster</span>
              </div>
            </div>

            <div className="form-row cols-2">
              <div className="form-group">
                <label>Email Address <span className="req">*</span></label>
                <input type="email" placeholder="your.email@example.com" />
              </div>
              <div className="form-group">
                <label>Create Password <span className="req">*</span></label>
                <input type="text" placeholder="Minimum 8 characters" />
              </div>
            </div>

            <div className="fc-wiz-footer">
              <div className="fc-wiz-footer-left">
                <button className="btn btn-secondary" onClick={() => navigate('/claim-status')}>Skip for now</button>
              </div>
              <div className="fc-wiz-footer-right">
                <button className="btn btn-next">Create Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default function GuestFileClaimPage() {
  return (
    <div className="gc-shell">
      <GuestHeader />
      <main className="gc-main">
        <GuestFileClaimContent />
      </main>
      <GuestFooter />
    </div>
  );
}
