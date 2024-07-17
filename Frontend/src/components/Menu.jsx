import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { URL } from '../url';
import axios from 'axios';

const Menu = () => {
    const {user ,setUser} =useContext(UserContext) ;
    // const {setUser} =useContext(UserContext) ;

    const handleLogout = async ()=>{
        try{
         const res = await axios.get(URL+"/api/auth/logout",{withCredentials:true}) 
          // console.log(res.data);
          setUser(null);
        }catch(err){
          console.log(err)
        }
    }
  return (
    <div className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4">
    {!user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/login">Login</Link></h3>}
    {!user &&<h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/register">Register</Link></h3>}
    {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/profile/"+user._id}>Profile</Link></h3>}
    {user &&<h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/write">Write</Link></h3>}
    {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/myblogs/"+user._id}>My blogs</Link></h3>}
    {user &&<h3 
    onClick={handleLogout} 
    className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to='/'>logout</Link></h3>}

    </div>
  )
}

export default Menu
