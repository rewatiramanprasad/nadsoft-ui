import React from 'react'
import Pagination from 'react-bootstrap/Pagination'
function StudentPagination({ data, fetchStudents, setSearchParams }) {
  console.log('pagination', data)
  const handleFirst = async () => {
    setSearchParams({ page: 1, limit: 5 })
    fetchStudents()
  }
  const handleLast = async () => {
    setSearchParams({ page: data.totalPages, limit: 5 })
    fetchStudents(data.totalPages)
  }
  const handleNext = async () => {
    if (data.page < data.totalPages) {
      const page = data.page + 1
      setSearchParams({ page: page, limit: 5 })
      fetchStudents(page)
    }
  }
  const handlePrevious = async () => {
    if (data.page >= 2) {
      const page = data.page - 1
      setSearchParams({ page: page, limit: 5 })
      fetchStudents(page)
    }
  }
  return (
    <Pagination>
      <Pagination.First onClick={handleFirst}>First</Pagination.First>
      <Pagination.Prev onClick={handlePrevious}>Prev</Pagination.Prev>

      <Pagination.Next onClick={handleNext}>Next</Pagination.Next>
      <Pagination.Last onClick={handleLast}>Last</Pagination.Last>
    </Pagination>
  )
}

export default StudentPagination
