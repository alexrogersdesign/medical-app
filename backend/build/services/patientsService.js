"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEntry = exports.addPatient = exports.validateNewEntry = exports.validatePatient = exports.getPatientById = exports.getPatientsNonSensitive = exports.getPatients = void 0;
/* eslint-disable @typescript-eslint/prefer-as-const */
const patients_1 = __importDefault(require("../data/patients"));
const types_1 = require("../types");
// import { v4 as uuid } from 'uuid';
const uuid = require("uuid");
let patientsList = patients_1.default;
const getPatients = () => {
    return patientsList;
};
exports.getPatients = getPatients;
const getPatientsNonSensitive = () => {
    // const redactedPatientsList = {...patientsData};
    // console.log(...patientsData);
    const redactedPatientsList = patientsList.map(patient => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { ssn, ...rest } = patient;
        return rest;
    });
    return redactedPatientsList;
};
exports.getPatientsNonSensitive = getPatientsNonSensitive;
const getPatientById = (id) => {
    const patientData = patientsList.find(patient => patient.id === id);
    if (patientData) {
        return patientData;
    }
    return undefined;
};
exports.getPatientById = getPatientById;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateName = (name) => {
    if (name && isString(name)) {
        return name;
    }
    throw new Error('Invalid or missing name: ' + String(name));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateDateOfBirth = (date) => {
    if (date && isDate(date) && isString(date)) {
        return date;
    }
    throw new Error('Invalid or missing date of birth: ' + String(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateSsn = (ssn) => {
    if (ssn && isString(ssn)) {
        return ssn;
    }
    throw new Error('Invalid or missing ssn: ' + String(ssn));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateGender = (gender) => {
    if (gender && isGender(gender)) {
        return gender;
    }
    throw new Error('Invalid or missing gender: ' + String(gender));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateOccupation = (occupation) => {
    if (occupation && isString(occupation)) {
        return occupation;
    }
    throw new Error('Invalid or missing occupation: ' + String(occupation));
};
const isArrayOfObjects = (value) => {
    if (value && isArray(value) && value.every(object => typeof object === 'object')) {
        return true;
    }
    return false;
};
const isEntries = (entries) => {
    if (isArrayOfObjects(entries)) {
        return entries.every((entry) => {
            if (hasOwnProperty(entry, 'type') && typeof entry.type === 'string') {
                Object.values(types_1.EntryType).includes(entry.type);
            }
            return false;
        });
    }
    return false;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateEntries = (entries) => {
    let entriesArray;
    if (!entries) {
        return [];
    }
    if (isArray(entries)) {
        entriesArray = entries;
    }
    else {
        entriesArray = [entries];
    }
    if (entries && isEntries(entriesArray)) {
        return entriesArray;
    }
    throw new Error('Invalid or missing Entries : ' + String(entries));
};
const validatePatient = ({ name, dateOfBirth, ssn, gender, occupation, entries, healthRating }) => {
    const patientToReturn = {
        name: validateName(name),
        dateOfBirth: validateDateOfBirth(dateOfBirth),
        ssn: validateSsn(ssn),
        gender: validateGender(gender),
        occupation: validateOccupation(occupation),
        entries: validateEntries(entries),
        healthRating: validateHealthRating(healthRating)
    };
    return { ...patientToReturn, ...(entries && { entries: validateEntries(entries) }) };
};
exports.validatePatient = validatePatient;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isArray = (array) => {
    return Array.isArray(array);
};
function hasOwnProperty(obj, prop) {
    // eslint-disable-next-line no-prototype-builtins
    return obj.hasOwnProperty(prop);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateString = (string) => {
    if (string && isString(string)) {
        return string;
    }
    throw new Error('Invalid or missing Entry: ' + String(string));
};
const validateCodes = (codes) => {
    if (isArray(codes)) {
        if (codes.every((code) => isString(code))) {
            return codes;
        }
        throw new Error('one or more invalid diagnosis codes');
    }
    throw new Error('malformatted diagnosis codes');
};
const isObject = (object) => {
    return typeof object === 'object';
};
const isDischarge = (discharge) => {
    if (isObject(discharge) &&
        hasOwnProperty(discharge, 'date') &&
        hasOwnProperty(discharge, 'criteria') &&
        isString(discharge.date) &&
        isString(discharge.criteria)) {
        return true;
    }
    return false;
};
const validateDischarge = (discharge) => {
    if (discharge && isDischarge(discharge))
        return discharge;
    throw new Error('malformatted discharge data');
};
const isSickLeave = (sickLeave) => {
    if (isObject(sickLeave) &&
        hasOwnProperty(sickLeave, 'startDate') &&
        hasOwnProperty(sickLeave, 'endDate') &&
        isString(sickLeave.startDate) &&
        isString(sickLeave.endDate)) {
        return true;
    }
    return false;
};
const validateSickLeave = (sickLeave) => {
    if (sickLeave && isSickLeave(sickLeave)) {
        return sickLeave;
    }
    throw new Error('malformatted sick leave data');
};
const isNumber = (value) => {
    return typeof value === 'number';
};
const validateEmployer = (string) => {
    if (string && isString(string)) {
        return string;
    }
    throw new Error('Invalid or missing Employer: ' + String(string));
};
const validateHealthRating = (rating) => {
    if (isNumber(rating) && Object.values(types_1.HealthRating).includes(rating)) {
        return rating;
    }
    throw new Error('malformatted rating');
};
const validateHealthCheckRating = (rating) => {
    if (isNumber(rating) && Object.values(types_1.HealthCheckRating).includes(rating)) {
        return rating;
    }
    throw new Error('malformatted rating');
};
const validateType = (type) => {
    switch (type) {
        case 'Hospital':
            return 'Hospital';
        case 'HealthCheck':
            return 'HealthCheck';
        case 'OccupationalHealthcare':
            return 'OccupationalHealthcare';
        default:
            return null;
    }
};
const validateNewEntry = (entry) => {
    const validatedEntry = {
        description: validateString(entry.description),
        specialist: validateString(entry.specialist),
    };
    entry.diagnosisCodes ? validatedEntry.diagnosisCodes = validateCodes(entry.diagnosisCodes) : null;
    const checkEntry = () => {
        if (entry.type === 'Hospital') {
            return {
                ...validatedEntry,
                type: validateType(entry.type),
                discharge: validateDischarge(entry.discharge)
            };
        }
        else if (entry.type === 'OccupationalHealthcare') {
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
        }
        else if (entry.type === 'HealthCheck') {
            return {
                ...validatedEntry,
                type: validateType(entry.type),
                healthCheckRating: validateHealthCheckRating(entry.healthCheckRating)
            };
        }
        else
            throw new Error('malformatted entry types');
    };
    return checkEntry();
};
exports.validateNewEntry = validateNewEntry;
const addPatient = (unvalidatedPatient) => {
    const patient = exports.validatePatient(unvalidatedPatient);
    const id = uuid.v4();
    const newPatient = {
        ...patient,
        id
    };
    patientsList.push(newPatient);
    return newPatient;
};
exports.addPatient = addPatient;
const addEntry = (entry, patientId) => {
    const found = patientsList.find(patient => patient.id === patientId);
    if (!found) {
        throw new Error('patient not found');
    }
    const patient = found;
    const [month, day, year] = (new Date()).toLocaleDateString().split("/");
    const newEntry = {
        ...exports.validateNewEntry(entry),
        id: uuid.v4(),
        date: `${year}-${month}-${day}`
    };
    const { entries: formerEntries } = patient;
    const newEntries = [...formerEntries, newEntry];
    const newPatient = {
        ...patient,
        entries: newEntries
    };
    const newPatients = patientsList.map(oldPatient => oldPatient.id === newPatient.id ? newPatient : oldPatient);
    patientsList = newPatients;
    return newEntry;
};
exports.addEntry = addEntry;
