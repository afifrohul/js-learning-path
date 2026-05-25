import { Button } from '@/components/ui/button';
import './App.css';
import { Separator } from '@/components/ui/separator';


function App() {
  return (
    <>
      <section className="flex justify-center">
        <div className="flex flex-col gap-2 min-w-4xl min-h-screen border-x p-4">
          <Button variant="outline" size="sm" className="w-fit">
            Forum App
          </Button>
          <Separator />
          <p className="text-xs font-mono">(Press d to toggle dark mode)</p>
        </div>
      </section>
    </>
  );
}

export default App;
