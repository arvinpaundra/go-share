import Image from 'next/image';
import Thumbnail from '../../../public/images/thumbnail.jpg';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useContext } from 'react';
import { ActiveContentCtx } from '../../../context/getActiveContent';

const ProfileContentItem = (props) => {
  const { id_content, url, title, thumbnail, onCloseEdit } = props;

  const { getIdContent } = useContext(ActiveContentCtx);

  const modalEdit = (id) => {
    getIdContent(id);
    onCloseEdit((prevState) => !prevState);
  };

  return (
    <div className="w-64 h-36 flex flex-col gap-1 relative rounded-lg overflow-hidden">
      <Image src={Thumbnail} alt="Thumbnail video" objectFit="cover" layout="fill" />
      <h3 className="absolute top-0 left-0 w-full h-full bg-goDarkBlue/70 text-goGold px-4 transition ease-in-out duration-150 flex justify-center items-center opacity-0 hover:opacity-100 font-semibold text-md cursor-pointer">
        <p>{title}</p>
        <div className="absolute top-4 right-4 flex gap-1">
          <FaEdit size={18} className="text-blue-500" onClick={() => modalEdit(id_content)} />
          <MdDeleteForever
            size={20}
            className="text-red-400"
            onClick={() => modalEdit(id_content)}
          />
        </div>
      </h3>
    </div>
  );
};

export default ProfileContentItem;
