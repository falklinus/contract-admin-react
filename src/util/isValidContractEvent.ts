import { Event, ErrorMsg } from '../interfaces'

export const isValidContractEvent = (event: Event) => {
	console.log(event)
	let errorMsg: ErrorMsg = {}
	const { contractId, name, premium, startDate, terminationDate } = event
	console.log('hej', premium)
	// contractId
	if (!contractId) errorMsg.contractId = 'Required'

	// name
	if (['ContractCreatedEvent', 'ContractTerminatedEvent'].indexOf(name) === -1)
		errorMsg.name = 'Not a valid event name'

	// ContractCreatedEvent
	console.log(name)
	if (name === 'ContractCreatedEvent') {
		// premium
		console.log(premium)
		if (premium === 0) {
		} else if (premium && premium < 0) errorMsg.premium = 'Not valid'
		else if (!premium) errorMsg.premium = 'Required'

		// startDate
		if (!startDate) errorMsg.date = 'Required'
		else if (!isValidDate(startDate)) errorMsg.date = 'Not valid'
	}

	// ContractTerminatedEvent
	if (name === 'ContractTerminatedEvent') {
		// terminationDate
		if (!terminationDate) errorMsg.date = 'Required'
		else if (!isValidDate(terminationDate)) errorMsg.date = 'Not valid'
	}

	if (!(Object.keys(errorMsg).length === 0)) {
		return [false, errorMsg]
	}
	return [true, null]
}

const isValidDate = (dateString: string): boolean => {
	const regEx = /^\d{4}-\d{2}-\d{2}$/
	if (!String(dateString).match(regEx)) return false // Invalid format
	const d = new Date(dateString)
	const dNum = d.getTime()
	if (!dNum && dNum !== 0) return false // NaN value, Invalid date
	return d.toISOString().slice(0, 10) === dateString
}
