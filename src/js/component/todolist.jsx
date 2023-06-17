import React, { useEffect, useState } from "react";

const TodoList = ()=> {

    const [todo, setTodo] = useState({});
    const [todoList, setTodoList] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(()=> {
        getTodos()
    },[])

    // function to add a username
    const createUsername = () => {
        if(username!==""){
           
            fetch ("https://assets.breatheco.de/apis/fake/todos/user/" + username, {
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify([]),
            })
            .then((response) => response.json())
            .then(responseAsJson => {
                console.log(responseAsJson);
                getTodos();
            }).catch((error)=> {
                console.log(error);
            });
        }  
        else {
            alert("Please insert a username!");
        }
    }

    // function to acquire todos
    const getTodos = () => {
        if(username !==""){
            fetch("https://assets.breatheco.de/apis/fake/todos/user/" + username, {
                method: 'GET',
                headers: {'Content-type':'application/json'},
            })
            .then((response) => response.json())
            .then(responseAsJson => {
               
                setTodoList(responseAsJson);
            })
            .catch((error)=> {
                console.log(error);
            });
        }
    }

    // function to update todos
    const updateTask = () => {
        const todos = [...todoList, todo]
        setTodoList(todos)

       /*try { 
            const response= await fetch ("https://assets.breatheco.de/apis/fake/todos/user/"+username, {
                method: 'PUT',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(todos),
            })
            console.log(response)
            const data = await response.json();
            console.log(data)
        } catch {
            console.error("error on create user", error)
        }*/
       
        fetch ("https://assets.breatheco.de/apis/fake/todos/user/"+username, {
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(todos),
        })
        .then((response) => response.json())
           
        .then(responseAsJson => {
            console.log(responseAsJson);
        }).catch((error)=> {
            console.log(error);
        });
    }
   
 
    const deleteTask = (deleteItem) => {

        const newTask = todoList.filter((todoItem) => todoItem.label !== deleteItem.label);
		setTodoList(newTask);

        fetch ("https://assets.breatheco.de/apis/fake/todos/user/"+username, {
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(newTask),
        })
        .then((response) => response.json())
        .then(responseAsJson => {
            console.log(responseAsJson);
        }).catch((error)=> {
            console.log(error);
        });

    }
     
    return (
        <div className="container">	
            <h2>todos</h2>
            <div className="user">
                <input 
                    type="text"
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
                    <input
                        type="text"
                        value={todo.label}
                        onChange={(e) => 
                        setTodo({label: e.target.value, done: false})}
                        onKeyDown={(e) => {
                            if(e.key === "Enter"){
                                 updateTask();
                                 setTodo({label:"", done: false});
                            }
                        }}
                        placeholder="What needs to be done?"
                    />		
                </div>
            <div className="text-center">
                <ul className="listItems">
                    {todoList.length >= 0 &&
                    todoList.map((todoItem) => (
                    <li key={todoItem}>
                    <div className="listItemContainer">
                        <span className="todoItem">{todoItem.label}</span>
                        <i className="fas fa-times" onClick={() => {deleteTask(todoItem)}}></i>   						
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





