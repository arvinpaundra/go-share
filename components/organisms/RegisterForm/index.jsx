import { useState } from 'react';
import Link from 'next/link';
import { setRegister } from '../../../services/auth';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      fullname,
      email,
      password,
    };

    if (!fullname || !email || !password) {
      toast.error('Data harus lengkap');
    } else {
      const response = await setRegister(data);

      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success(response.message);

        router.push('/login');
      }
    }
  };
  return (
    <form className="flex flex-col w-fit bg-[#FBFBFB] p-6 rounded-3xl shadow-2xl">
      <h3 className="font-bold text-goDarkBlue text-3xl mb-6">Register</h3>
      <input
        type="nama_lengkap"
        name="nama_lengkap"
        id="nama_lengkap"
        required
        placeholder="Full Name"
        className="w-96 border-l-4 border-goDarkBlue rounded-lg focus:outline-0 px-4 py-2 placeholder:font-medium shadow-lg mb-4"
        value={fullname}
        onChange={(event) => setFullname(event.target.value)}
      />
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
        REGISTER
      </button>
      <Link href="/login">
        <a className="text-center font-medium text-sm rounded-md py-1">Already have an account?</a>
      </Link>
    </form>
  );
};

export default RegisterForm;
