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

    // ----------Schedule

    cron.schedule('* * * * *', async () => {
      console.log('running a task every day');
      const result = await allmembers.find().toArray();

      for (const booking of result) {
        const query = { _id: new ObjectId(booking._id) }

        if (booking.leavingDate != null) {
          const leavingDate = new Date(booking.leavingDate)
          const today = new Date()
          if (today >= leavingDate && booking.checkoutDone == 'null') {

            if (booking.dueMonth == 0) {
              const remainingAmount = booking.advanceAmount - booking.monthlyPayment
              const updateAdvance = {
                $set: {
                  // advanceAmount: remainingAmount,
                  returnableAmount: remainingAmount,
                  checkoutDone: 'clear'
                },
              };
              await allmembers.updateOne(query, updateAdvance);
            }
            else {
              const remainingAmount = booking.advanceAmount - (parseInt(booking.monthlyPayment) + (booking.dueMonth * parseInt(booking.monthlyPayment)))
              const updateAdvance = {
                $set: {
                  dueMonth: 0,
                  checkoutDone: 'clear',
                  returnableAmount: remainingAmount,
                  // advanceAmount: remainingAmount
                },
              };
              await allmembers.updateOne(query, updateAdvance);
            }
          }

        }

        const targetDate = new Date(booking.bookingDate)
        const today = new Date()
        targetDate.setMonth(targetDate.getMonth() + 1);
        if (today >= targetDate) {
          const updateStaus = {
            $set: {
              status: 'time to pay'
            },
          };

          await allmembers.updateOne(query, updateStaus);
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

    app.get('/members/:id', async (req, res) => {
      const id = req.params.id
      console.log('getting from 108',id)
      const query = { _id: new ObjectId(id) }
      const result = await allmembers.findOne(query);
      res.send(result)
    })

    app.patch('/members/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const body = req.body
      const getMember = await allmembers.findOne(query);

      if (body.clearMonth || body.updatedDueMonth) {

        let updateStatus = {
          $set: {
            status: "running",
            bookingDate: body.bookingDate.split('T')[0],
          },
        };

        if (body.clearMonth) {
          updateStatus.$set.dueMonth = getMember.dueMonth - body.clearMonth
        }
        if (body.updatedDueMonth) {
          updateStatus.$set.dueMonth = body.updatedDueMonth;
        }
        const result = await allmembers.updateOne(query, updateStatus);
        res.send(result)

      }


      else {
        const updateLeavingDate = {
          $set: {
            leavingDate: body.leavingDate,
            checkoutDone: null
          },
        };
        const result = await allmembers.updateOne(query, updateLeavingDate);
        res.send(result)
      }

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