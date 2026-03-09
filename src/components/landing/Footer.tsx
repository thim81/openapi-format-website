import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, ExternalLink } from 'lucide-react';

const documentationLinks = [
  { label: 'Installation', href: '/docs/installation' },
  { label: 'CLI Options', href: '/docs/cli-options' },
  { label: 'Configuration', href: '/docs/configuration' },
  // { label: "Programmatic API", href: "/docs/programmatic" },
];

const featureLinks = [
  { label: 'Sorting', href: '/docs/sorting' },
  { label: 'Filtering', href: '/docs/filtering' },
  { label: 'Formatting', href: '/docs/formatting' },
  { label: 'Overlays', href: '/docs/overlays' },
  { label: 'Generate', href: '/docs/generate' },
  { label: 'Split & Bundle', href: '/docs/split-bundle' },
  { label: 'Convert', href: '/docs/convert' },
  { label: 'Rename', href: '/docs/rename' },
];

const resourceLinks = [
  { label: 'GitHub', href: 'https://github.com/thim81/openapi-format', icon: Github },
  { label: 'npm', href: 'https://www.npmjs.com/package/openapi-format' },
  { label: 'Playground', href: 'https://openapi-format-playground.vercel.app' },
  { label: 'Changelog', href: 'https://github.com/thim81/openapi-format/releases' },
  { label: 'Issues', href: 'https://github.com/thim81/openapi-format/issues' },
];

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className='border-t bg-muted/30 pt-14 pb-8'
  >
    <div className='container max-w-6xl'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-10 mb-12'>
        {/* Brand */}
        <div className='col-span-2 md:col-span-1'>
          <span className='text-lg font-bold tracking-tight'>openapi-format</span>
          <p className='mt-2 text-sm text-muted-foreground leading-relaxed'>
            Format, sort, filter &amp; transform your OpenAPI specs. Keep your API definitions clean
            and consistent.
          </p>
        </div>

        {/* Docs */}
        <div>
          <h4 className='text-sm font-semibold mb-3'>Documentation</h4>
          <ul className='space-y-2'>
            {documentationLinks.map((d) => (
              <li key={d.href}>
                <Link
                  to={d.href}
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className='text-sm font-semibold mb-3'>Resources</h4>
          <ul className='space-y-2'>
            {resourceLinks.map((r) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1'
                >
                  {r.label}
                  <ExternalLink className='h-3 w-3 opacity-50' />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Features */}
        <div>
          <h4 className='text-sm font-semibold mb-3'>Features</h4>
          <ul className='space-y-2'>
            {featureLinks.map((d) => (
              <li key={d.href}>
                <Link
                  to={d.href}
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground text-center md:text-left'>
        <p className='leading-relaxed'>
          © {new Date().getFullYear()} openapi-format — Built by{' '}
          <a
            href='https://trinixlabs.dev'
            target='_blank'
            rel='noopener noreferrer'
            className='underline hover:text-foreground'
          >
            TrinixLabs
          </a>
        </p>
        <div className='flex items-center gap-4'>
          <a
            href='https://github.com/thim81/openapi-format'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-foreground transition-colors'
          >
            <Github className='h-4 w-4' />
          </a>
          <a
            href='https://www.npmjs.com/package/openapi-format'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-foreground transition-colors'
          >
            npm
          </a>
        </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
