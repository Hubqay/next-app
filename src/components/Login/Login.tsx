"use client";

import React, { useEffect } from "react";
import {deleteCookie, getCookie, setCookie} from "@/app/utils/cookies";
import Button from "@/components/UI/Button/Button";
import Input from '@/components/UI/Input/Input'
import { useRouter, useParams } from "next/navigation";
import styles from "./login.module.css";

export default function Login() {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean | string>(false);

  const router = useRouter();
  const {locale} = useParams();
  const session = getCookie('session_id')
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    
    try {
      const response = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			})
      
      if (!response.ok) {
        const { error } = await response.json();
        setError(error || 'Login failed');
        deleteCookie('session_id')
        return;
      }
      
      const data = await response.json();
      setCookie("session_id", data, 30);
    } catch (error) {
      setError(true);
      console.error(error);
      deleteCookie('session_id');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
		if (session) router.push(`/${locale}`)
	}, [router, session, locale])
  
  return (
		<section className={styles.login}>
			<h2>Sign In</h2>

			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.row}>
					{error && (
						<span className={styles.error}>
							The Username or Password is Incorrect. Try again.
						</span>
					)}

					<Input
						type='text'
						name='username'
						value={username}
						setValue={setUsername}
						placeholder='Username'
					/>
				</div>
				<div className={styles.row}>
					<Input
						type='password'
						name='password'
						value={password}
						setValue={setPassword}
						placeholder='Password'
					/>
				</div>
				<div className={styles.row}>
					<Button name='Sign In' loading={loading} disabled={loading} />
				</div>
			</form>

			<p className={styles.account}>
				<span>Don`t have an account ? </span>
				<a
					href='https://www.themoviedb.org/login'
					target='_blank'
					rel='noreferrer noopener'
				>
					Sign up
				</a>
			</p>
		</section>
	)
}