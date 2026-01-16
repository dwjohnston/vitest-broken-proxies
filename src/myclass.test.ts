import { beforeAll, describe, expect, it, vi } from "vitest";
import { MyClass } from "./myclass";

describe(MyClass, () => {
  let myClassInstance: MyClass;

  beforeAll(() => {
    myClassInstance = new MyClass();
  });
  it("first test", () => {
    const fooSpy = vi
      .spyOn(myClassInstance, "foo")
      .mockImplementation((value: string) => {
        return "aaa" + value;
      });
    expect(myClassInstance.bar("x")).toBe("aaax");
    expect(myClassInstance.bar("y")).toBe("aaay");

    expect(fooSpy).toHaveBeenCalledTimes(2);
  });

  it("second test", () => {
    const fooSpy = vi
      .spyOn(myClassInstance, "foo")
      .mockImplementation((value: string) => {
        return "bbb" + value;
      });
    expect(myClassInstance.bar("x")).toBe("bbbx");
    expect(myClassInstance.bar("y")).toBe("bbby");

    expect(fooSpy).toHaveBeenCalledTimes(2);
  });
});
