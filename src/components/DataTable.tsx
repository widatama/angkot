import React from 'react';

type HeaderProps = {
  titles: string[];
};

function Header(props: HeaderProps) {
  const { titles } = props;

  if (titles.length > 0) {
    return (
      <thead className="text-gray-500 text-left">
        <tr>
          {titles.map((key) => {
            if (!/~/.test(key)) {
              return (
                <th
                  className="pb-4"
                  key={key}
                >
                  {key}
                </th>
              );
            }

            return null;
          })}
        </tr>
      </thead>
    );
  }

  return null;
}

type BodyProps = {
  entries: string[][];
};

function Body(props: BodyProps) {
  const { entries } = props;

  if (entries) {
    return (
      <tbody>
        {entries.map((row) => (
          <tr key={row[0]}>
            {row.slice(1).map((field, idx) => (
              <td
                // eslint-disable-next-line react/no-array-index-key
                key={`${row[0]}${idx}`}
                className="align-top pb-2"
                dangerouslySetInnerHTML={{ __html: field }}
              />
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  return null;
}

function DataTable(props: HeaderProps & BodyProps) {
  const { entries, titles } = props;

  return (
    <table>
      <Header titles={titles} />
      <Body entries={entries} />
    </table>
  );
}

export { Body, Header };
export default DataTable;
