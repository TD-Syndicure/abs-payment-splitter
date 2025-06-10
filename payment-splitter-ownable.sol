// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UniversalPaymentSplitter is Ownable {
    address public platformWallet;
    event PlatformWalletUpdated(
        address indexed oldWallet,
        address indexed newWallet
    );
    event ETHPaid(address indexed to, uint256 amount);
    event ERC20Paid(address indexed token, address indexed to, uint256 amount);

    struct ETHPayment {
        address payable projectWallet;
        address payable referralWallet;
        uint256 projectAmount;
        uint256 platformAmount;
        uint256 referralCutBps;
    }

    struct ERC20Payment {
        address token;
        address projectWallet;
        uint256 amount;
    }

    struct PermitSignature {
        address owner;
        uint256 value;
        uint256 deadline;
        uint8 v;
        bytes32 r;
        bytes32 s;
    }

    constructor(address _platformWallet) Ownable(msg.sender) {
        require(
            _platformWallet != address(0),
            "Platform wallet cannot be zero"
        );
        platformWallet = _platformWallet;
    }

    function payWithPermit(
        ETHPayment calldata ethPayment,
        ERC20Payment calldata erc20Payment,
        PermitSignature calldata permit
    ) external payable {
        if (erc20Payment.token != address(0) && erc20Payment.amount > 0) {
            require(
                erc20Payment.projectWallet != address(0),
                "ERC20 project wallet is zero"
            );

            IERC20Permit(erc20Payment.token).permit(
                permit.owner,
                address(this),
                permit.value,
                permit.deadline,
                permit.v,
                permit.r,
                permit.s
            );

            IERC20 token = IERC20(erc20Payment.token);
            require(
                token.balanceOf(permit.owner) >= erc20Payment.amount,
                "Insufficient token balance"
            );
            require(
                token.allowance(permit.owner, address(this)) >=
                    erc20Payment.amount,
                "Insufficient token allowance"
            );

            require(
                token.transferFrom(
                    permit.owner,
                    erc20Payment.projectWallet,
                    erc20Payment.amount
                ),
                "ERC20 transfer failed"
            );
            emit ERC20Paid(
                erc20Payment.token,
                erc20Payment.projectWallet,
                erc20Payment.amount
            );
        }

        uint256 totalETH = ethPayment.platformAmount + ethPayment.projectAmount;
        require(msg.value >= totalETH, "Insufficient ETH");
        require(ethPayment.referralCutBps <= 20000, "Invalid referral BPS");

        if (ethPayment.platformAmount > 0) {
            uint256 referralAmount = (ethPayment.platformAmount *
                ethPayment.referralCutBps) / 20000;
            uint256 platformAmount = ethPayment.platformAmount - referralAmount;

            if (referralAmount > 0) {
                require(
                    ethPayment.referralWallet != address(0),
                    "Referral wallet is zero"
                );
                _safeTransferETH(ethPayment.referralWallet, referralAmount);
                emit ETHPaid(ethPayment.referralWallet, referralAmount);
            }

            _safeTransferETH(payable(platformWallet), platformAmount);
            emit ETHPaid(platformWallet, platformAmount);
        }

        if (ethPayment.projectAmount > 0) {
            require(
                ethPayment.projectWallet != address(0),
                "Project wallet is zero"
            );
            _safeTransferETH(
                ethPayment.projectWallet,
                ethPayment.projectAmount
            );
            emit ETHPaid(ethPayment.projectWallet, ethPayment.projectAmount);
        }

        if (msg.value > totalETH) {
            _safeTransferETH(payable(msg.sender), msg.value - totalETH);
        }
    }

    function _safeTransferETH(address payable recipient, uint256 amount)
        private
    {
        require(recipient != address(0), "Recipient cannot be zero");
        (bool success, ) = recipient.call{value: amount}("");

        if (success) {
            return;
        } else {
            emit WithdrawalFailed(recipient, amount);
            revert("ETH transfer failed.");
        }
    }

    event WithdrawalFailed(address indexed to, uint256 amount);

    function withdrawStuckETH() external {
        require(msg.sender == platformWallet, "Unauthorized");
        uint256 balance = address(this).balance;
        (bool success, ) = platformWallet.call{value: balance}("");
        if (!success) {
            emit WithdrawalFailed(platformWallet, balance);
            revert("Withdrawal failed");
        }
    }

    function updatePlatformWallet(address newPlatformWallet)
        external
        onlyOwner
    {
        require(
            newPlatformWallet != address(0),
            "New platform wallet cannot be zero"
        );
        require(
            newPlatformWallet != address(this),
            "Contract address not allowed"
        );
        address oldWallet = platformWallet;
        platformWallet = newPlatformWallet;
        emit PlatformWalletUpdated(oldWallet, newPlatformWallet);
    }
}
