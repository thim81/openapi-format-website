import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

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
