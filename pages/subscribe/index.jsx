import Head from 'next/head';
import Navbar from '../../components/organisms/Navbar';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import SubscribeModal from '../../components/organisms/SubscribeModal';
import SubscribeCard from '../../components/organisms/SubscribeCard';

const Subscribe = (props) => {
  const { creator } = props;
  const [isOpen, onClose] = useState(false);

  return (
    <>
      <Head>
        <title>Subscribe now</title>
      </Head>
      <Navbar id_creator={creator.id_creator} />
      <main className="flex justify-center items-center min-h-screen bg-[#F9F9F9]">
        <SubscribeCard status={creator.status} onClose={onClose} />
      </main>

      <SubscribeModal isOpen={isOpen} onClose={onClose} id_creator={creator.id_creator} />
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

export default Subscribe;
