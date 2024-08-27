import { Button } from "antd"
import { Link } from "react-router-dom"
import "../App.scss"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { FilterProjects } from "./FilterProjects"
export const Header = () => {
    const [usertoken, setToken] = useState<string | undefined>("")
    useEffect(() => {
      const token = Cookies.get('token');
      setToken(token);
    },[])
  return (
    <div className="box-container">
        <h1 className="header-text">Mensa Test</h1>
        {usertoken ? (
            <div className="auth-container">
          <Button>
              <Link to="/logout">Logout</Link>
          </Button>
        <FilterProjects />
            </div>
        ): (
        <div className="auth-container">
        <Button>
            <Link to="/signup">SignUp</Link>
        </Button>
        <Button>
            <Link to="/login">Login</Link>
        </Button>
        </div>
        )}
    </div>
  )
}
