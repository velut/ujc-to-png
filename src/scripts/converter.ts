import Alpine from "alpinejs";
import accept from "attr-accept";
import { saveAs } from "file-saver";
import { fromEvent } from "file-selector";
import { createImageFiles, type ImageFile } from "../lib/create-image-files";
import { parseNonograms, type Nonogram } from "../lib/parse-nonograms";
import { revokeObjectUrls } from "../lib/revoke-object-urls";
import { zipImages } from "../lib/zip-images";
import { defineComponent } from "./define-components";

export const converter = defineComponent(() => ({
  isBusy: false,
  nonograms: [] as Nonogram[],
  images: [] as ImageFile[],
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
      Alpine.debounce(async () => {
        this.isBusy = true;
        await this.renderImages();
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
    await this.renderImages();
    (document.getElementById("dropzone-input") as HTMLInputElement).value = "";
    this.isBusy = false;
  },
  async renderImages() {
    revokeObjectUrls(this.images);
    // Prevent $watch from triggering on later assignments.
    const opts = {
      ...this.renderOptions,
      grid: { ...this.renderOptions.grid },
    };
    opts.scale = Number.isInteger(Number(opts.scale))
      ? Math.max(1, Number(opts.scale))
      : 1;
    opts.grid.radius = Number.isInteger(Number(opts.grid.radius))
      ? Math.max(0, Number(opts.grid.radius))
      : 0;
    this.images = await createImageFiles(this.nonograms, opts);
  },
  async downloadImages() {
    if (this.images.length === 0) {
      return;
    }
    if (this.images.length === 1) {
      const image = this.images[0];
      saveAs(image.file, image.file.name);
      return;
    }
    saveAs(await zipImages(this.images), "nonograms.zip");
  },
}));
