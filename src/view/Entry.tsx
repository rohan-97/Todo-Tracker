import { useState } from "react";

interface props {
    id: string;
    text: String;
    onSelect: (id:any)=>void;
    onDelete: (id:any)=>void;
    isDone: boolean;
}

function Entry({onSelect, onDelete, id, text, isDone}:props) {
  const [strike, setStrike] = useState(isDone);

  return (
    <li id={id} className={(strike)?"check":""} onClick={() => {setStrike(!strike); onSelect(id)}}>
      <span onClick={() => {onDelete(id)}}>
        <i className="fa fa-trash"></i>
      </span>
      {text}
    </li>
  );
}

export default Entry;
