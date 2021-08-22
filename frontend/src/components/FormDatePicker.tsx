import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form } from 'semantic-ui-react';

interface FormValues {
    name: string,
    value: string,
  }
  
  interface IForm {
    setFieldValue: (name:string, value:string) => void,
  }
  
  type IDateProps = {
    label: string,
    field: FormValues,
    form: IForm,
    children: unknown
  };


const FormDatePicker: React.FC<IDateProps> = ({
    label,
    field,
    form,
    children: _,
    ...props
}) => {

    const isValid = (date:string): boolean => {
        const convertedDate = new Date(date);
        return convertedDate instanceof Date && !isNaN(convertedDate.getTime());
    };

    if (field && form){
        const { name, value } = field;
        const { setFieldValue } = form; 
        let selectedDate = new Date(value);
        if(!isValid(value)){ selectedDate = new Date(); }
    return (
        <>
            <Form.Field>
                <label>{label}</label>
                <DatePicker 
                selected={selectedDate}
                dateFormat="MMMM d, yyyy"
                className="form-control"
                onChange={(date:Date) => setFieldValue(name, date.toISOString().split('T')[0])}
                {...props}
                />
            </Form.Field>
        </>
    );}
    else return <></>;
};
export default FormDatePicker;
