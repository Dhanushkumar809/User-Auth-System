import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Import your AuthProvider component.
// You must ensure this path is correct relative to your main.jsx file.
import { AuthProvider } from './context/AuthContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* The AuthProvider is essential! 
      It gives every component (like Dashboard and ProtectedRoute) 
      access to the user's login status via useContext(AuthContext).
    */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);