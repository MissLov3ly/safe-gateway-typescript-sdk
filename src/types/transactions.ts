import type { AddressEx, Page, TokenInfo } from './common'
import type { RichDecodedInfo } from './human-description'

export type ParamValue = string | ParamValue[]

export enum Operation {
  CALL = 0,
  DELEGATE = 1,
}

export type InternalTransaction = {
  operation: Operation
  to: string
  value?: string
  data: string | null
  dataDecoded?: DataDecoded
}

export type ValueDecodedType = InternalTransaction[]

export type Parameter = {
  name: string
  type: string
  value: ParamValue
  valueDecoded?: ValueDecodedType
}

export type DataDecoded = {
  method: string
  parameters?: Parameter[]
}

export enum TransactionStatus {
  AWAITING_CONFIRMATIONS = 'AWAITING_CONFIRMATIONS',
  AWAITING_EXECUTION = 'AWAITING_EXECUTION',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
}

export enum TransferDirection {
  INCOMING = 'INCOMING',
  OUTGOING = 'OUTGOING',
  UNKNOWN = 'UNKNOWN',
}

export enum TransactionTokenType {
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  NATIVE_COIN = 'NATIVE_COIN',
}

export enum SettingsInfoType {
  SET_FALLBACK_HANDLER = 'SET_FALLBACK_HANDLER',
  ADD_OWNER = 'ADD_OWNER',
  REMOVE_OWNER = 'REMOVE_OWNER',
  SWAP_OWNER = 'SWAP_OWNER',
  CHANGE_THRESHOLD = 'CHANGE_THRESHOLD',
  CHANGE_IMPLEMENTATION = 'CHANGE_IMPLEMENTATION',
  ENABLE_MODULE = 'ENABLE_MODULE',
  DISABLE_MODULE = 'DISABLE_MODULE',
  SET_GUARD = 'SET_GUARD',
  DELETE_GUARD = 'DELETE_GUARD',
}

export enum TransactionInfoType {
  TRANSFER = 'Transfer',
  SETTINGS_CHANGE = 'SettingsChange',
  CUSTOM = 'Custom',
  CREATION = 'Creation',
}

export enum ConflictType {
  NONE = 'None',
  HAS_NEXT = 'HasNext',
  END = 'End',
}

export enum TransactionListItemType {
  TRANSACTION = 'TRANSACTION',
  LABEL = 'LABEL',
  CONFLICT_HEADER = 'CONFLICT_HEADER',
  DATE_LABEL = 'DATE_LABEL',
}

export enum DetailedExecutionInfoType {
  MULTISIG = 'MULTISIG',
  MODULE = 'MODULE',
}

export type Erc20Transfer = {
  type: TransactionTokenType.ERC20
  tokenAddress: string
  tokenName?: string
  tokenSymbol?: string
  logoUri?: string
  decimals?: number
  value: string
}

export type Erc721Transfer = {
  type: TransactionTokenType.ERC721
  tokenAddress: string
  tokenId: string
  tokenName?: string
  tokenSymbol?: string
  logoUri?: string
}

export type NativeCoinTransfer = {
  type: TransactionTokenType.NATIVE_COIN
  value: string
}

export type TransferInfo = Erc20Transfer | Erc721Transfer | NativeCoinTransfer

export type Transfer = {
  type: TransactionInfoType.TRANSFER
  sender: AddressEx
  recipient: AddressEx
  direction: TransferDirection
  transferInfo: TransferInfo
  humanDescription?: string
  richDecodedInfo?: RichDecodedInfo
}

export type SetFallbackHandler = {
  type: SettingsInfoType.SET_FALLBACK_HANDLER
  handler: AddressEx
}

export type AddOwner = {
  type: SettingsInfoType.ADD_OWNER
  owner: AddressEx
  threshold: number
}

export type RemoveOwner = {
  type: SettingsInfoType.REMOVE_OWNER
  owner: AddressEx
  threshold: number
}

export type SwapOwner = {
  type: SettingsInfoType.SWAP_OWNER
  oldOwner: AddressEx
  newOwner: AddressEx
}

export type ChangeThreshold = {
  type: SettingsInfoType.CHANGE_THRESHOLD
  threshold: number
}

export type ChangeImplementation = {
  type: SettingsInfoType.CHANGE_IMPLEMENTATION
  implementation: AddressEx
}

export type EnableModule = {
  type: SettingsInfoType.ENABLE_MODULE
  module: AddressEx
}

export type DisableModule = {
  type: SettingsInfoType.DISABLE_MODULE
  module: AddressEx
}

export type SetGuard = {
  type: SettingsInfoType.SET_GUARD
  guard: AddressEx
}

export type DeleteGuard = {
  type: SettingsInfoType.DELETE_GUARD
}

export type SettingsInfo =
  | SetFallbackHandler
  | AddOwner
  | RemoveOwner
  | SwapOwner
  | ChangeThreshold
  | ChangeImplementation
  | EnableModule
  | DisableModule
  | SetGuard
  | DeleteGuard

export type SettingsChange = {
  type: TransactionInfoType.SETTINGS_CHANGE
  dataDecoded: DataDecoded
  settingsInfo?: SettingsInfo
  humanDescription?: string
  richDecodedInfo?: RichDecodedInfo
}

export type Custom = {
  type: TransactionInfoType.CUSTOM
  to: AddressEx
  dataSize: string
  value: string
  methodName?: string
  actionCount?: number
  isCancellation: boolean
  humanDescription?: string
  richDecodedInfo?: RichDecodedInfo
}

