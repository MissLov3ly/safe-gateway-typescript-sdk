import type {
  FiatCurrencies,
  OwnedSafes,
  SafeBalanceResponse,
  SafeCollectibleResponse,
  SafeCollectiblesPage,
} from './common'
import type {
  MultisigTransactionRequest,
  TransactionDetails,
  SafeTransactionEstimation,
  SafeTransactionEstimationRequest,
  TransactionListPage,
  SafeIncomingTransfersResponse,
  SafeModuleTransactionsResponse,
  SafeMultisigTransactionsResponse,
  NoncesResponse,
} from './transactions'
import type { SafeInfo } from './safe-info'
import type { ChainListResponse, ChainInfo } from './chains'
import type { SafeAppsResponse } from './safe-apps'
import type { DecodedDataRequest, DecodedDataResponse } from './decoded-data'
import type { MasterCopyReponse } from './master-copies'
import type {
  ConfirmSafeMessageRequest,
  ProposeSafeMessageRequest,
  SafeMessage,
  SafeMessageListPage,
} from './safe-messages'
import type { DelegateResponse, DelegatesRequest } from './delegates'
import type { RegisterNotificationsRequest } from './notifications'

export type Primitive = string | number | boolean | null

interface Params {
  path?: { [key: string]: Primitive }
}

interface GetParams extends Params {
  query?: { [key: string]: Primitive }
}

interface PostParams extends GetParams {
  body: string | Record<string, unknown>
}

interface Responses {
  200: { schema: unknown }
  [key: number]: { schema: unknown } | unknown
}

interface Endpoint {
  parameters: {
    path: Record<string, Primitive>
  } | null
}

export interface GetEndpoint extends Endpoint {
  get: {
    parameters: GetParams | null
    responses: Responses
  }
}

export interface PostEndpoint extends Endpoint {
  post: {
    parameters: PostParams | null
    responses: Responses
  }
}

export interface DeleteEndpoint extends Endpoint {
  delete: {
    parameters: Params | null
    responses: Responses
  }
}

interface PathRegistry {
  [key: string]: GetEndpoint | PostEndpoint | (GetEndpoint & PostEndpoint) | DeleteEndpoint
}

export interface paths extends PathRegistry {
  '/v1/chains/{chainId}/safes/{address}': {
    /** Get status of the safe */
    get: operations['safes_read']
    parameters: {
      path: {
        chainId: string
        address: string
      }
    }
  }
  '/v1/chains/{chainId}/safes/{address}/balances/{currency}': {
    get: operations['safes_balances_list']
    parameters: {
      path: {
        chainId: string
        address: string
        currency: string
      }
    }
  }
  '/v1/chains/{chainId}/safes/{address}/incoming-transfers/': {
    get: operations['incoming_transfers']
    parameters: {
      path: {
        chainId: string
        address: string
        currency: string
      }
    }
  }
  '/v1/chains/{chainId}/safes/{address}/module-transactions/': {
    get: operations['module_transactions']
    parameters: {
      path: {
        chainId: string
        address: string
        currency: string
      }
    }
  }
  '/v1/chains/{chainId}/safes/{address}/multisig-transactions/': {
    get: operations['multisig_transactions']
    parameters: {
      path: {
        chainId: string
        address: string
        currency: string
      }
    }
  }
  '/v1/balances/supported-fiat-codes': {
    get: operations['get_supported_fiat']
    parameters: null
  }
  '/v1/chains/{chainId}/safes/{address}/collectibles': {
    /** Get collectibles (ERC721 tokens) and information about them */
    get: operations['safes_collectibles_list']
    parameters: {
      path: {
        chainId: string
        address: string
      }
    }
  }
  '/v2/chains/{chainId}/safes/{address}/collectibles': {
    /** Get collectibles (ERC721 tokens) and information about them */
    get: operations['safes_collectibles_list_paginated']
    parameters: {
      path: {
        chainId: string
        address: string
      }
    }
  }
  '/v1/chains/{chainId}/safes/{safe_address}/transactions/history': {
    get: operations['history_transactions']
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
    }
  }
  '/v1/chains/{chainId}/safes/{safe_address}/transactions/queued': {
    get: operations['queued_transactions']
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
    }
  }
  '/v1/chains/{chainId}/transactions/{transactionId}': {
    get: operations['get_transactions']
    parameters: {
      path: {
        chainId: string
        transactionId: string
      }
    }
  }
  '/v2/chains/{chainId}/safes/{safe_address}/multisig-transactions/estimations': {
    post: operations['post_safe_gas_estimation']
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
    }
  }
  '/v1/chains/{chainId}/transactions/{safe_address}/propose': {
    post: operations['propose_transaction']
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
    }
  }
  '/v1/chains/{chainId}/owners/{address}/safes': {
    get: operations['get_owned_safes']
    parameters: {
      path: {
        chainId: string
        address: string
      }
    }
  }
  '/v1/chains': {
    get: operations['chains_list']
    parameters: null
  }
  '/v1/chains/{chainId}': {
    get: operations['chains_read']
    parameters: {
      path: {
        chainId: string
      }
    }
  }
  '/v1/chains/{chainId}/safe-apps': {
    get: operations['safe_apps_read']
    parameters: {
      path: {
        chainId: string
      }
    }
  }
  '/v1/chains/{chainId}/about/master-copies': {
    get: operations['master_copies']
    parameters: {
      path: {
        chainId: string
      }
    }
  }
  '/v1/chains/{chainId}/data-decoder': {
    post: operations['data_decoder']
    parameters: {
      path: {
        chainId: string
      }
    }
  }
  '/v1/chains/{chainId}/safes/{safe_address}/messages': {
    get: operations['get_safe_messages']
    post: operations['propose_safe_message']
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
    }
  }
  '/v1/chains/{chainId}/messages/{message_hash}': {
    get: operations['get_safe_message']
    parameters: {
      path: {
        chainId: string
        message_hash: string
      }
    }
  }
  '/v1/chains/{chainId}/messages/{message_hash}/signatures': {
    post: operations['confirm_safe_message']
    parameters: {
      path: {
        chainId: string
        message_hash: string
      }
    }
  }
  '/v1/chains/{chainId}/delegates': {
    get: operations['get_delegates']
    parameters: {
      path: {
        chainId: string
      }
      query: DelegatesRequest
    }
  }
  '/v1/register/notifications': {
    post: operations['register_device']
    parameters: null
  }
  '/v1/chains/{chainId}/notifications/devices/{uuid}/safes/{safe_address}': {
    delete: operations['unregister_safe']
    parameters: {
      path: {
        uuid: string
        chainId: string
        safe_address: string
      }
    }
  }
  '/v1/chains/{chainId}/notifications/devices/{uuid}': {
    delete: operations['unregister_device']
    parameters: {
      path: {
        uuid: string
        chainId: string
      }
    }
  }
  '/v1/chains/{chainId}/safes/{safe_address}/nonces': {
    get: operations['get_nonces']
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
    }
  }
}

