import "./Sidebar.css";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlineMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { API_URL } from "../api.js";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/user/admin/logout`, { withCredentials: true });
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
      setShow(false);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Unable to log out");
    }
  };

  const closeMenu = () => setShow(false);
  if (!isAuthenticated) return null;

  return (
    <>
      <aside className={show ? "sidebar show" : "sidebar"}>
        <NavLink to="/" className="sidebar-brand" onClick={closeMenu}>
          <img src="/logo.png" alt="ZeeCare" />
          <span>Care Admin</span>
        </NavLink>
        <p className="sidebar-label">WORKSPACE</p>
        <nav className="links" aria-label="Admin navigation">
          <NavLink to="/" end onClick={closeMenu}><TiHome /><span>Overview</span></NavLink>
          <NavLink to="/doctors" onClick={closeMenu}><FaUserDoctor /><span>Doctors</span></NavLink>
          <NavLink to="/doctor/addnew" onClick={closeMenu}><IoPersonAddSharp /><span>Add doctor</span></NavLink>
          <NavLink to="/admin/addnew" onClick={closeMenu}><MdAddModerator /><span>Add administrator</span></NavLink>
          <NavLink to="/messages" onClick={closeMenu}><AiOutlineMessage /><span>Messages</span></NavLink>
        </nav>
        <button className="sidebar-logout" onClick={handleLogout}><RiLogoutBoxRLine /><span>Log out</span></button>
      </aside>
      <button className="wrapper" aria-label="Toggle navigation" onClick={() => setShow(!show)}><GiHamburgerMenu className="hamburger" /></button>
      {show && <button className="sidebar-backdrop" aria-label="Close navigation" onClick={closeMenu} />}
    </>
  );
};

export default Sidebar;
