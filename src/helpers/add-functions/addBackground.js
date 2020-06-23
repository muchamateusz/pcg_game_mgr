export default function addBackground() {
  for (let i = 0; i <= this.gWidht; i += this.globals.backgroundTileSize) {
    for (let y = 0; y <= this.gHeight; y += this.globals.backgroundTileSize) {
      this.globals.gameSceneBg = this.add.sprite(i, y, "BACKGROUND");
      this.globals.gameSceneBg.setFlip(
        Math.floor(Math.random() * 2),
        Math.floor(Math.random() * 2)
      );
    }
  }
}
