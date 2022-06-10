import { useState } from 'react';
import { toast } from 'react-toastify';
import { setAddContent } from '../../../services/contents';

const NewContentForm = ({ id_creator, setFetchContents, onCloseAdd }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFetchContents(true);

    const data = {
      title: title,
      url: url,
      thumbnail: thumbnail,
      id_creator: id_creator,
    };

    if (!title || !url) {
      toast.error('Field can not be empty.');
    } else {
      const response = await setAddContent(data);

      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        onCloseAdd(false);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <input
          type="text"
          name="title"
          id="title"
          required
          placeholder="Enter Title"
          className="border-l-4 border-goDarkBlue rounded-lg focus:outline-0 px-4 py-2 placeholder:font-medium shadow-lg"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          required
          placeholder="Choose Thumbnail"
          className="border-l-4 border-goDarkBlue rounded-lg focus:outline-0 px-4 py-2 placeholder:font-medium shadow-lg"
          value={thumbnail}
          onChange={(event) => setThumbnail(event.target.value)}
        />
        <input
          type="text"
          name="url"
          id="url"
          required
          placeholder="Enter URL"
          className="border-l-4 border-goDarkBlue rounded-lg focus:outline-0 px-4 py-2 placeholder:font-medium shadow-lg"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <p className="italic text-sm -mt-2">
          *Enter URL youtube.com/watch?v=<span className="text-red-600">CopyThis</span>
        </p>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-8 w-full text-center font-semibold text-base border-4 border-goDarkBlue bg-goDarkBlue hover:bg-[#0c2066] text-white rounded-lg shadow-lg py-1 mb-4"
      >
        Upload
      </button>
    </>
  );
};

export default NewContentForm;
