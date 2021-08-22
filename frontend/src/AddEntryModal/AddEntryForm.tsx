/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form, FormikProps, ArrayHelpers  } from "formik";
// import { v4 as uuidv4 } from 'uuid';
import { TextField, SelectEntry, SelectRating, EntryOption, HealthCheckRatingOption, DiagnosisSelection } from "./FormField";
import { EntryType, HealthCheckRating, NewEntry } from "../types";
import { useStateValue } from "../state";


export type EntryFormValues = NewEntry;


interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}


const entryOptions: EntryOption[] = [
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" },
  { value: EntryType.HealthCheck, label: "HealthCheck" }
];
const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, text: "Healthy" },
  { value: HealthCheckRating.LowRisk, text: "Low Risk" },
  { value: HealthCheckRating.HighRisk, text: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, text: "Critical Risk" },
];

export type FieldArrayRenderProps = ArrayHelpers & {
  form: FormikProps<EntryFormValues>;
  name: string;
};


export const AddPatientForm: React.FC<Props> = ({ onSubmit, onCancel}) => {
  const [{ diagnosisData: diagnoses }] = useStateValue();
  if (!diagnoses) throw new Error('diagnoses data does not exist');

  // interface InitialValues {
  //   type: EntryType.HealthCheck,
  //   specialist: string,
  //   diagnosisCodes: string[],
  //   description: string, 
  //   healthCheckRating: HealthCheckRating,
    
  // }

  const baseValues = {
    type: EntryType.HealthCheck,
    specialist: "",
    diagnosisCodes: [''],
    description: "",
  };
  const healthCheckValues = {
    healthCheckRating: HealthCheckRating.Healthy,
  };
  const hospitalValues = {
    discharge: {
      date: '',
      criteria: ''
    },
  };
  const occupationalHealthcareValues = {
    employerName: '',
    sickLeave: {
      startDate: '',
      endDate: ''
    }
  };
  interface errorValues {
    description?: string,
    specialist?: string,
    employerName?: string,
    discharge?: {
        date?: string,
        criteria?: string
      },
    sickLeave?: {
      startDate?: string,
      endDate?: string
    }
  }
  function isValidDate(dateString:string): boolean {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    // if(!dateString.exec(regEx)) return false;  // Invalid format
    if(!regEx.exec(dateString)) return false;  // Invalid format
    const date = new Date(dateString);
    const dateInMS = date.getTime();
    if(!dateInMS && dateInMS !== 0) return false; // NaN value, Invalid date
    return date.toISOString().slice(0,10) === dateString;
  }
 
  return (
    <Formik
      initialValues={{...baseValues, ...healthCheckValues, ...hospitalValues, ...occupationalHealthcareValues   }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const dateError = "Date format must match YYYY-MM-DD ";
        const errors: errorValues = {};
        // const errors: { [field: string]: string } = {};
        // const errors: { [field: string | Record<string, unknown>]: string } = {};
        
      
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        // hospital 
        if (values.type === EntryType.Hospital && !values.discharge.criteria) {
         if (!errors.discharge){ errors.discharge = {};}
          errors.discharge.criteria = requiredError;
        }
        if (values.type === EntryType.Hospital && !values.discharge.date) {
         if (!errors.discharge){ errors.discharge = {};}
          errors.discharge.date = requiredError;
        }
        if (values.type === EntryType.Hospital && values.discharge.date && !isValidDate(values.discharge.date)) {
         if (!errors.discharge){ errors.discharge = {};}
          errors.discharge.date = dateError;
        }
        // occuaption healthcare
        if (values.type === EntryType.OccupationalHealthcare &&!values.employerName) {         
          errors.employerName = requiredError;
        }
        if (values.type === EntryType.OccupationalHealthcare && !values.sickLeave.startDate) {
         if (!errors.sickLeave){ errors.sickLeave = {};}
          errors.sickLeave.startDate = requiredError;
        }
        if (values.type === EntryType.OccupationalHealthcare && values.sickLeave.startDate && !isValidDate(values.sickLeave.startDate)) {
         if (!errors.sickLeave){ errors.sickLeave = {};}
          errors.sickLeave.startDate = dateError;
        }
        if (values.type === EntryType.OccupationalHealthcare && !values.sickLeave.endDate) {
         if (!errors.sickLeave){ errors.sickLeave = {};}
          errors.sickLeave.endDate = requiredError;
        }
        if (values.type === EntryType.OccupationalHealthcare && values.sickLeave.endDate && !isValidDate(values.sickLeave.endDate)) {
          if (!errors.sickLeave){ errors.sickLeave = {};}
          errors.sickLeave.endDate = dateError;
        }
        return errors;
      }}
    >
      {(props) => {
        const { isValid, dirty, setFieldValue, setFieldTouched, values} = props;
        const { type } = values;
        return (
          <Form className="form ui">
            <SelectEntry
              label="Entry Type"
              name="type"
              options={entryOptions}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
             <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />   
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            {
            type === EntryType.HealthCheck 
            && 
            <SelectRating
              label="Health Check Rating"
              name="healthCheckRating"
              options={healthCheckRatingOptions}
            />
            }
            {type === EntryType.Hospital 
            && 
            <>
              <Field
              label="Discharge Criteria"
              placeholder="Discharge Criteria"
              name="discharge.criteria"
              component={TextField}
              />
              <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
              />
            </>
            }
            {
              type === EntryType.OccupationalHealthcare
              &&
              <>
                <Field
                label="Employer Name"
                placeholder="Employer"
                name="employerName"
                component={TextField}
                />       
                <Field
                label="Sick Leave Start Date"
                placeholder="YYYY-MM-DD"
                name="sickLeave.startDate"
                component={TextField}
                />       
                <Field
                label="Sick Leave End Date"
                placeholder="YYYY-MM-DD"
                name="sickLeave.endDate"
                component={TextField}
                />       
              </>
            }
            
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPatientForm;
