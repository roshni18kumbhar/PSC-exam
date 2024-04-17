import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // for redirection

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send login request to server with username and password
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        // Login successful, update state and redirect
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('username', username);
        localStorage.setItem('userType', data.userType);
        const userType = data.userType;
        history.push(`/${userType}/dashboard`); // Redirect to specific dashboard
      } else {
        setErrorMessage(data.message); // Set error message
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  // Form fields and error message display logic

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Username and password fields */}
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default LoginForm;
