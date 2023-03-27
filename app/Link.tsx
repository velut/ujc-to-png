import NextLink from "next/link";

export default function Link({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <NextLink className="underline" href={href}>
      {children}
    </NextLink>
  );
}
