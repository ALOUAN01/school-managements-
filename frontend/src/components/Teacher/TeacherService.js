import axios from 'axios';

export function getTeacher(){
  return axios.get('http://127.0.0.1:8000/teachers/')
    .then(response => response.data)
}

export function deleteTeacher(teacherid) {
  return axios.delete('http://127.0.0.1:8000/teachers/' + teacherid + '/', {
   method: 'DELETE',
   headers: {
     'Accept':'application/json',
     'Content-Type':'application/json'
   }
  })
  .then(response => response.data)
}

/*export function addStudent(student){
  return axios.post('http://127.0.0.1:8000/students/', {
    studentId:null,
    FirstName:student.FirstName.value,
    LastName:student.LastName.value,
    Email:student.Email.value,
    Group:student.Group.value,

  })
    .then(response=>response.data)
}*/

export function updateTeacher(teacherid, teacher) {
  return axios.put('http://127.0.0.1:8000/teachers/' + teacherid + '/', {
    FirstName:teacher.FirstName.value,
    LastName:teacher.LastName.value,
    Email:teacher.Email.value,
    Nbr_group:teacher.Nbr_group.value,
    diploma:teacher.diploma.value,
    state:teacher.state.value,


  })
   .then(response => response.data)
}

