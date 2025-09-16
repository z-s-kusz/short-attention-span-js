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
  {
    name: 'purple - pink',
    rMin: 137,
    rMax: 255,
    gMin: 0,
    gMax: 113,
    bMin: 128,
    bMax: 255,
  },
  {
    name: 'orangy',
    rMin: 200,
    rMax: 255,
    gMin: 125,
    gMax: 204,
    bMin: 0,
    bMax: 47,
  },
  {
    name: 'tealy',
    rMin: 0,
    rMax: 0,
    gMin: 158,
    gMax: 211,
    bMin: 158,
    bMax: 255,
  },
  {
    name: 'yellow-green',
    rMin: 193,
    rMax: 255,
    gMin: 207,
    gMax: 255,
    bMin: 0,
    bMax: 0,
  },
  {
    name: 'easter-pale',
    rMin: 233,
    rMax: 255,
    gMin: 193,
    gMax: 255,
    bMin: 223,
    bMax: 255,
  },
  {
    name: 'dark',
    rMin: 0,
    rMax: 117,
    gMin: 0,
    gMax: 127,
    bMin: 0,
    bMax: 110,
  },
  {
    name: 'green*',
    rMin: 0,
    rMax: 255,
    gMin: 219,
    gMax: 255,
    bMin: 90,
    bMax: 136,
  },
  {
    name: 'blue*',
    rMin: 0,
    rMax: 255,
    gMin: 135,
    gMax: 192,
    bMin: 209,
    bMax: 255,
  },
  {
    name: 'red*',
    rMin: 214,
    rMax: 255,
    gMin: 0,
    gMax: 255,
    bMin: 128,
    bMax: 173,
  },
  {
    name: 'orange*',
    rMin: 214,
    rMax: 255,
    gMin: 135,
    gMax: 157,
    bMin: 0,
    bMax: 103,
  },
  {
    name: 'teal*',
    rMin: 0,
    rMax: 176,
    gMin: 223,
    gMax: 255,
    bMin: 130,
    bMax: 192,
  },
  {
    name: 'maroony*',
    rMin: 116,
    rMax: 171,
    gMin: 0,
    gMax: 42,
    bMin: 95,
    bMax: 84,
  },
  {
    name: 'no-blue',
    rMin: 0,
    rMax: 255,
    gMin: 0,
    gMax: 255,
    bMin: 0,
    bMax: 0,
  },
  {
    name: 'no-green',
    rMin: 0,
    rMax: 255,
    gMin: 0,
    gMax: 0,
    bMin: 0,
    bMax: 255,
  },
  {
    name: 'no-red',
    rMin: 0,
    rMax: 0,
    gMin: 0,
    gMax: 255,
    bMin: 0,
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
  console.log('chosen ranges', rangesForEachHole.map((r) => r.name));
  return rangesForEachHole;
};

export default {
  allRangeOptions: ranges,
  openRange,
  generateRanges,
};
