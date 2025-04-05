import React, { useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { Pencil, Trash2 } from 'lucide-react'
import DeleteModal from './DeleteModal'
import EditStudentModal from './EditStudentModal'
function DashboardCard({ data, fetchStudents }) {
  console.log(data)
  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const [editModalShow, setEditModalShow] = useState(false)
  const [modalData, setModalData] = useState({})
  const handleDelete = (student) => {
    setDeleteModalShow(true)
    setModalData(student)
  }
  const handleEdit = async (student) => {
    setEditModalShow(() => !editModalShow)
    const initializeData = async () => {
      if (Object.keys(student).length !== 0) {
        console.log(student)
        const data = await fetch(
          `https://nadsoft-api.vercel.app/v1/students/fetchById/${student.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const response = await data.json()
        return response
      }
    }
    const data = await initializeData()
    console.log(data)
    await setModalData(data.data[0])
  }

  if (data.length === 0) {
    return <h1>No data found</h1>
  }
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((student) => {
            const { id, name, email, age } = student

            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{age}</td>
                <td className="">
                  <Button
                    variant="outline-primary"
                    className="m-2"
                    onClick={() => handleEdit(student)}
                  >
                    <Pencil color="blue" />
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(student)}
                  >
                    <Trash2 color="red" />
                  </Button>
                </td>
              </tr>
            )
          })}
      </tbody>
      <tfoot>
        <DeleteModal
          show={deleteModalShow}
          onHide={setDeleteModalShow}
          data={modalData}
          fetchStudents={fetchStudents}
        />
        <EditStudentModal
          show={editModalShow}
          onHide={setEditModalShow}
          fetchStudents={fetchStudents}
          studentData={modalData}
        />
      </tfoot>
    </Table>
  )
}

export default DashboardCard
