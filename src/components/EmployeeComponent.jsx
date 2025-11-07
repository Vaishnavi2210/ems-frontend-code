import React, { useState, useEffect } from 'react'
import { createEmployee, getEmployeeById, updateEmployee } from '../services/EmployeeService';  //<- step 1
import { useNavigate, useParams } from 'react-router-dom';


const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const {id} = useParams();
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })


    const navigate = useNavigate();     // <- step 2


   /* function handleFirstName(e){
        setFirstName(e.target.value);
    }

    function handleLastName(e){
        setLastName(e.target.value);
    }

    function handleEmail(e){
        setEmail(e.target.value);
    } */
   const handleFirstName = (e) => setFirstName(e.target.value);
   const handleLastName = (e) => setLastName(e.target.value);
   const handleEmail = (e) => setEmail(e.target.value);

   useEffect(() => {
    if(id) {
        getEmployeeById(id).then(response => {
            const emp = response.data;
            setFirstName(emp.firstName);
            setLastName(emp.lastName);
            setEmail(emp.email);
        }).catch(error => console.log(error));
    }
  }, [id])


  function saveEmployee(e){    // -> step 3
    e.preventDefault();        // prevent page reload

    if(validateForm()) {
       const employee = { firstName, lastName, email }  
     console.log(employee)

     if(id){
        // Update existing employee
            updateEmployee(id, employee)
                .then(response => {
                    console.log('Employee updated:', response.data);
                    navigate('/employees');  // redirect to list page
                })
                .catch(error => console.log(error));
        } else {
     
      //Create new employee
  createEmployee(employee).then((response) => {
      console.log(response.data);
      navigate('/employees');  // redirect to list page
  }).catch(error => {
      console.log(error);
  })
  }
} 

}

function validateForm(){
   let valid = true;

   const errorscopy = {... errors}

   if(firstName.trim()){
       errorscopy.firstName = '';
   }else {
      errorscopy.firstName = 'First name is required';
      valid = false;
   }

   if(lastName.trim()){
       errorscopy.lastName = '';
   }else{
       errorscopy.lastName = 'Last name is required';
       valid = false;
   }

   if(email.trim()){
    errorscopy.email = '';
   } else {
    errorscopy.email = 'Email is required';
    valid = false;
   }


   setErrors(errorscopy);

   return valid;

  }

  function pageTitle(){
          if(id){
            return <h2 className='text-center'>Update Employee</h2>
          }else{
            return<h2 className='text-center'>Add Employee</h2>
          }
   }

  return (
    <div className='container'>
           <br/> <br/>
         <div className='row'>
              <div className='card col-md-6 offset-md-3 offset-md-3'>
                  {
                      pageTitle()
                  }
                   <div className='card-body'>
                       <form onSubmit={saveEmployee}>
                           <div className='form-group mb-2'>
                              <label className='form-label'>First Name:</label>
                              <input
                                 type='text'
                                 placeholder='Enter Employee First Name'
                                 name='firstName'
                                 value={firstName}
                                 className={`form-control ${ errors.firstName ? 'is-invalid': ''}`}
                                 onChange={handleFirstName}
                              >
                              </input>
                                { errors.firstName && <div className ='invalid-feedback'> { errors.firstName} </div>}
                           </div>

                           <div className='form-group mb-2'>
                              <label className='form-label'>Last Name:</label>
                              <input
                                 type='text'
                                 placeholder='Enter Employee Last Name'
                                 name='lastName'
                                 value={lastName}
                                 className={`form-control ${ errors.lastName ? 'is-invalid': ''}`}
                                 onChange={handleLastName}
                              >
                              </input>
                                 { errors.lastName && <div className ='invalid-feedback'> { errors.lastName} </div>}

                           </div>

                           <div className='form-group mb-2'>
                              <label className='form-label'>Email:</label>
                              <input
                                 type='text'
                                 placeholder='Enter Employee Email Name'
                                 name='email'
                                 value={email}
                                 className={`form-control ${ errors.email ? 'is-invalid': ''}`}
                                 onChange={handleEmail}
                              >
                              </input>
                                  { errors.email && <div className ='invalid-feedback'> { errors.email} </div>}
                           </div>
                                <button type='submit' className='btn btn-success'>Submit</button>
                       </form>
                     </div> 
              </div>
           
         </div>

    </div>
  )
  }

export default EmployeeComponent