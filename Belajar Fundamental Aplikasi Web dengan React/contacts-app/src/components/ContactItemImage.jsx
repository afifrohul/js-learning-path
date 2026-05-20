import React from 'react';

function ContactItemImage(props) {
 const { imageUrl } = props;

 return (
   <div className="contact-item__image">
     <img src={imageUrl} alt="contact avatar"/>
   </div>
 );
}

export default ContactItemImage;