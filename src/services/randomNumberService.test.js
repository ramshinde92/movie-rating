import * as randomNumberService from "./randomNumberService";

describe("random number service", () => {
  const mockForMath = Object.create(global.Math);
  mockForMath.random = () => 0.5;
  global.Math = mockForMath;

  it("should return random number inclusive of minimum and maximum number", () => {
    const random = randomNumberService.getRandomInclusive(1, 6);
    expect(random).toEqual(3);
  });

  it("should return random number exclusive of minimum and maximum number", () => {
    const random = randomNumberService.getRandomExclusive(1);
    expect(random).toEqual(0);
  });

  it("should return default number if min and max are not passed", () => {
    const random = randomNumberService.getRandomInclusive();
    expect(random).toEqual(1);
  });

  it("should return default number if max are not passed", () => {
    const random = randomNumberService.getRandomExclusive();
    expect(random).toEqual(1);
  });
});
