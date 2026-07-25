/**
 * Proves the harness itself runs: vitest globals, the jsdom environment, and
 * the setup file's browser stubs. Real suites live next to the code they cover.
 */
describe('test harness', () => {
  it('runs vitest with globals enabled', () => {
    expect(true).toBe(true);
  });

  it('provides a jsdom document', () => {
    expect(document.body).toBeInTheDocument();
  });

  it('stubs the browser APIs the app relies on', () => {
    expect(window.matchMedia('(max-width: 768px)').matches).toBe(false);
    expect(typeof IntersectionObserver).toBe('function');
  });
});
