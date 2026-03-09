import DocsLayout from '@/components/docs/DocsLayout';
import CodeBlock from '@/components/docs/CodeBlock';

const cliOptions = `npx openapi-format <input-file> -o [output-file] [options]

Arguments:
  input-file   the OpenAPI document (local or remote, JSON or YAML)
  output-file  optional output file (.json or .yaml)

Options:
  --output, -o          Save formatted file as JSON/YAML              [path]
  --sortFile            Custom field ordering file                    [path]
  --casingFile          Casing rules file                             [path]
  --generateFile        Generate rules file                           [path]
  --filterFile          Filter rules file                             [path]
  --overlayFile         OpenAPI overlay actions file                   [path]
  --no-sort             Don't sort the OpenAPI file                [boolean]
  --keepComments        Keep YAML comments                         [boolean]
  --sortComponentsFile  Components to sort alphabetically             [path]
  --sortComponentsProps Sort schema properties alphabetically      [boolean]
  --no-bundle           Don't bundle $ref references               [boolean]
  --split               Split into multi-file structure             [boolean]
  --rename              Rename the OpenAPI title                    [string]
  --convertTo           Convert to OpenAPI version 3.1 or 3.2      [string]
  --configFile          Config file with all CLI options               [path]
  --lineWidth           Max line width of YAML output               [number]
  --json                Output as JSON to stdout                   [boolean]
  --yaml                Output as YAML to stdout                   [boolean]
  --playground, -p      Open config in online playground
  --help                Show help                                  [boolean]
  --version             Output version number
  --verbose             Increase output verbosity                    [count]`;

const CliOptionsPage = () => (
  <DocsLayout>
    <h1 className='text-3xl font-bold mb-2'>CLI Options</h1>
    <p className='text-muted-foreground mb-8'>
      Complete reference for all command-line interface options.
    </p>

    <h2 className='text-2xl font-semibold mt-8 mb-4'>Usage</h2>
    <CodeBlock code={cliOptions} title='CLI' />

    <h2 className='text-2xl font-semibold mt-8 mb-4'>Options Reference</h2>
    <div className='overflow-x-auto'>
      <table className='w-full text-sm border-collapse'>
        <thead>
          <tr className='border-b'>
            <th className='text-left py-2 pr-4 font-semibold'>Parameter</th>
            <th className='text-left py-2 pr-4 font-semibold'>Alias</th>
            <th className='text-left py-2 pr-4 font-semibold'>Description</th>
            <th className='text-left py-2 font-semibold'>Default</th>
          </tr>
        </thead>
        <tbody className='text-muted-foreground'>
          {[
            ['--output', '-o', 'Save formatted OpenAPI file', ''],
            ['--sortFile', '-s', 'Custom field ordering file', 'defaultSort.json'],
            ['--filterFile', '-f', 'Filter settings file', ''],
            ['--casingFile', '-k', 'Casing rules file', ''],
            ['--generateFile', '-g', 'Generate rules file', ''],
            ['--overlayFile', '-l', 'OpenAPI overlay actions file', ''],
            ['--no-sort', '', "Don't sort the file", 'false'],
            ['--keepComments', '', 'Keep YAML comments', 'false'],
            ['--sortComponentsFile', '', 'Sort components alphabetically', ''],
            ['--sortComponentsProps', '', 'Sort schema properties alphabetically', 'false'],
            ['--no-bundle', '', "Don't bundle $ref references", 'false'],
            ['--split', '', 'Split into multi-file structure', 'false'],
            ['--rename', '', 'Rename the OpenAPI title', ''],
            ['--convertTo', '', 'Convert to OpenAPI 3.1 or 3.2', ''],
            ['--configFile', '-c', 'Config file with all options', ''],
            ['--lineWidth', '', 'Max YAML line width', '-1 (∞)'],
            ['--json', '', 'Output as JSON to stdout', 'false'],
            ['--yaml', '', 'Output as YAML to stdout', 'false'],
            ['--verbose', '-v', 'Increase verbosity', ''],
          ].map(([param, alias, desc, def]) => (
            <tr key={param} className='border-b'>
              <td className='py-2 pr-4 font-mono text-xs text-foreground'>{param}</td>
              <td className='py-2 pr-4 font-mono text-xs'>{alias}</td>
              <td className='py-2 pr-4'>{desc}</td>
              <td className='py-2 font-mono text-xs'>{def}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </DocsLayout>
);

export default CliOptionsPage;
