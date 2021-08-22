import React from 'react';
import { Entry, Diagnosis } from '../types';
import { List, Icon, Container} from "semantic-ui-react";
import { v4 as uuid } from 'uuid';
import { useStateValue } from "../state";

 
const EntryDetails: React.FC<{ entry:Entry }> = ({ entry }) => {
    const [{ diagnosisData }, ] = useStateValue();
    // const assertNever = (value: never): never => {
    //     throw new Error(
    //       `Unhandled discriminated union member: ${JSON.stringify(value)}`
    //     );
    //   };
    const renderHealthCheck = (rating:number) => {
        switch (rating) {
            case 0: 
                return <Icon name={'heart'} style={{color: "green"}} size='large' />;
            case 1: 
                return <Icon name={'heart'} style={{color: "yellow"}} size='large'  />; 
            case 2: 
                return <Icon name={'heart'} style={{color: "red"}} size='large' />; 
            case 3: 
                return <Icon name={'heart'} style={{color: "purple"}} size='large' />; 
        }
    };

    const BaseEntry: React.FC = () => {
        return (
            <div>
                <List>               
                <strong>{entry.type}</strong>                
                {/* <List.Item >
                    <List.Header>Entry ID</List.Header>{entry.id}
                </List.Item> */}
                <List.Item >
                    <List.Header>Description</List.Header>{entry.description}
                </List.Item>
                <List.Item >
                    <List.Header>Date</List.Header>{entry.date}
                </List.Item>
                <List.Item >
                    <List.Header>Specialist</List.Header>{entry.specialist}
                </List.Item>
                <List.Item >
                    <List.Header>Diagnosis Codes</List.Header>
                    {
                    entry.diagnosisCodes?.map(code => {
                        if (diagnosisData){
                            const definition = Object.values(diagnosisData).find((diagnosis:Diagnosis) => diagnosis.code === code );
                            // console.log('definition', definition);
                            if (definition) {
                                return <List.Item key={uuid()}><strong>{code} - </strong>   {definition.name}</List.Item>;
                            }                                     
                        }
                        return <List.Item key={uuid()}>{code}</List.Item>;
                    })
                    }
                </List.Item>  
                </List>              
            </div>
        );
    }; 

    switch(entry.type){
        case "HealthCheck":
            return(
                <Container fluid key={uuid()}>
                    <Icon name="check" size='large'/>
                    <BaseEntry/>
                    <List>
                    <List.Item >
                        <List.Header>Health Check Rating</List.Header>{
                        renderHealthCheck(entry.healthCheckRating)
                        }
                    </List.Item>
                    </List>
                    <br/>
                </Container>
            );
        case "Hospital":
            return(
                <Container fluid key={uuid()}>
                    <Icon name="hospital" size='large' />
                    <BaseEntry/>
                    <List>
                    <List.Item >
                        <List.Header>Discharge</List.Header>
                        <List.Header>Date</List.Header>{entry.discharge.date}
                        <List.Header>Criteria</List.Header>{entry.discharge.criteria}
                    </List.Item>
                    </List>
                    <br/>
                </Container>
            );
        case "OccupationalHealthcare":
            return(
                <Container fluid key={uuid()}>
                    <Icon name="cog" size='large' />
                    <BaseEntry/>
                    <List>
                    <List.Item>
                        <List.Header>Employer</List.Header>{entry.employerName}
                    </List.Item>
                    {entry.sickLeave && 
                    <List.Item >
                        <List.Header>Sick Leave</List.Header>
                        <List.Header>Date</List.Header>{entry.sickLeave.startDate}
                        <List.Header>Criteria</List.Header>{entry.sickLeave.endDate}
                    </List.Item>}
                    </List>    
                    <br/>
                </Container>
            );
            default:
                // return assertNever(entry);
                throw new Error('invalid entry type');
              }
};

export default EntryDetails;