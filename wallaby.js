module.exports = function config(wallaby) {
  return {
    files: [
      'src/pagination/**/*.js',
    ],

    tests: [
      'test/**/*.spec.js',
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        presets: ['es2015'],
      }),
    },

    env: {
      type: 'node',
      runner: 'node',
    },
  };
};
