// import { match } from 'assert'
import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {
    const {id : noteId} = useParams();

    const [note, setNote] = useState<any>(null)
    useEffect(() => {
        getNote()
    }, [noteId])

    const getNote = async () => {
        if (noteId === 'new') return
        const response = await fetch(`/api/notes/${noteId}/`)
        let data = await response.json()

        setNote(data)       
    }

    const deleteNote = async () => {
        fetch(`/api/notes/${noteId}/delete/`, {
            method:'DELETE',
            headers: {
                'Content-Type':'application/json'
            },
            // body:JSON.stringify(note)
        })
    }

    const createNote = async () => {
        fetch('http://127.0.0.1:8000/api/notes/create/', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(note)
        })
    }


    const updateNote = async () => {
        fetch(`/api/notes/${noteId}/update/`, {
            method:'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(note)
        })
    }

    const handleSubmit = () => {
        console.log('NOTE:', note)

        if (noteId !== 'new' && !note?.body) {
            deleteNote()
        } else if (noteId !== 'new') {
            updateNote()
        } else if (noteId === 'new' && note !== null) {
            createNote()

            console.log('CREATE NEW NOTE')
        }
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <Link to='/'>
                        <ArrowLeft onClick={handleSubmit} />                    
                    </Link>
                </h3>
                <Link to='/'>
                    {noteId !== 'new' ? (
                        <button onClick={deleteNote}>Delete</button>
                    ): 
                        <button onClick={handleSubmit}>Done</button>
                    }
                </Link>
                
            </div>
            <textarea onChange={(e)=> {
                setNote({...note, 'body':e.target.value})
            }} defaultValue={note?.body} />
        </div>
    )
}

export default NotePage
