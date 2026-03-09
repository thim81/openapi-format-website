import { useState } from 'react';
import { Copy, Check, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Hero = () => {
  const [copied, setCopied] = useState(false);
  const installCmd = 'npx openapi-format openapi.yaml';

  const copy = async () => {
    await navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className='py-20 md:py-32'>
      <div className='container flex flex-col items-center text-center gap-6 max-w-3xl'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-4xl md:text-6xl font-extrabold tracking-tight'
        >
          Format, Sort &amp; Filter your OpenAPI definitions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className='text-lg md:text-xl text-muted-foreground max-w-2xl'
        >
          A CLI and library to sort, filter, and format OpenAPI specs — making them consistent,
          clean, and diff-friendly.
        </motion.p>

        {/* npm install */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='flex items-center gap-2 rounded-lg border bg-muted/50 px-4 py-2.5 font-mono text-sm'
        >
          <span className='text-muted-foreground select-none'>$</span>
          <code className='select-all'>{installCmd}</code>
          <button
            onClick={copy}
            className='ml-2 text-muted-foreground hover:text-foreground transition-colors'
            aria-label='Copy'
          >
            {copied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
          </button>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className='flex flex-wrap gap-3 justify-center'
        >
          <a
            href='https://github.com/thim81/openapi-format'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Button size='lg'>
              <Github className='mr-2 h-4 w-4' /> GitHub
            </Button>
          </a>
          <a
            href='https://openapi-format-playground.vercel.app'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Button size='lg' variant='outline'>
              <ExternalLink className='mr-2 h-4 w-4' /> Playground
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
