import ThreadList from '@/components/thread-list';
import { asyncPopulateUsersAndThreads } from '@/states/shared/action';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncUpVoteThread,
} from '@/states/threads/action';

function ThreadPage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser?.id,
  }));

  const categoryList = threads.map((thread) => thread.category);

  const filteredThreadList =
    selectedCategory === 'all'
      ? threadList
      : threadList.filter((thread) => thread.category === selectedCategory);

  const onUpVote = (threadId) => {
    dispatch(asyncUpVoteThread(threadId));
  };

  const onDownVote = (threadId) => {
    dispatch(asyncDownVoteThread(threadId));
  };

  const onNeutralVote = (threadId) => {
    dispatch(asyncNeutralVoteThread(threadId));
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Thread available</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <p className="text-xs">Filter thread</p>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Filter thread" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category / Tag</SelectLabel>

                  <SelectItem value="all">all</SelectItem>
                  {categoryList.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {authUser && (
            <Link
              to="/threads/add"
              className="border hover:bg-accent py-0.5 px-1 rounded duration-200 transition-all"
            >
              <div className="flex gap-1 items-center py-0.5">
                <Plus className="w-3.5 h-3.5" />
                <p className="text-xs font-semibold">New</p>
              </div>
            </Link>
          )}
        </div>
      </div>

      <ThreadList
        threads={filteredThreadList}
        upVote={onUpVote}
        downVote={onDownVote}
        neutralVote={onNeutralVote}
      />
    </div>
  );
}
export default ThreadPage;
