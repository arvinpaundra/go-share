import { Dialog } from '@headlessui/react';
import Link from 'next/link';
import { FaUserAstronaut } from 'react-icons/fa';
import { useState } from 'react';
import NavbarPoints from '../NavbarPoints';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Navbar = (props) => {
  const { id_creator } = props;
  const [isOpen, onClose] = useState(false);

  const router = useRouter();

  const onLogout = () => {
    Cookies.remove('token');
    router.push('/login');
    onClose((prevState) => !prevState);
  };

  return (
    <>
      <header className="sm:px-4 md:px-24 py-2 bg-goDarkBlue rounded-bl-2xl flex flex-col justify-center rounded-br-2xl shadow-xl fixed top-0 left-0 w-full drop-shadow-lg z-30">
        <nav className="flex justify-between items-center h-14">
          <h1 className="font-heading font-extrabold italic text-2xl text-white">
            <Link href="/">
              <a>
                <span className="text-goGold">Go</span>Share
              </a>
            </Link>
          </h1>
          <NavbarPoints id_creator={id_creator} />
          <ul className="flex justify-center items-center sm:gap-3 md:gap-8 text-base font-semibold tracking-wide text-white">
            <li>
              <Link href="/">
                <a>Discover</a>
              </Link>
            </li>
            <li>
              <Link href="/subscribe">
                <a>Subscribe</a>
              </Link>
            </li>
            <li>
              <button onClick={() => onClose((prevState) => !prevState)}>
                <FaUserAstronaut />
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <Dialog open={isOpen} onClose={onClose} className="relative z-40">
        <div className="fixed inset-0 bg-black bg-opacity-30" />

        <Dialog.Panel className="fixed top-20 right-24 bg-white rounded-xl p-4 shadow-xl flex flex-col gap-2 w-52 font-medium">
          <Link href="/profile">
            <a>Profile</a>
          </Link>
          <div className="border-b border-goDarkBlue" />
          <button className="text-left font-medium" onClick={onLogout}>
            Logout
          </button>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default Navbar;
