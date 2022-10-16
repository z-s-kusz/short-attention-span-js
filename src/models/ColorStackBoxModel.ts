export default interface ColorStackBoxModel {
  hsl: string;
  index: number;
  isAnchor: boolean;
  active: boolean;
}
// add highlight to show when a box is in the wrong spot, or inversly in thw right spot?
// change index to id since they get moved around and index is a bit of a misnomer
// active to isActive for consistency
