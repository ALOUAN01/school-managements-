import axios from 'axios';

export function getModule(){
  return axios.get('http://localhost:8000/module/')
    .then(response => response.data)
}
export function getTeachModule(){
  return axios.get('http://127.0.0.1:8000/teachmodule/')
    .then(response => response.data)
}

export function deleteModule(title) {
  return axios.delete('http://localhost:8000/module/' + title + '/', {
   method: 'DELETE',
   headers: {
     'Accept':'application/json',
     'Content-Type':'application/json'
   }
  })
  .then(response => response.data)
}

export function updateModule(title, course) {
  return axios.put('http://localhost:8000/module/' + title + '/', {
    teacher:course.teacher.value,
    module:course.module.value,

  })
   .then(response => response.data)
}

