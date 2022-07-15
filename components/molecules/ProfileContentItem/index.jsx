/* eslint-disable @next/next/no-img-element */
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useContext } from 'react';
import { ActiveContentCtx } from '../../../context/getActiveContent';
import FBThumbnail from '../../../public/images/thumbnail.png';
import { deleteContent } from '../../../services/contents';
import { toast } from 'react-toastify';

const ROOT_IMG = process.env.NEXT_PUBLIC_IMG;

const ProfileContentItem = (props) => {
  const { id_content, title, thumbnail, onCloseEdit, setFetchContents } = props;

  const { getIdContent } = useContext(ActiveContentCtx);

  const modalEdit = (id) => {
    getIdContent(id);
    onCloseEdit((prevState) => !prevState);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteContent(id);

      if (response.error) {
        throw new Error(response.message);
      } else {
        setFetchContents(true);
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="w-64 h-36 flex flex-col gap-1 relative rounded-lg overflow-hidden">
      <img
        src={thumbnail ? `${ROOT_IMG}/thumbnail/${thumbnail}` : FBThumbnail}
        alt="Thumbnail video"
      />
      <h3 className="absolute top-0 left-0 w-full h-full bg-goDarkBlue/90 text-goGold px-4 transition ease-in-out duration-150 flex justify-center items-center opacity-0 hover:opacity-100 font-semibold text-md cursor-pointer">
        <p>{title}</p>
        <div className="absolute top-4 right-4 flex gap-1">
          <FaEdit
            size={18}
            title="Edit content"
            className="text-blue-500"
            onClick={() => modalEdit(id_content)}
          />
          <MdDeleteForever
            size={20}
            title="Delete content"
            className="text-red-400"
            onClick={() => handleDelete(id_content)}
          />
        </div>
      </h3>
    </div>
  );
};

export default ProfileContentItem;
