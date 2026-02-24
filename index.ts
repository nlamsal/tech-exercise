import * as readline from "readline";

import { Account } from "./account.model";
import { distributeAmounts } from "./distribute-amounts";

export enum DistributionMethod {
  DistributeAll,
  Proportional,
  Percentage,
}

// Start of the main entry method
const main = async (): Promise<void> => {
  const sourceAccount = new Account("Nick", 10000);

  const targetAccounts = [
    new Account("Sheela", 5000),
    new Account("Bob", 3000),
    new Account("Chris", 2000),
  ];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("Choose distribution method:");
  console.log("0: Distribute all funds equally");
  console.log("1: Distribute Proportional");
  console.log("2: Percentage");

  rl.question("Enter method number (0/1/2): ", (methodInput: string) => {
    const method = parseInt(methodInput);
    if (method < 0 || method > 2 || isNaN(method)) {
      console.error("Invalid method selected.");
      rl.close();
      return;
    }
    if (method === DistributionMethod.DistributeAll) {
      // For Equal, distribute all available funds
      const amount = sourceAccount.balance;
      console.log("Distributing all available funds equally.");
      distributeAmounts(amount, sourceAccount, targetAccounts, method);
      rl.close();
      return;
    }
    rl.question("Enter amount to distribute: ", (amountInput: string) => {
      let amount = parseFloat(amountInput);
      if (isNaN(amount)) {
        console.error(
          "Invalid amount entered. Distrubuting default amount of 10000.",
        );
        amount = 10000; // Setting default amount if input is invalid
      }
      if (method === DistributionMethod.Percentage) {
        let percentages: number[] = [];
        // Collect percentage for each account from user terminal
        const askPercentage = (index: number) => {
          if (index < targetAccounts.length) {
            const account = targetAccounts[index];
            const accountName = account ? account.name : `Account ${index + 1}`;

            rl.question(
              `Enter percentage for ${accountName}: `,
              (input: string) => {
                const pct = parseFloat(input);
                if (isNaN(pct) || pct < 0 || pct > 100) {
                  console.error("Invalid percentage entered.");
                  rl.close();
                  return;
                }
                percentages.push(pct);
                askPercentage(index + 1);
              },
            );
          } else {
            const totalPct = percentages.reduce((sum, p) => sum + p, 0);
            if (totalPct !== 100) {
              console.error(
                `Total percentage must be exactly 100%. You entered ${totalPct}%.`,
              );
              rl.close();
              return;
            }
            console.log(
              "Distributing amount among target accounts based on percentages.",
            );
            distributeAmounts(
              amount,
              sourceAccount,
              targetAccounts,
              method,
              percentages,
            );
            rl.close();
          }
        };
        askPercentage(0);
      } else {
        console.log("Distributing amount among target accounts.");
        distributeAmounts(amount, sourceAccount, targetAccounts, method);
        rl.close();
      }
    });
  });
};

if (require.main === module) {
  main();
}

export { main };
