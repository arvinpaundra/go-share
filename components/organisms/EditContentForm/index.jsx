import { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { toast } from 'react-toastify';
import { ActiveContentCtx } from '../../../context/getActiveContent';
import { getDetailContentAPI, setEditContent } from '../../../services/contents';

const EditContentForm = ({ setFetchContents, onCloseEdit }) => {
  const { idContent } = useContext(ActiveContentCtx);

  const [content, setContent] = useState({
    title: '',
    url: '',
    thumbnail: null,
  });
  const [error, setError] = useState(null);
  const [title, setTitle] = useState();
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState();

  const titleRef = useRef('');
  const urlRef = useRef('');

  const getDetailContent = useCallback(async (id_content) => {
    try {
      const response = await getDetailContentAPI(id_content);

      if (response.error) {
        throw new Error(response.message);
      }

      setContent(response.data.result);
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    getDetailContent(idContent);
  }, [getDetailContent, idContent]);

  useEffect(() => {
    titleRef.current = title;
    urlRef.current = url;
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();

    data.append('title', titleRef);
    data.append('url', urlRef);
    data.append('thumbnail', thumbnail);

    onCloseEdit(false);

    for (let value of data.values()) {
      console.log('data: ', value);
    }

    if (!titleRef || !urlRef || !thumbnail) {
      toast.error('Field can not be empty.');
    } else {
      return;
      const response = await setEditContent(data);

      if (response.error) {
        toast.error(response.message);
      } else {
        setFetchContents(true);
        toast.success(response.message);
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
          value={content.title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          name="url"
          id="url"
          required
          placeholder="Enter URL"
          className="border-l-4 border-goDarkBlue rounded-lg focus:outline-0 px-4 py-2 placeholder:font-medium shadow-lg"
          value={content.url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          required
          placeholder="Choose Thumbnail"
          className="border-l-4 border-goDarkBlue rounded-lg focus:outline-0 px-4 py-2 placeholder:font-medium shadow-lg"
          onChange={(event) => setThumbnail(event.target.files[0])}
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

export default EditContentForm;
