const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);

app.get('/', (req, res) => res.send('SocialConnect API is running.'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
