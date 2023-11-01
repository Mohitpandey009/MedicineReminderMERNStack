const mongoose = require("mongoose");
const reminderSchema = new mongoose.Schema({
    reminderMsg:String ,
    reminderAt:String,
    isReminder:{
        type: Boolean,
        default: false
    },
    number:String
})

const Reminder = new mongoose.model("reminder",reminderSchema)

module.exports = Reminder;