 const [searchQuery, setSearchQuery] = useState('');

// Filtering logic for search bar
  const filteredData = data.filter(
    (val) =>
      val.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      val.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      val.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      val.address.toLowerCase().includes(searchQuery.toLowerCase())
  );


// html code 

 <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search...'
                className='form-control border-2 bg-light my-3'
              />
