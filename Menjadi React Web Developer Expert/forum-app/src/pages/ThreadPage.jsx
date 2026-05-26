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

  const categoryList = ['all', ...new Set(threads.map((t) => t.category))];

  const filteredThreadList =
    selectedCategory === 'all'
      ? threadList
      : threadList.filter((thread) => thread.category === selectedCategory);

  return (
    <div>
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
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter thread" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category / Tag</SelectLabel>

                    {categoryList.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Link
              to="/threads/add"
              className="border hover:bg-accent py-0.5 px-1 rounded duration-200 transition-all"
            >
              <div className="flex gap-1 items-center py-0.5">
                <Plus className="w-3.5 h-3.5" />
                <p className="text-xs font-semibold">Create New Thread</p>
              </div>
            </Link>
          </div>
        </div>

        <ThreadList threads={filteredThreadList} />
      </div>
    </div>
  );
}
export default ThreadPage;
