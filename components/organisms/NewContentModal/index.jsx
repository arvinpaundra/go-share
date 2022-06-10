import { Dialog } from '@headlessui/react';
import NewContentForm from '../NewContentForm';

const NewContentModal = (props) => {
  const { onCloseAdd, isOpenAdd, id_creator, setFetchContents } = props;

  return (
    <Dialog
      className="relative z-40"
      open={isOpenAdd}
      onClose={() => onCloseAdd((prevState) => !prevState)}
    >
      <div className="inset-0 fixed bg-black bg-opacity-20" />
      <Dialog.Panel className="fixed px-10 pb-4 pt-10 top-[20%] left-[30%] bg-[#F9F9F9] rounded-md drop-shadow-md w-[40%] h-fit">
        <Dialog.Title className="mb-10 text-center text-xl bg-goGold absolute -top-[7%] left-[27%] px-9 py-2 rounded-lg drop-shadow-md font-semibold text-goDarkBlue">
          <h2>Add a New Content</h2>
        </Dialog.Title>
        <NewContentForm
          id_creator={id_creator}
          setFetchContents={setFetchContents}
          onCloseAdd={onCloseAdd}
        />
      </Dialog.Panel>
    </Dialog>
  );
};

export default NewContentModal;
