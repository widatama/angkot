import { FC, forwardRef } from 'react';

type FilterProps = {
  placeholder: string,
  value: string,
}

const Filter: FC<FilterProps> = forwardRef((props: FilterProps, inpRef) => {
  const { onSubmit, placeholderText, value } = props;

  const handleChange = (event) => {
    const { value } = event.target;

    onSubmit(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const { value } = inpRef.current;

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
        ref={inpRef}
      />
      <button type="submit" className="font-bold px-2">
        &rarr;
      </button>
    </form>
  );
});

export default Filter;
