const API_BASE = '/api';
export async function fetchChurchData<T>(type: string): Promise<T> {
  const response = await fetch(`${API_BASE}/data/${type}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${type}`);
  }
  const result = await response.json();
  return result.data;
}
export async function adminLogin(password: string) {
  const response = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
}
export async function updateChurchData(type: string, data: any, token: string) {
  const response = await fetch(`${API_BASE}/admin/data/${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Update failed');
  }
  return response.json();
}
export async function seedChurchData(data: Record<string, any>, token: string) {
  const response = await fetch(`${API_BASE}/admin/seed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  return response.json();
}