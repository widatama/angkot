import React from "react";
import TestUtils from "react-addons-test-utils";
import tape from "tape";
import addAssertions from "extend-tape";
import jsxEquals from "tape-jsx-equals";

const test = addAssertions(tape, {jsxEquals});

import Filter from "../../../app/javascripts/components/filter.jsx";

test("Filter component", function(assert) {
  const propValue = "test";
  let testVar = 1;

  const testFunction = function()  {
    testVar = 10;
  };

  const component = TestUtils.renderIntoDocument(<Filter value={propValue} onChange={testFunction}/>);
  const input = TestUtils.findRenderedDOMComponentWithTag(component, "input");

  assert.equal(input.tagName, "INPUT", "Filter input element rendered");
  assert.equal(input.value, propValue, "Filter prop value is correct");

  TestUtils.Simulate.change(input, {target: {value: "abcd"}});

  //Note: does not test input.value change, component has to be rerendered with new prop

  assert.equal(testVar, 10, "Filter onChange callback works");

  assert.end();
});
