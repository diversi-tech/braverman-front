import React from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope, FaComments } from 'react-icons/fa';

const ContactOptions = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      <a href="https://wa.me/0548559840" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp size={30} />
      </a>
      <a href="tel:+123456789">
        <FaPhone size={30} />
      </a>
      <a href="mailto:chagit0548559840@gmai.com">
        <FaEnvelope size={30} />
      </a>
      <a href="path/to/chat/page">
        <FaComments size={30} />
      </a>
    </div>
  );
}

export default ContactOptions;