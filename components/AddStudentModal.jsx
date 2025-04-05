import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Stack } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
export default function AddStudentModal({ show, onHide, fetchStudents }) {
  const [data, setData] = useState({
    name: { value: '', errorMessage: '', error: false },
    email: { value: '', errorMessage: '', error: false },
    age: { value: '', errorMessage: '', error: false },
    math: { value: '', errorMessage: '', error: false },
    science: { value: '', errorMessage: '', error: false },
    english: { value: '', errorMessage: '', error: false },
  })

  const validateForm = () => {
    let isValid = true
    const updatedData = { ...data }

    Object.keys(updatedData).forEach((key) => {
      const value = updatedData[key].value.trim()

      if (value === '') {
        updatedData[key].error = true
        updatedData[key].errorMessage = `${key} is required`
        isValid = false
      } else if (key === 'email' && !/\S+@\S+\.\S+/.test(value)) {
        updatedData[key].error = true
        updatedData[key].errorMessage = 'Invalid email'
        isValid = false
      } else if (
        ['math', 'science', 'english', 'age'].includes(key) &&
        isNaN(value)
      ) {
        updatedData[key].error = true
        updatedData[key].errorMessage = `${key} must be a number`
        isValid = false
      } else {
        updatedData[key].error = false
        updatedData[key].errorMessage = ''
      }
    })

    setData(updatedData)
    return isValid
  }

  const handleSubmit = async () => {
    try {
      if (validateForm()) {
        const mapData = {
          name: data.name.value,
          email: data.email.value,
          age: Number(data.age.value),
          math: Number(data.math.value),
          science: Number(data.science.value),
          english: Number(data.english.value),
        }
        console.log(mapData)
        await fetch(`https://nadsoft-api.vercel.app/v1/students/addStudent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mapData),
        })
        fetchStudents()
        onHide(!show)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Student
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className=" d-flex  flex-column justify-content-center align-items-center">
        <Stack gap={2}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter student name"
                onChange={(e) =>
                  setData({
                    ...data,
                    name: { ...data.name, value: e.target.value },
                  })
                }
              />
              {data.name.error && (
                <Form.Text className="text-muted">
                  {data.name.errorMessage}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Student Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter student email"
                onChange={(e) =>
                  setData({
                    ...data,
                    email: { ...data.email, value: e.target.value },
                  })
                }
              />
              {data.email.error && (
                <Form.Text className="text-muted">
                  {data.email.errorMessage}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Student Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter student age"
                onChange={(e) =>
                  setData({
                    ...data,
                    age: { ...data.age, value: e.target.value },
                  })
                }
              />
              {data.age.error && (
                <Form.Text className="text-muted">
                  {data.age.errorMessage}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Math Subject Marks</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter mathematics marks"
                onChange={(e) =>
                  setData({
                    ...data,
                    math: { ...data.math, value: e.target.value },
                  })
                }
              />
              {data.math.error && (
                <Form.Text className="text-muted">
                  {data.math.errorMessage}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Science Subject Marks</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter science marks"
                onChange={(e) =>
                  setData({
                    ...data,
                    science: { ...data.science, value: e.target.value },
                  })
                }
              />
              {data.science.error && (
                <Form.Text className="text-muted">
                  {data.science.errorMessage}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>English Subject Marks</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter english marks"
                onChange={(e) =>
                  setData({
                    ...data,
                    english: { ...data.english, value: e.target.value },
                  })
                }
              />
              {data.english.error && (
                <Form.Text className="text-muted">
                  {data.english.errorMessage}
                </Form.Text>
              )}
            </Form.Group>
          </Form>
        </Stack>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button onClick={handleSubmit}>Add Student</Button>
        <Button
          variant="danger"
          onClick={() => {
            onHide(!show)
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
