import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CommandDialog } from './command';

describe('CommandDialog', () => {
  it('provides dialog title/description and full-screen mobile positioning', () => {
    render(
      <CommandDialog open onOpenChange={() => {}}>
        <div>Search content</div>
      </CommandDialog>,
    );

    expect(screen.getByText('Search documentation')).toBeInTheDocument();
    expect(screen.getByText('Search and navigate documentation pages')).toBeInTheDocument();

    const dialog = screen.getByRole('dialog');
    const classTokens = dialog.className.split(' ');
    expect(classTokens).toContain('top-0');
    expect(classTokens).toContain('h-dvh');
    expect(classTokens).toContain('translate-y-0');
    expect(classTokens).toContain('sm:top-[50%]');
  });
});
