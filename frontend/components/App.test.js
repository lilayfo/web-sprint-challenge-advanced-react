import React from "react";
import AppClass from "./AppClass";
import AppFunctional from "./AppFunctional"
import { render } from '@testing-library/react';


test('sanity', () => {

  expect(true).toBe(true)

})


test('render AppClass without errors', () => {

  render(<AppClass/>);

});


test('render AppFunctional without errors', () => {

  render(<AppFunctional/>);
  
});