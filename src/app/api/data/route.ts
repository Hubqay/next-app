import { NextResponse } from 'next/server';

const apiKey = process.env.TMDB_API_KEY;
const baseUrl = process.env.TMDB_API_BASE_URL;

export async function GET(request: Request) {
  const url: URL = new URL(request.url);
  const page: string | null = url.searchParams.get('page');
  const locale: string | null = url.searchParams.get('locale');
  const urlLink: string | null = url.searchParams.get('url');
  
  if (!page || !locale || !urlLink) {
		return NextResponse.json(
			{ error: 'Category and page are required' },
			{ status: 400 }
		)
	}
  
  try {
    const response = await fetch(
			`${baseUrl}${urlLink}?page=${page}&api_key=${apiKey}&language=${locale}`
		)
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch media' },
        { status: 500 }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data.results);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: 'Internal server error' },
      { status: 500 }
    );
  }
}
