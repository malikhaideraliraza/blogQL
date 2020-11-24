import React from 'react';
import { Link, useHistory } from "react-router-dom";

//ants assets/components
import { Layout, Menu } from 'antd';

// styles
import './navbar.css';

const { Header } = Layout;

const Navbar = () => (
  <Header>
    <Link to="/"> <span>BlogQL</span> </Link>
      { localStorage.getItem("userId") ? <AuthMenu /> : <AppMenu /> }
  </Header>
);

export default Navbar;

const AppMenu = () => (
  <Menu theme="dark" mode="horizontal" >
    <Menu.Item key="1"><Link to="/signup">Sign Up</Link></Menu.Item>
    <Menu.Item key="2"><Link to="/signin">Sign In</Link></Menu.Item>
 </Menu>
)

const AuthMenu = () => {
  let history = useHistory();

  const handleLogOut = () => {
    localStorage.removeItem("userId")
    history.push('/')
  }

  return (
    <Menu theme="dark" mode="horizontal" >
      <Menu.Item key="1"><Link to="/create-post">Create Post</Link></Menu.Item>
      <Menu.Item key="2" onClick={handleLogOut} >Log Out</Menu.Item>
    </Menu>
  );
}
