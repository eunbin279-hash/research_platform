import React from 'react';
import { Card, Button, Badge, Stack } from 'react-bootstrap';

function SurveyItem({ survey }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{survey.title}</Card.Title>
        <Card.Text className="flex-grow-1">{survey.description}</Card.Text>
        
        <Stack direction="horizontal" gap={2} className="mb-3">
          <Badge bg="secondary">{survey.product}</Badge>
          <Badge bg="secondary">{survey.timeRequired}</Badge>
        </Stack>

        <Button 
          variant="primary" 
          href={survey.url} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          참여하기
        </Button>
      </Card.Body>
    </Card>
  );
}

export default SurveyItem;
