import { useState, type SubmitEvent } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminContext/useAdminContext';
import styles from './AdminLoginPage.module.css';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [failMessage, setFailMessage] = useState('');
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useAdminAuth();

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (password === '') {
      setFailMessage('Ange lösenord');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/admin/login', { password });
      setLoggedIn(true);
      navigate('/admin');
    } catch (err) {
      const isWrongPassword =
        axios.isAxiosError(err) && err.response?.status === 401;
      setFailMessage(isWrongPassword ? 'Fel lösenord' : 'Något gick fel');
    }
  }

  if (loggedIn) {
    return (
      <Navigate
        to='/admin'
        replace
      />
    );
  }

  return (
    <section className='text-center'>
      <h1>Admin - Logga in</h1>
      <Form
        onSubmit={handleSubmit}
        className={styles['form']}>
        <Form.Group controlId='adminPassword'>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type='submit'>Logga in</Button>
      </Form>
      <span className={styles['failMessage']}>{failMessage}</span>
    </section>
  );
}
