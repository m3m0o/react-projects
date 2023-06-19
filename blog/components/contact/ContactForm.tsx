import React, { useState, useEffect } from 'react';

import Notification from '../UI/Notification';

import styles from './styles/ContactForm.module.css';

const sendContactData = async (
  name: string,
  email: string,
  message: string
): Promise<void> => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      message,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || 'Something went wrong.');
};

const ContactForm = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');

  const [requestStatus, setRequestStatus] = useState('');
  const [requestError, setRequestError] = useState('');

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus('');
        setRequestError('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const sendMessageHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setRequestStatus('pending');

    try {
      await sendContactData(enteredEmail, enteredEmail, enteredMessage);
    } catch (error) {
      setRequestStatus('error');
      setRequestError(error.message);
    }

    setRequestStatus('success');

    setEnteredName('');
    setEnteredEmail('');
    setEnteredMessage('');
  };

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: "Your message is on it's way",
    };
  }

  if (requestStatus === 'pending') {
    notification = {
      status: 'success',
      title: 'Success',
      message: 'Message sent successfully',
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error',
      message: "Your message is on it's way",
    };
  }

  return (
    <section className={styles.contact}>
      <h1>How can I help you?</h1>

      <form className={styles.form} onSubmit={sendMessageHandler}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor='email'>Your E-mail</label>
            <input
              type='email'
              id='email'
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>

          <div className={styles.control}>
            <label htmlFor='name'>Your Name</label>
            <input
              type='text'
              id='name'
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea
            id='message'
            rows={5}
            required
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          />
        </div>

        <div className={styles.actions}>
          <button>Send Message</button>
        </div>
      </form>

      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
