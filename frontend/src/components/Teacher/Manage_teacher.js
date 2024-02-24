import React,{ useEffect, useState }from 'react';
import {Table} from 'react-bootstrap';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {Button,ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddTeacherModal from "./AddTeacherModal";
import UpdateTeacherModal from "./UpdateTeacherModal";
import { getTeacher, deleteTeacher } from './TeacherService';




const Manage_staff = () => {
    const [teachers, setTeachers] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [ModalShow,setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editTeacher, seteditTeacher] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
       let mounted = true;
       if(teachers.length && !isUpdated) {
        return;
        }
       getTeacher()
         .then(data => {
           if(mounted) {
             setTeachers(data);
           }
         })
       return () => {
          mounted = false;
          setIsUpdated(false);
       }
     }, [isUpdated, teachers])

    const handleUpdate = (e, tea) => {
        e.preventDefault();
        setEditModalShow(true);
        seteditTeacher(tea);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);

    };


    const handleDelete = (e, teacherid) => {
        if(window.confirm('Are you sure ?')){
            e.preventDefault();
            deleteTeacher(teacherid)
            .then((result)=>{
                alert(result);
                setIsUpdated(true);
            },
            (error)=>{
                alert("Failed to Delete Teacher");
            })
        }
    };


    const handleUp = (e, tea) => {
        e.preventDefault();
        setModalShow(true);
        seteditTeacher(tea);
    };

    let AddModelClose=()=>setAddModalShow(false);
    let EditModelClose=()=>setEditModalShow(false);
    let ModelClose=()=>setModalShow(false);
    return(
        <div className="container-fluid side-container ">
        <h1 class="par">Manage teacher</h1>
           <div className="container11">
            <Button variant="primary"  className="top-right-button" onClick={handleAdd}>
                Add Teacher
                </Button>
                <AddTeacherModal show={addModalShow} setUpdated={setIsUpdated}
                onHide={AddModelClose}></AddTeacherModal>
            </div>
        <div className="row side-row" >
            <MDBTable align='middle' hover >
                <MDBTableHead dark>
                    <tr>
                      <th scope='col'>Name</th>
                      <th scope='col'>nbr_group</th>
                      <th scope='col'>Diploma</th>
                      <th scope='col'>State</th>
                      <th scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                      { teachers.map((tea) =>

                    <tr key={tea.id}>

                      <td>
                        <div className='d-flex align-items-center'>
                            <img  className='rounded-circle' src={"http://127.0.0.1:8000"+tea.image} alt='' style={{ width: '45px', height: '45px' }}  ></img>
                            <div className='ms-3'>
                                <p className='fw-bold mb-1'>{tea.LastName} {tea.FirstName} </p>
                                <p className='text-muted mb-0'>{tea.Email}</p>
                            </div>
                        </div>
                      </td>
                      <td>
                        <p className='fw-normal mb-1'>{tea.Nbr_group}</p>
                      </td>
                      <td>
                        <p className='fw-normal mb-1'>{tea.diploma}</p>
                      </td>
                      <td>
                        <p className='fw-normal mb-1'>{tea.state}</p>
                      </td>
                      <td>
                        <Button className="mr-2" variant="danger"
                            onClick={event => handleDelete(event,tea.teacherid)}>
                                <RiDeleteBin5Line />
                        </Button>
                        <span>&nbsp;&nbsp;&nbsp;</span>
                        <Button className="mr-2"
                            onClick={event => handleUpdate(event,tea)}>
                                <FaEdit />
                        </Button>
                            <UpdateTeacherModal show={editModalShow} teacher={editTeacher} setUpdated={setIsUpdated}
                                        onHide={EditModelClose}></UpdateTeacherModal>
                      </td>
                    </tr>)}
                </MDBTableBody>
            </MDBTable>



        </div>
        </div>
    );
};

export default Manage_staff;