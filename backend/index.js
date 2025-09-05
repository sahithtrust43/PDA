const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
// It will automatically use Application Default Credentials
admin.initializeApp();

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: 'Email and password are required' });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });
    res.status(201).send({ message: `Successfully created new user: ${userRecord.uid}` });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Note: Login is handled client-side with the Firebase SDK.
// The backend's role is typically to verify ID tokens, not to handle logins.

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
