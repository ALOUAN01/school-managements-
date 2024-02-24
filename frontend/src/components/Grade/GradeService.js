import axios from 'axios';

export function getGrade(){
  return axios.get('http://127.0.0.1:8000/grade/')
    .then(response => response.data)
}


export function deleteGrade(id) {
  return axios.delete('http://localhost:8000/grade/' + id + '/', {
   method: 'DELETE',
   headers: {
     'Accept':'application/json',
     'Content-Type':'application/json'
   }
  })
  .then(response => response.data)
}
export function deleteAbsence(id) {
  return axios.delete('http://localhost:8000/absence/' + id + '/', {
   method: 'DELETE',
   headers: {
     'Accept':'application/json',
     'Content-Type':'application/json'
   }
  })
  .then(response => response.data)
}

export function updateGrade(id, grade) {
  return axios.put('http://localhost:8000/grade/' + id + '/', {


    grade:grade.grade.value,

  })
   .then(response => response.data)
}

