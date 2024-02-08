import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password); // Wait for login to complete
    navigate("/profile"); // Navigate to /profile
    e.target.reset();
  };

  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto">
      <form onSubmit={(e) => handleSubmit(e)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email:</span>
          </label>
          <input
            name="username"
            type="text"
            className="input input-bordered"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password:</span>
          </label>
          <input
            name="password"
            type="password"
            className="input input-bordered"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <div className="form-control mt-6">
          <input className="btn btn-primary" type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
