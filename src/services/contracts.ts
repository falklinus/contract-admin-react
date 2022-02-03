import Api from './api'
import { FectContractsParams } from '../interfaces'
import { isValidContractEvent } from '../util'

export const fetchContracts = async (params: FectContractsParams) => {
	return (await Api().get('/contract', { params: { ...params } })).data
}

export const fetchOpenContracts = async (id: string) => {
	return (await Api().get('/contract', { params: { id } })).data
}

export const dispatchContractEvent = async (event: any) => {
	const [isValid, error] = isValidContractEvent(event)
	if (!isValid) throw JSON.stringify(error)
	return (await Api().post('/event', event)).data
}
