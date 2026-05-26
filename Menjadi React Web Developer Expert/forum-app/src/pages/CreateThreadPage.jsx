import ThreadInput from '@/components/thread-input';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '@/states/threads/action';
import { useDispatch, useSelector } from 'react-redux';

export default function CreateThreadPage() {
  const loading = useSelector((states) => states.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));

    navigate('/threads');
  };

  return (
    <div className=" mt-2">
      <p className="text-sm font-semibold">Create New Thread</p>
      <div className="w-full">
        <ThreadInput createThread={onAddThread} loading={loading} />
      </div>
    </div>
  );
}
