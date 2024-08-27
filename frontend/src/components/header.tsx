import { Button } from "antd"
import { Link } from "react-router-dom"
import "../App.scss"
export const Header = () => {
  return (
    <div className="box-container">
        <h1 className="header-text">Mensa Test</h1>
        <div className="auth-container">
        <Button>
            <Link to="/signup">SignUp</Link>
        </Button>
        <Button>
            <Link to="/login">Login</Link>
        </Button>
        </div>
    </div>
  )
}
