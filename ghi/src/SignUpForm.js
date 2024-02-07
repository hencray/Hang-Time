import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

const SignupForm = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { register } = useToken();


  const baseURL = process.env.REACT_APP_API_HOST
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
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Signup</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleRegistration(e)}>
          <div className="mb-3">
            <label className="form-label">first</label>
            <input
              name="first"
              type="text"
              className="form-control"
              onChange={(e) => {
                setFirst(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">last</label>
            <input
              name="last"
              type="text"
              className="form-control"
              onChange={(e) => {
                setLast(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">email</label>
            <input
              name="email"
              type="text"
              className="form-control"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoComplete="new-email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="new-password"
            />
          </div>
          <div>
            <input className="btn btn-primary" type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
