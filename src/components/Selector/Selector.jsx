import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export default function Selector({ data, selected, setSelected, placeholder }) {
  return (
    <div className="relative">
      <select
        value={selected ? selected.id : ""}
        onChange={(e) => {
          const selectedOption = data.find(
            (item) => item.id === parseInt(e.target.value)
          );
          setSelected(selectedOption || null); 
        }}
        className={clsx(
          "w-full py-2 pr-8 border-b-2 border-b-borderColor bg-transparent placeholder:text-headingColor sm:placeholder:text-base placeholder:text-xs",
          "focus:outline-none appearance-none"
        )}
      >
        <option disabled value="">
          {placeholder}
        </option>
        {data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <ChevronDownIcon className="w-5 h-5 text-black" />
      </div>
    </div>
  );
}
