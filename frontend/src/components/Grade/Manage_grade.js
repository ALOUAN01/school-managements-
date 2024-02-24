import React,{ useEffect, useState }from 'react';
import {Table} from 'react-bootstrap';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {Button,ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddGradeModal from "./AddGradeModal";
import UpdateGradeModal from "./UpdateGradeModal";
import { getGrade, deleteGrade } from './GradeService';




const Manage_grade = () => {
    const [grades, setGrades] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [ModalShow,setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editCourse, setEditCourse] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
       let mounted = true;
       if(grades.length && !isUpdated) {
        return;
        }
       getGrade()
         .then(data => {
           if(mounted) {
             setGrades(data);
           }
         })
       return () => {
          mounted = false;
          setIsUpdated(false);
       }
     }, [isUpdated, grades])

    const handleUpdate = (e, crs) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditCourse(crs);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);

    };


    const handleDelete = (e, id) => {
        if(window.confirm('Are you sure ?')){
            e.preventDefault();
            deleteGrade(id)
            .then((result)=>{
                alert(result);
                setIsUpdated(true);
            },
            (error)=>{
                alert("Failed to Delete grade");
            })
        }
    };


    const handleUp = (e, crs) => {
        e.preventDefault();
        setModalShow(true);
        setEditCourse(crs);
    };

    let AddModelClose=()=>setAddModalShow(false);
    let EditModelClose=()=>setEditModalShow(false);
    let ModelClose=()=>setModalShow(false);
    return(
        <div className="container-fluid side-container ">
        <h1 class="par">Manage Grade</h1>
        <div className="row side-row divstu" >
            <MDBTable align='middle' hover >
                <MDBTableHead dark>
                    <tr>
                      <th scope='col'>Student's name</th>
                      <th scope='col'>Module</th>
                      <th scope='col'>Grade</th>
                      <th scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                      { grades.map((crs) =>

                    <tr key={crs.id}>

                      <td>
                        <div className='d-flex align-items-center'>

                            <div className='ms-3'>
                                <p className='fw-bold mb-1'>{crs.student.LastName} {crs.student.FirstName}  </p>

                            </div>
                        </div>
                      </td>
                       <td>
                        <p className='fw-normal mb-1'>{crs.module.title}</p>
                      </td>
                       <td>
                        <p className='fw-normal mb-1'>{crs.grade}</p>
                      </td>

                       <td>
                        <Button className="mr-2" variant="danger"
                            onClick={event => handleDelete(event,crs.id)}>
                                <RiDeleteBin5Line />
                        </Button>
                        <span>&nbsp;&nbsp;&nbsp;</span>
                        <Button className="mr-2"
                            onClick={event => handleUpdate(event,crs)}>
                                <FaEdit />
                        </Button>
                            <UpdateGradeModal show={editModalShow} grade={editCourse} setUpdated={setIsUpdated}
                                        onHide={EditModelClose}></UpdateGradeModal>
                      </td>
                    </tr>)}
                </MDBTableBody>
            </MDBTable>
            <ButtonToolbar>
                <Button variant="primary" onClick={handleAdd}>
                Add
                </Button>
                <AddGradeModal show={addModalShow} setUpdated={setIsUpdated}
                onHide={AddModelClose}></AddGradeModal>
            </ButtonToolbar>
        </div>
        </div>
    );
};

export default Manage_grade;