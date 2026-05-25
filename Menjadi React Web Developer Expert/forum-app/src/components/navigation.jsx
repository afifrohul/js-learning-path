import { Button } from '@/components/ui/button';

export function Navigation({ authUser, signOut }) {
  const { id, name, avatar } = authUser;

  return (
    <div className="flex justify-between border-b pb-2">
      <Button variant="outline" size="sm" className="w-fit">
        Forum App
      </Button>
      <div className='flex items-center gap-3'>
        <img src={avatar} alt={id} title={name} className='rounded-full h-6 w-6'/>
        <p className='text-xs'>{name},</p>
        <Button type="button" size="sm" variant="ghost" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}
