const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Job = require('../models/Job');
const Application = require('../models/Application');

const seedAdmin = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('[Seed] Connected to MongoDB...');
    }

    // Clear existing collections to ensure fresh, consistent realistic Indian data
    await User.deleteMany({});
    await Profile.deleteMany({});
    await Job.deleteMany({});
    await Application.deleteMany({});
    console.log('[Seed] Cleared existing records.');

    // 1. Admin Account (Indian identity)
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
    const adminHash = await User.hashPassword(adminPassword);

    const admin = await User.create({
      name: 'Rajesh Verma',
      email: adminEmail,
      passwordHash: adminHash,
      role: 'admin',
      isActive: true
    });
    console.log(`[Seed] Admin created: Rajesh Verma (${adminEmail})`);

    // 2. Primary Recruiter Account (Vikram Malhotra)
    const recEmail = 'recruiter@example.com';
    const recHash = await User.hashPassword('Recruiter@123');
    const recruiterVikram = await User.create({
      name: 'Vikram Malhotra',
      email: recEmail,
      passwordHash: recHash,
      role: 'recruiter',
      isActive: true
    });
    console.log(`[Seed] Primary Recruiter created: Vikram Malhotra (${recEmail})`);

    // Additional Recruiter (Pooja Sharma)
    const recruiterPooja = await User.create({
      name: 'Pooja Sharma',
      email: 'pooja.sharma@talentflow.in',
      passwordHash: recHash,
      role: 'recruiter',
      isActive: true
    });

    // 3. Primary Applicant Account (Pratik Vats)
    const appEmail = 'applicant@example.com';
    const appHash = await User.hashPassword('Applicant@123');
    const applicantPratik = await User.create({
      name: 'Pratik Vats',
      email: appEmail,
      passwordHash: appHash,
      role: 'applicant',
      isActive: true
    });

    await Profile.create({
      user: applicantPratik._id,
      phone: '+91 8235152111',
      education: 'Bachelor of Engineering, Computer Science Engineering — Chandigarh University',
      skills: ['React', 'Node.js', 'Express', 'Spring Boot', 'MongoDB', 'C++', 'Java', 'Python', 'Tailwind CSS', 'SQL'],
      experience: 'Computer Science undergraduate with hands-on full-stack development experience across React, Node.js, Express, Spring Boot, and MongoDB, backed by a strong algorithmic foundation (1800+ LeetCode rating, 600+ problems solved alongside a 1280+ Codeforces rating). Built Huffman-Based File Compressor, SpillTheTea real-time chat, and CivSim.',
      resumeUrl: 'resume-pratik-vats.pdf'
    });
    console.log(`[Seed] Primary Applicant created: Pratik Vats (${appEmail})`);

    // Additional Applicant 2 (Ananya Iyer)
    const applicantAnanya = await User.create({
      name: 'Ananya Iyer',
      email: 'ananya.iyer@gmail.com',
      passwordHash: appHash,
      role: 'applicant',
      isActive: true
    });

    await Profile.create({
      user: applicantAnanya._id,
      phone: '+91 97412 88301',
      education: 'B.E. in Information Technology, BITS Pilani',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Figma', 'REST APIs'],
      experience: '3 years of frontend UI engineering creating modern design systems and consumer SaaS products.',
      resumeUrl: 'resume-ananya-iyer.pdf'
    });

    // Additional Applicant 3 (Rohan Mehta)
    const applicantRohan = await User.create({
      name: 'Rohan Mehta',
      email: 'rohan.mehta@outlook.com',
      passwordHash: appHash,
      role: 'applicant',
      isActive: true
    });

    await Profile.create({
      user: applicantRohan._id,
      phone: '+91 98110 55294',
      education: 'B.Tech in Software Engineering, DTU Delhi',
      skills: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker', 'AWS'],
      experience: 'Backend specialist with experience building UPI integrations, authentication microservices, and distributed pipelines.',
      resumeUrl: 'resume-rohan-mehta.pdf'
    });

    // Additional Applicant 4 (Priya Verma)
    const applicantPriya = await User.create({
      name: 'Priya Verma',
      email: 'priya.verma@yahoo.in',
      passwordHash: appHash,
      role: 'applicant',
      isActive: true
    });

    await Profile.create({
      user: applicantPriya._id,
      phone: '+91 99345 12098',
      education: 'MCA, Savitribai Phule Pune University (SPPU)',
      skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Node.js', 'Bootstrap'],
      experience: 'Junior full-stack developer with 1.5 years experience developing responsive e-commerce portals.',
      resumeUrl: 'resume-ananya-iyer.pdf'
    });

    // 4. Realistic Indian Tech Job Postings
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);

    const job1 = await Job.create({
      title: 'Senior Full Stack MERN Developer',
      description: 'Join our core platform engineering team in Bengaluru. You will lead the architecture, design, and deployment of scalable full-stack web applications handling millions of user interactions across India.\n\nKey Responsibilities:\n- Build robust RESTful APIs in Node.js and Express.\n- Architect dynamic, responsive UI components with modern React and Tailwind CSS.\n- Optimize MongoDB queries, aggregations, and indexes for high throughput.\n- Collaborate with product designers and engineering managers in an Agile sprint environment.',
      location: 'Bengaluru, Karnataka (Hybrid)',
      jobType: 'Full-time',
      skills: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'REST APIs'],
      deadline: futureDate,
      recruiter: recruiterVikram._id,
      status: 'Open'
    });

    const job2 = await Job.create({
      title: 'SDE-2 Frontend Engineer (React & Next.js)',
      description: 'We are hiring an experienced SDE-2 Frontend Engineer for our Hyderabad Tech Centre. You will craft pixel-perfect, accessible web interfaces and design systems with modern React, Tailwind CSS, and state management frameworks.',
      location: 'Hyderabad, Telangana',
      jobType: 'Full-time',
      skills: ['React', 'JavaScript', 'Tailwind CSS', 'Redux', 'Performance Optimization'],
      deadline: futureDate,
      recruiter: recruiterVikram._id,
      status: 'Open'
    });

    const job3 = await Job.create({
      title: 'Backend Node.js & Microservices Engineer',
      description: 'Looking for a strong backend developer in Gurugram to architect resilient microservices, integrate secure Indian payment gateways (UPI, Netbanking), and optimize high-throughput MongoDB data models.',
      location: 'Gurugram, Haryana / NCR',
      jobType: 'Full-time',
      skills: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Microservices', 'AWS'],
      deadline: futureDate,
      recruiter: recruiterVikram._id,
      status: 'Open'
    });

    const job4 = await Job.create({
      title: 'Software Development Engineer Intern (Summer 2027)',
      description: 'Exciting paid 6-month internship in Pune for pre-final and final year B.Tech, B.E., or MCA students. You will receive 1-on-1 mentorship from senior tech leads and contribute directly to production MERN features.',
      location: 'Pune, Maharashtra',
      jobType: 'Internship',
      skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'Git'],
      deadline: futureDate,
      recruiter: recruiterVikram._id,
      status: 'Open'
    });

    const job5 = await Job.create({
      title: 'Lead UI/UX React Developer',
      description: 'Fully remote role across India! Build intuitive, accessible, and delightful design systems for pan-India logistics networks and consumer web applications.',
      location: 'Mumbai, Maharashtra (Remote)',
      jobType: 'Remote',
      skills: ['React', 'Tailwind CSS', 'Design Systems', 'TypeScript', 'Web Accessibility'],
      deadline: futureDate,
      recruiter: recruiterPooja._id,
      status: 'Open'
    });

    const job6 = await Job.create({
      title: 'Contract Full Stack Consultant',
      description: '6-month high-impact contract position in Sector 62, Noida, accelerating our partner portal migration and omnichannel API services.',
      location: 'Noida, Uttar Pradesh',
      jobType: 'Contract',
      skills: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
      deadline: futureDate,
      recruiter: recruiterPooja._id,
      status: 'Open'
    });

    console.log('[Seed] Created 6 realistic Indian tech job postings.');

    // 5. Realistic Applications with authentic cover letters & status pipeline
    await Application.create({
      job: job1._id,
      applicant: applicantPratik._id,
      resumeUrl: 'resume-pratik-vats.pdf',
      coverLetter: 'Dear Hiring Team,\n\nI am a Computer Science undergraduate at Chandigarh University with hands-on full-stack development experience across React, Node.js, Express, Spring Boot, and MongoDB, backed by a strong algorithmic foundation (1800+ LeetCode rating, Knight Badge, 600+ problems solved). I have engineered scalable full-stack projects including a Huffman-based compression system and real-time WebSocket chat. I would be thrilled to bring my passion, problem-solving skills, and dedication to your engineering team.\n\nWarm regards,\nPratik Vats',
      status: 'Shortlisted'
    });

    await Application.create({
      job: job2._id,
      applicant: applicantAnanya._id,
      resumeUrl: 'resume-ananya-iyer.pdf',
      coverLetter: 'Hello Hiring Team,\n\nHaving worked for 3 years at BITS Pilani incubation projects and consumer tech startups, I excel in building fluid, accessible React interfaces with Tailwind CSS and Redux. I am looking forward to contributing to your Hyderabad product team.\n\nBest,\nAnanya Iyer',
      status: 'Under Review'
    });

    await Application.create({
      job: job3._id,
      applicant: applicantRohan._id,
      resumeUrl: 'resume-rohan-mehta.pdf',
      coverLetter: 'Respected Recruiter,\n\nI specialize in scalable Node.js microservices, caching with Redis, and MongoDB schema design. Having built high-concurrency payment and order processing engines during my tenure at DTU, I am excited about joining your Gurugram team.\n\nSincerely,\nRohan Mehta',
      status: 'Selected'
    });

    await Application.create({
      job: job1._id,
      applicant: applicantPriya._id,
      resumeUrl: 'resume-ananya-iyer.pdf',
      coverLetter: 'Respected Vikram Sir,\n\nI completed my MCA from Pune University and have 1.5 years experience with React and Node.js. I am keen to learn and contribute to your Bengaluru team.\n\nRegards,\nPriya Verma',
      status: 'Applied'
    });

    console.log('[Seed] Created realistic candidate applications with resumes and status tracking.');
    console.log('[Seed] Database initialization with real Indian data complete!');
    if (require.main === module) {
      process.exit(0);
    }
  } catch (error) {
    console.error(`[Seed Error]: ${error.message}`);
    if (require.main === module) {
      process.exit(1);
    }
    throw error;
  }
};

if (require.main === module) {
  seedAdmin();
}

module.exports = seedAdmin;
