import React, { useMemo } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import SurveyListItem from '../components/SurveyListItem';

function MyPage({ allSurveys, createdIds, participatedIds }) {

  const createdSurveys = useMemo(() => 
    allSurveys.filter(s => createdIds.includes(s.id)),
    [allSurveys, createdIds]
  );

  const participatedSurveys = useMemo(() =>
    allSurveys.filter(s => participatedIds.includes(s.id)),
    [allSurveys, participatedIds]
  );

  return (
    <Container className="mt-4">
      <h1 className="h2 mb-4">마이페이지</h1>

      <section className="mb-5">
        <h2 className="h4 mb-3">내가 만든 수요조사</h2>
        <ListGroup>
          {createdSurveys.length > 0 ? (
            createdSurveys.map(survey => (
              <SurveyListItem key={survey.id} survey={survey} />
            ))
          ) : (
            <p>직접 만든 수요조사가 없습니다.</p>
          )}
        </ListGroup>
      </section>

      <section>
        <h2 className="h4 mb-3">내가 참여한 수요조사</h2>
        <ListGroup>
          {participatedSurveys.length > 0 ? (
            participatedSurveys.map(survey => (
              <SurveyListItem key={survey.id} survey={survey} />
            ))
          ) : (
            <p>참여한 수요조사가 없습니다.</p>
          )}
        </ListGroup>
      </section>
    </Container>
  );
}

export default MyPage;
