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
    title: 'Pregnancy Absence',
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
    title: 'Family Care Absence',
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
    id: 'LV-2026-3295',
    type: 'medical',
    title: 'Medical Absence',
    status: 'APPROVED',
    frequency: 'Continuous',
    startDate: '2026-02-10',
    endDate: '2026-05-15',
    returnDate: '2026-05-16',
    duration: '95 days',
    benefits: 'FMLA, STD',
  },
];

export const absenceHistoryAbsences = [
  {
    id: 'LV-2026-8472',
    type: 'pregnancy',
    title: 'Pregnancy Absence',
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
    title: 'Family Care Absence',
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
    id: 'LV-2026-3295',
    type: 'medical',
    title: 'Medical Absence',
    status: 'APPROVED',
    frequency: 'Continuous',
    startDate: '2026-02-10',
    endDate: '2026-05-15',
    returnDate: '2026-05-16',
    duration: '95 days',
    benefits: 'FMLA, STD',
    submittedAt: '2026-01-28',
  },
  {
    id: 'LV-2025-5037',
    type: 'medical',
    title: 'Medical Absence',
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
    title: 'Family Care Absence',
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
    title: 'Personal Absence',
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
    title: 'Family Care Absence',
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
    taskSummary: { todo: 2, completed: 2, total: 4 },
    taskGroups: [
      {
        title: 'FMLA',
        progress: '1 of 2 complete',
        badge: 'Pending',
        steps: [
          { label: 'Application received', status: 'done' },
          { label: 'Certification requested', status: 'current' },
          { label: 'Eligibility decision', status: 'pending' },
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
          { label: 'Application received', status: 'done' },
          { label: 'Medical review', status: 'current' },
          { label: 'Benefit determination', status: 'pending' },
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
    taskSummary: { todo: 2, completed: 1, total: 3 },
    taskGroups: [
      {
        title: 'FMLA',
        progress: '1 of 3 complete',
        badge: 'Pending',
        steps: [
          { label: 'Application received', status: 'done' },
          { label: 'Family certification requested', status: 'current' },
          { label: 'Eligibility decision', status: 'pending' },
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
  'LV-2026-3295': {
    ...activeAbsenceLookup['LV-2026-3295'],
    statusKey: 'approved',
    submittedAt: '2026-01-28',
    banner: null,
    quickActions: ['View Payment Schedule', 'Manage Return to Work', 'Send a Message'],
    statusTimeline: [
      { title: 'Application Submitted', date: 'Jan 28, 2026', status: 'done' },
      { title: 'Eligibility Confirmed', date: 'Feb 3, 2026', status: 'done' },
      { title: 'Documents Verified', date: 'Feb 7, 2026', status: 'done' },
      { title: 'Absence Approved', date: 'Feb 9, 2026', status: 'done' },
    ],
    coverage: [
      {
        id: 'std',
        label: 'STD',
        name: 'Short-Term Disability (STD)',
        weeks: '6 weeks',
        range: 'Feb 10, 2026 - Mar 24, 2026',
        pay: '60% salary',
        status: 'Approved',
        accent: '#0ea5e9',
        details: [
          { label: 'Coverage type', value: 'Income replacement' },
          { label: 'Benefit level', value: '60% of salary' },
          { label: 'Payment cadence', value: 'Biweekly after approval' },
        ],
      },
      {
        id: 'fmla',
        label: 'FMLA',
        name: 'FMLA (Job Protection)',
        weeks: '12 weeks',
        range: 'Feb 10, 2026 - May 15, 2026',
        pay: 'Unpaid job protection',
        status: 'Approved',
        accent: '#003a70',
        details: [
          { label: 'Coverage type', value: 'Federal job protection' },
          { label: 'Estimated duration', value: 'Up to 12 weeks' },
          { label: 'Requirements', value: 'Certification verified and approved' },
        ],
      },
    ],
    taskSummary: { todo: 0, completed: 4, total: 4 },
    taskGroups: [
      {
        title: 'FMLA',
        progress: '2 of 2 complete',
        badge: 'Approved',
        steps: [
          { label: 'Application received', status: 'done' },
          { label: 'Certification complete', status: 'done' },
          { label: 'Approved', status: 'done' },
        ],
        items: [
          {
            title: 'FMLA Certification Submitted',
            subtitle: 'Completed Feb 3, 2026',
            status: 'done',
          },
          {
            title: 'Manager Notification Sent',
            subtitle: 'Completed Jan 28, 2026',
            status: 'done',
          },
        ],
      },
      {
        title: 'Short-Term Disability',
        progress: '2 of 2 complete',
        badge: 'Approved',
        steps: [
          { label: 'Application received', status: 'done' },
          { label: 'Medical review complete', status: 'done' },
          { label: 'Approved', status: 'done' },
        ],
        items: [
          {
            title: 'Medical Documentation Uploaded',
            subtitle: 'Completed Feb 5, 2026',
            status: 'done',
          },
          {
            title: 'Absence Request Submitted',
            subtitle: 'Completed Jan 28, 2026',
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
            { label: 'Absence Type', value: 'Continuous' },
            { label: 'Absence Start Date', value: 'Feb 10, 2026' },
            { label: 'Absence End Date', value: 'May 15, 2026' },
            { label: 'Expected Return Date', value: 'May 16, 2026' },
            { label: 'Duration', value: '95 days' },
            { label: 'Reason', value: 'Employee illness or injury' },
          ],
        },
        {
          title: 'Work Schedule',
          editable: true,
          fields: [
            { label: 'Weekly Hours', value: '40 hours / week' },
            { label: 'Schedule Type', value: 'Fixed' },
            { label: 'Work Days', value: 'Mon, Tue, Wed, Thu, Fri' },
          ],
        },
        {
          title: 'Healthcare Provider',
          editable: true,
          fields: [
            { label: 'Provider', value: 'Dr. Alan Park' },
            { label: 'Facility', value: 'Northwell Orthopedics' },
            { label: 'Phone Number', value: '(555) 310-8819' },
            { label: 'Email', value: 'records@northwell-example.org' },
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
            { name: 'Absence Intake Submission', type: 'Application', date: 'Received Jan 28, 2026', status: 'Received' },
            { name: 'FMLA Certification Form', type: 'Certification', date: 'Received Feb 3, 2026', status: 'Received' },
            { name: 'Medical Documentation', type: 'Clinical Records', date: 'Received Feb 5, 2026', status: 'Received' },
            { name: 'Approval Letter', type: 'Decision Notice', date: 'Issued Feb 9, 2026', status: 'Received' },
          ],
        },
      ],
    },
    paymentData: {
      summaryCards: [
        { label: 'Approved benefits', value: 'FMLA, STD' },
        { label: 'Next payment', value: 'Apr 23, 2026' },
        { label: 'Total paid', value: '$7,840' },
      ],
      rows: [
        { period: 'Feb 10 - Feb 21, 2026', benefit: 'STD', amount: '$1,960', issued: 'Feb 27, 2026', status: 'Paid' },
        { period: 'Feb 22 - Mar 6, 2026', benefit: 'STD', amount: '$1,960', issued: 'Mar 12, 2026', status: 'Paid' },
        { period: 'Mar 7 - Mar 20, 2026', benefit: 'STD', amount: '$1,960', issued: 'Mar 26, 2026', status: 'Paid' },
        { period: 'Mar 21 - Apr 3, 2026', benefit: 'STD', amount: '$1,960', issued: 'Apr 9, 2026', status: 'Paid' },
      ],
    },
    employerPolicies,
  },
};

export function getAbsenceDetailCase(caseId) {
  return absenceDetailCases[caseId] || null;
}
