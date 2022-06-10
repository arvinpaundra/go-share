import { Dialog } from '@headlessui/react';
import EditContentForm from '../EditContentForm';

const EditContentModal = (props) => {
  const { onCloseEdit, isOpenEdit, id_creator, setFetchContents } = props;

  return (
    <Dialog
      className="relative z-40"
      open={isOpenEdit}
      onClose={() => onCloseEdit((prevState) => !prevState)}
    >
      <div className="inset-0 fixed bg-black bg-opacity-20" />
      <Dialog.Panel className="fixed px-10 pb-4 pt-10 top-[20%] left-[30%] bg-[#F9F9F9] rounded-md drop-shadow-md w-[40%] h-fit">
        <div className="mb-10 text-center text-xl bg-goGold absolute -top-[7%] left-[27%] px-9 py-2 rounded-lg drop-shadow-md font-semibold text-goDarkBlue">
          <h2>Edit Content</h2>
        </div>
        <EditContentForm
          id_creator={id_creator}
          setFetchContents={setFetchContents}
          onCloseEdit={onCloseEdit}
        />
      </Dialog.Panel>
    </Dialog>
  );
};

export default EditContentModal;
