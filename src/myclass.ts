export class MyClass {
  constructor() {}

  public foo(value: string): string {
    return "hello!" + value;
  }

  public bar(value: string): string {
    return this.foo(value);
  }
}
