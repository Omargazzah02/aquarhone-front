


const API_BASE_URL = 'http://localhost:8080'; // Backend URL

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
}

export async function loginUser(data: LoginData) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!res.ok) {
      const error = await res.json();
      console.error('Login error:', error.message);
      throw new Error(error.message || 'Error during login.');
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to log in:', error);
    throw error;
  }
}

export async function registerUser(data: RegisterData) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error('Registration error:', error.message);
      throw new Error(error.message || 'Error during registration.');
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to register:', error);
    throw error;
  }
}



