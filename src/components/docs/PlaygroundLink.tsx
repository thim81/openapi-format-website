import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PLAYGROUND_URL = 'https://openapi-format-playground.vercel.app';

const PlaygroundLink = ({ label = 'Try this in the Playground' }: { label?: string }) => (
  <a href={PLAYGROUND_URL} target='_blank' rel='noopener noreferrer' className='inline-block my-4'>
    <Button
      variant='outline'
      size='sm'
      className='gap-1.5 text-primary border-primary/30 hover:bg-primary/5'
    >
      <ExternalLink className='h-3.5 w-3.5' />
      {label}
    </Button>
  </a>
);

export default PlaygroundLink;
