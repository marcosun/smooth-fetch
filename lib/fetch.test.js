import fetch from './fetch';

test('Throw error if baseOptions is not an object', () => {
  expect(() => {
    fetch(1);
  }).toThrow();

  expect(() => {
    fetch('1');
  }).toThrow();
});
