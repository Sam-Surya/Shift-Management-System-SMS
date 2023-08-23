import React from 'react'

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';

export default function EmployeeShiftChangeRequest() {


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


    const [selectedShift, setSelectedShift] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    
    
    
    const status:String="Pending"

   
   
   
  

    
        async function handleApply() {
            if (selectedShift && selectedLocation) {
                try {
                    const q = query(collection(db, 'Employee Shift Change Requests'), where('email', '==', username));
                    const querySnapshot = await getDocs(q);
        
                    if (querySnapshot.size > 0) {
                        const docRef = querySnapshot.docs[0].ref;
                        await setDoc(docRef, {
                            selectedShift,
                            selectedLocation,
                            status
                        }, { merge: true });
        
                        console.log('Shift and location applied successfully.');
                    } else {
                        console.log('No data found for the given email.');
                    }
                } catch (error) {
                    console.error('Error applying shift and location:', error);
                }
            } else {
                console.log('Please select both shift and location.');
            }

            alert('Shift and location applied successfully.');
        }
        
    


function shiftChangeHandler(event:any){
    setSelectedShift(event.target.value)

}

function LocationChangeHandler(event:any){
    setSelectedLocation(event.target.value)

}

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
                        <h5 className="card-header text-center mt-auto">Shift Change Request</h5>
                        <div className="card-body text-center mt-auto">
                                {employeeShiftData ? (
                                    <>
                                        <h5 className="card-title text-center mt-auto">{employeeShiftData["Employee ID"]}</h5>
                                        <h5 className="card-title text-center mt-auto">{employeeShiftData["Employee Name"]}</h5>
                                        <h5 className="card-title text-center mt-auto">{employeeShiftData.Date}</h5>
                                        <p className="card-text text-center mt-auto">{employeeShiftData.Shift}</p>
                                        <p className="card-text text-center mt-auto">{employeeShiftData.Location}</p>
                                    </>
                                ) : (
                                    <p>Loading...</p>
                                )}

                            <select className="form-select" aria-label="Default select example"  value={selectedShift} onChange={shiftChangeHandler}>
                                    <option selected>Select Shift</option>
                                    <option value="A SHIFT">A SHIFT</option>
                                    <option value="B SHIFT">B SHIFT</option>
                                    <option value="C SHIFT">C SHIFT</option>
                                    <option value="G SHIFT">G SHIFT</option>
                                </select>

                                <select className="form-select my-2" aria-label="Default select example" value={selectedLocation}  onChange={LocationChangeHandler} >
                                    <option selected>Select Location</option>
                                    <option value="POWER PLANT 1">POWER PLANT 1</option>
                                    <option value="POWER PLANT 2">POWER PLANT 2</option>
                                    <option value="POWER PLANT 3">POWER PLANT 3</option>
                                    <option value="POWER PLANT 4">POWER PLANT 4</option>
                                </select>



                                <div ><button className="btn btn-dark my-3 w-100" type="button" onClick={handleApply}>Apply</button></div>
                            <div ><button className="btn btn-dark my-3 w-100" type="button" onClick={handleBack}>Go Back</button></div>
                            <div ><button className="btn btn-dark my-3 w-100" type="button" onClick={handleLogout}>Logout</button></div>
                           
                            
                            
                        </div>
                    </div>
                </div>
                </div>
            </div>








        </div>
    )
}
