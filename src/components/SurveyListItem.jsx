import React from 'react';
import { ListGroup, Button, Badge, Stack } from 'react-bootstrap';

function SurveyListItem({ survey }) {
  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-center"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{survey.title}</div>
        <Stack direction="horizontal" gap={2} className="mt-1">
          <Badge bg="light" text="dark">{survey.product}</Badge>
          <Badge bg="light" text="dark">{survey.timeRequired}</Badge>
        </Stack>
      </div>
      <Button 
        variant="primary" 
        href={survey.url}
        target="_blank"
        rel="noopener noreferrer"
        size="sm"
      >
        참여하기
      </Button>
    </ListGroup.Item>
  );
}

export default SurveyListItem;
