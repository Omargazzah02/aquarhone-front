import { useState } from "react";
import Link from "next/link";

export interface Activity {
  id: number;
  name: string;
  description: string;
  type: string;
  image: string;
  availableSeats: number;
  price: number;
  location: string;
  reserved: boolean;
}

interface Props {
  activity: Activity;
  onReserve: (activityId: number, date: string) => void;
}

export default function ActivityCard({ activity, onReserve }: Props) {
  const [date, setDate] = useState<string>('');

  return (
    <div
      className="max-w-md rounded-lg shadow-lg p-5 mb-6 text-white"
      style={{ backgroundColor: "var(--foreground)" }}
    >
      <img
        src={activity.image}
        alt={activity.name}
        className="w-full h-44 object-cover rounded-md mb-4"
      />
      <h3 className="text-2xl font-semibold mb-2">{activity.name}</h3>
      <p className="text-sm mb-3 opacity-90">{activity.description}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onReserve(activity.id, date);
        }}
      >
        <input
          required
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded px-3 py-2 mb-3 text-black"
        />

        <button
          type="submit"
          disabled={activity.reserved || activity.availableSeats === 0}
          className={`btn-submit w-full ${
            activity.reserved || activity.availableSeats === 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {activity.reserved ? 'Réservé' : 'Réserver'}
        </button>

<Link  href={`/activities/${activity.id}`} className="link ">
  See details
</Link>

      </form>

  
    </div>
  );
}
