import React,{Component} from 'react';
import {Modal, Col, Row, Form, Button} from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { updateStudent } from './StudentService';



const Students = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        updateStudent(props.student.studentId, e.target)
        .then((result)=>{
            alert(result);
            props.setUpdated(true);
        },
        (error)=>{
            alert("Failed to Update Student");
        })
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
                        {props.student.FirstName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={5}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="FirstName">
                                    <Form.Label>First</Form.Label>
                                    <Form.Control type="text" name="FirstName"  defaultValue={props.student.FirstName}  />
                            </Form.Group>

                            <Form.Group controlId="LastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="LastName"  defaultValue={props.student.LastName}  />
                            </Form.Group>

                            <Form.Group controlId="Email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" name="Email"  defaultValue={props.student.Email}  />
                            </Form.Group>
                            <Form.Group controlId="Group">
                                    <Form.Label>Group</Form.Label>
                                    <Form.Control type="text" name="Group"  defaultValue={props.student.Group}  />
                            </Form.Group>
                            <Form.Group controlId="image">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="file" name="image"  />
                                </Form.Group>
                            <Form.Group>
                                <p></p>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form.Group>
                            </Form>
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


export default Students;

