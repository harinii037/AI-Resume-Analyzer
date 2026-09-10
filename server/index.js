require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { PDFParse } = require('pdf-parse'); 
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json()); // lets us read JSON sent in request bodies (for the job description)

const PORT = 5000;
const upload = multer({ storage: multer.memoryStorage() });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    const pdfBuffer = req.file.buffer;
    // NEW (correct for pdf-parse v2.x):
    const parser = new PDFParse({ data: pdfBuffer });
    const ans = await parser.getText();
    const resumeText = ans.text;
    await parser.destroy(); // frees internal resources — good practice, not strictly required to work
    const jobDescription = req.body.jobDescription; // sent alongside the file

    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' });

    const prompt = `
You are an expert technical recruiter. Compare this resume against this job description.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Respond ONLY with valid JSON in this exact format, no markdown, no extra text:
{
  "matchScore": <number 0-100>,
  "missingSkills": ["skill1", "skill2"],
  "suggestions": ["specific suggestion 1", "specific suggestion 2"]
}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Clean up in case Gemini wraps it in markdown code fences
    const cleaned = responseText.replace(/```json|```/g, '').trim();
    const analysis = JSON.parse(cleaned);

    res.json(analysis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to analyze resume' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});