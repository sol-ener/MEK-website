import CloseIcon from "/src/assets/close-icon.svg?react";

const qualityList = [
  {
    id: "360p",
    resolution: "360p",
    size: "50.6 MB",
  },
  {
    id: "480p",
    resolution: "480p",
    size: "72.6 MB",
  },
  {
    id: "720p",
    resolution: "720p",
    size: "100.6 MB",
  },
  {
    id: "1080p",
    resolution: "1080p",
    size: "150.6 MB",
  },
  {
    id: "2k",
    resolution: "2k",
    size: "227.6 MB",
  },
  {
    id: "4k",
    resolution: "4k",
    size: "349.6 MB",
  },
];

const SelectExportQuality = ({ handleExportQualitySelect,hideModal }) => {

  const handleChange = (e) => {
    handleExportQualitySelect(e.target.value);
  }

  return (
    <div className="p-6 w-[90%] max-w-[400px] rounded-xl bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-[20px] leading-[30px] font-semibold sm:text-2xl">Select Export Quality</h2>
        <CloseIcon className="cursor-pointer" onClick={hideModal} />
      </div>
      <ul onChange={handleChange} className="my-5 list-none flex flex-col gap-3">
        {qualityList.map((quality) => (
          <QualityRadioButton key={quality.id} {...quality} />
        ))}
      </ul>
    </div>
  );
};

const QualityRadioButton = ({ id, resolution, size}) => {
  return (
    <li>
      <input id={id} type="radio" name="quality" value={resolution} className="peer hidden" />
      <label
        htmlFor={id}
        className="p-4 flex justify-between items-center text-[#21283C] border border-[#E3E9EE] rounded-2xl cursor-pointer 
        hover:border-primary hover:bg-[#235DFF]/[0.08] peer-checked:border-primary peer-checked:bg-[#235DFF]/[0.08]"
      >
        <span className="font-semibold">{resolution}</span>
        <span className="text-sm font-medium text-[#5D6E7E]">{size}</span>
      </label>
    </li>
  );
};

export default SelectExportQuality;
