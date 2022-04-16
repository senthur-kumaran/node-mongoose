require('dotenv').config();

const { connect, STATES, connection, disconnect } = require('mongoose');
const { User } = require('./repository');

(async () => {
  if ([STATES.connected, STATES.connecting].includes(connection.readyState)) {
    console.log('Already connected!');
    return;
  }

  try {
    await connect(process.env.DB_URL);
    console.log('MongoDB connected successfully!');

    const user = new User({
      name: 'Kumaran',
      email: 'kumaran@gmail.com',
      age: 27
    });

    await user.save();
    console.log('User created successfully!');

  } catch (error) {
    console.log('Something went wrong: ', error);
    await disconnect();
  }
})();