module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: true,
      tsConfig: "<rootDir>/tsconfig.json",
    }
  },
  moduleDirectories: [
    'node_modules',
    __dirname
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  preset: 'ts-jest',
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testURL: 'http://localhost:3003/',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(validate)/)'
  ]
};
