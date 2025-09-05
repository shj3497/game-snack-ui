async function waitForVariable<T>(
  variable: () => T,
  condition: (value: T) => boolean,
  interval: number = 100,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const checkCondition = () => {
      try {
        const value = variable();

        if (condition(value)) {
          resolve(value);
        } else {
          setTimeout(checkCondition, interval);
        }
      } catch (error) {
        console.log('Error while waiting for variable:', error);
        reject(error);
      }
    };
    checkCondition();
  });
}

export default waitForVariable;
