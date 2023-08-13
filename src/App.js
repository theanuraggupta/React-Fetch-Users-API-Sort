import React, { useState } from "react";
import "./styles.css";

const APIURL = "https://jsonplaceholder.typicode.com/users";
function App() {
  const [users, setUsers] = useState([]);
  const [defaultUsers, setDefault] = useState([]);
  let [count, setCount] = useState(1);
  const getUsers = () => {
    //write code here
    //render the list of users
    fetch(APIURL)
      .then((res) => {
        return res.json();
      })
      .then((users) => {
        setUsers(users);
        setDefault(users);
        setCount(1);
      })
      .catch((error) => {
        console.log("An error occurred while getting users...");
      });
  };
  const sortList = (count) => {
    //write code here
    // sort the user list by name's length
    // on first click list will sorted in assending order
    // on second click list will be sorted in descending order
    // on third click default list will be rendered
    // on fourth click again start form step 1
    console.log("count", count);
    if (count === 4) {
      setCount(1);
      sortList(1);
    } else if (count === 3) {
      setUsers(defaultUsers);
      setCount(count + 1);
    } else {
      setUsers(
        Object.assign([], users).sort((a, b) => {
          return count === 1
            ? a.name > b.name
              ? 1
              : -1
            : a.name < b.name
            ? 1
            : -1;
        })
      );
      setCount((count += 1));
    }
  };

  return (
    <main>
      <h1>User List</h1>
      <div>
        <button onClick={getUsers}>Get Users</button>
        <button onClick={() => sortList(count)}>
          Sort list by name's length
        </button>
      </div>
      <ul>
        {users.map((user) => {
          return <li>{user.name}</li>;
        })}
      </ul>
    </main>
  );
}

export default App;
