import { Activity } from "./ActivityCard";
export interface Reservation {
  id: number;
  userId: number;
  activityId: number;
  date: string;
  activity: Activity;
}

import React from "react";

interface Props {
  reservation: Reservation;
}

export default function ReservationCard({ reservation }: Props) {
  const { activity, date } = reservation;

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
      <p className="text-sm mb-2 opacity-90">{activity.description}</p>
      <p className="text-sm">Type: {activity.type}</p>
      <p className="text-sm">Location: {activity.location}</p>
      <p className="text-sm mb-3">Price: {activity.price} €</p>

      <p className="text-sm font-semibold text-blue-300">
        Réservé pour : {new Date(date).toLocaleDateString()}
      </p>

    </div>
  );
}
