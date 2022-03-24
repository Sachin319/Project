import React from 'react';

const Footer = ()=>{
    const year = new Date().getFullYear();
    return(<>
      <center>  <p className='para' id="foot"> Copyright © {year   }</p></center>
    </>);
}
export default Footer;