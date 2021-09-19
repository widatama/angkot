import { FC, useRef } from 'react';

type FilterProps = {
  placeholder: string,
  value: string,
}

const Filter: FC<FilterProps> = (props: FilterProps) => {
  const { onSubmit, placeholderText, value } = props;
  const filterInput = useRef(null);

  const handleChange = (event) => {
    const { value } = event.target;

    onSubmit(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const { value } = filterInput.current;

    onSubmit(value);
  }

  return (
    <form
      className="flex flex-row text-lg border-b-2 border-gray-600 pb-2 mb-8"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="flex-grow outline-none bg-transparent"
        placeholder={placeholderText}
        onChange={handleChange}
        value={value}
        ref={filterInput}
      />
      <button type="submit" className="font-bold px-2">
        &rarr;
      </button>
    </form>
  );
}

export default Filter;
