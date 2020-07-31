import React from "react";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Search } from "./Search";

configure({ adapter: new Adapter() });
const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");

  return {
    ...originalModule,
    useHistory: () => ({ push: mockHistoryPush }),
    useRouteMatch: jest.fn(() => {
      return { url: "/search" };
    })
  };
});
describe("Search", () => {
  it("search word", () => {
    const push = "comics";
    const prevent = jest.fn();
    const wrapper = shallow(<Search push={push} />);
    wrapper.find("#FormSearchInput").simulate("change", {
      target: { value: "spider" }
    });
    wrapper.find("#FormSearch").simulate("submit", { preventDefault: prevent });
    expect(mockHistoryPush.mock.calls).toEqual([["/search/comics=spider"]]);
    expect(prevent.mock.calls).toEqual([[]]);
  });
});
