import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { CircleAlert } from 'lucide-react'

export default function DeleteModal({ show, onHide, data, fetchStudents }) {
  const handleDelete = async () => {
    await fetch(
      `https://nadsoft-api.vercel.app/v1/students/deleteById/${data.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    fetchStudents()
    onHide(!show)
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className=" d-flex  flex-column justify-content-center align-items-center">
        <CircleAlert color="yellow" size="100px" />
        <h3>Are you sure?</h3>
        <p>If you delete this member then this action can not be undone</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button onClick={handleDelete}>Yes, delete it!</Button>
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
