import React, { useState } from 'react';
import axios from 'axios';

const ChatForm = () => {
  const [lead, setLead] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    freeText: '',
    source: 'Chat'
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLead((prevLead) => ({
      ...prevLead,
      [name]: value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/lead/add-lead', lead);
      alert(response.data);
    } catch (error) {
      console.error('There was an error adding the lead!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={lead.firstName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={lead.lastName}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={lead.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={lead.phone}
        onChange={handleChange}
      />
      <textarea
        name="freeText"
        placeholder="Your Message"
        value={lead.freeText}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ChatForm;