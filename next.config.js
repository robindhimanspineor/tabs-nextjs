module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: '/ab',
        destination: '/about',
      },
    ];
  };
  return {
    rewrites,
  };
};
