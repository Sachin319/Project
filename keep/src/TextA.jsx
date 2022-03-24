import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const TextA = (props) => {
  const [state, setstate] = useState({
    title: "",
    content: "",
  });

  const sub = (e) => {
    const { name, value } = e.target;

    setstate((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const sub1 = () => {
    props.passnote(state);
    setstate({
      title: "",
      content: "",
    });
  };

  return (
    <>
      <div className="content">
        <input
          type="text"
          id="title"
          placeholder="Title"
          classname=""
          onChange={sub}
          name="title"
          value={state.title}
        ></input>
        <textarea
          rows=""
          id="textarea"
          column=""
          placeholder="Write a note..."
          onChange={sub}
          name="content"
          value={state.content}
        ></textarea>
        <Button id="button" onClick={sub1}>
          <AddIcon></AddIcon>
        </Button>
      </div>
    </>
  );
};
export default TextA;
