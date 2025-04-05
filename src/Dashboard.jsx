import NavBar from '../components/NavBar'
import DashboardCard from '../components/DashboardCard'
import { Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import AddStudentModal from '../components/AddStudentModal'
import { useSearchParams } from 'react-router-dom'
import StudentPagination from '../components/Pagination'

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = useState([])
  const [responseData, setResponseData] = useState([])
  const [AddModalShow, setAddModalShow] = useState(false)
  const [error, setError] = useState('')
  const page = parseInt(searchParams.get('page')) || 1
  const limit = parseInt(searchParams.get('limit')) || 5

  const fetchStudents = async (page = 1, limit = 5) => {
    console.log('page', page)
    console.log('limit', limit)

    try {
      const data = await fetch(
        `https://nadsoft-api.vercel.app/v1/students/fetchStudents?page=${page}&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const response = await data.json()
      console.log('dashboard', response)
      if (response.success) {
        console.log(response)
        setResponseData(response.data[0])
        setData(response.data[0].students)
      } else {
        const error = response.message || 'something went wrong'
        throw new Error(error)
      }
    } catch (error) {
      console.error(error)
      setError(error)
    }
  }

  useEffect(() => {
    fetchStudents(page, limit)
  }, [page, limit])

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <div>
      <NavBar AddModalShow={AddModalShow} setAddModalShow={setAddModalShow} />
      <Card>
        <Card.Title className="p-2 fs-3">Dashboard</Card.Title>
        <Card.Body>
          <DashboardCard
            data={data}
            setData={setData}
            fetchStudents={fetchStudents}
          />
        </Card.Body>
        <Card.Footer>
          <div className="d-flex justify-content-between">
            <div>shows: {limit} entries</div>
            <div>
              <StudentPagination
                data={responseData}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                fetchStudents={fetchStudents}
              />
            </div>
          </div>
        </Card.Footer>
        <AddStudentModal
          show={AddModalShow}
          onHide={setAddModalShow}
          fetchStudents={fetchStudents}
        />
      </Card>
    </div>
  )
}

export default Dashboard
