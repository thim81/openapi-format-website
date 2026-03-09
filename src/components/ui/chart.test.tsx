import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Tooltip: () => null,
  Legend: () => null,
}));

import { ChartContainer, ChartTooltipContent } from './chart';

describe('ChartTooltipContent', () => {
  it('does not crash when a payload item has no nested payload object', () => {
    const payload = [
      {
        name: 'value',
        dataKey: 'value',
        value: 10,
        color: '#000',
      },
    ];

    expect(() =>
      render(
        <ChartContainer config={{ value: { label: 'Value', color: '#000' } }}>
          <ChartTooltipContent active payload={payload as never} />
        </ChartContainer>,
      ),
    ).not.toThrow();
  });
});
