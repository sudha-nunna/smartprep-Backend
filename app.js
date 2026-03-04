const express = require('express');
const cors = require('cors');


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const regionalSchoolRoutes = require('./routes/regionalSchoolRoutes');
const regionRoutes = require('./routes/regionRoutes');
const subjectRoutes = require('./routes/ResourceSubjectRoute');
const tutorRoutes = require('./routes/tutors');
const statsRoutes = require('./routes/statsRoutes');

const resourceTypeRoutes = require("./routes/resourceTypeRoutes");

const leaderboardRoutes = require("./routes/leaderboardRoutes");
const learningBoardsRoutes = require("./routes/learningBoardsRoutes");
const userProgressRoutes = require("./routes/userProgressRoutes");


const metricsRoutes = require("./routes/metricsRoutes.js");
const practiceTestRoutes = require("./routes/practiceTestRoutes");
const recentActivityRoutes = require("./routes/recentActivityRoutes");
const courseRoutes = require("./routes/courseRoutes");


const app = express();

// Enable CORS
const allowedOrigins = [
  process.env.CLIENT_URL || 'https://smartpre-frontend-kfrcr6p77-sudhanunna1-7765s-projects.vercel.app',
  'http://localhost:3000', // Keep for local development
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/regions', regionRoutes);
app.use('/api/regional-schools', regionalSchoolRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/metrics', metricsRoutes);
app.use("/api/tests", practiceTestRoutes); // Use practiceTestRoutes for the main /api/tests endpoint
app.use("/api/activities", recentActivityRoutes);
app.use("/api/courses", courseRoutes);

app.use("/api/resource-types", resourceTypeRoutes);

// Learning dashboards
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/learning-boards", learningBoardsRoutes);
app.use("/api/user-progress", userProgressRoutes);



// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
