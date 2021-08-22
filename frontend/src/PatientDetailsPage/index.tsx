/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect } from 'react';
import axios from "axios";
import { Entry, Patient } from '../types';
import { v4 as uuid } from 'uuid';
import { Link } from"react-router-dom";

// import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { Container, List, Button } from "semantic-ui-react";
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
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };
    const getPatientData = async (): Promise<void> => {
        try {
           const { data } = await axios.get<Patient>(
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
            <div className="App">
                <PatientHeader patient={patient}/>
                <Button as={Link} to="/" primary>
                Home
                </Button>
                <Container textAlign="center">
                </Container>
                <List>
                <List.Item>
                    <List.Header>Patient ID</List.Header>{patient.id}                   
                    </List.Item>
                <List.Item>
                    <List.Header>SSN</List.Header>{patient.ssn}                   
                    </List.Item>
                <List.Item>
                    <List.Header>Occupation</List.Header>{patient.occupation}                   
                    </List.Item>
                <List.Item>
                    <List.Header>gender</List.Header>{patient.gender}                   
                    </List.Item>
                <List.Item>
                    <List.Header>Date of Birth</List.Header>{patient.dateOfBirth}                   
                    </List.Item>
                </List>           
                <Container textAlign="center">
                    <h3>Entries</h3>
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
                <Button onClick={() => openModal()}>Add New Entry</Button>                
          </div>
        );
      }
    };
    return (
        <div>
            {patient? renderPatient() : <p>Loading</p>}            
            {/* { renderPatient() } */}
        </div>
    );
};
export default PatientDetailsPage;