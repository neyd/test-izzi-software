import React from 'react'

const Logotype = () => {
    return(
      <div className="logotype">
        IZZI Software
      </div>
    )
  }
  
  const UserBlock = ({user}) => {
    return(
      <div className="user-block">
        {user}
      </div>
    )
  }
  
  const Header = ({user}) => {
    return(
      <div className="header">
        <Logotype/>
        { user==null ? <div/> : <UserBlock user={user}/>}
      </div>
    )
  }

  export default Header