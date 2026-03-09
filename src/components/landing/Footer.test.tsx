import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
  it('uses a 2-column mobile layout for documentation, resources, and features', () => {
    const { container } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const brandHeading = screen.getByText('openapi-format');
    expect(brandHeading).toBeInTheDocument();

    const topGrid = container.querySelector('.grid');
    expect(topGrid).toBeTruthy();
    const classTokens = topGrid?.className.split(' ') ?? [];
    expect(classTokens).toContain('grid-cols-2');
    expect(classTokens).toContain('md:grid-cols-4');

    expect(screen.getByRole('heading', { name: 'Documentation' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Resources' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Features' })).toBeInTheDocument();
  });
});
