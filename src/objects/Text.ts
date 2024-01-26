import * as THREE from "three";

export class Text extends THREE.Sprite {
  constructor(text: string, size: number) {
    super();

    const resolution = 20;
    this.material.map = createTexture(text, size, resolution);
    this.material.depthTest = false;

    this.renderOrder = 99;
    this.scale.set(
      this.material.map.image.width / resolution / devicePixelRatio,
      size,
      1
    );
  }

  dispose() {
    this.geometry.dispose();
    this.material.map?.dispose();
    this.material.dispose();
  }
}

function createTexture(
  text: string,
  size: number,
  resolution: number,
  color?: string,
  background?: string
) {
  const fontHeightPx = resolution * size * devicePixelRatio;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.font = `${fontHeightPx}px Arial`;

    canvas.width = ctx.measureText(text).width;
    canvas.height = fontHeightPx;

    if (background != "transparent") ctx.fillStyle = background || "#0d0d0d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = color || "#ffffff";
    const toMargin = 0.9;
    ctx.font = `${fontHeightPx * toMargin}px Arial`;
    const toCenterTextV = 0.08 * canvas.height;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 + toCenterTextV);
  }

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  return texture;
}
