import React from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import SurveyItem from './SurveyItem';
import SurveyListItem from './SurveyListItem'; // Import the new component

function SurveyList({ surveys }) {
  if (!surveys || surveys.length === 0) {
    return null; // Don't render anything if there are no surveys
  }

  const featuredSurvey = surveys[0];
  const otherSurveys = surveys.slice(1);

  return (
    <>
      {/* Featured Survey */}
      <Row className="mb-5">
        <Col>
          <SurveyItem survey={featuredSurvey} />
        </Col>
      </Row>

      {/* Other Surveys List */}
      {otherSurveys.length > 0 && (
        <>
          <h2 className="h4 mb-3">전체 수요조사</h2>
          <ListGroup>
            {otherSurveys.map((survey) => (
              <SurveyListItem key={survey.id} survey={survey} />
            ))}
          </ListGroup>
        </>
      )}
    </>
  );
}

export default SurveyList;
