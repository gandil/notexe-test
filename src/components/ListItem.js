import React from 'react'
import {Link} from 'react-router-dom'

let getContent = (note)=>{
  let lines = note.body.split('\n');
  lines.shift(); // This will remove the first line
  let text = lines.join('\n');

  text = text.replace(/\n/g, ' '); // This will replace all '\n' with a space
  if (text.length > 45){
    return text.slice(0, 45); // This will slice the text down to the length of 45
  } else {
    return text
  }
  
}

let getDate = (note)=>{
  return new Date(note.updated).toLocaleDateString()
}
let getTitle = (note)=>{
  const title = note.body.split('\n')[0]
  if (title.length > 45){
    return title.slice(0,45)
  }
  return title
}
const ListItem = ({note}) => {
  return (
    <Link to={`/note/${note.id}`}>
        <div className='notes-list-item'>
          <h3>{getTitle(note)}</h3>
          <p><span>{getDate(note)}</span> <span>{getContent(note)}</span></p>
        </div>
        
    </Link>
  )
}

export default ListItem