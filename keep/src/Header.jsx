import React from 'react'
import logo from './logo/lo.jpg'
const Header =()=>{
    return<>
       {/* <div className='main_div'> */}
      <div className='head_div'>
      <img src={logo} alt="my pic" width="70" height="50" className="img1"></img>
      <h1 id="h1">sachin's keep</h1>
      </div>
    {/* </div> */}
    </>
}
export default Header;