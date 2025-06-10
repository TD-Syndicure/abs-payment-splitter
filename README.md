# abs-payment-splitter

Overview
- The UniversalPaymentSplitter contract enables:
- Combined ETH and ERC20 token payments in a single transaction
- Gas-efficient ERC20 approvals via EIP-2612 permits
- Flexible payment splitting between project, platform, and referral wallets
- Secure ETH transfers with failure handling
- Platform wallet management

##Key Features:

1. Payment Processing
Accept both ETH and ERC20 token payments
Split ETH payments between project, platform, and referral wallets
Handle token transfers using permit signatures

2. Security Features
Reentrancy-safe ETH transfers
Input validation for addresses and amounts
Basis points limit (20000 = 200%) for referral cuts
Failed transfer tracking via events

3. Administrative Functions
Platform wallet updates (contract owner only)
Stuck ETH withdrawal (platform wallet only)

##Usage
Eth payments only, use Zero values for ERC20 and permit
```ts
await splitter.payWithPermit(
    {
        projectWallet: "0xProject...",
        referralWallet: "0xReferral...",
        projectAmount: ethers.parseEther("0.8"),
        platformAmount: ethers.parseEther("0.2"),
        referralCutBps: 1000  // 10% of platformAmount
    },
    {
        token: ethers.ZeroAddress,
        projectWallet: ethers.ZeroAddress,
        amount: 0
    },
    {
        owner: ethers.ZeroAddress,
        value: 0,
        deadline: 0,
        v: 0, r: ethers.ZeroHash, s: ethers.ZeroHash
    },
    { value: ethers.parseEther("1.0") }
);```

Eth payments only, use Zero values for ERC20 and permit, if no referrer or project provide Zero values
For ERC20 verify signatures before submission
```ts
await splitter.payWithPermit(
    {
        projectWallet: "0xProject...",
        referralWallet: "0xReferral...",
        projectAmount: ethers.parseEther("0.8"),
        platformAmount: ethers.parseEther("0.2"),
        referralCutBps: 1000  // 10% of platformAmount
    },
    {
        token: ethers.ZeroAddress,
        projectWallet: ethers.ZeroAddress,
        amount: 0
    },
    {
        owner: ethers.ZeroAddress,
        value: 0,
        deadline: 0,
        v: 0, r: ethers.ZeroHash, s: ethers.ZeroHash
    },
    { value: ethers.parseEther("1.0") }
);```
