import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <p>
        Website created by{" "}
        <Link href="https://github.com/velut">Edoardo Scibona</Link>.
      </p>

      <ul>
        <li>
          <Link href="/">Homepage</Link>
        </li>
        <li>
          <Link href="/privacy">Privacy Policy</Link>
        </li>
        <li>
          <Link href="https://github.com/velut/ujc-to-png">GitHub Project</Link>
        </li>
      </ul>
    </div>
  );
}
