import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const docLinks = [
  { label: 'Installation', href: '/docs/installation' },
  { label: 'CLI Options', href: '/docs/cli-options' },
  { label: 'Configuration', href: '/docs/configuration' },
  { label: 'Sorting', href: '/docs/sorting' },
  { label: 'Filtering', href: '/docs/filtering' },
  { label: 'Formatting', href: '/docs/formatting' },
  { label: 'Overlays', href: '/docs/overlays' },
  { label: 'Generate', href: '/docs/generate' },
  { label: 'Split & Bundle', href: '/docs/split-bundle' },
  { label: 'Convert', href: '/docs/convert' },
  { label: 'Rename', href: '/docs/rename' },
  // { label: "Programmatic API", href: "/docs/programmatic" },
];

const DocsOverview = () => (
  <section id='docs' className='py-20 bg-muted/30'>
    <div className='container max-w-4xl'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className='text-center mb-10'
      >
        <BookOpen className='h-10 w-10 text-primary mx-auto mb-4' />
        <h2 className='text-3xl font-bold mb-3'>Explore the Docs</h2>
        <p className='text-muted-foreground max-w-xl mx-auto'>
          Everything you need to get started — from installation to advanced programmatic usage.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className='flex flex-wrap justify-center gap-2'
      >
        {docLinks.map((d) => (
          <Link key={d.href} to={d.href}>
            <Button variant='outline' size='sm' className='gap-1.5'>
              {d.label}
              <ArrowRight className='h-3 w-3' />
            </Button>
          </Link>
        ))}
      </motion.div>
    </div>
  </section>
);

export default DocsOverview;
