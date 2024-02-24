import React,{Component} from 'react';
import {Modal, Col, Row, Form, Button} from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { updateModule} from './ModuleService';
import{ useState,useEffect } from 'react';
import {ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom"



const UpdateCourseModal = (props) => {



           const[title,setTitle] = useState("")
           const[description,setDescription] = useState("")
           const [errorMessage, setErrorMessage] = useState("");
           const navigate = useNavigate();


    useEffect(() => {
      axios
      .get('http://127.0.0.1:8000/module/'+props.module+'/')
      .then((response) => {
        const moduleData = response.data;
        setTitle(moduleData.title);
        setDescription(moduleData.description);


      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données ', error);
      });
  }, []);

       const UpdateModuleInfo = async () => {


            if (!title || !description) {
            setErrorMessage("Please complete all required fields.....");
            return;
        }
           const isConfirmed = window.confirm('Are you sure you want to update the teacher information?');
            if (isConfirmed) {
            let formField = new FormData()
            formField.append('title', title)
            formField.append('description', description)

            await axios({
                method: 'put',
                url: 'http://127.0.0.1:8000/module/'+props.module+'/',
                data: formField
            }).then((response) => {
                console.log(response.data)


            })
            window.location.reload();
      }
else return



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
                        Update Module Information{props.module}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={5}>
                          <form >
                            {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                <div className="form-group" >
                                    <label>Title</label>
                                    <input  class="form-control group " type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)  } />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input  class="form-control group "  type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)  } />
                                </div>
                                 <p></p>
                                    <Button variant="primary" onClick={UpdateModuleInfo}  >
                                      Submit
                                    </Button>
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


export default UpdateCourseModal;

