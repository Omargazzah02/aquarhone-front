import { useState } from 'react';
import { Activity } from './ActivityCard';

interface Props {
  onSubmit: (activity: Activity) => void;
  initial?: Activity;
}

export default function ActivityForm({ onSubmit, initial }: Props) {
  const [form, setForm] = useState<Activity>(
    initial || {
      id: 0,
      name: '',
      description: '',
      type: '',
      image: '',
      availableSeats: 0,
      price: 0,
      location: '',
      reserved: false,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'availableSeats' || name === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      id: 0,
      name: '',
      description: '',
      type: '',
      image: '',
      availableSeats: 0,
      price: 0,
      location: '',
      reserved: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-6 border border-gray-300 rounded bg-white max-w-md">
      {Object.entries(form)
        .filter(([key]) => key !== 'id' && key !== 'reserved')
        .map(([key, value]) => (
          <input
            required
            key={key}
            name={key}
            value={value as string | number}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="block mb-3 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]"
          />
        ))}
      <button type="submit" className="btn-submit w-full">
        {initial ? 'Modifier' : 'Ajouter'} l'activité
      </button>
    </form>
  );
}
