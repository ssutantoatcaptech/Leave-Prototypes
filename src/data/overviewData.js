export const overviewPageContent = {
  header: {
    title: 'Plan or Request Time Off',
    subtitle: "Understand your options or start your absence request — we'll guide you step by step.",
  },
  actionCards: [
    {
      id: 'plan',
      title: 'Plan for Absence',
      description: 'Explore your coverage and plan your time off before submitting',
    },
    {
      id: 'request',
      title: 'Request Absence',
      description: 'Ready to submit? File your absence request now',
    },
  ],
  learnAboutAbsenceOptions: [
    {
      id: 'federal',
      title: 'Federal Job Protection',
      description: 'Unpaid, job-protected absence for medical or family situations',
    },
    {
      id: 'state',
      title: 'State Absence / Disability',
      description: 'Programs that may provide income support depending on your state',
    },
    {
      id: 'company',
      title: 'Company-Sponsored Absence',
      description: 'Absence benefits provided directly by your employer',
    },
  ],
  quickActions: [
    { id: 'saved', label: 'Saved absences' },
    { id: 'accommodations', label: 'Absence Accommodations' },
    { id: 'support', label: 'Contact Support' },
    { id: 'policy', label: 'Absence Policy Guide' },
  ],
};

export const overviewActiveAbsences = [
  {
    id: 'LV-2026-8472',
    type: 'pregnancy',
    title: 'Pregnancy Leave',
    status: 'PENDING',
    frequency: 'Continuous',
    startDate: '2026-03-16',
    endDate: '2026-06-30',
    returnDate: '2026-07-01',
    duration: '107 days',
    benefits: 'FMLA, STD, PFML, Company Parental',
    documentsRequired: 'FMLA Certification & Medical Documentation',
  },
  {
    id: 'LV-2026-7641',
    type: 'family',
    title: 'Family Care Leave',
    status: 'PENDING',
    frequency: 'Reduced Schedule',
    startDate: '2026-03-03',
    endDate: '2026-04-25',
    returnDate: '2026-04-26',
    duration: '54 days',
    schedule: '20 hrs/week for 8 weeks',
    benefits: 'FMLA',
    documentsRequired: 'FMLA Certification & Medical Documentation',
  },
  {
    id: 'LV-2026-4518',
    type: 'medical',
    title: 'Medical Leave',
    status: 'APPROVED',
    frequency: 'Intermittent',
    startDate: '2026-03-24',
    endDate: '2026-09-24',
    returnDate: '2026-09-25',
    duration: '6 months (as needed)',
    schedule: 'Up to 2 days/week, 1–2 episodes/month',
    benefits: 'FMLA, STD, State PFML',
    documentsRequired: 'FMLA Certification for Intermittent Leave',
  },
];

