import React,{Component} from 'react';
import {Modal, Col, Row, Form, Button} from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { updateGrade} from './GradeService';
import{ useState } from 'react';
import {ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';
import  { useEffect} from 'react';

const UpdateGradeModal = (props) => {


        const [grades,setGrades] = useState([]);
        const [Grade,setGrade] = useState([]);
        const [modules, setModules] = useState([]);
        const [selectedStudent, setSelectedStudent] = useState('');
        const [selectedModule, setSelectedModule] = useState('');

        useEffect(() => {
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


        axios.put('http://127.0.0.1:8000/grade/'+props.grade.id+'/', {
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
                        Update Module Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={5}>
                          <form onSubmit={handleSubmit}>
                                  <label htmlFor="module" className='fw-bold mb-1'>Select a Module:</label>
                                  <select  class="form-select" aria-label="Default select example"
                                    id="module"
                                    value={selectedModule}
                                    onChange={(e) => setSelectedModule(e.target.value)}
                                  >
                                    <option value="">-- Select a Module --</option>
                                    {modules.map((module) => (
                                      <option key={module.id} value={module.id} >
                                        {module.title}
                                      </option>
                                    ))}
                                  </select>
                                  <p></p>
                                  <div className="form-group" >
                                    <label>Grade</label>
                                    <input  class="form-control group " type="text" name="Grade" Value={Grade} defaultValue={props.grade.grade}
                                    onChange={(e) => setGrade(e.target.value)}  />
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
                <Button variant="danger" type="submit" onClick={props.onHide}>
                        Close
                </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default UpdateGradeModal;

