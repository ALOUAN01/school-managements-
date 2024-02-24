import React,{ useEffect, useState }from 'react';
import {Table} from 'react-bootstrap';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {Button,ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddStudentModal from "./AddStudentModal";
import Students from "./Students";
import UpdateStudentModal from "./UpdateStudentModal";
import { getStudents, deleteStudent } from './StudentService';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"


const Manage = () => {
    const [students, setStudents] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editStudent, setEditStudent] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
       let mounted = true;
       if(students.length && !isUpdated) {
        return;
        }
       getStudents()
         .then(data => {
           if(mounted) {
             setStudents(data);
           }
         })
       return () => {
          mounted = false;
          setIsUpdated(false);
       }
     }, [isUpdated, students])

    const handleUpdate = (e, stu) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditStudent(stu);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);

    };



    let AddModelClose=()=>setAddModalShow(false);
    let EditModelClose=()=>setEditModalShow(false);

    return(
        <div className="container-fluid side-container ">
        <h1 class="par">Manage Students</h1>
        <div className="container11">
                    <Button  className="top-right-button"  variant="primary" onClick={handleAdd}>
                       Add Student
                    </Button>
                <AddStudentModal show={addModalShow} setUpdated={setIsUpdated}
                onHide={AddModelClose}></AddStudentModal>
        </div>
        <div className="row side-row " >

            <MDBTable align='middle' hover >
                <MDBTableHead dark>
                <tr  className='table-secondary' >
                  <th scope='col'>Name</th>
                  <th scope='col'>Academic Level</th>
                  <th scope='col'>Date of Birth</th>
                  <th scope='col'>Place_of_birth</th>
                  <th scope='col'>Gender</th>
                  <th scope='col'>Address</th>
                  <th scope='col'>Action</th>
                </tr>
                </MDBTableHead>
                <MDBTableBody>
                  { students.map((stu) =>

                  <tr key={stu.id}>


                  <td >

                    <div className='d-flex align-items-center'>

                        <img  className='rounded-circle' src={"http://127.0.0.1:8000"+stu.image} alt='' style={{ width: '45px', height: '45px' }}  ></img>

                        <div className='ms-3'>
                        <Link to={`/StudentInfo/${stu.studentId}`} style={{ color: 'black' }} >
                            <p className='fw-bold mb-1' style={{ color: 'black' }} >{stu.LastName} {stu.FirstName} </p>
                        </Link>
                            <p className='text-muted mb-0'>{stu.Email}</p>
                          </div>


                    </div>
                  </td>



                  <td>
                  <p className='fw-normal mb-1'>{stu.academic_level}</p>
                  </td>

                  <td>
                  <p className='fw-normal mb-1'>{stu.date_of_birth}</p>
                  </td>
                  <td>
                  <p className='fw-normal mb-1'>{stu.Place_of_birth}</p>
                  </td>
                  <td>
                  <p className='fw-normal mb-1'>{stu.Gender}</p>
                  </td>
                  <td>
                  <p className='fw-normal mb-1'>{stu.address}</p>
                  </td>



                  <td>


                  <span>&nbsp;&nbsp;&nbsp;</span>
                  <Button className="mr-2"
                    onClick={event => handleUpdate(event,stu)}>
                        <FaEdit />
                  </Button>
                  <UpdateStudentModal show={editModalShow} student={editStudent} setUpdated={setIsUpdated}
                              onHide={EditModelClose}></UpdateStudentModal>
                </td>
                </tr>)}
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>
    );
};

export default Manage;