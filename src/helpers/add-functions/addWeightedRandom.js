export default function weightedRandom(max, bellFactor) {
  let result = 0;
  for (let i = 0; i < bellFactor; i++) {
    result += Math.random() * (max/bellFactor);
  }
  return Math.floor(result);
}
