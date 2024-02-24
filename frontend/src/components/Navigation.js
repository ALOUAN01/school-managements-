import React from 'react';
import "../App.css";
//import {Navbar} from 'react-bootstrap';
import logo from '../static/logo1.png';
import emsi from '../static/emsi.jpg';

 import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';
import {NavLink} from 'react-router-dom';

const Navigation = () => {
  return (



    <div>
        <Navbar  bg="dark" variant="dark" expand="lg" id="my-nav" >
          <Navbar.Brand className="logo" href="/">
                <img
                  src={logo}
                  width="300"
                  height="50"
                  className="d-inline-block align-center"
                  alt="React Bootstrap logo"
                />{' '}

            </Navbar.Brand>
          <Container>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/" width="40" height="50" >Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>



      <div  className='sidebar'>
          <CDBSidebar textColor="#fff" backgroundColor="#333" >
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                Navigate
              </a>
            </CDBSidebarHeader>

            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu >
                <NavLink exact to="/" activeClassName="activeClicked" >
                  <CDBSidebarMenuItem icon="university" className="sidebar-item">Home</CDBSidebarMenuItem>
                </NavLink>

                <NavLink exact to="/cardstudent" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="list" className="sidebar-item">Students List</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/manage" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="user" className="sidebar-item">Students</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/manage_staff" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="user" className="sidebar-item">Teachers</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/manage_course" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="book" className="sidebar-item">Modules</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/classroomlist" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="th" className="sidebar-item">Classroom</CDBSidebarMenuItem>
                </NavLink>




              </CDBSidebarMenu>
            </CDBSidebarContent>

            <CDBSidebarFooter style={{ textAlign: 'center' }}>
              <div
                style={{
                  padding: '20px 5px',
                }}
              >

                <img
                  src={logo}
                  width="250"
                  height="50"
                  className="d-inline-block align-center"
                  alt="React Bootstrap logo"
                />{' '}
              </div>
            </CDBSidebarFooter>
          </CDBSidebar>
    </div>
    </div>
  );
};

export default Navigation;