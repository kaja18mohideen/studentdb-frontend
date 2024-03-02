import React, { useState, useEffect, useRef } from 'react'
import './styles.css'
import axios from 'axios'
import { Button, Modal, Table } from 'react-bootstrap'

const StudentList = () => {
  const defaultStudent = {
    name: '',
    age: '',
    class: ''
  }
  const [student, setStudent] = useState(defaultStudent)
  const [students, setStudents] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const nameRef = useRef()

  useEffect(() => {
    axios.get('https://kaja-db-stu.onrender.com/api/students')
      .then(res => {
        console.log(res)
        setStudents(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const changeHandler = (e) => {
    const { id, value } = e.target
    setStudent(prev => ({ ...prev, [id]: value }))
  }

  const handleDeleteStudent = (studentId) => {
    axios.delete(`https://kaja-db-stu.onrender.com//api/students/${studentId}`,)
      .then(res => setStudents(res.data))
      .catch(err => console.log(err))
  }

  const handleUpdateStudent = (studentId) => {
    const updatedStudent = students.find(student => student.id === studentId);
    setStudent(updatedStudent)
    setIsOpen(true)

  }

  function handleSaveStudent() {
    setIsOpen(true)
  }


  return (
    <>
      <div className='container' >
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center py-2 gap-2' >
            <button className='btn btn-primary' onClick={() => { window.history.back() }}>{'<<'}</button>
            <h2 style={{ margin: '0px' }} >Student List</h2>
          </div>
          <div className='d-flex gap-2 align-items-center'>
            <button onClick={handleSaveStudent} className='btn btn-primary' > Add New</button>
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Age</th>
              <th>Class</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              // <li key={student.id}>
              //   <span>{student.name}</span>
              //   <button className='btn btn-danger' onClick={() => handleDeleteStudent(student.id)}>Delete</button>
              //   <button className='btn btn-primary' onClick={() => handleUpdateStudent(student.id)}>Update</button>
              // </li>
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.class}</td>
                <td>
                  <div className='d-flex gap-2' >
                    <button className='btn btn-danger' onClick={() => handleDeleteStudent(student.id)}>Delete</button>
                    <button className='btn btn-primary' onClick={() => handleUpdateStudent(student.id)}>Update</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <MyModal open={isOpen} onHide={() => setIsOpen(prev => !prev)} size='Xl' data={student} setData={setStudent} students={students} setStudents={setStudents} changeHandler={changeHandler} defaultStudent={defaultStudent} />
    </>
  )
}

export default StudentList


function MyModal({ open, onHide, data, setData, changeHandler, students, setStudents, defaultStudent, ...props }) {

  return (
    <>
      <Modal {...props} show={open} onHide={() => onHide()} centered >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label for="name" className="form-label">Full Name</label>
            <input type="email" className="form-control" id="name" placeholder="Enter full name" value={data.name} onChange={changeHandler} />
          </div>
          <div className="mb-3">
            <label for="age" className="form-label">Age</label>
            <input type="number" className="form-control" id="age" placeholder="Enter age" value={data.age} onChange={changeHandler} />
          </div>
          <div className="mb-3">
            <label for="className" className="form-label">class</label>
            <input type="number" className="form-control" id="class" placeholder="Enter class" value={data.class} onChange={changeHandler} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            onHide()
          }}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            if (data.id) {
              axios.put(`https://kaja-db-stu.onrender.com//api/students/${data.id}`, data).then(res => {
                console.log(res.data)
                setStudents(res.data)
                setData(defaultStudent)
                onHide()
              }).catch(err => {
                onHide()
                console.log(err)
              })
            } else {
              axios.post('https://kaja-db-stu.onrender.com//api/students', data)
                .then(res => {
                  setStudents(prev => [...prev, ...res.data])
                  setData(defaultStudent)
                  onHide()
                })
                .catch(err => {
                  onHide()
                  console.log(err)
                })

            }
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
