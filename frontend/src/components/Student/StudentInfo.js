import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Table} from 'react-bootstrap';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {Button,ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import UpdateStudentModal from "./UpdateStudentModal";
import AddGradeModal from "./AddGradeModal";
import { getStudents, deleteStudent } from './StudentService';
import { useNavigate } from "react-router-dom"
import { deleteGrade, deleteAbsence } from '../Grade/GradeService.js';
import UpdateGradeModal from "./UpdateGradeModal";
import UpdateAbsenceModal from "./UpdateAbsenceModal";
import AddAbsenceModal from "./AddAbsenceModal";

const StudentInfo = ({ studentId }) => {


  const navigate = useNavigate();
  const [grades, setGrades] = useState([]);
  const [absences, setAbsences] = useState([]);
  const [students, setStudents] = useState([]);
  const [modules, setModules] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [addModalShowGrade, setAddModalShowGrade] = useState(false);
  const [addModalShowAbsence, setAddModalShowAbsence] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editModalShow1, setEditModalShow1] = useState(false);
  const [editModalShow2, setEditModalShow2] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [editStudent, setEditStudent] = useState([]);
  const [editGrade, setEditGrade] = useState([]);
  const {studentid}  = useParams();

  useEffect(() => {
    const fetchData0 = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/student/"+ studentid +"/grades/"
        );
        setGrades(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchData1 = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/students/"+ studentid +"/"
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchData2 = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/module/"
        );
        setModules(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchData3 = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/student/"+ studentid +"/absences/"
        );
        setAbsences(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData0();
    fetchData1();
    fetchData2();
    fetchData3();
  }, []);


const handleUpdate = (e, stu) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditStudent(stu);
    };
    const handleDelete = (e, studentId) => {
        if(window.confirm('Are you sure ?')){
            e.preventDefault();
            deleteStudent(studentId)
            .then((result)=>{
                alert(result);
                setIsUpdated(true);
                navigate('/manage')
            },
            (error)=>{
                alert("Failed to Delete Student");
            })

        }
    };
    const handleAddGrade = (e,stu) => {
        e.preventDefault();
       setAddModalShowGrade(true);
       setEditStudent(stu);



    };
    const handleAddAbsence = (e,stu) => {
        e.preventDefault();
       setAddModalShowAbsence(true);
       setEditStudent(stu);
    };

    const handleDeleteGrade = (e, id) => {
        if(window.confirm('Are you sure ?')){
            e.preventDefault();
            deleteGrade(id)
            .then((result)=>{
                alert(result);
                setIsUpdated(true);
                window.location.reload();
            },
            (error)=>{
                alert("Failed to Delete grade");
            })
        }
    };
    const handleDeleteAbsence = (e, id) => {
        if(window.confirm('Are you sure ?')){
            e.preventDefault();
            deleteAbsence(id)
            .then((result)=>{
                alert(result);
                setIsUpdated(true);
                window.location.reload();
            },
            (error)=>{
                alert("Failed to Delete grade");
            })
        }
    };
     const handleUpdateGrade = (e, crs) => {
        e.preventDefault();
        setEditModalShow1(true);
        setEditGrade(crs);
    };
    const handleUpdateAbsence = (e, crs) => {
        e.preventDefault();
        setEditModalShow2(true);
        setEditGrade(crs);
    };


 let AddModelClose=()=>setAddModalShowGrade(false);
 let EditModelClose=()=>setEditModalShow(false);
 let EditModelClose1=()=>setEditModalShow1(false);
 let EditModelClose2=()=>setEditModalShow2(false);

  return (
  <div className="container-fluid side-container">

        <div className="container12">
             <button class="button "  onClick={event => handleDelete(event,students.studentId)}>
                <svg viewBox="0 0 448 512" class="svgIcon">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
             </button>

             <DropdownButton id="dropdown-item-button " className="top-right-button" title="ACTIONS">
                  <Dropdown.Item as="button" onClick={event => handleUpdate(event,students)}>Update Information <FaEdit /></Dropdown.Item>
                  <UpdateStudentModal show={editModalShow} student={editStudent} setUpdated={setIsUpdated}
                              onHide={EditModelClose}></UpdateStudentModal>
                  <Dropdown.Item as="button" onClick={event => handleAddGrade(event,students)}>Edit Grades</Dropdown.Item>
                  <AddGradeModal show={addModalShowGrade} student={editStudent} setUpdated={setIsUpdated}
                onHide={AddModelClose}></AddGradeModal>
                <Dropdown.Item as="button" onClick={event => handleAddAbsence(event,students)}>Edit Absence</Dropdown.Item>
                  <AddAbsenceModal show={addModalShowAbsence} student={editStudent} setUpdated={setIsUpdated}
                onHide={AddModelClose}></AddAbsenceModal>
                  <Dropdown.Item as="button"  onClick={event => handleDelete(event,students.studentId)}>Delete</Dropdown.Item>
             </DropdownButton>
       </div>


        <div class="divStudent" style={{ display: 'flex', alignItems: 'center', }}>
          <img style={{ width:'300px', height: '300px', }}
            className='rounded-circle'
            src={"http://127.0.0.1:8000" + students.image}
            alt=''

          />
          <div style={{ marginLeft: '100px' }}>
            <h1 style={{ marginLeft: '150px' }} >{`${students.FirstName} ${students.LastName}`}</h1>
            <p className="parinfo">Email : {students.Email}</p>
            <p className="parinfo">Academic Level : {students.academic_level}</p>
            <p className="parinfo">Date Of Birth : {students.date_of_birth}</p>
            <p className="parinfo">Place Of Birth: {students.Place_of_birth}</p>
            <p className="parinfo">Gender : {students.Gender}</p>
            <p className="parinfo">Address : {students.address}</p>
          </div>
        </div>



      <div className="row side-row" >
             <h4>Grades for Student </h4>
            <MDBTable  align='middle' hover >
                <MDBTableHead dark >
                <tr>
                  <th scope='col'>Module Title</th>
                  <th scope='col'>Grade</th>

                  <th scope='col'>Action</th>
                </tr>
                </MDBTableHead>
                <MDBTableBody>
                  { grades.map(grade =>(

                  <tr key={grade.id}>


                  <td >
                    <div className='d-flex align-items-center'>
                        <div className='ms-3'>
                          <p className='fw-bold mb-1' style={{ color: 'black' }} >{grade.module.title} </p>
                        </div>
                    </div>
                  </td>
                  <td>
                  <p className='fw-normal mb-1'>{grade.grade}</p>
                  </td>
                   <td>

                  <Button className="mr-2" variant="danger"
                  onClick={event => handleDeleteGrade(event,grade.id)}>
                        <RiDeleteBin5Line />
                  </Button>
                  <span>&nbsp;&nbsp;&nbsp;</span>
                  <Button className="mr-2" onClick={event => handleUpdateGrade(event,grade)}>
                        <FaEdit />
                  </Button>
                  <UpdateGradeModal show={editModalShow1} gra={editGrade} setUpdated={setIsUpdated}
                                        onHide={EditModelClose1}></UpdateGradeModal>
                </td>
                </tr>))}
              </MDBTableBody>
            </MDBTable>
      </div>


      <div className="row side-row" >
             <h4>Absence for Student </h4>
            <MDBTable  align='middle' hover >
                <MDBTableHead dark >
                <tr>
                  <th scope='col'>Module Title</th>
                  <th scope='col'>hours of absences</th>

                  <th scope='col'>Action</th>
                </tr>
                </MDBTableHead>
                <MDBTableBody>
                  { absences.map(absence =>(

                  <tr key={absence.id}>


                  <td >
                    <div className='d-flex align-items-center'>
                        <div className='ms-3'>
                          <p className='fw-bold mb-1' style={{ color: 'black' }} >{absence.module.title} </p>
                        </div>
                    </div>
                  </td>
                  <td>
                  <p className='fw-normal mb-1'>{absence.nbrH}/hrs</p>
                  </td>
                   <td>

                  <Button className="mr-2" variant="danger"
                  onClick={event => handleDeleteAbsence(event,absence.id)}>
                        <RiDeleteBin5Line />
                  </Button>
                  <span>&nbsp;&nbsp;&nbsp;</span>
                  <Button className="mr-2" onClick={event => handleUpdateAbsence(event,absence)}>
                        <FaEdit />
                  </Button>
                  <UpdateAbsenceModal show={editModalShow2} gra={editGrade} setUpdated={setIsUpdated}
                                        onHide={EditModelClose2}></UpdateAbsenceModal>
                </td>
                </tr>))}
              </MDBTableBody>
            </MDBTable>
      </div>


  </div>
  );
};

export default StudentInfo;
