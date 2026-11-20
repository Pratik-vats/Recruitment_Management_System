const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const connectDB = require('./config/db');
const app = require('./app');
const User = require('./models/User');
const seedAdmin = require('./utils/seedAdmin');
const migrateUser = require('./utils/migrateUser');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and ensure initial seed data exists on fresh Atlas deployments
connectDB()
  .then(async () => {
    try {
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        console.log('[RMS Server] Fresh database detected. Seeding initial admin, demo users, and sample jobs...');
        await seedAdmin();
      } else {
        await migrateUser().catch(() => {});
      }
    } catch (err) {
      console.warn(`[RMS Server Init Notice]: ${err.message}`);
    }
  })
  .catch((err) => {
    console.error(`[DB Connect Error]: ${err.message}`);
  });

const server = app.listen(PORT, () => {
  console.log(`[RMS Server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`[RMS API] Health check endpoint: http://localhost:${PORT}/api/health`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`[Unhandled Rejection]: ${err.message}`);
  // Keep server running in dev
});
