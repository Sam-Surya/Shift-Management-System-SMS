
import { useParams, useNavigate } from 'react-router-dom';






import { useEffect, useState } from 'react';

import { db } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';






export default function EmployeeApplyLeave() {

    const { username } = useParams();
    
    const navigate = useNavigate();


    const [selectedFromDate,setselectedFromDate] = useState('');
    const [selectedToDate, setselectedToDate] = useState('');
    const [selectedLeaveType, setselectedLeaveType] = useState('');
    const [leaveDescription, setsleaveDescription] = useState('');
    
    
    const Status:String="Pending"
    



   






    async function handleApply() {
        if (selectedFromDate && selectedToDate && selectedLeaveType && leaveDescription) {
            try {
                const q = query(collection(db, 'Employee Leave Requests'), where('email', '==', username));
                const querySnapshot = await getDocs(q);
    
                if (querySnapshot.size > 0) {
                    const docRef = querySnapshot.docs[0].ref;
                    await setDoc(docRef, {
                        selectedFromDate,
                        selectedToDate,
                        selectedLeaveType,
                        leaveDescription,
                        Status,
                      
                    }, { merge: true });
    
                    console.log('Leave applied successfully.');
                } else {
                    console.log('No data found for the given email.');
                }
            } catch (error) {
                console.error('Error applying Leave:', error);
            }
        } else {
            console.log('Please select both all the Field');
        }

        alert('Leave applied successfully.');
    }








    
    
    function handleLogout(){

        navigate('/Login');

    }

    function handleBack(){

        navigate(`/EmployeeLeaveRequestContainer/${username}`);

    }



    function fdateHandler(event:any){

        setselectedFromDate(event.target.value)

    }

    function tdateHandler(event:any){

        setselectedToDate(event.target.value)

    }

    function leaveTypeHandler(event:any){

        setselectedLeaveType(event.target.value)

    }

    function leaveDesHandler(event:any){

        setsleaveDescription(event.target.value)

    }





    return (
        <div>


            <div className="container mt-5">
                <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <h5 className="card-header text-center mt-auto">Leave Request</h5>
                        <div className="card-body text-center mt-auto">
                        
                        <label className="my-3" htmlFor="form-control" >Select From date:</label>
                        <input className="form-control" type="date" value={selectedFromDate}  onChange={fdateHandler}/>
                            
                            
                        <label className="my-3" htmlFor="form-contro" >Select To date:</label>
                        <input className="form-control" type="date" value={selectedToDate}  onChange={tdateHandler}/>
                            

                                <select className="form-select my-3" aria-label="Default select example" value={selectedLeaveType} onChange={leaveTypeHandler}>
                                    <option selected>Select Leave Type</option>
                                    <option value="Medical Emergency">Medical Emergency</option>
                                    <option value="Outing">Outing</option>
                                    <option value="Casual Leave">Casual Leave</option>
                                    <option value="Emergency Leave">Emergency Leave</option>
                                </select>


                                <textarea className="form-control" id="exampleFormControlTextarea1" placeholder='Leave Description' value={leaveDescription} onChange={leaveDesHandler} ></textarea>



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
