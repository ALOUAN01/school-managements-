import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import UpdateStudentModal from "./UpdateStudentModal";
import { getStudents, deleteStudent } from './StudentService';
//import "frontend/src/App.css";



const CardStudent = () => {
    const [students, setStudents] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editStudent, setEditStudent] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

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
    const handleDelete = (e, studentId) => {
        if(window.confirm('Are you sure ?')){
            e.preventDefault();
            deleteStudent(studentId)
            .then((result)=>{
                alert(result);
                setIsUpdated(true);
            },
            (error)=>{
                alert("Failed to Delete Student");
            })
        }
    };
    let EditModelClose=()=>setEditModalShow(false);

  return(
   <div className="container-fluid side-container" >

   <h1 class="par">Students List</h1>

   <div className="row side-row divstu" >
    <p id="before-table"></p>

     {students.map((stu) =>
     <Card class="card" style={{ width: '20rem' }}>



        <Card.Img class="cardImage " variant="top" src={"http://127.0.0.1:8000"+stu.image}  />
      <Card.Body>
        <Card.Title>Name : {stu.FirstName} {stu.LastName} </Card.Title>
        <Card.Title>Email : {stu.Email} </Card.Title>
        <Card.Title>Group : {stu.Group}  </Card.Title>
        <Button className="mr-1" variant="primary" style={{width:"150px"}}
                    onClick={event => handleUpdate(event,stu)}>
                        Edit
                  </Button>
                  <UpdateStudentModal show={editModalShow} student={editStudent} setUpdated={setIsUpdated}
                              onHide={EditModelClose}></UpdateStudentModal>
                    <p></p>
        <Button className="mr-1" variant="danger" style={{width:"150px" }}
                    onClick={event => handleDelete(event,stu.studentId)}>
                        Delete
                  </Button>
      </Card.Body>
    </Card>)}



    </div>
  </div>
  );
};

export default CardStudent;