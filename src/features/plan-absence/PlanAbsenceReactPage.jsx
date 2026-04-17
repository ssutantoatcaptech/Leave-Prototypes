import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../overview/overview-react.css';
import '../request-leave/request-leave-react.css';
import './plan-absence-react.css';

// ─── Constants ────────────────────────────────────────────────────────────────

const STEP_LABELS = ['Reason', 'Employment & Details', 'Design Your Plan'];

const REASON_OPTIONS = [
  {
    value: 'illness',
    title: "Employee's Own Illness or Injury",
    tooltip: "You need time off for surgery, illness, injury, or recovery.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 4v16M4 12h16" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/><rect x="3" y="3" width="18" height="18" rx="3" stroke="#3d3d47" strokeWidth="1.5"/></svg>,
  },
  {
    value: 'family',
    title: 'Care for Sick Family Member',
    tooltip: "Someone close to you needs your care due to a serious health condition.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="#3d3d47" strokeWidth="1.5"/></svg>,
  },
  {
    value: 'nonbirth',
    title: 'Non-Birthing Parent, Adoption, or Foster Care',
    tooltip: "You\u2019re welcoming a child through adoption, foster care, or as a non-birthing parent.",
    tooltipRight: true,
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="7" r="4" stroke="#3d3d47" strokeWidth="1.5"/><path d="M20 8v6M17 11h6" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  },
  {
    value: 'birth',
    title: 'Birthing Parent, Pregnancy, or Bonding',
    tooltip: "You\u2019re having a baby or need time for pregnancy and bonding.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3" stroke="#3d3d47" strokeWidth="1.5"/><path d="M8 16c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 17v3M10 22h4" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  },
  {
    value: 'military',
    title: 'Military Related Activity',
    tooltip: "You need time off for qualifying military exigency or to care for a service member.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5.25 3.75 10.13 9 11.25 5.25-1.12 9-6 9-11.25V7l-9-5z" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="#3d3d47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    value: 'other',
    title: 'Other',
    tooltip: "Your reason doesn\u2019t fit the categories above.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#3d3d47" strokeWidth="1.5"/><circle cx="8" cy="12" r="1" fill="#3d3d47"/><circle cx="12" cy="12" r="1" fill="#3d3d47"/><circle cx="16" cy="12" r="1" fill="#3d3d47"/></svg>,
  },
];

const STATE_BENEFITS = {
  CA: { name: 'CA SDI / PFL', desc: 'California provides State Disability Insurance (SDI) at ~60-70% pay for own illness, and Paid Family Leave (PFL) at ~60-70% for family care and bonding, up to 8 weeks.', note: '60-70% pay via SDI/PFL', card: 'Up to 8 weeks paid' },
  NY: { name: 'NY DBL / PFL', desc: 'New York provides Disability Benefits Law (DBL) at 50% pay (capped) for own illness, and Paid Family Leave (PFL) at 67% pay for up to 12 weeks for family care and bonding.', note: '50-67% pay via DBL/PFL', card: 'Up to 12 weeks paid' },
  NJ: { name: 'NJ TDI / FLI', desc: 'New Jersey provides Temporary Disability Insurance (TDI) at ~85% pay for own illness, and Family Leave Insurance (FLI) at ~85% for up to 12 weeks for family care.', note: '~85% pay via TDI/FLI', card: 'Up to 12 weeks paid' },
  WA: { name: 'WA PFML', desc: 'Washington provides Paid Family and Medical Absence (PFML) at up to 90% pay for up to 12 weeks for medical leave and 12 weeks for family leave (16 weeks combined max).', note: 'Up to 90% pay via PFML', card: 'Up to 12-16 weeks paid' },
};

const LEAVE_TYPE_HINTS = {
  continuous: "You\u2019ll be away from work for a stretch of time.",
  intermittent: "You\u2019ll need time off here and there \u2014 like for appointments or flare-ups.",
  reduced: "You\u2019ll keep working, but with fewer hours or days each week.",
};

const STD_WEEKS_OPTIONS = [2, 4, 6, 8, 12, 16, 26];
const UNPAID_WEEKS_OPTIONS = [2, 4, 6, 8, 12];
const DUR_WEEKS_OPTIONS = [2, 4, 6, 8, 12, 16, 26];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function addWeeksToDate(dateStr, weeks) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + weeks * 7);
  return d;
}

function fmtDate(d) {
  return ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2) + '/' + d.getFullYear();
}

function buildMonths(startDate, endDate) {
  const NAMES = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const months = [];
  const cur = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  while (cur <= endDate) {
    months.push(NAMES[cur.getMonth()]);
    cur.setMonth(cur.getMonth() + 1);
  }
  months.push(NAMES[cur.getMonth()]);
  return months;
}

