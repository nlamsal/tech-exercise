import { Account } from "./account.model";
import { DistributionMethod } from "./index";

export function distribute(
  amountToDistribute: number,
  sourceAccount: Account,
  accounts: Account[],
  method: DistributionMethod = DistributionMethod.DistributeAll,
  percentages?: number[] | number,
) {
  switch (method) {
    case DistributionMethod.DistributeAll:
    case DistributionMethod.Proportional: {
      if (accounts.length === 0) {
        sourceAccount.balance -= amountToDistribute;
        break;
      }
      const equalShare = amountToDistribute / accounts.length;
      accounts.forEach((account) => {
        account.balance += equalShare;
      });
      sourceAccount.balance -= amountToDistribute;
      break;
    }
    case DistributionMethod.Percentage:
      if (Array.isArray(percentages)) {
        let totalDistributed = 0;
        accounts.forEach((account, idx) => {
          const pct = percentages[idx] ?? 0;
          const share = (pct / 100) * amountToDistribute;
          account.balance += share;
          totalDistributed += share;
        });
        sourceAccount.balance -= totalDistributed;
      } else {
        const pct = (percentages as number) ?? 10;
        accounts.forEach((account) => {
          const share = (pct / 100) * amountToDistribute;
          account.balance += share;
        });
        sourceAccount.balance -= amountToDistribute;
      }
      break;
    default:
      throw new Error("Invalid distribution method");
  }
}

export function distributeAmounts(
  amountToDistribute: number,
  sourceAccount: Account,
  targetAccounts: Account[],
  method: DistributionMethod = DistributionMethod.DistributeAll,
  percentages?: number[] | number,
) {
  console.log(
    `Distributing ${amountToDistribute} from ${sourceAccount.name} to target accounts using method ${DistributionMethod[method]}.`,
  );
  console.log(`Source Account before distribution: ${sourceAccount.balance}`);
  console.log("Target Accounts before distribution:", targetAccounts);

  distribute(
    amountToDistribute,
    sourceAccount,
    targetAccounts,
    method,
    percentages,
  );
  console.log(`Distribution complete. Updated balances:`);
  console.log("Source Account after distribution:", sourceAccount);
  console.log("Target Accounts after distribution:", targetAccounts);
}
