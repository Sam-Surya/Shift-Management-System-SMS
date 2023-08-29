import { useState } from 'react';

import Swal from 'sweetalert2'

import { app } from './firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


import { useNavigate } from 'react-router-dom';


export default function CompanyLogin() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const navigate = useNavigate();


    function emailChanged(event: any) {
        setEmail(event.target.value);
    }

    function passwordChanged(event: any) {
        setPassword(event.target.value);
    }


    function handleBack() {

        navigate('/');

    }


    function handleSubmit(event: any) {


        event.preventDefault();


        const allowedDomain = 'xyzcompany.com';
        if (!email.endsWith(`@${allowedDomain}`)) {
            //alert('Only company email addresses are allowed.');

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Only company email addresses are allowed',
                confirmButtonColor:'black',
             
              })

            return;
        }

        const auth = getAuth(app);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;

               

                

                navigate(`/CompanyDashboard/${user.email}`);



            })
            .catch((error) => {
               // alert("Login Failed !!!");

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Login Failed !!!',
                    confirmButtonColor:'black',
                 
                  })


                
            });
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
                                <form   onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input type="text" className="form-control" id="username" name="username"  onChange={emailChanged} required value={email} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" name="password" onChange={passwordChanged} required  value={password} />
                                    </div>
                                    <div className='text-center mt-auto'>
                                        <button type="submit" className="btn btn-dark w-100" >Login</button>
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
