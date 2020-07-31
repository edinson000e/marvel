import React from "react";

import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { useLocalStorage } from "./useLocalStorage";
configure({ adapter: new Adapter() });
const HookWrappe = props => {
  const hook = props.hook ? props.hook() : undefined;
  return <div hook={hook}> </div>;
};
describe("custom hook: useLocalStorage", () => {
  const wrapper = shallow(
    <HookWrappe hook={() => useLocalStorage("randon", "spider")} />
  );
  let { hook } = wrapper.find("div").props();
  let [storedValue, setValue] = hook;
  it("initValue", () => {
    expect(storedValue).toEqual("spider");
  });

  it("updateValue", () => {
    setValue("marvel");
    ({ hook } = wrapper.find("div").props());
    [storedValue, setValue] = hook;
    expect(storedValue).toEqual("marvel");
  });
});
/*
describe("custom hook: useLocalStorageSearch", () => {
  let key = "searchCharacters";
  let url = "/v1/public/characters?nameStartsWith=spider";
  let paramID = "spider";
  let urlMatch = "/search/character=spider";
  let wrapper;
  let useEffect;
  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ rates: { CAD: 1.42 } })
    })
  );

  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect").mockImplementation(f => f());

    mockUseEffect();
    mockUseEffect();
    wrapper = shallow(
      <HookWrappe
        hook={() => useLocalStorageSearch(key, url, paramID, urlMatch)}
      />
    );
  });

  describe("on start", () => {
    it("loads the authors", () => {
      console.log("entre");
    });
  });
});*/
