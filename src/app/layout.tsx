import './globals.css';
import { ReactNode } from 'react';
import { cookies } from 'next/headers';

import ClientProvider from '@/components/ClientProvider';
export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();  // <-- await ici !
  const token = cookieStore.get('token')?.value ?? null;
  const role = cookieStore.get('role')?.value ?? null;
  const user = token ? { token, role } : null;
   
  return (
    <html lang="fr">
      <body >
        <ClientProvider user={user}>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
