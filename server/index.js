const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cron = require('node-cron');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u1d2enw.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {

  try {
    const database = client.db("HostelDB");
    const allmembers = database.collection("membersCollection");
    const paymentCheck = database.collection("paymentCollection");

    // ----------Schedule


    cron.schedule('* * * * *', async () => {
      // console.log('running a task every day');
      const result = await allmembers.find().toArray();

      for (const booking of result) {
        const targetDate = new Date(booking.bookingDate)
        const today = new Date()

        targetDate.setMonth(targetDate.getMonth() + 1);


        if (
          today >= targetDate
        ) {
          const userExist = await paymentCheck.findOne({ memberId: booking._id });
          if (userExist) {
            // console.log('already exist')
          }
          else {
            const newPay = {
              memberId: booking._id,
              phoneNumber: booking.phoneNumber,
              status: 'due'
            }
            await paymentCheck.insertOne(newPay);
            // console.log(newPay)
          }
        }
      }
    });


    // -------------- post 

    app.post('/members', async (req, res) => {
      const member = req.body;
      const query = { phoneNumber: member.phoneNumber }
      const findMember = await allmembers.findOne(query);
      if (findMember) {

        res.send({ message: 'This girl is already admitted' })
      }
      else {
        const result = await allmembers.insertOne(member);
        res.send(result)
      }
    })


    app.get('/members', async (req, res) => {
      const result = await allmembers.find().toArray();
      res.send(result)
    })

    app.get('/paymentCheck', async (req, res) => {
      const result = await paymentCheck.find().toArray();
      res.send(result)
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})