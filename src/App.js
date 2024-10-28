import { useState, createContext, useContext } from 'react';

const ToDoContext = createContext();

const ToDoProvider = ({children}) => {
  
  const [task, setTask] = useState([{id : 1, title: 'This your first todo list', complete : true }]);
  const addNewTask = (title) => {
    
    setTask([...task, { id : task.length + 1 , title ,  complete : false }])
  } 
  const completeTask = (object) => {
    let list = [...task];
    list.map(item => {
      if(item.id === object.id)
      item.complete = true;
      return item;
    });
    setTask(list);
  } 
  return (
    <ToDoContext.Provider value={{addNewTask, completeTask, task}}>
      {children}
    </ToDoContext.Provider>
  )
}

const ToDoForm = () => {
  const { addNewTask } = useContext(ToDoContext);
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const submit = (e) => {
    e.preventDefault();
    if(!title || !date) {
      return;
    }
    addNewTask(title);
  }
  return (
    <form onSubmit={submit}>
      <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title}/>
      <input type="datetime-local" onChange={(e)=>setDate(e.target.value)} value={date}/>
      <button type='submit'>Add New Task</button>
    </form>
  
  )
}

const ToDoList = () =>{
  const { task, completeTask } = useContext(ToDoContext);
  return (
    <ul>
      { task.map((item) => {
        return <li key={item.id.toString()} style={{textDecoration : item.complete ? 'line-through' : 'none'}} >{item.title} <button style={{visibility : item.complete ? 'hidden' : 'visible'}} onClick={() => {completeTask(item)}} >Complete</button></li>
      })
      }
    </ul>
  )
}

function App() {
  return (
        <ToDoProvider>
          <ToDoForm/>
          <ToDoList/>
        </ToDoProvider>
  );
}

export default App;
