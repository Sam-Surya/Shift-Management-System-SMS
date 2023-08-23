import React from 'react'


import { useNavigate } from 'react-router-dom';

export default function MainPage() {


    const navigate = useNavigate();


    function  employeeLoginHandler(){

        navigate('/Login')
    }

    function  companyLoginHandler(){

        navigate('/CompanyLogin')
    }



    return (
        <div>



            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                        <div className="card-header text-center mt-auto">
                               <b> Welcome to Shift Management Portal</b> 
                        </div>
                            <button className="btn btn-dark my-4 mx-3" type="button" onClick={employeeLoginHandler}>Employee Login</button>
                            <button className="btn btn-dark  mx-3" type="button" onClick={companyLoginHandler}>Company Login</button>
                        
                            <br></br>
                            <br></br>
                           
                        </div> 
                        
                        
                    </div>
                  
                </div>
             </div>







        </div>
    )
}
