export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum EntryType  {
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck"
}
export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3
}
// export enum EntryType {
  //   "HealthCheck",
//   "Hospital",
//   "OccupationalHealthcare"
// }
export enum HealthCheckRatingText {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entries;
  healthRating: HealthCheckRating;
}

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export type Entries = Entry[] | [] ;


export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}
export interface SickLeave {
  startDate: string,
  endDate: string
}
export interface Discharge {
  date: string,
  criteria: string
}
export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital,
  discharge: Discharge,
}
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare,
  employerName: string,
  sickLeave?: SickLeave
}


export type Entry =
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;



export type NewPatient = Omit<Patient, 'id'>;
export type NonSensitivePatient = Omit<Patient, 'ssn'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type DistributiveOmit<T, K extends keyof T, Y extends keyof T> = T extends unknown
  ? Omit<T, K | Y>
  : never;

export type NewEntry = DistributiveOmit<Entry, 'id', 'date'>;