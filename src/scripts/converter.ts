import Alpine from "alpinejs";
import accept from "attr-accept";
import { saveAs } from "file-saver";
import { fromEvent } from "file-selector";
import { parseNonograms, type Nonogram } from "../lib/parse-nonograms";
import {
  renderImages,
  type Image,
  type RenderOptions,
} from "../lib/render-images";
import { revokeObjectUrls } from "../lib/revoke-object-urls";
import { zipImages } from "../lib/zip-images";
import { defineComponent } from "./define-components";

export const converter = defineComponent(() => ({
  isBusy: false,
  nonograms: [] as Nonogram[],
  images: [] as Image[],
  renderOptions: {
    recolor: false,
    scale: 1,
    grid: {
      enabled: false,
      size: 1,
      color: "#000000",
      radius: 0,
    },
  },
  init() {
    this.$watch(
      "renderOptions",
      Alpine.debounce(async (options: RenderOptions) => {
        this.isBusy = true;
        await this.renderImages(options);
        this.isBusy = false;
      }, 500),
    );
  },
  async handleUpload(event: Event) {
    this.isBusy = true;
    const files = (await fromEvent(event))
      .filter((res) => res instanceof File)
      .filter((file) =>
        accept(file, [
          "application/octet-stream",
          ".ujc",
          "image/png",
          ".png",
          "application/zip",
          ".zip",
        ]),
      );
    this.nonograms = await parseNonograms(files);
    await this.renderImages(this.renderOptions);
    (document.getElementById("dropzone-input") as HTMLInputElement).value = "";
    this.isBusy = false;
  },
  async renderImages(options: RenderOptions) {
    // Revoke object URLs for previously rendered images.
    revokeObjectUrls(this.images);
    this.images = await renderImages(this.nonograms, options);
  },
  async downloadImages() {
    if (this.images.length === 0) {
      return;
    }
    if (this.images.length === 1) {
      const image = this.images[0]!;
      saveAs(image.file, image.file.name);
      return;
    }
    saveAs(await zipImages(this.images), "nonograms.zip");
  },
}));
