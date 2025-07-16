const API_BASE_URL = 'http://localhost:8080';

import { Reservation } from "@/components/ReservationCard";

export async function reserveActivity(date: string, id: number) {
  try {
    const res = await fetch(`${API_BASE_URL}/reservation/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date }),
      credentials: 'include',
    });

    if (!res.ok) {
      const error = await res.json();
      console.error('Reservation error:', error.message);
      throw new Error(error.message || 'Error during reservation.');
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to reserve activity:', error);
    throw error;
  }
}

export async function getReservations(): Promise<Reservation[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/reservation/history`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      const error = await res.json();
      console.error('Fetching reservation history failed:', error.message);
      throw new Error(error.message || 'Error fetching reservation history.');
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to get reservations:', error);
    throw error;
  }
}
