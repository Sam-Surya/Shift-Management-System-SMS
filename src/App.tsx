
import './App.css';
import Login from './components/Login';
import { BrowserRouter ,Route,Routes } from 'react-router-dom';
import EmployeeDashboard from './components/EmployeeDashboard';
import EmployeeShiftView from './components/EmployeeShiftView';
import CompanyLogin from './components/CompanyLogin';
import CompanyDashboard from './components/CompanyDashboard';
import EmployeeShiftChangeContainer from './components/EmployeeShiftChangeContainer';
import EmployeeViewPreviousShiftChangeRequest from './components/EmployeeViewPreviousShiftChangeRequest';
import EmployeeShiftChangeRequest from './components/EmployeeShiftChangeRequest';
import EmployeeLeaveRequestContainer from './components/EmployeeLeaveRequestContainer';
import EmployeeViewPreviousLeaveRequest from './components/EmployeePreviousLeaveRequestStatus';
import EmployeeApplyLeave from './components/EmployeeApplyLeave';
import MainPage from './components/MainPage';
import CompanyPostShift from './components/CompanyPostShift';
import CompanyViewShift from './components/ComapnyViewShift';
import CompanyViewLeaveRequest from './components/CompanyViewLeaveRequest';
import CompanyViewShiftChangeRequestsContainer from './components/CompanyViewShiftChangeRequestsContainer';

function App() {
  return (
    <>

    <BrowserRouter>


    
    

    <Routes>
        <Route path="/"       element={<MainPage></MainPage>} />
        <Route path="/Login" element={<Login></Login>} />
        <Route path="/Employeedashboard/:username" element={<EmployeeDashboard/>} />
        <Route path="/EmployeeShiftView/:username" element={<EmployeeShiftView/>}  />
        <Route path="/CompanyLogin" element={<CompanyLogin/>}  />
        <Route path="/Companydashboard/:username" element={<CompanyDashboard/>} />
        <Route path="/EmployeeShiftChangeContainer/:username" element={<EmployeeShiftChangeContainer/>}  />
        <Route path="/EmployeeViewPreviousShiftChangeRequest/:username" element={<EmployeeViewPreviousShiftChangeRequest/>}  />
        <Route path="/EmployeeShiftChangeRequest/:username" element={<EmployeeShiftChangeRequest></EmployeeShiftChangeRequest>}  />
        <Route path="/EmployeeLeaveRequestContainer/:username" element={<EmployeeLeaveRequestContainer></EmployeeLeaveRequestContainer>}  />
        <Route path="/EmployeeViewPreviousLeaveRequest/:username" element={<EmployeeViewPreviousLeaveRequest></EmployeeViewPreviousLeaveRequest>}  />
        <Route path="/EmployeeApplyLeave/:username" element={<EmployeeApplyLeave/>}  />
        <Route path="/CompanyPostShift/:username" element={<CompanyPostShift/>}  />
        <Route path="/CompanyViewShift/:username" element={<CompanyViewShift/>}  />
        <Route path="/CompanyViewLeaveRequest/:username" element={<CompanyViewLeaveRequest/>}  />
        <Route path="/CompanyViewShiftChangeRequestsContainer/:username" element={<CompanyViewShiftChangeRequestsContainer/>}  />
      </Routes>

      
     
  
     
     
   
    
    
    </BrowserRouter>

   
    
    
    
    
    
    </>
  );
}

export default App;
