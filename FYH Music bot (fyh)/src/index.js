import { ClusterManager } from "discord-hybrid-sharding";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Your existing ClusterManager code...
const manager = new ClusterManager(`./src/cold.js`, {
  totalShards: "auto",
  shardsPerClusters: 2,
  totalClusters: "auto",
  mode: 'process',
  token: process.env.TOKEN, // Use process.env.TOKEN directly
});
manager.on('clusterCreate', cluster => console.log(`Launched Cluster ${cluster.id}`));
manager.spawn({ timeout: -1 });

// Simple web server to keep the process alive
app.get('/', (req, res) => {
  const message = `
─── ⋆⋅☆⋅⋆ ───── ⋆⋅☆⋅⋆ ───── ⋆⋅☆⋅⋆ ───── ⋆⋅☆⋅⋆ ───
Made By - FYH Community
Tutorial - [https://www.youtube.com/watch?v=7zJKhoVwkFY](https://www.youtube.com/watch?v=7zJKhoVwkFY)
Discord - [https://discord.gg/nus9dJpn6c](https://discord.gg/nus9dJpn6c)
─── ⋆⋅☆⋅⋆ ───── ⋆⋅☆⋅⋆ ───── ⋆⋅☆⋅⋆ ───── ⋆⋅☆⋅⋆ ───
  `;
  res.send(message);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
