'use client';

import { useEffect, useState } from 'react';
import ActivityCard from '@/components/ActivityCard';
import { getActivities } from '@/services/api/activities';
import { Activity } from '@/components/ActivityCard';
import { reserveActivity } from '@/services/api/reservation';
import { useAuth } from '@/components/ClientProvider';
import { useRouter } from 'next/navigation';
export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

   const { user } = useAuth();
    const router = useRouter();
  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000); // Cache l'alerte après 3 secondes
  };

  const handleReserve = async (activityId: number, date: string) => {
    try {


      await reserveActivity(date, activityId);
      const updated = await getActivities();
      setActivities(updated);
      showAlert('success', 'Reservation successful.');
    } catch (error: any) {
      showAlert('error', error.message || 'Reservation failed.');
    }
  };



  useEffect(() => {

       if (!user) {
      router.push('auth/login');
     }

    const loadActivities = async () => {
      try {
        const data = await getActivities();
        setActivities(data);
      } catch (error) {
        console.error('Failed to fetch activities:', error);
        showAlert('error', 'Failed to load activities.');
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="font-bold mb-6 title">Available Activities</h1>

      {alert && (
        <div
          className={`mb-4 p-3 rounded ${
            alert.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
          }`}
        >
          {alert.message}
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : activities.length === 0 ? (
        <p>No activities available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onReserve={handleReserve}
            />
          ))}
        </div>
      )}
    </div>
  );
}
