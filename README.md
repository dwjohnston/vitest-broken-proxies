Reproduction for the issue mentioned here:

https://github.com/js-temporal/temporal-polyfill/issues/346

```
describe("main", () => {
  it("this test should not be passing, but it does", () => {
    const today = Temporal.Now.plainDateISO();
    const tomorrow = today.add({ days: 1 });
    expect(today).toEqual(tomorrow);
  });
});
```

This test is obviously wrong.

Run

```
npm i
npx vitest
```

And see that the test passes.

Now upgrade to vitest 3.2.0 or later and observe that the test now (correctly) fails.
