// const { parseEther, ZeroAddress, ZeroHash, Signature } = require("ethers");
// const { Provider, Contract, Wallet } = require("zksync-ethers");

// const CONTRACT_ADDRESS = "0x10c386a7e95C76B42CBC41A87F8deA953D5d9C4f";
// const RPC_URL = "https://abstract-testnet.g.alchemy.com/v2/";
// const PRIVATE_KEY = "0xYOUR_PRIVATE_KEY";

// const abi = [
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "_platformWallet",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "nonpayable",
//         "type": "constructor"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "token",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "to",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             }
//         ],
//         "name": "ERC20Paid",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "to",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             }
//         ],
//         "name": "ETHPaid",
//         "type": "event"
//     },
//     {
//         "inputs": [
//             {
//                 "components": [
//                     {
//                         "internalType": "address payable",
//                         "name": "projectWallet",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "address payable",
//                         "name": "referralWallet",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "projectAmount",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "platformAmount",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "referralCutBps",
//                         "type": "uint256"
//                     }
//                 ],
//                 "internalType": "struct UniversalPaymentSplitter.ETHPayment",
//                 "name": "ethPayment",
//                 "type": "tuple"
//             },
//             {
//                 "components": [
//                     {
//                         "internalType": "address",
//                         "name": "token",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "address",
//                         "name": "projectWallet",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "amount",
//                         "type": "uint256"
//                     }
//                 ],
//                 "internalType": "struct UniversalPaymentSplitter.ERC20Payment",
//                 "name": "erc20Payment",
//                 "type": "tuple"
//             },
//             {
//                 "components": [
//                     {
//                         "internalType": "address",
//                         "name": "owner",
//                         "type": "address"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "value",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "uint256",
//                         "name": "deadline",
//                         "type": "uint256"
//                     },
//                     {
//                         "internalType": "uint8",
//                         "name": "v",
//                         "type": "uint8"
//                     },
//                     {
//                         "internalType": "bytes32",
//                         "name": "r",
//                         "type": "bytes32"
//                     },
//                     {
//                         "internalType": "bytes32",
//                         "name": "s",
//                         "type": "bytes32"
//                     }
//                 ],
//                 "internalType": "struct UniversalPaymentSplitter.PermitSignature",
//                 "name": "permit",
//                 "type": "tuple"
//             }
//         ],
//         "name": "payWithPermit",
//         "outputs": [],
//         "stateMutability": "payable",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "platformWallet",
//         "outputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "withdrawStuckETH",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     }
// ]

// const provider = new Provider(RPC_URL);
// const wallet = new Wallet(PRIVATE_KEY, provider);

// const splitter = new Contract(
//     CONTRACT_ADDRESS,
//     abi,
//     wallet
// );

// const projectWallet = "0x4093Cbc7569A6007795ecb1A5350823f6AE7f054";

// async function main() {
//     const platformWallet = await splitter.platformWallet();

//     // await makeEthPayment();

//     // await makeErc20Payment();

//     // await makeEthPaymentWithErc20PermitAndReferral();
//     // await makeEthPaymentWithErc20PermitAndNoReferral();
// }

// async function makeEthPayment() {
//     const ethPayment = {
//         projectWallet,
//         referralWallet: "0xc7C1Cf2E21aCd366FDca5b64527dD00d4204CA4e",
//         projectAmount: parseEther("0.1"),
//         platformAmount: parseEther("0.05"),
//         referralCutBps: 1000
//     };

//     const tx = await splitter.payWithPermit(
//         ethPayment,
//         {
//             token: ZeroAddress,
//             projectWallet: ZeroAddress,
//             amount: 0
//         },
//         {
//             owner: ZeroAddress,
//             value: 0,
//             deadline: 0,
//             v: 0,
//             r: ZeroHash,
//             s: ZeroHash
//         },
//         { value: parseEther("0.15") }
//     );

//     console.log("ETH Payment TX:", tx.hash);
//     await tx.wait();
// }

// async function makeErc20Payment() {
//     try {
//         const tokenAddress = "0xBCe5C328b2e4d10742F41b7ac0BF42D2cd1fCD68";
//         const token = await new Contract(tokenAddress, ["function decimals() view returns (uint8)", "function nonces(address owner) view returns (uint256)", "function name() view returns (string memory)", "function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)"], wallet);

//         const owner = wallet.address;
//         const name = await token.name();
//         console.log("Token Name:", name);
//         const decimals = await token.decimals();
//         console.log("Token Decimals:", decimals);
//         const spender = CONTRACT_ADDRESS;
//         const value = BigInt(100) * (BigInt(10) ** decimals);
//         const deadline = Math.floor(Date.now() / 1000) + 3600;

//         const signature = await wallet.signTypedData(
//             {
//                 name,
//                 version: "1",
//                 chainId: "11124",
//                 verifyingContract: tokenAddress
//             },
//             {
//                 Permit: [
//                     { name: "owner", type: "address" },
//                     { name: "spender", type: "address" },
//                     { name: "value", type: "uint256" },
//                     { name: "nonce", type: "uint256" },
//                     { name: "deadline", type: "uint256" }
//                 ]
//             },
//             {
//                 owner,
//                 spender,
//                 value,
//                 nonce: await token.nonces(owner),
//                 deadline
//             }
//         );

//         const { v, r, s } = Signature.from(signature);

