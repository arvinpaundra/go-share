import Link from 'next/link';

const Navbar = (props) => {
  return (
    <header className="sm:px-4 md:px-24 bg-[#54C1FB] fixed top-0 left-0 w-full drop-shadow-lg z-50">
      <nav className="flex justify-between items-center h-14">
        <h1 className="font-heading font-semibold text-xl text-white">
          <Link href="/">
            <a>GoShare</a>
          </Link>
        </h1>
        <p>Diisi apa ?</p>
        {/* <ul className="flex justify-center items-center sm:gap-3 md:gap-6 text-base font-semibold tracking-wide text-white">
          <li className="hover:text-[#FFBB00] text-[#FFBB00]">
            <Link href="/">
              <a>Discover</a>
            </Link>
          </li>
          <li className="hover:text-[#FFBB00]">
            <Link href="/pricing">
              <a>Pricing</a>
            </Link>
          </li>
          <li className="hover:text-[#FFBB00]">
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </li>
        </ul> */}
      </nav>
    </header>
  );
};

export default Navbar;
