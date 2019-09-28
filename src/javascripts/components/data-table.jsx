/* Data Table
 * Receives an array of string as table heading and an array of object as table body
 */

import PropTypes from 'prop-types';
import React from 'react';

const baseClassName = 'c-data-table';

function generateClassNameModifier(name) {
  return name.replace(/ /g, '-').toLowerCase();
}

function Heading(props) {
  const { titles } = props;

  return (
    <thead className={`${baseClassName}__heading`}>
      <tr>
        {titles.map(key => {
          if (!/~/.test(key)) {
            return (
              <th
                className={`${baseClassName}__heading-col ${baseClassName}__heading-col--${generateClassNameModifier(
                  key,
                )}`}
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

Heading.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string),
};

Heading.defaultProps = {
  titles: [],
};

function Rows(props) {
  const { entries } = props;

  if (entries) {
    return (
      <tbody className={`${baseClassName}__body`}>
        {entries.map(row => (
          <tr className={`${baseClassName}__body-row`} key={row['~id']}>
            {Object.keys(row).map(key => {
              if (!/~/.test(key)) {
                return (
                  <td
                    className={`${baseClassName}__body-col`}
                    key={key}
                    dangerouslySetInnerHTML={{ __html: row[key] }}
                  />
                );
              }

              return null;
            })}
          </tr>
        ))}
      </tbody>
    );
  }

  return null;
}

Rows.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object),
};

Rows.defaultProps = {
  entries: [],
};

function Table(props) {
  const { headingTitles, rowEntries } = props;

  if (rowEntries.length > 0) {
    return (
      <table className="c-data-table">
        <Heading titles={headingTitles} />
        <Rows entries={rowEntries} />
      </table>
    );
  }

  return null;
}

Table.propTypes = {
  headingTitles: PropTypes.arrayOf(PropTypes.string),
  rowEntries: PropTypes.arrayOf(PropTypes.object),
};

Table.defaultProps = {
  headingTitles: [],
  rowEntries: [],
};

function DataTable(props) {
  const { headingTitles, rowEntries } = props;

  return <Table headingTitles={headingTitles} rowEntries={rowEntries} />;
}

DataTable.propTypes = {
  headingTitles: PropTypes.arrayOf(PropTypes.string),
  rowEntries: PropTypes.arrayOf(PropTypes.object),
};

DataTable.defaultProps = {
  headingTitles: [],
  rowEntries: [],
};

export default DataTable;
