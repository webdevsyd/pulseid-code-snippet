module.exports = api => {
  api.cache(true);
  return {
    extends: '@pulse/react-babel-config',
  };
};
