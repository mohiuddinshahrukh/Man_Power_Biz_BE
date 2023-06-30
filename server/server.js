const mongoose = require("mongoose");
const app = require("./index");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`DB Connected ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};
connectDB();
app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
// export default server;
