import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login({id}) {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isShowed,setIsShowed] = useState(false);

  function handleSubmit(event) {

    event.preventDefault();
    fetch('http://localhost:5050/input', {
      method: 'post',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then((response) => {
      if(response.headers.get('content-type')==="application/json; charset=utf-8"){
        return response.json()

      }else{
        return response.text();
      }
      
    }).then((data) => {
      if (typeof(data) === 'object'){
        navigate(`/${id}/todo`,{state:{todos:data,email:email}});
        //redirect to todo page with user data(todos) only when password is matched with database password
      } else {
        // tell user to entered email is invalid and stay on the same page
        alert('entered email is not registered');
      }
      console.log(data)
    }).catch((error) => console.log(error));
  }


  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password:
            <input
              type={isShowed?"text":"password"}             
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button"onClick={()=>setIsShowed(!isShowed)}>{isShowed?"hide password":"show password"}</button>      
          </label>
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
      <p>Don't have an account <a href='http://localhost:3000/register'>register</a></p>
    </div>
  )
}