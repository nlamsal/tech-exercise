import { distribute, distributeAmounts } from "./distribute-amounts";

import { Account } from "./account.model";
import { DistributionMethod } from "./index";

describe("distributeAmounts and distribute", () => {
  let source: Account;
  let targets: Account[];

  beforeEach(() => {
    source = new Account("Source", 10000);
    targets = [new Account("A", 0), new Account("B", 0), new Account("C", 0)];
  });

  it("should distribute all funds equally (DistributeAll)", () => {
    distributeAmounts(9000, source, targets, DistributionMethod.DistributeAll);
    expect(targets[0]!.balance).toBeCloseTo(3000);
    expect(targets[1]!.balance).toBeCloseTo(3000);
    expect(targets[2]!.balance).toBeCloseTo(3000);
    expect(source.balance).toBeCloseTo(1000);
  });

  it("should distribute funds by given percentages (Percentage)", () => {
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

  it("should handle zero distribution amount", () => {
    distributeAmounts(0, source, targets, DistributionMethod.DistributeAll);
    expect(targets[0]!.balance).toBe(0);
    expect(targets[1]!.balance).toBe(0);
    expect(targets[2]!.balance).toBe(0);
    expect(source.balance).toBe(10000);
  });

  it("should throw error on invalid method", () => {
    expect(() => distribute(1000, source, targets, 99 as any)).toThrow();
  });
});
