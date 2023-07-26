import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './register.css';

export default function Register({id}) {
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password1,setPassword1] = useState('');
    const [password2,setPassword2] = useState('');
    const [isShowed,setIsShowed] = useState(false);
    function handleSubmit(event){
        event.preventDefault();
        if(password1 === password2 && email!==''){
            fetch('http://localhost:5050/register', {
            method: 'post',
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              email: email,
              password: password1
            })
          }).then((response) => {
            console.log(response);
            if(response.headers.get('content-type') === 'text/html; charset=utf-8'){
               
                return response.text();
            }else{
                return response.json();
            }
            
          }).then((data) => {
            
            if (typeof(data)=== 'object') {
              //redirect to todo page with user data(todos)
              navigate(`/${id}/todo`,{todos:[]});
            } else {
              // tell user to entered email is invalid and stay on the same page
              alert('entered email is not valid');
         
            }
            console.log(data)
          }).catch((error) => console.log(error));
        }
        else if(password1!== password2){
            //ask user to re enter password correctly
            alert('re enter password correctly');
        }else if(email=== ''){
            alert('enter email');
        }
        
    }

    return (
        <div className="reg">
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
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        re enter password:
                        <input type={isShowed?"text":"password"}
                                value={password2}
                                onChange={(e)=>setPassword2(e.target.value)} />
                          <button type="button"onClick={()=>setIsShowed(!isShowed)}>{isShowed?"hide password":"show password"}</button>      
                    </label>
                </div>
                <div>
                    <button type="submit">register</button>
                </div>
            </form>
            
            <p>have an account <a href='http://localhost:3000/'>login</a></p>
        </div>
    )
}