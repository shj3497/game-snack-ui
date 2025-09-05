const entryRoulette = (): Promise<number> => {
  const points = [1, 0];
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomPoint = points[Math.floor(Math.random() * points.length)];
      // resolve(0);
      resolve(randomPoint);
    }, 2000);
  });
};

export {entryRoulette};
