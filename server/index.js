const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    // const paymentCheck = database.collection("paymentCollection");

    // ----------Schedule

    cron.schedule('* * * * *', async () => {
      // console.log('running a task every day');
      const result = await allmembers.find().toArray();

      for (const booking of result) {

        const targetDate = new Date(booking.bookingDate)
        const today = new Date()

        // console.log('Booking Date:', targetDate);
        // console.log('Today:', today);

        targetDate.setMonth(targetDate.getMonth() + 1);
        if (today >= targetDate) {
          const updateStaus = {
            $set: {
              status: 'time to pay'
            },
          };
          // console.log(updateStaus)
          const updatedResult = await allmembers.updateOne({ _id: new ObjectId(booking._id) }, updateStaus);
          // const userExist = await paymentCheck.findOne({ memberId: booking._id });
          // if (userExist) {
          //   // console.log('already exist')
          // }
          // else {
          //   const newPay = {
          //     memberId: booking._id,
          //     phoneNumber: booking.phoneNumber,
          //     status: 'due'
          //   }
          //   await paymentCheck.insertOne(newPay);
          //   // console.log(newPay)
          // }
          // console.log(updatedResult)
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

    app.patch('/members/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const body = req.body

      if (body.clearMonth) {
        const getMember = await allmembers.findOne(query);
        console.log('due month:', getMember.dueMonth)
        console.log('clear month:', body.clearMonth)
        console.log(updatedDueMonth)
        const updateStatus = {
          $set: {
            status: "running",
            dueStatus: 'no due',
            bookingDate: body.bookingDate.split('T')[0],
            dueMonth: getMember.dueMonth - body.clearMonth
          },
        };
     
        const result = await allmembers.updateOne(query, updateStatus);
      res.send(result)
      }
      else {
        const getMember = await allmembers.findOne(query);
        console.log('due month:', getMember.dueMonth)

        const updateStatus = {
          $set: {
            status: "running",
            dueStatus: 'no due',
            bookingDate: body.bookingDate.split('T')[0],
          },
        };
        const result = await allmembers.updateOne(query, updateStatus);
        res.send(result)
      }

      // const updateStaus = {
      //   $set: {
      //     status:"running",
      //     dueStatus:'no due',
      //     bookingDate: body.bookingDate.split('T')[0]
      //   },
      // };
      // console.log(updateStaus)
      // const result = await allmembers.updateOne(query, updateStaus);
      // res.send(result)
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