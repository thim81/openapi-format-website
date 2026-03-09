import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import DocsLayout from './DocsLayout';

describe('DocsLayout mobile sidebar', () => {
  it('prevents horizontal overflow in docs layout shell', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/docs/filtering']}>
        <DocsLayout>
          <div>Content</div>
        </DocsLayout>
      </MemoryRouter>,
    );

    const root = container.firstElementChild as HTMLElement | null;
    expect(root).toBeTruthy();
    expect(root?.className.split(' ')).toContain('overflow-x-hidden');
  });

  it('renders the mobile sidebar overlay above the sticky header', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/docs/installation']}>
        <DocsLayout>
          <div>Content</div>
        </DocsLayout>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Toggle sidebar' }));

    const overlayContainer = container.querySelector('.fixed.inset-0.lg\\:hidden');
    expect(overlayContainer).toBeTruthy();

    const classTokens = overlayContainer?.className.split(' ') ?? [];
    expect(classTokens).toContain('z-[60]');
  });

  it('hides top-nav theme toggle on mobile and shows one inside mobile sidebar', () => {
    render(
      <MemoryRouter initialEntries={['/docs/installation']}>
        <DocsLayout>
          <div>Content</div>
        </DocsLayout>
      </MemoryRouter>,
    );

    expect(screen.getAllByRole('button', { name: 'Toggle theme' })).toHaveLength(1);

    fireEvent.click(screen.getByRole('button', { name: 'Toggle sidebar' }));

    expect(screen.getAllByRole('button', { name: 'Toggle theme' })).toHaveLength(2);
  });
});
