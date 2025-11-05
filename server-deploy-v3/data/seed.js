import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
// force English locale for consistent English text generation
faker.locale = 'en';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';

dotenv.config();

const NUM_EMPLOYERS = 10;
const NUM_APPLICANTS = 40;
const NUM_JOBS = 50;
const NUM_APPLICATIONS = 80;

const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for bulk seeding');

    await Application.deleteMany({});
    await Job.deleteMany({});
    await User.deleteMany({});

    const employers = [];
    const applicants = [];

    // create employers
    for (let i = 0; i < NUM_EMPLOYERS; i++) {
      const name = faker.company.name();
  const email = `employer${i}@${faker.internet.domainName()}`;
      const password = await bcrypt.hash('password', 10);
      const user = await User.create({ name, email, password, role: 'employer' });
      employers.push(user);
    }

    // create applicants
    for (let i = 0; i < NUM_APPLICANTS; i++) {
      const name = faker.person.fullName();
  const email = `applicant${i}@${faker.internet.domainName()}`;
      const password = await bcrypt.hash('password', 10);
      const user = await User.create({ name, email, password, role: 'applicant' });
      applicants.push(user);
    }

    // create jobs
    const jobs = [];
    const sampleTypes = ['full-time', 'part-time', 'contract'];
    const sampleLocations = ['Remote', 'New York, NY', 'San Francisco, CA', 'London, UK', 'Berlin, DE', 'Toronto, ON'];

    for (let i = 0; i < NUM_JOBS; i++) {
      const employer = randomChoice(employers);
  const title = faker.person.jobTitle();
      const company = employer.name;
      const location = randomChoice(sampleLocations);
      const type = randomChoice(sampleTypes);
  const salary = `$${faker.number.int({ min: 40000, max: 150000 })}`;
  const description = faker.lorem.paragraphs(2);
  const requirements = [faker.hacker.noun(), faker.hacker.verb(), '3+ years experience'];

      const job = await Job.create({ title, company, location, type, salary, description, requirements, employer: employer._id });
      jobs.push(job);
    }

    // create applications
    for (let i = 0; i < NUM_APPLICATIONS; i++) {
      const job = randomChoice(jobs);
      const applicant = randomChoice(applicants);
      const existing = await Application.findOne({ job: job._id, applicant: applicant._id });
      if (existing) continue;
      const coverLetter = faker.lorem.sentences(2);
      const status = randomChoice(['applied', 'reviewing', 'selected', 'rejected']);
      await Application.create({ job: job._id, applicant: applicant._id, resumeUrl: '', coverLetter, status });
    }

    console.log('Bulk seeding completed');
    process.exit(0);
  } catch (err) {
    console.error('Bulk seeding error', err);
    process.exit(1);
  }
};

seed();
