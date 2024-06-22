import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full py-4 bg-primary-foreground">
      <div className="wrapper flex justify-between items-center">
        {/* <div className="flex justify-between items-center my-8">
          <div className="flex flex-col gap-2">
            <p className="font-medium mb-2 px-4">About Us</p>
            <Link href="/" className="footer-nav-link text-sm">
              Company
            </Link>
            <Link href="/" className="footer-nav-link text-sm">
              Leadership
            </Link>
            <Link href="/" className="footer-nav-link text-sm">
              Our Features
            </Link>
            <Link href="/" className="footer-nav-link text-sm">
              Pricing
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium mb-2 px-4">Contact Us</p>
            <Link href="/" className="footer-nav-link text-sm">
              Contact
            </Link>
            <Link href="/" className="footer-nav-link text-sm">
              F.A.Q
            </Link>
            <Link href="/" className="footer-nav-link text-sm">
              Terms of service
            </Link>
            <Link href="/" className="footer-nav-link text-sm">
              Privacy Policy
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium mb-2 px-4">Connect with us</p>
            <Link href="/" className="footer-nav-link text-sm">
              Company
            </Link>
            <Link href="/" className="footer-nav-link text-sm">
              Leadership
            </Link>
            <Link href="/" className="footer-nav-link text-sm">
              Our Features
            </Link>
            <Link href="/" className="footer-nav-link text-sm">
              Pricing
            </Link>
          </div>
        </div> */}
        <Link href="/">Socialite</Link>
        <p className="text-sm">© Socialite. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
