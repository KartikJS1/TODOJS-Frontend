import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../index'
import toast from 'react-hot-toast';
import axios from 'axios';

const Header = () => {

    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

    const logoutHandler = async (e) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${server}/users/logout`, {
                withCredentials: true,
            });

            toast.success("Logged Out Successfully");
            setIsAuthenticated(false);
            setLoading(false);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Invalid email or password");
            }
            setIsAuthenticated(true);
            setLoading(false);
        }
    };


    return (
        <nav className='header'>
            <div>
                <h2>Todo AppJS.</h2>
            </div>
            <article>
                <Link to={"/"}>Home</Link>
                <Link to={"/profile"}>Profile</Link>
                {
                    isAuthenticated ? <button disabled={loading} onClick={logoutHandler} className='btn'>Logout</button>
                        : <Link to={"/login"}>Login</Link>
                }


            </article>

        </nav>
    )
}

export default Header