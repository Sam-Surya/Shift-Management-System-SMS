import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


import { db } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';




export default function EmployeeShiftView() {


    const { username } = useParams();
    const navigate = useNavigate();


    const [employeeShiftData, setEmployeeShiftData] = useState<any | null>(null); 

    useEffect(() => {

        async function fetchEmployeeShiftDetails() {

            try {
                const q = query(collection(db, 'Employee Shift Details'), where('email', '==', username));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.size > 0) {
                    
                    const docData = querySnapshot.docs[0].data();
                    setEmployeeShiftData(docData);
                } else {
                    console.log('No data found for the given email');
                }
            } catch (error) {
                console.error('Error fetching employee shift details:', error);
            }
        }

        fetchEmployeeShiftDetails();
    }, [username]);




    function handleLogout(){

        navigate('/Login');

    }

    function handleBack(){

        navigate(`/EmployeeDashboard/${username}`);

    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <h5 className="card-header text-center mt-auto">View Shift</h5>
                            <div className="card-body text-center mt-auto">
                               
                                {employeeShiftData ? (
                                    <>
                                        <h5 className="card-title text-center mt-auto">{employeeShiftData["Employee ID"]}</h5>
                                        <h5 className="card-title text-center mt-auto">{employeeShiftData["Employee Name"]}</h5>
                                        <h5 className="card-title text-center mt-auto">{employeeShiftData.Date}</h5>
                                        <p className="card-text text-center mt-auto">{employeeShiftData.Shift}</p>
                                        <p className="card-text text-center mt-auto">{employeeShiftData.Location}</p>
                                    </> ) 
                                    : ( <p>Please Wait ! Loading...</p>)
                                
                                }

                                <div>
                                    <button className="btn btn-dark my-3 w-100" type="button" onClick={handleBack}>Go Back</button>
                                </div>
                                <div>
                                    <button className="btn btn-dark my-3 w-100" type="button" onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
