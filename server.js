import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// --- Database Setup ---
const defaultData = {
  surveys: [
    {
        id: 1,
        title: '새로운 키보드 디자인 선호도 조사',
        description: '저희 팀에서 개발 중인 새로운 기계식 키보드 디자인에 대한 여러분의 의견을 듣고 싶습니다.',
        url: 'https://forms.gle/example1',
        product: '기계식 키보드',
        timeRequired: '약 5분',
        targetAudience: '기계식 키보드 사용자'
    },
    {
        id: 2,
        title: '여름 시즌 신메뉴 수요 조사',
        description: '카페 신메뉴로 어떤 종류의 음료를 원하시나요? 다양한 의견을 남겨주세요.',
        url: 'https://forms.gle/example2',
        product: '카페 신메뉴',
        timeRequired: '약 3분',
        targetAudience: '20-30대 여성'
    }
  ]
};

const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);
await db.read();
await db.write(); // Ensures db.json is created with default data if it doesn't exist

// --- Express App Setup ---
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// --- API Endpoints ---

// GET all surveys
app.get('/api/surveys', async (req, res) => {
  await db.read();
  const { surveys } = db.data;
  res.json(surveys);
});

// POST a new survey
app.post('/api/surveys', async (req, res) => {
  await db.read();
  const newSurvey = req.body;
  
  // Basic validation
  if (!newSurvey.title || !newSurvey.description || !newSurvey.url) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const { surveys } = db.data;
  const newId = surveys.length > 0 ? Math.max(...surveys.map(s => s.id)) + 1 : 1;
  const surveyToAdd = { id: newId, ...newSurvey };

  surveys.push(surveyToAdd);
  await db.write();

  res.status(201).json(surveyToAdd);
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
