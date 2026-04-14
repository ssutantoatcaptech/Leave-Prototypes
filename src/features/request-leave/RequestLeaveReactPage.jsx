import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import '../overview/overview-react.css';
import './request-leave-react.css';

const DRAFT_KEY = 'requestLeaveReactDraft';

const initialState = {
  employee: {
    firstName: 'Sarah',
    lastName: 'Johnson',
    address: '456 Oak Avenue, New York, NY 10001',
    hireDate: '2022-01-15',
    occupation: 'Senior Marketing Manager',
    workLocation: 'New York, NY',
    employer: 'EnterpriseCorp Inc.',
    employmentType: 'Full-time',
    employeeId: 'EMP-2026-4821',
  },
  email: 'sarah.johnson@company.com',
  phone: '(555) 123-4567',
  commEmail: true,
  commPhone: false,
  commSMS: true,
  tempAddress: true,
  tempStreet: '8827 SW 8th Street',
  tempCity: 'Lee Summit',
  tempState: 'MO',
  tempZip: '64086',
  tempStart: '2026-05-01',
  tempEnd: '2026-08-15',
  leaveType: 'continuous',
  alreadyMissedTime: false,
  missedDateEntries: [{ date: '2026-04-28', hours: '8' }],
  reducedHoursPerWeek: '20',
  leaveStartDate: '2026-06-01',
  expectedReturnDate: '2026-09-15',
  scheduleHours: { sun: '0', mon: '8', tue: '8', wed: '8', thu: '8', fri: '8', sat: '0' },
  extraWeeks: [],
  childScenario: 'birth',
  childAlreadyExists: false,
  childDate: '',
  expectedDate: '2026-06-15',
  childName: 'Baby Johnson',
  childDob: '',
  spouseSameEmployer: false,
  spouseName: '',
  primaryCaregiver: true,
  bondingIntent: 'immediate',
  providerName: 'Dr. Dempsey',
  providerSuffix: 'OB-GYN',
  providerFacility: "St. Luke's Medical Center",
  providerPhone: '(816) 457-2934',
  providerFax: '(816) 457-2935',
  providerEmail: 'dempsey.herbett@stlukes.com',
  providerStreet: '123 Main Street, Unit 404',
  providerCity: 'Lee Summit',
  providerState: 'MO',
  providerZip: '64064',
  authorizeMedCert: true,
  diagnosis: '',
  firstTreatment: '',
  nextAppointment: '',
  familyFirstName: '',
  familyLastName: '',
  familyRelationship: '',
  familyDob: '',
  workersComp: 'no',
  leaveScenario: '',
  seriousHealthCondition: true,
  episodeFrequency: '2-3 times per month',
  episodeDuration: '1-2 days per episode',
};

const planConfig = {
  fmla: { tenureMonths: 12, hoursRequired: 1250, maxWeeks: 12 },
  std: { offered: true, waitingDays: 7, durationWeeks: 26, percentPay: 60 },
  statePFL: { state: 'NY', offered: true, bondingWeeks: 12, caregivingWeeks: 12, percentPay: 67 },
  companyBonding: { offered: true, paidWeeks: 6, percentPay: 100 },
};

const stateOptions = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'];

const optionIcons = {
  continuous: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="#3d3d47" strokeWidth="1.5"/><path d="M3 10h18" stroke="#3d3d47" strokeWidth="1.5"/><path d="M8 3v4M16 3v4" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  intermittent: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#3d3d47" strokeWidth="1.5"/><path d="M12 7v5l3.5 2" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  reduced: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 12a9 9 0 11-9-9" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 7v5h4" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  medical_self: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 4v16M4 12h16" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/><rect x="3" y="3" width="18" height="18" rx="3" stroke="#3d3d47" strokeWidth="1.5"/></svg>,
  medical_family: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="#3d3d47" strokeWidth="1.5"/></svg>,
  child_nonbirth: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="7" r="4" stroke="#3d3d47" strokeWidth="1.5"/><path d="M20 8v6M17 11h6" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  child: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3" stroke="#3d3d47" strokeWidth="1.5"/><path d="M8 16c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 17v3M10 22h4" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  military: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.25 3.75 10.13 9 11.25 5.25-1.12 9-6 9-11.25V7l-9-5z" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  other: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#3d3d47" strokeWidth="1.5"/><circle cx="8" cy="12" r="1" fill="#3d3d47"/><circle cx="12" cy="12" r="1" fill="#3d3d47"/><circle cx="16" cy="12" r="1" fill="#3d3d47"/></svg>,
  birth: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3" stroke="#3d3d47" strokeWidth="1.5"/><path d="M8 16c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  adoption: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-6 9 6" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 9v9a2 2 0 002 2h12a2 2 0 002-2V9" stroke="#3d3d47" strokeWidth="1.5"/></svg>,
  foster: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="7" r="4" stroke="#3d3d47" strokeWidth="1.5"/><path d="M20 8v6M17 11h6" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  immediate: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  later: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="#3d3d47" strokeWidth="1.5"/><path d="M14 15l2 2 3-3" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  unsure: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#3d3d47" strokeWidth="1.5"/><path d="M9 9a3 3 0 015.12 1.5c0 1.5-2.12 2-2.12 3.5" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="17" r="0.75" fill="#3d3d47"/></svg>,
};

function formatDate(isoDate) {
  if (!isoDate) return '—';
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function shortDate(isoDate) {
  if (!isoDate) return '—';
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
            <button className="nav-link active" type="button">Absences</button>
            <button className="nav-link" type="button">Support</button>
          </nav>
        </div>
        <div className="nav-utilities">
          <button className="nav-util" type="button">Find ID Card</button>
          <button className="nav-util" type="button">Messages</button>
          <button className="nav-bell" type="button"><span className="nav-bell-dot"/></button>
          <div className="nav-avatar">
            <div className="nav-avatar-circle">SJ</div>
            <span className="nav-avatar-name">Sarah Johnson</span>
          </div>
        </div>
      </div>
      <div className="nav-secondary">
        <Link className="nav-tab" to="/overview-react">Overview</Link>
        <button className="nav-tab active" type="button">Plan &amp; Request Absence</button>
        <button className="nav-tab" type="button">My Absences</button>
      </div>
    </div>
  );
}

function ReadonlyField({ label, value }) {
  return <div className="readonly-field"><div className="field-label">{label}</div><div className="field-value">{value || '—'}</div></div>;
}

