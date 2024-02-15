import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { register } = useToken();
  const baseURL = process.env.REACT_APP_API_HOST;
  const handleRegistration = (e) => {
    e.preventDefault();
    const accountData = {
      first_name: first,
      last_name: last,
      username: email,
      email: email,
      password: password,
    };
    register(accountData, `${baseURL}/users`);
    e.target.reset();
    navigate("/profile");
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="mb-10 lg:max-w-lg lg:mb-0">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="Hang-Time"
            className="w-96 mx-auto mask mask-squircle"
          />
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            Get started with Hang-Time today
          </h1>
          <p className="mb-6 leading-loose">
            Join the revolution in event planning. Signup now to revolutionize
            how you plan events, how you participate. It's quick, it's easy, and
            best of all—it's free!
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={(e) => handleRegistration(e)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                name="first"
                type="text"
                className="input input-bordered"
                onChange={(e) => {
                  setFirst(e.target.value);
                }}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                name="last"
                type="text"
                className="input input-bordered"
                onChange={(e) => {
                  setLast(e.target.value);
                }}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">E-mail</span>
              </label>
              <input
                name="email"
                type="text"
                className="input input-bordered"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoComplete="new-email"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                className="input input-bordered"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoComplete="new-password"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
