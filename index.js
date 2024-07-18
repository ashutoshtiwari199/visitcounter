const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());

let visitors = new Set();

app.get('/getcount', (req, res) => {
  const visitorId = req.cookies.visitorId;

  if (!visitorId || !visitors.has(visitorId)) {
    const newVisitorId = generateVisitorId();
    visitors.add(newVisitorId);
    res.cookie('visitorId', newVisitorId, { maxAge: 900000, httpOnly: true });
    res.send('Thank you for visiting!');
  } else {
    res.send('Welcome back!');
  }
});

app.get('/total-visitors', (req, res) => {
  res.json({ totalVisitors: visitors.size });
});

function generateVisitorId() {
  return Math.random().toString(36).substr(2, 9);
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

