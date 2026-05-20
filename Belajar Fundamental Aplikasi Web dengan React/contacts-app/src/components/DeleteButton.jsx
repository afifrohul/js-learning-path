import React from 'react';

function DeleteButton(props) {
  const { id, onDelete } = props;
  
  return <button className='contact-item__delete' onClick={() => onDelete(id)}>X</button>
}

export default DeleteButton;