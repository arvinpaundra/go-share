import { Dialog } from '@headlessui/react';
import EditProfileForm from '../EditProfileForm';

const EditProfileModal = (props) => {
  const { isOpenEditProfile, onCloseEditProfile } = props;

  return (
    <Dialog
      className="relative z-40"
      open={isOpenEditProfile}
      onClose={() => onCloseEditProfile((prevState) => !prevState)}
    >
      <div className="inset-0 fixed bg-black bg-opacity-20" />
      <Dialog.Panel className="fixed px-10 pb-4 pt-10 top-[8%] left-[30%] bg-[#F9F9F9] rounded-md drop-shadow-md w-[40%] h-fit">
        <div className="mb-10 text-center text-xl bg-goGold absolute -top-[4%] left-[35%] px-9 py-2 rounded-lg drop-shadow-md font-semibold text-goDarkBlue">
          <h2>Edit Profile</h2>
        </div>
        <EditProfileForm onCloseEditProfile={onCloseEditProfile} />
      </Dialog.Panel>
    </Dialog>
  );
};

export default EditProfileModal;
