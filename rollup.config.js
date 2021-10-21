import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import filesize from 'rollup-plugin-filesize';

export default ['scripts'].map(name => ({
  input: `src/static/js/${name}.js`,
  output: [
    {
      file: `_site/static/js/${name}.js`,
      format: 'es',
      sourcemap: false,
      name,
    },
  ],
  plugins: [
    nodeResolve(),
    babel({ babelHelpers: 'bundled' }),
    commonjs(),
    terser(),
    filesize(),
  ],
}));
