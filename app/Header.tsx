import Link from "next/link";

export default function Header() {
  return (
    <div>
      <h1 className="text-center">
        <Link className="no-underline hover:underline" href="/">
          ujc to png
        </Link>
      </h1>
      <p className="text-center">
        Download your puzzle designs from{" "}
        <Link href="https://play.google.com/store/apps/details?id=com.ucdevs.jcross">
          Nonograms Katana
        </Link>{" "}
        as simple images.
      </p>
    </div>
  );
}
