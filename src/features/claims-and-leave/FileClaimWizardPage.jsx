import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import useBasePath from './useBasePath';
import './file-claim-wizard.css';

const DRAFT_KEY = 'fileClaimWizardDraft';

const stateOptions = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'];
const stateFullNames = ['Alabama (AL)','Alaska (AK)','Arizona (AZ)','Arkansas (AR)','California (CA)','Colorado (CO)','Connecticut (CT)','Delaware (DE)','Florida (FL)','Georgia (GA)','Hawaii (HI)','Idaho (ID)','Illinois (IL)','Indiana (IN)','Iowa (IA)','Kansas (KS)','Kentucky (KY)','Louisiana (LA)','Maine (ME)','Maryland (MD)','Massachusetts (MA)','Michigan (MI)','Minnesota (MN)','Mississippi (MS)','Missouri (MO)','Montana (MT)','Nebraska (NE)','Nevada (NV)','New Hampshire (NH)','New Jersey (NJ)','New Mexico (NM)','New York (NY)','North Carolina (NC)','North Dakota (ND)','Ohio (OH)','Oklahoma (OK)','Oregon (OR)','Pennsylvania (PA)','Rhode Island (RI)','South Carolina (SC)','South Dakota (SD)','Tennessee (TN)','Texas (TX)','Utah (UT)','Vermont (VT)','Virginia (VA)','Washington (WA)','West Virginia (WV)','Wisconsin (WI)','Wyoming (WY)','District of Columbia (DC)'];

const initialState = {
  // Landing
  locatedIn: 'New York (NY)',
  claimType: '', // 'std', 'accident', 'critical_illness', 'hospital_indemnity'
  // Employee/Employer
  companyName: 'EnterpriseCorp Inc.',
  groupId: 'GOOO-12RF',
  firstName: 'Sarah',
  middleInitial: 'S',
  lastName: 'Johnson',
  ssn: 'XXX-XX-2895',
  dob: '1987-01-02',
  jobTitle: 'Senior Marketing Manager',
  street: '456 Oak Avenue',
  city: 'New York',
  state: 'NY',
  zip: '10001',
  // Contact
  email: 'sarah.johnson@company.com',
  phone: '(555) 123-4567',
  commEmail: true,
  commPhone: true,
  commSMS: true,
  tempAddress: true,
  tempStreet: '8827 SW 8th Street',
  tempCity: 'Lee Summit',
  tempState: 'MO',
  tempZip: '64086',
  tempStart: '2026-05-01',
  tempEnd: '2026-08-15',
  // STD Claim Event
  heightFt: '5',
  heightIn: '6',
  weight: '132',
  dominantHand: 'Right',
  maritalStatus: 'Married',
  dateOfDisability: '2026-03-12',
  dateFirstTreated: '2026-03-15',
  estimatedReturn: '2026-06-25',
  natureOfIllness: 'I am experiencing an acute lumbar disc herniation that causes significant lower-back pain and nerve symptoms, including limited mobility and difficulty sitting or standing for extended periods. These symptoms interfere with my ability to perform normal work duties and daily activities.',
  workRelated: 'No',
  workersComp: 'No',
  motorVehicle: 'No',
  // Provider
  providers: [{
    firstName: 'Julia',
    lastName: 'Kelly',
    suffix: 'MD',
    specialty: 'Orthopedic Spine Surgeon',
    phone: '(862)-265-2268',
    fax: '(212)-555-0264',
    street: '981 W 121 St',
    city: 'Lee Summit',
    state: 'MO',
    zip: '64064',
    dateFrom: '2025-01-26',
    dateTo: '2026-03-15',
  }],
  // Hours
  hoursPerWeek: '40',
  // Other Income
  otherIncome: [],
  otherIncomeText: '',
  // Tax
  taxWithholding: 'Yes',
  // Path B/C
  isClaimant: 'yes',
  causeForCondition: 'Illness',
  conditionDescription: 'Severe lower back pain with disc herniation',
  dateFirstTreatedB: '2026-05-12',
  wasHospitalized: 'no',
  hospitalName: '',
  hospitalPhone: '',
  hospitalStreet: '',
  hospitalCity: '',
  hospitalState: '',
  hospitalZip: '',
  hospitalReason: '',
  additionalInfo: '',
  // Critical Illness
  illnessCategories: {
    autoimmune: '',
    neurological_movement: '',
    family_planning: '',
    childhood: '',
    cancer: '',
    neurological_brain: '',
    mental_illness: '',
    infectious: '',
    vascular_pulmonary: '',
    organ: '',
    functional_loss: '',
    occupational: '',
    additional_benefits: '',
  },
  illnessProcedureDate: '2026-05-10',
  illnessDescription: '',
  hadSimilarIllness: 'no',
  hadBenefitPaid: 'no',
  // Medications (Critical Illness Step 6)
  hadSimilarMeds: 'no',
  medications: [{
    name: '',
    firstDate: '',
    lastDate: '',
    pharmacy: '',
    pharmacyPhone: '',
    pharmacyCity: '',
    pharmacyState: '',
    prescriber: '',
  }],
  // Review acknowledgments
  ackReviewed: false,
  ackFraud: false,
};

const otherIncomeOptions = [
  'Social Security Retirement',
  'State Disability',
  'Unemployment',
  'State Paid Family or Paid Medical Leave',
  'Social Security Disability',
  'Pension Retirement',
  'No-Fault Insurance',
  'Aortic Surgery',
  'Canadian Pension Plan',
  'Pension Disability',
  "Worker's Compensation",
  'Short Term Disability',
  'Other',
];

/* ======= Utility Components ======= */

