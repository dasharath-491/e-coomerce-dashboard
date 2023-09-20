import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const auth = sessionStorage.getItem("user")
    const navigate = useNavigate()

    const logout = () => {
        sessionStorage.clear()
        navigate("/signup")
    }

    return (
        <div>
            <img alt="logo" className="logo" src="https://yt3.googleusercontent.com/ytc/AOPolaQIStUG5uIiAdQyxr_WrYqI_FD2kTR2AzjYMEtDog=s900-c-k-c0x00ffffff-no-rj" />
            {auth ? <ul className="nav-ul">
                <li><Link to="/">Products</Link> </li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/login">Logout ({JSON.parse(auth).name})</Link></li>
            </ul>
                :
                <ul className="nav-ul nav-right">
                    <li> <Link to="/signup">SignUp</Link></li>
                    <li><Link to="/login">LogIn</Link></li>
                </ul>
            }
        </div>
    );
};

export default Nav;
