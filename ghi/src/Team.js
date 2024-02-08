import React from "react";

function Team() {
  return (
    <section className="flex items-center xl:h-screen">
      <div className="justify-center flex-1 px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
        <div className="flex flex-wrap">
          <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
            <div className="mb-10 lg:max-w-lg lg:mb-0">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-blue-600 bg-blue-100 rounded-md dark:bg-gray-700 dark:text-gray-400">
                Team
              </span>

              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Meet the Minds Behind Hang-Time
              </h2>

              <p className="mb-6 leading-loose">
                Our story started with a hunch: to make planning an event with
                friends, family, colleagues easy, more fun. Born from
                innovation, Hang-Time has been powering a team of amazing
                developers and event planners. Get to meet the passionate team
                behind reshaping the way we can come together and celebrate.
              </p>
            </div>
          </div>

          <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
            <div className="flex flex-wrap -mx-4">
              <TeamMember
                name="Mark Giampa"
                role="Software Engineer"
                imgSrc={process.env.PUBLIC_URL + "/mark.png"}
              />

              <TeamMember
                name="Henry Martija"
                role="Software Engineer"
                imgSrc={process.env.PUBLIC_URL + "/henry.jpeg"}
              />
              <TeamMember
                name="Christian Ramos"
                role="Software Engineer"
                imgSrc={process.env.PUBLIC_URL + "/christian.jpeg"}
              />

              <TeamMember
                name="John Romua"
                role="Software Engineer"
                imgSrc={process.env.PUBLIC_URL + "/john.png"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamMember({ name, role, imgSrc }) {
  return (
    <div className="w-full px-4 mb-10 text-center lg:w-1/2 sm:w-1/2">
      <div className="inline-block mb-3 overflow-hidden text-xs text-white bg-blue-500 rounded-full w-44 h-44 sm:w-64 sm:h-64">
        <img
          className="object-cover w-full h-full transition-all hover:scale-110"
          src={imgSrc}
          alt=""
        />
      </div>
      <h2 className="text-xl font-bold dark:text-gray-400">{name}</h2>
      <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">{role}</p>
    </div>
  );
}

export default Team;
