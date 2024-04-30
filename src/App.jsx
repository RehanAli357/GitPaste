import React, { useEffect } from 'react'
import Navigationbar from './Component/NavBar/Navigationbar'
import UserProfile from './Component/UserProfile/UserProfile'
import AllRoutes from './Routes/AllRoutes'
const App = () => {
  useEffect(() => {
    if (window.location.href.includes("easy-access")) {
      const userProfile = document.getElementsByClassName('User-Profile');
      if (userProfile.length > 0) {
        userProfile[0].style.display = "none";
      }
    }
  }, []);
  return (
    <>
      {
        window.location.href.includes("easy-access") ? '' :
          <>
            <Navigationbar />
            <UserProfile />
          </>
      }
      <AllRoutes />
    </>
  )
}

export default App