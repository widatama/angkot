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
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder={placeholderText}
        onChange={handleChange}
        value={value}
        ref={filterInput}
      />
      <button type="submit">
        &rarr;
      </button>
    </form>
  );
}

export default Filter;
