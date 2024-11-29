require('dotenv').config(); 
const mongoose = require('mongoose');

const cleanDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://saiharshithapgr:0GYpbRn2B0jVMxEG@cluster0.intltpg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        //remove old data with null email or invalid indexes
        const result = await mongoose.connection.collection('users').deleteMany({ email: { $exists: false } });
        console.log(`Cleaned up ${result.deletedCount} invalid user records.`);

        const indexes = await mongoose.connection.collection('users').indexes();
        console.log('Current Indexes:', indexes);

        await mongoose.connection.collection('users').dropIndex('email_1').catch(() => {
            console.log('email_1 index does not exist or already dropped.');
        });

        console.log('Database cleanup completed.');
    } catch (err) {
        console.error('Error during database cleanup:', err.message);
    } finally {
        mongoose.disconnect();
    }
};

cleanDatabase();
