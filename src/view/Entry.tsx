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
    <li id={id} className={(strike)?"check todo-li":"todo-li"} onClick={() => {setStrike(!strike); onSelect(id)}}>
      <span className="todo-span" onClick={(event) => {onDelete(id); event.stopPropagation()}}>
        <i className="fa fa-trash"></i>
      </span>
      {text}
    </li>
  );
}

export default Entry;
