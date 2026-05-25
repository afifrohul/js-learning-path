import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';

export function ModeToggleKey() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        variant="outline"
        className="shadow-md backdrop-blur supports-backdrop-filter:bg-background/60"
      >
        Press <Kbd>D</Kbd> to toggle dark mode
      </Button>
    </div>
  );
}
