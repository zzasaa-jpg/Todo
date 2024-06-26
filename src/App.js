import { useEffect, useState } from 'react';
import './App.css';

function App() {
  let [todolist, setTodolist] = useState([])
  let [dark, setDark] = useState(false)

  let savetodolidt = (event) => {
    event.preventDefault();
    let todoname = event.target.todo.value;

    if (!todolist.includes(todoname)) {
      let finaltodolist = [...todolist, todoname];
      setTodolist(finaltodolist)
      localStorage.setItem("todo", JSON.stringify(finaltodolist))
      event.target.reset()
    } else {
      alert("todo exist")
    }

  }

  let list = todolist.map((value, index) => {
    return (
      <TodoListItems value={value} key={index} indexNumber={index} todolist={todolist} setTodolist={setTodolist} />
    )
  })

  let handleclick = () => {
    setTodolist([])
    localStorage.removeItem('todo');
  }

  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem('todo'));
    if (todos) {
      setTodolist(todos)
    }
  }, [])

  let darkMode = () => {
    setDark(!dark)
    if (!dark) {
      localStorage.setItem("darkmode", dark);
    }else{
      localStorage.removeItem("darkmode");
    }
  }

  useEffect(()=>{
    let darkmode = localStorage.getItem("darkmode");
    if (darkmode){
      setDark(true)
    }
  },[])

  return (
    <div className={dark ? "dark" : "lop"}>
      <nav className='nav'>
        <h1 id='title'>Todays Todo</h1>
        <form id='form' onSubmit={savetodolidt}>
          <input id='input' name="todo" type="text" />
          <button id='Add'><ion-icon name="pencil-outline"></ion-icon></button>
        </form>
        <button id='darkbtn' onClick={darkMode}>
          {
            dark ? <ion-icon name="sunny-outline"></ion-icon> : <ion-icon name="moon-outline"></ion-icon>
          }
        </button>
      </nav>
      <hr id='hr' />
      <ul>
        {list}
      </ul>
      {
        todolist.length === 0 && <h1 id='no-todo-info' >No Todos, Add Todo!!!</h1>
      }
      {
        todolist.length > 0 && <button className='alltodoDelet' onClick={handleclick}>All Todo<ion-icon name="trash-outline"></ion-icon></button>
      }
    </div>
  );
}

export default App;

function TodoListItems({ value, indexNumber, todolist, setTodolist }) {
  let [status, setStatus] = useState(false)

  let delet = () => {
    let finaldata = todolist.filter((v, i) => i !== indexNumber)
    setTodolist(finaldata)
    localStorage.setItem("todo", JSON.stringify(finaldata))
  }
  let checkStatus = () => {
    setStatus(!status)
  }

  return (
    <div className='todo-container'>
      <li className={(status) ? 'com' : ""}>{indexNumber + 1}. {value}</li>
      <div className='btns'>
        <button className='linebtn' onClick={checkStatus}>Line Throw</button>
        <button className='deletbtn' onClick={delet}><ion-icon name="trash-outline"></ion-icon></button>
      </div>
    </div>
  )
}