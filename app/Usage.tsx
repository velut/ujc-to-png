import Link from "./Link";

export default function Usage() {
  return (
    <>
      <h2>Usage</h2>
      <p>
        With this tool, nonogram authors can easily convert their own designs
        from the <code>.ujc</code> files exported from the app to normal{" "}
        <code>.png</code> images as follows.
      </p>

      <ul>
        <li>
          <p>
            <strong>Step 1: Export Your Data From The App</strong>
          </p>
          <p>
            To start, open the Nonograms Katana Android app, then tap on the{" "}
            <Link href="https://nonograms-katana.fandom.com/wiki/Settings">
              <code>Settings</code>
            </Link>{" "}
            icon in the top right corner; once in the settings, open the menu
            named <code>Other</code> and select{" "}
            <code>Save progress to file (zip)</code> to export an archive of
            your data.
          </p>
        </li>
        <li>
          <p>
            <strong>Step 2: Extract The Data Archive</strong>
          </p>
          <p>
            Using your preferred file manager, extract the{" "}
            <code>NonogramsKatana.zip</code> archive so that the folder named{" "}
            <code>MyNonograms</code> becomes accessible. This folder contains
            all your nonograms saved as <code>.ujc</code> files.
          </p>
        </li>
        <li>
          <p>
            <strong>Step 3: Drag and Drop Your Files</strong>
          </p>
          <p>
            Now, you can drag and drop the <code>.ujc</code> files in the area
            below; alternatively, you can tap on the same area to open a file
            picker dialog where you can select the files. After a short while,
            the converted images will appear in the gallery below ready to
            download.
          </p>
        </li>
      </ul>
    </>
  );
}