export const absenceHistoryAbsences = [
  {
    id: 'LV-2026-8472',
    type: 'pregnancy',
    title: 'Pregnancy Leave',
    status: 'PENDING',
    frequency: 'Continuous',
    startDate: '2026-03-16',
    endDate: '2026-06-30',
    returnDate: '2026-07-01',
    duration: '107 days',
    benefits: 'FMLA, STD, PFML, Company Parental',
    submittedAt: '2026-02-16',
  },
  {
    id: 'LV-2026-7641',
    type: 'family',
    title: 'Family Care Leave',
    status: 'PENDING',
    frequency: 'Reduced Schedule',
    startDate: '2026-03-03',
    endDate: '2026-04-25',
    returnDate: '2026-04-26',
    duration: '54 days',
    benefits: 'FMLA',
    submittedAt: '2026-02-20',
  },
  {
    id: 'LV-2026-4518',
    type: 'medical',
    title: 'Medical Leave',
    status: 'APPROVED',
    frequency: 'Intermittent',
    startDate: '2026-03-24',
    endDate: '2026-09-24',
    returnDate: '2026-09-25',
    duration: '6 months (as needed)',
    benefits: 'FMLA, STD, State PFML',
    submittedAt: '2026-03-10',
  },
  {
    id: 'LV-2025-5037',
    type: 'medical',
    title: 'Medical Leave',
    status: 'COMPLETED',
    frequency: 'Continuous',
    startDate: '2025-05-10',
    endDate: '2025-06-07',
    returnDate: '2025-06-08',
    duration: '29 days',
    benefits: 'FMLA, STD',
    submittedAt: '2025-05-01',
  },
  {
    id: 'LV-2025-3891',
    type: 'family',
    title: 'Family Care Leave',
    status: 'COMPLETED',
    frequency: 'Reduced Schedule',
    startDate: '2025-02-12',
    endDate: '2025-03-08',
    returnDate: '2025-03-09',
    duration: '25 days',
    benefits: 'FMLA',
    submittedAt: '2025-02-05',
  },
  {
    id: 'LV-2024-9412',
    type: 'personal',
    title: 'Personal Leave',
    status: 'COMPLETED',
    frequency: 'Continuous',
    startDate: '2024-11-01',
    endDate: '2024-11-15',
    returnDate: '2024-11-16',
    duration: '15 days',
    benefits: 'Employer Policy',
    submittedAt: '2024-10-25',
  },
  {
    id: 'LV-2024-2148',
    type: 'family',
    title: 'Family Care Leave',
    status: 'COMPLETED',
    frequency: 'Intermittent',
    startDate: '2024-02-05',
    endDate: '2024-03-18',
    returnDate: '2024-03-19',
    duration: '42 days',
    benefits: 'FMLA',
    submittedAt: '2024-01-28',
  },
];

const activeAbsenceLookup = Object.fromEntries(
  overviewActiveAbsences.map((absence) => [absence.id, absence]),
);

const employerPolicies = [
  {
    title: 'FMLA',
    description: 'Up to 12 weeks unpaid, job-protected leave per year.',
  },
  {
    title: 'Short-Term Disability (STD)',
    description: '60% of salary for eligible medical absences after the elimination period.',
  },
  {
    title: 'Company Paid Parental Leave',
    description: 'Up to 6 weeks at full pay for birth, adoption, or foster placement.',
  },
  {
    title: 'PTO / Sick Leave',
    description: 'Accrued time can supplement unpaid periods where policy allows.',
  },
];

