module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: false,
  collectCoverageFrom: ["src/components/**/*.vue"],
  coverageReporters: [
    "json-summary",
    "text",
    "lcov"
  ]
}
