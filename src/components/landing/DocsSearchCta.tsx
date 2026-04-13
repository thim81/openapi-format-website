import { useState } from 'react';
import { Search } from 'lucide-react';
import DocsSearch from '@/components/docs/DocsSearch';

const DocsSearchCta = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type='button'
        aria-label='Search docs'
        className='inline-flex w-full max-w-md items-center justify-between gap-3 rounded-full border border-input bg-background/80 px-4 py-2.5 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-accent/40 hover:text-foreground'
        onClick={() => setOpen(true)}
      >
        <span className='flex min-w-0 items-center gap-3'>
          <Search className='h-4 w-4 shrink-0' />
          <span className='truncate'>Search docs</span>
        </span>
        <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
          ⌘K
        </kbd>
      </button>
      <DocsSearch open={open} onOpenChange={setOpen} />
    </>
  );
};

export default DocsSearchCta;
