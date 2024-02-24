import React from 'react';
import {Modal, Col, Row, Form, Button } from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import  { useEffect} from 'react';
import {ButtonToolbar } from 'react-bootstrap';


const AddCourseModal = (props) => {

           const [title, setTitle] = useState("");
           const [description, setDescription] = useState("");
           const navigate = useNavigate();
           const [errorMessage, setErrorMessage] = useState("");

    const AddModule = async () => {
           if (!title || !description ) {
            setErrorMessage("Please complete all required fields.....");
            return;
        }
            let formField = new FormData()
            formField.append('title', title)
            formField.append('description', description)
            await axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/module/',
                data: formField
            }).then((response) => {
                console.log(response.data)
                navigate('/Manage_course')

            })
            window.location.reload();


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
                        Fill In Course Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={7}>
                            <div className="form-group">
                            {errorMessage && <div className="text-danger">{errorMessage}</div>}

                                <div className="form-group">
                                    <label>Title</label>
                                    <input  class="form-control group "  type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)  } />
                                </div>
                                 <div className="form-group">
                                    <label>Description</label>
                                    <input  class="form-control group "  type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)  } />
                                </div>



                                <div className="form-group">
                                    <p></p>
                                    <Button variant="primary"  onClick={AddModule} >
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

export default AddCourseModal;