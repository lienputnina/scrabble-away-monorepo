import { babel } from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.es.js',
        format: 'es',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [
      image(),
      postcss({
        extract: true,
        modules: false,
        minimize: true,
        sourceMap: true,
      }),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
        babelHelpers: 'bundled',
      }),
      peerDepsExternal(),
      resolve(),
      typescript({
        sourceMap: true,
        declaration: true,
        exclude: ['**/*.test.*', '**/*.stories.*'],
        skipLibCheck: true,
        cacheDir: 'node_modules/.cache',
      }),
      terser(),
    ],
  },
];
