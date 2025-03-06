import { BlobReader, BlobWriter, ZipWriter } from "@zip.js/zip.js";
import Alpine from "alpinejs";
import accept from "attr-accept";
import { saveAs } from "file-saver";
import { fromEvent } from "file-selector";
import pMap, { pMapSkip } from "p-map";
import { createImageFiles, type ImageFile } from "../lib/create-image-files";
import type { Nonogram } from "../lib/nonogram";
import { parseNonograms } from "../lib/parse-nonogram";
import { revokeObjectUrls } from "../lib/revoke-object-urls";
import { unzipNonograms } from "../lib/unzip-nonograms";
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
        accept(
          file,
          "application/octet-stream,.ujc,image/png,.png,application/zip,.zip",
        ),
      );
    await this.processFiles(files);
    (document.getElementById("dropzone-input") as HTMLInputElement).value = "";
    this.isBusy = false;
  },
  async processFiles(files: File[]) {
    const supportedFiles = await pMap(
      files,
      async (file) => {
        try {
          const filename = file.name.toLowerCase();
          if (filename.endsWith(".ujc") || filename.endsWith(".png")) {
            return file;
          }
          if (filename.endsWith(".zip")) {
            const files = await unzipNonograms(file);
            return files;
          }
          throw new Error(`processFiles: unsupported file type: ${file.name}`);
        } catch {
          return pMapSkip;
        }
      },
      { concurrency: 8 },
    );
    this.nonograms = await parseNonograms(supportedFiles.flat());
    await this.renderImages();
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
    if (this.images.length === 1) {
      const image = this.images[0];
      saveAs(image.file, image.file.name);
      return;
    }
    const zip = new ZipWriter(new BlobWriter("application/zip"));
    await Promise.all(
      this.images.map((image) =>
        zip.add(image.file.name, new BlobReader(image.file)),
      ),
    );
    const blob = await zip.close();
    saveAs(blob, "nonograms.zip");
  },
}));