export type MultiSend = {
  type: TransactionInfoType.CUSTOM
  to: AddressEx
  dataSize: string
  value: string
  methodName: 'multiSend'
  actionCount: number
  isCancellation: boolean
  humanDescription?: string
  richDecodedInfo?: RichDecodedInfo
}

export type Cancellation = Custom & {
  isCancellation: true
}

export type Creation = {
  type: TransactionInfoType.CREATION
  creator: AddressEx
  transactionHash: string
  implementation?: AddressEx
  factory?: AddressEx
  humanDescription?: string
  richDecodedInfo?: RichDecodedInfo
}

export type TransactionInfo = Transfer | SettingsChange | Custom | MultiSend | Cancellation | Creation

export type ModuleExecutionInfo = {
  type: DetailedExecutionInfoType.MODULE
  address: AddressEx
}

export type MultisigExecutionInfo = {
  type: DetailedExecutionInfoType.MULTISIG
  nonce: number
  confirmationsRequired: number
  confirmationsSubmitted: number
  missingSigners?: AddressEx[]
}

export type ExecutionInfo = ModuleExecutionInfo | MultisigExecutionInfo

export type TransactionSummary = {
  id: string
  timestamp: number
  txStatus: TransactionStatus
  txInfo: TransactionInfo
  executionInfo?: ExecutionInfo
  safeAppInfo?: SafeAppInfo
}

export type Transaction = {
  transaction: TransactionSummary
  conflictType: ConflictType
  type: TransactionListItemType.TRANSACTION
}

export type IncomingTransfer = Omit<Transaction, 'transaction'> & {
  transaction: Omit<TransactionSummary, 'txInfo' | 'executionInfo'> & {
    txInfo: Omit<Transfer, 'direction'> & { direction: TransferDirection.INCOMING }
  }
}

export type ModuleTransaction = Omit<Transaction, 'transaction'> & {
  transaction: Omit<TransactionSummary, 'txInfo' | 'executionInfo'> & {
    txInfo: Transfer
    executionInfo?: ModuleExecutionInfo
  }
}

export type MultisigTransaction = Omit<Transaction, 'transaction'> & {
  transaction: Omit<TransactionSummary, 'txInfo' | 'executionInfo'> & {
    txInfo: Omit<Transfer, 'direction'> & { direction: TransferDirection.OUTGOING }
    executionInfo?: MultisigExecutionInfo
  }
}

export type DateLabel = {
  timestamp: number
  type: TransactionListItemType.DATE_LABEL
}

export enum LabelValue {
  Queued = 'Queued',
  Next = 'Next',
}

export type Label = {
  label: LabelValue
  type: TransactionListItemType.LABEL
}

export type ConflictHeader = {
  nonce: number
  type: TransactionListItemType.CONFLICT_HEADER
}

export type TransactionListItem = Transaction | DateLabel | Label | ConflictHeader

export type TransactionListPage = Page<TransactionListItem>

export type MultisigTransactionRequest = {
  to: string
  value: string
  data?: string
  nonce: string
  operation: Operation
  safeTxGas: string
  baseGas: string
  gasPrice: string
  gasToken: string
  refundReceiver?: string
  safeTxHash: string
  sender: string
  signature?: string
  origin?: string
}

/* Transaction details types */
export type SafeAppInfo = {
  name: string
  url: string
  logoUri: string
}

export type TransactionData = {
  hexData?: string
  dataDecoded?: DataDecoded
  to: AddressEx
  value?: string
  operation: Operation
  addressInfoIndex?: { [key: string]: AddressEx }
  trustedDelegateCallTarget: boolean
}

export type ModuleExecutionDetails = {
  type: DetailedExecutionInfoType.MODULE
  address: AddressEx
}

export type MultisigConfirmation = {
  signer: AddressEx
  signature?: string
  submittedAt: number
}

export type MultisigExecutionDetails = {
  type: DetailedExecutionInfoType.MULTISIG
  submittedAt: number
  nonce: number
  safeTxGas: string
  baseGas: string
  gasPrice: string
  gasToken: string
  refundReceiver: AddressEx
  safeTxHash: string
  executor?: AddressEx
  signers: AddressEx[]
  confirmationsRequired: number
  confirmations: MultisigConfirmation[]
  rejectors?: AddressEx[]
  gasTokenInfo?: TokenInfo
  trusted: boolean
}

export type DetailedExecutionInfo = ModuleExecutionDetails | MultisigExecutionDetails

export type TransactionDetails = {
  safeAddress: string
  txId: string
  executedAt?: number
  txStatus: TransactionStatus
  txInfo: TransactionInfo
  txData?: TransactionData
  detailedExecutionInfo?: DetailedExecutionInfo
  txHash?: string
  safeAppInfo?: SafeAppInfo
}

/* Transaction details types end */

/* Transaction estimation types */

export type SafeTransactionEstimationRequest = {
  to: string
  value: string
  data: string
  operation: Operation
}

// CGW v2 response
export type SafeTransactionEstimation = {
  currentNonce: number
  recommendedNonce: number
  safeTxGas: string
}

export type NoncesResponse = {
  currentNonce: number
  recommendedNonce: number
}

/* Transaction estimation types end */

export type SafeIncomingTransfersResponse = Page<IncomingTransfer>

export type SafeModuleTransactionsResponse = Page<ModuleTransaction>

export type SafeMultisigTransactionsResponse = Page<MultisigTransaction>
