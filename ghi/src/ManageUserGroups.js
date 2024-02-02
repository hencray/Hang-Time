import { useToken, useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import React from "react";

const UserGroupsForm = () => {
  const { setToken } = useAuthContext();
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState("");
  const [userGroups, setUserGroups] = useState("");

  const { token } = useToken();


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`name: ${groupName} description: ${groupDescription}`);
    e.target.reset();
  }

  const fetchUserGroups = async (e) => {

  }
};




// import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';
// import { useAuth } from './Apiauth';
// function CreateGroupPage() {
//   const { user, token } = useAuth();
//   const [groupName, setGroupName] = useState('');
//   const [groupDescription, setGroupDescription] = useState('');
//   if (!user) {
//     return <Redirect to="/login" />;
//   }
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const response = await fetch('http://localhost:8000/groups', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify({ name: groupName, description: groupDescription }),
//     });
//     if (response.ok) {
//       // Handle successful group creation here
//     } else {
//       // Handle errors here
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Group name:
//         <input type="text" value={groupName} onChange={e => setGroupName(e.target.value)} />
//       </label>
//       <label>
//         Group description:
//         <input type="text" value={groupDescription} onChange={e => setGroupDescription(e.target.value)} />
//       </label>
//       <button type="submit">Create group</button>
//     </form>
//   );
// }
// export default CreateGroupPage;
