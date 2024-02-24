import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {Button,ButtonToolbar } from 'react-bootstrap';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from "react-router-dom"
import { deleteModule} from "./ModuleService"
import UpdateCourseModal from "./UpdateCourseModal";
const ModuleInf = () => {

  const [editModalShow, setEditModalShow] = useState(false)
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [teachers1, setTeachers1] = useState([]);
  const [moduleId, setmoduleId] = useState([]);
  const [modules, setModules] = useState([]);
  const [teacherId, setTeacherId] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
  const [afficherDiv1, setAfficherDiv1] = useState(false);
  const [afficherDiv2, setAfficherDiv2] = useState(false);
  const {moduleid}  = useParams();
  const [editModule, setEditModule] = useState([]);
  const handleClick1 = () => {
    setAfficherDiv1(!afficherDiv1); // Inverser la valeur actuelle de afficherDiv
  };


   useEffect(() => {
    const fetchData0 = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/module/" + moduleid + "/"
        );
        setModules(response.data);
        setTeachers(response.data.teachers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchData1 = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/teachers/"
        );
        setTeachers1(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchData2 = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/module/"
        );

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData0();
    fetchData1();
    fetchData2();

  }, []);


  const handleDelete = (e) => {
        if(window.confirm('Are you sure ?')){
            e.preventDefault();
           deleteModule(moduleid)
            .then((result)=>{
                alert(result);
                setIsUpdated(true);
                navigate('/Manage_course')
            },
            (error)=>{
                alert("Failed to Delete Student");
            })

        }
    };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/teachmodule/', {

        teacher: teacherId,
        module: moduleid,

      });
        window.location.reload();
    } catch (error) {

    }
  };
  const removeTeacherFromModule = (teacher_id, module_id) => {
     try {
      axios.delete('http://127.0.0.1:8000/api/teacher/'+teacher_id+'/module/'+module_id+'/delete/');
        window.location.reload();

      } catch (error) {
      console.error("Error deleting student from class:", error);
    }
  }

  const handleUpdate = (e, stu) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditModule(stu);
    };
  let EditModelClose=()=>setEditModalShow(false);


  return (
    <div className="container-fluid side-container ">
    <div className="container12">
    <h1 class="par">Module: {modules.title}</h1>
             <button class="button"  onClick={event => handleDelete(event)}  >
                <svg viewBox="0 0 448 512" class="svgIcon">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
             </button>

             <DropdownButton id="dropdown-item-button " className="top-right-button" title="ACTIONS">
                  <Dropdown.Item as="button" onClick={event => handleUpdate(event,modules)}>Update Information <FaEdit /></Dropdown.Item>
                  <UpdateCourseModal show={editModalShow} module={moduleid} setUpdated={setIsUpdated}
                              onHide={EditModelClose}></UpdateCourseModal>
                  <Dropdown.Item as="button"  onClick={handleClick1} >Edit Teachers</Dropdown.Item>

             </DropdownButton>
       </div>

      <div className="row side-row" >

            {afficherDiv1 &&<div class=" divform">
                <form class="formclass" onSubmit={handleFormSubmit}>
                  <label className='fw-bold mb-1' >Teachers:</label>
                  <select class="form-select" aria-label="Default select example" id="student" value={teacherId} onChange={(e) => setTeacherId(e.target.value)}>
                      <option value="">Select a Teacher</option>
                         {teachers1.map((teacher) => (
                           <option key={teacher.teacherid} value={teacher.teacherid}>
                              {teacher.FirstName} {teacher.LastName}
                           </option>
                         ))}
                   </select>
                  <p></p>
                  <ButtonToolbar>
                     <Button variant="primary"  type="submit" >
                        Sinscrire
                     </Button>
                     <Button variant="danger"  onClick={handleClick1} type="submit" style={{ marginLeft : '150px'}} >
                        Close
                     </Button>
                  </ButtonToolbar>
                </form>
            </div>}

        <p></p>
        <label className='fw-bold mb-1'style={{ fontSize: '24px' }}>Teachers of this module:</label>
        <MDBTable align='middle' hover >
                <MDBTableHead dark>
                    <tr>
                      <th scope='col'>Name</th>

                      <th scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
             <MDBTableBody>
                  {teachers.map((stu) =>
                  <tr key={stu.teacherid}>
                  <td   >
                    <div className='d-flex align-items-center'>
                        <img  className='rounded-circle' src={"http://127.0.0.1:8000"+stu.image} alt='' style={{ width: '45px', height: '45px' }}  ></img>
                        <div className='ms-3'>
                            <p className='fw-bold mb-1'>{stu.LastName} {stu.FirstName} </p>
                            <p className='text-muted mb-0'>{stu.Email}</p>
                          </div>
                    </div>
                  </td>

                    <td>
                  <Button className="mr-2" variant="danger"
                  onClick={() => removeTeacherFromModule(stu.teacherid,moduleid)}>
                        <RiDeleteBin5Line />
                  </Button>
                  <span>&nbsp;&nbsp;&nbsp;</span>
                 </td>
                 </tr>)}
             </MDBTableBody>
        </MDBTable>


      </div>
    </div>







  );
};

export default  ModuleInf;
