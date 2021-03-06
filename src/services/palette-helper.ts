import Vue from 'vue';

const palettes = [
  {
    colors: [
      '#8566aa',
      '#6983aa',
      '#8ec6c5',
      '#f4f4f4',
    ],
    name: 'Jazz Cup',
  },
  {
    colors: [
      '#febf63',
      '#ede682',
      '#ade498',
      '#7fdbda',
    ],
    name: 'Field Trip',
  },
  {
    colors: [
      '#fc5185',
      '#f5f5f5',
      '#3fc1c9',
      '#364f6b',
    ],
    name: 'Spilled Juice',
  },
  {
    colors: [
      '#c4fb6d',
      '#76ead7',
      '#393e46',
      '#364f6b',
    ],
    name: 'Starboard',
  },
  {
    colors: [
      '#e79c2a',
      '#5a3d55',
      '#3ca59d',
      '#a2de96',
    ],
    name: 'Forgetful',
  },
  {
    colors: [
      '#f4ebc1',
      '#a0c1b8',
      '#709fb0',
      '#726a95',
    ],
    name: 'Invitation',
  },
  {
    colors: [
      '#00a1ab',
      '#00263b',
      '#6f0000',
      '#ff5200',
    ],
    name: 'Hawaii',
  },
  {
    colors: [
      '#96d1c7',
      '#f5c3bc',
      '#e89da2',
      '#c9485b',
    ],
    name: 'Royal Folk',
  },
];

const store = Vue.observable({
  colors: palettes[0].colors,
  name: palettes[0].name,
});
const mutations = {
  setColors(colors: string[]) {
    store.colors = colors;
  },
  setName(name: string) {
    store.name = name;
  },
};

export default {
  mutations,
  palettes,
  store,
};
