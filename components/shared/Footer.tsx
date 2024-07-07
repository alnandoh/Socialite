import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full py-4 bg-primary-foreground border-t">
      <div className="wrapper flex justify-between items-center">
        <Link href="/">Socialite</Link>
        <p className="text-sm">© Socialite. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
