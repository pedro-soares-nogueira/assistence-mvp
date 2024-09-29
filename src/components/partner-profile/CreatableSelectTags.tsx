import React, {
  Dispatch,
  KeyboardEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import CreatableSelect from "react-select/creatable";

const components = {
  DropdownIndicator: null,
};

interface Option {
  label: string;
  value: string;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

interface TagsProps {
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
  content: string[];
}

const CreatableSelectTags = ({ setSelectedTags, content }: TagsProps) => {
  const contentFormatted = content.map((item) => ({
    label: item,
    value: item,
  }));

  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<readonly Option[]>(contentFormatted);
  const [isMounted, setIsMounted] = useState(false);

  const id = Date.now().toString();

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        event.preventDefault();
        setValue((prev) => {
          const newValue = [...prev, createOption(inputValue)];
          return newValue;
        });
        setInputValue("");
        break;
    }
  };

  useEffect(() => {
    const tags = value.map((option) => option.value);
    setSelectedTags(tags);
  }, [value]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && (
        <div className="mb-6">
          <label htmlFor="tags">Tags</label>
          <CreatableSelect
            id={id}
            components={components}
            inputValue={inputValue}
            isClearable
            isMulti
            menuIsOpen={false}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            onInputChange={(newValue) => setInputValue(newValue)}
            onKeyDown={handleKeyDown}
            value={value}
          />
          <small className="text-xs text-gray-800">
            Informe algumas tags para aparecerem do seu perfil
          </small>
        </div>
      )}
    </>
  );
};

export default CreatableSelectTags;
