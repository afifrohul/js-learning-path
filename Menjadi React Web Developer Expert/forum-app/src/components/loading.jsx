import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function Loading() {
  const isLoading = useSelector((state) => state.loading);

  if (!isLoading) return null;

  // return (
  //   <div className="fixed inset-0 z-99 flex items-center justify-center bg-black/20 backdrop-blur-sm">
  //     <Loader className="h-8 w-8 animate-spin" />
  //   </div>
  // );

  return (
    <div className="fixed top-8 right-8 z-50">
      <Button variant="outline" className="shadow-md pointer-events-none bg-accent">
        <Loader className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    </div>
  );
}
