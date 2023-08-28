import { useEffect, useState } from 'react';


import { useParams, useNavigate } from 'react-router-dom';


import { db } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {  setDoc } from 'firebase/firestore';

import Swal from 'sweetalert2'


export default function CompanyPostShift() {


    const { username } = useParams();
    const navigate = useNavigate();

    

    const [employeeShiftData, setEmployeeShiftData] = useState<any[]>([]);
    const [itemStates, setItemStates] = useState<any[]>([]);

    useEffect(() => {
        async function fetchEmployeeShiftDetails() {
            try {
                const q = collection(db, 'Employee Shift Details');
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const data = querySnapshot.docs.map(doc => doc.data());
                    setEmployeeShiftData(data);

                   
                    const initialState = data.map(employee => ({
                        Shift: '',
                        Location: '',
                        Date: ''
                    }));

                    setItemStates(initialState);

                }
                
                else {
                    console.log('No data found for the given email');
                }

            } catch (error) {
                console.error('Error fetching employee shift details:', error);
            }
        }

        fetchEmployeeShiftDetails();


    }, [username]);

    const handleApply = async (index: number) => {


        const itemState = itemStates[index];
        const employeeData = employeeShiftData[index];
    
        if (itemState.Shift && itemState.Location && itemState.Date) {

            try {
                const q = query(collection(db, 'Employee Shift Details'), where('Employee ID', '==', employeeData['Employee ID']));
                const querySnapshot = await getDocs(q);
    
                if (querySnapshot.size > 0) {
                    const docRef = querySnapshot.docs[0].ref;
                    await setDoc(docRef, {
                        Shift: itemState.Shift,
                        Location: itemState.Location,
                        Date: itemState.Date
                    }, { merge: true });
    
                    console.log('Shift Posted  successfully.');
                } else {
                    console.log('No data found for the given employee ID.');
                }
            } catch (error) {
                console.error('Error Posting Shift:', error);
            }
        } else {
            console.log('Please select all fields for the item:', index);
        }
    
        //alert('Shift Posted successfully.');

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Shift Posted successfully',
            showConfirmButton: false,
            timer: 1500
          })
    };
    
    const handleShiftChange = (index: number, value: string) => {
        const updatedItemStates = [...itemStates];
        updatedItemStates[index].Shift = value;
        setItemStates(updatedItemStates);
    };

    const handleLocationChange = (index: number, value: string) => {
        const updatedItemStates = [...itemStates];
        updatedItemStates[index].Location = value;
        setItemStates(updatedItemStates);
    };

    const handleDateChange = (index: number, value: string) => {
        const updatedItemStates = [...itemStates];
        updatedItemStates[index].Date = value;
        setItemStates(updatedItemStates);
    };


    function handleBack(){

        navigate(`/CompanyDashboard/${username}`);

    }


    return (
        <div>
        
            <div className="container mt-5">
                 < div className="row justify-content-center">
                    <div className="row ">

                    <button className="btn btn-dark w-100 mx-auto my-3" type="button" onClick={handleBack}>Back</button>

                        {employeeShiftData.map((employee, index) => (

                            <div className="col-md-6 my-3" key={index}>
                                <div className="card text-center">
                                    <div className="card-header">{employee["Employee ID"]}</div>
                                    <div className="card-body">
                                        <h5 className="card-title">{employee["Employee Name"]}</h5>
                                        <p className="card-text">{employee["Shift"]}</p>
                                        <p className="card-text">{employee["Location"]}</p>
                                        <p className="card-text">{employee["Date"]}</p>

                                        <select className="form-select" aria-label="Default select example" value={itemStates[index].Shift} onChange={e => handleShiftChange(index, e.target.value)}>
                                            <option>Select Shift</option>
                                            <option value="A SHIFT">A SHIFT</option>
                                            <option value="B SHIFT">B SHIFT</option>
                                            <option value="C SHIFT">C SHIFT</option>
                                            <option value="G SHIFT">G SHIFT</option>
                                        </select>

                                        <select className="form-select my-2" aria-label="Default select example" value={itemStates[index].Location} onChange={e => handleLocationChange(index, e.target.value)}>
                                            <option>Select Location</option>
                                            <option value="POWER PLANT 1">POWER PLANT 1</option>
                                            <option value="POWER PLANT 2">POWER PLANT 2</option>
                                            <option value="POWER PLANT 3">POWER PLANT 3</option>
                                            <option value="POWER PLANT 4">POWER PLANT 4</option>
                                        </select>

                                        <label className="my-2" htmlFor="form-contro">Select Date:</label>
                                        <input className="form-control" type="date" value={itemStates[index].Date} onChange={e => handleDateChange(index, e.target.value)} />

                                        <button type="button" className="btn btn-dark w-100 my-3" onClick={() => handleApply(index)}>Post</button>
                                        
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
