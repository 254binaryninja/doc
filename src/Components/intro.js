import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/intro.css";

const Intro = () => {
  const navigate = useNavigate();

  const startChat = () => {
    navigate("/chat"); // Redirect to the chatbot page
  };

  return (
    <section className="intro">
      <h2>Welcome to our Mental Health Chatbot</h2>
      <p>We understand that life can be challenging, and sometimes it's hard to navigate things on your own. Chat Doctor is here to listen, support, and guide you through tough moments. Whether you're feeling overwhelmed, anxious, or just need someone to talk to, you're not alone.</p>
      <p>Our chatbot is designed to offer a safe, non-judgmental space to explore your feelings, learn coping strategies, and find the peace of mind you deserve. Take your time, and know that we're here whenever you're ready.</p>
      <p>Feel free to start by sharing what’s on your mind or asking any questions you might have!</p>
      <button onClick={() => (window.location.href = 'https://my-doctor-blue.vercel.app/')}>Start Chat</button>

 

    </section>
  );
};

export default Intro;
