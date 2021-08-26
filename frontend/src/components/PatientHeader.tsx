import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import { Patient } from '../types';

interface IPatientHeader {
    patient: Patient
}

const PatientHeader: React.FC <IPatientHeader> = ({patient}) => (
  <div>
    <Header as='h2' icon textAlign='center'>
      <Icon name='user' circular size="mini"/>
      <Header.Content>{patient.name}</Header.Content>
    </Header>
  </div>
);

export default PatientHeader;
