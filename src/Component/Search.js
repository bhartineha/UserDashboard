import React, { useState, useEffect } from 'react';

function Search() {

  const [searchData, setSearchData] = useState("");

  const [userData, setUserData] = useState([]);

  const [sortData, setsortData] = useState("");
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            setUserData(data)
            console.log(data);
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });
}, [])
  const handleOnChange = e => {
    setSearchData(e.target.value);
  };
 
  const handleSort = e => {
    setsortData(e.target.value);
  };

  const sortByName = () => {
    const sorted = [...userData].sort((a, b) => {
      return b.data.name - a.data.name;
    });
    setsortData(sorted);
  };

  return (
    <div className="search">
        <div>
            <label>Search</label>
                <input type="text" className="form-control" value={searchData}
                onChange={handleOnChange} placeholder="Search" aria-label="Username" aria-describedby="basic-addon1"></input>
        </div>
      
      <br/>
      <div>
      <label>Sort By</label>
      <select className="form-select" onChange={sortByName}>
        <option value={sortData}>Name</option>
        {/* <option >Name</option>
        <option >UserName</option>
        <option >email</option> */}
      </select>
      </div>

      <div className="userlist" style={{ marginTop: "2rem" }}>

        <ul className="list-group" >
          {console.log(userData)}
          {/* {userData.sort((a, b) => {
            const diff = a.data.name - b.data.name;

            if(diff === 0) return 0;

            const sign = Math.abs(diff)
 
          })} */}
          {userData.filter((data) => {
            if(searchData == ""){
              return data
            }else if(data.name.toLowerCase().includes(searchData.toLowerCase()) || data.username.toLowerCase().includes(searchData.toLowerCase()) || data.email.toLowerCase().includes(searchData.toLowerCase())){
              return data
            }
          })
          .map((data, id) => {
            return <li key={id} className="list-group-item" >
              <div className="circle">
                <span className="dot"></span>
              </div>
              <span>{data.name}</span><br />
              <span>{data.username}</span><br />
              <span><a href="mailto:neha@gmail.com" className="email-cls">{data.email}</a></span>

            </li>

          })}
        </ul>

        </div>
      {/* <UserList /> */}
    </div>
  );
}

export default Search;
