import React,{useState} from 'react';
import Login from './pages/login';
import Register from './pages/register';
import Todo from './pages/Todo';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';

function App() {
const [id,setId] = useState(Math.floor((Math.random()*10000)+1));

 
return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login  id={id}/>}/>
        <Route path='/register' element={<Register  id={id}/>}/>
        <Route path={`${id}/todo`} element={<Todo />} />
      </Routes>
    </Router>
)
}

export default App;
