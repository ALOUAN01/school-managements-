import axios from 'axios';

export function getClass(){
  return axios.get('http://127.0.0.1:8000/classe/')
    .then(response => response.data)
}
export function getClassId(class_name){
  return axios.get('http://127.0.0.1:8000/classe/' + class_name + '/')
    .then(response => response.data)
}

export function deleteClass(Class_name) {
  return axios.delete('http://localhost:8000/classe/' + Class_name + '/', {
   method: 'DELETE',
   headers: {
     'Accept':'application/json',
     'Content-Type':'application/json'
   }
  })
  .then(response => response.data)
}

export function updateClass(Class_name, classe) {
  return axios.put('http://localhost:8000/classe/' + Class_name + '/', {
    Class_name:classe.Class_name.value,

  })
   .then(response => response.data)
}

