
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';   
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeComponent from './components/EmployeeComponent';

function App() {
 
      console.log("App component loaded successfully");

  return (
    <>
      <BrowserRouter>
        <HeaderComponent/>
           <Routes>
              {/* //http://localhost:5173 */}
               <Route path='/' element = { <ListEmployeeComponent /> }/>
              {/* //http://localhost:5173/employees */}
               <Route path='/employees' element = { <ListEmployeeComponent/> }/>
              {/* //http://localhost:5173/add-employee */}
               <Route path='/add-employee' element = { <EmployeeComponent/> }/>

              {/* //http://localhost:5173/edit-employee/1 */}
              <Route path='/edit-employee/:id' element = {<EmployeeComponent/>}/>

           </Routes>
       
        <FooterComponent/>
      </BrowserRouter>  

    </>
  )
}

export default App
