import NextLink from "next/link";

export type LinkProps = {
  href: string;
  children: React.ReactNode;
};

export const Link = ({ href, children }: LinkProps) => {
  return (
    <NextLink className="underline" href={href}>
      {children}
    </NextLink>
  );
};
