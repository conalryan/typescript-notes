module.exports = {
  name: 'phonecat',
  exposes: {
    './Module': 'apps/phonecat/src/app/remote-entry/entry.module.ts',
  },
};
