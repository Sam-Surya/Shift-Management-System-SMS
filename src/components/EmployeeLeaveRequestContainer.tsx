import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';








export default function EmployeeLeaveRequestContainer() {

  const { username } = useParams();
    
    const navigate = useNavigate();

  function handleBack(){

    navigate(`/EmployeeDashboard/${username}`);

}

function handleLogout(){

  navigate('/Login');

}

function handlePrevLeave(){

  navigate(`/EmployeeViewPreviousLeaveRequest/${username}`);

}




function handleApplyLeave(){

  navigate(`/EmployeeApplyLeave/${username}`);

}



  return (
    <div>


      <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                        
                            <button className="btn btn-dark my-3 mx-3" type="button" onClick={handlePrevLeave}>View Previous Leave Request Status</button>
                            <button className="btn btn-dark my-3 mx-3" type="button" onClick={handleApplyLeave}>Apply Fresh Leave Request</button>
                            <button className="btn btn-dark my-3 mx-3" type="button" onClick={handleBack}>Back</button>
                            <button className="btn btn-dark my-3 mx-3" type="button" onClick={handleLogout}>Logout</button>
                        </div> 
                  </div>
            </div>

            </div>













    </div>
  )
}
