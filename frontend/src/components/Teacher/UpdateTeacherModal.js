import React from 'react';
import {Modal, Col, Row, Form, Button } from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import{ useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"



const UpdateTeacherModal = (props) => {

           const[image,setImage] = useState(null)
           const[FirstName,setFirstName] = useState("")
           const[LastName,setLastName] = useState("")
           const[Email,setEmail] = useState("")
           const[Nbr_group,setNbr_group] = useState("")
           const[diploma,setdiploma] = useState("")
           const[state,setstate] = useState("")
           const navigate = useNavigate();

           const [errorMessage, setErrorMessage] = useState("");



        useEffect(() => {

           axios
          .get(`http://127.0.0.1:8000/teachers/${props.teacher.teacherid}/`)
          .then((response) => {
            const studentData = response.data;
            setFirstName(studentData.FirstName);
            setLastName(studentData.LastName);
            setEmail(studentData.Email);
            setNbr_group(studentData.Nbr_group);
            setdiploma(studentData.diploma);
            setstate(studentData.state);


          })
          .catch((error) => {
            console.error('Erreur ', error);
          });
      }, [props.teacher.teacherid]);




          const AddTeacherInfo = async () => {

             if (!FirstName || !LastName || !Email || !Nbr_group || !diploma || !state) {
            setErrorMessage("Please complete all required fields.....");
            return;
        }
            const isConfirmed = window.confirm('Are you sure you want to update the teacher information?');
            if (isConfirmed) {

            let formField = new FormData()
            formField.append('FirstName', FirstName)
            formField.append('LastName', LastName)
            formField.append('Email', Email)
            formField.append('Nbr_group', Nbr_group)
            formField.append('diploma', diploma)
            formField.append('state', state)

            if(image !== null){
                formField.append('image', image)
            }
            await axios({
                method: 'put',
                url: 'http://127.0.0.1:8000/teachers/'+ props.teacher.teacherid + '/',
                data: formField
            }).then((response) => {
                console.log(response.data)
                navigate('/manage_staff')

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
                        Update TeacherInformation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={7}>
                            <div className="form-group">
                             {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                <div className="form-group" >
                                    <label>First Name</label>
                                    <input  class="form-control group " type="text" name="FirstName" value={FirstName} onChange={(e) => setFirstName(e.target.value)  } />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input  class="form-control group "  type="text" name="LastName" value={LastName} onChange={(e) => setLastName(e.target.value)  } />
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input  class="form-control group "  type="text" name="Email"  value={Email} onChange={(e) => setEmail(e.target.value)  } />
                                </div>
                                <div className="form-group">
                                    <label>Nbr group"</label>
                                    <input  class="form-control group "  type="text" name="Nbr_group" value={Nbr_group} onChange={(e) => setNbr_group(e.target.value)  } />
                                </div>
                                <div className="form-group">
                                    <label>diploma"</label>
                                    <input  class="form-control group "  type="text" name="diploma" value={diploma} onChange={(e) => setdiploma(e.target.value)  } />
                                </div>

                                <div className="form-group">
                                    <label>state</label>
                                    <input  class="form-control group "  type="text" name="state" value={state} onChange={(e) => setstate(e.target.value)  } />
                                </div>

                                <div className="form-group">
                                    <label>Image</label>
                                    <input  class="form-control group "  type="file" name="image"  onChange={(e) => setImage(e.target.files[0])  } />
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
                <Button variant="danger" type="submit" onClick={props.onHide}>
                        Close
                </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default UpdateTeacherModal;

