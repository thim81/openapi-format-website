import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Theme = 'light' | 'dark' | 'system';

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  return (localStorage.getItem('theme') as Theme) ?? 'system';
}

function applyTheme(theme: Theme) {
  const isDark =
    theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem('theme', theme);
}

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const cycle = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const icon =
    theme === 'dark' ? (
      <Moon className='h-4 w-4' />
    ) : theme === 'light' ? (
      <Sun className='h-4 w-4' />
    ) : (
      <Monitor className='h-4 w-4' />
    );

  return (
    <Button variant='ghost' size='icon' onClick={cycle} aria-label='Toggle theme'>
      {icon}
    </Button>
  );
};

export default ThemeToggle;
