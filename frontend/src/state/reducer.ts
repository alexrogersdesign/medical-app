import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT_DETAILS";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_DATA";
      payload: Diagnosis[];
    }  
  | {
      type: "ADD_ENTRY";
      targetId: string
      payload: Entry;
    };


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT_DETAILS":
      return {
        ...state,
        patientDetails: {
          ...action.payload
        }
      };
      case "SET_DIAGNOSIS_DATA":
      return {
        ...state,
        diagnosisData: [
          ...action.payload
        ]
      };
      case "ADD_ENTRY":
        if(!state.patientDetails){ throw new Error('Patient details not populated');}
        const oldEntries = state.patientDetails.entries? state.patientDetails.entries: [];
        
      return {
        ...state,
        patientDetails: {
          ...state.patientDetails,
          entries: oldEntries.concat(action.payload)
        }
    
      };
    default:
      return state;
  }
};
