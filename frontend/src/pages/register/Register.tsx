import { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function Register() {

    const userName = useRef<HTMLInputElement | null>(null);
    const email = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);
    const passwordAgain = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    const handleClick = async (e: any) => {
        e.preventDefault();
        if (passwordAgain.current?.value !== password.current?.value) {
            passwordAgain.current?.setCustomValidity("Passwords don't match!");
        } else {
            const user = {
                userName: userName.current?.value,
                email: email.current?.value,
                password: password.current?.value,
            };
            try {
                await api().post('/auth/register', user);
                navigate("/login");
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Message io</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on Message io.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder="Username"
                            required
                            ref={userName}
                            className="loginInput"
                        />
                        <input
                            placeholder="Email"
                            required
                            ref={email}
                            className="loginInput"
                            type="email"
                        />
                        <input
                            placeholder="Password"
                            required
                            ref={password}
                            className="loginInput"
                            type="password"

                        />
                        <input
                            placeholder="Password Again"
                            required
                            ref={passwordAgain}
                            className="loginInput"
                            type="password"
                        />
                        <button className="loginButton" type="submit">
                            Sign Up
                        </button>
                        <button className="loginRegisterButton">Log into Account</button>
                    </form>
                </div>
            </div>
        </div>
    );
}