import { useRef } from "react";
import "./login.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const email = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);
    const { login }: any = useAuth();
    const navigate = useNavigate();
    const handleClick = (e: any) => {
        e.preventDefault();
        login({ email: email.current?.value, password: password.current?.value });
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Facebook</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on Facebook.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder="Email"
                            type="email"
                            required
                            className="loginInput"
                            ref={email}
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            required
                            className="loginInput"
                            ref={password}
                        />
                        <button className="loginButton" type="submit" >
                            Log In
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton" onClick={() => { navigate('/register') }}>
                            Create a New Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}