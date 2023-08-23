import React from 'react'


import { useState } from 'react';
import {app} from './firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


import { useNavigate } from 'react-router-dom';


export default function CompanyLogin() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    function emailChanged(event:any) {
        setEmail(event.target.value);
    }

    function passwordChanged(event:any) {
        setPassword(event.target.value);
    }

    function handleSubmit(event:any) {

        
        event.preventDefault();



        const allowedDomain = 'xyzcompany.com';
        if (!email.endsWith(`@${allowedDomain}`)) {
            alert('Only company email addresses are allowed.');
            return;
        }

        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              
                const user = userCredential.user;

                
                alert("Login Successful !!!");

                
                 navigate(  `/CompanyDashboard/${user.email}`);
               
                
          
            })
            .catch((error) => {
                alert("Login Failed !!!");
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }



    function handleBack(){

        navigate('/');

    }


    



    return (
        <div>



            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header text-center mt-auto">
                               <b> Company Login</b>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input type="text" className="form-control" id="username" name="username" required  onChange={emailChanged} value={email}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" name="password" required  onChange={passwordChanged} value={password}/>
                                    </div>
                                    <div className='text-center mt-auto'>
                                    <button type="submit" className="btn btn-dark w-100" onClick={handleSubmit}>Login</button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer text-muted">
                            <button type="submit" className="btn btn-dark w-100" onClick={handleBack}>Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>







        </div>
    )
}
