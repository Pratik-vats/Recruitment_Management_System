const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Application = require('../models/Application');

async function migrate() {
  try {
    if (mongoose.connection.readyState !== 1) {
      const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/recruitment_management_db';
      console.log('[Migrate] Connecting to MongoDB at:', mongoUri);
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
      console.log('[Migrate] Connected to MongoDB.');
    }

    // 1. Update any User with Aarav or applicant@example.com to Pratik Vats
    const userRes = await User.updateMany(
      { $or: [{ name: /aarav/i }, { email: 'applicant@example.com' }] },
      { $set: { name: 'Pratik Vats' } }
    );
    console.log('[Migrate] Updated Users:', userRes);

    const applicant = await User.findOne({ email: 'applicant@example.com' });
    if (applicant) {
      console.log(`[Migrate] Found applicant user: ${applicant.name} (${applicant.email})`);

      // 2. Update Profile to Pratik Vats
      const profRes = await Profile.updateMany(
        { user: applicant._id },
        {
          $set: {
            education: 'Bachelor of Engineering, Computer Science Engineering — Chandigarh University',
            skills: ['React', 'Node.js', 'Express', 'Spring Boot', 'MongoDB', 'C++', 'Java', 'Python', 'Tailwind CSS', 'SQL'],
            phone: '+91 8235152111',
            experience: 'Computer Science undergraduate with hands-on full-stack development experience across React, Node.js, Express, Spring Boot, and MongoDB, backed by a strong algorithmic foundation (1800+ LeetCode rating, 600+ problems solved alongside a 1280+ Codeforces rating). Built Huffman-Based File Compressor, SpillTheTea real-time chat, and CivSim.',
            resumeUrl: 'resume-pratik-vats.pdf'
          }
        }
      );
      console.log('[Migrate] Updated Profile:', profRes);

      // 3. Update Applications to Pratik Vats
      const appRes = await Application.updateMany(
        { applicant: applicant._id },
        {
          $set: {
            resumeUrl: 'resume-pratik-vats.pdf',
            coverLetter: 'Dear Hiring Team,\n\nI am a Computer Science undergraduate at Chandigarh University with hands-on full-stack development experience across React, Node.js, Express, Spring Boot, and MongoDB, backed by a strong algorithmic foundation (1800+ LeetCode rating, Knight Badge, 600+ problems solved). I have engineered scalable full-stack projects including a Huffman-based compression system and real-time WebSocket chat. I would be thrilled to bring my passion, problem-solving skills, and dedication to your engineering team.\n\nWarm regards,\nPratik Vats'
          }
        }
      );
      console.log('[Migrate] Updated Applications for applicant:', appRes);
    }

    // 4. Any remaining references to resume-aarav-sharma.pdf across all applications/profiles
    await Application.updateMany(
      { resumeUrl: /aarav/i },
      { $set: { resumeUrl: 'resume-pratik-vats.pdf' } }
    );
    await Profile.updateMany(
      { resumeUrl: /aarav/i },
      { $set: { resumeUrl: 'resume-pratik-vats.pdf' } }
    );

    console.log('[Migrate] SUCCESS: All database records have been converted from Aarav Sharma to Pratik Vats!');
    if (require.main === module) {
      process.exit(0);
    }
  } catch (err) {
    console.error('[Migrate Error]:', err.message);
    if (require.main === module) {
      process.exit(1);
    }
  }
}

if (require.main === module) {
  migrate();
}

module.exports = migrate;
