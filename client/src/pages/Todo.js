import './todos.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Todo(){
    const location = useLocation();
    const [todo,setTodo] = useState('');
    
    function handleSave(){
        fetch('http://localhost:5050/saveTodo',{
            method:'POST',
            headers:{ 
                "content-type" : "application/json"
            },
            body: JSON.stringify({
              email: location.state.email,
              todo: todo,
              
            })
        }).then((response)=>{

        })
    }
    return (
        <div className='todos'>
            <div>
                <h1>todos</h1>
                <label >
                <input onChange={(e)=>{setTodo(e.target.value)}} type="text" placeholder='enter your todo' />
                <button type='button' onClick={handleSave}>save</button>
                </label>
                <ul>
                    {location.state.todos.map((todo)=><li><h3>{todo}</h3><button>done</button><button>delete</button></li>)}
                </ul>
            </div>
            <div>
               
            </div>
        </div>
    )
}