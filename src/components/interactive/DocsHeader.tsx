import { useState } from 'react';
import { Menu, X, Search, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import DocsSearch from '@/components/docs/DocsSearch';

const DocsHeader = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    document.getElementById('docs-sidebar-mobile')?.classList.toggle('hidden');
    document.getElementById('docs-sidebar-backdrop')?.classList.toggle('hidden');
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    document.getElementById('docs-sidebar-mobile')?.classList.add('hidden');
    document.getElementById('docs-sidebar-backdrop')?.classList.add('hidden');
  };

  return (
    <>
      <header className='sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm'>
        <div className='container flex h-14 items-center justify-between min-w-0'>
          <div className='flex items-center gap-4 min-w-0'>
            <Button
              variant='ghost'
              size='icon'
              className='lg:hidden'
              onClick={toggleSidebar}
              aria-label='Toggle sidebar'
            >
              {sidebarOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </Button>
            <a href='/' className='text-lg font-bold tracking-tight'>
              openapi-format
            </a>
            <span className='hidden sm:inline text-sm text-muted-foreground'>/ docs</span>
          </div>
          <div className='flex items-center gap-1 shrink-0'>
            <Button
              variant='outline'
              size='sm'
              className='hidden sm:inline-flex gap-2 text-muted-foreground text-sm h-8 px-3'
              onClick={() => setSearchOpen(true)}
            >
              <Search className='h-3.5 w-3.5' />
              Search docs…
              <kbd className='ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
                ⌘K
              </kbd>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='sm:hidden'
              onClick={() => setSearchOpen(true)}
              aria-label='Search'
            >
              <Search className='h-4 w-4' />
            </Button>
            <a
              href='https://openapi-format-playground.vercel.app'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button variant='default' size='sm' className='gap-1.5'>
                Playground
                <ExternalLink className='h-3 w-3' />
              </Button>
            </a>
            <a
              href='https://github.com/thim81/openapi-format'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button variant='ghost' size='icon' aria-label='GitHub'>
                <Github className='h-4 w-4' />
              </Button>
            </a>
            <div className='hidden sm:block'>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <DocsSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

export default DocsHeader;
