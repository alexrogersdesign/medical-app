/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import axios from "axios";
import { Table, Button, Segment, Header, Icon } from "semantic-ui-react";
import { useHistory } from"react-router-dom";


import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import HomeHeader from "../components/HomeHeader";
import { useStateValue } from "../state";

const PatientListPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${apiBaseUrl}/patients`,
        values
      );
      dispatch({ type: "ADD_PATIENT", payload: newPatient });
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  // adding support for clickable rows 
  const history = useHistory();
  const handleRowClick = (patient:Patient) => {
    history.push('/patient/'+patient.id);
  };

  return (
    <div className="App">
   
      <HomeHeader/>
      <Segment placeholder>
      <Segment textAlign="center">
        <Header as="h3">
          <Icon size="tiny" name="users"/>
          <Header.Content className="patient-list-header">
            Current Patients
          </Header.Content>
        </Header>
      </Segment>
        <Table striped selectable className="patient-header" >
          <Table.Header className="patient-header">
            <Table.Row className="patient-header">
              <Table.HeaderCell className="patient-header" >Name</Table.HeaderCell>
              <Table.HeaderCell className="patient-header">Gender</Table.HeaderCell>
              <Table.HeaderCell className="patient-header">Occupation</Table.HeaderCell>
              <Table.HeaderCell className="patient-header">Health Rating</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="patient-body">
            {Object.values(patients).map((patient: Patient) => (
              <Table.Row key={patient.id} onClick={()=> handleRowClick(patient)}>
                <Table.Cell>{patient.name}</Table.Cell>
                <Table.Cell>{patient.gender}</Table.Cell>
                <Table.Cell>{patient.occupation}</Table.Cell>
                <Table.Cell>
                  <HealthRatingBar disabled={true} showText={false} rating={patient.healthRating} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <AddPatientModal
          modalOpen={modalOpen}
          onSubmit={submitNewPatient}
          error={error}
          onClose={closeModal}
        />
        <Button color="facebook" onClick={() => openModal()}>Add New Patient</Button>
      </Segment>
    </div>
  );
};

export default PatientListPage;
