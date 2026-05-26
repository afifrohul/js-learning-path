import { Outlet } from 'react-router-dom';
import { Navigation } from '@/components/navigation';

export function MainLayout({ authUser, signOut }) {
  return (
    <section className="flex justify-center">
      <div className="flex flex-col gap-2 min-w-4xl min-h-screen border-x p-4">
        <header>
          <Navigation authUser={authUser} signOut={signOut} />
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </section>
  );
}