function snapDur(calcWeeks) {
  const opts = DUR_WEEKS_OPTIONS;
  return opts.reduce((prev, cur) => Math.abs(cur - calcWeeks) < Math.abs(prev - calcWeeks) ? cur : prev);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

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
          <button className="nav-bell" type="button"><span className="nav-bell-dot" /></button>
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

function Toggle({ on, onClick }) {
  return (
    <div className={`toggle${on ? ' on' : ''}`} style={{ width: 36, height: 20, flexShrink: 0 }} onClick={onClick}>
      <div className="toggle-knob" style={{ width: 16, height: 16 }} />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PlanAbsenceReactPage() {
  // Navigation
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);

  // Step 1
  const [reason, setReason] = useState('illness');

  // Step 2
  const [workState, setWorkState] = useState('MO');
  const [hireDate, setHireDate] = useState('2019-01-15');
  const [leaveStart, setLeaveStart] = useState('2026-05-01');
  const [leaveReturn, setLeaveReturn] = useState('2026-06-26');
  const [leaveType, setLeaveType] = useState('continuous');
  const [intermittentFreq, setIntermittentFreq] = useState('');
  const [intermittentDur, setIntermittentDur] = useState('');
  const [reducedCurrentHrs, setReducedCurrentHrs] = useState('40');
  const [reducedProposedHrs, setReducedProposedHrs] = useState('');

  // Step 3 — sidebar fields (synced from step 2 on entering step 3)
  const [sideWorkState, setSideWorkState] = useState('MO');
  const [sideHireDate, setSideHireDate] = useState('2019-01-15');
  const [sideStart, setSideStart] = useState('2026-05-01');
  const [sideDueDate, setSideDueDate] = useState('2026-08-01');
  const [sideDuration, setSideDuration] = useState(8);

  // Step 3 — illness toggles
  const [stdOn, setStdOn] = useState(true);
  const [fmlaOn, setFmlaOn] = useState(true);
  const [unpaidOn, setUnpaidOn] = useState(false);
  const [stdDuration, setStdDuration] = useState(8);
  const [unpaidDuration, setUnpaidDuration] = useState(4);

  // Step 3 — birth toggles
  const [preBirthOn, setPreBirthOn] = useState(false);
  const [postBirthOn, setPostBirthOn] = useState(true);
  const [bondingOn, setBondingOn] = useState(true);

  // Step 3 — sidebar TIME OFF TYPE
  const [sideLeaveType, setSideLeaveType] = useState('continuous');

  // Step 3 — UI state
  const [activeView, setActiveView] = useState('pay');
  const [openDetail, setOpenDetail] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);

  // ─── Derived ──────────────────────────────────────────────────────────────

  const isBirth = reason === 'birth';
  const isFamily = reason === 'family' || reason === 'nonbirth';

  // Duration hint for step 2
  const durWeeksHint = useMemo(() => {
    if (!leaveStart || !leaveReturn) return 8;
    const diff = (new Date(leaveReturn + 'T00:00:00') - new Date(leaveStart + 'T00:00:00')) / (1000 * 60 * 60 * 24 * 7);
    return Math.max(1, Math.round(diff));
  }, [leaveStart, leaveReturn]);

  // FMLA eligibility (based on sidebar hire date, ref date = current date)
  const fmlaEligible = useMemo(() => {
    if (!sideHireDate) return false;
    const hire = new Date(sideHireDate + 'T00:00:00');
    const now = new Date();
    const months = (now.getFullYear() - hire.getFullYear()) * 12 + (now.getMonth() - hire.getMonth());
    return months >= 12;
  }, [sideHireDate]);

  // Timeline data
  const tlData = useMemo(() => {
    if (isBirth) {
      // ── Birth timeline ──
      if (!sideDueDate) return { rows: [], months: ['—'], paidWeeks: 0, absenceWeeks: 0, weeklyPay: 0 };
      const due = new Date(sideDueDate + 'T00:00:00');
      const preWeeks = 4, postWeeks = 6, bondWeeks = 12;
      const MS_WEEK = 7 * 86400000;
      const preStart = new Date(due.getTime() - preWeeks * MS_WEEK);
      const postEnd = new Date(due.getTime() + postWeeks * MS_WEEK);
      const bondStart = new Date(postEnd);
      const bondEnd = new Date(bondStart.getTime() + bondWeeks * MS_WEEK);

      const tlStart = preBirthOn ? preStart : due;
      const tlEnd = bondingOn ? bondEnd : postBirthOn ? postEnd : new Date(due.getTime() + MS_WEEK);
      const totalDays = Math.max(1, (tlEnd - tlStart) / 86400000);
      const pct = (d) => Math.max(0, Math.min(100, (d - tlStart) / 86400000 / totalDays * 100));

      const rows = [];
      if (preBirthOn) rows.push({ id: 'pre', label: 'PRE-BIRTH', left: pct(preStart), width: pct(due) - pct(preStart), segClass: 'partial', tooltip: `Pre-birth disability: ${fmtDate(preStart)} – ${fmtDate(due)}` });
      if (postBirthOn) rows.push({ id: 'post', label: 'POST-BIRTH', left: pct(due), width: pct(postEnd) - pct(due), segClass: 'partial', tooltip: `Post-birth disability: ${postWeeks} wks at 60% STD` });
      if (bondingOn) rows.push({ id: 'bond', label: 'BONDING', left: pct(bondStart), width: pct(bondEnd) - pct(bondStart), segClass: 'full', tooltip: `Bonding leave: ${bondWeeks} wks (FMLA protected)` });

      const paidWks = (preBirthOn ? preWeeks : 0) + (postBirthOn ? postWeeks : 0);
      const totalWks = paidWks + (bondingOn ? bondWeeks : 0);

      return {
        rows,
        duePct: pct(due),
        showDueMarker: preBirthOn || postBirthOn || bondingOn,
        months: buildMonths(tlStart, tlEnd),
        paidWeeks: paidWks,
        absenceWeeks: totalWks,
        weeklyPay: paidWks > 0 ? 5769 : 0,
        details: {
          pre: preBirthOn ? { title: 'Pre-birth disability', duration: `${preWeeks} weeks`, dates: `${fmtDate(preStart)} – ${fmtDate(due)}`, protection: { text: 'FMLA', cls: 'eligible' }, pay: { text: '60% via STD', cls: 'partial' }, coveredBy: 'Pregnancy Disability Leave (PDL), FMLA', paidBy: 'Short-Term Disability insurance (60% salary)' } : null,
          post: postBirthOn ? { title: 'Post-birth disability', duration: `${postWeeks} weeks (vaginal)`, dates: `${fmtDate(due)} – ${fmtDate(postEnd)}`, protection: { text: 'FMLA', cls: 'eligible' }, pay: { text: '60% via STD', cls: 'partial' }, coveredBy: 'Short-Term Disability insurance', paidBy: 'STD insurance (60% salary, after 7-day waiting period)' } : null,
          bond: bondingOn ? { title: 'Bonding time', duration: `${bondWeeks} weeks`, dates: `${fmtDate(bondStart)} – ${fmtDate(bondEnd)}`, protection: { text: 'FMLA', cls: 'eligible' }, pay: { text: 'Unpaid (unless state PFL)', cls: 'unpaid' }, coveredBy: 'Family and Medical Leave Act (FMLA)', paidBy: 'Unpaid — check state Paid Family Leave' } : null,
        },
        preDates: preBirthOn ? `${fmtDate(preStart)} – ${fmtDate(due)}` : '',
        postDates: postBirthOn ? `${fmtDate(due)} – ${fmtDate(postEnd)}` : '',
        bondDates: bondingOn ? `${fmtDate(bondStart)} – ${fmtDate(bondEnd)}` : '',
        preSub: `${preWeeks} work weeks`,
        postSub: `${postWeeks} work weeks`,
        bondSub: `${bondWeeks} work weeks`,
      };
    }

    if (isFamily) {
      // ── Family timeline ──
      const start = new Date((sideStart || '2026-05-01') + 'T00:00:00');
      const durWks = sideDuration;
      const fmlaWks = fmlaEligible ? Math.min(durWks, 12) : 0;
      const unpaidWks = Math.max(0, durWks - fmlaWks);
      const displayWks = Math.max(durWks, 4);
      const pct = (wks) => Math.max(0, Math.min(100, wks / displayWks * 100));
      const fmlaEnd = addWeeksToDate(sideStart || '2026-05-01', fmlaWks);
      const totalEnd = addWeeksToDate(sideStart || '2026-05-01', durWks);
      const rows = [];
      if (fmlaWks > 0) rows.push({ id: 'fmla', label: 'FMLA', left: 0, width: pct(fmlaWks), segClass: 'full', tooltip: 'FMLA: Job-protected leave' });
      if (unpaidWks > 0) rows.push({ id: 'unpaid', label: 'Unpaid', left: pct(fmlaWks), width: pct(unpaidWks), segClass: 'none', tooltip: 'Extended unpaid leave' });

      return {
        rows,
        months: buildMonths(start, totalEnd),
        paidWeeks: 0,
        absenceWeeks: durWks,
        weeklyPay: 0,
        details: {
          fmla: fmlaWks > 0 ? { title: 'FMLA Job Protection', duration: `${fmlaWks} weeks`, dates: `${fmtDate(start)} – ${fmtDate(fmlaEnd)}`, protection: { text: 'FMLA', cls: 'eligible' }, pay: { text: 'No income replacement', cls: 'unpaid' }, coveredBy: 'Family and Medical Leave Act (federal)', paidBy: 'No paid benefit — job-protected absence only' } : null,
          unpaid: unpaidWks > 0 ? { title: 'Extended Absence (beyond FMLA)', duration: `${unpaidWks} weeks`, dates: `${fmtDate(fmlaEnd)} – ${fmtDate(totalEnd)}`, protection: { text: 'Not protected', cls: 'unpaid' }, pay: { text: 'Unpaid', cls: 'unpaid' }, coveredBy: 'Employer discretion / ADA accommodation', paidBy: 'No paid benefit' } : null,
        },
      };
    }

    // ── Illness / military / other timeline ──
    const start = new Date((sideStart || '2026-05-01') + 'T00:00:00');
    const stdWks = stdOn ? stdDuration : 0;
    const fmlaWks = fmlaOn && fmlaEligible ? Math.min(Math.max(stdWks, 12), 12) : 0;
    const unpaidWks = unpaidOn ? unpaidDuration : 0;
    const protectedWks = Math.max(stdWks, fmlaWks);
    const totalAbsWks = protectedWks + unpaidWks;
    const displayWks = Math.max(totalAbsWks, 12);
    const pct = (wks) => Math.max(0, Math.min(100, wks / displayWks * 100));

    const stdEnd   = addWeeksToDate(sideStart || '2026-05-01', stdWks);
    const fmlaEnd  = addWeeksToDate(sideStart || '2026-05-01', fmlaWks);
    const unpaidStartDate = addWeeksToDate(sideStart || '2026-05-01', protectedWks);
    const unpaidEndDate   = addWeeksToDate(sideStart || '2026-05-01', totalAbsWks);

    const rows = [];
    if (stdOn)   rows.push({ id: 'std',   label: 'STD',   left: 0,              width: pct(stdWks),   segClass: activeView === 'pay' ? 'partial' : 'insurance', tooltip: 'Short-Term Disability: 60% salary' });
    if (fmlaOn)  rows.push({ id: 'fmla',  label: 'FMLA',  left: 0,              width: pct(fmlaWks),  segClass: 'full',    tooltip: 'FMLA: Job-protected leave' });
    if (unpaidOn) rows.push({ id: 'unpaid', label: 'Unpaid', left: pct(protectedWks), width: pct(unpaidWks), segClass: 'none', tooltip: 'Extended unpaid leave' });

    return {
      rows,
      months: buildMonths(start, unpaidEndDate),
      paidWeeks: stdWks,
      absenceWeeks: totalAbsWks,
      weeklyPay: stdWks > 0 ? 3462 : 0,
      details: {
        std:   stdOn   ? { title: 'Short-Term Disability',              duration: `${stdWks} weeks`,   dates: `${fmtDate(start)} – ${fmtDate(stdEnd)}`,          protection: { text: fmlaEligible ? 'FMLA' : 'None', cls: fmlaEligible ? 'eligible' : 'unpaid' }, pay: { text: '60% via STD', cls: 'partial' }, coveredBy: 'Short-Term Disability insurance',         paidBy: 'STD insurance (60% of base salary, after 7-day waiting period)' } : null,
        fmla:  fmlaOn  ? { title: 'FMLA Job Protection',                duration: `${fmlaWks} weeks`,  dates: `${fmtDate(start)} – ${fmtDate(fmlaEnd)}`,         protection: { text: 'FMLA', cls: 'eligible' },                                                    pay: stdOn ? { text: '60% via STD (if enrolled)', cls: 'partial' } : { text: 'No income replacement', cls: 'unpaid' }, coveredBy: 'Family and Medical Leave Act (federal)', paidBy: stdOn ? 'STD runs concurrently with FMLA' : 'No paid benefit — job-protected only' } : null,
        unpaid: unpaidOn ? { title: 'Extended Absence (beyond protections)', duration: `${unpaidWks} weeks`, dates: `${fmtDate(unpaidStartDate)} – ${fmtDate(unpaidEndDate)}`, protection: { text: 'Not protected', cls: 'unpaid' }, pay: { text: 'Unpaid', cls: 'unpaid' }, coveredBy: 'Employer discretion / ADA accommodation', paidBy: 'No paid benefit' } : null,
      },
      stdDates:   stdOn   ? `${fmtDate(start)} – ${fmtDate(stdEnd)}` : '',
      fmlaDates:  fmlaOn  ? `${fmtDate(start)} – ${fmtDate(fmlaEnd)}` : '',
      unpaidDates: unpaidOn ? `${fmtDate(unpaidStartDate)} – ${fmtDate(unpaidEndDate)}` : '',
      stdSub:    stdOn    ? `${stdWks} weeks at 60% pay` : 'Up to 26 weeks',
      fmlaSub:   fmlaOn   ? (fmlaWks > 0 ? `${fmlaWks} weeks protected` : fmlaEligible ? 'Up to 12 weeks' : 'Not eligible') : 'Up to 12 weeks',
      unpaidSub: unpaidOn ? `${unpaidWks} additional weeks` : 'Beyond protections',
    };
  }, [
    isBirth, isFamily,
    sideStart, sideDueDate, sideDuration,
    fmlaEligible,
    stdOn, fmlaOn, unpaidOn, stdDuration, unpaidDuration,
    preBirthOn, postBirthOn, bondingOn,
    activeView,
  ]);

  const stateBenefit = STATE_BENEFITS[sideWorkState] || null;
  const detailData = openDetail ? (tlData.details?.[openDetail] || null) : null;

  // ─── Navigation handlers ──────────────────────────────────────────────────

  function handleStart() {
    setStarted(true);
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goNext() {
    if (step === 2) {
      // Sync step 2 inputs into sidebar state
      setSideWorkState(workState);
      setSideHireDate(hireDate);
      if (isBirth) {
        setSideDueDate(leaveStart || '2026-08-01');
      } else {
        setSideStart(leaveStart || '2026-05-01');
        setSideDuration(snapDur(durWeeksHint));
        if (!isFamily) setStdDuration(snapDur(durWeeksHint));
      }
      setSideLeaveType(leaveType);
    }
    if (step === 1 && isBirth && leaveStart === '2026-05-01') {
      setLeaveStart('2026-08-01');
    }
    setStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goBack() {
    if (step === 1) {
      setStarted(false);
    } else {
      setStep((prev) => prev - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="plan-absence-shell">
      <SiteNav />

      {/* Welcome screen */}
      {!started && (
        <div className="rlv2-page" style={{ maxWidth: 720 }}>
          <div className="sim-card pa-welcome">
            <div className="pa-kicker">Plan &amp; Request Absence</div>
            <h2>Taking time off<br />shouldn&rsquo;t be stressful</h2>
            <p style={{ fontSize: 15, color: '#5d5d5d', lineHeight: 1.7, maxWidth: 440, margin: '0 auto 32px' }}>
              We&rsquo;ll walk you through your coverage, benefits, and estimated pay &mdash; so you can plan with confidence before submitting anything.
            </p>
            <div className="pa-steps-icons">
              {[
                { label: 'Plan',    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#105fa8" strokeWidth="1.5"/><path d="M3 9h18M8 2v4M16 2v4" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round"/></svg> },
                { label: 'Request', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                { label: 'Pay',     icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 010 7H6" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round"/></svg> },
                { label: 'Support', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke="#105fa8" strokeWidth="1.5" strokeLinecap="round"/></svg> },
              ].map((item, i, arr) => (
                <span key={item.label} style={{ display: 'contents' }}>
                  <div className="pa-step-icon-item">
                    <div className="pa-step-icon-box">{item.icon}</div>
                    <span className="pa-step-icon-label">{item.label}</span>
                  </div>
                  {i < arr.length - 1 && <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ color: '#c8cdd4', flexShrink: 0 }}><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </span>
              ))}
            </div>
            <button className="sim-btn-primary" type="button" onClick={handleStart} style={{ padding: '14px 48px', fontSize: 16, borderRadius: 8, marginTop: 16 }}>
              Get Started
            </button>
            <div className="pa-sub">You&rsquo;ll be able to review everything before submitting.</div>
            <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid #f0f0f2' }}>
              <Link to="/request-leave-react" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14, color: '#525252', textDecoration: 'none' }}>
                <span>Already know what you need?</span>
                <span style={{ fontWeight: 600, color: '#0f0f14' }}>Request absence directly &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Wizard steps */}
      {started && (
        <div className={`rlv2-page${step === 3 ? ' rlv2-page-wide' : ''}`}>
          {/* Stepper */}
          <div className="sim-stepper">
            <div className="stepper">
              <div className="stepper-counter">Step <strong>{step}</strong> of <strong>{STEP_LABELS.length}</strong></div>
              <div className="stepper-title">{STEP_LABELS[step - 1]}</div>
            </div>
          </div>

          {/* ─── Step 1: Reason ─── */}
          {step === 1 && (
            <div className="sim-card">
              <h2>
                Select Reason For Absence{' '}
                <span className="wiz-tooltip-wrap">
                  <svg className="wiz-tooltip-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#737373" strokeWidth="1.3"/><path d="M8 7.5V11" stroke="#737373" strokeWidth="1.3" strokeLinecap="round"/><circle cx="8" cy="5.5" r="0.75" fill="#737373"/></svg>
                  <span className="wiz-tooltip-text">Select the primary reason for your absence. Don&rsquo;t worry if you&rsquo;re not sure about the details yet &mdash; we&rsquo;ll walk through everything together.</span>
                </span>
              </h2>
              <div className="option-cards">
                {REASON_OPTIONS.map((opt) => (
                  <div
                    key={opt.value}
                    className={`option-card has-tooltip${reason === opt.value ? ' selected' : ''}`}
                    onClick={() => setReason(opt.value)}
                  >
                    <div className="option-radio"><div className="option-radio-dot" /></div>
                    <div className="option-card-icon">{opt.icon}</div>
                    <div className="option-text"><h4>{opt.title}</h4></div>
                    <span className={`oc-tooltip${opt.tooltipRight ? ' oc-tooltip-right' : ''}`}>{opt.tooltip}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 13, color: '#737373', marginBottom: 16, lineHeight: 1.5 }}>
                This helps us identify which benefits and protections may apply to you.
              </div>
              <div className="sim-btn-row">
                <button className="sim-btn-back" type="button" onClick={goBack}>&larr; Back</button>
                <button className="sim-btn-primary" type="button" onClick={goNext}>Continue &#8594;</button>
              </div>
            </div>
          )}

          {/* ─── Step 2: Employment & Details ─── */}
          {step === 2 && (
            <div className="sim-card">
              <h2>Your employment &amp; absence details</h2>
              <p className="sim-desc">We use this to determine your eligibility for FMLA, Short-Term Disability, and state-specific benefits.</p>
              <div className="pa-grid">
                <div className="sim-field">
                  <label>Work State <span style={{ color: '#dc2626' }}>*</span></label>
                  <select value={workState} onChange={(e) => setWorkState(e.target.value)}>
                    <option value="MO">Missouri (MO)</option>
                    <option value="CA">California (CA)</option>
                    <option value="NY">New York (NY)</option>
                    <option value="NJ">New Jersey (NJ)</option>
                    <option value="WA">Washington (WA)</option>
                    <option value="TX">Texas (TX)</option>
                    <option value="FL">Florida (FL)</option>
                  </select>
                </div>
                <div className="sim-field">
                  <label>Employment Start Date <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type="date" value={hireDate} onChange={(e) => setHireDate(e.target.value)} />
                </div>
                <div className="sim-field">
                  <label>{isBirth ? 'Expected Due Date' : 'Anticipated Start Date'} <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type="date" value={leaveStart} onChange={(e) => setLeaveStart(e.target.value)} />
                </div>
                {!isBirth && (
                  <div className="sim-field">
                    <label>{leaveType === 'continuous' ? 'Expected Return Date' : 'End of Period'} <span style={{ color: '#dc2626' }}>*</span></label>
                    <input type="date" value={leaveReturn} onChange={(e) => setLeaveReturn(e.target.value)} />
                    <div className="pa-hint">~{durWeeksHint} week{durWeeksHint !== 1 ? 's' : ''}</div>
                  </div>
                )}
                {!isBirth && (
                  <div className="sim-field pa-span-2">
                    <label>How will you take your absence? <span style={{ color: '#dc2626' }}>*</span></label>
                    <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                      <option value="continuous">Continuous</option>
                      <option value="intermittent">Intermittent</option>
                      <option value="reduced">Reduced schedule</option>
                    </select>
                  </div>
                )}
                {!isBirth && leaveType === 'intermittent' && (
                  <div className="pa-span-2">
                    <div className="pa-conditional-section">
                      <p className="pa-conditional-title">Intermittent Details</p>
                      <div className="pa-grid">
                        <div className="sim-field" style={{ marginBottom: 0 }}>
                          <label>How often do you expect to need time off? <span style={{ color: '#dc2626' }}>*</span></label>
                          <select value={intermittentFreq} onChange={(e) => setIntermittentFreq(e.target.value)}>
                            <option value="" disabled>Select frequency</option>
                            <option value="1-2x/month">1–2 times per month</option>
                            <option value="1x/week">About once a week</option>
                            <option value="2-3x/week">2–3 times per week</option>
                            <option value="unpredictable">Unpredictable / as needed</option>
                          </select>
                        </div>
                        <div className="sim-field" style={{ marginBottom: 0 }}>
                          <label>How long is each episode? <span style={{ color: '#dc2626' }}>*</span></label>
                          <select value={intermittentDur} onChange={(e) => setIntermittentDur(e.target.value)}>
                            <option value="" disabled>Select duration</option>
                            <option value="few-hours">A few hours</option>
                            <option value="half-day">Half a day</option>
                            <option value="full-day">Full day</option>
                            <option value="1-2-days">1–2 days</option>
                            <option value="3+-days">3 or more days</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {!isBirth && leaveType === 'reduced' && (
                  <div className="pa-span-2">
                    <div className="pa-conditional-section">
                      <p className="pa-conditional-title">Reduced Schedule Details</p>
                      <div className="pa-grid">
                        <div className="sim-field" style={{ marginBottom: 0 }}>
                          <label>Current hours per week <span style={{ color: '#dc2626' }}>*</span></label>
                          <select value={reducedCurrentHrs} onChange={(e) => setReducedCurrentHrs(e.target.value)}>
                            <option value="40">40 hours</option>
                            <option value="35">35 hours</option>
                            <option value="30">30 hours</option>
                          </select>
                        </div>
                        <div className="sim-field" style={{ marginBottom: 0 }}>
                          <label>Proposed reduced hours per week <span style={{ color: '#dc2626' }}>*</span></label>
                          <select value={reducedProposedHrs} onChange={(e) => setReducedProposedHrs(e.target.value)}>
                            <option value="" disabled>Select hours</option>
                            <option value="32">32 hours</option>
                            <option value="24">24 hours</option>
                            <option value="20">20 hours</option>
                            <option value="16">16 hours</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="pa-why-ask">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#737373" strokeWidth="1.2"/><path d="M8 7v4" stroke="#737373" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="4.5" r="0.75" fill="#737373"/></svg>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#525252' }}>Why we ask</span>
                </div>
                <p style={{ fontSize: 12.5, color: '#737373', lineHeight: 1.6, margin: 0 }}>
                  Your work state, tenure, and absence duration determine which federal and state protections apply — including FMLA eligibility (12+ months tenure), STD coverage, and state-specific paid absence programs.
                </p>
              </div>
              <div className="sim-btn-row">
                <button className="sim-btn-back" type="button" onClick={goBack}>&larr; Back</button>
                <button className="sim-btn-primary" type="button" onClick={goNext}>See My Coverage &#8594;</button>
              </div>
            </div>
          )}

          {/* ─── Step 3: Design Your Plan ─── */}
          {step === 3 && (
            <div className="sim-split">
              {/* ── Main panel ── */}
              <div className="sim-split-main">
                <div className="sim-card" style={{ padding: '28px 32px' }}>

                  {/* Alert */}
                  <div className="dlp-alert">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                      <circle cx="8" cy="8" r="7" stroke="#a3860a" strokeWidth="1.2"/>
                      <path d="M8 7v4" stroke="#a3860a" strokeWidth="1.2" strokeLinecap="round"/>
                      <circle cx="8" cy="4.5" r="0.75" fill="#a3860a"/>
                    </svg>
                    <span>This is an estimate based on the information you&rsquo;ve provided. Final eligibility is confirmed upon formal review.</span>
                  </div>

                  {/* Eligibility badges */}
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
                    <div className={`rlv2-elig-badge${fmlaEligible ? '' : ' rlv2-elig-na'}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5"/></svg>
                      <span>{fmlaEligible ? 'FMLA Eligible' : 'FMLA Not Eligible'}</span>
                    </div>
                    {!isFamily && (
                      <div className="rlv2-elig-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        <span>STD Enrolled</span>
                      </div>
                    )}
                    {stateBenefit ? (
                      <div className="rlv2-elig-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span>{stateBenefit.name}</span>
                      </div>
                    ) : (
                      <div className="rlv2-elig-badge rlv2-elig-na">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d="M9 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        <span>No State Paid Leave</span>
                      </div>
                    )}
                  </div>

                  {/* Timeline section */}
                  <div style={{ background: '#fff', border: '1px solid #e8e8ec', borderRadius: 12, padding: 24, marginBottom: 28 }}>
                    <div className="dlp-section-head" style={{ marginBottom: 6 }}>
                      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Absence Timeline</h3>
                      <div className="dlp-view-tabs">
                        {['pay', 'coverage'].map((v) => (
                          <button
                            key={v}
                            className={`dlp-view-tab${activeView === v ? ' active' : ''}`}
                            type="button"
                            onClick={() => { setActiveView(v); setOpenDetail(null); }}
                          >
                            {v.charAt(0).toUpperCase() + v.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="dlp-section-sub">Click a row to see details. Pay figures are estimates based on standard STD (60% salary).</p>

                    <div className="dlp-timeline">
                      <div style={{ position: 'relative' }}>
                        <div className="dlp-tl-rows">
                          {tlData.rows.map((row) => (
                            <div
                              key={row.id}
                              className={`dlp-tl-row${openDetail === row.id ? ' active' : ''}`}
                              onClick={() => setOpenDetail(openDetail === row.id ? null : row.id)}
                            >
                              <div className="dlp-tl-row-label">{row.label}</div>
                              <div className="dlp-tl-row-bar">
                                <div
                                  className={`dlp-tl-seg ${row.segClass}`}
                                  style={{ left: `${row.left}%`, width: `${row.width}%` }}
                                  data-tooltip={row.tooltip}
                                />
                              </div>
                            </div>
                          ))}
                          {tlData.rows.length === 0 && (
                            <div style={{ padding: '12px 0 12px 120px', fontSize: 12, color: '#737373', textAlign: 'center' }}>
                              Toggle coverage periods in the sidebar to see your timeline.
                            </div>
                          )}
                        </div>
                        {/* Due date marker */}
                        {isBirth && tlData.showDueMarker && (
                          <div className="dlp-tl-marker" style={{ left: `calc(120px + ${tlData.duePct}% * (100% - 120px) / 100)`, position: 'absolute', top: 0, bottom: 0 }}>
                            <div style={{ position: 'absolute', top: -4, left: -4, width: 10, height: 10, background: '#a3860a', borderRadius: '50%', border: '2px solid #fff' }} />
                          </div>
                        )}
                      </div>

                      {/* Month axis */}
                      <div className="dlp-tl-months">
                        {tlData.months.map((m, i) => <span key={i}>{m}</span>)}
                      </div>

                      {/* Legend */}
                      {!isBirth ? (
                        activeView === 'pay' ? (
                          <div className="dlp-legend">
                            <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#2d2d2d' }} />Job-protected (FMLA)</div>
                            <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#737373' }} />Paid (STD 60%)</div>
                            <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#d4d4d4' }} />Unpaid</div>
                          </div>
                        ) : (
                          <div className="dlp-legend">
                            <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#2d2d2d' }} />FMLA (federal job protection)</div>
                            <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#a3a3a3' }} />Insurance (STD)</div>
                            <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#d4d4d4' }} />No coverage</div>
                          </div>
                        )
                      ) : (
                        <div className="dlp-legend">
                          <div className="dlp-legend-item"><div className="dlp-legend-dot dlp-legend-dot-marker" />Due date</div>
                          <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#737373' }} />Partial pay (60% STD)</div>
                          <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#2d2d2d' }} />FMLA job protection</div>
                          <div className="dlp-legend-item"><div className="dlp-legend-dot" style={{ background: '#d4d4d4' }} />Unpaid</div>
                        </div>
                      )}

                      {/* Detail panel */}
                      {openDetail && detailData && (
                        <div className="dlp-detail show">
                          <div className="dlp-detail-head">
                            <div>
                              <div className="dlp-detail-title">{detailData.title}</div>
                              <div className="dlp-detail-dates">{detailData.dates}</div>
                            </div>
                            <button className="dlp-detail-close" type="button" onClick={() => setOpenDetail(null)}>&times;</button>
                          </div>
                          <div className="dlp-detail-grid">
                            {[
                              { label: 'Duration',     value: detailData.duration },
                              { label: 'Dates',        value: detailData.dates },
                              { label: 'Job Protection', chip: detailData.protection },
                              { label: 'Pay',          chip: detailData.pay },
                              { label: 'Covered Under', value: detailData.coveredBy },
                              { label: 'Paid By',      value: detailData.paidBy },
                            ].map((item) => (
                              <div key={item.label} className="dlp-detail-item">
                                <div className="dlp-detail-item-label">{item.label}</div>
                                <div className="dlp-detail-item-value">
                                  {item.chip
                                    ? <span className={`dlp-detail-chip ${item.chip.cls}`}>{item.chip.text}</span>
                                    : item.value}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Pay summary band */}
                    <div className="dlp-pay-band" style={{ marginTop: 20, marginBottom: 0 }}>
                      <div className="dlp-pay-stat">
                        <div className="dlp-pay-stat-label">Total paid weeks</div>
                        <div className="dlp-pay-stat-value">{tlData.paidWeeks > 0 ? `${tlData.paidWeeks} weeks` : 'Unpaid'}</div>
                      </div>
                      <div className="dlp-pay-stat">
                        <div className="dlp-pay-stat-label">Total absence</div>
                        <div className="dlp-pay-stat-value">{tlData.absenceWeeks} weeks</div>
                      </div>
                      <div className="dlp-pay-stat">
                        <div className="dlp-pay-stat-label">Est. weekly pay range</div>
                        <div className="dlp-pay-stat-value">{tlData.weeklyPay > 0 ? `~$${tlData.weeklyPay.toLocaleString()}/wk` : '$0'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Accordion policies */}
                  <div style={{ marginTop: 24 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f0f14', margin: '0 0 12px' }}>Your employer&rsquo;s policies</h3>
                    <div className="dlp-accordion">
                      {!isBirth && [
                        { id: 'acc-fmla',     title: 'FMLA (Job Protection)',         body: 'FMLA provides up to 12 weeks of job-protected, unpaid absence per year for qualifying reasons (serious health condition, family care, or new child). You must have worked 12+ months and 1,250+ hours. Your position (or equivalent) is guaranteed upon return.' },
                        ...(!isFamily ? [{ id: 'acc-std', title: 'Short-Term Disability (STD)', body: 'If enrolled, STD provides income replacement at 60% of your base salary for up to 26 weeks after a 7-day waiting period. Coverage applies to your own medical condition only — not family care. Medical certification from your provider is required.' }] : []),
                        { id: 'acc-ext',      title: 'Extended absence (beyond FMLA)', body: 'If you need additional time beyond your FMLA entitlement, your employer may grant extended leave as a reasonable accommodation under the ADA. This leave is unpaid and not automatically job-protected.' },
                      ].map((item) => (
                        <div key={item.id} className={`dlp-accordion-item${openAccordion === item.id ? ' open' : ''}`}>
                          <button className="dlp-accordion-btn" type="button" onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}>
                            <span className="dlp-accordion-title">{item.title}</span>
                            <span className="dlp-accordion-icon">+</span>
                          </button>
                          <div className="dlp-accordion-body">{item.body}</div>
                        </div>
                      ))}
                      {isBirth && [
                        { id: 'acc-pre',  title: 'Pre-birth disability',  body: 'Pre-birth disability leave covers the period before your due date if you are medically unable to work. Typically 4 weeks, this must be certified by your medical provider. Coverage is through STD insurance at 60% of base salary, and the leave is FMLA-protected.' },
                        { id: 'acc-post', title: 'Post-birth disability', body: 'Post-birth disability covers your physical recovery after delivery. Vaginal delivery: 6 weeks. C-section: 8 weeks. Paid through STD at 60% of base salary after a 7-day waiting period. This leave runs concurrently with FMLA.' },
                        { id: 'acc-bond', title: 'Bonding time',           body: "Bonding leave allows you up to 12 weeks to bond with your new child. This is FMLA-protected but typically unpaid unless your state offers Paid Family Leave (PFL). Bonding leave begins after your disability recovery period ends." },
                      ].map((item) => (
                        <div key={item.id} className={`dlp-accordion-item${openAccordion === item.id ? ' open' : ''}`}>
                          <button className="dlp-accordion-btn" type="button" onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}>
                            <span className="dlp-accordion-title">{item.title}</span>
                            <span className="dlp-accordion-icon">+</span>
                          </button>
                          <div className="dlp-accordion-body">{item.body}</div>
                        </div>
                      ))}
                      {stateBenefit && (
                        <div className={`dlp-accordion-item${openAccordion === 'acc-state' ? ' open' : ''}`}>
                          <button className="dlp-accordion-btn" type="button" onClick={() => setOpenAccordion(openAccordion === 'acc-state' ? null : 'acc-state')}>
                            <span className="dlp-accordion-title">{stateBenefit.name}</span>
                            <span className="dlp-accordion-icon">+</span>
                          </button>
                          <div className="dlp-accordion-body">{stateBenefit.desc}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Next / email card */}
                  <div className="dlp-next-card">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div className="dlp-next-title">Your coverage summary is ready.</div>
                        <div className="dlp-next-desc">Save it to review later, or continue to start your absence request.</div>
                      </div>
                      <button type="button" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', background: 'none', border: '1px solid #d0d0d5', borderRadius: 6, fontSize: 12, fontWeight: 600, color: '#525252', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 3h12v10H2V3z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 3l6 5 6-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Email Plan
                      </button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="wizard-footer">
                    <button className="btn btn-back" type="button" onClick={goBack}>&larr; Back</button>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-save" type="button">Save &amp; Come Back Later</button>
                      <Link to="/request-leave-react" className="btn btn-next">Let&rsquo;s Start My Absence Request &rarr;</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Sidebar ── */}
              <div className="sim-split-side">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

                  {isBirth ? (
                    <>
                      {/* KEY DATE — birth */}
                      <div className="dlp-sidebar">
                        <div className="dlp-sidebar-group-label">KEY DATE</div>
                        <div className="dlp-sidebar-group-body">
                          <div className="dlp-side-field" style={{ marginBottom: 0 }}>
                            <label>Due Date</label>
                            <input type="date" value={sideDueDate} onChange={(e) => setSideDueDate(e.target.value)} />
                          </div>
                        </div>
                      </div>
                      {/* ABSENCE PERIODS — birth */}
                      <div className="dlp-sidebar">
                        <div className="dlp-sidebar-group-label">ABSENCE PERIODS</div>
                        <div className="dlp-sidebar-group-body" style={{ padding: '0 20px 16px' }}>
                          {/* Pre-birth */}
                          <div className="dlp-side-toggle" style={{ padding: '10px 0' }}>
                            <div>
                              <div className="dlp-side-toggle-label">Pre-birth disability</div>
                              <div className="dlp-side-toggle-sub">{tlData.preSub || '4 work weeks'}</div>
                            </div>
                            <Toggle on={preBirthOn} onClick={() => setPreBirthOn(!preBirthOn)} />
                          </div>
                          {preBirthOn && (
                            <div className="dlp-side-toggle-body">
                              <div className="dlp-side-field">
                                <label>Dates</label>
                                <div className="dlp-side-daterange">{tlData.preDates || '—'}</div>
                              </div>
                            </div>
                          )}
                          {/* Post-birth */}
                          <div className="dlp-side-toggle" style={{ padding: '10px 0', borderTop: '1px solid #f0f0f2' }}>
                            <div>
                              <div className="dlp-side-toggle-label">Post-birth disability</div>
                              <div className="dlp-side-toggle-sub">{tlData.postSub || '6 work weeks'}</div>
                            </div>
                            <Toggle on={postBirthOn} onClick={() => setPostBirthOn(!postBirthOn)} />
                          </div>
                          {postBirthOn && (
                            <div className="dlp-side-toggle-body">
                              <div className="dlp-side-field">
                                <label>Dates</label>
                                <div className="dlp-side-daterange">{tlData.postDates || '—'}</div>
                              </div>
                            </div>
                          )}
                          {/* Bonding */}
                          <div className="dlp-side-toggle" style={{ padding: '10px 0', borderTop: '1px solid #f0f0f2' }}>
                            <div>
                              <div className="dlp-side-toggle-label">Bonding time</div>
                              <div className="dlp-side-toggle-sub">{tlData.bondSub || '12 work weeks'}</div>
                            </div>
                            <Toggle on={bondingOn} onClick={() => setBondingOn(!bondingOn)} />
                          </div>
                          {bondingOn && (
                            <div className="dlp-side-toggle-body">
                              <div className="dlp-side-field">
                                <label>Dates</label>
                                <div className="dlp-side-daterange">{tlData.bondDates || '—'}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* KEY DATE — non-birth */}
                      <div className="dlp-sidebar">
                        <div className="dlp-sidebar-group-label">KEY DATE</div>
                        <div className="dlp-sidebar-group-body">
                          <div className="dlp-side-field" style={{ marginBottom: 0 }}>
                            <label>Start Date</label>
                            <input type="date" value={sideStart} onChange={(e) => setSideStart(e.target.value)} />
                          </div>
                        </div>
                      </div>

                      {/* ABSENCE PERIODS — illness */}
                      {!isFamily && (
                        <div className="dlp-sidebar">
                          <div className="dlp-sidebar-group-label">ABSENCE PERIODS</div>
                          <div className="dlp-sidebar-group-body" style={{ padding: '0 20px 16px' }}>
                            {/* STD */}
                            <div className="dlp-side-toggle" style={{ padding: '10px 0' }}>
                              <div>
                                <div className="dlp-side-toggle-label">Short-term disability</div>
                                <div className="dlp-side-toggle-sub">{tlData.stdSub || 'Up to 26 weeks'}</div>
                              </div>
                              <Toggle on={stdOn} onClick={() => setStdOn(!stdOn)} />
                            </div>
                            {stdOn && (
                              <div className="dlp-side-toggle-body">
                                <div className="dlp-side-field" style={{ marginBottom: 8 }}>
                                  <label>Duration</label>
                                  <select value={stdDuration} onChange={(e) => setStdDuration(Number(e.target.value))}>
                                    {STD_WEEKS_OPTIONS.map((n) => <option key={n} value={n}>{n === 26 ? '26 weeks (max)' : `${n} weeks`}</option>)}
                                  </select>
                                </div>
                                <div className="dlp-side-field">
                                  <label>Dates</label>
                                  <div className="dlp-side-daterange">{tlData.stdDates || '—'}</div>
                                </div>
                              </div>
                            )}
                            {/* FMLA */}
                            <div className="dlp-side-toggle" style={{ padding: '10px 0', borderTop: '1px solid #f0f0f2' }}>
                              <div>
                                <div className="dlp-side-toggle-label">FMLA job protection</div>
                                <div className="dlp-side-toggle-sub">{tlData.fmlaSub || 'Up to 12 weeks'}</div>
                              </div>
                              <Toggle on={fmlaOn} onClick={() => setFmlaOn(!fmlaOn)} />
                            </div>
                            {fmlaOn && (
                              <div className="dlp-side-toggle-body">
                                <div className="dlp-side-field">
                                  <label>Dates</label>
                                  <div className="dlp-side-daterange">{tlData.fmlaDates || '—'}</div>
                                </div>
                              </div>
                            )}
                            {/* Unpaid */}
                            <div className="dlp-side-toggle" style={{ padding: '10px 0', borderTop: '1px solid #f0f0f2' }}>
                              <div>
                                <div className="dlp-side-toggle-label">Extended leave (unpaid)</div>
                                <div className="dlp-side-toggle-sub">{tlData.unpaidSub || 'Beyond protections'}</div>
                              </div>
                              <Toggle on={unpaidOn} onClick={() => setUnpaidOn(!unpaidOn)} />
                            </div>
                            {unpaidOn && (
                              <div className="dlp-side-toggle-body">
                                <div className="dlp-side-field" style={{ marginBottom: 8 }}>
                                  <label>Additional weeks</label>
                                  <select value={unpaidDuration} onChange={(e) => setUnpaidDuration(Number(e.target.value))}>
                                    {UNPAID_WEEKS_OPTIONS.map((n) => <option key={n} value={n}>{n} weeks</option>)}
                                  </select>
                                </div>
                                <div className="dlp-side-field">
                                  <label>Dates</label>
                                  <div className="dlp-side-daterange">{tlData.unpaidDates || '—'}</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* ABSENCE DETAILS — family */}
                      {isFamily && (
                        <div className="dlp-sidebar">
                          <div className="dlp-sidebar-group-label">ABSENCE DETAILS</div>
                          <div className="dlp-sidebar-group-body">
                            <div className="dlp-side-field" style={{ marginBottom: 0 }}>
                              <label>Duration</label>
                              <select value={sideDuration} onChange={(e) => setSideDuration(Number(e.target.value))}>
                                {DUR_WEEKS_OPTIONS.map((n) => <option key={n} value={n}>{n === 26 ? '26 weeks' : `${n} weeks`}</option>)}
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TIME OFF TYPE */}
                      <div className="dlp-sidebar">
                        <div className="dlp-sidebar-group-label">TIME OFF TYPE</div>
                        <div className="dlp-sidebar-group-body">
                          <div className="dlp-side-field" style={{ marginBottom: 0 }}>
                            <label>How will you take your absence?</label>
                            <select value={sideLeaveType} onChange={(e) => setSideLeaveType(e.target.value)}>
                              <option value="continuous">Continuous</option>
                              <option value="intermittent">Intermittent</option>
                              <option value="reduced">Reduced schedule</option>
                            </select>
                          </div>
                          <div style={{ fontSize: 12, color: '#737380', marginTop: 8, lineHeight: 1.4 }}>
                            {LEAVE_TYPE_HINTS[sideLeaveType]}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* EMPLOYMENT — shared */}
                  <div className="dlp-sidebar">
                    <div className="dlp-sidebar-group-label">EMPLOYMENT</div>
                    <div className="dlp-sidebar-group-body">
                      <div className="dlp-side-field">
                        <label>Work State</label>
                        <select value={sideWorkState} onChange={(e) => setSideWorkState(e.target.value)}>
                          {['MO','CA','NY','NJ','WA','TX','FL'].map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div className="dlp-side-field" style={{ marginBottom: 0 }}>
                        <label>Employment Start Date</label>
                        <input type="date" value={sideHireDate} onChange={(e) => setSideHireDate(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  {/* Footer note */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4, fontSize: 12, color: '#a3a3a3', padding: '0 4px' }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="8" cy="8" r="7" stroke="#a3a3a3" strokeWidth="1.2"/><path d="M8 7v4" stroke="#a3a3a3" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="4.5" r="0.75" fill="#a3a3a3"/></svg>
                    Changes update the timeline instantly.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
