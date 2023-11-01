import React, {useState,useEffect} from 'react'
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import  './myStyle.css';

function MyReminder() {
    const [reminderMsg, setReminderMsg] = useState("")
    const [reminderAt, setreminderAt] = useState()
    const [reminderList, setreminderList]= useState([])  
    const [number, setNumber] = useState("")

    useEffect(() => {
     axios.get("http://localhost:9000/getReminder").then(res=> setreminderList(res.data))
    }, [])
    
    const addTime =()=>{
    axios.post("http://localhost:9000/addReminder", {reminderMsg,reminderAt,number})
    .then(res=>setreminderList(res.data))
    setReminderMsg("")
    setreminderAt()
    setNumber("")
    }
    const deleteReminder=(id)=>{
      axios.post("http://localhost:9000/delete", {id})
      .then(res=> setreminderList(reminderList.filter((ele) => ele._id !== id)))
    }
  return (
    <>
    <div className="App" >
      <div className="homepage">
        <div className="home_header">
          <div className="number">
           <label htmlFor="number">Enter number to get message : </label>
           <input type="number" value={number}  onChange={e=>setNumber(e.target.value)}/>
          </div>
         <h1>Set</h1>
         <textarea type="text"  rows={4} cols={50} placeholder='set somthing' value={reminderMsg} 
         onChange={e=>setReminderMsg(e.target.value)} />
         <DateTimePicker
         value={reminderAt}
         onChange={setreminderAt} minDate={new Date()} className="custom-datetime-picker" dayPlaceholder='Date' hourPlaceholder='hours' monthPlaceholder='month' minutePlaceholder='minute' yearPlaceholder='Year'></DateTimePicker>
         <button className="button-add" onClick={addTime} >add time</button>
        </div>

        <div className="page_body">
          {
             reminderList.map((ele) =>{ 
              return <>
              <div className="reminder_card" key={ele._id}>
              <h2>{ele.reminderMsg}</h2>
              <h3>Reminde me at:</h3>
              <p>{String(new Date(ele.reminderAt).toLocaleString(undefined,{timezone:"Asia/Kolkata"}))}</p>
              <button className="button" onClick={()=>deleteReminder(ele._id)}>Delete note</button>
            </div>
            </>
            })
          }
  
        </div>
      </div>
    </div> 
    </>
  )
}

export default MyReminder
