require("dotenv").config();
const express = require("express");
require("./dbconnect/db");
const cors = require("cors");
const Reminder = require("./dbModual/schema");
const PORT = process.env.PORT;
const AT = process.env.AUTH_TOKEN;
const SID = process.env.AC_SID;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//API
app.get("/getReminder", (req, res) => {
  Reminder.find({})
    .then((reminderList) => {
      console.log(reminderList);
      res.send(reminderList);
    })
    .catch((e) => console.log(e));
});

app.post("/addReminder", (req, res) => {
  const { reminderMsg, reminderAt,number } = req.body;
  const reminder = new Reminder({
    reminderMsg,
    reminderAt,
    isReminder: false,
    number
  });
  reminder.save();

  Reminder.find({})
    .then((reminderList) => {
      // console.log(reminderList);
      res.send(reminderList);
    })
    .catch((e) => console.log(e));
});

setInterval(() => {
  Reminder.find({}).then((data) => {
    if (data) {
      data.forEach((data) => {
        if (!data.isReminder) {
          const now = new Date();
          const o = new Date(data.reminderAt);
          const result = o-now;
          console.log(result);
          console.log(data._id);
       
          if (result <= 0) {
            console.log("time ho gaya ");
            Reminder.findByIdAndUpdate(data._id, { isReminder: true }).then(()=>console.log("every thing okk"+data.number)).catch((e)=>console.log("some error  "+e))
            // console.log("mmmmmmggg  "+Reminder.isReminder);
            // console.log("mmmmmmggg  "+Reminder);
            // message
            const accountSid = SID;
            const authToken = AT;
            const client = require("twilio")(accountSid, authToken);

            client.messages
              .create({
                body: data.reminderMsg,
                from: "+12565300747",
                to: data.number,
              })
              .then((message) => console.log(message.sid + Reminder.reminderMsg));
          } else {
            console.log("time nahi hua");
            console.log(!data.isReminder);
          }
        }
      });
    }
  });
}, 60 * 1000);

app.post("/delete", (req, res) => {
  Reminder.deleteOne({ _id: req.body.id })
    .then((reminderList) => {
      Reminder.find({});
      console.log(reminderList);
      res.send(reminderList);
    })
    .catch((e) => console.log(e));
});

app.listen(PORT, () => {
  console.log("app is running");
});

