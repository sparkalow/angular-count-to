basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'test/lib/angular/angular.min.js',
  'test/lib/angular/angular-mocks.js',
  'src/count-to.js',
  'test/unit/directivesSpec.js'
];
//logLevel = LOG_DEBUG;

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};