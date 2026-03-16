import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CreateSurveyModal({ show, onHide, onAddSurvey }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [product, setProduct] = useState('');
  const [timeRequired, setTimeRequired] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !url || !product || !timeRequired) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    onAddSurvey({ title, description, url, product, timeRequired });
    setTitle('');
    setDescription('');
    setUrl('');
    setProduct('');
    setTimeRequired('');
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>새 수요조사 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formSurveyTitle">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              placeholder="수요조사 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSurveyDescription">
            <Form.Label>설명</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="수요조사에 대한 간단한 설명을 입력하세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSurveyProduct">
            <Form.Label>상품</Form.Label>
            <Form.Control
              type="text"
              placeholder="예: 기계식 키보드"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSurveyTime">
            <Form.Label>소요 시간</Form.Label>
            <Form.Control
              type="text"
              placeholder="예: 약 5분"
              value={timeRequired}
              onChange={(e) => setTimeRequired(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSurveyUrl">
            <Form.Label>링크</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://example.com/survey-form"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </Form.Group>
          <div className="d-grid">
            <Button variant="primary" type="submit">
              등록하기
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateSurveyModal;

