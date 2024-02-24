import React from 'react';
import {Modal, Col, Row, Form, Button } from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import{ useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"



const UpdateClassroomModal = (props) => {

    const[class_name,setclass_name] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
     axios
      .get(`http://127.0.0.1:8000/classe/${props.classe.id}/`)
      .then((response) => {
        const classeData = response.data;
        setclass_name(classeData.class_name);
             })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données ', error);
      });
  }, [props.classe.id]);

       const UpdateClassInfo = async () => {
            if (!class_name ) {
            setErrorMessage("Please complete all required fields.....");
            return;
        }
           const isConfirmed = window.confirm('Are you sure you want to update the Classroom information?');
            if (isConfirmed) {
            let formField = new FormData()
            formField.append('class_name', class_name)
            await axios({
                method: 'put',
                url: 'http://127.0.0.1:8000/classe/'+ props.classe.id + '/',
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
                        Update Student Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <div className="form-group">
                            {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                <div className="form-group" >
                                    <label>Class Name</label>
                                    <input  class="form-control group " type="text" name="class_name" value={class_name} onChange={(e) => setclass_name(e.target.value)  } />
                                </div>

                                  <div className="form-group">
                                    <p></p>
                                    <Button variant="primary" onClick={UpdateClassInfo}  >
                                      Submit
                                    </Button>

                                </div>
                            </div>
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


export default UpdateClassroomModal;

