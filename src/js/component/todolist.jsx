import React, { useEffect, useState } from "react";

const TodoList = ()=> {

    const [todo, setToDo] = useState({});
    const [todoList, setToDoList] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(()=> {
        getTodos()
    },[])

    // function to add a username
    const createUsername = () => {
        fetch ("https://assets.breatheco.de/apis/fake/todos/user"+username, {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify([]),
        }).then((response) => response.json())
        .then(responseAsJson => {
            console.log(responseAsJson);
            getTodos();
        }).catch((error)=> {
            console.log(error);
        });
    }

    // function to acquire todos
    const getTodos = () => {
        if(username !==""){
            fetch("https://assets.breatheco.de/apis/fake/todos/user"+username, {
                method: 'GET',
                headers: {'Content-type':'application/json'},
            }).then((response) => response.json())
            .then(responseAsJson => {
                console.log(responseAsJson);
                setToDo(responseAsJson);
            }).catch((error)=> {
                console.log(error);
            });
        }
    }

    // function to update todos
    const updateTask = () => {
        const todos = [...todoList, todo]
        setToDoList(todos)
       
        fetch ("https://assets.breatheco.de/apis/fake/todos/user"+username, {
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify([todos]),
        }).then((response) => response.json())
        .then(responseAsJson => {
            console.log(responseAsJson);
        }).catch((error)=> {
            console.log(error);
        });
    }

    // function to delete a task
    const handleDelete = (deleteItem) => {
		
		const newTask = todoList.filter((todoItem) => todoItem !== deleteItem);
		setToDoList(newTask);
	}
  
    return (
        <div className="container">	
            <h2>todos</h2>
            <div className="user">
                <input type="text"
                    value={username}
                    onChange={(e) => {
                    setUsername(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if(e.key === "Enter"){
                             createUsername();
                        }
                    }}
                    placeholder="Insert your name..."
                    />	
            </div>
            
            <div className="notepad">				
                <div className="inputArea">
                    <input type="text"
                        value={todo.label}
                        onChange={(e) => 
                        setToDo({label: e.target.value, done: false})}
                        onKeyDown={(e) => {
                            if(e.key === "Enter"){
                                 updateTask();
                                 setToDo("");
                            }
                        }}
                        placeholder="What needs to be done?"/>		
                </div>
            <div className="text-center">
                <ul className="listItems">
                    {todoList.length !== 0 &&
                    todoList.map((todoItem) => (
                    <li key={todoItem}>
                    <div className="listItemContainer">
                        <span className="todoItem">{todoItem.label}</span>
                        <i className="fas fa-times" onClick={() => handleDelete(todoItem)}></i>   						
                    </div>
                    </li>
                    ))}
                </ul>
            </div>

            <div className="bottom">
                    <p className="mb-0 mt-0"> {todoList.length>0 ? todoList.length: ""} item left</p>
            </div>	
            </div>
            <div className="sheet1"></div>
            <div className="sheet2"></div>
        </div>	
    )
}

export default TodoList;





