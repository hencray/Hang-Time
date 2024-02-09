import React from "react";
import SignupForm from "./SignUpForm";
import useToken from "@galvanize-inc/jwtdown-for-react";
import "./App.css";
import Team from "./Team";
import FAQPage from "./FAQ";

export const Main = () => {
  const { token } = useToken();

  return (
    <div>
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:full lg:pb-28 xl:pb-32">
            <div className="px-4 mx-auto mt-10 max-w-7xl sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="max-w-lg mx-auto mb-8 text-center lg:max-w-md lg:mx-0 lg:text-left">
                <span className="inline-block px-2.5 py-0.5 font-semibold text-xs leading-5 text-primary bg-blue-100 rounded-md">
                  Hang-Time
                </span>
                <h2
                  className="mt-6 text-4xl font-bold leading-10 tracking-tight text-secondary md:text-6xl"
                  style={{ animation: "slideIn 0.5s ease-out" }}
                >
                  Unlimit your limited schedule
                </h2>
                <p
                  className="mt-6 tracking-wide
 sm:mt-5 sm:text-md sm:max-w-xl sm:mx-auto md:mt-5"
                >
                  Say goodbye to the conflicts of scheduling and welcome the joy
                  of cherished moments with Hang-Time; unlimit the schedules of
                  your life, from limited to limitless, bringing back precious
                  moments of friends, family, and colleagues back into your
                  life.
                </p>
                <div className="justify-center mt-6 lg:justify-start sm:flex"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/8">
          <img
            src={process.env.PUBLIC_URL + "/5839067.jpg"}
            alt=""
            className="object-cover w-full h-56 sm:h-72 md:h-96 lg:w-full lg:h-full"
          />
        </div>
      </div>
      <div className="text-right text-neutral-content">
        <a href="https://www.freepik.com/free-vector/hang-out-concept-illustration_17196749.htm#query=hang%20out&position=1&from_view=search&track=ais&uuid=7d7c0dc0-0e96-4e6b-ba71-af7b5a81c282">
          Image by storyset
        </a>
        on Freepik
      </div>

      {!token && <SignupForm />}
      {!token && <Team />}
      {!token && <FAQPage />}
    </div>
  );
};
