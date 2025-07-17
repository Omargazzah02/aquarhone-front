'use client';

import { useEffect, useState } from 'react';
import { Activity } from '@/components/ActivityCard';
import ActivityForm from '@/components/ActivityForm';
import { addActivity, deleteActivity, getActivitiesForAdmin, updateActivity } from '@/services/api/activities';
import { useAuth } from '@/components/ClientProvider';
import { useRouter } from 'next/navigation';

export default function page() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [editing, setEditing] = useState<Activity | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
     if (!user) {
      router.push('/login');
    } else if (user.role !== 'admin') {
      router.push('/activities');
    }
    loadActivities();
  }, [user]);

  const loadActivities = async () => {
    try {
      const data = await getActivitiesForAdmin();
      setActivities(data);
    } catch (error: any) {
      showAlert('error', error.message || 'Error loading activities.');
    }
  };

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000); // Hide alert after 3 seconds
  };

  const handleAdd = async (activity: Activity) => {
    try {
      await addActivity(activity);
      await loadActivities();
      showAlert('success', 'Activity added successfully.');
    } catch (error: any) {
      showAlert('error', error.message || 'Error adding activity.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteActivity(id);
      await loadActivities();
      showAlert('success', 'Activity deleted successfully.');
    } catch (error: any) {
      showAlert('error', error.message || 'Error deleting activity.');
    }
  };

  const handleUpdate = async (activity: Activity) => {
    try {
      await updateActivity(activity);
      setEditing(null);
      await loadActivities();
      showAlert('success', 'Activity updated successfully.');
    } catch (error: any) {
      showAlert('error', error.message || 'Error updating activity.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 title">Admin Panel</h1>

      {alert && (
        <div
          className={`mb-4 p-3 rounded ${
            alert.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
          }`}
        >
          {alert.message}
        </div>
      )}

    <div className='w-full p-5'> <ActivityForm onSubmit={handleAdd}  /> </div>


      <div className="grid gap-4 rounded-2xl m-4">
        {activities.map((activity) => (
          <div key={activity.id} className="border p-4 rounded shadow bg-white">
            {editing?.id === activity.id ? (
              <div className='w-full p-5'> <ActivityForm onSubmit={handleUpdate} initial={activity} /> </div>
            ) : (
              <>
                <h3 className="text-lg font-bold">{activity.name}</h3>
                <p>{activity.description}</p>
                <p>{activity.location}</p>
                <p>{activity.price}€ - {activity.availableSeats} places</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setEditing(activity)}
                    className="bg-yellow-500 px-3 py-1 text-white rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="bg-red-600 px-3 py-1 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
