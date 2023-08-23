import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function CompanyViewShift() {
    const { username } = useParams();
    const navigate = useNavigate();
    const [employeeShiftData, setEmployeeShiftData] = useState<any[]>([]); // Initialize as an empty array

    useEffect(() => {
        async function fetchEmployeeShiftDetails() {
            try {
                const q = collection(db, 'Employee Shift Details');
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const data = querySnapshot.docs.map(doc => doc.data());
                    setEmployeeShiftData(data);
                } else {
                    console.log('No data found');
                }
            } catch (error) {
                console.error('Error fetching employee shift details:', error);
            }
        }

        fetchEmployeeShiftDetails();
    }, [username]);



    
    function handleBack(){

        navigate(`/CompanyDashboard/${username}`);

    }

    return (
        <div>

            <div className="container mt-5">

            <button className="btn btn-dark w-100 mx-auto my-3" type="button" onClick={handleBack}>Back</button>

                <div className="row ">
                 
                

                    {employeeShiftData.map((employee, index) => (
                        <div className="col-md-6 my-3" key={index}>
                            <div className="card text-center">
                                <div className="card-header">{employee["Employee ID"]}</div>
                                <div className="card-body">
                                    <h5 className="card-title">{employee["Employee Name"]}</h5>
                                    <p className="card-text">{employee["Date"]}</p>
                                    <p className="card-text">{employee["Shift"]}</p>
                                    <p className="card-text">{employee["Location"]}</p>
                                    {/* Add more properties as needed */}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}
