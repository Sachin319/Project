import React from 'react'


const Card=(props)=>{

const del2 =()=>{
    props.delete(props.id);
}
    return(<>

        <div className='crd'>
        <h5>{props.title}</h5><br />

        <p>{props.content}</p>
        {/* <div><button id="butt" onClick={del2}> -</button></div> */}
        

        </div>

    </>)
}
export default Card;
