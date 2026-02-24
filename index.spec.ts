import { Account } from "./account.model";
import { DistributionMethod } from "./index";
import { distributeAmounts } from "./distribute-amounts";

describe("DistributionMethod enum", () => {
  it("should have correct enum values", () => {
    expect(DistributionMethod.DistributeAll).toBe(0);
    expect(DistributionMethod.Proportional).toBe(1);
    expect(DistributionMethod.Percentage).toBe(2);
  });
});

describe("distributeAmounts", () => {
  let source: Account;
  let targets: Account[];

  beforeEach(() => {
    source = new Account("Source", 10000);
    targets = [new Account("A", 0), new Account("B", 0), new Account("C", 0)];
  });

  it("should distribute all funds equally using index integration", () => {
    distributeAmounts(9000, source, targets, DistributionMethod.DistributeAll);
    expect(targets[0]!.balance).toBeCloseTo(3000);
    expect(targets[1]!.balance).toBeCloseTo(3000);
    expect(targets[2]!.balance).toBeCloseTo(3000);
    expect(source.balance).toBeCloseTo(1000);
  });

  it("should distribute by percentage using index integration", () => {
    distributeAmounts(
      10000,
      source,
      targets,
      DistributionMethod.Percentage,
      [50, 30, 20],
    );
    expect(targets[0]!.balance).toBeCloseTo(5000);
    expect(targets[1]!.balance).toBeCloseTo(3000);
    expect(targets[2]!.balance).toBeCloseTo(2000);
    expect(source.balance).toBeCloseTo(0);
  });

  it("should handle zero distribution amount using index integration", () => {
    distributeAmounts(0, source, targets, DistributionMethod.DistributeAll);
    expect(targets[0]!.balance).toBe(0);
    expect(targets[1]!.balance).toBe(0);
    expect(targets[2]!.balance).toBe(0);
    expect(source.balance).toBe(10000);
  });
});
