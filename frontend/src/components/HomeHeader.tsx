import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const HomeHeader: React.FC = () => (
  <div>
    <Header as='h2' icon textAlign='center'>
      <Icon name='user md' circular />
      <Header.Content>Patient Health Portal</Header.Content>
    </Header>
  </div>
);

export default HomeHeader;
