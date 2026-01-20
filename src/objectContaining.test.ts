import { describe, expect, it } from "vitest";
import { computed, reactive } from "vue";

/** This is fine */
describe("objectContaining", () => {
  it("does not match in v4", () => {
    const result = {
      a: "hello",
      b: "world",
    };

    expect(result).toEqual(
      expect.objectContaining({
        b: "world",
      }),
    );
  });
});

describe("vue reactive", () => {
  it("v1", () => {
    const p1 = reactive({
      page: 2,
      pageSize: 30,
      foo: "bar",
    });

    expect(p1).toEqual(expect.objectContaining({ foo: "bar" }));
  });

  // This passes on v3 but fails on v4
  it("v2", () => {
    const p2 = reactive({
      page: computed(() => 2),
      pageSize: computed(() => 30),
      foo: computed(() => "bar"),
    });

    expect(p2).toEqual(
      expect.objectContaining({
        page: 2,
        foo: "bar",
      }),
    );
  });
});

describe("proxy", () => {
  // V3 ✅
  // V4 ✅
  it("v1", () => {
    const target = {
      page: 2,
      pageSize: 30,
      foo: "bar",
    };

    const handler = {
      get(target, prop) {
        return target[prop];
      },
    };

    const proxy = new Proxy(target, handler);
    expect(proxy).toEqual(
      expect.objectContaining({
        page: 2,
        foo: "bar",
      }),
    );
  });

  // This test should be failing.
  // V3 ❌ (correct)
  // V4 ✅ (incorrect)
  it("v2", () => {
    const target = {
      page: 2,
      pageSize: 30,
      foo: "bar",
    };

    const handler = {
      get(target, prop) {
        return "world";
      },
    };

    const proxy = new Proxy(target, handler);
    expect(proxy).toEqual(
      expect.objectContaining({
        page: 2,
        foo: "bar",
      }),
    );
  });

  // This test should be passing.
  // V3 ✅ (correct)
  // V4 ❌ (incorrect)
  it("v2 - inverse", () => {
    const target = {
      page: 2,
      pageSize: 30,
      foo: "bar",
    };

    const handler = {
      get(target, prop) {
        return "world";
      },
    };

    const proxy = new Proxy(target, handler);
    expect(proxy).toEqual(
      expect.objectContaining({
        page: "world",
        foo: "world",
      }),
    );
  });

  // This test should be passing.
  // V3 ✅ (correct)
  // V4 ❌ (incorrect)
  it.only("v2 - inverse 2", () => {
    const target = {
      page: 2,
      pageSize: 30,
      foo: "bar",
    };

    const handler = {
      get(target, prop) {
        return "world";
      },
    };

    const proxy = new Proxy(target, handler);
    expect(proxy).toEqual(
      expect.objectContaining({
        page: "world",
        foo: "world",
        pageSize: "world",
      }),
    );
  });
});
