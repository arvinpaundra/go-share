const NavbarPointsItem = (props) => {
  const { label, value, borderColor, textColor } = props;

  return (
    <div className="flex flex-col items-center justify-center">
      <p className={`font-semibold italic text-sm ${textColor}`}>{label}</p>
      <div
        className={`w-10 py-1 text-center font-semibold border-t-4 ${borderColor} rounded-lg bg-[#F9F9F9]`}
      >
        {value}
      </div>
    </div>
  );
};

export default NavbarPointsItem;
