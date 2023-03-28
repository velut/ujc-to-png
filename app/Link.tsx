import NextLink from "next/link";

export default function Link({
  href,
  children,
  className = "underline",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <NextLink className={className} href={href}>
      {children}
    </NextLink>
  );
}