export const absenceDetailCases = {
  'LV-2026-8472': {
    ...activeAbsenceLookup['LV-2026-8472'],
    statusKey: 'pending',
    submittedAt: '2026-02-16',
    banner: {
      kind: 'info',
      title: 'Additional documents needed',
      description: 'We need more documents to complete your eligibility review. Visit Documents to upload the required items.',
    },
    quickActions: ['Upload Documents', 'Manage Return to Work', 'Send a Message'],
    statusTimeline: [
      { title: 'Application Submitted', date: 'Feb 16, 2026', status: 'done' },
      { title: 'Eligibility Review', date: 'In Progress', status: 'in-progress' },
      { title: 'Documents Required', date: 'Awaiting Upload', status: 'pending' },
      { title: 'Decision', date: 'Pending', status: 'pending' },
    ],
    coverage: [
      {
        id: 'companyBonding',
        label: 'Company Parental',
        name: 'Company Paid Parental Leave',
        weeks: '6 weeks',
        range: 'Mar 16, 2026 - Jun 30, 2026',
        pay: '100% pay via payroll',
        status: 'Pending',
        accent: '#1d4ed8',
        details: [
          { label: 'Coverage type', value: 'Employer-paid parental benefit' },
          { label: 'Estimated duration', value: 'Up to 6 weeks' },
          { label: 'Pay method', value: 'Regular payroll at full pay' },
        ],
      },
      {
        id: 'std',
        label: 'STD',
        name: 'Short-Term Disability (STD)',
        weeks: '6 weeks',
        range: 'Mar 16, 2026 - Apr 27, 2026',
        pay: '60% salary after 7-day wait',
        status: 'Pending',
        accent: '#0ea5e9',
        details: [
          { label: 'Coverage type', value: 'Income replacement' },
          { label: 'Benefit level', value: '60% of salary' },
          { label: 'Notes', value: 'Payment begins after the elimination period once approved.' },
        ],
      },
      {
        id: 'fmla',
        label: 'FMLA',
        name: 'FMLA (Job Protection)',
        weeks: '12 weeks',
        range: 'Mar 16, 2026 - Jun 30, 2026',
        pay: 'Unpaid job protection',
        status: 'Pending',
        accent: '#003a70',
        details: [
          { label: 'Coverage type', value: 'Federal job protection' },
          { label: 'Estimated duration', value: 'Up to 12 weeks' },
          { label: 'Requirements', value: 'Certification and employer eligibility review' },
        ],
      },
      {
        id: 'statePFL',
        label: 'State PFL',
        name: 'State Paid Family Leave',
        weeks: '8 weeks',
        range: 'Mar 16, 2026 - May 11, 2026',
        pay: '67% state benefit estimate',
        status: 'Pending',
        accent: '#7c3aed',
        details: [
          { label: 'Coverage type', value: 'State administered benefit' },
          { label: 'Benefit level', value: 'Estimated 67% wage replacement' },
          { label: 'Notes', value: 'Timing and approval depend on state processing.' },
        ],
      },
    ],
    benefitUsage: [
      { label: 'FMLA', used: 0, total: 12, unit: 'wks' },
      { label: 'STD', used: 0, total: 6, unit: 'wks' },
      { label: 'State PFL', used: 0, total: 8, unit: 'wks' },
      { label: 'Company Parental', used: 0, total: 6, unit: 'wks' },
    ],
    taskSummary: { todo: 2, completed: 2, total: 4 },
    taskGroups: [
      {
        title: 'FMLA',
        progress: '1 of 2 complete',
        badge: 'Pending',
        steps: [
          { label: 'Application received', status: 'done', date: 'Feb 16, 2026' },
          { label: 'Certification requested', status: 'current', date: 'Feb 18, 2026' },
          { label: 'Eligibility decision', status: 'pending', date: 'Pending' },
        ],
        items: [
          {
            title: 'Submit FMLA Certification Form',
            subtitle: 'Due by Mar 2, 2026 · Required for eligibility',
            status: 'todo',
            actionTab: 'documents',
          },
          {
            title: 'Manager Notification Sent',
            subtitle: 'Completed Feb 16, 2026',
            status: 'done',
          },
        ],
      },
      {
        title: 'Short-Term Disability',
        progress: '1 of 2 complete',
        badge: 'Pending',
        steps: [
          { label: 'Application received', status: 'done', date: 'Feb 16, 2026' },
          { label: 'Medical review', status: 'current', date: 'Feb 19, 2026' },
          { label: 'Benefit determination', status: 'pending', date: 'Pending' },
        ],
        items: [
          {
            title: 'Upload Medical Documentation',
            subtitle: 'Due by Mar 2, 2026 · Required for eligibility',
            status: 'todo',
            actionTab: 'documents',
          },
          {
            title: 'Absence Request Submitted',
            subtitle: 'Completed Feb 16, 2026',
            status: 'done',
          },
        ],
      },
    ],
    detailsData: {
      employeeInfo: {
        title: 'Employee Information',
        note: 'Provided by employer',
        fields: [
          { label: 'Full Name', value: 'Sarah Johnson' },
          { label: 'Employee ID', value: 'EMP-2026-4821' },
          { label: 'Job Title', value: 'Senior Marketing Manager' },
          { label: 'Employer', value: 'EnterpriseCorp Inc.' },
          { label: 'Employment Type', value: 'Full-time' },
          { label: 'Hire Date', value: 'Jan 15, 2022' },
          { label: 'Work Location', value: 'New York, NY' },
        ],
      },
      sections: [
        {
          title: 'Contact Information',
          editable: true,
          fields: [
            { label: 'Primary Email Address', value: 'sarah.johnson@company.com' },
            { label: 'Phone Number', value: '(555) 123-4567' },
            { label: 'Temporary Mailing Address', value: '8827 SW 8th Street, Lee Summit, MO 64086' },
            { label: 'Duration at Temporary Address', value: 'May 1, 2026 - Aug 15, 2026' },
          ],
        },
        {
          title: 'Absence Details',
          editable: true,
          fields: [
            { label: 'Absence Type', value: 'Continuous' },
            { label: 'Absence Start Date', value: 'Mar 16, 2026' },
            { label: 'Absence End Date', value: 'Jun 30, 2026' },
            { label: 'Expected Return Date', value: 'Jul 1, 2026' },
            { label: 'Duration', value: '107 days' },
            { label: 'Reason', value: 'Pregnancy, birth, and bonding' },
          ],
        },
        {
          title: 'Work Schedule',
          editable: true,
          fields: [
            { label: 'Weekly Hours', value: '40 hours / week' },
            { label: 'Schedule Type', value: 'Fixed' },
            { label: 'Work Days', value: 'Mon, Tue, Wed, Thu, Fri' },
            { label: 'Hours per Day', value: '8 hours' },
          ],
        },
        {
          title: 'Healthcare Provider',
          editable: true,
          fields: [
            { label: 'Provider', value: 'Dr. Dempsey (OB-GYN)' },
            { label: 'Facility', value: "St. Luke's Medical Center" },
            { label: 'Address', value: '123 Main Street, Unit 404, Lee Summit, MO 64064' },
            { label: 'Phone Number', value: '(816) 457-2934' },
            { label: 'Email', value: 'dempsey.herbett@stlukes.com' },
          ],
        },
      ],
    },
    documentsData: {
      uploadHint: 'PDF, JPG, PNG · Max 10MB',
      sections: [
        {
          title: 'Required Documents',
          description: 'Items still needed to complete your review.',
          rows: [
            { name: 'FMLA Certification Form', type: 'Certification', date: 'Due Mar 2, 2026', status: 'Pending' },
            { name: 'Medical Documentation', type: 'Clinical Records', date: 'Due Mar 2, 2026', status: 'Pending' },
          ],
        },
        {
          title: 'Received Documents',
          description: 'Documents already attached to this case.',
          rows: [
            { name: 'Absence Intake Submission', type: 'Application', date: 'Received Feb 16, 2026', status: 'Received' },
            { name: 'Employer Acknowledgement', type: 'Employer Notice', date: 'Received Feb 16, 2026', status: 'Received' },
          ],
        },
      ],
    },
    paymentData: {
      emptyStateTitle: 'Payment information will appear after approval',
      emptyStateDescription: 'Once benefits are approved, this tab will show payment timing, amounts, and benefit breakdowns.',
    },
    episodeLog: [
      { date: '03/18/2026', hours: '08:00', reason: 'Episode', reported: '03/18/2026 · 08:05' },
      { date: '03/19/2026', hours: '08:00', reason: 'Episode', reported: '03/19/2026 · 07:50' },
      { date: '03/20/2026', hours: '04:00', reason: 'Treatment', reported: '03/20/2026 · 13:10' },
      { date: '03/25/2026', hours: '08:00', reason: 'Episode', reported: '03/25/2026 · 08:00' },
      { date: '03/26/2026', hours: '08:00', reason: 'Episode', reported: '03/26/2026 · 08:02' },
      { date: '04/01/2026', hours: '08:00', reason: 'Treatment', reported: '04/01/2026 · 07:45' },
      { date: '04/07/2026', hours: '03:00', reason: 'Treatment', reported: '04/07/2026 · 14:30' },
    ],
    employerPolicies,
  },
  'LV-2026-7641': {
    ...activeAbsenceLookup['LV-2026-7641'],
    statusKey: 'pending',
    submittedAt: '2026-02-20',
    banner: {
      kind: 'info',
      title: 'Additional documents needed',
      description: 'Your family care absence is under review. We still need certification and supporting medical documents.',
    },
    quickActions: ['Upload Documents', 'Manage Return to Work', 'Send a Message'],
    statusTimeline: [
      { title: 'Application Submitted', date: 'Feb 20, 2026', status: 'done' },
      { title: 'Eligibility Review', date: 'In Progress', status: 'in-progress' },
      { title: 'Documents Required', date: 'Awaiting Upload', status: 'pending' },
      { title: 'Decision', date: 'Pending', status: 'pending' },
    ],
    coverage: [
      {
        id: 'fmla',
        label: 'FMLA',
        name: 'FMLA (Job Protection)',
        weeks: '8 weeks',
        range: 'Mar 3, 2026 - Apr 25, 2026',
        pay: 'Unpaid job protection',
        status: 'Pending',
        accent: '#003a70',
        details: [
          { label: 'Coverage type', value: 'Federal job protection' },
          { label: 'Leave schedule', value: 'Reduced schedule at 20 hours / week' },
          { label: 'Requirements', value: 'Family member certification and review of schedule' },
        ],
      },
    ],
    benefitUsage: [
      { label: 'FMLA', used: 4, total: 12, unit: 'wks' },
    ],
    taskSummary: { todo: 2, completed: 1, total: 3 },
    taskGroups: [
      {
        title: 'FMLA',
        progress: '1 of 3 complete',
        badge: 'Pending',
        steps: [
          { label: 'Application received', status: 'done', date: 'Feb 20, 2026' },
          { label: 'Family certification requested', status: 'current', date: 'Feb 22, 2026' },
          { label: 'Eligibility decision', status: 'pending', date: 'Pending' },
        ],
        items: [
          {
            title: 'Submit Family Care Certification',
            subtitle: 'Due by Mar 5, 2026 · Required for eligibility',
            status: 'todo',
            actionTab: 'documents',
          },
          {
            title: 'Upload Medical Documentation',
            subtitle: 'Due by Mar 5, 2026 · Include provider notes and treatment dates',
            status: 'todo',
            actionTab: 'documents',
          },
          {
            title: 'Absence Request Submitted',
            subtitle: 'Completed Feb 20, 2026',
            status: 'done',
          },
        ],
      },
    ],
    detailsData: {
      employeeInfo: {
        title: 'Employee Information',
        note: 'Provided by employer',
        fields: [
          { label: 'Full Name', value: 'Sarah Johnson' },
          { label: 'Employee ID', value: 'EMP-2026-4821' },
          { label: 'Job Title', value: 'Senior Marketing Manager' },
          { label: 'Employer', value: 'EnterpriseCorp Inc.' },
          { label: 'Work Location', value: 'New York, NY' },
        ],
      },
      sections: [
        {
          title: 'Contact Information',
          editable: true,
          fields: [
            { label: 'Primary Email Address', value: 'sarah.johnson@company.com' },
            { label: 'Phone Number', value: '(555) 123-4567' },
          ],
        },
        {
          title: 'Absence Details',
          editable: true,
          fields: [
            { label: 'Absence Type', value: 'Reduced schedule' },
            { label: 'Absence Start Date', value: 'Mar 3, 2026' },
            { label: 'Absence End Date', value: 'Apr 25, 2026' },
            { label: 'Expected Return Date', value: 'Apr 26, 2026' },
            { label: 'Schedule', value: '20 hrs/week for 8 weeks' },
            { label: 'Reason', value: 'Care for a family member with a serious health condition' },
          ],
        },
        {
          title: 'Family Member Information',
          editable: true,
          fields: [
            { label: 'Name', value: 'Robert Johnson' },
            { label: 'Relationship', value: 'Parent' },
            { label: 'Date of Birth', value: 'Aug 4, 1958' },
          ],
        },
        {
          title: 'Healthcare Provider',
          editable: true,
          fields: [
            { label: 'Provider', value: 'Dr. Erica Holmes' },
            { label: 'Facility', value: 'Mercy Internal Medicine' },
            { label: 'Phone Number', value: '(555) 219-4421' },
            { label: 'Email', value: 'careteam@mercy-example.org' },
          ],
        },
      ],
    },
    documentsData: {
      uploadHint: 'PDF, JPG, PNG · Max 10MB',
      sections: [
        {
          title: 'Required Documents',
          description: 'Items still needed to complete your review.',
          rows: [
            { name: 'Family Care Certification', type: 'Certification', date: 'Due Mar 5, 2026', status: 'Pending' },
            { name: 'Medical Documentation', type: 'Clinical Records', date: 'Due Mar 5, 2026', status: 'Pending' },
          ],
        },
        {
          title: 'Received Documents',
          description: 'Documents already attached to this case.',
          rows: [
            { name: 'Absence Intake Submission', type: 'Application', date: 'Received Feb 20, 2026', status: 'Received' },
          ],
        },
      ],
    },
    paymentData: {
      emptyStateTitle: 'No payment activity for this case',
      emptyStateDescription: 'This absence currently shows job protection only. Payment details would appear here if a payable benefit is approved.',
    },
    employerPolicies,
  },
  'LV-2026-4518': {
    ...activeAbsenceLookup['LV-2026-4518'],
    statusKey: 'approved',
    submittedAt: '2026-03-10',
    banner: {
      kind: 'warning',
      title: 'Intermittent leave tracking active',
      description: 'Each episode must be reported within 2 business days. Use Time Tracking below to log missed time.',
    },
    quickActions: ['Report Time', 'View Time Tracking', 'Send a Message'],
    statusTimeline: [
      { title: 'Application Submitted', date: 'Mar 10, 2026', status: 'done' },
      { title: 'Eligibility Confirmed', date: 'Mar 14, 2026', status: 'done' },
      { title: 'Certification Verified', date: 'Mar 19, 2026', status: 'done' },
      { title: 'Intermittent Leave Approved', date: 'Mar 22, 2026', status: 'done' },
    ],
    coverage: [
      {
        id: 'fmla',
        label: 'FMLA',
        name: 'FMLA (Job Protection) — Intermittent',
        weeks: 'Up to 12 weeks (480 hrs)',
        range: 'Mar 24, 2026 - Sep 24, 2026',
        pay: 'Unpaid job protection',
        status: 'Approved',
        accent: '#003a70',
        details: [
          { label: 'Coverage type', value: 'Federal job protection — intermittent schedule' },
          { label: 'Frequency', value: 'Up to 2 days per week, 1–2 episodes per month' },
          { label: 'FMLA hours used', value: '64 of 480 hours' },
          { label: 'Requirements', value: 'Certification verified; episode reporting required within 2 business days' },
        ],
      },
      {
        id: 'std',
        label: 'STD',
        name: 'Short-Term Disability (STD)',
        weeks: 'Per episode (after 7-day wait)',
        range: 'Mar 24, 2026 - Sep 24, 2026',
        pay: '60% salary per episode day',
        status: 'Approved',
        accent: '#0ea5e9',
        details: [
          { label: 'Coverage type', value: 'Income replacement — intermittent' },
          { label: 'Benefit level', value: '60% of base salary' },
          { label: 'Payment method', value: 'Paid per qualifying episode after elimination period' },
          { label: 'Notes', value: 'Each episode of 3+ consecutive days may re-trigger the 7-day elimination period per carrier policy.' },
        ],
      },
      {
        id: 'pfml',
        label: 'State PFML',
        name: 'State Paid Family & Medical Leave',
        weeks: 'Up to 20 weeks (state max)',
        range: 'Mar 24, 2026 - Sep 24, 2026',
        pay: '67% state wage replacement',
        status: 'Approved',
        accent: '#7c3aed',
        details: [
          { label: 'Coverage type', value: 'State-administered wage replacement — intermittent' },
          { label: 'Benefit level', value: 'Up to 67% of average weekly wage (state cap applies)' },
          { label: 'Payment method', value: 'Biweekly direct deposit from state agency' },
          { label: 'Notes', value: 'State benefits are paid for reported intermittent days. Must meet minimum hours threshold per pay period.' },
        ],
      },
    ],
    episodeLog: [
      { date: '04/14/2026', hours: '08:00', reason: 'Episode', reported: '04/14/2026 · 07:12' },
      { date: '04/10/2026', hours: '08:00', reason: 'Treatment', reported: '04/10/2026 · 06:45' },
      { date: '04/07/2026', hours: '04:00', reason: 'Treatment', reported: '04/07/2026 · 08:30' },
      { date: '04/02/2026', hours: '08:00', reason: 'Episode', reported: '04/02/2026 · 06:58' },
      { date: '03/31/2026', hours: '08:00', reason: 'Treatment', reported: '03/31/2026 · 07:22' },
      { date: '03/28/2026', hours: '03:30', reason: 'Treatment', reported: '03/28/2026 · 09:05' },
      { date: '03/25/2026', hours: '08:00', reason: 'Episode', reported: '03/25/2026 · 07:40' },
      { date: '03/24/2026', hours: '08:00', reason: 'Episode', reported: '03/24/2026 · 06:30' },
    ],
    fmlaBalance: { used: 65.5, total: 480, unit: 'hours' },
    benefitUsage: [
      { label: 'FMLA', used: 65.5, total: 480, unit: 'hrs' },
      { label: 'STD', used: 48, total: 480, unit: 'hrs' },
      { label: 'State PFML', used: 48, total: 960, unit: 'hrs' },
    ],
    taskSummary: { todo: 1, completed: 3, total: 4 },
    taskGroups: [
      {
        title: 'FMLA — Intermittent',
        progress: '3 of 4 complete',
        badge: 'Action needed',
        steps: [
          { label: 'Application received', status: 'done', date: 'Mar 10, 2026' },
          { label: 'Certification verified', status: 'done', date: 'Mar 19, 2026' },
          { label: 'Approved', status: 'done', date: 'Mar 22, 2026' },
        ],
        items: [
          {
            title: 'Log 3 missed days from last week',
            subtitle: 'Required before next payment cycle',
            status: 'todo',
            actionTab: 'timeTracking',
          },
          {
            title: 'FMLA Intermittent Certification Submitted',
            subtitle: 'Completed Mar 14, 2026',
            status: 'done',
          },
          {
            title: 'Medical Documentation Uploaded',
            subtitle: 'Completed Mar 17, 2026',
            status: 'done',
          },
          {
            title: 'Absence Request Submitted',
            subtitle: 'Completed Mar 10, 2026',
            status: 'done',
          },
        ],
      },
    ],
    detailsData: {
      employeeInfo: {
        title: 'Employee Information',
        note: 'Provided by employer',
        fields: [
          { label: 'Full Name', value: 'Sarah Johnson' },
          { label: 'Employee ID', value: 'EMP-2026-4821' },
          { label: 'Job Title', value: 'Senior Marketing Manager' },
          { label: 'Employer', value: 'EnterpriseCorp Inc.' },
          { label: 'Work Location', value: 'New York, NY' },
        ],
      },
      sections: [
        {
          title: 'Contact Information',
          editable: true,
          fields: [
            { label: 'Primary Email Address', value: 'sarah.johnson@company.com' },
            { label: 'Phone Number', value: '(555) 123-4567' },
          ],
        },
        {
          title: 'Absence Details',
          editable: true,
          fields: [
            { label: 'Absence Type', value: 'Intermittent' },
            { label: 'Absence Start Date', value: 'Mar 24, 2026' },
            { label: 'Absence End Date', value: 'Sep 24, 2026' },
            { label: 'Expected Return Date', value: 'Ongoing — returns between episodes' },
            { label: 'Frequency', value: 'Up to 2 days/week, 1–2 episodes/month' },
            { label: 'Episode Duration', value: '4–8 hours per occurrence' },
            { label: 'Reason', value: 'Chronic medical condition requiring ongoing treatment' },
          ],
        },
        {
          title: 'Work Schedule',
          editable: true,
          fields: [
            { label: 'Weekly Hours', value: '40 hours / week' },
            { label: 'Schedule Type', value: 'Fixed' },
            { label: 'Work Days', value: 'Mon, Tue, Wed, Thu, Fri' },
            { label: 'Hours per Day', value: '8 hours' },
          ],
        },
        {
          title: 'Healthcare Provider',
          editable: true,
          fields: [
            { label: 'Provider', value: 'Dr. Michelle Torres' },
            { label: 'Specialty', value: 'Rheumatology' },
            { label: 'Facility', value: 'Columbia Rheumatology Associates' },
            { label: 'Phone Number', value: '(555) 482-7103' },
            { label: 'Email', value: 'mtorres@columbia-rheum-example.org' },
          ],
        },
      ],
    },
    documentsData: {
      uploadHint: 'PDF, JPG, PNG · Max 10MB',
      sections: [
        {
          title: 'Received Documents',
          description: 'Documents used to approve this case.',
          rows: [
            { name: 'Absence Intake Submission', type: 'Application', date: 'Received Mar 10, 2026', status: 'Received' },
            { name: 'FMLA Intermittent Certification', type: 'Certification', date: 'Received Mar 14, 2026', status: 'Received' },
            { name: 'Medical Documentation', type: 'Clinical Records', date: 'Received Mar 17, 2026', status: 'Received' },
            { name: 'Approval Letter', type: 'Decision Notice', date: 'Issued Mar 22, 2026', status: 'Received' },
          ],
        },
      ],
    },
    paymentData: {
      summaryCards: [
        { label: 'Approved benefits', value: 'FMLA, STD, PFML' },
        { label: 'Next payment', value: 'Apr 25, 2026' },
        { label: 'Total paid', value: '$3,718' },
      ],
      rows: [
        {
          period: 'Apr 7 - Apr 14, 2026',
          benefit: 'STD',
          amount: '$784',
          issued: 'Apr 18, 2026',
          status: 'Paid',
          offsets: [
            {
              amount: 53.2,
              label: 'State Paid Leave (PFML)',
              reason: 'Your STD benefit is reduced to avoid exceeding 100% of your regular pay when combined with PFML.',
            },
          ],
        },
        {
          period: 'Apr 7 - Apr 14, 2026',
          benefit: 'PFML',
          amount: '$878',
          issued: 'Apr 18, 2026',
          status: 'Paid',
          offsets: [
            {
              amount: 67.4,
              label: 'Employer Family Absence Benefit',
              reason: 'Your state PFML was reduced because your employer also provided a family absence payment for this period.',
            },
          ],
        },
        {
          period: 'Mar 24 - Apr 4, 2026',
          benefit: 'STD',
          amount: '$980',
          issued: 'Apr 10, 2026',
          status: 'Paid',
        },
        {
          period: 'Mar 24 - Apr 4, 2026',
          benefit: 'PFML',
          amount: '$1,076',
          issued: 'Apr 10, 2026',
          status: 'Paid',
          offsets: [
            {
              amount: 45.0,
              label: 'Vacation Pay Received',
              reason: 'Vacation pay used during this period counts toward your total income replacement, reducing your PFML benefit.',
            },
          ],
        },
      ],
    },
    employerPolicies,
  },
};

export function getAbsenceDetailCase(caseId) {
  return absenceDetailCases[caseId] || null;
}
