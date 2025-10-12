module.exports = {
  ci: {
    collect: {
      /* Default local server LHCI should use during CI */
      serverBaseUrl: 'http://localhost:8080',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};