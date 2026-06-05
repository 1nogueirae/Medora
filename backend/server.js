const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.BACKEND_PORT || 3000;

const router = express.Router();
const loginRouter = require('./src/routes/api/auth/login.route');
const registerRouter = require('./src/routes/api/auth/register.route');

app.use(cors());
app.use(express.json());

app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Hello, i am Medora\'s backend!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})