import ConverterDropzone from "./ConverterDropzone";
import ConverterGallery from "./ConverterGallery";
import ConverterOptions from "./ConverterOptions";

export default function Converter() {
  return (
    <>
      <ConverterDropzone />
      <ConverterOptions />
      <ConverterGallery />
    </>
  );
}
