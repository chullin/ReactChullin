const { spawnSync } = require('node:child_process');

// Restricted local runners may forbid the sockets used by Turbopack's CSS workers.
// Keep Vercel's default compiler; allow a full Webpack build where required.
const bundler = process.env.NEXT_BUILD_BUNDLER;
if (bundler && !['webpack', 'turbopack'].includes(bundler)) {
  console.error('NEXT_BUILD_BUNDLER must be webpack or turbopack');
  process.exit(1);
}
const args = [require.resolve('next/dist/bin/next'), 'build'];
if (bundler === 'webpack') args.push('--webpack');
args.push(...process.argv.slice(2));
const result = spawnSync(process.execPath, args, { stdio: 'inherit' });
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
