import React,{useState} from 'react'
import Header from './Header'
import TextA from './TextA'  
import Footer from './Footer'
import Card from './Card'

const App =()=>{

  const[data,newdata]=useState([])
  
  const addnote=(state)=>{
    // alert("i m cliced");
    newdata((predata)=>{
      return[...predata,state]
    })
  }

  const del=(id)=>{
    newdata((oldvalue)=>{
      oldvalue.filter((crrdata,index)=>{
        return index!==id;
      })
    })
  }
  return(<>
    <Header/>
    <TextA passnote={addnote} />
    {data.map((val,index)=>{
      return <Card 
        key={index}
        id={index}
        title={val.title}
        content={val.content}
        delete={del}
      />
    })}
    
    <Footer />
    
  </>

  );
}
export default App;