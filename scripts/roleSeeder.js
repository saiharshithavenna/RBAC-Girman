const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Role = require('../models/Role');

require('dotenv').config();

const seedRoles = async () => {
  const roles = [
    { name: 'Admin', permissions: ['create', 'read', 'update', 'delete'] },
    { name: 'User', permissions: ['read'] },
    { name: 'Moderator', permissions: ['read', 'update'] }
  ];

  try {
    await mongoose.connect('mongodb+srv://saiharshithapgr:0GYpbRn2B0jVMxEG@cluster0.intltpg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    for (const role of roles) {
      const existingRole = await Role.findOne({ name: role.name });
      if (!existingRole) {
        await Role.create(role);
        console.log(`Role "${role.name}" created`);
      } else {
        console.log(`Role "${role.name}" already exists`);
      }
    }

    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error seeding roles:', err);
  }
};

seedRoles();
