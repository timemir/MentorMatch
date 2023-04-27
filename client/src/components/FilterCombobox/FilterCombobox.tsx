/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable indent */
import { Combobox, Transition } from "@headlessui/react";
import emojiFlags from "emoji-flags";
import { Fragment, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HiCheck, HiChevronDown } from "react-icons/hi";
import { FilterComboboxData } from "../../types/filterComboboxData";

/* This component is a custom combobox(a dropdown menu with a search bar) that
  takes in:
  - title
  - data in form of an array of objects with id, name and code(optional) 
  - function of the filterStore to store the selected value as a global state in the store.

*/
export default function FilterCombobox({
  title,
  data,
  filterStoreFN,
  className,
}: {
  title: string;
  data: FilterComboboxData[];
  filterStoreFN: (value: any) => void;
  className?: string;
}) {
  // State to store the selected value of the combobox
  const [selectedEntry, setSelectedEntry] = useState<
    FilterComboboxData | string
  >("");
  // State to store the query of the search bar (user input)
  const [query, setQuery] = useState("");

  /* Function to adjust the data. Why needed? Because the data (passed as props) is 
  in form of an array of objects with an optional code for the country code.
  This code is needed to display the flag of the country. However, the component 
  should only take in an array of objects with id and name. So, this function
  checks if the data has a code and if it does, it adds the flag to the name.
   */
  function adjustCountryData(dataProp: FilterComboboxData[]) {
    try {
      if (
        dataProp.some((obj) =>
          Object.prototype.hasOwnProperty.call(obj, "code")
        )
      ) {
        return dataProp.map((country) => {
          const flag = emojiFlags.countryCode(country.code as string);
          return {
            id: country.id,
            name: `${flag.emoji} ${country.name}`,
          };
        });
      }
      return dataProp;
    } catch (error) {
      return dataProp;
    }
  }

  // Filter the data based on the query
  const filteredData =
    query === ""
      ? adjustCountryData(data)
      : adjustCountryData(data).filter((entry) =>
          entry.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  /* Function to handle the selection of an entry.
  Again we have to check if the data has a code. If it does, we have to pass the
  code to the filterStoreFN. If not, we have to pass the id. 
  */
  function handleSelection(value: FilterComboboxData) {
    setSelectedEntry(value || "");
    if (data.some((obj) => Object.prototype.hasOwnProperty.call(obj, "code"))) {
      const country = data.find((country) => country.id === value.id);
      filterStoreFN(country?.code as string);
    } else {
      filterStoreFN(Number(value.id));
    }
  }

  // Function to handle the deletion of the selected entry, via the X button
  function handleDeleteSelected() {
    setSelectedEntry("");
    if (data[0].code) {
      filterStoreFN("");
    } else {
      filterStoreFN(0);
    }
  }

  return (
    <div className={`z-20 ${className}`}>
      <Combobox
        value={selectedEntry}
        onChange={(e: FilterComboboxData) => handleSelection(e)}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-mentorCTA sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 placeholder:font-opensans focus:ring-0"
              displayValue={(entry: FilterComboboxData) => entry.name}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={title}
            />
            <Combobox.Button
              data-testid="expand-button"
              className="absolute inset-y-0 right-0 flex items-center pr-2"
            >
              {selectedEntry ? (
                <AiOutlineCloseCircle
                  className="text-gray-600"
                  onClick={() => handleDeleteSelected()}
                />
              ) : (
                <HiChevronDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              )}
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black  focus:outline-none sm:text-sm">
              {filteredData?.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredData?.map((entry) => (
                  <Combobox.Option
                    key={entry.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-mentorCTA text-white" : "text-gray-900"
                      }`
                    }
                    value={entry}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {entry.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <HiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
