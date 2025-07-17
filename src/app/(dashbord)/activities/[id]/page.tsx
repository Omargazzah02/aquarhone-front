'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getActivities } from '@/services/api/activities';
import { Activity } from '@/components/ActivityCard';
import Link from 'next/link';

export default function ActivityDetailsPage() {
  const { id } = useParams();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const all = await getActivities();
        const found = all.find((a) => a.id === Number(id));
        setActivity(found || null);
      } catch (error) {
        console.error('Failed to load activity:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-white text-lg">Loading...</p>
    </div>
  );

  if (!activity) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-300 text-lg">Activity not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link
            href="/activities"
            className="text-white text-sm hover:underline"
          >
            ← Back to activities
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-4">{activity.name}</h1>
        <p className="mb-6 text-lg leading-relaxed">{activity.description}</p>

        <div className="bg-white/10 p-5 rounded-xl space-y-3 text-sm">
          <p><strong>📍 Location:</strong> {activity.location}</p>
          <p><strong>💰 Price:</strong> {activity.price}€</p>
          <p><strong>👥 Available seats:</strong> {activity.availableSeats}</p>
        </div>
      </div>
    </div>
  );
}
