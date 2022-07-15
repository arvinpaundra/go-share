/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useContext, useCallback } from 'react';
import { toast } from 'react-toastify';
import { ActiveContentCtx } from '../../../context/getActiveContent';
import { getDetailContentAPI, setEditContent } from '../../../services/contents';

const IMG_URL = process.env.NEXT_PUBLIC_IMG;

const EditContentForm = ({ setFetchContents, onCloseEdit }) => {
  const { idContent } = useContext(ActiveContentCtx);

  const [content, setContent] = useState({
    title: '',
    url: '',
    thumbnail: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const [error, setError] = useState(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();

    data.append('title', content.title);
    data.append('url', content.url);
    data.append('thumbnail', content.thumbnail);

    onCloseEdit(false);

    if (!content.title || !content.url || !content.thumbnail === null) {
      toast.error('Field can not be empty.');
    } else {
      const response = await setEditContent(data, idContent);

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
          onChange={(event) =>
            setContent({
              ...content,
              title: event.target.value,
            })
          }
        />
        <input
          type="text"
          name="url"
          id="url"
          required
          placeholder="Enter URL"
          className="border-l-4 border-goDarkBlue rounded-lg focus:outline-0 px-4 py-2 placeholder:font-medium shadow-lg"
          value={content.url}
          onChange={(event) =>
            setContent({
              ...content,
              url: event.target.value,
            })
          }
        />
        <p className="italic text-sm -mt-2">
          *Enter URL youtube.com/watch?v=<span className="text-red-600">CopyThis</span>
        </p>
        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          required
          placeholder="Choose Thumbnail"
          accept="image/*"
          className="border-l-4 border-goDarkBlue rounded-lg focus:outline-0 px-4 py-2 placeholder:font-medium shadow-lg"
          onChange={(event) => {
            const img = event.target.files[0];
            setImagePreview(URL.createObjectURL(img));
            return setContent({
              ...content,
              thumbnail: img,
            });
          }}
        />
        {imagePreview ? (
          <img src={imagePreview} alt="Thumbnail content" className="w-40 rounded-md" />
        ) : (
          <img
            src={`${IMG_URL}/thumbnail/${content.thumbnail}`}
            alt="Thumbnail content"
            className="w-40 rounded-md"
          />
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-8 w-full text-center font-semibold text-base border-4 border-goDarkBlue bg-goDarkBlue hover:bg-[#0c2066] text-white rounded-lg shadow-lg py-1 mb-4"
      >
        Confirm
      </button>
    </>
  );
};

export default EditContentForm;
