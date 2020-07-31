import React from "react";

import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { useLocalStorage } from "./useLocalStorage";
configure({ adapter: new Adapter() });

describe("custom hook: useLocalStorage", () => {
  const HookWrappe = props => {
    const hook = props.hook ? props.hook() : undefined;
    return <div hook={hook}> </div>;
  };
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
