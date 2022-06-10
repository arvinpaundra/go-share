import BgLogin from '../public/svg/Group 5.png';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import RegisterForm from '../components/organisms/RegisterForm';

const Register = (props) => {
  return (
    <>
      <Head>
        <title>Register Page</title>
      </Head>
      <main className="max-h-screen relative">
        <div className="w-full h-screen relative">
          <Image src={BgLogin} alt="Bg Login" objectFit="cover" layout="fill" />
        </div>

        <div className="absolute h-full top-0 right-[15%] left-[20%] flex justify-center items-center gap-5">
          <RegisterForm />

          <div className="flex flex-col items-center justify-center text-center w-full">
            <h3 className="font-semibold text-3xl text-white italic">Welcome</h3>
            <p className="text-base text-white">Enter your details and starts journey with us.</p>
            <h1 className="font-heading font-extrabold italic text-2xl text-white">
              <span className="text-goGold">Go</span>Share
            </h1>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
