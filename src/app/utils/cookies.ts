export const setCookie = (name: string, value: string, days: number): void => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; secure`;
}

export const getCookie = (name: string): string | null => {
	const value: string = `; ${document.cookie}`
	const parts: string[] = value.split(`; ${name}=`)

	if (parts.length === 2) {
		const cookieValue: string | undefined = parts.pop()

		if (cookieValue) {
			return cookieValue.split(';').shift() || null;
		}
	}

	return null
}

export const deleteCookie = (name: string): void => {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure`
}