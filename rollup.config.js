import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/client.js',
  output: { file: 'dist/landing/client.js', format: 'es' },
  plugins: [nodeResolve(), terser()],
};
