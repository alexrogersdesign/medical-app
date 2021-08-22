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
// const checkEntries = (entries: unknown) :entries is Entry[] => {
//   if (Array.isArray(entries) && entries.every((entry: Entry) => Object.values(EntryType).includes(entry.type) ) ) return true;
//   else return false;
// };

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
      // case "ADD_ENTRY":
      //   if (!state.patients[action.targetId]) throw new Error('Patient not found');
      //   const patientToUpdate = state.patients[action.targetId];
      //   if (!action.payload) throw new Error('missing payload');
      //   if (!patientToUpdate.entries) {
      //     patientToUpdate.entries = [action.payload];
      //   } else if (!checkEntries(patientToUpdate.entries)) {
      //      console.log(patientToUpdate);
      //      throw new Error('malformatted entry');
      //   } else {
      //     const entries = patientToUpdate.entries as Entry[];
      //     patientToUpdate.entries= [
      //       ...entries,
      //       action.payload
      //     ];
      //   }
      // return {
      //   ...state,
      //   [action.targetId]: patientToUpdate
      //   // patients: {
      //   //   ...state.patients,
      //   //   [action.targetId]: patientToUpdate
      //   // }
      // };
    default:
      return state;
  }
};
