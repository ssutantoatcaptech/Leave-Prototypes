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
  sendCertToPhysician: false,
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

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div className="site-footer-col">
            <h4>Resources</h4>
            <a>Leave Policies</a><a>FAQs</a><a>Forms &amp; Documents</a>
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
        <Link className="nav-tab" to="/overview-react">My Leave</Link>
        <Link className="nav-tab" to="/plan-absence">Plan Leave</Link>
        <Link className="nav-tab active" to="/wizard">Request Leave</Link>
        <Link className="nav-tab" to="/absence-history">Leave History</Link>
        <Link className="nav-tab" to="/leave-documents">Leave Documents</Link>
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
  const isBirthingParent = formState.leaveScenario === 'child';
  const isMedicalScenario = formState.leaveScenario === 'medical_self' || formState.leaveScenario === 'medical_family';
  const isMedicalSelf = formState.leaveScenario === 'medical_self';
  const isFamilyCare = formState.leaveScenario === 'medical_family';

  const steps = useMemo(() => {
    const visibleSteps = [{ id: 'leaveReason', label: 'Reason', title: 'Why are you taking leave?' }];
    if (isMedicalSelf) {
      visibleSteps.push({ id: 'leaveStructure', label: 'Structure', title: 'How would you like to structure your leave?' });
      visibleSteps.push({ id: 'leaveDetails', label: 'Schedule', title: 'Tell us about your typical work schedule' });
      visibleSteps.push({ id: 'medical', label: 'Condition', title: 'Tell us about your condition' });
      visibleSteps.push({ id: 'medicalCert', label: 'Certification', title: 'Medical Certifications' });
    } else if (isBirthingParent) {
      visibleSteps.push({ id: 'childScenario', label: 'Child', title: 'How are you welcoming your child?' });
      visibleSteps.push({ id: 'leaveStructure', label: 'Structure', title: 'How will you take your leave?' });
      visibleSteps.push({ id: 'leaveDetails', label: 'Schedule', title: 'What does your typical work week look like?' });
      visibleSteps.push({ id: 'medicalCert', label: 'Certification', title: 'Medical Certifications' });
      visibleSteps.push({ id: 'planAware', label: 'Benefits', title: 'A couple more questions' });
      visibleSteps.push({ id: 'bondingIntent', label: 'Bonding', title: 'When would you like to bond with your child?' });
    } else if (isFamilyCare) {
      visibleSteps.push({ id: 'leaveStructure', label: 'Structure', title: 'How will you take your leave?' });
      visibleSteps.push({ id: 'familyMember', label: 'Family', title: 'Tell us about the person you\u2019re caring for' });
      visibleSteps.push({ id: 'familyCondition', label: 'Condition', title: 'About the condition' });
      visibleSteps.push({ id: 'leaveDetails', label: 'Schedule', title: 'What does your typical work week look like?' });
      visibleSteps.push({ id: 'medicalCert', label: 'Certification', title: 'Medical Certifications' });
    } else {
      visibleSteps.push({ id: 'leaveDates', label: 'Dates', title: 'When does your leave start?' });
      visibleSteps.push({ id: 'leaveType', label: 'Type', title: 'How will you take your leave?' });
      visibleSteps.push({ id: 'leaveDetails', label: 'Schedule', title: 'Your work schedule' });
      if (isChildScenario) {
        visibleSteps.push({ id: 'childScenario', label: 'Child', title: 'How are you welcoming your child?' });
        visibleSteps.push({ id: 'planAware', label: 'Benefits', title: 'Your leave benefits' });
        visibleSteps.push({ id: 'bondingIntent', label: 'Bonding', title: 'Planning your bonding time' });
      }
    }
    visibleSteps.push({ id: 'demographics', label: 'Verify', title: 'Let\u2019s confirm your confirmation' });
    visibleSteps.push({ id: 'contact', label: 'Contact', title: 'How should we reach you?' });
    visibleSteps.push({ id: 'review', label: 'Review', title: 'Review and submit' });
    return visibleSteps;
  }, [formState.leaveScenario, isChildScenario, isBirthingParent, isMedicalScenario, isMedicalSelf, isFamilyCare]);

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
        reason: fmlaEligible ? 'Job-protected, unpaid leave' : `Need ${planConfig.fmla.tenureMonths} months tenure`,
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
        {tooltipOnly && description ? <span className={`oc-tooltip${tooltipPosition === 'right' ? ' oc-tooltip-right' : ''}`}>{description}</span> : null}
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
              <h3>Leave Timeline</h3>
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
    const startDate = new Date(`${formState.leaveStartDate}T00:00:00`);
    const endDate = new Date(`${formState.expectedReturnDate}T00:00:00`);
    const durationDays = Math.max(0, Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)));
    setSubmittedCase({
      id: reference,
      startDate: formState.leaveStartDate,
      endDate: formState.expectedReturnDate,
      durationDays,
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
      case 'leaveReason': {
        const reasonDescriptions = {
          medical_self: 'You need time off for surgery, illness, injury, or recovery.',
          medical_family: 'Someone close to you needs your care due to a serious health condition.',
          child_nonbirth: 'You\u2019re welcoming a child through adoption, foster care, or as a non-birthing parent.',
          child: 'You\u2019re having a baby or need time for pregnancy and bonding.',
          military: 'You need time off for qualifying military exigency or to care for a service member.',
          other: 'Your reason doesn\u2019t fit the categories above.',
        };
        return (
          <>
            <h2 style={{ marginBottom: 20 }}>Why are you taking leave?</h2>
            <div className="option-cards">
              {renderOptionCard('leaveScenario', 'medical_self', 'Employee\u2019s Own Illness or Injury', '', true)}
              {renderOptionCard('leaveScenario', 'medical_family', 'Care for Sick Family Member with Health Condition', '', true)}
              {renderOptionCard('leaveScenario', 'child_nonbirth', 'Non-Birthing Parent, Adoption, or Foster Care Placement (Bonding)', '', true, 'right')}
              {renderOptionCard('leaveScenario', 'child', 'Birthing Parent, Pregnancy, or Bonding', '', true)}
              {renderOptionCard('leaveScenario', 'military', 'Military Related Activity', '', true)}
              {renderOptionCard('leaveScenario', 'other', 'Other', '', true)}
            </div>
            {formState.leaveScenario && reasonDescriptions[formState.leaveScenario] ? (
              <div className="lt-context" style={{ marginTop: 16 }}>
                <p className="lt-context-desc">{reasonDescriptions[formState.leaveScenario]}</p>
              </div>
            ) : null}
          </>
        );
      }
      case 'leaveStructure':
        return (
          <>
            <h2>How would you like to structure your leave?</h2>
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
              <p className="lt-context-desc">{formState.leaveType === 'continuous' ? "You\u2019ll be fully away from work for the duration of your leave." : formState.leaveType === 'intermittent' ? "You\u2019ll take time off periodically — for flare-ups, treatments, or appointments." : "You\u2019ll continue working but with fewer hours per day or days per week."}</p>
              <div className="bordered-section">
                {formState.leaveType === 'continuous' ? (
                  <div className="form-row cols-2" style={{ marginBottom: 0 }}>
                    <div className="form-group" style={{ marginBottom: 0 }}><label>Anticipated Start Date <span className="req">*</span></label><input type="date" value={formState.leaveStartDate} onChange={(event) => updateField('leaveStartDate', event.target.value)}/></div>
                    <div className="form-group" style={{ marginBottom: 0 }}><label>Expected End Date</label><input type="date" value={formState.expectedReturnDate} onChange={(event) => updateField('expectedReturnDate', event.target.value)}/><div className="helper">Your best estimate of when you expect to return to work.</div></div>
                  </div>
                ) : formState.leaveType === 'intermittent' ? (
                  <div className="form-row cols-2" style={{ marginBottom: 0 }}>
                    <div className="form-group" style={{ marginBottom: 0 }}><label>Anticipated Start Date <span className="req">*</span></label><input type="date" value={formState.leaveStartDate} onChange={(event) => updateField('leaveStartDate', event.target.value)}/></div>
                    <div className="form-group" style={{ marginBottom: 0 }}><label>How often do you need time off?</label><input type="text" value={formState.episodeFrequency} onChange={(event) => updateField('episodeFrequency', event.target.value)}/></div>
                  </div>
                ) : (
                  <div className="form-row cols-2" style={{ marginBottom: 0 }}>
                    <div className="form-group" style={{ marginBottom: 0 }}><label>Anticipated Start Date <span className="req">*</span></label><input type="date" value={formState.leaveStartDate} onChange={(event) => updateField('leaveStartDate', event.target.value)}/></div>
                    <div className="form-group" style={{ marginBottom: 0 }}><label>Hours per week you plan to work</label><input type="number" value={formState.reducedHoursPerWeek} onChange={(event) => updateField('reducedHoursPerWeek', event.target.value)}/></div>
                  </div>
                )}
              </div>
            </div>
          </>
        );
      case 'medical':
        if (formState.leaveScenario === 'medical_family') {
          return (
            <>
              <h2>Tell us about the person you\u2019re caring for</h2>
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
            <h2>Tell us about your condition</h2>
            <p className="subtitle">Your provider will handle the clinical certification. This helps us start the right process.</p>
            <div className="form-group"><label>Medical Condition <span className="req">*</span></label><input type="text" value={formState.diagnosis} onChange={(event) => updateField('diagnosis', event.target.value)}/></div>
            <div className="form-row cols-2">
              <div className="form-group"><label>First Date of Treatment</label><input type="date" value={formState.firstTreatment} onChange={(event) => updateField('firstTreatment', event.target.value)}/></div>
              <div className="form-group"><label>Next Scheduled Appointment</label><input type="date" value={formState.nextAppointment} onChange={(event) => updateField('nextAppointment', event.target.value)}/></div>
            </div>
            <div className="divider"/>
            <label>Will you be hospitalized or need ongoing treatment? <span className="req">*</span></label>
            <div className="yesno">
              <button type="button" className={`yesno-btn ${formState.seriousHealthCondition ? 'selected' : ''}`} onClick={() => updateField('seriousHealthCondition', true)}>Yes</button>
              <button type="button" className={`yesno-btn ${formState.seriousHealthCondition === false ? 'selected' : ''}`} onClick={() => updateField('seriousHealthCondition', false)}>No</button>
            </div>
            <div className="divider"/>
            <label>Is your injury/illness related to your job or workplace? <span className="req">*</span></label>
            <div className="yesno" style={{ marginBottom: 0 }}>
              <button type="button" className={`yesno-btn ${formState.workersComp === 'yes' ? 'selected' : ''}`} onClick={() => updateField('workersComp', 'yes')}>Yes</button>
              <button type="button" className={`yesno-btn ${formState.workersComp === 'no' ? 'selected' : ''}`} onClick={() => updateField('workersComp', 'no')}>No</button>
            </div>
          </>
        );
      case 'provider':
        return (
          <>
            <h2>Who is your healthcare provider?</h2>
            <p className="subtitle">We\u2019ll need to send them a form to certify your leave.</p>
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
                  <div className="checkbox-desc">We\u2019ll send your provider a form to complete to support your leave request.</div>
                </div>
              </div>
            </div>
          </>
        );
      case 'familyMember':
        return (
          <>
            <h2>Tell us about the person you’re caring for</h2>
            <p className="subtitle">We need a few details about your family member to determine your coverage.</p>
            <div className="bordered-section">
              <div className="section-title">Family Member Information</div>
              <div className="form-row cols-2">
                <div className="form-group"><label>First Name <span className="req">*</span></label><input type="text" value={formState.familyFirstName} onChange={(event) => updateField('familyFirstName', event.target.value)}/></div>
                <div className="form-group"><label>Last Name <span className="req">*</span></label><input type="text" value={formState.familyLastName} onChange={(event) => updateField('familyLastName', event.target.value)}/></div>
              </div>
              <div className="form-row cols-2" style={{ marginBottom: 0 }}>
                <div className="form-group" style={{ marginBottom: 0 }}><label>Relationship <span className="req">*</span></label><select value={formState.familyRelationship} onChange={(event) => updateField('familyRelationship', event.target.value)}><option value="">Select...</option><option value="spouse">Spouse</option><option value="parent">Parent</option><option value="child">Child</option><option value="sibling">Sibling</option><option value="other">Other</option></select></div>
                <div className="form-group" style={{ marginBottom: 0 }}><label>Date of Birth</label><input type="date" value={formState.familyDob} onChange={(event) => updateField('familyDob', event.target.value)}/></div>
              </div>
            </div>
          </>
        );
      case 'familyCondition':
        return (
          <>
            <h2>About the condition</h2>
            <p className="subtitle">Your provider will handle the clinical certification. This helps us start the right process.</p>
            <div className="bordered-section">
              <div className="form-group"><label>Medical Condition <span className="req">*</span></label><input type="text" value={formState.diagnosis} onChange={(event) => updateField('diagnosis', event.target.value)}/></div>
              <div className="form-row cols-2" style={{ marginBottom: 0 }}>
                <div className="form-group" style={{ marginBottom: 0 }}><label>First Date of Treatment</label><input type="date" value={formState.firstTreatment} onChange={(event) => updateField('firstTreatment', event.target.value)}/></div>
                <div className="form-group" style={{ marginBottom: 0 }}><label>Next Scheduled Appointment</label><input type="date" value={formState.nextAppointment} onChange={(event) => updateField('nextAppointment', event.target.value)}/></div>
              </div>
            </div>
            <div className="divider"/>
            <label>Will your family member be hospitalized or need ongoing treatment? <span className="req">*</span></label>
            <div className="yesno">
              <button type="button" className={`yesno-btn ${formState.seriousHealthCondition ? 'selected' : ''}`} onClick={() => updateField('seriousHealthCondition', true)}>Yes</button>
              <button type="button" className={`yesno-btn ${formState.seriousHealthCondition === false ? 'selected' : ''}`} onClick={() => updateField('seriousHealthCondition', false)}>No</button>
            </div>
            <div className="divider"/>
            <label>Is this condition related to a workplace injury? <span className="req">*</span></label>
            <div className="yesno" style={{ marginBottom: 0 }}>
              <button type="button" className={`yesno-btn ${formState.workersComp === 'yes' ? 'selected' : ''}`} onClick={() => updateField('workersComp', 'yes')}>Yes</button>
              <button type="button" className={`yesno-btn ${formState.workersComp === 'no' ? 'selected' : ''}`} onClick={() => updateField('workersComp', 'no')}>No</button>
            </div>
          </>
        );
      case 'medicalCert':
        return (
          <>
            <h2>Medical Certifications</h2>
            <p className="subtitle">For qualifying medical leave, a healthcare provider certification may be required.</p>
            <div className="bordered-section">
              <label>Would you like us to send the certification form to your physician?</label>
              <div className="yesno" style={{ marginTop: 8 }}>
                <button type="button" className={`yesno-btn ${formState.sendCertToPhysician ? 'selected' : ''}`} onClick={() => updateField('sendCertToPhysician', true)}>Yes</button>
                <button type="button" className={`yesno-btn ${formState.sendCertToPhysician === false ? 'selected' : ''}`} onClick={() => updateField('sendCertToPhysician', false)}>No</button>
              </div>
            </div>
            {formState.sendCertToPhysician ? (
              <>
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
                      <div className="checkbox-desc">We\u2019ll send your provider a form to complete to support your leave request.</div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </>
        );
      case 'leaveDates':
        return (
          <>
            <h2>When does your leave start?</h2>
            <p className="subtitle">If you\u2019re not sure of the exact date yet, give us your best estimate.</p>
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
            <h2>How will you take your leave?</h2>
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
              <p className="lt-context-desc">{formState.leaveType === 'continuous' ? 'You\u2019ll be fully away from work for the duration of your leave.' : formState.leaveType === 'intermittent' ? 'You\u2019ll take time off periodically for flare-ups, treatments, or appointments.' : 'You\u2019ll continue working but with fewer hours or days per week.'}</p>
              <div className="lt-detail-fields">
                {formState.leaveType === 'intermittent' ? (
                  <div className="form-row cols-2">
                    <div className="form-group"><label>How often do you need time off?</label><select value={formState.episodeFrequency} onChange={(event) => updateField('episodeFrequency', event.target.value)}><option>2-3 times per month</option><option>About once a week</option><option>About once a month</option><option>It\u2019s unpredictable</option></select></div>
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
            <h2>Tell us about your typical work schedule</h2>
            <p className="subtitle">This should reflect your usual work schedule before your leave.</p>
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
              <p className="lt-context-desc">{formState.childScenario === 'birth' ? (isBirthingParent ? 'Includes medical recovery time plus bonding leave. Birth parents may also qualify for Short-Term Disability.' : 'Includes medical recovery time plus bonding leave.') : 'Includes bonding leave from the date of placement.'}</p>
              <div className="lt-detail-fields">
                {isBirthingParent ? <div style={{ fontSize: 10, fontWeight: 700, color: '#737373', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Delivery Details</div> : null}
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
              {isBirthingParent ? <p style={{ fontSize: 13, color: '#62626e', lineHeight: 1.6, margin: '0 0 12px' }}>This matters because if you both work here, some bonding time is shared between you (a combined 12 weeks). If not, you each get your own.</p> : null}
              <div className="yesno" style={{ marginBottom: 0 }}>
                <button type="button" className={`yesno-btn ${formState.spouseSameEmployer ? 'selected' : ''}`} onClick={() => updateField('spouseSameEmployer', true)}>Yes</button>
                <button type="button" className={`yesno-btn ${formState.spouseSameEmployer === false ? 'selected' : ''}`} onClick={() => updateField('spouseSameEmployer', false)}>No</button>
              </div>
              {formState.spouseSameEmployer ? <div className="form-group" style={{ marginTop: '12px', marginBottom: 0 }}><label>Spouse / Partner Name <span className="req">*</span></label><input type="text" value={formState.spouseName} onChange={(event) => updateField('spouseName', event.target.value)}/></div> : null}
            </div>
            <div className="bordered-section">
              <div className="section-title">Primary Caregiver</div>
              <p className="helper">Will you be the primary caregiver for this child?</p>
              {isBirthingParent ? <p style={{ fontSize: 13, color: '#62626e', lineHeight: 1.6, margin: '0 0 12px' }}>The primary caregiver is the parent who provides most of the day-to-day care. This can affect the length and type of leave you receive.</p> : null}
              <div className="yesno" style={{ marginBottom: 0 }}>
                <button type="button" className={`yesno-btn ${formState.primaryCaregiver === true ? 'selected' : ''}`} onClick={() => updateField('primaryCaregiver', true)}>Yes</button>
                <button type="button" className={`yesno-btn ${formState.primaryCaregiver === false ? 'selected' : ''}`} onClick={() => updateField('primaryCaregiver', false)}>No</button>
                <button type="button" className={`yesno-btn ${formState.primaryCaregiver === 'unsure' ? 'selected' : ''}`} onClick={() => updateField('primaryCaregiver', 'unsure')}>Not sure yet</button>
              </div>
            </div>
            {renderEligibilitySummary()}
            {!isBirthingParent && renderTimeline()}
          </>
        );
      case 'bondingIntent':
        return (
          <>
            <h2>When would you like to bond with your child?</h2>
            <p className="subtitle">Bonding time is time set aside for you to be with your new child.</p>
            <div className="info-box"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#3b82f6" strokeWidth="1.2"/><path d="M8 7.5V11" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="5.5" r="0.75" fill="#3b82f6"/></svg><p><strong>What is bonding time?</strong> It\u2019s dedicated time to be with your new child — separate from any medical recovery.</p></div>
            <div className="option-cards">
              {renderOptionCard('bondingIntent', 'immediate', 'Right away', 'I want to go straight from recovery into bonding time.')}
              {renderOptionCard('bondingIntent', 'later', 'I\u2019ll come back first', 'I\u2019d like to return to work and take bonding time later.')}
              {renderOptionCard('bondingIntent', 'unsure', 'Not sure yet', 'I\u2019ll figure it out later — that\u2019s totally fine.')}
            </div>
          </>
        );
      case 'demographics':
        return (
          <>
            <h2>Let\u2019s confirm your confirmation</h2>
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
            <p className="subtitle">We\u2019ll use this to send updates about your leave request. You can always change these later.</p>
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
                  <p className="helper" style={{ marginTop: 0 }}>Will you be at a different address during your leave?</p>
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
            <h2>Review and submit</h2>
            <p className="subtitle">Please review everything below before submitting. You can go back and edit any section if something doesn\u2019t look right.</p>
            <div className="br-section">
              <div className="br-section-header"><h3>Employee Information</h3><span style={{ fontSize: 12, color: '#a3a3a3' }}>Provided by employer</span></div>
              <div className="br-grid">
                <ReviewField label="Name" value={`${formState.employee.firstName} ${formState.employee.lastName}`}/>
                <ReviewField label="Employee ID" value={formState.employee.employeeId}/>
                <ReviewField label="Employer" value={formState.employee.employer}/>
                <ReviewField label="Occupation" value={formState.employee.occupation}/>
                <ReviewField label="Work Location" value={formState.employee.workLocation}/>
                <ReviewField label="Hire Date" value={formatDate(formState.employee.hireDate)}/>
                <ReviewField label="Employment Type" value={formState.employee.employmentType}/>
                <ReviewField label="Address" value={formState.employee.address}/>
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
              <div className="br-section-header"><h3>Leave Details</h3><button className="br-section-edit" type="button" onClick={() => jumpToStep((isMedicalSelf || isBirthingParent || isFamilyCare) ? 'leaveStructure' : 'leaveDates')}>Edit</button></div>
              <div className="br-grid">
                <ReviewField label="Reason" value={isMedicalSelf ? 'Own health condition' : isBirthingParent ? 'Welcoming a child' : isFamilyCare ? 'Family care' : (formState.leaveScenario || '—')}/>
                <ReviewField label="Leave Type" value={formState.leaveType === 'continuous' ? 'Continuous' : formState.leaveType === 'intermittent' ? 'Intermittent' : formState.leaveType === 'reduced' ? 'Reduced Schedule' : formState.leaveType}/>
                <ReviewField label="Start Date" value={formatDate(formState.leaveStartDate)}/>
                <ReviewField label="Expected Return Date" value={formatDate(formState.expectedReturnDate)}/>
              </div>
            </div>
            {(isMedicalSelf || isBirthingParent || isFamilyCare) ? (
              <div className="br-section">
                <div className="br-section-header"><h3>Work Schedule</h3><button className="br-section-edit" type="button" onClick={() => jumpToStep('leaveDetails')}>Edit</button></div>
                <div className="br-grid">
                  <ReviewField label="Weekly Schedule" value={['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => `${day} ${formState.scheduleHours[day.toLowerCase().slice(0, 3)]}h`).join(', ')}/>
                </div>
              </div>
            ) : null}
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
            {(isMedicalScenario || isBirthingParent) && formState.sendCertToPhysician ? (
              <div className="br-section">
                <div className="br-section-header"><h3>Healthcare Provider</h3><button className="br-section-edit" type="button" onClick={() => jumpToStep('medicalCert')}>Edit</button></div>
                <div className="br-grid">
                  <ReviewField label="Provider" value={`${formState.providerName}${formState.providerSuffix ? `, ${formState.providerSuffix}` : ''}`}/>
                  <ReviewField label="Facility" value={formState.providerFacility}/>
                  <ReviewField label="Phone" value={formState.providerPhone}/>
                  <ReviewField label="Address" value={`${formState.providerStreet}, ${formState.providerCity}, ${formState.providerState} ${formState.providerZip}`}/>
                </div>
              </div>
            ) : null}
            <div className="bordered-section" style={{ background: '#eff6ff', borderColor: '#bfdbfe', marginTop: 16 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="9" cy="9" r="8" stroke="#3b82f6" strokeWidth="1.2"/><path d="M9 8v4" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round"/><circle cx="9" cy="5.5" r="0.75" fill="#3b82f6"/></svg>
                <p style={{ fontSize: 13, color: '#1e40af', lineHeight: 1.6, margin: 0 }}>By continuing, you confirm that the information above is accurate to the best of your knowledge. Your case manager may follow up if additional details are needed.</p>
              </div>
            </div>
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
          <button type="button" className="btn btn-submit" onClick={submitRequest}>Submit Leave Request</button>
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
    if (isMedicalSelf) {
      const durationText = submittedCase.durationDays >= 7 ? `${Math.floor(submittedCase.durationDays / 7)} weeks${submittedCase.durationDays % 7 > 0 ? `, ${submittedCase.durationDays % 7} days` : ''}` : `${submittedCase.durationDays} days`;
      return (
        <div className="request-leave-shell">
          <SiteNav />
          <div className="wizard-wrap">
            <div className="wizard-card" style={{ marginTop: 32 }}>
              <div className="success-state">
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                  <div className="success-icon"><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M9 16L14 21L23 11" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <h2 style={{ marginBottom: 4 }}>Leave request submitted</h2>
                  <p style={{ color: '#62626e', fontSize: 14, margin: 0 }}>Case #{submittedCase.id}</p>
                </div>
                <div className="bordered-section" style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{optionIcons.medical_self}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0f0f14' }}>Medical Leave (Own Illness)</div>
                        <div style={{ fontSize: 12, color: '#737373' }}>Submitted {submittedCase.submittedOn}</div>
                      </div>
                    </div>
                    <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, background: '#1a1a2e', color: '#fff', padding: '4px 12px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Pending</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                    <div style={{ background: '#f9f9fb', border: '1px solid #e8e8ec', borderRadius: 8, padding: '12px 14px' }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#737373', textTransform: 'uppercase', marginBottom: 4 }}>Start Date</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#0f0f14' }}>{shortDate(submittedCase.startDate)}</div>
                    </div>
                    <div style={{ background: '#f9f9fb', border: '1px solid #e8e8ec', borderRadius: 8, padding: '12px 14px' }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#737373', textTransform: 'uppercase', marginBottom: 4 }}>Expected Return</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#0f0f14' }}>{shortDate(submittedCase.endDate)}</div>
                    </div>
                    <div style={{ background: '#f9f9fb', border: '1px solid #e8e8ec', borderRadius: 8, padding: '12px 14px' }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#737373', textTransform: 'uppercase', marginBottom: 4 }}>Duration</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#0f0f14' }}>{durationText}</div>
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#737373', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Benefits Being Reviewed</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {eligibility.fmla.eligible ? <span style={{ fontSize: 12, fontWeight: 600, background: '#f3f4f6', color: '#0f0f14', padding: '4px 14px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0f0f14' }}/> FMLA</span> : null}
                    {eligibility.std.eligible ? <span style={{ fontSize: 12, fontWeight: 600, background: '#f3f4f6', color: '#0f0f14', padding: '4px 14px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1' }}/> STD</span> : null}
                  </div>
                </div>
                <div className="bordered-section" style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f0f14', marginBottom: 16 }}>What happens next</h3>
                  {[
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="1.5"/></svg>, text: 'Your manager has been notified of your upcoming leave' },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="1.5"/><path d="M12 7v5l3 2" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/></svg>, text: "We\u2019re reviewing your eligibility — we\u2019ll update you within 1–2 business days" },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6" stroke="#f59e0b" strokeWidth="1.5"/></svg>, text: 'You may be asked to upload supporting documents (medical certification, etc.)' },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#3b82f6" strokeWidth="1.5"/><path d="M3 9h18" stroke="#3b82f6" strokeWidth="1.5"/></svg>, text: 'Track your leave status anytime from the overview' },
                  ].map((item) => (
                    <div key={item.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0' }}>
                      <div style={{ flexShrink: 0, marginTop: 1 }}>{item.icon}</div>
                      <span style={{ fontSize: 14, color: '#3d3d47', lineHeight: 1.5 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', paddingTop: 8, borderTop: '1px solid #e8e8ec' }}>
                  <button type="button" className="btn btn-back" onClick={() => navigate('/absence-history')}>View Leave Details</button>
                  <button type="button" className="btn btn-back">Email Manager / HR</button>
                  <button type="button" className="btn btn-next" onClick={() => navigate('/overview-react')}>Back to Overview</button>
                </div>
              </div>
            </div>
          </div>
          <SiteFooter />
        </div>
      );
    }
    if (isBirthingParent) {
      const durationText = submittedCase.durationDays >= 7 ? `${Math.floor(submittedCase.durationDays / 7)} weeks${submittedCase.durationDays % 7 > 0 ? `, ${submittedCase.durationDays % 7} days` : ''}` : `${submittedCase.durationDays} days`;
      return (
        <div className="request-leave-shell">
          <SiteNav />
          <div className="wizard-wrap">
            <div className="wizard-card" style={{ marginTop: 32 }}>
              <div className="success-state">
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                  <div className="success-icon"><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M9 16L14 21L23 11" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <h2 style={{ marginBottom: 4 }}>Leave request submitted</h2>
                  <p style={{ color: '#62626e', fontSize: 14, margin: 0 }}>Case #{submittedCase.id}</p>
                </div>
                <div className="bordered-section" style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{optionIcons.child}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0f0f14' }}>Parental Leave (Birthing)</div>
                        <div style={{ fontSize: 12, color: '#737373' }}>Submitted {submittedCase.submittedOn}</div>
                      </div>
                    </div>
                    <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, background: '#1a1a2e', color: '#fff', padding: '4px 12px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Pending</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                    <div style={{ background: '#f9f9fb', border: '1px solid #e8e8ec', borderRadius: 8, padding: '12px 14px' }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#737373', textTransform: 'uppercase', marginBottom: 4 }}>Start Date</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#0f0f14' }}>{shortDate(submittedCase.startDate)}</div>
                    </div>
                    <div style={{ background: '#f9f9fb', border: '1px solid #e8e8ec', borderRadius: 8, padding: '12px 14px' }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#737373', textTransform: 'uppercase', marginBottom: 4 }}>Expected Return</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#0f0f14' }}>{shortDate(submittedCase.endDate)}</div>
                    </div>
                    <div style={{ background: '#f9f9fb', border: '1px solid #e8e8ec', borderRadius: 8, padding: '12px 14px' }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#737373', textTransform: 'uppercase', marginBottom: 4 }}>Duration</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#0f0f14' }}>{durationText}</div>
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#737373', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Benefits Being Reviewed</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {eligibility.fmla.eligible ? <span style={{ fontSize: 12, fontWeight: 600, background: '#f3f4f6', color: '#0f0f14', padding: '4px 14px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0f0f14' }}/> FMLA</span> : null}
                    {eligibility.statePFL.eligible ? <span style={{ fontSize: 12, fontWeight: 600, background: '#f3f4f6', color: '#0f0f14', padding: '4px 14px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c3aed' }}/> PFL</span> : null}
                    {eligibility.companyBonding.eligible ? <span style={{ fontSize: 12, fontWeight: 600, background: '#f3f4f6', color: '#0f0f14', padding: '4px 14px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0891b2' }}/> Company Bonding</span> : null}
                  </div>
                </div>
                <div className="bordered-section" style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f0f14', marginBottom: 16 }}>What happens next</h3>
                  {[
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="1.5"/></svg>, text: 'Your manager has been notified of your upcoming leave' },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="1.5"/><path d="M12 7v5l3 2" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/></svg>, text: "We’re reviewing your eligibility — we’ll update you within 1–2 business days" },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6" stroke="#f59e0b" strokeWidth="1.5"/></svg>, text: 'A medical certification form will be sent to your provider' },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#3b82f6" strokeWidth="1.5"/><path d="M3 9h18" stroke="#3b82f6" strokeWidth="1.5"/></svg>, text: 'Track your leave status anytime from the overview' },
                  ].map((item) => (
                    <div key={item.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0' }}>
                      <div style={{ flexShrink: 0, marginTop: 1 }}>{item.icon}</div>
                      <span style={{ fontSize: 14, color: '#3d3d47', lineHeight: 1.5 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', paddingTop: 8, borderTop: '1px solid #e8e8ec' }}>
                  <button type="button" className="btn btn-back" onClick={() => navigate('/absence-history')}>View Leave Details</button>
                  <button type="button" className="btn btn-back">Email Manager / HR</button>
                  <button type="button" className="btn btn-next" onClick={() => navigate('/overview-react')}>Back to Overview</button>
                </div>
              </div>
            </div>
          </div>
          <SiteFooter />
        </div>
      );
    }
    if (isFamilyCare) {
      const durationText = submittedCase.durationDays >= 7 ? `${Math.floor(submittedCase.durationDays / 7)} weeks${submittedCase.durationDays % 7 > 0 ? `, ${submittedCase.durationDays % 7} days` : ''}` : `${submittedCase.durationDays} days`;
      return (
        <div className="request-leave-shell">
          <SiteNav />
          <div className="wizard-wrap">
            <div className="wizard-card" style={{ marginTop: 32 }}>
              <div className="success-state">
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                  <div className="success-icon"><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M9 16L14 21L23 11" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <h2 style={{ marginBottom: 4 }}>Leave request submitted</h2>
                  <p style={{ color: '#62626e', fontSize: 14, margin: 0 }}>Case #{submittedCase.id}</p>
                </div>
                <div className="bordered-section" style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{optionIcons.medical_family}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0f0f14' }}>Family Care Leave</div>
                        <div style={{ fontSize: 12, color: '#737373' }}>Submitted {submittedCase.submittedOn}</div>
                      </div>
                    </div>
                    <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, background: '#1a1a2e', color: '#fff', padding: '4px 12px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Pending</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                    <div style={{ background: '#f9f9fb', border: '1px solid #e8e8ec', borderRadius: 8, padding: '12px 14px' }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#737373', textTransform: 'uppercase', marginBottom: 4 }}>Start Date</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#0f0f14' }}>{shortDate(submittedCase.startDate)}</div>
                    </div>
                    <div style={{ background: '#f9f9fb', border: '1px solid #e8e8ec', borderRadius: 8, padding: '12px 14px' }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#737373', textTransform: 'uppercase', marginBottom: 4 }}>Expected Return</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#0f0f14' }}>{shortDate(submittedCase.endDate)}</div>
                    </div>
                    <div style={{ background: '#f9f9fb', border: '1px solid #e8e8ec', borderRadius: 8, padding: '12px 14px' }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#737373', textTransform: 'uppercase', marginBottom: 4 }}>Duration</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#0f0f14' }}>{durationText}</div>
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#737373', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Benefits Being Reviewed</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {eligibility.fmla.eligible ? <span style={{ fontSize: 12, fontWeight: 600, background: '#f3f4f6', color: '#0f0f14', padding: '4px 14px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0f0f14' }}/> FMLA</span> : null}
                  </div>
                </div>
                <div className="bordered-section" style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f0f14', marginBottom: 16 }}>What happens next</h3>
                  {[
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="1.5"/></svg>, text: 'Your manager has been notified of your upcoming leave' },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="1.5"/><path d="M12 7v5l3 2" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/></svg>, text: "We’re reviewing your eligibility — we’ll update you within 1–2 business days" },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6" stroke="#f59e0b" strokeWidth="1.5"/></svg>, text: 'You may be asked to upload supporting documents (medical certification, etc.)' },
                    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#3b82f6" strokeWidth="1.5"/><path d="M3 9h18" stroke="#3b82f6" strokeWidth="1.5"/></svg>, text: 'Track your leave status anytime from the overview' },
                  ].map((item) => (
                    <div key={item.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0' }}>
                      <div style={{ flexShrink: 0, marginTop: 1 }}>{item.icon}</div>
                      <span style={{ fontSize: 14, color: '#3d3d47', lineHeight: 1.5 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', paddingTop: 8, borderTop: '1px solid #e8e8ec' }}>
                  <button type="button" className="btn btn-back" onClick={() => navigate('/absence-history')}>View Leave Details</button>
                  <button type="button" className="btn btn-back">Email Manager / HR</button>
                  <button type="button" className="btn btn-next" onClick={() => navigate('/overview-react')}>Back to Overview</button>
                </div>
              </div>
            </div>
          </div>
          <SiteFooter />
        </div>
      );
    }
    return (
      <div className="request-leave-shell">
        <SiteNav />
        <div className="wizard-wrap">
          <div className="wizard-card" style={{ marginTop: 32 }}>
            <div className="success-state">
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div className="success-icon"><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M9 16L14 21L23 11" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                <h2 style={{ marginBottom: 4 }}>Leave Request Submitted</h2>
                <p style={{ color: '#62626e', fontSize: 14, margin: 0 }}>Your leave request has been submitted for review.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px', background: '#f9f9fb', border: '1px solid #e8e8ec', borderRadius: 10, padding: '16px 20px', marginBottom: 24 }}>
                <div><div style={{ fontSize: 11, fontWeight: 600, color: '#737373', textTransform: 'uppercase' }}>Reference</div><div style={{ fontSize: 14, fontWeight: 600, color: '#0f0f14', marginTop: 2 }}>{submittedCase.id}</div></div>
                <div><div style={{ fontSize: 11, fontWeight: 600, color: '#737373', textTransform: 'uppercase' }}>Submitted</div><div style={{ fontSize: 14, color: '#0f0f14', marginTop: 2 }}>{submittedCase.submittedOn}</div></div>
                <div><div style={{ fontSize: 11, fontWeight: 600, color: '#737373', textTransform: 'uppercase' }}>Leave dates</div><div style={{ fontSize: 14, color: '#0f0f14', marginTop: 2 }}>{formatDate(submittedCase.startDate)} – {formatDate(submittedCase.endDate)}</div></div>
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
            <div style={{ fontSize: 11, fontWeight: 700, color: '#737373', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16 }}>Request Leave</div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0f0f14', letterSpacing: '-0.03em', lineHeight: 1.25, margin: '0 0 12px' }}>We'll walk you through<br/>your leave request</h2>
            <p style={{ fontSize: 15, color: '#737373', lineHeight: 1.7, maxWidth: 420, margin: '0 auto 36px' }}>Tell us your reason, leave details, and work schedule — then verify your info and submit. You can review everything before it goes through.</p>
            <div className="req-welcome-journey">
              {[
                { label: 'Reason', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#525252" strokeWidth="1.5"/><path d="M9 9a3 3 0 015.12 1.5c0 1.5-2.12 2-2.12 3.5" stroke="#525252" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="17" r="0.75" fill="#525252"/></svg> },
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
            <button type="button" className="btn btn-next" style={{ padding: '14px 48px', fontSize: 16, borderRadius: 8 }} onClick={() => setStarted(true)}>Get Started</button>
            <div style={{ fontSize: 12, color: '#a0a0a8', marginTop: 14 }}>You\u2019ll be able to review everything before submitting.</div>
            <div style={{ marginTop: 20, fontSize: 13, color: '#a0a0a8' }}>Not sure where to start? <Link to="/plan-absence" style={{ color: '#525252', fontWeight: 600, textDecoration: 'none' }}>Plan your leave first →</Link></div>
          </div>
        </div>
      ) : (
        <div className="wizard-wrap">
          <div className="stepper"><div className="stepper-progress-label">Overall progress</div><div className="stepper-counter">Step <strong>{currentStepIndex + 1}</strong> of <strong>{steps.length}</strong></div></div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}/></div>
          <div className="wizard-card">
            <div className="step-content">{renderStepContent()}{renderFooter()}</div>
          </div>
        </div>
      )}
      <SiteFooter />
    </div>
  );
}