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
