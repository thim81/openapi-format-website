import { gzipSync } from 'node:zlib';

const PLAYGROUND_ORIGIN = 'https://playground.openapi-format.com';

export type PlaygroundConfig = Record<string, unknown>;

function encodeForShare(value: string): string {
  return gzipSync(Buffer.from(value, 'utf8'), { mtime: 0 }).toString('base64');
}

export function createPlaygroundShareUrl(
  input?: string,
  config?: PlaygroundConfig,
  origin: string = PLAYGROUND_ORIGIN,
): string {
  const url = new URL(origin);

  if (input && input.length > 0) {
    url.searchParams.set('input', encodeForShare(input));
  }

  if (config && Object.keys(config).length > 0) {
    url.searchParams.set('config', encodeForShare(JSON.stringify(config)));
  }

  return url.toString();
}
