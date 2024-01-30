import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const AddButton = () => {
  return (
    <Link to="/note/new" className='floating-button'>
        <FontAwesomeIcon icon={faPlus} />
    </Link>
  )
}

export default AddButton