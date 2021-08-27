/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect } from 'react';
import axios from "axios";
import { Entry, Patient } from '../types';
import { v4 as uuid } from 'uuid';
import { Link } from"react-router-dom";

import { apiBaseUrl } from "../constants";
import { Container, List, Button, Label, Header } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import { useStateValue } from "../state";
import EntryDetails from '../components/EntryDetails';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import PatientHeader from '../components/PatientHeader';
 
interface Params {
    id: string;
}

const PatientDetailsPage: React.FC = () => {
    const {id} = useParams<Params>();
    // const [patient, setPatient] = useState<Patient | undefined>();
    const [{ patientDetails: patient }, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    useEffect(() => {
        void getPatientData();
    }, [ dispatch, id]);

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
      };
    const submitNewEntry = async (values: EntryFormValues) => {
    try {
            const { data: newEntry } = await axios.post<Entry>(
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `${apiBaseUrl}/patients/${id}/entries`,
            values
        );
            dispatch({ 
             type: "ADD_ENTRY",
             payload: newEntry, 
             targetId: id 
            });
            closeModal();
        } catch (e) {
            // tslint:disable-next-line
            console.error(e.response.data);
            // tslint:disable-next-line
            setError(e.response.data.error);
        }
    };
    const getPatientData = async (): Promise<void> => {
        try {
           const { data } = await axios.get<Patient>(
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `${apiBaseUrl}/patients/${id}`     
          );
           if (data) {
                dispatch({ type: "SET_PATIENT_DETAILS", payload: data });
           } else {return undefined;}          
        } catch (e) {
          console.error(e);
        }
      };
    const renderEntries = () => {
        if (patient && patient.entries ) {
            const entries: Entry[] = patient.entries;
            return  Object.values(entries).map((entry: Entry) => {
                return <EntryDetails key={uuid()} entry={entry} />;
            });
        }
    };

    const renderPatient = ( ) => {
        if (patient) {
        return (
            <Container className="Patients">
                <PatientHeader patient={patient}/>
                <Button color="grey" as={Link} to="/" primary>
                    Return
                </Button>
                <List celled verticalAlign='middle'>
                    <List.Item>
                        <List.Header><Label icon="id badge outline" color="olive" content="Patient ID" ribbon/></List.Header>{patient.id}                   
                        </List.Item>
                    <List.Item>
                        <List.Header><Label icon="hashtag" color="olive" content="SSN" ribbon/></List.Header>{patient.ssn}                   
                        </List.Item>
                    <List.Item>
                        <List.Header><Label icon="warehouse" color="olive" content="Occupation" ribbon/></List.Header>{patient.occupation}                   
                        </List.Item>
                    <List.Item>
                        <List.Header><Label icon="venus mars" color="olive" content="Gender" ribbon/></List.Header>{patient.gender}                   
                        </List.Item>
                    <List.Item>
                        <List.Header><Label icon="birthday cake" color="olive" content="Date of Birth" ribbon/></List.Header>{patient.dateOfBirth}                   
                        </List.Item>
                </List>           
                <Container className="Entries_Divider" >
                    <Header  textAlign='center' floated="right" size="large"  color="black" content="Entries" />                    
                </Container>
                <Container>
                    {patient.entries? renderEntries() : <p>No Entries</p>}    
                </Container>
                <AddEntryModal
                    modalOpen={modalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <Button color="google plus" onClick={() => openModal()}>Add New Entry</Button>                
          </Container>
        );
      }
    };
    return (
        <div>
            {patient? renderPatient() : <p>Loading</p>}            
        </div>
    );
};
export default PatientDetailsPage;