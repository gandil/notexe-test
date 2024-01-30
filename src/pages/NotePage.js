import React, {useEffect, useState} from 'react'
import {  useParams, useNavigate } from 'react-router-dom'
import {  Link } from 'react-router-dom'
// import notes from '../assets/data'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const NotePage = () => {
    const params = useParams()
    const navigate = useNavigate()
    let noteId = params.id    
 
    let [note, setNote] = useState(null)
    
    useEffect(()=>{
        getNote()
    }, [noteId])

    let getNote = async ()=>  {
        if (noteId === 'new') return
        let response = await fetch (`http://localhost:8000/notes/${noteId}`)
        let data = await response.json()
        setNote(data)
    }

    let createNote = async () => {
        await fetch(`http://localhost:8000/notes`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'                
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
        
        navigate('/')
    }
    let updateNote = async () => {
        await fetch(`http://localhost:8000/notes/${noteId}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'                
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        }
        )}

    let deleteNote = async () => {
        await fetch(`http://localhost:8000/notes/${noteId}`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json'                
            },
            body: JSON.stringify(note)
        })
        
        navigate('/')
    }

    let handleSubmit = ()=>{

        if (noteId !== 'new' && !note.body){
            deleteNote()
        } else if (noteId === 'new' && note.body !== null){
            createNote()
        } else {
            updateNote()
        }
        
        navigate('/')

    }
  return (
    <div className='note'>
        <span className='note-header'>
            <h3 >
                <Link to='/' onClick={handleSubmit}>
                <FontAwesomeIcon icon={faChevronLeft} />
                </Link>
            </h3>
            {noteId !== 'new'? (<button onClick={deleteNote}>Delete</button>):
            (<button onClick={handleSubmit}>Done</button>)}
            
        </span>
        <textarea value = {note? note?.body:''} onChange={(e)=>{setNote({...note, 'body': e.target.value})}} > </textarea>
    </div>
    
  )
}

export default NotePage