const ProfilePointsItem = (props) => {
  const { label, value, borderColor, textColor } = props;

  return (
    <div className="flex flex-col items-center justify-center">
      <p className={`font-semibold italic text-sm ${textColor}`}>{label}</p>
      <div
        className={`w-12 h-10 py-1 px-2.5 text-center font-semibold text-lg border-t-4 ${borderColor} rounded-lg bg-[#F9F9F9]`}
      >
        {value}
      </div>
    </div>
  );
};

export default ProfilePointsItem;
