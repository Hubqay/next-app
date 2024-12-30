import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const API_KEY: string | undefined = process.env.TMDB_API_KEY;
const BASE_URL: string | undefined = process.env.TMDB_API_BASE_URL;
const JWT_SECRET: string | undefined = process.env.TMDB_JWT_SECRET;

export async function POST(request: Request) {
  const { username, password } = await request.json();
  
  try {
    const tokenResponse = await fetch(`${BASE_URL}authentication/token/new?api_key=${API_KEY}`);
    
    if (!tokenResponse.ok) {
      console.error('Failed to fetch request token');
    }
    
    const { request_token } = await tokenResponse.json();
    
    const validateResponse = await fetch(`${BASE_URL}authentication/token/validate_with_login?api_key=${API_KEY}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username,
          password,
          request_token,
        }),
      }
    );
    
    if (!validateResponse.ok) {
      console.error('Invalid login or password');
    }
    
    const sessionResponse = await fetch(`${BASE_URL}authentication/session/new?api_key=${API_KEY}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ request_token }),
    });

    if (!sessionResponse.ok) {
      console.error('Failed to create session');
    }

    const sessionData = await sessionResponse.json();
    const {session_id} = await sessionData;
    
    const session: string = jwt.sign(
      {session_id},
      `${JWT_SECRET}`,
      {expiresIn: '30d'}
    )
    
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 400 }
    );
  }
}