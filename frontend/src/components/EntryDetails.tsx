import React from 'react';
import { Entry, Diagnosis, HealthCheckRatingText } from '../types';
import { List, Icon, Container, Label, Header} from "semantic-ui-react";
import { v4 as uuid } from 'uuid';
import { useStateValue } from "../state";

 
const EntryDetails: React.FC<{ entry:Entry }> = ({ entry }) => {
    const [{ diagnosisData }, ] = useStateValue();
    const renderHealthCheck = (rating:number) => {
        switch (rating) {
            case 0: 
                return <Label icon="heart" size='large' ><Icon name="heart" color="green"/> {HealthCheckRatingText[0]} </Label>;
            case 1: 
                return <Label icon="heart" size='large' ><Icon name="heart" color="yellow"/> {HealthCheckRatingText[1]} </Label>;
            case 2: 
                return <Label icon="heart" size='large' ><Icon name="heart" color="orange"/>     {HealthCheckRatingText[2]} </Label>;
            case 3: 
                return <Label icon="heart" size='large' ><Icon name="heart" color="red"/> {HealthCheckRatingText[3]} </Label>;
        }
    };

    const BaseEntry: React.FC = () => {
        return (
            <div>
                <List celled verticalAlign='middle'>               
                    <List.Item >
                        <List.Header><Label icon="info" color="teal" content="Description" ribbon/></List.Header>{entry.description}
                    </List.Item>
                    <List.Item >
                        <List.Header><Label icon="calendar alternate" color="teal" content="Date" ribbon/></List.Header>{entry.date}
                    </List.Item>
                    <List.Item >
                        <List.Header><Label icon="user md" color="teal" content="Specialist" ribbon/></List.Header>{entry.specialist}
                    </List.Item>
                    <List.Item >
                        <List.Header><Label icon="code" color="teal" content="Diagnosis Codes" ribbon/></List.Header>
                        <List celled verticalAlign="middle">
                            {
                            entry.diagnosisCodes?.map(code => {
                                if (diagnosisData){
                                    const definition = Object.values(diagnosisData).find((diagnosis:Diagnosis) => diagnosis.code === code );
                                    if (definition) {
                                        return (
                                            <List.Item key={uuid()}>
                                                <List.Header className="diagnosis-code"><List.Icon name="plus" />{code}</List.Header>
                                                <List.Description>{definition.name}</List.Description>
                                            </List.Item>);
                                    }                                     
                                }
                                return <List.Item key={uuid()}>{code}</List.Item>;
                            })
                            }
                        </List>
                    </List.Item>  
                </List>              
            </div>
        );
    }; 

    switch(entry.type){
        case "HealthCheck":
            return(
                <Container fluid key={uuid()}>
                    <Header size="medium" icon="first aid" color="black" content="Health Check" />  
                    <BaseEntry/>
                    <List>
                    <List.Item >
                        <List.Header><Label icon="heart outline" color="teal" content="Health Check Rating" ribbon/></List.Header>{
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
                    <Header size="medium" icon="hospital" color="black" content="Hospital Visit" />  
                    {/* <Icon name="hospital" size='large' /> */}
                    <BaseEntry/>
                    <List celled verticalAlign="middle">
                        <List.Item >
                            <List.Header><Label icon="calendar check" color="teal" content="Discharge Date" ribbon/></List.Header>{entry.discharge.date}
                        </List.Item>
                        <List.Item>
                          <List.Header><Label icon="stethoscope" color="teal" content="Discharge Criteria" ribbon/></List.Header>{entry.discharge.criteria}
                        </List.Item>
                    </List>
                    <br/>
                </Container>
            );
        case "OccupationalHealthcare":
            return(
                <Container fluid key={uuid()}>
                     <Header size="medium" icon="clipboard check" color="black" content="Occupational Healthcare" />  
                    <BaseEntry/>
                    <List celled verticalAlign="middle">
                        <List.Item>
                            <List.Header><Label icon="briefcase" color="teal" content="Employer" ribbon/></List.Header>{entry.employerName}
                        </List.Item>
                        {entry.sickLeave && 
                        <>
                            <List.Item>
                                <List.Header><Label icon="calendar plus outline" color="teal" content="Sick Leave Start Date" ribbon/></List.Header>{entry.sickLeave.startDate}
                            </List.Item>
                            <List.Item>
                                <List.Header><Label icon="calendar times outline" color="teal" content="Sick Leave End Date" ribbon/></List.Header>{entry.sickLeave.endDate}
                            </List.Item>
                        </>
                        }
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