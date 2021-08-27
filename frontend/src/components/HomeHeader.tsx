import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const HomeHeader: React.FC = () => (
  <div>
    <Header className="home-header" as='h2' icon textAlign='center'>
      <Icon name='user md' circular size="tiny" />
      <Header.Content className="home-header-content">Patient Health Portal</Header.Content>
    </Header>
  </div>
);

export default HomeHeader;
