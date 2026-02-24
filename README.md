# tech-exercise

## Running the Application

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Build and start the CLI:**
   ```sh
   npm run start
   ```

3. **Follow the prompts:**
   - You will be asked to choose a distribution method:
     - `0`: Distribute all funds equally
     - `1`: Distribute proportionally (currently behaves like equal distribution)
     - `2`: Distribute by percentage
   - For methods 1 and 2, you will be prompted to enter the amount to distribute.
   - For method 2, you will be prompted to enter the percentage for each target account. The total must be exactly 100%.

## Example Scenarios

### 1. Distribute All Funds Equally
- Choose method `0`.
- All available funds from the source account will be distributed equally among the target accounts.

### 2. Distribute by Percentage
- Choose method `2`.
- Enter the amount to distribute (e.g., `10000`).
- Enter the percentage for each account (e.g., `50`, `30`, `20`). The total must be 100.

### 3. Distribute Proportionally
- Choose method `1`.
- Enter the amount to distribute (e.g., `6000`).
- Funds will be distributed equally among the target accounts (current logic).

## Running Tests

To run all unit tests:
```sh
npm run test
```

## Notes
- The CLI runs in the terminal and will prompt for all required inputs.
- All business logic is in the `src/` directory.
- Test cases are in `src/*.spec.ts` files.