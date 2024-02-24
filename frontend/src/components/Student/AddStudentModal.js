import React from 'react';
import {Modal, Col, Row, Form, Button } from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { addStudent } from './StudentService';
import{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const AddStudentModal = (props) => {


           const[image,setImage] = useState(null)
           const[FirstName,setFirstName] = useState("")
           const[LastName,setLastName] = useState("")
           const[Email,setEmail] = useState("")
           const[academic_level,setacademic_level] = useState("")
           const[class_name,setclass_name] = useState("")
           const[date_of_birth,setdate_of_birth] = useState("")
           const[Place_of_birth,setPlace_of_birth] = useState("")
           const[Gender,setGender] = useState("")
           const[address,setaddress] = useState("")
           const [errorMessage, setErrorMessage] = useState("");
           const navigate = useNavigate();

        const AddStudentInfo = async () => {
            if (!FirstName || !LastName || !Email || !academic_level || !date_of_birth || !Place_of_birth || !Gender || !address || !image) {
            setErrorMessage("Please complete all required fields.....");
            return;
        }
            let formField = new FormData()
            formField.append('FirstName', FirstName)
            formField.append('LastName', LastName)
            formField.append('Email', Email)
            formField.append('academic_level', academic_level)
            formField.append('date_of_birth', date_of_birth)
            formField.append('Place_of_birth', Place_of_birth)
            formField.append('Gender', Gender)
            formField.append('address', address)

            if(image !== null){
                formField.append('image', image)
            }
            await axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/students/',
                data: formField
            }).then((response) => {
                console.log(response.data)
                navigate('/manage')

            })
            window.location.reload();


}
       const handleBlur = (e) => {

        if (e.target.name === 'FirstName' && e.target.value.length < 3) {
            setErrorMessage("Le prénom doit contenir au moins 3 caractères.");
        }
        else
        setErrorMessage("");

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
                        Fill In Student Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <div className="form-group">
                            {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                <div className="form-group" >
                                    <label>First Name</label>
                                    <input  class="form-control group " type="text" name="FirstName" value={FirstName} onChange={(e) => setFirstName(e.target.value)  } onBlur={handleBlur}/>
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
                                    <label>academic_level"</label>
                                    <input  class="form-control group "  type="text" name="academic_level" value={academic_level} onChange={(e) => setacademic_level(e.target.value)  } />
                                </div>
                                <div className="form-group">
                                    <label>Year of Birth</label>
                                    <input  class="form-control group "  type="text" name="date_of_birth" value={date_of_birth} onChange={(e) => setdate_of_birth(e.target.value)  } />
                                </div>
                                <div className="form-group">
                                    <label>Place of Birth</label>
                                    <input  class="form-control group "  type="text" name="Place_of_birth" value={Place_of_birth} onChange={(e) => setPlace_of_birth(e.target.value)  } />
                                </div>
                                <div className="form-group">
                                    <label>Gender</label>
                                    <select className="form-control form-select"value={Gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input  class="form-control group "  type="text" name="address" value={address} onChange={(e) => setaddress(e.target.value)  } />
                                </div>
                                <div className="form-group">
                                    <label>Image</label>
                                    <input  class="form-control group "  type="file" name="image"  onChange={(e) => setImage(e.target.files[0])  } />
                                </div>
                                <div className="form-group">
                                    <p></p>
                                    <Button variant="primary" onClick={AddStudentInfo}  >
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

export default AddStudentModal;