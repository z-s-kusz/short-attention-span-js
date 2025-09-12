import ColorGolfRange from '@/models/ColorGolfRange';

const ranges: ColorGolfRange[] = [
  {
    name: 'Very Red',
    rMin: 200,
    rMax: 255,
    gMin: 0,
    gMax: 150,
    bMin: 0,
    bMax: 150,
  },
  {
    name: 'Very Green',
    rMin: 0,
    rMax: 150,
    gMin: 200,
    gMax: 255,
    bMin: 0,
    bMax: 150,
  },
  {
    name: 'Very Blue',
    rMin: 0,
    rMax: 150,
    gMin: 0,
    gMax: 150,
    bMin: 200,
    bMax: 255,
  },
];

const openRange = {
  name: 'Full Random',
  rMin: 0,
  rMax: 255,
  gMin: 0,
  gMax: 255,
  bMin: 0,
  bMax: 255,
};

const getRandomIndex = (arr: ColorGolfRange[]): number => {
  return Math.floor(Math.random() * arr.length);
};

const generateRanges = (numberOfHoles: number): ColorGolfRange[] => {
  const rangesForEachHole = [];
  const availableRanges = [...ranges];
  for (let i = 0; i < numberOfHoles; i++) {
    if (availableRanges.length === 0) {
      availableRanges.push(openRange);
      console.error(`ran out of unique ranges, adding a default range for hole #${i + 1}`);
    }
    const rangeIndex = getRandomIndex(availableRanges);
    rangesForEachHole.push(availableRanges[rangeIndex]);
    availableRanges.splice(rangeIndex, 1);
  }

  return rangesForEachHole;
};

export default {
  allRangeOptions: ranges,
  openRange,
  generateRanges,
};
