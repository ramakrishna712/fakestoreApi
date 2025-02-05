import { useState } from "react";

import { useCookies } from "react-cookie";

import { Link, useNavigate } from "react-router-dom";

export function FakestoreLogin(){
    const[userName,setUserName] = useState();
    const[cookies,setCookie,removeCookie] = useCookies(['username']);


    let navigate = useNavigate();

    function handleUserChange(e){
        setUserName(e.target.value);
    }

    function handleLoginClick(){
        setCookie('username',userName)
        navigate('/categories');
    }

    return(
        <div className="container-fluid col-12 col-md-6 col-sm-4  align-content-center align-items-center" style={{marginTop : "50px"}}>
            <div className="col-12 border border-2  p-3 "style={{boxShadow:"2px 2px 2px ",maxWidth:"500px"}} >
            <h2 className="bi bi-person fs-1 text-center">User Login </h2>
            <dl>
                <dt>User Name</dt>
                <dd><input className="form-control w-100 "type="text" placeholder="Name" onChange={handleUserChange} /></dd>
                <dt>Password</dt>
                <dd><input className="form-control w-100" placeholder="Password" type="password"/></dd>
            </dl>
            <button type="submit" onClick={handleLoginClick} className="btn btn-primary w-100 ">Login</button>
            <div>
                <Link to="/" >Back to Home</Link>
            </div>
            </div>
        </div>
    )


}