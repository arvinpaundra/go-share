/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useState } from 'react';
import ProfilePoints from '../../components/organisms/ProfilePoints';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import NewContentModal from '../../components/organisms/NewContentModal';
import Head from 'next/head';
import ProfileContents from '../../components/organisms/ProfileContents';
import EditContentModal from '../../components/organisms/EditContentModal';
import { AiFillEdit } from 'react-icons/ai';
import PPImage from '../../public/images/pp-fallback.jpg';

const ROOT_IMG = process.env.NEXT_PUBLIC_IMG;

const Profile = ({ creator }) => {
  const [isOpenAdd, onCloseAdd] = useState(false);
  const [isOpenEdit, onCloseEdit] = useState(false);
  const [fetchContents, setFetchContents] = useState(true);

  const router = useRouter();

  const onLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>My Profile</title>
      </Head>
      <header className="h-16 sm:px-4 md:px-24 bg-goDarkBlue flex flex-col justify-center fixed top-0 left-0 w-full z-40">
        <nav className="flex justify-between items-center">
          <h1 className="font-heading font-extrabold italic text-2xl text-white">
            <Link href="/">
              <a>
                <span className="text-goGold">Go</span>Share
              </a>
            </Link>
          </h1>
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
              <button
                onClick={onLogout}
                className="text-goDarkBlue bg-goGold px-4 py-0.5 font-semibold rounded-md"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="rounded-bl-2xl rounded-br-2xl shadow-xl absolute top-16 left-0 w-full drop-shadow-lg z-30 h-24 bg-goDarkBlue flex justify-between">
          <div className="absolute top-[25%] left-24 w-36 h-36 rounded-full overflow-hidden drop-shadow-md bg-white">
            <img
              src={creator.thumbnail ? `${ROOT_IMG}/profiles/${creator.thumbnail}` : PPImage}
              alt="Profile Image"
            />

            <label
              htmlFor="profile"
              className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 flex justify-center items-center hover:bg-goDarkBlue/80 transition ease-in-out duration-150 cursor-pointer"
            >
              <AiFillEdit color="white" size={24} />
            </label>
            <input type="file" name="thumbnail" id="profile" className="hidden" />
          </div>

          <h2 className="absolute bottom-2 left-64 font-bold text-3xl text-white italic">
            {creator.fullname}
          </h2>

          <ProfilePoints id_creator={creator.id_creator} />
        </div>

        <ProfileContents
          id_creator={creator.id_creator}
          fetchContents={fetchContents}
          setFetchContents={setFetchContents}
          onCloseAdd={onCloseAdd}
          onCloseEdit={onCloseEdit}
          email={creator.email}
        />
      </main>

      <NewContentModal
        isOpenAdd={isOpenAdd}
        onCloseAdd={onCloseAdd}
        id_creator={creator.id_creator}
        setFetchContents={setFetchContents}
      />

      <EditContentModal
        isOpenEdit={isOpenEdit}
        onCloseEdit={onCloseEdit}
        id_creator={creator.id_creator}
        setFetchContents={setFetchContents}
      />
    </>
  );
};

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const jwtToken = Buffer.from(token, 'base64').toString('ascii');
  const payload = jwtDecode(jwtToken);
  const { creator } = payload;

  return {
    props: {
      creator,
    },
  };
}

export default Profile;
