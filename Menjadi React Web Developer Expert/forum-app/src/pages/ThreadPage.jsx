import ThreadList from '@/components/thread-list';
import { asyncPopulateUsersAndThreads } from '@/states/shared/action';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ThreadPage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Thread available</p>
          <Link
            to="/threads/add"
            className="border hover:bg-accent py-0.5 px-1 rounded duration-200 transition-all"
          >
            <div className="flex gap-1 items-center">
              <Plus className="w-3.5 h-3.5" />
              <p className="text-xs font-semibold">Create New Thread</p>
            </div>
          </Link>
        </div>
        <ThreadList threads={threadList} />
      </div>
    </div>
  );
}

export default ThreadPage;
