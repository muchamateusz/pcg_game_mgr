export default function weightedRandom(max, bellFactor) {
    var num = 0;
    for (var i = 0; i < bellFactor; i++) {
        num += Math.random() * (max/bellFactor);
    }
    return Math.floor(num);
}
