import React from 'react'
import { useParams ,useNavigate} from 'react-router-dom';


export default function EmployeeShiftChangeContainer() {

  const { username } = useParams();
  const navigate = useNavigate();



  function handleLogout(){

    navigate('/Login');

}

function handleBack(){

  navigate(`/EmployeeDashboard/${username}`);

}


function handleViewShiftChange(){

  navigate(`/EmployeeViewPreviousShiftChangeRequest/${username}`);

}

function handleFresh(){

  navigate(`/EmployeeShiftChangeRequest/${username}`);

}



  return (
    <div>


      <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <button className="btn btn-dark my-3 mx-3" type="button" onClick={handleViewShiftChange}>View Shift Change Requests</button>
                            <button className="btn btn-dark my-3 mx-3" type="button"onClick={handleFresh}>Apply Fresh Shift Change Request</button>
                            <button className="btn btn-dark my-3 mx-3" type="button" onClick={handleBack}>Back</button>
                            <button className="btn btn-dark my-3 mx-3" type="button"  onClick={handleLogout}>Logout</button>
                        </div> 
                  </div>
            </div>

            </div>













    </div>
  )
}
