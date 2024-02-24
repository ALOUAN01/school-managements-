import React,{ useEffect, useState }from 'react';
import {Table} from 'react-bootstrap';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {Button,ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddCourseModal from "./AddCourseModal";
import UpdateCourseModal from "./UpdateCourseModal";
import { getModule, deleteModule, getTeachModule } from './ModuleService';
import { Link } from 'react-router-dom';



const Manage_course = () => {
    const [courses, setCourses] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [ModalShow,setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editCourse, setEditCourse] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
       let mounted = true;
       if(courses.length && !isUpdated) {
        return;
        }
       getModule()
         .then(data => {
           if(mounted) {
             setCourses(data);
           }
         })
       return () => {
          mounted = false;
          setIsUpdated(false);
       }
     }, [isUpdated, courses])


    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);

    };

    let AddModelClose=()=>setAddModalShow(false);
    let EditModelClose=()=>setEditModalShow(false);
    let ModelClose=()=>setModalShow(false);
    return(
        <div className="container-fluid side-container ">
        <h1 class="par">Manage Module</h1>
        <div className="container11">
            <Button variant="primary" className="top-right-button" onClick={handleAdd}>
                Add Module
            </Button>
                <AddCourseModal show={addModalShow} setUpdated={setIsUpdated}
                onHide={AddModelClose}></AddCourseModal>
        </div>
        <div className="row side-row divstu" >


            { courses.map((crs) =>
                 <div class="card1">
                  <div class="card1-details">
                    <p class="text1-title">{crs.title}</p>

                  </div>
                   <Link to={`/ModuleInf/${crs.id}`}>
                        <button class="card-button">More info</button>
                   </Link>

                </div>
                        )}
        </div>
        </div>
    );
};

export default Manage_course;