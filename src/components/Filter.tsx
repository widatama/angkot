import React, { useCallback, useEffect, useRef } from 'react';

export type FilterFormProps = {
  filterValue: string;
  onSubmit: (inp: string) => void;
  placeholderText: string;
};

function FilterForm(props: FilterFormProps) {
  const { filterValue, placeholderText, onSubmit } = props;
  const inpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inpRef?.current?.focus();
  });

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    event.target?.form?.requestSubmit();
  }, []);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(inpRef?.current?.value || '');
  }, []);

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
        value={filterValue}
        ref={inpRef}
      />
      <button type="submit" className="font-bold px-2">
        &rarr;
      </button>
    </form>
  );
}

export default FilterForm;
