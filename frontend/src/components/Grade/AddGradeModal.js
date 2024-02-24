import React from 'react';
import {Modal, Col, Row, Form, Button } from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import  { useEffect} from 'react';
import {ButtonToolbar } from 'react-bootstrap';


const AddGradeModal = (props) => {



        const [grades,setGrades] = useState([]);
        const [Grade,setGrade] = useState([]);
        const [modules, setModules] = useState([]);
        const [selectedStudent, setSelectedStudent] = useState('');
        const [selectedModule, setSelectedModule] = useState('');

        useEffect(() => {
            axios.get('http://127.0.0.1:8000/students/') // Replace with your actual endpoint to fetch teachers
              .then((response) => {
               setGrades(response.data);
              })
              .catch((error) => {
                console.error('Error fetching student:', error);
              });

            axios.get('http://127.0.0.1:8000/module/') // Replace with your actual endpoint to fetch modules
              .then((response) => {
                setModules(response.data);
              })
              .catch((error) => {
                console.error('Error fetching modules:', error);
              });
          }, []);


    const handleSubmit = (event) => {
        event.preventDefault();


        axios.post('http://127.0.0.1:8000/grade/', {
          student: selectedStudent,
          module: selectedModule,
          grade: Grade,
        })
        .then((response) => {
          console.log('Grade association successful:', response.data);

        })
        .catch((error) => {
          console.error('Error associating module with grade:', error);
        });
      };











    return(
        <div className="container">

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Fill In Course Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={7}>
                            <form onSubmit={handleSubmit}>
                                  <label htmlFor="student" className='fw-bold mb-1'>Select a Student:</label>
                                  <select  class="form-select" aria-label="Default select example"
                                    id="student"
                                    value={selectedStudent}
                                    onChange={(e) => setSelectedStudent(e.target.value)}
                                  >
                                    <option value="">-- Select a Student --</option>
                                    {grades.map((student) => (
                                      <option key={student.studentId} value={student.studentId}>
                                        {student.LastName} {student.FirstName}
                                      </option>
                                    ))}
                                  </select>
                                  <p></p>

                                  <label htmlFor="module" className='fw-bold mb-1'>Select a Module:</label>
                                  <select class="form-select" aria-label="Default select example"
                                    id="module"
                                    value={selectedModule}
                                    onChange={(e) => setSelectedModule(e.target.value)}
                                  >
                                    <option value="">-- Select a Module --</option>
                                    {modules.map((module) => (
                                      <option key={module.id} value={module.id}>
                                        {module.title} {/* Replace with the property that holds the module's name */}
                                      </option>
                                    ))}
                                  </select>
                                  <p></p>
                                  <div className="form-group" >
                                    <label>Grade</label>
                                    <input  class="form-control group " type="text" name="Grade" value={Grade} onChange={(e) => setGrade(e.target.value)  } />
                                </div>
                                 <p></p>
                                <ButtonToolbar>
                                  <Button type="submit" variant="primary" >Submit</Button>
                                  </ButtonToolbar>
                                </form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" type="submit" onClick={props.onHide} >
                        Close
                </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddGradeModal;