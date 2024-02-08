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
    <div className="card text-bg-light mb-3">
      <h5 className="card-header text-center text-4xl text-black font-bold">
        Login
      </h5>
      <div className="card-body">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col items-center"
        >
          <div className="mb-3 form-control w-full max-w-xs">
            <label className="form-label text-black font-bold">Email:</label>
            <input
              name="username"
              type="text"
              className="input input-bordered w-full max-w-xs text-black font-bold"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="mb-3 form-control w-full max-w-xs">
            <label className="form-label text-black font-bold">Password:</label>
            <input
              name="password"
              type="password"
              className="input input-bordered w-full max-w-xs text-black font-bold"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div>
            <input
              className="btn btn-primary text-black font-bold"
              type="submit"
              value="Login"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
