
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import StudentInfo from "./components/Student/StudentInfo";
import Manage from "./components/Student/Manage";
import Manage_staff from "./components/Teacher/Manage_teacher";
import Dashboard from "./components/Dashboard";
import CardStudent from "./components/Student/CardStudent";
import ClassroomList from "./components/Classroom/ClassroomList";
import Manage_course from "./components/Course/Manage_course";
import Classroom from "./components/Classroom/Classroom";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Manage_grade from "./components/Grade/Manage_grade";
import ModuleInf from "./components/Course/ModuleInf";


function App() {
  return (
<BrowserRouter>
     <Navigation />
       <Routes>
         <Route exact path="/" element={<Home/>} />
         <Route path="/dashboard" element={<Dashboard/>} />
         <Route path="/cardstudent" element={<CardStudent/>} />
         <Route path="/manage" element={<Manage/>} />
         <Route path="/manage_staff" element={<Manage_staff/>} />
         <Route path="/manage_course" element={<Manage_course/>} />
         <Route path="/classroomlist" element={<ClassroomList/>} />
         <Route path="/classroom/:class_name" element={<Classroom/>}/>
         <Route path="/StudentInfo/:studentid" element={<StudentInfo/>}/>
         <Route path="/ModuleInf/:moduleid" element={<ModuleInf/>}/>




       </Routes>
</BrowserRouter>

  );
}

export default App;
