import slide01 from '../static/slide01.jpg'
import slide02 from '../static/slide02.jpg'
import slide033 from '../static/slide033.jpg'
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';


const Home = () => {
  return (

  <div className="row">
    <Carousel variant="dark" fade>

        <Carousel.Item>
          <div  >
            <img
              className="d-block w-100 "
              src={slide01}
              alt="First slide"
            />
              <Carousel.Caption class="carousesl">
               <div className="carousesl_txt">

                   <div class="cardR">
                   <Link to="/manage">
                      <button data-text="Awesome" class="buttonRR cityR">
                        <span class="actual-textRR">Manage_Student</span>
                        <span class="hover-textRR" aria-hidden="true">Manage_Student</span>
                   </button>
                   </Link>
                     <p class="weatherR">You can manage all student information </p>
                     <p class="weatherR"> Click on the Manage_Student to see more details </p>
                        <div class="minR">
                        </div>
                </div>
               </div>
             </Carousel.Caption>
          </div>
        </Carousel.Item>

      <Carousel.Item>

            <img
              className="d-block w-100"
              src={slide02}
              alt="First slide"
            />
             <Carousel.Caption class="carousesl">
               <div className="carousesl_txt">

                   <div class="cardR">
                   <Link to="/manage_staff">
                      <button data-text="Awesome" class="buttonRR cityR">
                        <span class="actual-textRR">Manage_Teachers</span>
                        <span class="hover-textRR" aria-hidden="true">Manage_Teachers</span>
                   </button>
                   </Link>
                     <p class="weatherR">You can manage all teachers information  </p>
                     <p class="weatherR"> Click on the Manage_Teachers to see more details </p>
                        <div class="minR">
                        </div>
                </div>
               </div>
             </Carousel.Caption>
          </Carousel.Item>

      <Carousel.Item>

            <img
              className="d-block w-100"
              src={slide033}
              alt="First slide"
            />
            <Carousel.Caption class="carousesl">
               <div className="carousesl_txt">

                   <div class="cardR">
                   <Link to="/classroomlist">
                      <button data-text="Awesome" class="buttonRR cityR">
                        <span class="actual-textRR">Manage_Class</span>
                        <span class="hover-textRR" aria-hidden="true">Manage_Class</span>
                   </button>
                   </Link>
                     <p class="weatherR">You can manage students and module  for each class   </p>
                     <p class="weatherR"> Click on the Manage_Class to see more details </p>
                        <div class="minR">
                        </div>
                </div>
               </div>
             </Carousel.Caption>

        </Carousel.Item>

    </Carousel>
    </div>

  );
};

export default Home;