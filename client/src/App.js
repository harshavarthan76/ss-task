import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import {
//   ErrorBoundaryContext,
//   useErrorBoundary,
// } from "react-use-error-boundary";
import Users from './Components/Users/Users'
import ProductList from './Components/ProductList/ProductList'
import Dashboard from './Components/Dashboard/Dashboard';
import NavBar from './NavBar/NavBar.js';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import './App.css';
import Logout from './Components/Logout/Logout';

function App() {
  // const [error, resetErrorBoundary] = useErrorBoundary();
  useEffect(() => {
    console.log('...hi');
  }, []);

  // if (error) {
  //   return (
  //     // <div className="App">
  //     //   <h1>Something went wrong.</h1>
  //     //   <p>{error?.toString()}</p>
  //     //   <pre>{error?.componentStack}</pre>
  //     //   <button className="btn ss-btn" onClick={() => window.location.reload()}>Show feeds</button>
  //     // </div>
  //     <div>
  //       <p>{error.message}</p>
  //       <button onClick={resetErrorBoundary}>Try again</button>
  //     </div>
  //   );
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/login" component={Login} />
          <Route path="/users" component={Users} />
          <Route path="/products" component={ProductList} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

// useEffect(() => {
//   fetchData();
// }, [users.length, products.length])

// async function fetchData() {
//   const newUsers = await axios.get('/users');
//   console.log(newUsers.data);
//   setUsers(newUsers.data);

//   const newProducts = await axios.get('/products');
//   console.log(newProducts.data);
//   setProducts(newProducts.data);
// }


// function showData(data) {
//   console.log(data);
//   setactiveUser(data);
//   setShowForm(true);
//   console.log(showForm);
// }

// async function updateData(data) {
//   console.log(data);
//   const updateIndex = users.findIndex(user => user.id === data.id);
//   console.log(updateIndex);
//   users[updateIndex] = { ...users[updateIndex], ...data };
//   console.log(users);
//   setUsers([...users]);
//   const response = await axios.put(`/users/${data.id}`, {
//     name: data.name,
//     email: data.email,
//     age: data.age
//   });
//   console.log(response.data);
// }

// async function deleteData(data) {
//   console.log(data);
//   const deleteIndex = users.findIndex(user => user.id === data.id);
//   console.log(deleteIndex);
//   users.splice(deleteIndex, 1);
//   console.log(users);
//   setUsers([...users]);
//   const response = await axios.delete(`/users/${data.id}`);
//   console.log(response.data);
// }