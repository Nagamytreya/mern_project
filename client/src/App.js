import React,{useEffect,useState} from 'react';
import axios from 'axios';
const App = () => {
  const[items,setItem]=useState([]);
  const [newtask,setNewtask]=useState('');
  useEffect(() => {
    axios.get('http://localhost:5000/gettask').then(
      arr=>setItem(arr.data)
    )
  },[])
  const submitHandler=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:5000/addtask',{todo:newtask}).then(arr=>setItem(arr.data));
  }
  const deleteHandler=(id)=>{
    axios.delete(`http://localhost:5000/delete/${id}`).then(arr=>setItem(arr.data));
  }
  return (
    <div>
      <center>
        <form onSubmit={submitHandler}>
          <input type="text"  value={newtask} onChange={(e)=>setNewtask(e.target.value)}/>
          <input type="submit" value="submit" />  
        </form>
        {items.map(
          task=>
          <div key={task._id}>
            <h1>{task.todo}</h1>
            <h1><button onClick={()=>deleteHandler(task._id)}>Delete</button></h1>
          </div>
        )}
      </center>
    </div>
  )
}
export default App