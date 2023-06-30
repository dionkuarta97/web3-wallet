import { atom } from 'jotai';
import { PublicWallet, TokenType, Wallet } from '../wallet/walletTypes';
import { Network } from '../../api/networks';
import { ethers } from 'ethers';

export enum SendCryptoTxStatus {
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

interface SendCryptoState {
  network?: Network;
  senderWallet?: Wallet;
  destinationWallet?: PublicWallet;
  token?: TokenType;
  amount?: string;
  networkFeeToken?: TokenType;
  networkFee?: string;
  evmFeeData?: ethers.providers.FeeData & { estimatedGas?: ethers.BigNumber };
  txHash?: string;
}

interface SendCryptoTransaction {
  status: SendCryptoTxStatus;
  txHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export const sendCryptoStateAtom = atom<SendCryptoState>({});
sendCryptoStateAtom.debugLabel = 'sendCryptoStateAtom';

export const sendCryptoTransactionHistoryAtom = atom<SendCryptoTransaction[]>([]);
export const readWriteSendCryptoTransactionHistoryAtom = atom(
  get => get(sendCryptoTransactionHistoryAtom),
  (get, set, transaction: SendCryptoTransaction) => {
    const transactions = get(sendCryptoTransactionHistoryAtom);
    const newTransactions = [...transactions, transaction];
    set(sendCryptoTransactionHistoryAtom as any, newTransactions);
  },
);
export const sendCryptoTransactionByTxHashAtom = atom(
  null as SendCryptoTransaction | null,
  (get, set, txHash: string) => {
    const transactions = get(sendCryptoTransactionHistoryAtom);
    const transaction = transactions.find((tx) => tx.txHash === txHash);
    set(sendCryptoTransactionByTxHashAtom as any, transaction);
  },
)
export const clearSendCryptoTransactionByTxHashAtom = atom(
  null as SendCryptoTransaction | null,
  (get, set) => {
    set(sendCryptoTransactionByTxHashAtom as any, null);
  },
);
export const updateSendCryptoTransactionByTxHashAtom = atom(
  null as SendCryptoTransaction | null,
  (get, set, transaction: SendCryptoTransaction) => {
    const transactions = get(sendCryptoTransactionHistoryAtom);
    const newTransactions = transactions.map((tx) => {
      if (tx.txHash === transaction.txHash) {
        return transaction;
      }
      return tx;
    });
    set(sendCryptoTransactionHistoryAtom as any, newTransactions);

    // Not sure why this does not work..
    // sendCryptoTransactionByTxHashAtom will be null after this
    // set(sendCryptoTransactionByTxHashAtom as any, transaction);
  },
)