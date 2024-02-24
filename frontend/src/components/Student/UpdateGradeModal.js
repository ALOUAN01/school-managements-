import React,{Component} from 'react';
import {Modal, Col, Row, Form, Button} from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { updateGrade} from '../Grade/GradeService.js';
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
       axios
      .get(`http://127.0.0.1:8000/grade/${props.gra.id}/`)
      .then((response) => {
        const gradeData = response.data;
        setGrade(gradeData.grade);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données ', error);
      });
  }, [props.gra.id]);
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://127.0.0.1:8000/grade/'+props.gra.id+'/', {
             grade: Grade,
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
                        Update Module Information {props.gra.id}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={5}>
                          <form onSubmit={handleSubmit}>

                                  <p></p>
                                  <div className="form-group" >
                                    <label>Grade</label>
                                    <input  class="form-control group " type="text" name="Grade" Value={Grade} onChange={(e) => setGrade(e.target.value)  }
                                      />
                                </div>
                                <p></p>
                                <ButtonToolbar>
                                  <Button type="submit" variant="primary" >Submit</Button>
                                  </ButtonToolbar>
                                    <p></p>
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

