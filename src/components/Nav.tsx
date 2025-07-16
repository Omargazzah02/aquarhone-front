'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/ClientProvider';
export default function Nav() {
  const { user, setUser } = useAuth();
  const router = useRouter()


  const handleLogout = async () => {
   
    // Supprimer les cookies s'ils sont accessibles côté client
    document.cookie = 'token=; Max-Age=0; path=/';
    document.cookie = 'role=; Max-Age=0; path=/';

    // Rediriger   
    window.location.href = '/auth/login';
  };

  return (
    <nav className=' flex justify-between px-5  items-center'>
      <ul>

        <li><img src="/logo.png" width={100} height={100} /></li>
  
      </ul>


      <ul className='space-x-4 flex'>
<li>        <a  className='text-white'href="/activities">Activities</a>
</li> 

<li><a  className='text-white'href="/reservations">Reservations</a></li>


            
            {user?.role === 'admin' && <li><Link href="/admin" className='text-white'>Admin Pannel</Link></li>}



      </ul>
        
    <ul>
        
                        <li><button onClick={handleLogout} className='bg-red-500 p-3 text-white cursor-pointer' >Logout</button></li>

        
    </ul>
   
    </nav>
  );
}
