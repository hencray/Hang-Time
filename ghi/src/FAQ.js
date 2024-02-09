import React from "react";

const FAQPage = () => {
  return (
    <div>
      <section className="flex items-center bg-base-200 lg:h-screen">
        <div className="justify-center flex-1 max-w-6xl px-4 py-4 mx-auto lg:py-6 md:px-6">
          <h2 className="text-6xl font-bold leading-10 tracking-tight text-secondary text-center mb-4">
            FAQ'S
          </h2>

          <div className="flex flex-wrap items-center justify-between mb-12 ">
            <div className="w-full mb-4 lg:w-1/2 lg:mb-0">
              <div className="lg:max-w-xl">
                <div className="collapse bg-base-200">
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title bg-primary text-primary-content text-bold peer-checked:bg-secondary peer-checked:text-secondary-content font-bold text-4xl">
                    Is this free?
                  </div>
                  <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                    <p>It's free free</p>
                  </div>
                </div>

                <div className="collapse bg-base-200 mt-4">
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title bg-primary text-primary-content text-bold peer-checked:bg-secondary peer-checked:text-secondary-content font-bold text-4xl">
                    How do I get started?
                  </div>
                  <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                    <ul>
                      <li>
                        <strong>Set Up User Availabilities:</strong> Access your
                        profile to mark your available days
                      </li>
                      <li>
                        <strong>Create Groups:</strong> Use the 'Create Group'
                        feature to form new groups. Provide a name and
                        description for the group.
                      </li>
                      <li>
                        <strong>Join Groups:</strong> Browse existing groups and
                        join the ones that match your interests or needs.
                      </li>
                      <li>
                        <strong>Create Events:</strong> Fill in the event
                        details for group members to see.
                      </li>
                      <li>
                        <strong>Attend Events:</strong> Respond to event
                        invitations by marking your attendance status to keep
                        other attendees updated.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="collapse bg-base-200 mt-4">
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title bg-primary text-primary-content text-bold peer-checked:bg-secondary peer-checked:text-secondary-content font-bold text-4xl">
                    I found a bug
                  </div>
                  <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                    <p>Thanks and please contact us so we can fix!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mb-4 lg:pl-11 lg:w-1/2 lg:mb-0">
              <div className="lg:h-96 h-1/2">
                <img
                  src={process.env.PUBLIC_URL + "/9918661.jpg"}
                  alt=""
                  className="object-cover w-full"
                />
                <a href="https://www.freepik.com/free-vector/problem-concept-illustration_82636913.htm#query=questions&position=12&from_view=author&uuid=ed9ee842-7367-418c-9635-6494e6178f40">
                  Image by storyset
                </a>{" "}
                on Freepik
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
