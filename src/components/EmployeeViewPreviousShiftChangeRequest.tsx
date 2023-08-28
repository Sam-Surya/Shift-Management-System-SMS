import React from 'react'

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


import { db } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';


export default function EmployeeViewPreviousShiftChangeRequest() {

    const { username } = useParams();
    const navigate = useNavigate();


    const [employeePrevShiftChangeData, setemployeePrevShiftChangeData] = useState<any | null>(null); 

    useEffect(() => {
        async function fetchEmployeeShiftChangRequestDetails() {
            try {
                const q = query(collection(db, 'Employee Shift Change Requests'), where('email', '==', username));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.size > 0) {
                    
                    const docData = querySnapshot.docs[0].data();
                    setemployeePrevShiftChangeData(docData);
                } else {
                    console.log('No data found for the given email');
                }
            } catch (error) {
                console.error('Error fetching employee shift details:', error);
            }
        }

        fetchEmployeeShiftChangRequestDetails();
    }, [username]);



    function handleLogout(){

        navigate('/Login');

    }

    function handleBack(){

        navigate(`/EmployeeShiftChangeContainer/${username}`);

    }


    return (
        <div>


            <div className="container mt-5">
                <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <h5 className="card-header text-center mt-auto">View Previous Shift Change Request</h5>
                        <div className="card-body text-center mt-auto">
                                {employeePrevShiftChangeData ? (  // Check if data is available
                                    <div>
                                      
                                       
                                        <p className="card-text text-center mt-auto"><b>{employeePrevShiftChangeData.selectedLocation}</b></p>
                                        <p className="card-text text-center mt-auto"><b>{employeePrevShiftChangeData.selectedShift}</b></p>
                                        <p className="card-text text-center mt-auto"><b>STATUS: {employeePrevShiftChangeData.status}</b></p>
                                        <div ><button className="btn btn-dark my-3 w-100" type="button" onClick={handleBack}>Go Back</button></div>
                                        <div ><button className="btn btn-dark my-3 w-100" type="button" onClick={handleLogout}>Logout</button></div>
                                    </div>

                                  
                                ) : (
                                    <p>Loading data...</p>  // Or a loading message
                                )}
                            </div>
                    </div>
                </div>
                </div>
            </div>



        </div>
    )
}
