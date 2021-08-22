import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { Diagnosis, HealthCheckRating, EntryType } from "../types";
// import "react-datepicker/dist/react-datepicker.css";
// import { useField, useFormikContext } from "formik";
// import DatePicker from "react-datepicker";



// structure of a single option
export type EntryOption = {
  value: EntryType;
  label: string;
};

export type HealthCheckRatingOption = {
  value: HealthCheckRating;
  text: string;
};

// props for select field component
type SelectEntryProps = {
  name: string;
  label: string;
  options: EntryOption[];
};

export const SelectEntry: React.FC<SelectEntryProps> = ({
  name,
  label,
  options
}: SelectEntryProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

type SelectRatingProps = {
    name: string;
    label: string;
    options: HealthCheckRatingOption[];
  };

export const SelectRating: React.FC<SelectRatingProps> = ({
  name,
  label,
  options
}: SelectRatingProps) => (
  <Form.Field>
    <label>{label}</label>
    <Dropdown
    clearable options={options} selection
    name={name}
    className="ui dropdown"

    />
    {/* <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.text || option.value}
        </option>
      ))}
    </Field> */}
  </Form.Field>
);

// export const DatePickerField = ({ ...props }) => {
//   const { setFieldValue } = useFormikContext();
//   const [field] = useField(props);
//   return (
//     <DatePicker
//       {...field}
//       {...props}
//       selected={(field.value && new Date(field.value)) || null}
//       onChange={val => {
//         setFieldValue(field.name, val);
//       }}
//     />
//   );
// };


interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);


interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField: React.FC<NumberProps> = ({ field, label, min, max }) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />

    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const field = "diagnosisCodes";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map(diagnosis => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};
