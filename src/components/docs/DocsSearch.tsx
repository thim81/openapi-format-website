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

type DocSection = {
  label: string;
  description: string;
};

type DocPage = {
  label: string;
  href: string;
  description: string;
  sections?: DocSection[];
};

const docPages: DocPage[] = [
  {
    label: 'Installation',
    href: '/docs/installation/',
    description: 'NPX, local & global install setup',
    sections: [
      { label: 'NPX', description: 'Install and run with npx' },
      { label: 'Local', description: 'Use the package in a project' },
      { label: 'Global', description: 'Install it for system-wide access' },
    ],
  },
  {
    label: 'CLI Options',
    href: '/docs/cli-options/',
    description: 'Command-line flags, arguments & output',
    sections: [
      { label: 'Usage', description: 'Basic CLI invocation and syntax' },
      { label: 'Options Reference', description: 'Detailed flags and defaults' },
    ],
  },
  {
    label: 'Configuration File',
    href: '/docs/configuration/',
    description: 'YAML/JSON config file reference',
    sections: [
      { label: 'Using --configFile', description: 'Pass a config file on the command line' },
      { label: 'Inline Configuration', description: 'Set options directly in the spec' },
      { label: 'External File References', description: 'Reference reusable config fragments' },
      { label: 'Configuration Properties', description: 'Available config fields and defaults' },
      { label: 'Using .openapiformatrc', description: 'Configure the local rc file format' },
    ],
  },
  {
    label: 'Sorting',
    href: '/docs/sorting/',
    description: 'Sort properties, paths & components',
    sections: [
      { label: 'CLI Usage', description: 'Run sorting from the command line' },
      { label: 'Default Sort Fields', description: 'Built-in ordering rules' },
      { label: 'Custom Sort File', description: 'Provide your own sort order file' },
      { label: 'Sort Paths', description: 'Reorder paths consistently' },
      { label: 'Sort Components', description: 'Sort component objects' },
      { label: 'Sort Component Properties', description: 'Order schema properties' },
    ],
  },
  {
    label: 'Filtering',
    href: '/docs/filtering/',
    description: 'Filter, remove or keep operations & tags',
    sections: [
      { label: 'CLI Usage', description: 'Run filtering from the command line' },
      { label: 'Filter Options Reference', description: 'All filter flags at a glance' },
      { label: 'Filter by Methods', description: 'Include or exclude HTTP methods' },
      { label: 'Filter by Tags', description: 'Match tagged operations' },
      { label: 'Filter by operationIds', description: 'Target operations by operationId' },
      { label: 'Filter by Operations', description: 'Select operations by path and method' },
      { label: 'Filter by Flags', description: 'Filter by OpenAPI flag keys' },
      { label: 'Filter by Flag Values', description: 'Filter by flag values' },
      { label: 'Filter Response Content', description: 'Keep only matching response media types' },
      { label: 'Remove Unused Components', description: 'Drop unused schemas and refs' },
      { label: 'Strip Flags', description: 'Remove matching x- flags' },
      { label: 'Text Replace', description: 'Apply text substitutions after filtering' },
    ],
  },
  {
    label: 'Formatting & Casing',
    href: '/docs/formatting/',
    description: 'camelCase, snake_case & naming conventions',
    sections: [
      { label: 'CLI Usage', description: 'Run formatting from the CLI' },
      { label: 'Casing Types', description: 'Supported casing styles' },
      { label: 'Configurable Elements', description: 'Which names can be rewritten' },
      { label: 'Full Configuration Example', description: 'Complete config file example' },
      { label: 'Example: operationId', description: 'Rename operation IDs' },
      { label: 'Example: Schema Properties', description: 'Rewrite schema property names' },
      { label: 'Example: Component Keys', description: 'Format component names' },
      { label: 'Example: Parameter Names', description: 'Rename parameter fields' },
    ],
  },
  {
    label: 'Overlays',
    href: '/docs/overlays/',
    description: 'Merge, extend & override with overlay files',
    sections: [
      { label: 'CLI Usage', description: 'Run overlays from the CLI' },
      { label: 'Overlay Structure', description: 'How overlays are organized' },
      { label: 'Example: Update Description', description: 'Patch metadata in place' },
      {
        label: 'Example: Add Server & Update Endpoint',
        description: 'Modify servers and operations',
      },
      { label: 'Example: Remove Fields', description: 'Delete fields from a spec' },
      { label: 'Using extends', description: 'Layer multiple overlays together' },
    ],
  },
  {
    label: 'Generate',
    href: '/docs/generate/',
    description: 'Generate output from OpenAPI specs',
    sections: [
      { label: 'CLI Usage', description: 'Run generation from the CLI' },
      { label: 'Configuration', description: 'Generation settings and inputs' },
      { label: 'Template Placeholders', description: 'Available template variables' },
      { label: 'Example: Generate Missing operationIds', description: 'Fill in missing IDs' },
      { label: 'Example: Overwrite All operationIds', description: 'Replace existing IDs' },
      { label: 'Advanced Template with Static Text', description: 'Mix literals and placeholders' },
    ],
  },
  {
    label: 'Online Playground',
    href: '/docs/online-playground/',
    description: 'Use the browser workspace to inspect and share changes',
    sections: [
      { label: 'Open the Playground', description: 'Launch the browser workspace from the CLI' },
      { label: 'Code, UI, Preview, Diff', description: 'Move between editing and review modes' },
      { label: 'Shareable URLs', description: 'Pass input and config through the playground link' },
      { label: 'When to Use It', description: 'Choose the playground for interactive review and demos' },
    ],
  },
  {
    label: 'Split & Bundle',
    href: '/docs/split-bundle/',
    description: 'Split into multi-file or bundle into one',
    sections: [
      { label: 'Splitting', description: 'Break one spec into multiple files' },
      { label: 'Bundling', description: 'Combine files into a single spec' },
    ],
  },
  {
    label: 'Convert',
    href: '/docs/convert/',
    description: 'Convert between Swagger/OpenAPI & YAML/JSON',
    sections: [
      { label: 'CLI Usage', description: 'Run conversions from the CLI' },
      { label: 'Example: 3.0 → 3.1', description: 'Upgrade a 3.0 spec to 3.1' },
      { label: 'Example: 3.0 → 3.2', description: 'Upgrade a 3.0 spec to 3.2' },
      { label: 'What Changes', description: 'Fields that change during conversion' },
    ],
  },
  {
    label: 'Rename',
    href: '/docs/rename/',
    description: 'Rename titles, descriptions & operationIds',
    sections: [
      { label: 'CLI Usage', description: 'Run renaming from the CLI' },
      { label: 'Example', description: 'Rename a spec in practice' },
    ],
  },
  {
    label: 'Programmatic Usage',
    href: '/docs/programmatic/',
    description: 'JavaScript/TypeScript API & imports',
    sections: [
      { label: 'Sorting with Minimal Setup', description: 'Use the API with defaults' },
      { label: 'Custom Sort Configuration', description: 'Pass a custom sort config' },
      { label: 'Filtering & Generating', description: 'Chain API operations together' },
      { label: 'File Helpers', description: 'Read and write files programmatically' },
    ],
  },
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

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  const docEntries = docPages.flatMap((page) => {
    const pageEntry = {
      key: page.href,
      href: page.href,
      label: page.label,
      description: page.description,
      value: `${page.label} ${page.description}`,
      section: null as string | null,
    };

    const sectionEntries =
      page.sections?.map((section) => {
        const anchor = slugify(section.label);
        return {
          key: `${page.href}#${anchor}`,
          href: `${page.href}#${anchor}`,
          label: section.label,
          description: section.description,
          pageLabel: page.label,
          value: `${page.label} ${section.label} ${page.description}`,
          section: section.label,
        };
      }) ?? [];

    return [pageEntry, ...sectionEntries];
  });

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder='Search documentation…' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Documentation'>
          {docEntries.map((entry) => (
            <CommandItem
              key={entry.key}
              value={entry.value}
              onSelect={() => handleSelect(entry.href)}
              className='flex items-start gap-3 py-3 cursor-pointer'
            >
              <FileText className='h-4 w-4 mt-0.5 shrink-0 text-muted-foreground' />
              <div className='flex flex-col'>
                <span className='text-sm font-medium'>{entry.label}</span>
                <span className='text-xs text-muted-foreground'>
                  {entry.section ? entry.description : entry.description}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default DocsSearch;
