import express from 'express';

const router = express.Router();

console.log('Test route file is being executed');

router.get('/test', (req, res) => {
  console.log('Test route accessed');
  res.json({ message: 'Test route working' });
});

export default router;