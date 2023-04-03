




import React from 'react';

function LoginForm() {
  return (
    <form action="/login" method="POST">
      <label htmlFor="nationalId">National ID:</label>
      <input type="text" id="nationalId" name="nationalId" required />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required />

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
