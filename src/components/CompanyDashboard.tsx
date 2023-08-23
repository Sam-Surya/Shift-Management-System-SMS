import React from 'react'
import { useParams ,useNavigate} from 'react-router-dom';
export default function CompanyDashboard() {

    const navigate = useNavigate();
    const { username } = useParams();
    function handleLogout(){

        navigate('/CompanyLogin');

    }

    function postShiftHandler(){

        navigate(`/CompanyPostShift/${username}`);

    }

    function viewShiftHandler(){

        navigate(`/CompanyViewShift/${username}`);

    }


    function viewShiftChangeHandler(){

        navigate(`/CompanyViewShiftChangeRequestsContainer/${username}`);

    }

  


    function viewLeaveHandler(){

        navigate(`/CompanyViewLeaveRequest/${username}`);

    }


    return (
        <div>

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                        <div className="card-header text-center mt-auto">
                                Welcome {username}
                            </div>
                            <button className="btn btn-dark my-3 mx-3" type="button"onClick={postShiftHandler}>Post Shift</button>
                            <button className="btn btn-dark my-3 mx-3" type="button"onClick={viewShiftHandler} >View Shift</button>
                            <button className="btn btn-dark my-3 mx-3" type="button"onClick={viewShiftChangeHandler}>View Shift Change Requests</button>
                            <button className="btn btn-dark my-3 mx-3" type="button" onClick={viewLeaveHandler}>View Leave Requests</button>
                            <button className="btn btn-dark my-3 mx-3" type="button" onClick={handleLogout}>Logout</button>
                        </div> 
                  </div>
            </div>
        </div>







        </div>
    )
}