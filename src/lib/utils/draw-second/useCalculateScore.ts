import {Coordinate, DiagramType} from './type';

function removeDuplicates(points: Coordinate[]): Coordinate[] {
  const uniquePoints: Coordinate[] = [];
  const seen = new Set<string>();

  for (const point of points) {
    const identifier = `${point.x},${point.y}`;
    if (!seen.has(identifier)) {
      seen.add(identifier);
      uniquePoints.push(point);
    }
  }

  return uniquePoints;
}

const useCalculateScore = (type: DiagramType) => {
  let factorValue = 6;
  switch (type) {
    case 'square':
      factorValue = 8;
      break;
    case 'circle':
      factorValue = 8;
      break;
    case 'triangle':
      factorValue = 6;
      break;
    case 'rhombus':
      factorValue = 8;
      break;
    case 'pentagon':
      factorValue = 6;
      break;
  }

  function calculateDistance(
    basePoint: Coordinate,
    userPoint: Coordinate,
  ): number {
    const deltaX = userPoint.x - basePoint.x;
    const deltaY = userPoint.y - basePoint.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }

  const calculateScore = (basePath: Coordinate[], userPath: Coordinate[]) => {
    const basePathLength = basePath.length;
    let matchingBasePaths: Coordinate[] = [];

    for (let i = 0; i < basePathLength; i++) {
      for (let j = 0; j < userPath.length; j++) {
        const distance = calculateDistance(basePath[i], userPath[j]);
        if (distance <= factorValue) {
          matchingBasePaths.push(basePath[i]);
        }
      }
    }

    const pureMatchingBasePaths = removeDuplicates(matchingBasePaths);

    const score = Math.round(
      (pureMatchingBasePaths.length / basePathLength) * 100,
    );

    return score;
  };

  return {calculateScore};
};

export default useCalculateScore;
