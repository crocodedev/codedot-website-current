/* eslint-disable no-template-curly-in-string */
module.exports = {
  presets: ['babel-preset-gatsby'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          components: './src/components',
          containers: './src/containers',
          hooks: './src/hooks',
          utils: './src/utils',
        },
      },
    ],
    [
      'import',
      {
        libraryName: 'react-bootstrap',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'tree-shaking-react-bootstrap',
    ],
    [
      'transform-imports',
      {
        '@fortawesome/free-solid-svg-icons': {
          transform: '@fortawesome/free-solid-svg-icons/${member}',
          skipDefaultConversion: true,
        },
        '@fortawesome/free-brands-svg-icons': {
          transform: '@fortawesome/free-brands-svg-icons/${member}',
          skipDefaultConversion: true,
        },
        ramda: {
          transform: 'ramda/src/${member}',
          preventFullImport: true,
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['transform-react-remove-prop-types'],
    },
  },
}
