import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

export default function CompanyViewLeaveRequest() {
    const { username } = useParams();
    const navigate = useNavigate();
    const [employeeItems, setEmployeeItems] = useState<any[]>([]);

    useEffect(() => {
        async function fetchLeaveRequestsData() {
            try {
                const querySnapshot = await getDocs(collection(db, 'Employee Leave Requests'));
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setEmployeeItems(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchLeaveRequestsData();
    }, [username]);

    const handleChangeStatus = (index: number, newStatus: string) => {
        const updatedEmployeeItems = [...employeeItems];
        updatedEmployeeItems[index].Status = newStatus;
        setEmployeeItems(updatedEmployeeItems);
    };

    const handleApply = async (index: number) => {
        const newStatus = employeeItems[index].Status; // Get the status from the selected item
        console.log('New status:', newStatus);
        try {
            // Update the status in the database
            const leaveRequestRef = doc(db, 'Employee Leave Requests', employeeItems[index].id);
            await updateDoc(leaveRequestRef, { Status: newStatus });
            alert("Status Updated Successfully")
        } catch (error) {
            console.error('Error updating leave request status:', error);
        }
    };

    function handleBack() {
        navigate(`/CompanyDashboard/${username}`);
    }

    const filteredEmployeeItems = employeeItems.filter(
        employee => employee.selectedFromDate && employee.selectedToDate
    );

    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <button className="btn btn-dark w-100 mx-auto my-3" type="button" onClick={handleBack}>
                        Back
                    </button>

                    {filteredEmployeeItems.map((employee, index) => (
                        <div className="col-md-6 my-3" key={index}>
                            
                            <div className="card">
        <h5 className="card-header text-center mt-auto">Leave Requests</h5>
        <div className="card-body text-center mt-auto">
            <p className="card-text text-center mt-auto">{employee["Employee Name"]}</p>
            <p className="card-text text-center mt-auto">{employee["Employee ID"]}</p>
            <p className="card-text text-center mt-auto">{employee["selectedFromDate"]}</p>
            <p className="card-text text-center mt-auto"><b>TO</b></p>
            <p className="card-text text-center mt-auto">{employee["selectedToDate"]}</p>
            <p className="card-text text-center mt-auto"><b>Leave Type:</b>{employee["selectedLeaveType"]}</p>
            <p className="card-text text-center mt-auto"><b>Leave Description:</b>{employee["leaveDescription"]}</p>
            <p className="card-text text-center mt-auto"><b>Leave Status:</b>{employee["Status"]}</p>
            <select
    className="form-select"
    aria-label="Default select example"
    onChange={e => handleChangeStatus(index, e.target.value)}
    value={employee.Status.value}
>
    <option value="Pending">Pending</option>
    <option value="Approved">Approved</option>
    <option value="Rejected">Rejected</option>
</select>


            <div>
                <button className="btn btn-dark my-3 w-100" type="button" onClick={() => handleApply(index)}>
                    Change
                </button>
            </div>
        </div>
    </div>
    </div>    
                    ))}
                </div>
            </div>
        </div>
    );
}
