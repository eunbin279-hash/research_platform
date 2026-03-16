import React, { useState, useEffect, useMemo } from 'react';
import { Container, Form, ListGroup, Badge, Stack } from 'react-bootstrap';
import SurveyListItem from '../components/SurveyListItem';

function Search({ allSurveys }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredSurveys, setFilteredSurveys] = useState(allSurveys);

  // 1. Get all unique tags using useMemo for performance
  const allTags = useMemo(() => {
    const tags = new Set();
    allSurveys.forEach(survey => {
      tags.add(survey.product);
      tags.add(survey.timeRequired);
      tags.add(survey.targetAudience);
    });
    return Array.from(tags);
  }, [allSurveys]);

  const handleTagClick = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  useEffect(() => {
    let results = allSurveys;

    // Filter by search term
    if (searchTerm) {
      results = results.filter(survey =>
        survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        survey.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      results = results.filter(survey =>
        selectedTags.every(tag =>
          survey.product === tag ||
          survey.timeRequired === tag ||
          survey.targetAudience === tag
        )
      );
    }

    setFilteredSurveys(results);
  }, [searchTerm, selectedTags, allSurveys]);

  return (
    <Container className="mt-4">
      <h1 className="h2 mb-4">수요조사 검색</h1>
      
      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      <Stack direction="horizontal" gap={2} className="flex-wrap mb-4">
        {allTags.map(tag => (
          <Badge 
            key={tag}
            pill 
            bg={selectedTags.includes(tag) ? 'primary' : 'light'}
            text={selectedTags.includes(tag) ? 'dark' : 'dark'}
            onClick={() => handleTagClick(tag)}
            style={{ cursor: 'pointer', padding: '8px 12px', fontSize: '0.9rem' }}
            className="border"
          >
            {tag}
          </Badge>
        ))}
      </Stack>

      <ListGroup>
        {filteredSurveys.length > 0 ? (
          filteredSurveys.map(survey => (
            <SurveyListItem key={survey.id} survey={survey} />
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </ListGroup>
    </Container>
  );
}

export default Search;
