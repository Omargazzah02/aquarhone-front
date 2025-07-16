'use client';

import { useEffect, useState } from "react";
import ReservationCard from "@/components/ReservationCard";
import { Reservation } from "@/components/ReservationCard";
import { getReservations } from "@/services/api/reservation";
import { useAuth } from '@/components/ClientProvider';
import { useRouter } from 'next/navigation';
export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();


  useEffect(() => {


     if (!user) {
      router.push('auth/login');
     }


    const loadReservations = async () => {
      try {
        const data = await getReservations(); 
        setReservations(data);
      } catch (err) {
        console.error("Failed to load reservations:", err);
      } finally {
        setLoading(false);
      }
    };

    loadReservations();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="  mb-6 title">My Reservations</h1>
      {loading ? (
        <p>Loading...</p>
      ) : reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
        </div>
      )}
    </div>
  );
}
