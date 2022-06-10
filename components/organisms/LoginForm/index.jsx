import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { setLogin } from '../../../services/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    if (!email || !password) {
      toast.error('Field can not be empty.');
    } else {
      const response = await setLogin(data);

      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        const token = response.data.token;
        const tokenBase64 = Buffer.from(token).toString('base64');
        Cookies.set('token', tokenBase64);

        router.push('/');
      }
    }
  };

  return (
    <form className="flex flex-col w-fit bg-[#FBFBFB] p-6 rounded-3xl shadow-2xl">
      <h3 className="font-bold text-goDarkBlue text-3xl mb-6">Login</h3>
      <input
        type="email"
        name="email"
        id="email"
        required
        placeholder="Email"
        className="w-96 border-l-4 border-goDarkBlue rounded-lg focus:outline-0 px-4 py-2 placeholder:font-medium shadow-lg mb-4"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        name="password"
        id="password"
        required
        placeholder="Password"
        className="w-96 border-l-4 border-goDarkBlue rounded-lg focus:outline-0 px-4 py-2 placeholder:font-medium shadow-lg mb-10"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button
        type="submit"
        className="text-center font-semibold text-xl border border-goDarkBlue bg-goDarkBlue hover:bg-[#0c2066] text-white rounded-lg py-1 mb-4"
        onClick={handleSubmit}
      >
        LOG IN
      </button>
      <Link href="/register">
        <a className="text-center font-semibold text-xl border border-goDarkBlue bg-transparent text-goDarkBlue hover:bg-goDarkBlue hover:text-white rounded-lg py-1">
          REGISTER
        </a>
      </Link>
    </form>
  );
};

export default LoginForm;
