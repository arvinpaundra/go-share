/* eslint-disable @next/next/no-img-element */
import { Dialog } from '@headlessui/react';
import { toast } from 'react-toastify';
import { useState, useCallback, useEffect } from 'react';
import { setNewTransaction } from '../../../services/transactions';
import { getAllVouchersAPI } from '../../../services/vouchers';

const SubscribeModal = ({ isOpen, onClose, id_creator }) => {
  const [nominal, setNominal] = useState('');
  const [payment, setPayment] = useState('');
  const [evidence, setEvindence] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const getAllVouchers = useCallback(async () => {
    try {
      const response = await getAllVouchersAPI();

      setVouchers(response.data.result);
    } catch (error) {}
  }, []);

  useEffect(() => {
    getAllVouchers();
  }, [getAllVouchers]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();

    data.append('nominal', nominal);
    data.append('payment_method', payment);
    data.append('id_creator', id_creator);
    data.append('transaction_evidence', evidence);

    onClose(false);

    if (!nominal || !payment || !evidence) {
      toast.error('Field can not be empty.');
    } else {
      const response = await setNewTransaction(data);

      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success(response.message);

        setNominal('');
        setPayment('');
        setEvindence(null);
        setImagePreview(null);
      }
    }
  };

  return (
    <Dialog
      className="relative z-40"
      open={isOpen}
      onClose={() => onClose((prevState) => !prevState)}
    >
      <div className="inset-0 fixed bg-black bg-opacity-20" />
      <Dialog.Panel className="fixed px-10 pb-4 pt-10 top-[20%] left-[30%] bg-[#F9F9F9] rounded-md drop-shadow-md w-[40%] h-fit">
        <div className="mb-10 text-center text-xl bg-goGold absolute -top-[7%] left-[30%] px-9 py-2 rounded-lg drop-shadow-md font-semibold text-goDarkBlue">
          <h2>Subscribe Now!</h2>
        </div>
        <form action="" className="flex flex-col gap-4 w-full">
          <select
            name="nominal"
            id="nominal"
            className="border-l-4 border-goDarkBlue rounded-lg focus:outline-0 px-4 py-2 placeholder:font-medium shadow-lg"
            required
            value={nominal}
            onChange={(event) => setNominal(event.target.value)}
          >
            <option value="">Select nominal payment</option>
            {vouchers.map((voucher) => (
              <option value={voucher.nominal_after} key={voucher.id_voucher}>
                {voucher.nominal_after}
              </option>
            ))}
          </select>
          <select
            name="payment"
            id="payment"
            className="border-l-4 border-goDarkBlue rounded-lg focus:outline-0 px-4 py-2 placeholder:font-medium shadow-lg"
            placeholder="Choose payment method"
            required
            value={payment}
            onChange={(event) => setPayment(event.target.value)}
          >
            <option value="">Choose payment method</option>
            <option value="BNI">BNI</option>
            <option value="BCA">BCA</option>
            <option value="BRI">BRI</option>
          </select>
          <label
            htmlFor="transaction_evidence"
            className="border-l-4 border-goDarkBlue rounded-lg focus:outline-0 px-4 py-2 shadow-lg"
          >
            Upload transfer photo here.
          </label>
          <input
            type="file"
            name="transaction_evidence"
            id="transaction_evidence"
            required
            className="hidden"
            onChange={(event) => {
              const img = event.target.files[0];
              setImagePreview(URL.createObjectURL(img));
              return setEvindence(img);
            }}
            accept="image/png, image/jpg, image/jpeg"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Transaction evidence" className="w-40 rounded-md" />
          )}
          <button
            onClick={handleSubmit}
            type="submit"
            className="mt-4 w-full text-center font-semibold text-base border-4 border-goDarkBlue bg-goDarkBlue hover:bg-[#0c2066] text-white rounded-lg shadow-lg py-1 mb-4"
          >
            Confirm
          </button>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
};

export default SubscribeModal;
