import type { APIResponse } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL as string;

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json: APIResponse<T> = await res.json();
  if (!json.success || json.data === undefined) {
    throw new Error(json.error || 'Unknown API error');
  }
  return json.data;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json: APIResponse<T> = await res.json();
  if (!json.success) {
    throw new Error(json.error || `API error: ${res.status}`);
  }
  return json.data as T;
}
