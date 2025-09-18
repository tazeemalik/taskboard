import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/tasksdb';
const DB_NAME = (new URL(MONGO_URL)).pathname.replace('/','') || 'tasksdb';

let tasks;

app.get('/api/health', (_, res) => res.json({ ok: true }));

app.get('/api/stats', async (_, res) => {
  const total = await tasks.countDocuments({});
  const done  = await tasks.countDocuments({ done: true });
  const pending = total - done;
  res.json({ total, done, pending });
});

(async () => {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  const db = client.db(DB_NAME);
  tasks = db.collection('tasks');
  app.listen(PORT, () => console.log(`stats-api listening on :${PORT}`));
})();
