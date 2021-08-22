/* eslint-disable @typescript-eslint/no-floating-promises */
import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Divider, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";
import PatientDetailsPage from './PatientDetailsPage';

import './styles/App.css';

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);
  
  React.useEffect(() => {
    const getDiagnosisData = async (): Promise<void> => {
      try {
         const { data } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnosis`     
        );
         if (data) {
              dispatch({ type: "SET_DIAGNOSIS_DATA", payload: data });
         } else {return undefined;}
      } catch (e) {
        console.error(e);
      }
    };
    void getDiagnosisData();
  }, [ ]);

  

  return (
    <div className="App">
      <Router>
        <Container>
          <Divider hidden />
          <Switch>
            <Route path="/patient/:id" render={() => <PatientDetailsPage />} />
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
