import { FC } from 'react';

type HeaderProps = {
  titles: string[],
}

const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const { titles } = props;

  if (titles.length > 0) {
    return (
      <thead>
        <tr>
          {titles.map(key => {
            if (!/~/.test(key)) {
              return (
                <th
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
};

Header.defaultProps = {
  titles: [],
};

type BodyProps = {
  entries: string[][],
}

const Body: FC<BodyProps> = (props: BodyProps) => {
  const { entries } = props;

  if (entries) {
    return (
      <tbody>
        {entries.map(row => (
          <tr key={row[0]}>
            {row.slice(1).map((field, idx) => (
              <td key={`${row[0]}${idx}`}>
                <pre>{field}</pre>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  return null;
}

const DataTable: FC<TableProps> = (props: HeaderProps & BodyProps) => {
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
