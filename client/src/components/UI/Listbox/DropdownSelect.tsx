import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { HiCheck, HiChevronDown } from "react-icons/hi";

export default function DropdownSelect({
  options,
  setState,
  state,
  placeholder,
}: {
  options: { name: string }[];
  setState: (value: string) => void;
  state: string;
  placeholder?: string;
}) {
  // State to hold the selected value
  const [selectedValue, setSelectedValue] = useState({
    name: state !== "" ? state : placeholder || "Select an option",
  });

  /*
  Update the state of the parent,
  when the selected value changes.
   */
  useEffect(() => {
    setState(selectedValue.name);
  }, [selectedValue, setState]);

  return (
    <div className="w-auto">
      <Listbox value={selectedValue} onChange={setSelectedValue}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white  focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selectedValue.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none sm:text-sm">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  // eslint-disable-next-line react/no-array-index-key
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <HiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

DropdownSelect.defaultProps = {
  placeholder: null,
};
