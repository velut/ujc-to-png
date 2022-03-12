import type { NextPage } from "next";
import Link from "next/link";
import { Dropzone } from "../components/Dropzone";
import { Gallery } from "../components/Gallery";

const Home: NextPage = () => {
  return (
    <div className="space-y-8 px-4">
      <div>
        <h1>ujc to png</h1>
        <p>
          Convert and save puzzles from{" "}
          <a
            className="underline"
            href="https://play.google.com/store/apps/details?id=com.ucdevs.jcross"
          >
            Nonogram Katana
          </a>
        </p>
      </div>

      <div>
        <p>Instructions to drag and drop</p>
      </div>

      <div>
        <Dropzone />
      </div>

      <div>
        <Gallery />
      </div>

      <div>
        <footer>
          <Link href="/privacy">
            <a className="underline">Privacy Policy</a>
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Home;
