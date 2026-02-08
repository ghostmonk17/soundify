import React, { useState} from 'react';
import Input from '../common/Input';
import validator from "validator";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { clearError, setError, setLoading, setUser } from '../../redux/slices/authSlice';
import { closeAuthModal, switchAuthModal } from '../../redux/slices/uiSlice';
import "../../css/auth/Login.css";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // forgot password
    const [forgotEmail, setForgotEmail]=useState("");
    const [forgotMsg, setForgotMsg]=useState("");
    const [forgotLoading, setForgotLoading] = useState(false);


    const { isLoading, error } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const {authMode}= useSelector((state)=>state.ui);
    const isForgot= authMode === "forgot";
    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(clearError());

        if (!validator.isEmail(email)) {
            dispatch(setError("Please enter a valid email"));
            return;
        }

        if (!password) {
            dispatch(setError("Please enter your password"));
            return;
        }

        dispatch(setLoading(true));

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
                { email, password }
            );

            const data = res.data;

            dispatch(setUser({
                user: data.user,
                token: data.token
            }));

            localStorage.setItem("token", data.token);
            dispatch(closeAuthModal());
            console.log("Login Successful!");
        } catch (err) {
            const serverMessage =
                err?.response?.data?.message || "Login Failed";

            dispatch(setError(serverMessage));
        } finally {
            dispatch(setLoading(false));
        }
    };

   const handleForgotPassword = async () => {
  if (!validator.isEmail(forgotEmail)) {
    setForgotMsg("Please enter a valid email address");
    return;
  }

  try {
    setForgotLoading(true);
    setForgotMsg("Sending reset link...");

    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/auth/forgot-password`,
      { email: forgotEmail }
    );

    setForgotMsg("Reset link sent. Check your email 📩");
  } catch (error) {
    setForgotMsg(
      error?.response?.data?.message ||
      "Failed to send the reset link email"
    );
  } finally {
    setForgotLoading(false);
  }
};

    return (
        <div className="login-wrapper">
            <h3 className="login-title">Welcome Back</h3>
            <p className="login-subtitle">Please enter your details to login</p>

            <form className="login-form" onSubmit={handleLogin}>
                {!isForgot && (
                    <>
                <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                placeholder="johndoe@gmail.com"
                type="email"
            />

            <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Minimum 6 characters"
                type="password"
            />    
                    </>
                )}

                {/* forgot password ink */}
                <div className='forgot-wrapper'>
                    {!isForgot ? (
                        <>
                        <span className="forgot-link" onClick={()=>
                        {
                            dispatch(clearError());
                            dispatch(switchAuthModal("forgot"))
                        }
                        }>
                            Forgot Password?
                        </span>
                        <span className="forgot-link" onClick={()=>{
                            dispatch(clearError());
                            dispatch(switchAuthModal("signup"))
                        }}>Don't have an account? Signup</span>
                        </>
                    ) : (
                        <div className="forgot-box">
                            <Input label="Email" type="email"
                            placeholder="Enter your registred email"
                            value={forgotEmail}
                            onChange={(e)=>setForgotEmail(e.target.value)}/>

                            {forgotMsg && <p className='forgot-msg'>
                               {forgotMsg} </p>}

                            <button
                            type="button"
                             className="forgot-btn"
                            onClick={handleForgotPassword}
                              disabled={forgotLoading}
                                 >
                                    {forgotLoading ? "Sending..." : "Send the reset link"}
                            </button>

                        </div>
                    )}
                </div>
                {error && <div className="login-error">{error}</div>}
                {!isForgot && (
                    <button
                    type="submit"
                    className="login-submit-btn"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
                )}
            </form>
        </div>
    );
};

export default Login;
