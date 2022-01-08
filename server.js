const app = require('./app');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at port:${PORT}`);
});