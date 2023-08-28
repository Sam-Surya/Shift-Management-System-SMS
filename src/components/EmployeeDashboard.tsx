
import { useParams ,useNavigate} from 'react-router-dom';

export default function EmployeeDashboard() {

    const { username } = useParams();

    const navigate = useNavigate();


    function handleViewShiftClick (){

        navigate(`/EmployeeShiftView/${username}`);
    }

    function handleLogout(){

        navigate('/Login');

    }

    function handleShiftChangeClick(){

        navigate(`/EmployeeShiftChangeContainer/${username}`)
    }


    function handleLeaveRequest(){

        navigate(`/EmployeeLeaveRequestContainer/${username}`)
    }

    return (    
        <div>

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                        <div className="card-header text-center mt-auto"  >
                            Welcome {username}
                            </div>
                            <button className="btn btn-dark my-3 mx-3" type="button" onClick={handleViewShiftClick}>View Shift</button>
                            <button className="btn btn-dark my-3 mx-3" type="button" onClick={handleShiftChangeClick}>Request Shift Change</button>
                            <button className="btn btn-dark my-3 mx-3" type="button"onClick={handleLeaveRequest}>Leave Request</button>
                            <button className="btn btn-dark my-3 mx-3" type="button" onClick={handleLogout}>Logout</button>
                        </div> 
                  </div>
            </div>
        </div>


        </div>
    )
}