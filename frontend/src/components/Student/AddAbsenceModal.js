import React from 'react';
import {Modal, Col, Row, Form, Button } from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import  { useEffect} from 'react';
import {ButtonToolbar } from 'react-bootstrap';


const AddAbsenceModal = (props) => {



        const [grades,setGrades] = useState([]);
        const [Grade,setGrade] = useState([]);
        const [modules, setModules] = useState([]);
        const [selectedStudent, setSelectedStudent] = useState('');
        const [selectedModule, setSelectedModule] = useState('');

        useEffect(() => {
            axios.get('http://127.0.0.1:8000/students/')
              .then((response) => {
               setGrades(response.data);
              })
              .catch((error) => {
                console.error('Error fetching student:', error);
              });

            axios.get('http://127.0.0.1:8000/module/')
              .then((response) => {
                setModules(response.data);
              })
              .catch((error) => {
                console.error('Error fetching modules:', error);
              });
          }, []);


    const handleSubmit = (event) => {
        event.preventDefault();


        axios.post('http://127.0.0.1:8000/absence/', {
          student: props.student.studentId,
          module: selectedModule,
          nbrH: Grade,
        })
        .then((response) => {
          console.log('Grade association successful:', response.data);
            window.location.reload();
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
                                    <label>hours of absence</label>
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

export default AddAbsenceModal;