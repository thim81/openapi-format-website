import { useEffect } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { FileText } from 'lucide-react';

const docPages = [
  { label: 'Installation', href: '/docs/installation', description: 'NPX, local & global install setup' },
  { label: 'CLI Options', href: '/docs/cli-options', description: 'Command-line flags, arguments & output' },
  { label: 'Configuration File', href: '/docs/configuration', description: 'YAML/JSON config file reference' },
  { label: 'Sorting', href: '/docs/sorting', description: 'Sort properties, paths & components' },
  { label: 'Filtering', href: '/docs/filtering', description: 'Filter, remove or keep operations & tags' },
  { label: 'Formatting & Casing', href: '/docs/formatting', description: 'camelCase, snake_case & naming conventions' },
  { label: 'Overlays', href: '/docs/overlays', description: 'Merge, extend & override with overlay files' },
  { label: 'Generate', href: '/docs/generate', description: 'Generate output from OpenAPI specs' },
  { label: 'Split & Bundle', href: '/docs/split-bundle', description: 'Split into multi-file or bundle into one' },
  { label: 'Convert', href: '/docs/convert', description: 'Convert between Swagger/OpenAPI & YAML/JSON' },
  { label: 'Rename', href: '/docs/rename', description: 'Rename titles, descriptions & operationIds' },
  { label: 'Programmatic Usage', href: '/docs/programmatic', description: 'JavaScript/TypeScript API & imports' },
];

interface DocsSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DocsSearch = ({ open, onOpenChange }: DocsSearchProps) => {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const handleSelect = (href: string) => {
    onOpenChange(false);
    window.location.href = href;
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder='Search documentation…' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Documentation'>
          {docPages.map((page) => (
            <CommandItem
              key={page.href}
              value={`${page.label} ${page.description}`}
              onSelect={() => handleSelect(page.href)}
              className='flex items-start gap-3 py-3 cursor-pointer'
            >
              <FileText className='h-4 w-4 mt-0.5 shrink-0 text-muted-foreground' />
              <div className='flex flex-col'>
                <span className='text-sm font-medium'>{page.label}</span>
                <span className='text-xs text-muted-foreground'>{page.description}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default DocsSearch;
