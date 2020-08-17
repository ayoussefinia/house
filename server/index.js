import express from 'express';
import bodyParser from 'body-parser';
import expressGraphQL from 'express-graphql';
import cors from 'cors';
import mongoose from 'mongoose';
require('dotenv').config();
const app = express();
app.use(
  cors(),
  bodyParser.json()
)
app.use(
  "/graphql",
  expressGraphQL({
  schema: {},
  rootValue: {},
  graphiql: true
  })
);


function main() {
  const port = process.env.PORT || 5000;
  const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds013901.mlab.com:13901/house_app`;
  mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => {
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  })
  .catch(err => {
    console.log(err);
  })
}
main();