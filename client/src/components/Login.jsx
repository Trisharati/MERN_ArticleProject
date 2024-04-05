import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginfunc } from "../redux/FormSlice";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Login = () => {
  localStorage.clear();

  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { username, password } = input;

  const dispatch = useDispatch();

  const textHandle = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true)
    const data = await dispatch(loginfunc({ input}));
    if (data) {
      setIsLoading(false)
      const tokenExpTime = Date.now() + 1 * 60 * 60 * 1000;
      localStorage.setItem("tokenExpTime", tokenExpTime);
      navigate('/dashboard')
    }
  };

  return (
    <div>
         {isLoading ? (
        <div style={{ position: "relative", top: "10%", left: "45%" }}>
          <p style={{ fontSize: 20, color: "#AE0000" }}>Loading...</p>
          <ClipLoader color={"#123abc"} loading={isLoading} size={100} />
        </div>
      ) : (
      <div
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1520121401995-928cd50d4e27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80")',
          backgroundSize: "cover",
          minHeight: "100vh",
        }}
      >
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  <strong>Login to Your World</strong>
                </h5>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={username}
                      onChange={textHandle}
                    />
                    <label htmlFor="floatingInput">Username</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={textHandle}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Login;
