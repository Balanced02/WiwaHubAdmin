import app from "./app";

const 
  PORT = process.env.PORT || 1337;
app.listen(PORT, () =>
  console.log(`WiwaHub Server Listening on port ${PORT} in ${PORT} mode`)
); // eslint-disable-line no-console