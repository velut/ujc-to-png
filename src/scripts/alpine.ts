import type { Alpine } from "alpinejs";
import { converter } from "./converter";

export default (Alpine: Alpine) => {
  Alpine.data("converter", converter);
};
