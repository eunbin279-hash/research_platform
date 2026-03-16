import React from 'react';
import { Container } from 'react-bootstrap';
import SurveyList from '../components/SurveyList';

function Home({ surveys }) {
  return (
    <Container className="mt-4">
      <SurveyList surveys={surveys} />
    </Container>
  );
}

export default Home;

