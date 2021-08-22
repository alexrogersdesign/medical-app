import React from 'react';
import { Form, Rating } from 'semantic-ui-react';

interface FormValues {
  name: string,
  value: number,
}

interface IForm {
  setFieldValue: (name:string, value:number) => void,
}

export interface FormikActions<Values> {
  setFieldValue<Field extends keyof Values>(
    field: Field,
    value: Values[Field],
    shouldValidate?: boolean
  ): void;
}

type BarProps = {
  rating: number;
  showText: boolean;
  label?: string;
  disabled?: true;
  field?: FormValues,
  form?: IForm,
  children?: unknown
};


const HEALTHBAR_TEXTS = [
  'The patient is in great shape',
  'The patient has a low risk of getting sick',
  'The patient has a high risk of getting sick',
  'The patient has a diagnosed condition',
];

const HealthRatingBar: React.FC<BarProps> = ({ 
  rating, 
  showText,
  disabled,
  label,
  field,
  form,
  children: _,
  ...props
 }: BarProps) => {
  if (disabled) {
  return <Rating icon="heart" disabled rating={rating} maxRating={4} />;
  }  
  else if (field && form) {
    const { name, value } = field;
    const { setFieldValue } = form; 
    return (
      <Form.Field className="health-bar">
        <label>{label}</label>
        <Rating 
        rating={value}
        icon="heart" 
        maxRating={4}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onRate={(_: any, { rating }: any) => setFieldValue(name, rating)}
        {...props}
        />
        {showText ? <p>{HEALTHBAR_TEXTS[rating]}</p> : null}
      </Form.Field>
    );
  }
  return <></>;
};

export default HealthRatingBar;
