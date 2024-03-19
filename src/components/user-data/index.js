import React from "react";

function UserData({user}) {
    
  return (
   <div>
    {user && (
        <div>
          <p>Имя: {user.profile.name}</p>
          <p>Телефон: {user.profile.phone}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
   </div>
  );
}
export default UserData;