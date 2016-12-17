import React from "react";
import TestUtils from "react-addons-test-utils";
import tape from "tape";
import addAssertions from "extend-tape";
import jsxEquals from "tape-jsx-equals";

const test = addAssertions(tape, {jsxEquals});

import DataTable from "../../../app/javascripts/components/data-table.jsx";

test("Data Table component", function(assert) {
  const headingTitles = ["a", "b", "c"];
  const rowEntries = [
    {a: 1, b: 2, c: 3},
    {a: 4, b: 5, c: 6}
  ];

  const component = TestUtils.renderIntoDocument(<DataTable headingTitles={headingTitles} rowEntries={rowEntries} />);
  const table = TestUtils.findRenderedDOMComponentWithTag(component, "table");
  const tableHead = TestUtils.findRenderedDOMComponentWithTag(component, "thead");
  const tableBody = TestUtils.findRenderedDOMComponentWithTag(component, "tbody");

  assert.equal(table.tagName, "TABLE", "Table element rendered");

  assert.equal(tableHead.tagName, "THEAD", "Table heading rendered");
  assert.equal(tableHead.childNodes[0].childNodes.length, headingTitles.length, "Table heading has the right amount of columns")

  assert.equal(tableBody.tagName, "TBODY", "Table body rendered");
  assert.equal(tableBody.childNodes.length, rowEntries.length, "Table body has the right amount of rows");
  assert.equal(tableBody.childNodes[0].childNodes.length, Object.keys(rowEntries[0]).length, "Table body row has the right amount of columns")

  assert.end();
});
