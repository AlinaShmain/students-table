import { ConvertOneToTenPipe } from "./convert-one-to-ten.pipe";

describe("ConvertOneToTenPipe", () => {
  it("create an instance", () => {
    const pipe = new ConvertOneToTenPipe();
    expect(pipe).toBeTruthy();
  });
});
