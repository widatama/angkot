import React from "react";
import {createRenderer} from "react-addons-test-utils";
import createComponent from "react-unit";
import tape from "tape";
import addAssertions from "extend-tape";
import jsxEquals from "tape-jsx-equals";

const test = addAssertions(tape, {jsxEquals});

import Greeting from "../../../app/javascripts/components/greeting.jsx";

test("Unit testing test", function(assert) {
  const component = createComponent.shallow(<Greeting/>);
  const renderer = createRenderer();

  assert.equal(component.text, "Hello", "Text rendered");

  renderer.render(<Greeting/>);
  const result = renderer.getRenderOutput();

  assert.jsxEquals(result, <div>Hello</div>, "Tag and text rendered");

  assert.end();
});
