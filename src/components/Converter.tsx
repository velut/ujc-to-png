import { Provider } from "jotai";
import ConverterDropzone from "./ConverterDropzone";
import ConverterGallery from "./ConverterGallery";
import ConverterOptions from "./ConverterOptions";

export default function Converter() {
  return (
    <Provider>
      <ConverterDropzone />
      <ConverterGallery />
      <ConverterOptions />
    </Provider>
  );
}
