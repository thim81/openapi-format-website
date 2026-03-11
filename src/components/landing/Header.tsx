import { useState } from 'react';
import { Menu, X, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Example', href: '#example' },
  { label: 'Quick Start', href: '#quick-start' },
];

const PLAYGROUND_URL = 'https://playground.openapi-format.com';

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm'>
      <div className='container flex h-14 items-center justify-between'>
        <a href='/' className='flex items-center gap-2 text-lg font-bold tracking-tight'>
          <img
            src='/openapi-format-icon.svg'
            alt='OpenAPI Format'
            className='h-6 w-6 shrink-0'
            width={24}
            height={24}
          />
          <span>openapi-format</span>
        </a>

        {/* Desktop nav */}
        <nav className='hidden md:flex items-center gap-1'>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className='px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              {l.label}
            </a>
          ))}
          <a
            href='/docs/installation'
            className='px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
          >
            Docs
          </a>
          <a href={PLAYGROUND_URL} target='_blank' rel='noopener noreferrer'>
            <Button variant='default' size='sm' className='gap-1.5 ml-1'>
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
          <ThemeToggle />
        </nav>

        {/* Mobile toggle */}
        <div className='flex md:hidden items-center gap-1'>
          <ThemeToggle />
          <Button variant='ghost' size='icon' onClick={() => setOpen(!open)} aria-label='Menu'>
            {open ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className='md:hidden border-t bg-background px-4 pb-4 pt-2 flex flex-col gap-2'>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className='py-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              {l.label}
            </a>
          ))}
          <a
            href='/docs/installation'
            onClick={() => setOpen(false)}
            className='py-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
          >
            Docs
          </a>
          <a
            href={PLAYGROUND_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5'
          >
            Playground <ExternalLink className='h-3 w-3' />
          </a>
          <a
            href='https://github.com/thim81/openapi-format'
            target='_blank'
            rel='noopener noreferrer'
            className='py-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
          >
            GitHub
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