function CalendarIcon() {
  return (
    <svg className="input-icon input-icon--calendar" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg className="input-icon input-icon--chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

function SelectInput({ value, onChange, children, ...props }) {
  const options = [];
  const extractOptions = (nodes) => {
    (Array.isArray(nodes) ? nodes : [nodes]).forEach((child) => {
      if (!child) return;
      if (Array.isArray(child)) { extractOptions(child); return; }
      if (child.props && child.type === 'option') {
        options.push({ value: child.props.value ?? child.props.children, label: child.props.children });
      }
    });
  };
  extractOptions(children);
  const selectedLabel = options.find((o) => String(o.value) === String(value))?.label || value || 'Select...';
  return (
    <div className="select-input-wrapper">
      <div className="select-display" onClick={(e) => { const sel = e.currentTarget.nextSibling; if (sel) sel.click(); }}>{selectedLabel}</div>
      <select className="select-hidden" value={value} onChange={onChange} {...props}>{children}</select>
      <ChevronIcon />
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

function ReadonlyField({ label, value }) {
  return <div className="readonly-field"><div className="field-label">{label}</div><div className="field-value">{value || '—'}</div></div>;
}

function ReviewField({ label, value }) {
  return <div><div className="br-field-label">{label}</div><div className="br-field-value">{value || '—'}</div></div>;
}

function InfoIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.2"/><path d="M9 8v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="9" cy="6" r="0.75" fill="currentColor"/></svg>;
}

/* ======= Main Component ======= */

export default function FileClaimWizardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const base = useBasePath();
  const isManaged = searchParams.get('managed') === 'true';

  const [formState, setFormState] = useState(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(DRAFT_KEY));
      if (saved && saved.formState) return { ...initialState, ...saved.formState };
    } catch { /* ignore */ }
    return initialState;
  });

  const [currentStep, setCurrentStep] = useState(() => {
    const urlStep = searchParams.get('step');
    if (urlStep !== null) return parseInt(urlStep, 10);
    try {
      const saved = JSON.parse(sessionStorage.getItem(DRAFT_KEY));
      if (saved && saved.step !== undefined) return saved.step;
    } catch { /* ignore */ }
    return 0;
  });

  // Guided intro flow state
  // wizardPhase: 'intro' | 'direct' | 'guided' | 'recommendation' | 'wizard'
  const [wizardPhase, setWizardPhase] = useState(() => {
    if (isManaged) return 'direct'; // skip intro for managed users
    // If resuming from a saved step > 0, go straight to wizard phase
    const urlStep = searchParams.get('step');
    if (urlStep !== null && parseInt(urlStep, 10) > 0) return 'wizard';
    try {
      const saved = JSON.parse(sessionStorage.getItem(DRAFT_KEY));
      if (saved && saved.step > 0) return 'wizard';
    } catch { /* ignore */ }
    return 'intro';
  });
  const [introChoice, setIntroChoice] = useState(''); // '' | 'direct' | 'guided'
  const [guidedStep, setGuidedStep] = useState(1);
  const [guidedSituations, setGuidedSituations] = useState([]);
  const [guidedWorkAffected, setGuidedWorkAffected] = useState('');
  const [guidedAccident, setGuidedAccident] = useState('');
  const [guidedIllness, setGuidedIllness] = useState('');
  const [guidedHospital, setGuidedHospital] = useState('');
  const [guidedSupport, setGuidedSupport] = useState('');
  const [recommendedType, setRecommendedType] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Save draft
  useEffect(() => {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ formState, step: currentStep }));
  }, [formState, currentStep]);

  function updateField(key, value) {
    setFormState((prev) => ({ ...prev, [key]: value }));
  }

  function updateProvider(index, key, value) {
    setFormState((prev) => {
      const providers = [...prev.providers];
      providers[index] = { ...providers[index], [key]: value };
      return { ...prev, providers };
    });
  }

  function addProvider() {
    setFormState((prev) => ({
      ...prev,
      providers: [...prev.providers, { firstName: '', lastName: '', suffix: 'MD', specialty: '', phone: '', fax: '', street: '', city: '', state: '', zip: '', dateFrom: '', dateTo: '' }],
    }));
  }

  function updateMedication(index, key, value) {
    setFormState((prev) => {
      const medications = [...prev.medications];
      medications[index] = { ...medications[index], [key]: value };
      return { ...prev, medications };
    });
  }

  function addMedication() {
    setFormState((prev) => ({
      ...prev,
      medications: [...prev.medications, { name: '', firstDate: '', lastDate: '', pharmacy: '', pharmacyPhone: '', pharmacyCity: '', pharmacyState: '', prescriber: '' }],
    }));
  }

  function toggleOtherIncome(item) {
    setFormState((prev) => {
      const arr = prev.otherIncome.includes(item)
        ? prev.otherIncome.filter((i) => i !== item)
        : [...prev.otherIncome, item];
      return { ...prev, otherIncome: arr };
    });
  }

  function updateIllnessCategory(key, value) {
    setFormState((prev) => ({
      ...prev,
      illnessCategories: { ...prev.illnessCategories, [key]: value },
    }));
  }

  // Determine total steps based on claim type
  function getTotalSteps() {
    if (formState.claimType === 'std') return 8;
    if (formState.claimType === 'critical_illness') return 7;
    return 5; // accident, hospital_indemnity
  }

  const totalSteps = getTotalSteps();

  function scrollToTop() {
    setTimeout(() => {
      window.scrollTo({ top: 0 });
      const frames = document.querySelectorAll('.mobile-frame-screen');
      frames.forEach((f) => { f.scrollTop = 0; });
    }, 0);
  }

  function computeRecommendation() {
    // Primary: based on support selection (step 5)
    if (guidedSupport === 'income') return 'std';
    if (guidedSupport === 'lump_sum') return 'critical_illness';
    if (guidedSupport === 'accident_coverage') return 'accident';
    if (guidedSupport === 'hospital_expenses') return 'hospital_indemnity';
    // Fallback: based on situation selections (step 1, multi-select)
    if (guidedSituations.includes('injured')) return 'accident';
    if (guidedSituations.includes('illness')) return 'critical_illness';
    if (guidedSituations.includes('work_condition')) return 'std';
    if (guidedSituations.includes('hospitalized')) return 'hospital_indemnity';
    return 'std'; // default
  }

  function handleIntroNext() {
    if (introChoice === 'direct') {
      setWizardPhase('direct');
    } else if (introChoice === 'guided') {
      setWizardPhase('guided');
      setGuidedStep(1);
    }
    scrollToTop();
  }

  function handleGuidedNext() {
    if (guidedStep < 5) {
      setGuidedStep(guidedStep + 1);
    } else {
      // Compute recommendation and show result
      const rec = computeRecommendation();
      setRecommendedType(rec);
      setWizardPhase('recommendation');
    }
    scrollToTop();
  }

  function handleGuidedBack() {
    if (guidedStep > 1) {
      setGuidedStep(guidedStep - 1);
    } else {
      setWizardPhase('intro');
    }
    scrollToTop();
  }

  function handleRecommendationComplete() {
    updateField('claimType', recommendedType);
    setWizardPhase('wizard');
    setCurrentStep(1);
    scrollToTop();
  }

  function getRecommendedTypeLabel() {
    const labels = { std: 'Short Term Disability', accident: 'Accident', critical_illness: 'Critical Illness', hospital_indemnity: 'Hospital Indemnity' };
    return labels[recommendedType] || 'Claim';
  }

  function goNext() {
    setCurrentStep((s) => Math.min(s + 1, totalSteps));
    scrollToTop();
  }

  function goBack() {
    if (currentStep === 0) {
      navigate(`${base}/file-claim`);
      return;
    }
    if (currentStep === 1 && wizardPhase === 'wizard') {
      // If they came through the guided flow, go back to recommendation
      // If they came through direct, go back to claim type selection
      if (recommendedType) {
        setWizardPhase('recommendation');
      } else {
        setCurrentStep(0);
        setWizardPhase('direct');
      }
      scrollToTop();
      return;
    }
    setCurrentStep((s) => Math.max(s - 1, 0));
    scrollToTop();
  }

  function jumpToStep(step) {
    setCurrentStep(step);
    scrollToTop();
  }

  function handleSubmit() {
    setSubmitting(true);
    scrollToTop();
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      scrollToTop();
    }, 3000);
  }

  function formatDate(isoDate) {
    if (!isoDate) return '—';
    const date = new Date(`${isoDate}T00:00:00`);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  function getClaimTypeLabel() {
    const labels = { std: 'Short Term Disability', accident: 'Accident', critical_illness: 'Critical Illness', hospital_indemnity: 'Hospital Indemnity' };
    return labels[formState.claimType] || 'Claim';
  }

  /* ======= RENDERING ======= */

  // Submitting loading state
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

  // Confirmation screen
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
              <h2>Claim Submitted</h2>
              <p className="fc-wiz-subtitle">Claim #NTN-2026-1236</p>

              <div className="fc-wiz-case-card">
                <div className="fc-wiz-case-card-header">
                  <span className="fc-wiz-case-card-title">{getClaimTypeLabel()} Claim</span>
                  <span className="fc-wiz-badge-pending">Pending</span>
                </div>
              </div>

              <div className="fc-wiz-next-steps">
                <h3>What happens next</h3>
                <div className="fc-wiz-next-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>We're reviewing your eligibility — we'll update you within 1-2 business days</span>
                </div>
                <div className="fc-wiz-next-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>You may be asked to upload supporting documents (medical certification, etc.)</span>
                </div>
                <div className="fc-wiz-next-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M9 14l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>Track your claim status anytime from the overview</span>
                </div>
              </div>

              <div className="fc-wiz-confirmation-footer">
                <button className="btn btn-next" onClick={() => navigate(`${base}/claims`)}>View Claim Details</button>
                <button className="btn btn-secondary" onClick={() => navigate(`${base}/file-claim`)}>Back to File a Claim or Leave</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === INTRO PHASE: Initial Choice Screen ===
  if (currentStep === 0 && wizardPhase === 'intro') {
    return (
      <div className="fc-wiz-shell">
        <div className="fc-wiz-wrap">
          <div className="fc-wiz-card">
            <h2>Submit a Claim</h2>
            <p className="fc-wiz-subtitle">Please allow approximately 10-20 minutes to step through the online application process.</p>

            <h3 className="fc-wiz-guided-heading">Which answer best represents your situation?</h3>

            <div className="fc-wiz-radio-cards">
              <div
                className={`fc-wiz-radio-card${introChoice === 'direct' ? ' selected' : ''}`}
                onClick={() => setIntroChoice('direct')}
              >
                <div className="fc-wiz-radio-dot" />
                <div className="fc-wiz-radio-card-text">
                  <h4>I know what type of claim I'd like to file</h4>
                </div>
              </div>
              <div
                className={`fc-wiz-radio-card${introChoice === 'guided' ? ' selected' : ''}`}
                onClick={() => setIntroChoice('guided')}
              >
                <div className="fc-wiz-radio-dot" />
                <div className="fc-wiz-radio-card-text">
                  <h4>Help me figure out the right claim for my situation</h4>
                </div>
              </div>
            </div>

            <div className="fc-wiz-footer" style={{ marginTop: 32 }}>
              <button className="btn btn-secondary" onClick={() => navigate(`${base}/file-claim`)}>Cancel</button>
              <button className="btn btn-next" disabled={!introChoice} onClick={handleIntroNext}>Next</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === GUIDED PHASE: 5-step questionnaire ===
  if (currentStep === 0 && wizardPhase === 'guided') {
    return (
      <div className="fc-wiz-shell">
        <div className="fc-wiz-wrap">
          {/* Guided Progress */}
          <div className="fc-wiz-stepper">
            <span className="fc-wiz-stepper-counter">Step <strong>{guidedStep}</strong> of 5</span>
          </div>
          <div className="fc-wiz-progress-bar">
            <div className="fc-wiz-progress-fill" style={{ width: `${(guidedStep / 5) * 100}%` }} />
          </div>

          <div className="fc-wiz-card">
            <div className="fc-wiz-step-content">
              {guidedStep === 1 && (
                <>
                  <h2>Provide details about your situation to get started.</h2>
                  <p className="fc-wiz-subtitle">Select all that apply to your situation related to this claim.</p>

                  <div className="fc-wiz-checkbox-cards">
                    {[
                      { value: 'injured', label: 'I was injured in an accident (such as like a fall, car accident, or sports injury)' },
                      { value: 'illness', label: "I've been diagnosed with a serious illness (such as cancer, heart attack, or stroke)" },
                      { value: 'work_condition', label: 'I have a condition that will effect my ability to work' },
                      { value: 'hospitalized', label: 'I was hospitalized or stayed overnight in a hospital' },
                      { value: 'other', label: 'Something else' },
                    ].map((opt) => {
                      const isChecked = guidedSituations.includes(opt.value);
                      return (
                        <div
                          key={opt.value}
                          className={`fc-wiz-checkbox-card${isChecked ? ' selected' : ''}`}
                          onClick={() => setGuidedSituations((prev) => isChecked ? prev.filter((v) => v !== opt.value) : [...prev, opt.value])}
                        >
                          <div className={`checkbox-box${isChecked ? ' checked' : ''}`}><span className="check-icon">{'✓'}</span></div>
                          <div className="fc-wiz-checkbox-card-text"><h4>{opt.label}</h4></div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="fc-wiz-guided-question">
                    <label className="fc-wiz-guided-question-label">Has your ability to work been effected by this situation?</label>
                    <div className="fc-wiz-inline-radios">
                      <label className="radio-option" onClick={() => setGuidedWorkAffected('yes')}><span className={`radio-circle${guidedWorkAffected === 'yes' ? ' selected' : ''}`} /> Yes</label>
                      <label className="radio-option" onClick={() => setGuidedWorkAffected('no')}><span className={`radio-circle${guidedWorkAffected === 'no' ? ' selected' : ''}`} /> No</label>
                    </div>
                  </div>
                </>
              )}

              {guidedStep === 2 && (
                <>
                  <h2>Was this caused by an accident?</h2>
                  <p className="fc-wiz-subtitle">Was your condition caused by an accidental injury (like a fall, car accident, or sports injury)?</p>

                  <div className="fc-wiz-inline-radios fc-wiz-inline-radios--vertical">
                    <label className="radio-option" onClick={() => setGuidedAccident('yes')}><span className={`radio-circle${guidedAccident === 'yes' ? ' selected' : ''}`} /> Yes</label>
                    <label className="radio-option" onClick={() => setGuidedAccident('no')}><span className={`radio-circle${guidedAccident === 'no' ? ' selected' : ''}`} /> No</label>
                    <label className="radio-option" onClick={() => setGuidedAccident('not_sure')}><span className={`radio-circle${guidedAccident === 'not_sure' ? ' selected' : ''}`} /> Not Sure</label>
                  </div>
                </>
              )}

              {guidedStep === 3 && (
                <>
                  <h2>Were you diagnosed with a serious illness?</h2>
                  <p className="fc-wiz-subtitle">Have you been diagnosed with a serious condition, such as cancer, heart attack, or stroke?</p>

                  <div className="fc-wiz-inline-radios fc-wiz-inline-radios--vertical">
                    <label className="radio-option" onClick={() => setGuidedIllness('yes')}><span className={`radio-circle${guidedIllness === 'yes' ? ' selected' : ''}`} /> Yes</label>
                    <label className="radio-option" onClick={() => setGuidedIllness('no')}><span className={`radio-circle${guidedIllness === 'no' ? ' selected' : ''}`} /> No</label>
                    <label className="radio-option" onClick={() => setGuidedIllness('not_sure')}><span className={`radio-circle${guidedIllness === 'not_sure' ? ' selected' : ''}`} /> Not Sure</label>
                  </div>
                </>
              )}

              {guidedStep === 4 && (
                <>
                  <h2>Did you stay in the hospital?</h2>
                  <p className="fc-wiz-subtitle">Did your situation require a hospital stay or overnight admission?</p>

                  <div className="fc-wiz-inline-radios fc-wiz-inline-radios--vertical">
                    <label className="radio-option" onClick={() => setGuidedHospital('yes')}><span className={`radio-circle${guidedHospital === 'yes' ? ' selected' : ''}`} /> Yes</label>
                    <label className="radio-option" onClick={() => setGuidedHospital('no')}><span className={`radio-circle${guidedHospital === 'no' ? ' selected' : ''}`} /> No</label>
                    <label className="radio-option" onClick={() => setGuidedHospital('not_sure')}><span className={`radio-circle${guidedHospital === 'not_sure' ? ' selected' : ''}`} /> Not Sure</label>
                  </div>
                </>
              )}

              {guidedStep === 5 && (
                <>
                  <h2>What kind of support are you looking for?</h2>
                  <p className="fc-wiz-subtitle">Different types of claims can provide different types of support. Select one or multiple which describes your situation best.</p>

                  <div className="fc-wiz-radio-cards">
                    <div className={`fc-wiz-radio-card${guidedSupport === 'income' ? ' selected' : ''}`} onClick={() => setGuidedSupport('income')}>
                      <div className="fc-wiz-radio-dot" />
                      <div className="fc-wiz-radio-card-text"><h4>Help replacing lost income while I can't work</h4></div>
                    </div>
                    <div className={`fc-wiz-radio-card${guidedSupport === 'lump_sum' ? ' selected' : ''}`} onClick={() => setGuidedSupport('lump_sum')}>
                      <div className="fc-wiz-radio-dot" />
                      <div className="fc-wiz-radio-card-text"><h4>A lump sum payment for a serious diagnosis</h4></div>
                    </div>
                    <div className={`fc-wiz-radio-card${guidedSupport === 'accident_coverage' ? ' selected' : ''}`} onClick={() => setGuidedSupport('accident_coverage')}>
                      <div className="fc-wiz-radio-dot" />
                      <div className="fc-wiz-radio-card-text"><h4>Coverage related to an accident</h4></div>
                    </div>
                    <div className={`fc-wiz-radio-card${guidedSupport === 'hospital_expenses' ? ' selected' : ''}`} onClick={() => setGuidedSupport('hospital_expenses')}>
                      <div className="fc-wiz-radio-dot" />
                      <div className="fc-wiz-radio-card-text"><h4>Help covering hospital-related expenses</h4></div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Guided Footer */}
            <div className="fc-wiz-footer">
              <div className="fc-wiz-footer-left">
                <button className="btn btn-back" onClick={handleGuidedBack}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight: 4 }}><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Back
                </button>
              </div>
              <div className="fc-wiz-footer-right">
                <button className="btn btn-next" onClick={handleGuidedNext}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === RECOMMENDATION PHASE ===
  if (currentStep === 0 && wizardPhase === 'recommendation') {
    return (
      <div className="fc-wiz-shell">
        <div className="fc-wiz-wrap">
          <div className="fc-wiz-card">
            <div className="fc-wiz-recommendation">
              <h2>Based on your answers, it looks like you may want to file a <strong>{getRecommendedTypeLabel()}</strong> Claim</h2>
              <p className="fc-wiz-subtitle">Select from the options below to start your claim or select cancel to start over.</p>

              <div className="fc-wiz-footer fc-wiz-recommendation-footer">
                <button className="btn btn-secondary" onClick={() => { setWizardPhase('intro'); setIntroChoice(''); setGuidedStep(1); setGuidedSituation(''); setGuidedWorkAffected(''); setGuidedAccident(''); setGuidedIllness(''); setGuidedHospital(''); setGuidedSupport(''); setRecommendedType(''); scrollToTop(); }}>Cancel</button>
                <button className="btn btn-secondary" onClick={() => {}}>Print Form</button>
                <button className="btn btn-next" onClick={handleRecommendationComplete}>Complete Form Online</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === DIRECT PHASE: Landing screen (step 0) — existing claim type selection ===
  if (currentStep === 0 && (wizardPhase === 'direct' || wizardPhase === 'wizard')) {
    const nonManagedOptions = [
      { value: 'std', label: 'Short Term Disability', desc: 'For illness or injury preventing you from working' },
      { value: 'accident', label: 'Accident', desc: 'For accidental injury benefits' },
      { value: 'critical_illness', label: 'Critical Illness', desc: 'For diagnosed critical illness benefits' },
      { value: 'hospital_indemnity', label: 'Hospital Indemnity', desc: 'For hospital admission benefits' },
    ];
    const managedOptions = nonManagedOptions.filter((o) => o.value !== 'std');

    const options = isManaged ? managedOptions : nonManagedOptions;

    return (
      <div className="fc-wiz-shell">
        <div className="fc-wiz-wrap">
          <div className="fc-wiz-card">
            <h2>Submit a Claim</h2>
            <div className="fc-wiz-landing-desc">
              Please allow approximately 10-20 minutes to step through the online application process. To protect your privacy, information is not saved until submitted so this application should be completed in one sitting.
            </div>

            <div className="form-group">
              <label>I am Located in</label>
              <SelectInput value={formState.locatedIn} onChange={(e) => updateField('locatedIn', e.target.value)}>
                {stateFullNames.map((s) => <option key={s} value={s}>{s}</option>)}
              </SelectInput>
            </div>

            <div className="form-group" style={{ marginTop: 24 }}>
              <label>Select the form you want to complete</label>
              <div className="fc-wiz-radio-cards">
                {options.map((opt) => (
                  <div
                    key={opt.value}
                    className={`fc-wiz-radio-card${formState.claimType === opt.value ? ' selected' : ''}`}
                    onClick={() => updateField('claimType', opt.value)}
                  >
                    <div className="fc-wiz-radio-dot" />
                    <div className="fc-wiz-radio-card-text">
                      <h4>{opt.label}</h4>
                      <p>{opt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isManaged && (
              <div className="fc-wiz-info-callout">
                <InfoIcon />
                <div>
                  <strong>Looking to submit a short term disability claim?</strong> Short term disability claims must be attached to a leave of absence based on your benefits. <a href={`${base}/file-claim/request-leave`}>Go to Request a Leave</a> to continue.
                </div>
              </div>
            )}

            <div className="fc-wiz-footer" style={{ marginTop: 32 }}>
              <button className="btn btn-secondary" onClick={() => { if (!isManaged) { setWizardPhase('intro'); scrollToTop(); } else { navigate(`${base}/file-claim`); } }}>Back</button>
              <button className="btn btn-next" disabled={!formState.claimType} onClick={() => { setWizardPhase('wizard'); goNext(); }}>Complete the Form Online</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Steps rendering
  function renderStep() {
    if (formState.claimType === 'std') return renderSTDStep();
    if (formState.claimType === 'critical_illness') return renderCriticalIllnessStep();
    return renderAccidentHospitalStep();
  }

  /* ======= STD PATH (8 steps) ======= */
  function renderSTDStep() {
    switch (currentStep) {
      case 1: return renderConfirmInfo();
      case 2: return renderContactDetails();
      case 3: return renderSTDClaimEvent();
      case 4: return renderProviderInfo();
      case 5: return renderHours();
      case 6: return renderOtherIncome();
      case 7: return renderTaxWithholding();
      case 8: return renderSTDReview();
      default: return null;
    }
  }

  /* ======= ACCIDENT/HOSPITAL PATH (5 steps) ======= */
  function renderAccidentHospitalStep() {
    switch (currentStep) {
      case 1: return renderConfirmInfo();
      case 2: return renderContactDetails();
      case 3: return renderClaimantPatient();
      case 4: return renderConditionDetails();
      case 5: return renderProviderInfoSimple();
      default: return null;
    }
  }

  /* ======= CRITICAL ILLNESS PATH (7 steps) ======= */
  function renderCriticalIllnessStep() {
    switch (currentStep) {
      case 1: return renderConfirmInfo();
      case 2: return renderContactDetails();
      case 3: return renderClaimantPatient();
      case 4: return renderIllnessProcedure();
      case 5: return renderProviderInfoSimple();
      case 6: return renderMedications();
      case 7: return renderCriticalIllnessReview();
      default: return null;
    }
  }

  /* ======= SHARED STEPS ======= */

  function renderConfirmInfo() {
    return (
      <>
        <h2>Let's confirm your information</h2>
        <p className="fc-wiz-subtitle">Everything looks ready. Just confirm and continue.</p>

        <div className="readonly-card">
          <div className="card-title">Employer Details</div>
          <div className="readonly-grid">
            <ReadonlyField label="Company Name" value={formState.companyName} />
            <ReadonlyField label="Group ID" value={formState.groupId} />
          </div>
          <div className="readonly-note">This information is provided by your employer. Contact your employer to make changes.</div>
        </div>

        <div className="bordered-section">
          <h3 className="section-title">Employee Details</h3>
          <div className="form-row cols-3">
            <div className="form-group"><label>First Name <span className="req">*</span></label><input type="text" value={formState.firstName} onChange={(e) => updateField('firstName', e.target.value)} /></div>
            <div className="form-group"><label>Middle Initial</label><input type="text" value={formState.middleInitial} onChange={(e) => updateField('middleInitial', e.target.value)} maxLength={1} /></div>
            <div className="form-group"><label>Last Name <span className="req">*</span></label><input type="text" value={formState.lastName} onChange={(e) => updateField('lastName', e.target.value)} /></div>
          </div>
          <div className="form-row cols-2">
            <div className="form-group"><label>Social Security Number</label><input type="text" value={formState.ssn} onChange={(e) => updateField('ssn', e.target.value)} /></div>
            <div className="form-group"><label>Date of Birth <span className="req">*</span></label><DateInput value={formState.dob} onChange={(e) => updateField('dob', e.target.value)} /></div>
          </div>
          <div className="form-group"><label>Job Title</label><input type="text" value={formState.jobTitle} onChange={(e) => updateField('jobTitle', e.target.value)} /></div>
          <div className="form-group"><label>Street Address</label><input type="text" value={formState.street} onChange={(e) => updateField('street', e.target.value)} /></div>
          <div className="form-row cols-3" style={{ marginBottom: 0 }}>
            <div className="form-group" style={{ marginBottom: 0 }}><label>City</label><input type="text" value={formState.city} onChange={(e) => updateField('city', e.target.value)} /></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label>State</label><SelectInput value={formState.state} onChange={(e) => updateField('state', e.target.value)}><option value="">Select...</option>{stateOptions.map((s) => <option key={s} value={s}>{s}</option>)}</SelectInput></div>
            <div className="form-group" style={{ marginBottom: 0 }}><label>Zip</label><input type="text" value={formState.zip} onChange={(e) => updateField('zip', e.target.value)} /></div>
          </div>
        </div>
      </>
    );
  }

  function renderContactDetails() {
    return (
      <>
        <h2>How should we reach you?</h2>
        <p className="fc-wiz-subtitle">Your contact info is on file. Update anything that's changed.</p>

        <div className="bordered-section">
          <h3 className="section-title">Contact Details</h3>
          <div className="form-row cols-2">
            <div className="form-group"><label>Email Address <span className="req">*</span></label><input type="email" value={formState.email} onChange={(e) => updateField('email', e.target.value)} /></div>
            <div className="form-group"><label>Phone (Call) <span className="req">*</span></label><input type="tel" value={formState.phone} onChange={(e) => updateField('phone', e.target.value)} /></div>
          </div>
          <div style={{ marginTop: 4 }}>
            <label style={{ textTransform: 'none', fontSize: 13, fontWeight: 600, letterSpacing: 0, color: 'var(--color-text-primary)', marginBottom: 10, display: 'block' }}>Preferred Communication Method</label>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <CommCheckbox checked={formState.commEmail} onChange={(e) => updateField('commEmail', e.target.checked)} label="Email" />
              <CommCheckbox checked={formState.commPhone} onChange={(e) => updateField('commPhone', e.target.checked)} label="Phone (Call)" />
              <CommCheckbox checked={formState.commSMS} onChange={(e) => updateField('commSMS', e.target.checked)} label="SMS" />
            </div>
          </div>
        </div>

        <div className="bordered-section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="section-title" style={{ marginBottom: 4 }}>Temporary Address</div>
              <p className="helper" style={{ marginTop: 0 }}>Will you be at a different address during your absence?</p>
            </div>
            <div className={`toggle ${formState.tempAddress ? 'on' : ''}`} onClick={() => updateField('tempAddress', !formState.tempAddress)}><div className="toggle-knob" /></div>
          </div>
          {formState.tempAddress && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--color-border-input)' }}>
              <div className="form-group"><label>Street Address</label><input type="text" value={formState.tempStreet} onChange={(e) => updateField('tempStreet', e.target.value)} /></div>
              <div className="form-row cols-3">
                <div className="form-group"><label>City</label><input type="text" value={formState.tempCity} onChange={(e) => updateField('tempCity', e.target.value)} /></div>
                <div className="form-group"><label>State</label><SelectInput value={formState.tempState} onChange={(e) => updateField('tempState', e.target.value)}><option value="">Select...</option>{stateOptions.map((s) => <option key={s} value={s}>{s}</option>)}</SelectInput></div>
                <div className="form-group"><label>ZIP</label><input type="text" value={formState.tempZip} onChange={(e) => updateField('tempZip', e.target.value)} /></div>
              </div>
              <div className="form-row cols-2" style={{ marginBottom: 0 }}>
                <div className="form-group" style={{ marginBottom: 0 }}><label>Start Date</label><DateInput value={formState.tempStart} onChange={(e) => updateField('tempStart', e.target.value)} /></div>
                <div className="form-group" style={{ marginBottom: 0 }}><label>End Date</label><DateInput value={formState.tempEnd} onChange={(e) => updateField('tempEnd', e.target.value)} /></div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  /* ======= STD-SPECIFIC STEPS ======= */

  function renderSTDClaimEvent() {
    return (
      <>
        <h2>Claim Event and Personal Details</h2>
        <p className="fc-wiz-subtitle">Provide details about your disability and the circumstances.</p>

        <div className="bordered-section">
          <div className="form-row cols-3">
            <div className="form-group"><label>Height (ft)</label><input type="number" value={formState.heightFt} onChange={(e) => updateField('heightFt', e.target.value)} /></div>
            <div className="form-group"><label>Height (in)</label><input type="number" value={formState.heightIn} onChange={(e) => updateField('heightIn', e.target.value)} /></div>
            <div className="form-group"><label>Weight (lbs)</label><input type="number" value={formState.weight} onChange={(e) => updateField('weight', e.target.value)} /></div>
          </div>
          <div className="form-row cols-2">
            <div className="form-group"><label>Dominant Hand</label><SelectInput value={formState.dominantHand} onChange={(e) => updateField('dominantHand', e.target.value)}><option value="Right">Right</option><option value="Left">Left</option></SelectInput></div>
            <div className="form-group"><label>Marital Status</label><SelectInput value={formState.maritalStatus} onChange={(e) => updateField('maritalStatus', e.target.value)}><option value="Single">Single</option><option value="Married">Married</option><option value="Divorced">Divorced</option><option value="Widowed">Widowed</option></SelectInput></div>
          </div>
        </div>

        <div className="bordered-section">
          <div className="form-group">
            <label>Date of Disability <span className="req">*</span></label>
            <DateInput value={formState.dateOfDisability} onChange={(e) => updateField('dateOfDisability', e.target.value)} />
            <div className="helper">The first day you were absent from work because of the disabling condition</div>
          </div>
          <div className="form-group">
            <label>Date First Treated <span className="req">*</span></label>
            <DateInput value={formState.dateFirstTreated} onChange={(e) => updateField('dateFirstTreated', e.target.value)} />
            <div className="helper">Date medical care was first sought because of the disabling condition</div>
          </div>
          <div className="form-group">
            <label>Estimated Return to Work Date</label>
            <DateInput value={formState.estimatedReturn} onChange={(e) => updateField('estimatedReturn', e.target.value)} />
            <div className="helper">Your best estimate of when you expect to return to work</div>
          </div>
        </div>

        <div className="bordered-section">
          <div className="form-group">
            <label>Nature of Illness or Injury <span className="req">*</span></label>
            <textarea value={formState.natureOfIllness} onChange={(e) => updateField('natureOfIllness', e.target.value)} placeholder="Describe your illness, injury, or condition. Include symptoms, diagnosis, and how it affects your ability to work." style={{ minHeight: 120 }} />
          </div>
          <div className="form-row cols-3" style={{ marginBottom: 0 }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Was the disability work related?</label>
              <SelectInput value={formState.workRelated} onChange={(e) => updateField('workRelated', e.target.value)}><option value="Yes">Yes</option><option value="No">No</option></SelectInput>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Workers' Compensation claim filed?</label>
              <SelectInput value={formState.workersComp} onChange={(e) => updateField('workersComp', e.target.value)}><option value="Yes">Yes</option><option value="No">No</option></SelectInput>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Motor vehicle or 3rd party liable?</label>
              <SelectInput value={formState.motorVehicle} onChange={(e) => updateField('motorVehicle', e.target.value)}><option value="Yes">Yes</option><option value="No">No</option></SelectInput>
            </div>
          </div>
        </div>
      </>
    );
  }

  function renderProviderInfo() {
    return (
      <>
        <h2>Who is your healthcare provider?</h2>
        <p className="fc-wiz-subtitle">Provide information about your attending healthcare provider(s).</p>

        {formState.providers.map((prov, idx) => (
          <div key={idx} className="bordered-section">
            <h3 className="section-title">Provider {formState.providers.length > 1 ? idx + 1 : ''}</h3>
            <div className="form-row cols-3">
              <div className="form-group"><label>First Name <span className="req">*</span></label><input type="text" value={prov.firstName} onChange={(e) => updateProvider(idx, 'firstName', e.target.value)} /></div>
              <div className="form-group"><label>Last Name <span className="req">*</span></label><input type="text" value={prov.lastName} onChange={(e) => updateProvider(idx, 'lastName', e.target.value)} /></div>
              <div className="form-group"><label>Suffix</label><SelectInput value={prov.suffix} onChange={(e) => updateProvider(idx, 'suffix', e.target.value)}><option value="MD">MD</option><option value="DO">DO</option><option value="NP">NP</option><option value="PA">PA</option></SelectInput></div>
            </div>
            <div className="form-group"><label>Specialty</label><input type="text" value={prov.specialty} onChange={(e) => updateProvider(idx, 'specialty', e.target.value)} /></div>
            <div className="form-row cols-2">
              <div className="form-group"><label>Phone</label><input type="tel" value={prov.phone} onChange={(e) => updateProvider(idx, 'phone', e.target.value)} /></div>
              <div className="form-group"><label>Fax</label><input type="tel" value={prov.fax} onChange={(e) => updateProvider(idx, 'fax', e.target.value)} /></div>
            </div>
            <div className="form-group"><label>Street Address</label><input type="text" value={prov.street} onChange={(e) => updateProvider(idx, 'street', e.target.value)} /></div>
            <div className="form-row cols-3">
              <div className="form-group"><label>City</label><input type="text" value={prov.city} onChange={(e) => updateProvider(idx, 'city', e.target.value)} /></div>
              <div className="form-group"><label>State</label><SelectInput value={prov.state} onChange={(e) => updateProvider(idx, 'state', e.target.value)}><option value="">Select...</option>{stateOptions.map((s) => <option key={s} value={s}>{s}</option>)}</SelectInput></div>
              <div className="form-group"><label>ZIP</label><input type="text" value={prov.zip} onChange={(e) => updateProvider(idx, 'zip', e.target.value)} /></div>
            </div>
            <div className="form-row cols-2" style={{ marginBottom: 0 }}>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Date Seen From</label><DateInput value={prov.dateFrom} onChange={(e) => updateProvider(idx, 'dateFrom', e.target.value)} /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Date Seen To</label><DateInput value={prov.dateTo} onChange={(e) => updateProvider(idx, 'dateTo', e.target.value)} /></div>
            </div>
          </div>
        ))}

        <button type="button" className="rotation-add" onClick={addProvider}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Add Another Provider
        </button>
      </>
    );
  }

  function renderHours() {
    return (
      <>
        <h2>How many hours do you work per week?</h2>
        <p className="fc-wiz-subtitle">This should reflect your usual work schedule.</p>
        <div className="bordered-section">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Hours Worked Per Week <span className="req">*</span></label>
            <input type="number" value={formState.hoursPerWeek} onChange={(e) => updateField('hoursPerWeek', e.target.value)} />
          </div>
        </div>
      </>
    );
  }

  function renderOtherIncome() {
    return (
      <>
        <h2>Other Income</h2>
        <p className="fc-wiz-subtitle">Select all forms of income you have filed for, are receiving, or are eligible for.</p>
        <div className="bordered-section">
          <div className="fc-wiz-income-grid">
            {otherIncomeOptions.map((item) => (
              <div key={item} className="fc-wiz-income-item" onClick={() => toggleOtherIncome(item)}>
                <div className={`checkbox-box${formState.otherIncome.includes(item) ? ' checked' : ''}`}><span className="check-icon">{'✓'}</span></div>
                <span>{item}</span>
              </div>
            ))}
          </div>
          {formState.otherIncome.includes('Other') && (
            <div className="form-group" style={{ marginTop: 16, marginBottom: 0 }}>
              <label>Please specify</label>
              <input type="text" value={formState.otherIncomeText} onChange={(e) => updateField('otherIncomeText', e.target.value)} placeholder="Include Individual or Group benefits" />
            </div>
          )}
        </div>
      </>
    );
  }

  function renderTaxWithholding() {
    return (
      <>
        <h2>Tax Withholding</h2>
        <p className="fc-wiz-subtitle">If your request for benefits is approved, should Mutual of Omaha/United of Omaha withhold income taxes from your benefit checks?</p>
        <div className="bordered-section">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Withhold Income Taxes</label>
            <SelectInput value={formState.taxWithholding} onChange={(e) => updateField('taxWithholding', e.target.value)}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </SelectInput>
          </div>
        </div>
      </>
    );
  }

  function renderSTDReview() {
    return (
      <>
        <h2>Review &amp; Submit</h2>
        <p className="fc-wiz-subtitle">Please review everything below before submitting.</p>

        <div className="br-section">
          <div className="br-section-header"><h3>Employer Details</h3></div>
          <div className="br-grid">
            <ReviewField label="Company Name" value={formState.companyName} />
            <ReviewField label="Group ID" value={formState.groupId} />
          </div>
        </div>

        <div className="fc-wiz-accordion">
          <button className="fc-wiz-accordion-trigger" type="button">Something doesn't look right?</button>
          <div className="fc-wiz-accordion-body">Contact your employer to make changes to your company information.</div>
        </div>

        <div className="br-section" style={{ marginTop: 16 }}>
          <div className="br-section-header"><h3>Employee Details</h3><button className="br-section-edit" onClick={() => jumpToStep(1)}>Edit</button></div>
          <div className="br-grid">
            <ReviewField label="Full Name" value={`${formState.firstName} ${formState.middleInitial} ${formState.lastName}`} />
            <ReviewField label="SSN" value={formState.ssn} />
            <ReviewField label="Date of Birth" value={formatDate(formState.dob)} />
            <ReviewField label="Job Title" value={formState.jobTitle} />
            <ReviewField label="Address" value={`${formState.street}, ${formState.city}, ${formState.state} ${formState.zip}`} />
          </div>
        </div>

        <div className="br-section">
          <div className="br-section-header"><h3>Contact Details</h3><button className="br-section-edit" onClick={() => jumpToStep(2)}>Edit</button></div>
          <div className="br-grid">
            <ReviewField label="Email" value={formState.email} />
            <ReviewField label="Phone" value={formState.phone} />
          </div>
        </div>

        <div className="br-section">
          <div className="br-section-header"><h3>Claim Event and Personal Details</h3><button className="br-section-edit" onClick={() => jumpToStep(3)}>Edit</button></div>
          <div className="br-grid">
            <ReviewField label="Height" value={`${formState.heightFt}'${formState.heightIn}"`} />
            <ReviewField label="Weight" value={`${formState.weight} lbs`} />
            <ReviewField label="Dominant Hand" value={formState.dominantHand} />
            <ReviewField label="Marital Status" value={formState.maritalStatus} />
            <ReviewField label="Date of Disability" value={formatDate(formState.dateOfDisability)} />
            <ReviewField label="Date First Treated" value={formatDate(formState.dateFirstTreated)} />
            <ReviewField label="Estimated Return" value={formatDate(formState.estimatedReturn)} />
            <ReviewField label="Work Related" value={formState.workRelated} />
          </div>
          <div style={{ marginTop: 12 }}>
            <div className="br-field-label">Nature of Illness</div>
            <div className="br-field-value">{formState.natureOfIllness || '—'}</div>
          </div>
        </div>

        <div className="br-section">
          <div className="br-section-header"><h3>Healthcare Provider</h3><button className="br-section-edit" onClick={() => jumpToStep(4)}>Edit</button></div>
          {formState.providers.map((prov, idx) => (
            <div key={idx} className="br-grid" style={{ marginBottom: idx < formState.providers.length - 1 ? 16 : 0 }}>
              <ReviewField label="Provider Name" value={`${prov.firstName} ${prov.lastName}, ${prov.suffix}`} />
              <ReviewField label="Specialty" value={prov.specialty} />
              <ReviewField label="Phone" value={prov.phone} />
              <ReviewField label="Address" value={`${prov.street}, ${prov.city}, ${prov.state} ${prov.zip}`} />
            </div>
          ))}
        </div>

        <div className="br-section">
          <div className="br-section-header"><h3>Hours Worked Per Week</h3><button className="br-section-edit" onClick={() => jumpToStep(5)}>Edit</button></div>
          <div className="br-grid">
            <ReviewField label="Hours/Week" value={formState.hoursPerWeek} />
          </div>
        </div>

        <div className="br-section">
          <div className="br-section-header"><h3>Other Income</h3><button className="br-section-edit" onClick={() => jumpToStep(6)}>Edit</button></div>
          <div className="br-grid">
            <ReviewField label="Selected" value={formState.otherIncome.length > 0 ? formState.otherIncome.join(', ') : 'None'} />
          </div>
        </div>

        <div className="br-section">
          <div className="br-section-header"><h3>Tax Withholding</h3><button className="br-section-edit" onClick={() => jumpToStep(7)}>Edit</button></div>
          <div className="br-grid">
            <ReviewField label="Withhold Taxes" value={formState.taxWithholding} />
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <div className="checkbox-row" onClick={() => updateField('ackReviewed', !formState.ackReviewed)} style={{ marginBottom: 12 }}>
            <div className={`checkbox-box${formState.ackReviewed ? ' checked' : ''}`}><span className="check-icon">{'✓'}</span></div>
            <div className="checkbox-text">I acknowledge that I have reviewed the completed form above.</div>
          </div>
          <div className="checkbox-row" onClick={() => updateField('ackFraud', !formState.ackFraud)}>
            <div className={`checkbox-box${formState.ackFraud ? ' checked' : ''}`}><span className="check-icon">{'✓'}</span></div>
            <div className="checkbox-text">I have read and understand the fraud warnings outlined in the form above.</div>
          </div>
        </div>

        <div className="fc-wiz-info-callout" style={{ marginTop: 20 }}>
          <InfoIcon />
          <div>Please note, the form will not be complete until you click Submit. By continuing, you confirm that the information above is accurate to the best of your knowledge. Your case manager may follow up if additional details are needed.</div>
        </div>
      </>
    );
  }

  /* ======= PATH B SPECIFIC ======= */

  function renderClaimantPatient() {
    return (
      <>
        <h2>Are you the Claimant/Patient?</h2>
        <p className="fc-wiz-subtitle">Indicate if you are submitting this claim for yourself or on behalf of a dependent.</p>
        <div className="bordered-section">
          <div className="radio-list">
            <label className="radio-option" onClick={() => updateField('isClaimant', 'yes')}><span className={`radio-circle${formState.isClaimant === 'yes' ? ' selected' : ''}`} /> Yes, I am the patient</label>
            <label className="radio-option" onClick={() => updateField('isClaimant', 'no')}><span className={`radio-circle${formState.isClaimant === 'no' ? ' selected' : ''}`} /> No, I am submitting on behalf of a dependent</label>
          </div>
        </div>
      </>
    );
  }

  function renderConditionDetails() {
    return (
      <>
        <h2>Condition Details</h2>
        <p className="fc-wiz-subtitle">Provide information about the condition for which you are filing this claim.</p>

        <div className="bordered-section">
          <div className="form-group">
            <label>Cause for Condition <span className="req">*</span></label>
            <SelectInput value={formState.causeForCondition} onChange={(e) => updateField('causeForCondition', e.target.value)}>
              <option value="Illness">Illness</option>
              <option value="Accident">Accident</option>
              <option value="Injury">Injury</option>
            </SelectInput>
          </div>
          <div className="form-group">
            <label>Please describe your health condition <span className="req">*</span></label>
            <textarea value={formState.conditionDescription} onChange={(e) => updateField('conditionDescription', e.target.value)} placeholder="Describe your condition, symptoms, and how it affects you." style={{ minHeight: 100 }} />
          </div>
          <div className="form-group">
            <label>Date first treated by physician</label>
            <DateInput value={formState.dateFirstTreatedB} onChange={(e) => updateField('dateFirstTreatedB', e.target.value)} />
          </div>
        </div>

        <div className="bordered-section">
          <label style={{ textTransform: 'none', fontSize: 14, fontWeight: 500, letterSpacing: 0, color: 'var(--color-text-primary)' }}>Were you hospitalized?</label>
          <div className="radio-list" style={{ marginTop: 8 }}>
            <label className="radio-option" onClick={() => updateField('wasHospitalized', 'yes')}><span className={`radio-circle${formState.wasHospitalized === 'yes' ? ' selected' : ''}`} /> Yes</label>
            <label className="radio-option" onClick={() => updateField('wasHospitalized', 'no')}><span className={`radio-circle${formState.wasHospitalized === 'no' ? ' selected' : ''}`} /> No</label>
          </div>
          {formState.wasHospitalized === 'yes' && (
            <div style={{ marginTop: 16 }}>
              <div className="form-group"><label>Name of Facility</label><input type="text" value={formState.hospitalName} onChange={(e) => updateField('hospitalName', e.target.value)} /></div>
              <div className="form-row cols-2">
                <div className="form-group"><label>Phone Number</label><input type="tel" value={formState.hospitalPhone} onChange={(e) => updateField('hospitalPhone', e.target.value)} /></div>
              </div>
              <div className="form-group"><label>Street Address</label><input type="text" value={formState.hospitalStreet} onChange={(e) => updateField('hospitalStreet', e.target.value)} /></div>
              <div className="form-row cols-3">
                <div className="form-group"><label>City</label><input type="text" value={formState.hospitalCity} onChange={(e) => updateField('hospitalCity', e.target.value)} /></div>
                <div className="form-group"><label>State</label><SelectInput value={formState.hospitalState} onChange={(e) => updateField('hospitalState', e.target.value)}><option value="">Select...</option>{stateOptions.map((s) => <option key={s} value={s}>{s}</option>)}</SelectInput></div>
                <div className="form-group"><label>ZIP</label><input type="text" value={formState.hospitalZip} onChange={(e) => updateField('hospitalZip', e.target.value)} /></div>
              </div>
              <div className="form-group"><label>Reason for hospital admission/confinement</label><textarea value={formState.hospitalReason} onChange={(e) => updateField('hospitalReason', e.target.value)} style={{ minHeight: 80 }} /></div>
            </div>
          )}
        </div>

        <div className="bordered-section">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Please provide any necessary information related to your claim</label>
            <textarea value={formState.additionalInfo} onChange={(e) => updateField('additionalInfo', e.target.value)} placeholder="Any additional details that may support your claim." style={{ minHeight: 80 }} />
          </div>
        </div>
      </>
    );
  }

  function renderProviderInfoSimple() {
    return (
      <>
        <h2>Who is your healthcare provider?</h2>
        <p className="fc-wiz-subtitle">Provide your attending healthcare provider information.</p>

        {formState.providers.map((prov, idx) => (
          <div key={idx} className="bordered-section">
            <div className="form-row cols-3">
              <div className="form-group"><label>First Name <span className="req">*</span></label><input type="text" value={prov.firstName} onChange={(e) => updateProvider(idx, 'firstName', e.target.value)} /></div>
              <div className="form-group"><label>Last Name <span className="req">*</span></label><input type="text" value={prov.lastName} onChange={(e) => updateProvider(idx, 'lastName', e.target.value)} /></div>
              <div className="form-group"><label>Suffix</label><SelectInput value={prov.suffix} onChange={(e) => updateProvider(idx, 'suffix', e.target.value)}><option value="MD">MD</option><option value="DO">DO</option><option value="NP">NP</option><option value="PA">PA</option></SelectInput></div>
            </div>
            <div className="form-row cols-2">
              <div className="form-group"><label>Phone</label><input type="tel" value={prov.phone} onChange={(e) => updateProvider(idx, 'phone', e.target.value)} /></div>
              <div className="form-group"><label>Fax</label><input type="tel" value={prov.fax} onChange={(e) => updateProvider(idx, 'fax', e.target.value)} /></div>
            </div>
            <div className="form-group"><label>Street Address</label><input type="text" value={prov.street} onChange={(e) => updateProvider(idx, 'street', e.target.value)} /></div>
            <div className="form-row cols-3" style={{ marginBottom: 0 }}>
              <div className="form-group" style={{ marginBottom: 0 }}><label>City</label><input type="text" value={prov.city} onChange={(e) => updateProvider(idx, 'city', e.target.value)} /></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>State</label><SelectInput value={prov.state} onChange={(e) => updateProvider(idx, 'state', e.target.value)}><option value="">Select...</option>{stateOptions.map((s) => <option key={s} value={s}>{s}</option>)}</SelectInput></div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>ZIP</label><input type="text" value={prov.zip} onChange={(e) => updateProvider(idx, 'zip', e.target.value)} /></div>
            </div>
          </div>
        ))}

        <button type="button" className="rotation-add" onClick={addProvider}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Add Another Provider
        </button>
      </>
    );
  }

  /* ======= CRITICAL ILLNESS SPECIFIC ======= */

  function renderIllnessProcedure() {
    const categories = [
      { key: 'autoimmune', label: 'Autoimmune Disorders' },
      { key: 'neurological_movement', label: 'Neurological Movement Disorders' },
      { key: 'family_planning', label: 'Family Planning Conditions' },
      { key: 'childhood', label: 'Childhood Conditions' },
      { key: 'cancer', label: 'Cancer and Benign Tumor Diagnoses' },
      { key: 'neurological_brain', label: 'Neurological Brain and Skull Conditions' },
      { key: 'mental_illness', label: 'Mental Illness Conditions' },
      { key: 'infectious', label: 'Infectious Conditions' },
      { key: 'vascular_pulmonary', label: 'Vascular and Pulmonary Conditions' },
      { key: 'organ', label: 'Organ Conditions' },
      { key: 'functional_loss', label: 'Functional Loss' },
      { key: 'occupational', label: 'Occupational Diagnoses' },
      { key: 'additional_benefits', label: 'Additional Benefits' },
    ];

    return (
      <>
        <h2>Illness/Procedure Information</h2>
        <p className="fc-wiz-subtitle">Please check the illness/procedure for which this claim is being filed, and submit any relevant test results, hospital discharge summary and/or detailed medical records with this form. The Illness/Procedure selected below must be included in your Certificate for the Claim to be considered. Refer to the Definitions in your Certificate for additional information on what is covered.</p>

        <div className="bordered-section">
          <div className="fc-wiz-category-grid">
            {categories.map((cat) => (
              <div key={cat.key} className="form-group" style={{ marginBottom: 12 }}>
                <label>{cat.label}</label>
                <SelectInput value={formState.illnessCategories[cat.key]} onChange={(e) => updateIllnessCategory(cat.key, e.target.value)}>
                  <option value="">Select...</option>
                  <option value="diagnosed">Diagnosed</option>
                  <option value="procedure">Procedure Required</option>
                  <option value="treatment">Treatment Ongoing</option>
                </SelectInput>
              </div>
            ))}
          </div>
        </div>

        <div className="bordered-section">
          <div className="form-group">
            <label>Date of Illness/Procedure</label>
            <DateInput value={formState.illnessProcedureDate} onChange={(e) => updateField('illnessProcedureDate', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Describe the illness or procedure <span className="req">*</span></label>
            <textarea value={formState.illnessDescription} onChange={(e) => updateField('illnessDescription', e.target.value)} placeholder="Provide details about the illness or procedure." style={{ minHeight: 100 }} />
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={{ textTransform: 'none', fontSize: 14, fontWeight: 500, letterSpacing: 0, color: 'var(--color-text-primary)' }}>Has patient ever had the same or similar illness/procedure?</label>
            <div className="radio-list" style={{ marginTop: 8 }}>
              <label className="radio-option" onClick={() => updateField('hadSimilarIllness', 'yes')}><span className={`radio-circle${formState.hadSimilarIllness === 'yes' ? ' selected' : ''}`} /> Yes</label>
              <label className="radio-option" onClick={() => updateField('hadSimilarIllness', 'no')}><span className={`radio-circle${formState.hadSimilarIllness === 'no' ? ' selected' : ''}`} /> No</label>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={{ textTransform: 'none', fontSize: 14, fontWeight: 500, letterSpacing: 0, color: 'var(--color-text-primary)' }}>Has a benefit ever been paid for the patient under any other Critical Illness/Specified Disease Policy sponsored by the Policyholder/Employer?</label>
            <div className="radio-list" style={{ marginTop: 8 }}>
              <label className="radio-option" onClick={() => updateField('hadBenefitPaid', 'yes')}><span className={`radio-circle${formState.hadBenefitPaid === 'yes' ? ' selected' : ''}`} /> Yes</label>
              <label className="radio-option" onClick={() => updateField('hadBenefitPaid', 'no')}><span className={`radio-circle${formState.hadBenefitPaid === 'no' ? ' selected' : ''}`} /> No</label>
            </div>
          </div>
        </div>
      </>
    );
  }

  function renderMedications() {
    return (
      <>
        <h2>Illness/Procedure Information</h2>
        <p className="fc-wiz-subtitle">This section is required if this claim is being filed within the first year following the effective date of insurance for the Patient.</p>

        <div className="bordered-section">
          <label style={{ textTransform: 'none', fontSize: 14, fontWeight: 500, letterSpacing: 0, color: 'var(--color-text-primary)' }}>Has patient ever had the same or similar illness/procedure?</label>
          <div className="radio-list" style={{ marginTop: 8 }}>
            <label className="radio-option" onClick={() => updateField('hadSimilarMeds', 'yes')}><span className={`radio-circle${formState.hadSimilarMeds === 'yes' ? ' selected' : ''}`} /> Yes</label>
            <label className="radio-option" onClick={() => updateField('hadSimilarMeds', 'no')}><span className={`radio-circle${formState.hadSimilarMeds === 'no' ? ' selected' : ''}`} /> No</label>
          </div>
        </div>

        <div className="bordered-section">
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>List any over-the-counter drugs, prescription drugs or medication taken by the patient for any reason within the year prior to the effective date of insurance for the patient.</p>
          {formState.medications.map((med, idx) => (
            <div key={idx} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: idx < formState.medications.length - 1 ? '1px solid var(--color-border-input)' : 'none' }}>
              <div className="form-group"><label>Name of Drug/Medicine</label><input type="text" value={med.name} onChange={(e) => updateMedication(idx, 'name', e.target.value)} /></div>
              <div className="form-row cols-2">
                <div className="form-group"><label>First Date Taken</label><DateInput value={med.firstDate} onChange={(e) => updateMedication(idx, 'firstDate', e.target.value)} /></div>
                <div className="form-group"><label>Last Date Taken</label><DateInput value={med.lastDate} onChange={(e) => updateMedication(idx, 'lastDate', e.target.value)} /></div>
              </div>
              <div className="form-row cols-2">
                <div className="form-group"><label>Pharmacy Name</label><input type="text" value={med.pharmacy} onChange={(e) => updateMedication(idx, 'pharmacy', e.target.value)} /></div>
                <div className="form-group"><label>Phone Number</label><input type="tel" value={med.pharmacyPhone} onChange={(e) => updateMedication(idx, 'pharmacyPhone', e.target.value)} /></div>
              </div>
              <div className="form-row cols-2">
                <div className="form-group"><label>City</label><input type="text" value={med.pharmacyCity} onChange={(e) => updateMedication(idx, 'pharmacyCity', e.target.value)} /></div>
                <div className="form-group"><label>State</label><SelectInput value={med.pharmacyState} onChange={(e) => updateMedication(idx, 'pharmacyState', e.target.value)}><option value="">Select...</option>{stateOptions.map((s) => <option key={s} value={s}>{s}</option>)}</SelectInput></div>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}><label>Prescribing Physician Name</label><input type="text" value={med.prescriber} onChange={(e) => updateMedication(idx, 'prescriber', e.target.value)} /></div>
            </div>
          ))}
          <button type="button" className="rotation-add" onClick={addMedication}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Add Another Drug/Medicine
          </button>
        </div>
      </>
    );
  }

  function renderCriticalIllnessReview() {
    return (
      <>
        <h2>Review &amp; Submit</h2>
        <p className="fc-wiz-subtitle">Please review everything below before submitting.</p>

        <div className="br-section">
          <div className="br-section-header"><h3>Employer Details</h3></div>
          <div className="br-grid">
            <ReviewField label="Company Name" value={formState.companyName} />
            <ReviewField label="Group ID" value={formState.groupId} />
          </div>
        </div>

        <div className="br-section">
          <div className="br-section-header"><h3>Employee Details</h3><button className="br-section-edit" onClick={() => jumpToStep(1)}>Edit</button></div>
          <div className="br-grid">
            <ReviewField label="Full Name" value={`${formState.firstName} ${formState.middleInitial} ${formState.lastName}`} />
            <ReviewField label="SSN" value={formState.ssn} />
            <ReviewField label="Date of Birth" value={formatDate(formState.dob)} />
            <ReviewField label="Job Title" value={formState.jobTitle} />
          </div>
        </div>

        <div className="br-section">
          <div className="br-section-header"><h3>Contact Details</h3><button className="br-section-edit" onClick={() => jumpToStep(2)}>Edit</button></div>
          <div className="br-grid">
            <ReviewField label="Email" value={formState.email} />
            <ReviewField label="Phone" value={formState.phone} />
          </div>
        </div>

        <div className="br-section">
          <div className="br-section-header"><h3>Claimant/Patient</h3><button className="br-section-edit" onClick={() => jumpToStep(3)}>Edit</button></div>
          <div className="br-grid">
            <ReviewField label="Is Claimant" value={formState.isClaimant === 'yes' ? 'Yes' : 'No'} />
          </div>
        </div>

        <div className="br-section">
          <div className="br-section-header"><h3>Illness/Procedure</h3><button className="br-section-edit" onClick={() => jumpToStep(4)}>Edit</button></div>
          <div className="br-grid">
            <ReviewField label="Date" value={formatDate(formState.illnessProcedureDate)} />
            <ReviewField label="Similar Illness" value={formState.hadSimilarIllness === 'yes' ? 'Yes' : 'No'} />
          </div>
          <div style={{ marginTop: 12 }}>
            <div className="br-field-label">Description</div>
            <div className="br-field-value">{formState.illnessDescription || '—'}</div>
          </div>
        </div>

        <div className="br-section">
          <div className="br-section-header"><h3>Healthcare Provider</h3><button className="br-section-edit" onClick={() => jumpToStep(5)}>Edit</button></div>
          {formState.providers.map((prov, idx) => (
            <div key={idx} className="br-grid" style={{ marginBottom: idx < formState.providers.length - 1 ? 16 : 0 }}>
              <ReviewField label="Provider Name" value={`${prov.firstName} ${prov.lastName}, ${prov.suffix}`} />
              <ReviewField label="Phone" value={prov.phone} />
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24 }}>
          <div className="checkbox-row" onClick={() => updateField('ackReviewed', !formState.ackReviewed)} style={{ marginBottom: 12 }}>
            <div className={`checkbox-box${formState.ackReviewed ? ' checked' : ''}`}><span className="check-icon">{'✓'}</span></div>
            <div className="checkbox-text">I acknowledge that I have reviewed the completed form above.</div>
          </div>
          <div className="checkbox-row" onClick={() => updateField('ackFraud', !formState.ackFraud)}>
            <div className={`checkbox-box${formState.ackFraud ? ' checked' : ''}`}><span className="check-icon">{'✓'}</span></div>
            <div className="checkbox-text">I have read and understand the fraud warnings outlined in the form above.</div>
          </div>
        </div>

        <div className="fc-wiz-info-callout" style={{ marginTop: 20 }}>
          <InfoIcon />
          <div>Please note, the form will not be complete until you click Submit. By continuing, you confirm that the information above is accurate to the best of your knowledge. Your case manager may follow up if additional details are needed.</div>
        </div>
      </>
    );
  }

  /* ======= MAIN RENDER ======= */

  const isLastStep = currentStep === totalSteps;
  const isReviewStep = (formState.claimType === 'std' && currentStep === 8) ||
    (formState.claimType === 'critical_illness' && currentStep === 7);
  const isSubmitStep = isReviewStep || isLastStep;

  return (
    <div className="fc-wiz-shell">
      <div className="fc-wiz-wrap">
        {/* Progress */}
        <div className="fc-wiz-stepper">
          <span className="fc-wiz-stepper-counter">Step <strong>{currentStep}</strong> of {totalSteps}</span>
        </div>
        <div className="fc-wiz-progress-bar">
          <div className="fc-wiz-progress-fill" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
        </div>

        {/* Card */}
        <div className="fc-wiz-card">
          <div className="fc-wiz-step-content">
            {renderStep()}
          </div>

          {/* Footer */}
          <div className="fc-wiz-footer">
            <div className="fc-wiz-footer-left">
              <button className="btn btn-back" onClick={goBack}>Back</button>
            </div>
            <div className="fc-wiz-footer-right">
              {isReviewStep ? (
                <button className="btn btn-submit" disabled={!formState.ackReviewed || !formState.ackFraud} onClick={handleSubmit}>Submit</button>
              ) : isLastStep ? (
                <button className="btn btn-submit" onClick={handleSubmit}>Submit</button>
              ) : (
                <button className="btn btn-next" onClick={goNext}>Next</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
