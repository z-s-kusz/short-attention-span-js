const store = {
  globalVolume: 0.25,
  setGlobalVolume(volume: number) {
    this.globalVolume = volume;
  },
};

export default {
  store,
};
