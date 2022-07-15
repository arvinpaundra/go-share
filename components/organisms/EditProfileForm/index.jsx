/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { AiFillEdit } from 'react-icons/ai';
import { toast } from 'react-toastify';
import {
  setEditDataCreator,
  setEditProfilePassword,
  setEditProfilePicture,
} from '../../../services/creators';

const IMG_URL = process.env.NEXT_PUBLIC_IMG;

const EditProfileForm = (props) => {
  const { onCloseEditProfile } = props;

  const [user, setUser] = useState({
    id_creator: 0,
    fullname: '',
    email: '',
    thumbnail: null,
  });

  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const [imagePreview, setImagePreview] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      const jwtToken = Buffer.from(token, 'base64').toString('ascii');
      const payload = jwtDecode(jwtToken);
      const creator = payload.creator;
      setUser(creator);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      fullname: user.fullname.trim(),
      email: user.email.trim(),
    };

    onCloseEditProfile(false);

    if (!user.fullname || !user.email) {
      toast.error('Field cannot be empty');
    } else {
      const response = await setEditDataCreator(data, user.id_creator);

      if (response.error) {
        toast.error(response.message);
      } else {
        Cookies.remove('token');
        router.push('/login');
        toast.success(response.message);
      }
    }
  };

  const handlePassword = async (event) => {
    event.preventDefault();

    const data = {
      password1: password1.trim(),
      password2: password2.trim(),
    };

    // onCloseEditProfile(false);

    if (!password1 || !password2) {
      toast.error('Field cannot be empty.');
    } else {
      const response = await setEditProfilePassword(data, user.id_creator);

      if (response.error) {
        toast.error(response.message);
      } else {
        Cookies.remove('token');
        router.push('/login');
        toast.success(response.message);
      }
    }
  };

  const handleProfilePicture = async (event) => {
    event.preventDefault();

    const data = new FormData();

    data.append('thumbnail', user.thumbnail);

    const response = await setEditProfilePicture(data, user.id_creator);

    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      Cookies.remove('token');
      router.push('/login');
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4">
          <div className="w-24 h-24 rounded-full relative overflow-hidden drop-shadow-md bg-white">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile image" className="w-full h-full object-cover" />
            ) : (
              <img
                src={`${IMG_URL}/profiles/${user.thumbnail}`}
                alt="Profile image"
                className="w-full h-full object-cover"
              />
            )}
            <label
              htmlFor="thumbnail"
              className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 flex justify-center items-center hover:bg-goDarkBlue/80 transition ease-in-out duration-150 cursor-pointer"
              title="Change profile picture"
            >
              <AiFillEdit color="white" size={20} />
            </label>
            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              className="hidden"
              accept="image/*"
              required
              onChange={(event) => {
                const img = event.target.files[0];
                setImagePreview(URL.createObjectURL(img));
                return setUser({
                  ...user,
                  thumbnail: img,
                });
              }}
            />
          </div>
          {imagePreview && (
            <button
              onClick={handleProfilePicture}
              className="w-24 h-fit text-center font-semibold text-base border-4 border-goDarkBlue bg-goDarkBlue hover:bg-[#0c2066] text-white rounded-lg shadow-lg py-1 mt-2 self-center"
            >
              Save
            </button>
          )}
        </div>
        <input
          type="text"
          name="fullname"
          id="fullname"
          className="border-l-4 border-goDarkBlue rounded-lg focus:outline-0 px-4 py-2 placeholder:font-medium shadow-lg"
          required
          placeholder="Enter your fullname"
          value={user.fullname}
          onChange={(event) =>
            setUser({
              ...user,
              fullname: event.target.value,
            })
          }
        />
        <input
          type="email"
          name="email"
          id="email"
          className="border-l-4 border-goDarkBlue rounded-lg focus:outline-0 px-4 py-2 placeholder:font-medium shadow-lg"
          required
          placeholder="Enter your email"
          value={user.email}
          onChange={(event) =>
            setUser({
              ...user,
              email: event.target.value,
            })
          }
        />
        <button
          onClick={handleSubmit}
          className="my-4 w-full text-center font-semibold text-base border-4 border-goDarkBlue bg-goDarkBlue hover:bg-[#0c2066] text-white rounded-lg shadow-lg py-1"
        >
          Confirm
        </button>

        <input
          type="password"
          name="password1"
          id="password1"
          className="border-l-4 border-goDarkBlue rounded-lg focus:outline-0 px-4 py-2 placeholder:font-medium shadow-lg"
          required
          placeholder="Enter your new password"
          value={password1}
          onChange={(event) => setPassword1(event.target.value)}
        />
        <input
          type="password"
          name="password2"
          id="password2"
          className="border-l-4 border-goDarkBlue rounded-lg focus:outline-0 px-4 py-2 placeholder:font-medium shadow-lg"
          required
          placeholder="Repeat your new password"
          value={password2}
          onChange={(event) => setPassword2(event.target.value)}
        />
        <button
          onClick={handlePassword}
          className="mt-4 w-full text-center font-semibold text-base border-4 border-goDarkBlue bg-goDarkBlue hover:bg-[#0c2066] text-white rounded-lg shadow-lg py-1"
        >
          Confirm
        </button>
      </div>
    </>
  );
};

export default EditProfileForm;
