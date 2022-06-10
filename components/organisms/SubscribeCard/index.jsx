const SubscribeCard = ({ status, onClose }) => {
  return (
    <div className="rounded-lg drop-shadow-lg px-4 bg-white relative pt-14 w-96 h-96">
      <div className="absolute -top-[5%] left-[20%] px-10 py-2 bg-goGold text-xl font-bold rounded-lg drop-shadow-md italic text-goDarkBlue text-center">
        <h2>Content Creator</h2>
      </div>
      <div className="text-center mb-6">
        <h3 className="font-normal text-xs italic text-goDarkBlue">
          IDR<span className="font-extrabold text-3xl"> 100.000</span>
        </h3>
      </div>
      <button
        onClick={() => onClose((prevState) => !prevState)}
        className="absolute -bottom-[5%] left-[40%] px-20 py-2 bg-goDarkBlue text-xl font-bold rounded-lg drop-shadow-md italic text-white text-center disabled:bg-slate-600 disabled:cursor-not-allowed"
        disabled={status === 'Y'}
      >
        Subscribe
      </button>
    </div>
  );
};

export default SubscribeCard;
