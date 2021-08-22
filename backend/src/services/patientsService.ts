/* eslint-disable @typescript-eslint/prefer-as-const */
import patientsData from '../data/patients';
import { Patient,  PublicPatient, NewPatient, Gender, Entries, Entry, Discharge, DistributiveOmit, BaseEntry, SickLeave, HealthCheckRating, NewEntry, EntryType} from '../types';
// import { v4 as uuid } from 'uuid';
import uuid = require('uuid');


let patientsList: Patient[] = patientsData;

export const getPatients = (): Patient[] => {
    return patientsList;
};

export const getPatientsNonSensitive = (): PublicPatient[] => {
    // const redactedPatientsList = {...patientsData};
    // console.log(...patientsData);
    const redactedPatientsList: PublicPatient[] = patientsList.map(patient => { 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {ssn, ...rest} = patient;
        return rest;
     } );
    return redactedPatientsList;
};


export const getPatientById = (id: string): Patient | undefined => {
    const patientData = patientsList.find(patient => patient.id === id);
    if (patientData){
        return patientData;
    }
    return undefined;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
  };
// eslint-disable-next-line @typescript-eslint/no-explicit-any

const isDate = (date:string): boolean => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateName = (name: any): string => {
    if (name && isString(name) ) {
        return name;
    } 
    throw new Error ('Invalid or missing name: '+ String(name));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateDateOfBirth = (date: any): string => {
    if (date && isDate(date) && isString(date)) {
        return date;
    } 
    throw new Error ('Invalid or missing date of birth: ' + String(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateSsn = (ssn: any): string => {
    if (ssn && isString(ssn) ) {
        return ssn;
    } 
    throw new Error ('Invalid or missing ssn: ' + String(ssn));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateGender = (gender:any): Gender => {
    if (gender && isGender(gender)) {
        return gender;
    }
    throw new Error ('Invalid or missing gender: ' + String(gender));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateOccupation = (occupation: any): string => {
    if (occupation && isString(occupation) ) {
        return occupation;
    } 
    throw new Error ('Invalid or missing occupation: ' + String(occupation));
};
const isArrayOfObjects = (value:unknown): value is Record<string, unknown>[] => {
    if (value && isArray(value) && value.every(object => typeof object === 'object')) {
        return true;
    } return false;
};
const isEntries = (entries: unknown): entries is Entries => {
    if ( isArrayOfObjects(entries))
    {return entries.every((entry) => {
        if (hasOwnProperty(entry, 'type') && typeof entry.type ==='string') {
            Object.values(EntryType).includes(entry.type);
        } return false;
    } ); }
    return false;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateEntries = (entries: any): Entries => {
    let entriesArray: unknown[];
    if(!entries){
        return [];
    }
    if (isArray(entries)){
        entriesArray = entries;  
    } else { entriesArray = [entries]; }
    
    
    if (entries && isEntries(entriesArray)) {
        return entriesArray;
    } 
    throw new Error ('Invalid or missing Entries : ' + String(entries));
};

export const validatePatient = ({name, dateOfBirth, ssn, gender, occupation, entries}: NewPatient): NewPatient => {
    const patientToReturn = {
        name: validateName(name),
        dateOfBirth: validateDateOfBirth(dateOfBirth),
        ssn: validateSsn(ssn),
        gender: validateGender(gender),
        occupation: validateOccupation(occupation),
        entries: validateEntries(entries) 
    };
    
    return {...patientToReturn, ...(entries && {entries:validateEntries(entries)})};
}; 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isArray = (array: any): array is any[] => {
    return Array.isArray(array);
  };
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const isArray = (array: any): array is any[] => {
//     return typeof array === 'object' || array instanceof Object;
//   };

function hasOwnProperty<X extends Record<string, unknown>, Y extends PropertyKey>
  (obj: X, prop: Y): obj is X & Record<Y, unknown> {
  // eslint-disable-next-line no-prototype-builtins
  return obj.hasOwnProperty(prop);
}
// function hasOwnProperty<X extends {}, Y extends PropertyKey>
//   (obj: X, prop: Y): obj is X & Record<Y, unknown> {
//   return obj.hasOwnProperty(prop);
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateString = (string: any): string => {
    if (string && isString(string) ) {
        return string;
    } 
    throw new Error ('Invalid or missing Entry: ' + String(string));
};
const validateCodes= (codes:string[]): string[] => {
    if (isArray(codes)){
        if (codes.every((code:string) => isString(code))) { return codes; }
       throw new Error ('one or more invalid diagnosis codes');
    } 
    throw new Error ('malformatted diagnosis codes');
};
const isObject = (object:unknown): object is Record<string, unknown> => {
    return typeof object === 'object';
};
const isDischarge = (discharge:unknown): discharge is Discharge => {
    if (
        isObject(discharge) &&
        hasOwnProperty(discharge, 'date')   &&
        hasOwnProperty(discharge, 'criteria')   &&
        isString(discharge.date) &&
        isString(discharge.criteria)
    ) { return true; }
    return false;
};
const validateDischarge = (discharge: unknown): Discharge => {
    if (discharge && isDischarge(discharge)) return discharge; 
    throw new Error ('malformatted discharge data');
};


const isSickLeave = (sickLeave:unknown): sickLeave is SickLeave => {
    if (
        isObject(sickLeave) &&
        hasOwnProperty(sickLeave, 'startDate') &&
        hasOwnProperty(sickLeave, 'endDate') &&
        isString(sickLeave.startDate) &&
        isString(sickLeave.endDate) 
    ) {return true;}
    return false;
};

const validateSickLeave = (sickLeave:unknown): SickLeave => {
    if (sickLeave && isSickLeave(sickLeave)) { return sickLeave;}
    throw new Error ('malformatted sick leave data');
};


// const assertNever = (value: never): never => {
//     throw new Error(
//       `Unhandled discriminated union member: ${JSON.stringify(value)}`
//     );
//   };
const isNumber = (value:unknown): value is number => {
    return typeof value === 'number';
};

const validateEmployer = (string: unknown): string => {
    if (string && isString(string) ) {
        return string;
    } 
    throw new Error ('Invalid or missing Employer: ' + String(string));
};

const validateHealthCheckRating = (rating:unknown): HealthCheckRating => {
    if ( isNumber(rating) && Object.values(HealthCheckRating).includes(rating)){
        return rating;
    } throw new Error ('malformatted rating');

};
const validateType = (type:unknown) => {
    switch (type) {
        case 'Hospital':
            return 'Hospital' as 'Hospital';
        case 'HealthCheck':
            return 'HealthCheck' as 'HealthCheck';
        case 'OccupationalHealthcare':
            return 'OccupationalHealthcare' as 'OccupationalHealthcare';
        default :
            return null;
    }
};

export const validateNewEntry = (entry:NewEntry): NewEntry => { 
    const validatedEntry: DistributiveOmit<Entry, 'id', 'date'>| DistributiveOmit<BaseEntry, 'id', 'date'> = {
        description: validateString(entry.description),
        specialist: validateString(entry.specialist),
    };
    entry.diagnosisCodes? validatedEntry.diagnosisCodes = validateCodes(entry.diagnosisCodes): null;
    const checkEntry = () => {
            if (entry.type === 'Hospital'){
                return {
                    ...validatedEntry, 
                    type:validateType(entry.type), 
                    discharge: validateDischarge(entry.discharge)};
            } else if (entry.type ==='OccupationalHealthcare'){
                const entryData = {
                        ...validatedEntry,
                        employer: validateEmployer(entry.employerName),
                        type: validateType(entry.type),
                    };
                if (entry.sickLeave) { 
                    return {
                    ...validatedEntry,
                    type: validateType(entry.type),
                    sickLeave: validateSickLeave(entry.sickLeave) 
                };
            }
                // entry.sickLeave? entryData.sickLeave = validateSickLeave(entry.sickLeave): null;
                return entryData;
            } else if (entry.type === 'HealthCheck'){
                return {
                    ...validatedEntry,
                    type:validateType(entry.type),
                    healthCheckRating: validateHealthCheckRating(entry.healthCheckRating)
                };
            } else throw new Error ('malformatted entry types');
    };
    return checkEntry() as DistributiveOmit<Entry, 'id', 'date'>;
};

export const addPatient = (unvalidatedPatient: NewPatient): Patient => {
    const patient = validatePatient(unvalidatedPatient);
    const id: string = uuid.v4();
    const newPatient: Patient = {
        ...patient,
        id
    };
    patientsList.push(newPatient);
    return newPatient;
};

export const addEntry = (entry: NewEntry, patientId: string): Entry => {
    const found = patientsList.find(patient => patient.id === patientId);
    if (!found){ throw new Error('patient not found'); }

    const patient: Patient = found;
    
    const [month, day, year] = ( new Date() ).toLocaleDateString().split("/");
    const newEntry: Entry = {
        ...validateNewEntry(entry),
        id: uuid.v4(),
        date: `${year}-${month}-${day}`
    };
    const {entries: formerEntries} = patient;
    const newEntries = [...formerEntries, newEntry];
    const newPatient = {
        ...patient,
        entries: newEntries
    };
    const newPatients = patientsList.map(oldPatient => oldPatient.id === newPatient.id? newPatient: oldPatient);
    patientsList = newPatients;
    return newEntry;
    };

