import { Button } from '@/components/ui/button';
import { NavLink, Link } from 'react-router-dom';

export function Navigation({ authUser, signOut }) {
  const { id, name, avatar } = authUser || {};

  return (
    <div className="flex justify-between border-b pb-2">
      <Link to="/">
        <Button variant="outline" size="sm" className="w-fit">
          Forum App
        </Button>
      </Link>
      <div className="flex gap-4 items-center text-xs">
        <NavLink
          to="/threads"
          className={({ isActive }) =>
            `${isActive ? 'bg-accent font-semibold' : ''} hover:bg-accent py-0.5 px-1 rounded duration-200 transition-all`
          }
        >
          Threads
        </NavLink>
        <NavLink
          to="/leaderboards"
          className={({ isActive }) =>
            `${isActive ? 'bg-accent font-semibold' : ''} hover:bg-accent py-0.5 px-1 rounded duration-200 transition-all`
          }
        >
          Leaderboards
        </NavLink>
      </div>
      <div className="">
        {authUser ? (
          <div className="flex items-center gap-3">
            <img
              src={avatar}
              alt={id}
              title={name}
              className="rounded-full h-6 w-6"
            />
            <p className="hidden lg:block text-xs">{name},</p>
            <Button type="button" size="sm" variant="ghost" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        ) : (
          <div>
            <Link to="/sign-in">
              <Button type="button" size="sm" variant="ghost">
                Sign In
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button type="button" size="sm" variant="ghost">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