export interface operations {
  /** Get status of the safe */
  safes_read: {
    parameters: {
      path: {
        chainId: string
        address: string
      }
    }
    responses: {
      200: {
        schema: SafeInfo
      }
      /** Safe not found */
      404: unknown
      /**
       * code = 1: Checksum address validation failed
       * code = 50: Cannot get Safe info
       */
      422: unknown
    }
  }
  /** Get balance for Ether and ERC20 tokens with USD fiat conversion */
  safes_balances_list: {
    parameters: {
      path: {
        chainId: string
        address: string
        currency: string
      }
      query: {
        /** If `True` just trusted tokens will be returned */
        trusted?: boolean
        /** If `True` spam tokens will not be returned */
        exclude_spam?: boolean
      }
    }
    responses: {
      200: {
        schema: SafeBalanceResponse
      }
      /** Safe not found */
      404: unknown
      /** Safe address checksum not valid */
      422: unknown
    }
  }
  /** Get filterable incoming transfers */
  incoming_transfers: {
    parameters: {
      path: {
        chainId: string
        address: string
      }
      query?: {
        execution_date__gte?: string
        execution_date__lte?: string
        to?: string
        token_address?: string
        value?: string
      }
    }
    responses: {
      200: {
        schema: SafeIncomingTransfersResponse
      }
      /** Safe not found */
      404: unknown
      /** Safe address checksum not valid */
      422: unknown
    }
  }
  /** Get filterable module transactions */
  module_transactions: {
    parameters: {
      path: {
        chainId: string
        address: string
      }
      query?: {
        module?: string
        to?: string
      }
    }
    responses: {
      200: {
        schema: SafeModuleTransactionsResponse
      }
      /** Safe not found */
      404: unknown
      /** Safe address checksum not valid */
      422: unknown
    }
  }
  /** Get filterable multisig transactions */
  multisig_transactions: {
    parameters: {
      path: {
        chainId: string
        address: string
      }
      query?: {
        execution_date__gte?: string
        execution_date__lte?: string
        to?: string
        value?: string
        nonce?: string
        executed?: string
      }
    }
    responses: {
      200: {
        schema: SafeMultisigTransactionsResponse
      }
      /** Safe not found */
      404: unknown
      /** Safe address checksum not valid */
      422: unknown
    }
  }
  get_supported_fiat: {
    parameters: null
    responses: {
      200: {
        schema: FiatCurrencies
      }
    }
  }
  /** Get collectibles (ERC721 tokens) and information about them */
  safes_collectibles_list: {
    parameters: {
      path: {
        chainId: string
        address: string
      }
      query: {
        /** If `True` just trusted tokens will be returned */
        trusted?: boolean
        /** If `True` spam tokens will not be returned */
        exclude_spam?: boolean
      }
    }
    responses: {
      200: {
        schema: SafeCollectibleResponse[]
      }
      /** Safe not found */
      404: unknown
      /** Safe address checksum not valid */
      422: unknown
    }
  }
  safes_collectibles_list_paginated: {
    parameters: {
      path: {
        chainId: string
        address: string
      }
      query: {
        /** If `True` just trusted tokens will be returned */
        trusted?: boolean
        /** If `True` spam tokens will not be returned */
        exclude_spam?: boolean
      }
    }
    responses: {
      200: {
        schema: SafeCollectiblesPage
      }
      /** Safe not found */
      404: unknown
      /** Safe address checksum not valid */
      422: unknown
    }
  }
  history_transactions: {
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
      query: {
        /** Taken from the Page['next'] or Page['previous'] */
        page_url?: string
      }
    }
    responses: {
      200: {
        schema: TransactionListPage
      }
    }
  }
  queued_transactions: {
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
      query: {
        /** Taken from the Page['next'] or Page['previous'] */
        page_url?: string
        trusted?: boolean
      }
    }
    responses: {
      200: {
        schema: TransactionListPage
      }
    }
  }
  get_transactions: {
    parameters: {
      path: {
        chainId: string
        transactionId: string
      }
    }
    responses: {
      200: {
        schema: TransactionDetails
      }
    }
  }
  post_safe_gas_estimation: {
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
      body: SafeTransactionEstimationRequest
    }
    responses: {
      200: {
        schema: SafeTransactionEstimation
      }
      /** Safe not found */
      404: unknown
      /** Safe address checksum not valid */
      422: unknown
    }
  }
  propose_transaction: {
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
      body: MultisigTransactionRequest
    }
    responses: {
      200: {
        schema: TransactionDetails
      }
      /** Safe not found */
      404: unknown
      /** Safe address checksum not valid */
      422: unknown
    }
  }
  get_owned_safes: {
    parameters: {
      path: {
        chainId: string
        address: string
      }
    }
    responses: {
      200: {
        schema: OwnedSafes
      }
    }
  }
  chains_list: {
    parameters: {
      query?: {
        /** Which field to use when ordering the results. */
        ordering?: string
        /** Number of results to return per page. */
        limit?: number
        /** The initial index from which to return the results. */
        offset?: number
      }
    }
    responses: {
      200: {
        schema: ChainListResponse
      }
    }
  }
  chains_read: {
    parameters: {
      path: {
        /** A unique value identifying this chain. */
        chainId: string
      }
    }
    responses: {
      200: {
        schema: ChainInfo
      }
    }
  }
  safe_apps_read: {
    parameters: {
      path: {
        /** A unique value identifying this chain. */
        chainId: string
      }
      query?: {
        client_url?: string
        url?: string
      }
    }
    responses: {
      200: {
        schema: SafeAppsResponse
      }
    }
  }
  master_copies: {
    parameters: {
      path: {
        /** A unique value identifying this chain. */
        chainId: string
      }
    }
    responses: {
      200: {
        schema: MasterCopyReponse
      }
    }
  }
  data_decoder: {
    parameters: {
      path: {
        /** A unique value identifying this chain. */
        chainId: string
      }
      body: DecodedDataRequest
    }
    responses: {
      200: {
        schema: DecodedDataResponse
      }
    }
  }
  get_safe_messages: {
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
      query: {
        /** Taken from the Page['next'] or Page['previous'] */
        page_url?: string
      }
    }
    responses: {
      200: {
        schema: SafeMessageListPage
      }
    }
  }
  get_safe_message: {
    parameters: {
      path: {
        chainId: string
        message_hash: string
      }
    }
    responses: {
      200: {
        schema: SafeMessage
      }
    }
  }
  propose_safe_message: {
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
      body: ProposeSafeMessageRequest
    }
    responses: {
      200: {
        schema: void
      }
    }
  }
  confirm_safe_message: {
    parameters: {
      path: {
        chainId: string
        message_hash: string
      }
      body: ConfirmSafeMessageRequest
    }
    responses: {
      200: {
        schema: void
      }
    }
  }
  get_delegates: {
    parameters: {
      path: {
        chainId: string
      }
      query: DelegatesRequest
    }
    responses: {
      200: {
        schema: DelegateResponse
      }
    }
  }
  register_device: {
    parameters: {
      body: RegisterNotificationsRequest
    }
    responses: {
      200: {
        schema: void
      }
    }
  }
  unregister_safe: {
    parameters: {
      path: {
        uuid: string
        chainId: string
        safe_address: string
      }
    }
    responses: {
      200: {
        schema: void
      }
    }
  }
  unregister_device: {
    parameters: {
      path: {
        uuid: string
        chainId: string
      }
    }
    responses: {
      200: {
        schema: void
      }
    }
  }
  get_nonces: {
    parameters: {
      path: {
        chainId: string
        safe_address: string
      }
    }
    responses: {
      200: {
        schema: NoncesResponse
      }
    }
  }
}
