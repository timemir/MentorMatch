/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

interface ComboboxData {
  id: number;
  name: string;
}

export default function ComboboxOnboarding({
  title,
  data,
  className = "",
  state,
}: {
  title: string;
  data: ComboboxData[];
  className: string;
  state: [ComboboxData[], React.Dispatch<React.SetStateAction<ComboboxData[]>>];
}) {
  // State for the selected data
  const [selectedData, setSelectedData] = useState<ComboboxData>({
    id: 0,
    name: "",
  });
  // State for the an array of selected data, i.e. options
  const [selectedDataArray, setSelectedDataArray] = useState<ComboboxData[]>(
    []
  );
  // State for the search query, i.e. the user input
  const [query, setQuery] = useState("");

  // State for the show all button
  const [showAll, setShowAll] = useState(false);

  // Filter the data based on the query
  const filteredData =
    query === ""
      ? data
      : data.filter((entry) =>
          entry.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  // Function for handling the addition of selected data to the array
  function handleChangeSelectedData(value: ComboboxData) {
    setSelectedData(value);

    if (!selectedDataArray.some((entry) => entry.id === value.id)) {
      setSelectedDataArray((prev) => [...prev, value]);
    }
  }

  // Function for handling the deletion of selected data in the array
  function handleDeleteSelectedData(e: React.MouseEvent<HTMLButtonElement>) {
    const entryToDelete = data.find(
      (entry) => entry.name === (e.target as HTMLButtonElement).innerHTML
    );
    setSelectedDataArray((prev) =>
      prev.filter((entry) => entry.id !== entryToDelete?.id)
    );
  }

  /* Update the state of the selected data array
    state[0] is the state 
    state[1] is the function to update the state 
    i.e [state, setState]
  */
  useEffect(() => {
    state[1](selectedDataArray);
  }, [selectedDataArray]);

  return (
    <div className={className}>
      <Combobox
        value={selectedData}
        onChange={(value) => handleChangeSelectedData(value)}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-mentorCTA sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 placeholder:font-opensans focus:ring-0"
              displayValue={(entry: ComboboxData) => entry.name}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={title}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
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
              {filteredData.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredData.map((entry) => (
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
                          />
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
      <div>
        <div className="mt-2 inline-block">
          {(showAll
            ? selectedDataArray.reverse()
            : selectedDataArray.reverse().slice(0, 6)
          ).map((arrayData: ComboboxData) => (
            <button
              type="button"
              key={arrayData.id}
              className="m-1 inline-flex rounded-lg bg-mentorCTA50 py-2 px-4 text-mentorCTA hover:bg-red-200 hover:text-red-500"
              onClick={handleDeleteSelectedData}
            >
              {arrayData.name}
            </button>
          ))}
          {selectedDataArray.length > 6 && showAll === false && (
            <div className="inline-block">
              <button
                type="button"
                className="rounded-lg border-2 p-2 font-opensans text-gray-500 hover:bg-gray-200"
                onClick={() => setShowAll(true)}
              >
                See More
              </button>
            </div>
          )}
          {selectedDataArray.length > 6 && showAll === true && (
            <div className="inline-block">
              <button
                type="button"
                className="rounded-lg border-2 p-2 font-opensans text-gray-500 hover:bg-gray-200"
                onClick={() => setShowAll(false)}
              >
                See Less
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
