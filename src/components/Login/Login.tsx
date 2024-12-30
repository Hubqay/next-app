"use client";

import React from "react";
import {setCookie} from "@/app/utils/coockies";
import styles from "./login.module.css";

const Login: React.FC = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean | string>(false);
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        const { error } = await response.json();
        setError(error || 'Login failed');
        return;
      }
      
      const data = await response.json();
      setCookie("session_id", data, 30);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <button>Sign In</button>
        </div>
      </form>
    </div>
  )
}

export default Login;