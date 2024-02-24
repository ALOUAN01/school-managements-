import React from 'react';
import {Modal, Col, Row, Form, Button } from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"




const AddClassModal = (props) => {



           const[title,setTitle] = useState("")
           const[description,setDescription] = useState("")
           const[teacher,setTeacher] = useState("")
           const[class_name,setClass_name] = useState("")
           const [errorMessage, setErrorMessage] = useState("");
           const navigate = useNavigate();

        const AddTeacherInfo = async () => {

            if (!class_name) {
            setErrorMessage("Please complete all required fields.....");
            return;
             }
            let formField = new FormData()

            formField.append('class_name', class_name)

             await axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/classe/',
                data: formField
            }).then((response) => {
                console.log(response.data)
                navigate('/classroomList')
                window.location.reload();

            })


}








    return(
        <div className="container">

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                       Add Classroom
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={7}>
                            <div className="form-group">
 {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                <div className="form-group">
                                    <label>Class Name</label>
                                    <input  class="form-control group "  type="text" name="class_name" value={class_name} onChange={(e) => setClass_name(e.target.value)  } />
                                </div>



                                <div className="form-group">
                                    <p></p>
                                    <Button variant="primary" onClick={AddTeacherInfo}  >
                                      Submit
                                    </Button>

                                </div>
                            </div>
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

export default AddClassModal;