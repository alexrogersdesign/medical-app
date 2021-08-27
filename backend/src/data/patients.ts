import { Patient, Gender } from '../types';

const patients: Patient[] = [
  {
    id: 'd2773336-f723-11e9-8f0b-362b9e155667',
    name: 'Tony Halvorson',
    dateOfBirth: '1976-03-12',
    ssn: '133-234-1193',
    gender: Gender.Male,
    occupation: 'Product Division Facilitator',
    healthRating: 2, 
    entries: [
      {
        id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
        date: '2015-01-02',
        type: 'Hospital',
        specialist: 'MD House',
        diagnosisCodes: ['S62.5'],
        description:
          "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
        discharge: {
          date: '2015-01-16',
          criteria: 'Thumb has healed.',
        },
      },
      {
        id: '6c3ac12f-69ff-4d11-ad98-b5dd084cd990',
        date: '2018-04-14',
        type: 'OccupationalHealthcare',
        specialist: 'Jana Donnelly',
        employerName: 'Hilll, Corkery and Wisozk',
        diagnosisCodes: ['M24.2', 'L20', 'S62.5'],
        description:
          '',
        sickLeave: {
          startDate: '2018-04-15',
          endDate: '2018-04-28',
        },
      },
    ],
  },
  {
    id: 'd2773598-f723-11e9-8f0b-362b9e155667',
    name: 'Brendan Frami',
    dateOfBirth: '1989-11-30',
    ssn: '332-334-3311',
    gender: Gender.Male,
    occupation: 'International Operations Orchestrator',
    healthRating: 3, 
    entries: [
      {
        id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',
        date: '2019-08-05',
        type: 'OccupationalHealthcare',
        specialist: 'MD House',
        employerName: 'HyPD',
        diagnosisCodes: ['Z57.1', 'Z74.3', 'M51.2'],
        description:
          'Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning. ',
        sickLeave: {
          startDate: '2019-08-05',
          endDate: '2019-08-28',
        },
      },
    ],
  },
  {
    id: 'd27736ec-f723-11e9-8f0b-362b9e155667',
    name: 'Manuel Hills',
    dateOfBirth: '1970-04-25',
    ssn: '223-443-1300',
    gender: Gender.Male,
    occupation: 'Direct Mobility Administrator',
    healthRating: 1, 
    entries: [
      {
        id: '397c3bfb-269a-4f09-b8ed-f4a8df6f8e75',
        date: '2021-5-23',
        specialist: 'Jay Ebert',
        type: 'HealthCheck',
        description: 'Annual cancer screening',
        healthCheckRating: 0,
      },
      {
        id: '543e7710-a09f-47ed-8b61-d6cfee817426',
        date: '2020-5-15',
        specialist: 'Jay Ebert',
        type: 'HealthCheck',
        description: 'Annual cancer screening',
        healthCheckRating: 0,
      },
      {
        id: '73e74a29-fb24-4d43-8af9-92a6ee8455f9',
        date: '2015-11-27',
        type: 'OccupationalHealthcare',
        specialist: 'Trevor Kuhlman',
        employerName: 'Pfannerstill, Raynor and Abernathy',
        diagnosisCodes: ['L20', 'N30.0', 'J06.9'],
        description:
          'Consequatur occaecati excepturi quibusdam. Est quia eligendi qui id corporis eum aut. Quia possimus quam cupiditate fugiat voluptatem. Fugit rerum porro.',
        sickLeave: {
          startDate: '2019-08-05',
          endDate: '2019-08-28',
        },
    ],
  },
  {
    id: 'd2773822-f723-11e9-8f0b-362b9e155667',
    name: 'Rudy Dickinson',
    dateOfBirth: '1984-05-15',
    ssn: '132-312-4223',
    gender: Gender.Male,
    occupation: 'Senior Response Representative',
    healthRating: 1, 
    entries: [
      {
        id: 'b4f4eca1-2aa7-4b13-9a18-4a5535c3c8da',
        date: '2019-10-20',
        specialist: 'MD House',
        type: 'HealthCheck',
        description: 'Yearly control visit. Cholesterol levels back to normal.',
        healthCheckRating: 0,
      },
      {
        id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',
        date: '2019-09-10',
        specialist: 'MD House',
        type: 'OccupationalHealthcare',
        employerName: 'McCullough - Kuvalis',
        description: 'Prescriptions renewed.',
      },
      {
        id: '37be178f-a432-4ba4-aac2-f86810e36a15',
        date: '2018-10-05',
        specialist: 'MD House',
        type: 'HealthCheck',
        description:
          'Yearly control visit. Due to high cholesterol levels recommended to eat more vegetables.',
        healthCheckRating: 1,
      },
    ],
  },
  {
    id: 'd2773c6e-f723-11e9-8f0b-362b9e155667',
    name: 'Luther Parker',
    dateOfBirth: '1991-04-09',
    ssn: '984-233-3221',
    gender: Gender.Male,
    occupation: 'Investor Quality Liaison',
    healthRating: 2, 
    entries: [
      {
        id: '54a8746e-34c4-4cf4-bf72-bfecd039be9a',
        date: '2019-05-01',
        specialist: 'Dr Byte House',
        type: 'HealthCheck',
        description: 'Digital overdose, very bytestatic. Otherwise healthy.',
        healthCheckRating: 0,
      },
    ],
  },
];

export default patients;