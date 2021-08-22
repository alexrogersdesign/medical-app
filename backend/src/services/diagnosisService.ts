import diagnosisData from '../data/diagnosis.json';
import { Diagnosis } from '../types';

const diagnosisList: Diagnosis[] = diagnosisData;

export const getDiagnosis = (): Diagnosis[] => {
    return diagnosisList;
};