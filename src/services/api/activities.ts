import { Activity } from "@/components/ActivityCard";

const API_URL = 'http://localhost:8080';

export async function getActivities(): Promise<Activity[]> {
  try {
    const res = await fetch(`${API_URL}/activity/all`, {
      method: "GET",
      credentials: 'include',
    });

    if (!res.ok) {
      const error = await res.json();
      console.error(error.message);
      throw new Error(error.message || 'Error while fetching activities.');
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to load activities:', error);
    throw error;
  }
}

export async function addActivity(activity: Activity) {
  try {
    const res = await fetch(`${API_URL}/activity/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activity),
      credentials: 'include',

    });

    if (!res.ok) {
      const error = await res.json();
      console.error(error.message);
      throw new Error(error.message || 'Error while creating activity.');
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to add activity:', error);
    throw error;
  }
}

export async function deleteActivity(id: number) {
  try {
    const res = await fetch(`${API_URL}/activity/delete/${id}`, {
      method: 'DELETE',
      credentials: 'include',

    });

    if (!res.ok) {
      const error = await res.json();
      console.error(error.message);
      throw new Error(error.message || 'Error while deleting activity.');
    }
  } catch (error) {
    console.error('Failed to delete activity:', error);
    throw error;
  }
}

export async function updateActivity(activity: Activity) {
  try {
    const res = await fetch(`${API_URL}/activity/update/${activity.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activity),
      credentials: 'include',

    });

    if (!res.ok) {
      const error = await res.json();
      console.error(error.message);
      throw new Error(error.message || 'Error while updating activity.');
    }
  } catch (error) {
    console.error('Failed to update activity:', error);
    throw error;
  }
}
