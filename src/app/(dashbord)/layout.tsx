import { ReactNode } from 'react';
import Nav from '@/components/Nav';

export default async function DashbordLayout({ children }: { children: ReactNode }) {


  return (
   <>     <Nav></Nav>
          {children}
       
      </>
  );
}
