// async function prepareEthPayment(ethPayment: {
//     projectWallet: string;
//     referralWallet: string;
//     projectAmount: bigint;
//     platformAmount: bigint;
//     referralCutBps: bigint;
// }) {
//     return {
//         ethPayment,
//         erc20Payment: {
//             token: ZeroAddress,
//             projectWallet: ZeroAddress,
//             amount: 0
//         },
//         permit: {
//             owner: ZeroAddress,
//             value: 0,
//             deadline: 0,
//             v: 0,
//             r: ZeroHash,
//             s: ZeroHash
//         },
//         value: ethPayment.projectAmount + ethPayment.platformAmount
//     };
// }

// async function prepareErc20Payment(erc20Payment: {
//     token: string;
//     projectWallet: string;
//     amount: number;
// }, clientAddress: string) {
//     const token = new Contract(
//         erc20Payment.token,
//         [
//             "function decimals() view returns (uint8)",
//             "function nonces(address owner) view returns (uint256)",
//             "function name() view returns (string)",
//         ],
//         provider
//     );

//     const name = await token.name();
//     const decimals = await token.decimals();
//     const amount = erc20Payment.amount * (10 ** Number(decimals));
//     const deadline = Math.floor(Date.now() / 1000) + 3600;
//     const nonce = await token.nonces(clientAddress);

//     const typedData = {
//         domain: {
//             name,
//             version: "1",
//             chainId: "11124",
//             verifyingContract: erc20Payment.token
//         },
//         types: {
//             Permit: [
//                 { name: "owner", type: "address" },
//                 { name: "spender", type: "address" },
//                 { name: "value", type: "uint256" },
//                 { name: "nonce", type: "uint256" },
//                 { name: "deadline", type: "uint256" }
//             ]
//         },
//         message: {
//             owner: clientAddress,
//             spender: CONTRACT_ADDRESS,
//             value: amount,
//             nonce,
//             deadline
//         }
//     };

//     return {
//         ethPayment: {
//             projectWallet: ZeroAddress,
//             referralWallet: ZeroAddress,
//             projectAmount: 0,
//             platformAmount: 0,
//             referralCutBps: 0
//         },
//         erc20Payment: {
//             ...erc20Payment,
//             amount
//         },
//         permit: {
//             owner: clientAddress,
//             value: amount,
//             deadline,
//             v: 0,
//             r: ZeroHash,
//             s: ZeroHash
//         },
//         typedData,
//         value: 0
//     };
// }

// async function prepareCombinedPayment(
//     fromWallet: string,
//     ethPayment?: {
//         projectWallet: string;
//         referralWallet: string;
//         projectAmount: bigint;
//         platformAmount: bigint;
//         referralCutBps: bigint;
//     },
//     erc20Payment?: {
//         token: string;
//         projectWallet: string;
//         amount: number;
//     },
// ) {
//     const token = new Contract(
//         erc20Payment?.token,
//         [
//             "function decimals() view returns (uint8)",
//             "function nonces(address owner) view returns (uint256)",
//             "function name() view returns (string)",
//         ],
//         provider
//     );

//     const name = await token.name();
//     const decimals = await token.decimals();
//     const amount = erc20Payment ? erc20Payment.amount * (10 ** Number(decimals)) : 0;
//     const deadline = Math.floor(Date.now() / 1000) + 3600;
//     const nonce = await token.nonces(fromWallet);

//     const typedData = {
//         domain: {
//             name,
//             version: "1",
//             chainId: "11124",
//             verifyingContract: erc20Payment?.token
//         },
//         types: {
//             Permit: [
//                 { name: "owner", type: "address" },
//                 { name: "spender", type: "address" },
//                 { name: "value", type: "uint256" },
//                 { name: "nonce", type: "uint256" },
//                 { name: "deadline", type: "uint256" }
//             ]
//         },
//         message: {
//             owner: fromWallet,
//             spender: CONTRACT_ADDRESS,
//             value: amount,
//             nonce,
//             deadline
//         }
//     };

//     return {
//         ethPayment,
//         erc20Payment: {
//             ...erc20Payment,
//             amount
//         },
//         permit: {
//             owner: fromWallet,
//             value: amount,
//             deadline,
//             v: 0,
//             r: ZeroHash,
//             s: ZeroHash
//         },
//         typedData,
//         value: ethPayment ? ethPayment.projectAmount + ethPayment.platformAmount : 0
//     };
// }

// async function executePreparedPayment(
//     preparedData: any,
//     permitSignature?: Signature
// ) {
//     let finalPermit = preparedData.permit;

//     if (permitSignature) {
//         finalPermit = {
//             ...preparedData.permit,
//             v: permitSignature.v,
//             r: permitSignature.r,
//             s: permitSignature.s
//         };
//     }

//     const tx = await splitter.payWithPermit(
//         preparedData.ethPayment,
//         preparedData.erc20Payment,
//         finalPermit,
//         { value: preparedData.value }
//     );

//     console.log("Transaction Hash:", tx.hash);
//     await tx.wait();
//     return tx.hash;
// }

// async function main() {
//     const clientAddress = wallet.address;

//     const ethPayment =
//     {
//         projectWallet,
//         referralWallet: "0xc7C1Cf2E21aCd366FDca5b64527dD00d4204CA4e",
//         projectAmount: parseEther("0.1"),
//         platformAmount: parseEther("0.05"),
//         referralCutBps: BigInt(1000)
//     }
//     const erc20 = {
//         token: "0xBCe5C328b2e4d10742F41b7ac0BF42D2cd1fCD68",
//         projectWallet,
//         amount: 100
//     }

//     const ethPaymentData = await prepareEthPayment(ethPayment);

//     await executePreparedPayment(ethPaymentData);

//     const erc20PaymentData = await prepareErc20Payment(erc20, clientAddress);

//     const permitSignature = await wallet.signTypedData(
//         erc20PaymentData.typedData.domain,
//         erc20PaymentData.typedData.types,
//         erc20PaymentData.typedData.message
//     );

//     await executePreparedPayment(erc20PaymentData, Signature.from(permitSignature));

//     const combinedData = await prepareCombinedPayment(
//         clientAddress,
//         ethPayment,
//         erc20,
//     );

//     const combinedSignature = await wallet.signTypedData(
//         combinedData.typedData.domain,
//         combinedData.typedData.types,
//         combinedData.typedData.message
//     );

//     await executePreparedPayment(combinedData, Signature.from(combinedSignature));
// }