function ReviewField({ label, value }) {
  return <div className="review-item"><div className="r-label">{label}</div><div className="r-value">{value || '—'}</div></div>;
}

export default function RequestLeaveReactPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [formState, setFormState] = useState(initialState);
  const [started, setStarted] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [submittedCase, setSubmittedCase] = useState(null);

  const isChildScenario = formState.leaveScenario === 'child' || formState.leaveScenario === 'child_nonbirth';
  const isMedicalScenario = formState.leaveScenario === 'medical_self' || formState.leaveScenario === 'medical_family';

  const steps = useMemo(() => {
    const visibleSteps = [{ id: 'leaveReason', label: 'Reason', title: 'Why do you need time off?' }];
    if (isMedicalScenario) {
      visibleSteps.push({ id: 'medical', label: 'Details', title: formState.leaveScenario === 'medical_family' ? 'About your family member' : 'About your condition' });
      visibleSteps.push({ id: 'provider', label: 'Provider', title: 'Your healthcare provider' });
    }
    visibleSteps.push({ id: 'leaveDates', label: 'Dates', title: 'When does your absence start?' });
    visibleSteps.push({ id: 'leaveType', label: 'Type', title: 'How will you take your absence?' });
    visibleSteps.push({ id: 'leaveDetails', label: 'Schedule', title: 'Your work schedule' });
    if (isChildScenario) {
      visibleSteps.push({ id: 'childScenario', label: 'Child', title: 'How are you welcoming your child?' });
      visibleSteps.push({ id: 'planAware', label: 'Benefits', title: 'Your absence benefits' });
      visibleSteps.push({ id: 'bondingIntent', label: 'Bonding', title: 'Planning your bonding time' });
    }
    visibleSteps.push({ id: 'demographics', label: 'Verify', title: 'Let’s confirm your info' });
    visibleSteps.push({ id: 'contact', label: 'Contact', title: 'How to reach you' });
    visibleSteps.push({ id: 'review', label: 'Review', title: 'Almost done!' });
    return visibleSteps;
  }, [formState.leaveScenario, isChildScenario, isMedicalScenario]);

  const currentStep = steps[currentStepIndex] || steps[0];

  function updateField(key, value) {
    setFormState((previous) => ({ ...previous, [key]: value }));
  }

  function updateEmployeeField(key, value) {
    setFormState((previous) => ({ ...previous, employee: { ...previous.employee, [key]: value } }));
  }

  function setScheduleValue(source, day, value) {
    setFormState((previous) => {
      if (source === 'scheduleHours') {
        return { ...previous, scheduleHours: { ...previous.scheduleHours, [day]: value } };
      }
      const weekIndex = source;
      const nextWeeks = previous.extraWeeks.map((week, index) => (index === weekIndex ? { ...week, [day]: value } : week));
      return { ...previous, extraWeeks: nextWeeks };
    });
  }

  function addExtraWeek() {
    setFormState((previous) => ({
      ...previous,
      extraWeeks: [...previous.extraWeeks, { sun: '0', mon: '8', tue: '8', wed: '8', thu: '8', fri: '8', sat: '0' }],
    }));
  }

  function removeExtraWeek(index) {
    setFormState((previous) => ({ ...previous, extraWeeks: previous.extraWeeks.filter((_, weekIndex) => weekIndex !== index) }));
  }

  function addMissedDateEntry() {
    setFormState((previous) => ({ ...previous, missedDateEntries: [...previous.missedDateEntries, { date: '', hours: '' }] }));
  }

  function updateMissedDateEntry(index, key, value) {
    setFormState((previous) => ({
      ...previous,
      missedDateEntries: previous.missedDateEntries.map((entry, entryIndex) => (entryIndex === index ? { ...entry, [key]: value } : entry)),
    }));
  }

  function removeMissedDateEntry(index) {
    setFormState((previous) => ({
      ...previous,
      missedDateEntries: previous.missedDateEntries.filter((_, entryIndex) => entryIndex !== index),
    }));
  }

  function prefillForScenario(scenario) {
    const prefills = {
      child: {
        diagnosis: 'Pregnancy — expected delivery',
        firstTreatment: '2025-10-15',
        nextAppointment: '2026-05-20',
        providerName: 'Dr. Dempsey',
        providerSuffix: 'OB-GYN',
        providerFacility: "St. Luke's Medical Center",
        providerPhone: '(816) 457-2934',
        providerFax: '(816) 457-2935',
        providerEmail: 'dempsey.herbett@stlukes.com',
        familyFirstName: '',
        familyLastName: '',
        familyRelationship: '',
      },
      child_nonbirth: {
        diagnosis: '',
        firstTreatment: '',
        nextAppointment: '',
        providerName: '',
        providerSuffix: '',
        providerFacility: '',
        providerPhone: '',
        providerFax: '',
        providerEmail: '',
        familyFirstName: '',
        familyLastName: '',
        familyRelationship: '',
      },
      medical_self: {
        diagnosis: 'Lumbar disc herniation — scheduled surgery',
        firstTreatment: '2026-02-20',
        nextAppointment: '2026-04-18',
        providerName: 'Dr. Patel',
        providerSuffix: 'Orthopedic Surgeon',
        providerFacility: 'NYU Langone Orthopedics',
        providerPhone: '(212) 598-6000',
        providerFax: '(212) 598-6001',
        providerEmail: 'r.patel@nyulangone.org',
        familyFirstName: '',
        familyLastName: '',
        familyRelationship: '',
      },
      medical_family: {
        diagnosis: 'Post-stroke rehabilitation',
        firstTreatment: '2026-01-10',
        nextAppointment: '2026-04-25',
        providerName: 'Dr. Lin',
        providerSuffix: 'Neurologist',
        providerFacility: 'Mount Sinai Neurology',
        providerPhone: '(212) 241-7076',
        providerFax: '(212) 241-7077',
        providerEmail: 'c.lin@mountsinai.org',
        familyFirstName: 'Robert',
        familyLastName: 'Johnson',
        familyRelationship: 'parent',
        familyDob: '1958-07-14',
      },
    };
    setFormState((previous) => ({ ...previous, leaveScenario: scenario, ...prefills[scenario] }));
    // Update URL with selected reason
    setSearchParams({ reason: scenario });
  }

  function calculateEligibility() {
    const hireDate = new Date(`${formState.employee.hireDate}T00:00:00`);
    const now = new Date();
    const monthsEmployed = (now.getFullYear() - hireDate.getFullYear()) * 12 + (now.getMonth() - hireDate.getMonth());
    const fmlaEligible = monthsEmployed >= planConfig.fmla.tenureMonths;
    return {
      fmla: {
        eligible: fmlaEligible,
        reason: fmlaEligible ? 'Job-protected, unpaid absence' : `Need ${planConfig.fmla.tenureMonths} months tenure`,
        weeks: fmlaEligible ? planConfig.fmla.maxWeeks : 0,
      },
      std: {
        eligible: formState.leaveScenario === 'medical_self' || (isChildScenario && formState.childScenario === 'birth'),
        reason: `${planConfig.std.percentPay}% pay after ${planConfig.std.waitingDays}-day waiting period`,
        weeks: planConfig.std.durationWeeks,
      },
      statePFL: {
        eligible: isChildScenario || formState.leaveScenario === 'medical_family',
        reason: `${planConfig.statePFL.state} Paid Family Leave`,
        weeks: isChildScenario ? planConfig.statePFL.bondingWeeks : planConfig.statePFL.caregivingWeeks,
      },
      companyBonding: {
        eligible: isChildScenario,
        reason: `${planConfig.companyBonding.paidWeeks} weeks at ${planConfig.companyBonding.percentPay}% pay`,
        weeks: planConfig.companyBonding.paidWeeks,
      },
    };
  }

  const eligibility = calculateEligibility();

  function renderOptionCard(field, value, title, description, tooltipOnly = false, tooltipPosition) {
    const isSelected = formState[field] === value;
    return (
      <div className={`option-card ${isSelected ? 'selected' : ''}${tooltipOnly ? ' has-tooltip' : ''}`} onClick={() => {
        if (field === 'leaveScenario') {
          prefillForScenario(value);
          return;
        }
        updateField(field, value);
      }}>
        <div className="option-radio"><div className="option-radio-dot"/></div>
        {optionIcons[value] ? <div className="option-card-icon">{optionIcons[value]}</div> : null}
        <div className="option-text">
          <h4>{title}</h4>
          {!tooltipOnly ? <p>{description}</p> : null}
        </div>
        {tooltipOnly ? <span className={`oc-tooltip${tooltipPosition === 'right' ? ' oc-tooltip-right' : ''}`}>{description}</span> : null}
      </div>
    );
  }

  function renderEligibilitySummary() {
    const programs = [
      { name: 'FMLA', item: eligibility.fmla },
      { name: 'Short-Term Disability', item: eligibility.std },
      { name: `${planConfig.statePFL.state} Paid Family Leave`, item: eligibility.statePFL },
      { name: 'Company Bonding Benefit', item: eligibility.companyBonding },
    ].filter(({ item }) => item.eligible);
    if (!programs.length) return null;
    return (
      <div className="elig-summary">
        <div className="elig-summary-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h3>Estimated Eligibility</h3>
        </div>
        <div className="elig-summary-body">
          {programs.map(({ name, item }) => (
            <div key={name} className="elig-program">
              <div>
                <div className="elig-program-name">{name}</div>
                <div className="elig-program-detail">{item.reason}</div>
              </div>
              <div className="elig-program-right">
                <span className="elig-program-duration">{item.weeks} weeks</span>
                <span className="elig-chip eligible">Eligible</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderTimeline() {
    const bars = [
      eligibility.fmla.eligible ? { label: 'FMLA', css: 'fmla', weeks: eligibility.fmla.weeks } : null,
      eligibility.std.eligible ? { label: 'STD', css: 'std', weeks: formState.leaveScenario === 'child' ? 8 : 6 } : null,
      eligibility.statePFL.eligible ? { label: 'PFL', css: 'pfl', weeks: eligibility.statePFL.weeks } : null,
      eligibility.companyBonding.eligible ? { label: 'Company', css: 'company', weeks: eligibility.companyBonding.weeks } : null,
    ].filter(Boolean);
    const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
    return (
      <div className="timeline-wrap">
        <div className="timeline-header">
          <div className="timeline-header-left">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="#3d3d47" strokeWidth="1.5"/><path d="M3 10h18" stroke="#3d3d47" strokeWidth="1.5"/><path d="M8 3v4M16 3v4" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <div>
              <h3>Absence Timeline</h3>
              <div className="helper">Estimated coverage — subject to approval</div>
            </div>
          </div>
        </div>
        <div className="timeline-body">
          <div className="timeline-axis">{months.map((month) => <span key={month}>{month}</span>)}</div>
          <div className="timeline-bars">
            {bars.map((bar) => (
              <div key={bar.label} className="timeline-bar-row">
                <div className="timeline-bar-label">{bar.label}</div>
                <div className="timeline-bar-track">
                  <div className={`timeline-bar-fill ${bar.css}`} style={{ width: `${Math.min((bar.weeks / 28) * 100, 100)}%` }}>{bar.label} · {bar.weeks}wk</div>
                </div>
              </div>
            ))}
          </div>
          <div className="timeline-legend">
            {bars.map((bar) => <div key={bar.label} className="timeline-legend-item"><span className={`timeline-legend-dot ${bar.css}`}/>{bar.label}</div>)}
          </div>
        </div>
      </div>
    );
  }

  function goNext() {
    setCurrentStepIndex((index) => Math.min(index + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goBack() {
    setCurrentStepIndex((index) => Math.max(index - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function jumpToStep(stepId) {
    const stepIndex = steps.findIndex((step) => step.id === stepId);
    if (stepIndex >= 0) {
      setCurrentStepIndex(stepIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function saveAndExit() {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ formState, stepIndex: currentStepIndex }));
    navigate('/overview-react');
  }

  function submitRequest() {
    const reference = `LV-2026-${String(Date.now()).slice(-4)}`;
    setSubmittedCase({
      id: reference,
      startDate: formState.leaveStartDate,
      endDate: formState.expectedReturnDate,
      submittedOn: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    });
  }

  function renderMissedEntries() {
    return (
      <>
        {formState.missedDateEntries.map((entry, index) => (
          <div key={`${index}-${entry.date}`} style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', marginBottom: '10px' }}>
            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
              <label>{index === 0 ? 'Date missed' : 'Date'}</label>
              <input type="date" value={entry.date} onChange={(event) => updateMissedDateEntry(index, 'date', event.target.value)}/>
            </div>
            <div className="form-group" style={{ width: '100px', marginBottom: 0 }}>
              <label>{index === 0 ? 'Hours' : 'Hours'}</label>
              <input type="number" value={entry.hours} onChange={(event) => updateMissedDateEntry(index, 'hours', event.target.value)}/>
            </div>
            {formState.missedDateEntries.length > 1 ? <button type="button" className="btn btn-back" style={{ padding: '8px 12px' }} onClick={() => removeMissedDateEntry(index)}>Remove</button> : null}
          </div>
        ))}
        <button type="button" className="rotation-add" onClick={addMissedDateEntry}>Add another date</button>
      </>
    );
  }

  function renderStepContent() {
    switch (currentStep.id) {
      case 'leaveReason':
        return (
          <>
            <h2>Select Reason For Absence</h2>
            <div className="option-cards">
              {renderOptionCard('leaveScenario', 'medical_self', 'Employee’s Own Illness or Injury', 'You need time off for surgery, illness, injury, or recovery.', true)}
              {renderOptionCard('leaveScenario', 'medical_family', 'Care for Sick Family Member with Health Condition', 'Someone close to you needs your care due to a serious health condition.', true)}
              {renderOptionCard('leaveScenario', 'child_nonbirth', 'Non-Birthing Parent, Adoption, or Foster Care Placement (Bonding)', 'You’re welcoming a child through adoption, foster care, or as a non-birthing parent.', true, 'right')}
              {renderOptionCard('leaveScenario', 'child', 'Birthing Parent, Pregnancy, or Bonding', 'You’re having a baby or need time for pregnancy and bonding.', true)}
              {renderOptionCard('leaveScenario', 'military', 'Military Related Activity', 'You need time off for qualifying military exigency or to care for a service member.', true)}
              {renderOptionCard('leaveScenario', 'other', 'Other', 'Your reason doesn’t fit the categories above.', true)}
            </div>
          </>
        );
      case 'medical':
        if (formState.leaveScenario === 'medical_family') {
          return (
            <>
              <h2>Tell us about the person you’re caring for</h2>
              <p className="subtitle">We need a few details about your family member to determine your coverage.</p>
              <div className="bordered-section">
                <div className="form-row cols-2">
                  <div className="form-group"><label>First Name <span className="req">*</span></label><input type="text" value={formState.familyFirstName} onChange={(event) => updateField('familyFirstName', event.target.value)}/></div>
                  <div className="form-group"><label>Last Name <span className="req">*</span></label><input type="text" value={formState.familyLastName} onChange={(event) => updateField('familyLastName', event.target.value)}/></div>
                </div>
                <div className="form-row cols-2">
                  <div className="form-group"><label>Relationship <span className="req">*</span></label><select value={formState.familyRelationship} onChange={(event) => updateField('familyRelationship', event.target.value)}><option value="">Select...</option><option value="spouse">Spouse</option><option value="parent">Parent</option><option value="child">Child</option><option value="sibling">Sibling</option><option value="other">Other</option></select></div>
                  <div className="form-group"><label>Date of Birth</label><input type="date" value={formState.familyDob} onChange={(event) => updateField('familyDob', event.target.value)}/></div>
                </div>
              </div>
              <div className="bordered-section">
                <div className="form-group"><label>Diagnosis / Condition</label><input type="text" value={formState.diagnosis} onChange={(event) => updateField('diagnosis', event.target.value)}/></div>
                <div className="form-row cols-2" style={{ marginBottom: 0 }}>
                  <div className="form-group" style={{ marginBottom: 0 }}><label>First Date of Treatment</label><input type="date" value={formState.firstTreatment} onChange={(event) => updateField('firstTreatment', event.target.value)}/></div>
                  <div className="form-group" style={{ marginBottom: 0 }}><label>Next Scheduled Appointment</label><input type="date" value={formState.nextAppointment} onChange={(event) => updateField('nextAppointment', event.target.value)}/></div>
                </div>
              </div>
            </>
          );
        }
        return (
          <>
            <h2>About your condition</h2>
            <p className="subtitle">Your provider will handle the clinical certification. This helps us start the right process.</p>
            <div className="form-group"><label>Diagnosis / Condition <span className="req">*</span></label><input type="text" value={formState.diagnosis} onChange={(event) => updateField('diagnosis', event.target.value)}/></div>
            <div className="form-row cols-2">
              <div className="form-group"><label>First Date of Treatment</label><input type="date" value={formState.firstTreatment} onChange={(event) => updateField('firstTreatment', event.target.value)}/></div>
              <div className="form-group"><label>Next Scheduled Appointment</label><input type="date" value={formState.nextAppointment} onChange={(event) => updateField('nextAppointment', event.target.value)}/></div>
            </div>
            <div className="divider"/>
            <label>Will you be hospitalized or need ongoing treatment?</label>
            <div className="yesno">
              <button type="button" className={`yesno-btn ${formState.seriousHealthCondition ? 'selected' : ''}`} onClick={() => updateField('seriousHealthCondition', true)}>Yes</button>
              <button type="button" className={`yesno-btn ${formState.seriousHealthCondition === false ? 'selected' : ''}`} onClick={() => updateField('seriousHealthCondition', false)}>No</button>
            </div>
          </>
        );
      case 'provider':
        return (
          <>
            <h2>Who is your healthcare provider?</h2>
            <p className="subtitle">We’ll need to send them a form to certify your absence.</p>
            <div className="bordered-section">
              <div className="form-group"><label>Facility / Practice Name</label><input type="text" value={formState.providerFacility} onChange={(event) => updateField('providerFacility', event.target.value)}/></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', marginBottom: '20px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}><label>Provider Name <span className="req">*</span></label><input type="text" value={formState.providerName} onChange={(event) => updateField('providerName', event.target.value)}/></div>
                <div className="form-group" style={{ marginBottom: 0, minWidth: '120px' }}><label>Suffix</label><input type="text" value={formState.providerSuffix} onChange={(event) => updateField('providerSuffix', event.target.value)}/></div>
              </div>
              <div className="form-row cols-2">
                <div className="form-group"><label>Phone</label><input type="tel" value={formState.providerPhone} onChange={(event) => updateField('providerPhone', event.target.value)}/></div>
                <div className="form-group"><label>Fax</label><input type="tel" value={formState.providerFax} onChange={(event) => updateField('providerFax', event.target.value)}/></div>
              </div>
              <div className="form-group"><label>Email</label><input type="email" value={formState.providerEmail} onChange={(event) => updateField('providerEmail', event.target.value)}/></div>
              <div className="form-group"><label>Street Address</label><input type="text" value={formState.providerStreet} onChange={(event) => updateField('providerStreet', event.target.value)}/></div>
              <div className="form-row cols-3" style={{ marginBottom: 0 }}>
                <div className="form-group" style={{ marginBottom: 0 }}><label>City</label><input type="text" value={formState.providerCity} onChange={(event) => updateField('providerCity', event.target.value)}/></div>
                <div className="form-group" style={{ marginBottom: 0 }}><label>State</label><select value={formState.providerState} onChange={(event) => updateField('providerState', event.target.value)}><option value="">Select...</option>{stateOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>
                <div className="form-group" style={{ marginBottom: 0 }}><label>ZIP</label><input type="text" value={formState.providerZip} onChange={(event) => updateField('providerZip', event.target.value)}/></div>
              </div>
            </div>
            <div className="bordered-section" style={{ background: '#fff' }}>
              <div className="checkbox-row" onClick={() => updateField('authorizeMedCert', !formState.authorizeMedCert)}>
                <div className={`checkbox-box ${formState.authorizeMedCert ? 'checked' : ''}`}><span className="check-icon">✓</span></div>
                <div>
                  <div className="checkbox-text">I authorize sending medical certification to my provider</div>
                  <div className="checkbox-desc">We'll send your provider a form to complete to support your absence request.</div>
                </div>
              </div>
            </div>
          </>
        );
      case 'leaveDates':
        return (
          <>
            <h2>When does your absence start?</h2>
            <p className="subtitle">If you’re not sure of the exact date yet, give us your best estimate.</p>
            <div className="bordered-section">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}><label>Anticipated Start Date <span className="req">*</span></label><input type="date" value={formState.leaveStartDate} onChange={(event) => updateField('leaveStartDate', event.target.value)}/></div>
                <div className="form-group" style={{ marginBottom: 0 }}><label>Expected Return Date</label><input type="date" value={formState.expectedReturnDate} onChange={(event) => updateField('expectedReturnDate', event.target.value)}/><div className="helper">Your best estimate of when you expect to return to work.</div></div>
              </div>
            </div>
          </>
        );
      case 'leaveType':
        return (
          <>
            <h2>How will you take your absence?</h2>
            <p className="subtitle">This helps us figure out which benefits and protections apply.</p>
            <div className="lt-picker">
              {['continuous', 'intermittent', 'reduced'].map((type) => (
                <button key={type} type="button" className={`lt-btn ${formState.leaveType === type ? 'selected' : ''}`} onClick={() => updateField('leaveType', type)}>
                  <span className="lt-btn-icon">{optionIcons[type]}</span>
                  <span className="lt-btn-label">{type === 'continuous' ? 'Continuous' : type === 'intermittent' ? 'Intermittent' : 'Reduced Schedule'}</span>
                </button>
              ))}
            </div>
            <div className="lt-context">
              <p className="lt-context-desc">{formState.leaveType === 'continuous' ? 'You’ll be fully away from work for the duration of your absence.' : formState.leaveType === 'intermittent' ? 'You’ll take time off periodically for flare-ups, treatments, or appointments.' : 'You’ll continue working but with fewer hours or days per week.'}</p>
              <div className="lt-detail-fields">
                {formState.leaveType === 'intermittent' ? (
                  <div className="form-row cols-2">
                    <div className="form-group"><label>How often do you need time off?</label><select value={formState.episodeFrequency} onChange={(event) => updateField('episodeFrequency', event.target.value)}><option>2-3 times per month</option><option>About once a week</option><option>About once a month</option><option>It’s unpredictable</option></select></div>
                    <div className="form-group"><label>How long does each episode last?</label><select value={formState.episodeDuration} onChange={(event) => updateField('episodeDuration', event.target.value)}><option>1-2 days per episode</option><option>A few hours</option><option>About 1 day</option><option>More than 3 days</option></select></div>
                  </div>
                ) : null}
                {formState.leaveType === 'reduced' ? <div className="form-group"><label>Hours per week you plan to work</label><input type="number" value={formState.reducedHoursPerWeek} onChange={(event) => updateField('reducedHoursPerWeek', event.target.value)}/></div> : null}
                <div className="lt-detail-req-label">Have you already missed work time because of this condition?</div>
                <div className="yesno" style={{ marginBottom: 0 }}>
                  <button type="button" className={`yesno-btn ${formState.alreadyMissedTime ? 'selected' : ''}`} onClick={() => updateField('alreadyMissedTime', true)}>Yes</button>
                  <button type="button" className={`yesno-btn ${formState.alreadyMissedTime === false ? 'selected' : ''}`} onClick={() => updateField('alreadyMissedTime', false)}>No</button>
                </div>
                {formState.alreadyMissedTime ? <div style={{ marginTop: '12px' }}>{renderMissedEntries()}</div> : null}
              </div>
            </div>
          </>
        );
      case 'leaveDetails':
        return (
          <>
            <h2>What does your typical work week look like?</h2>
            <p className="subtitle">This should reflect your usual work schedule before your absence.</p>
            <div className="bordered-section">
              <div className="section-title">Week 1</div>
              <div className="schedule-grid">
                {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day, index) => (
                  <div key={day} className="schedule-day">
                    <div className="schedule-day-label">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}</div>
                    <div className="schedule-day-wrap">
                      <div className={`schedule-day-box ${Number(formState.scheduleHours[day]) > 0 ? 'has-hours' : ''}${day === 'sun' || day === 'sat' ? ' weekend' : ''}`}>
                        <input className="schedule-day-input" type="number" value={formState.scheduleHours[day]} onChange={(event) => setScheduleValue('scheduleHours', day, event.target.value)}/>
                      </div>
                      <div className="schedule-day-unit">hrs</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {formState.extraWeeks.map((week, weekIndex) => (
              <div key={`week-${weekIndex}`} className="bordered-section">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div className="section-title" style={{ marginBottom: 0 }}>Week {weekIndex + 2}</div>
                  <button type="button" className="rotation-remove" onClick={() => removeExtraWeek(weekIndex)}>Remove</button>
                </div>
                <div className="schedule-grid">
                  {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day, index) => (
                    <div key={`${weekIndex}-${day}`} className="schedule-day">
                      <div className="schedule-day-label">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}</div>
                      <div className="schedule-day-wrap">
                        <div className={`schedule-day-box ${Number(week[day]) > 0 ? 'has-hours' : ''}${day === 'sun' || day === 'sat' ? ' weekend' : ''}`}>
                          <input className="schedule-day-input" type="number" value={week[day]} onChange={(event) => setScheduleValue(weekIndex, day, event.target.value)}/>
                        </div>
                        <div className="schedule-day-unit">hrs</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button type="button" className="rotation-add" onClick={addExtraWeek}><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>Add another week</button>
          </>
        );
      case 'childScenario':
        return (
          <>
            <h2>How are you welcoming your child?</h2>
            <p className="subtitle">This helps us determine which benefits apply.</p>
            <div className="lt-picker">
              {['birth', 'adoption', 'foster'].map((type) => (
                <button key={type} type="button" className={`lt-btn ${formState.childScenario === type ? 'selected' : ''}`} onClick={() => updateField('childScenario', type)}>
                  <span className="lt-btn-icon">{optionIcons[type]}</span>
                  <span className="lt-btn-label">{type === 'birth' ? 'Birth' : type === 'adoption' ? 'Adoption' : 'Foster Care'}</span>
                </button>
              ))}
            </div>
            <div className="lt-context">
              <p className="lt-context-desc">{formState.childScenario === 'birth' ? 'Includes medical recovery time plus bonding leave.' : 'Includes bonding leave from the date of placement.'}</p>
              <div className="lt-detail-fields">
                {formState.childScenario === 'foster' ? (
                  <div className="form-group" style={{ marginBottom: 0 }}><label>Placement Date <span className="req">*</span></label><input type="date" value={formState.childDate} onChange={(event) => updateField('childDate', event.target.value)}/></div>
                ) : (
                  <>
                    <label>{formState.childScenario === 'birth' ? 'Has the birth already occurred?' : 'Has the child been placed with you yet?'}</label>
                    <div className="yesno" style={{ marginBottom: 0 }}>
                      <button type="button" className={`yesno-btn ${formState.childAlreadyExists ? 'selected' : ''}`} onClick={() => updateField('childAlreadyExists', true)}>Yes</button>
                      <button type="button" className={`yesno-btn ${formState.childAlreadyExists === false ? 'selected' : ''}`} onClick={() => updateField('childAlreadyExists', false)}>No</button>
                    </div>
                    <div style={{ marginTop: '14px' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}><label>{formState.childAlreadyExists ? (formState.childScenario === 'birth' ? 'Date of Birth' : 'Placement Date') : (formState.childScenario === 'birth' ? 'Expected Due Date' : 'Expected Placement Date')} <span className="req">*</span></label><input type="date" value={formState.childAlreadyExists ? formState.childDate : formState.expectedDate} onChange={(event) => formState.childAlreadyExists ? updateField('childDate', event.target.value) : updateField('expectedDate', event.target.value)}/></div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        );
      case 'planAware':
        return (
          <>
            <h2>A couple more questions</h2>
            <p className="subtitle">These help us determine the right combination of benefits for your situation.</p>
            <div className="bordered-section">
              <div className="section-title">Spousal Sharing</div>
              <p className="helper">Does your spouse or domestic partner work for the same company?</p>
              <div className="yesno" style={{ marginBottom: 0 }}>
                <button type="button" className={`yesno-btn ${formState.spouseSameEmployer ? 'selected' : ''}`} onClick={() => updateField('spouseSameEmployer', true)}>Yes</button>
                <button type="button" className={`yesno-btn ${formState.spouseSameEmployer === false ? 'selected' : ''}`} onClick={() => updateField('spouseSameEmployer', false)}>No</button>
              </div>
              {formState.spouseSameEmployer ? <div className="form-group" style={{ marginTop: '12px', marginBottom: 0 }}><label>Spouse / Partner Name <span className="req">*</span></label><input type="text" value={formState.spouseName} onChange={(event) => updateField('spouseName', event.target.value)}/></div> : null}
            </div>
            <div className="bordered-section">
              <div className="section-title">Primary Caregiver</div>
              <p className="helper">Will you be the primary caregiver for this child?</p>
              <div className="yesno" style={{ marginBottom: 0 }}>
                <button type="button" className={`yesno-btn ${formState.primaryCaregiver === true ? 'selected' : ''}`} onClick={() => updateField('primaryCaregiver', true)}>Yes</button>
                <button type="button" className={`yesno-btn ${formState.primaryCaregiver === false ? 'selected' : ''}`} onClick={() => updateField('primaryCaregiver', false)}>No</button>
                <button type="button" className={`yesno-btn ${formState.primaryCaregiver === 'unsure' ? 'selected' : ''}`} onClick={() => updateField('primaryCaregiver', 'unsure')}>Not sure yet</button>
              </div>
            </div>
            {renderEligibilitySummary()}
            {renderTimeline()}
          </>
        );
      case 'bondingIntent':
        return (
          <>
            <h2>When would you like to bond with your child?</h2>
            <p className="subtitle">Bonding time is time set aside for you to be with your new child.</p>
            <div className="info-box"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#3b82f6" strokeWidth="1.2"/><path d="M8 7.5V11" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="5.5" r="0.75" fill="#3b82f6"/></svg><p><strong>What is bonding time?</strong> It’s dedicated time to be with your new child — separate from any medical recovery.</p></div>
            <div className="option-cards">
              {renderOptionCard('bondingIntent', 'immediate', 'Right away', 'I want to go straight from recovery into bonding time.')}
              {renderOptionCard('bondingIntent', 'later', 'I’ll come back first', 'I’d like to return to work and take bonding time later.')}
              {renderOptionCard('bondingIntent', 'unsure', 'Not sure yet', 'I’ll figure it out later — that’s totally fine.')}
            </div>
          </>
        );
      case 'demographics':
        return (
          <>
            <h2>Let’s confirm your information</h2>
            <p className="subtitle">Everything looks ready. Just confirm and continue.</p>
            <div className="readonly-card">
              <div className="card-title">Current Employee Record</div>
              <div className="readonly-grid">
                <ReadonlyField label="Full Name" value={`${formState.employee.firstName} ${formState.employee.lastName}`}/>
                <ReadonlyField label="Employee ID" value={formState.employee.employeeId}/>
                <ReadonlyField label="Occupation" value={formState.employee.occupation}/>
                <ReadonlyField label="Hire Date" value={formatDate(formState.employee.hireDate)}/>
                <ReadonlyField label="Work Location" value={formState.employee.workLocation}/>
                <ReadonlyField label="Employer" value={formState.employee.employer}/>
                <ReadonlyField label="Employment Type" value={formState.employee.employmentType}/>
                <ReadonlyField label="Address" value={formState.employee.address}/>
              </div>
              <div className="readonly-note">This information is provided by your employer. Contact your employer to make changes.</div>
            </div>
          </>
        );
      case 'contact':
        return (
          <>
            <h2>How should we reach you?</h2>
            <p className="subtitle">We’ll use this to send updates about your absence request. You can always change these later.</p>
            <div className="bordered-section">
              <div className="form-row cols-2">
                <div className="form-group"><label>Email Address <span className="req">*</span></label><input type="email" value={formState.email} onChange={(event) => updateField('email', event.target.value)}/></div>
                <div className="form-group"><label>Phone (Call) <span className="req">*</span></label><input type="tel" value={formState.phone} onChange={(event) => updateField('phone', event.target.value)}/></div>
              </div>
              <div style={{ marginTop: '4px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#3d3d47', display: 'block', marginBottom: '10px' }}>Preferred Communication Method</label>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <label className="comm-check"><input type="checkbox" checked={formState.commEmail} onChange={(event) => updateField('commEmail', event.target.checked)}/> Email</label>
                  <label className="comm-check"><input type="checkbox" checked={formState.commPhone} onChange={(event) => updateField('commPhone', event.target.checked)}/> Phone (Call)</label>
                  <label className="comm-check"><input type="checkbox" checked={formState.commSMS} onChange={(event) => updateField('commSMS', event.target.checked)}/> SMS</label>
                </div>
              </div>
            </div>
            <div className="bordered-section">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div className="section-title" style={{ marginBottom: '4px' }}>Temporary Address</div>
                  <p className="helper" style={{ marginTop: 0 }}>Will you be at a different address during your absence?</p>
                </div>
                <div className={`toggle ${formState.tempAddress ? 'on' : ''}`} onClick={() => updateField('tempAddress', !formState.tempAddress)}><div className="toggle-knob"/></div>
              </div>
              {formState.tempAddress ? (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e8e8ec' }}>
                  <div className="form-group"><label>Street Address</label><input type="text" value={formState.tempStreet} onChange={(event) => updateField('tempStreet', event.target.value)}/></div>
                  <div className="form-row cols-3">
                    <div className="form-group"><label>City</label><input type="text" value={formState.tempCity} onChange={(event) => updateField('tempCity', event.target.value)}/></div>
                    <div className="form-group"><label>State</label><select value={formState.tempState} onChange={(event) => updateField('tempState', event.target.value)}>{stateOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>
                    <div className="form-group"><label>ZIP</label><input type="text" value={formState.tempZip} onChange={(event) => updateField('tempZip', event.target.value)}/></div>
                  </div>
                  <div className="form-row cols-2" style={{ marginBottom: 0 }}>
                    <div className="form-group" style={{ marginBottom: 0 }}><label>Start Date</label><input type="date" value={formState.tempStart} onChange={(event) => updateField('tempStart', event.target.value)}/></div>
                    <div className="form-group" style={{ marginBottom: 0 }}><label>End Date</label><input type="date" value={formState.tempEnd} onChange={(event) => updateField('tempEnd', event.target.value)}/></div>
                  </div>
                </div>
              ) : null}
            </div>
          </>
        );
      case 'review':
        return (
          <>
            <h2>Confirm Your Information</h2>
            <p className="subtitle">Please review everything below before submitting.</p>
            <div className="br-section">
              <div className="br-section-header"><h3>Employee Information</h3></div>
              <div className="br-grid">
                <ReviewField label="Name" value={`${formState.employee.firstName} ${formState.employee.lastName}`}/>
                <ReviewField label="Employee ID" value={formState.employee.employeeId}/>
                <ReviewField label="Employer" value={formState.employee.employer}/>
                <ReviewField label="Occupation" value={formState.employee.occupation}/>
                <ReviewField label="Work Location" value={formState.employee.workLocation}/>
                <ReviewField label="Hire Date" value={formatDate(formState.employee.hireDate)}/>
              </div>
            </div>
            <div className="br-section">
              <div className="br-section-header"><h3>Contact Information</h3><button className="br-section-edit" type="button" onClick={() => jumpToStep('contact')}>Edit</button></div>
              <div className="br-grid">
                <ReviewField label="Email" value={formState.email}/>
                <ReviewField label="Phone" value={formState.phone}/>
                <ReviewField label="Preferred Communication" value={[formState.commEmail ? 'Email' : '', formState.commPhone ? 'Phone' : '', formState.commSMS ? 'SMS' : ''].filter(Boolean).join(', ')}/>
                {formState.tempAddress ? <ReviewField label="Temporary Address" value={`${formState.tempStreet}, ${formState.tempCity}, ${formState.tempState} ${formState.tempZip}`}/> : null}
              </div>
            </div>
            <div className="br-section">
              <div className="br-section-header"><h3>Absence Details</h3><button className="br-section-edit" type="button" onClick={() => jumpToStep('leaveDates')}>Edit</button></div>
              <div className="br-grid">
                <ReviewField label="Reason" value={formState.leaveScenario || '—'}/>
                <ReviewField label="Absence Type" value={formState.leaveType}/>
                <ReviewField label="Start Date" value={formatDate(formState.leaveStartDate)}/>
                <ReviewField label="Expected Return Date" value={formatDate(formState.expectedReturnDate)}/>
              </div>
            </div>
            {isChildScenario ? (
              <div className="br-section">
                <div className="br-section-header"><h3>Child &amp; Bonding</h3><button className="br-section-edit" type="button" onClick={() => jumpToStep('childScenario')}>Edit</button></div>
                <div className="br-grid">
                  <ReviewField label="Scenario" value={formState.childScenario}/>
                  <ReviewField label="Expected Date" value={formatDate(formState.childDate || formState.expectedDate)}/>
                  <ReviewField label="Primary Caregiver" value={formState.primaryCaregiver === true ? 'Yes' : formState.primaryCaregiver === false ? 'No' : 'Not sure yet'}/>
                  <ReviewField label="Bonding Plan" value={formState.bondingIntent}/>
                </div>
              </div>
            ) : null}
            {isMedicalScenario ? (
              <div className="br-section">
                <div className="br-section-header"><h3>Healthcare Provider</h3><button className="br-section-edit" type="button" onClick={() => jumpToStep('provider')}>Edit</button></div>
                <div className="br-grid">
                  <ReviewField label="Provider" value={`${formState.providerName}${formState.providerSuffix ? `, ${formState.providerSuffix}` : ''}`}/>
                  <ReviewField label="Facility" value={formState.providerFacility}/>
                  <ReviewField label="Phone" value={formState.providerPhone}/>
                  <ReviewField label="Address" value={`${formState.providerStreet}, ${formState.providerCity}, ${formState.providerState} ${formState.providerZip}`}/>
                </div>
              </div>
            ) : null}
          </>
        );
      default:
        return null;
    }
  }

  function renderFooter() {
    if (currentStep.id === 'review') {
      return (
        <div className="wizard-footer">
          <div className="footer-left">
            <button type="button" className="btn btn-back" onClick={goBack}>← Back</button>
            <button type="button" className="btn btn-save" onClick={saveAndExit}>Save & Exit</button>
          </div>
          <button type="button" className="btn btn-submit" onClick={submitRequest}>Submit Absence Request</button>
        </div>
      );
    }
    return (
      <div className="wizard-footer">
        <div className="footer-left">
          {currentStepIndex > 0 ? <button type="button" className="btn btn-back" onClick={goBack}>← Back</button> : <div/>}
          <button type="button" className="btn btn-save" onClick={saveAndExit}>Save & Exit</button>
        </div>
        <button type="button" className="btn btn-next" onClick={goNext}>Continue →</button>
      </div>
    );
  }

  if (submittedCase) {
    return (
      <div className="request-leave-shell">
        <SiteNav />
        <div className="wizard-wrap">
          <div className="wizard-card" style={{ marginTop: 32 }}>
            <div className="success-state">
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div className="success-icon"><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M9 16L14 21L23 11" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                <h2 style={{ marginBottom: 4 }}>Absence Request Submitted</h2>
                <p style={{ color: '#62626e', fontSize: 14, margin: 0 }}>Your absence request has been submitted for review.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px', background: '#f9f9fb', border: '1px solid #e8e8ec', borderRadius: 10, padding: '16px 20px', marginBottom: 24 }}>
                <div><div style={{ fontSize: 11, fontWeight: 600, color: '#737373', textTransform: 'uppercase' }}>Reference</div><div style={{ fontSize: 14, fontWeight: 600, color: '#0f0f14', marginTop: 2 }}>{submittedCase.id}</div></div>
                <div><div style={{ fontSize: 11, fontWeight: 600, color: '#737373', textTransform: 'uppercase' }}>Submitted</div><div style={{ fontSize: 14, color: '#0f0f14', marginTop: 2 }}>{submittedCase.submittedOn}</div></div>
                <div><div style={{ fontSize: 11, fontWeight: 600, color: '#737373', textTransform: 'uppercase' }}>Absence dates</div><div style={{ fontSize: 14, color: '#0f0f14', marginTop: 2 }}>{formatDate(submittedCase.startDate)} – {formatDate(submittedCase.endDate)}</div></div>
                <div><div style={{ fontSize: 11, fontWeight: 600, color: '#737373', textTransform: 'uppercase' }}>Status</div><div style={{ marginTop: 4 }}><span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, background: '#FEF3C7', color: '#92400E', padding: '2px 10px', borderRadius: 4 }}>PENDING REVIEW</span></div></div>
              </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', paddingTop: 8, borderTop: '1px solid #e8e8ec' }}>
                <button type="button" className="btn btn-next" onClick={() => navigate('/overview-react')}>Back to Overview</button>
                <button type="button" className="btn btn-back" onClick={() => { setSubmittedCase(null); setStarted(false); setCurrentStepIndex(0); setFormState(initialState); }}>Start another request</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="request-leave-shell">
      <SiteNav />
      {!started ? (
        <div className="wizard-wrap">
          <div className="req-welcome-card">
            <div style={{ fontSize: 11, fontWeight: 700, color: '#737373', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16 }}>Absence Management</div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0f0f14', letterSpacing: '-0.03em', lineHeight: 1.25, margin: '0 0 12px' }}>Submit your<br/>absence request</h2>
            <p style={{ fontSize: 15, color: '#737373', lineHeight: 1.7, maxWidth: 420, margin: '0 auto 36px' }}>We’ll collect your information, absence details, and work schedule — then give you a chance to review everything before submitting.</p>
            <div className="req-welcome-journey">
              {[
                { label: 'Your Info', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke="#525252" strokeWidth="1.5"/></svg> },
                { label: 'Details', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#525252" strokeWidth="1.5"/><path d="M3 9h18M8 2v4M16 2v4" stroke="#525252" strokeWidth="1.5" strokeLinecap="round"/></svg> },
                { label: 'Schedule', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#525252" strokeWidth="1.5"/><path d="M12 6v6l4 2" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                { label: 'Review', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              ].map((phase, index) => (
                <div key={phase.label} style={{ display: 'contents' }}>
                  {index > 0 ? <div className="req-welcome-arrow"><svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div> : null}
                  <div className="req-welcome-step">
                    <div className="req-welcome-step-icon">{phase.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#525252' }}>{phase.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className="btn btn-next" style={{ width: '100%', justifyContent: 'center', padding: '16px 32px', fontSize: 16, borderRadius: 10 }} onClick={() => setStarted(true)}>Start my request</button>
            <div style={{ fontSize: 12, color: '#a0a0a8', marginTop: 14 }}>You’ll be able to review everything before submitting.</div>
            <div style={{ marginTop: 20, fontSize: 13, color: '#a0a0a8' }}>Not ready yet? <Link to="/overview-react" style={{ color: '#525252', fontWeight: 600, textDecoration: 'none' }}>Back to overview →</Link></div>
          </div>
        </div>
      ) : (
        <div className="wizard-wrap">
          <div className="stepper"><div className="stepper-counter">Step <strong>{currentStepIndex + 1}</strong> of <strong>{steps.length}</strong></div><div className="stepper-title">{currentStep.title}</div></div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}/></div>
          <div className="step-meta"/>
          <div className="wizard-card">
            <div className="step-content">{renderStepContent()}{renderFooter()}</div>
          </div>
        </div>
      )}
    </div>
  );
}