import React,{ useEffect, useState }from 'react';
import {Table} from 'react-bootstrap';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {Button,ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddClassModal from "./AddClassModal";
import { getClass, deleteClass } from './ClassroomService';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const ClassroomList = () => {

    const [classrooms, setClassroom] = useState([]);
    const [student, setStudent] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [ModalShow,setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editClassroom, setEditClassroom] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
       let mounted = true;
       if(classrooms.length && !isUpdated) {
        return;
        }
       getClass()
         .then(data => {
           if(mounted) {
             setClassroom(data);

           }
         })
       return () => {
          mounted = false;
          setIsUpdated(false);
       }
     }, [isUpdated, classrooms])

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);


    };

    const handleUp = (e, crs) => {
        e.preventDefault();
        setModalShow(true);
        setEditClassroom(crs);
    };

    let AddModelClose=()=>setAddModalShow(false);
    let EditModelClose=()=>setEditModalShow(false);
    let ModelClose=()=>setModalShow(false);

    return(
            <div className="container-fluid side-container ">

            <h1 class="par">Manage Classrooms</h1>
             <div className="container11">
                    <Button  className="top-right-button"  variant="primary" onClick={handleAdd} style={{ width:'150px'}}>
                        Add Classroom
                    </Button>
                    <AddClassModal show={addModalShow} setUpdated={setIsUpdated}
                    onHide={AddModelClose}></AddClassModal>

        </div>
            <div className="row side-row divstu" >

                    { classrooms.map((crs) =>
                 <div class="card1">
                  <div class="card1-details">
                    <p class="text1-title">{crs.class_name}</p>

                  </div>
                   <Link to={`/classroom/${crs.id}`}>
                        <button class="card-button">More info</button>
                   </Link>
                </div>
                        )}
                <p></p>
                <p></p>
            </div>
            </div>
    );
};

export default ClassroomList;