//         const erc20Payment = {
//             token: tokenAddress,
//             projectWallet,
//             amount: value
//         };

//         const tx = await splitter.payWithPermit(
//             {
//                 projectWallet: ZeroAddress,
//                 referralWallet: ZeroAddress,
//                 projectAmount: 0,
//                 platformAmount: 0,
//                 referralCutBps: 0
//             },
//             erc20Payment,
//             {
//                 owner,
//                 value,
//                 deadline,
//                 v,
//                 r,
//                 s
//             }
//         );

//         console.log("ERC20 Payment TX:", tx.hash);
//         await tx.wait();
//     } catch (error) {
//         console.error("Error making ERC20 payment:", error);
//     }
// }

// async function makeEthPaymentWithErc20PermitAndReferral() {
//     try {
//         const tokenAddress = "0xBCe5C328b2e4d10742F41b7ac0BF42D2cd1fCD68";
//         const token = new Contract(tokenAddress, ["function decimals() view returns (uint8)", "function nonces(address owner) view returns (uint256)", "function name() view returns (string memory)", "function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)"], wallet);
//         const owner = wallet.address;
//         const name = await token.name();
//         console.log("Token Name:", name);
//         const decimals = await token.decimals();
//         console.log("Token Decimals:", decimals);
//         const spender = CONTRACT_ADDRESS;
//         const value = BigInt(100) * (BigInt(10) ** decimals);
//         const deadline = Math.floor(Date.now() / 1000) + 3600;
//         const signature = await wallet.signTypedData(
//             {
//                 name,
//                 version: "1",
//                 chainId: "11124",
//                 verifyingContract: tokenAddress
//             },
//             {
//                 Permit: [
//                     { name: "owner", type: "address" },
//                     { name: "spender", type: "address" },
//                     { name: "value", type: "uint256" },
//                     { name: "nonce", type: "uint256" },
//                     { name: "deadline", type: "uint256" }
//                 ]
//             },
//             {
//                 owner,
//                 spender,
//                 value,
//                 nonce: await token.nonces(owner),
//                 deadline
//             }

//         );

//         const { v, r, s } = Signature.from(signature);

//         const ethPayment = {
//             projectWallet,
//             referralWallet: "0xc7C1Cf2E21aCd366FDca5b64527dD00d4204CA4e",
//             projectAmount: parseEther("0.1"),
//             platformAmount: parseEther("0.05"),
//             referralCutBps: 1000
//         };
//         const totalETH = ethPayment.projectAmount + ethPayment.platformAmount;
//         const tx = await splitter.payWithPermit(
//             ethPayment,
//             {
//                 token: tokenAddress,
//                 projectWallet,
//                 amount: value
//             },
//             {
//                 owner,
//                 value,
//                 deadline,
//                 v,
//                 r,
//                 s
//             },
//             { value: totalETH }
//         );

//         console.log("ETH Payment with ERC20 Permit TX:", tx.hash);
//         await tx.wait();
//     } catch (error) {
//         console.error("Error making ETH payment with ERC20 permit:", error);
//     }
// }

// async function makeEthPaymentWithErc20PermitAndNoReferral() {
//     try {
//         const tokenAddress = "0xBCe5C328b2e4d10742F41b7ac0BF42D2cd1fCD68";
//         const token = new Contract(tokenAddress, ["function decimals() view returns (uint8)", "function nonces(address owner) view returns (uint256)", "function name() view returns (string memory)", "function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)"], wallet);
//         const owner = wallet.address;
//         const name = await token.name();
//         console.log("Token Name:", name);
//         const decimals = await token.decimals();
//         console.log("Token Decimals:", decimals);
//         const spender = CONTRACT_ADDRESS;
//         const value = BigInt(100) * (BigInt(10) ** decimals);
//         const deadline = Math.floor(Date.now() / 1000) + 3600;
//         const signature = await wallet.signTypedData(
//             {
//                 name,
//                 version: "1",
//                 chainId: "11124",
//                 verifyingContract: tokenAddress
//             },
//             {
//                 Permit: [
//                     { name: "owner", type: "address" },
//                     { name: "spender", type: "address" },
//                     { name: "value", type: "uint256" },
//                     { name: "nonce", type: "uint256" },
//                     { name: "deadline", type: "uint256" }
//                 ]
//             },
//             {
//                 owner,
//                 spender,
//                 value,
//                 nonce: await token.nonces(owner),
//                 deadline
//             }
//         );

//         const { v, r, s } = Signature.from(signature);

//         const ethPayment = {
//             projectWallet,
//             referralWallet: ZeroAddress,
//             projectAmount: parseEther("0.1"),
//             platformAmount: parseEther("0.05"),
//             referralCutBps: 0
//         };

//         const totalETH = ethPayment.projectAmount + ethPayment.platformAmount;

//         const tx = await splitter.payWithPermit(
//             ethPayment,
//             {
//                 token: tokenAddress,
//                 projectWallet,
//                 amount: value
//             },
//             {
//                 owner,
//                 value,
//                 deadline,
//                 v,
//                 r,
//                 s
//             },
//             { value: totalETH }
//         );

//         console.log("ETH Payment with ERC20 Permit and No Referral TX:", tx.hash);
//         await tx.wait();
//     } catch (error) {
//         console.error("Error making ETH payment with ERC20 permit and no referral:", error);
//     }
// }

// main().catch(console.error);