import React from 'react';
import {Modal, Col, Row, Form, Button } from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import  { useEffect} from 'react';
import {ButtonToolbar } from 'react-bootstrap';


const vvv = (props) => {



           const [teachers, setTeachers] = useState([]);
           const [modules, setModules] = useState([]);
           const [selectedTeacher, setSelectedTeacher] = useState('');
           const [selectedModule, setSelectedModule] = useState('');

        useEffect(() => {
            axios.get('http://127.0.0.1:8000/teachers/') // Replace with your actual endpoint to fetch teachers
              .then((response) => {
                setTeachers(response.data);
              })
              .catch((error) => {
                console.error('Error fetching teachers:', error);
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


        axios.post('http://127.0.0.1:8000/teachmodule/', {
          teacher: selectedTeacher,
          module: selectedModule,
        })
        .then((response) => {
          console.log('TeachModule association successful:', response.data);

        })
        .catch((error) => {
          console.error('Error associating module with teacher:', error);
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
                                  <label htmlFor="teacher" className='fw-bold mb-1'>Select a Teacher:</label>
                                  <select  class="form-select" aria-label="Default select example"
                                    id="teacher"
                                    value={selectedTeacher}
                                    onChange={(e) => setSelectedTeacher(e.target.value)}
                                  >
                                    <option value="">-- Select a Teacher --</option>
                                    {teachers.map((teacher) => (
                                      <option key={teacher.teacherid} value={teacher.teacherid}>
                                        {teacher.LastName} {teacher.FirstName}
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

export default vvv;