import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Fetch() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    getData();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },[]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:5000/fetchAll');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Error while fetching data:', error);
      setData([]); 
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        getData();
      } else {
        console.error('Failed to delete data:', response);
      }
    } catch (error) {
      console.error('Error while deleting data:', error);
    }
  };

  const handleScroll = () => {
    const isAtBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (isAtBottom) {
      loadMoreData();
    }
  };

  // Filtering logic for search bar
  let filteredData = data;
  if (searchQuery.length >= 3) {
  filteredData = data.filter(
    (val) =>
      val.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      val.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      val.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      val.address.toLowerCase().includes(searchQuery.toLowerCase())
  )};

  const loadMoreData = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Combine data from previous pages and the current page
  const currentItems = filteredData.slice(0, currentPage * itemsPerPage);

  return (
    <>
      <div className='container my-5'>
        <div className='container'>
          <div className='row justify-content-between'>
            <div className='col-4'>
              <Link to={"/register"}>
                <button className='btn btn-success' >Add +</button>
              </Link>
            </div>
            <div className='col-4'>
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search...'
                className='form-control border-2 bg-light my-3'
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <h1 className='text-success text-center'>Fetch All Details</h1>
          <table className='table'>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((val, ind) => (
                  <tr key={ind}>
                    <th>{ind + 1}</th>
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>{val.mobile}</td>
                    <td>{val.address}</td>
                    <td>
                      <button
                        className='btn btn-danger'
                        onClick={() => deleteData(val._id)}
                      >
                        Delete
                      </button>
                      <Link to={"/update/" + val._id}>
                        <button
                          className='btn btn-warning'
                          style={{ marginLeft: '10px' }}
                        >
                          Update
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th colSpan={6} className='text-center text-danger'>
                    No matching data found.
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Fetch;
