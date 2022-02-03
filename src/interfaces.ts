export interface Contract {
	_id: string
	contractId: string
	premium: number
	startDate: string
	terminationDate?: string
}

export interface FectContractsParams {
	page: number
	limit: number
	sort?: string
}

export interface SearchResultItem {
	contractId: string
}

export interface Event {
	name: string
	contractId: string
	premium?: number
	startDate?: string
	terminationDate?: string
}

export interface DispatchContractEventError {
	name?: string
	contractId?: string
	premium?: string
	date?: string
}

export interface ErrorMsg {
	name?: string
	contractId?: string
	premium?: string
	date?: string
}
