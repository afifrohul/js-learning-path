import { Loader } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function Loading() {
  const isLoading = useSelector((state) => state.loading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <Loader className="h-8 w-8 animate-spin" />
    </div>
  );
}
