import { useState, useRef, SyntheticEvent } from 'react'
import { dispatchContractEvent, fetchOpenContracts } from '../services'
import useDebounce from '../hooks/useDebounce'
import { DispatchContractEventError, Contract, Event } from '../interfaces'

const EVENTS = {
	create: 'ContractCreatedEvent',
	terminate: 'ContractTerminatedEvent',
}

const EMPTY_EVENT = {
	name: '',
	contractId: '',
	premium: 0,
	startDate: '',
	terminationDate: '',
}

const ContractEvent = ({ update }: { update: () => void }) => {
	const [event, setEvent] = useState<Event>(EMPTY_EVENT)

	const [contractIdActive, setContractIdActive] = useState(false)
	const [premiumActive, setPremiumActive] = useState(false)
	const [dateActive, setDateActive] = useState(false)
	const [searchResults, setSearchResults] = useState<Contract[]>([])
	const [errors, setErrors] = useState<DispatchContractEventError>({})
	const submitBtnRef = useRef<HTMLButtonElement>(null)

	// Fires 700ms after ID-typing has stopped
	// Search for possible contracts to dispatch
	// Not performed if name is ContractCreatedEvent or nothing is typed
	useDebounce(
		async () => {
			if (event.name === EVENTS.create || event.contractId.length === 0)
				return setSearchResults([])
			try {
				setSearchResults((await fetchOpenContracts(event.contractId)).data)
			} catch (err) {
				console.log(err)
			}
		},
		700,
		[event.contractId, event.name]
	)

	// Handle input changes
	const handleChange = ({ target }: any) => {
		setEvent(prevEvent => ({ ...prevEvent, [target.name]: target.value }))
	}

	// Send event-data through service-function dispatchContractEvent
	// Update contracts list if successfull dispatch
	// Get errors from client or server
	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault()

		try {
			await dispatchContractEvent(event)
			setErrors({})
			setEvent(EMPTY_EVENT)
			submitBtnRef.current?.classList.toggle('bounce')
			setTimeout(() => submitBtnRef.current?.classList.remove('bounce'), 200)
			update()
		} catch (err: any) {
			if (err?.response?.data?.error) {
				setErrors({ ...err?.response?.data?.error })
			}
		}
	}

	return (
		<form onSubmit={handleSubmit} className='contractEvent'>
			<p className='title'>Dispatch a contract event</p>
			<div className='eventData'>
				<div>
					<button
						type='button'
						className={event.name === EVENTS.create ? 'active' : ''}
						onClick={() => {
							setEvent(prevEvent => ({
								...prevEvent,
								name: prevEvent.name === EVENTS.create ? '' : EVENTS.create,
							}))
						}}
					>
						Create
					</button>
					<button
						type='button'
						className={event.name === EVENTS.terminate ? 'active' : ''}
						onClick={() => {
							setEvent(prevEvent => ({
								...prevEvent,
								name:
									prevEvent.name === EVENTS.terminate ? '' : EVENTS.terminate,
							}))
						}}
					>
						Terminate
					</button>
				</div>
				{event.name && (
					<>
						<div>
							<div className='idInput'>
								<p
									className={
										contractIdActive || event.contractId
											? 'label active'
											: 'label'
									}
								>
									Contract ID
								</p>

								<input
									type='text'
									autoComplete='off'
									spellCheck='false'
									name='contractId'
									value={event.contractId}
									onChange={handleChange}
									onFocus={() => {
										setContractIdActive(true)
									}}
									onBlur={() => {
										setTimeout(() => {
											setContractIdActive(false)
										}, 100)
									}}
								/>
								{searchResults.length > 0 && contractIdActive && (
									<div className='searchResultsWrapper'>
										<ul className='searchResults'>
											<li>
												<p>ID</p>
												<p>Premium</p>
												<p>From</p>
											</li>
											{searchResults.map(item => (
												<li
													key={item.contractId}
													onClick={() => {
														setEvent(prevEvent => ({
															...prevEvent,
															contractId: item.contractId,
														}))
													}}
												>
													<p>{item.contractId}</p>
													<p>{item.premium.toLocaleString()} kr</p>
													<p>{item.startDate}</p>
												</li>
											))}
										</ul>
									</div>
								)}
								{errors.contractId && (
									<p className='error'>{errors.contractId}</p>
								)}
							</div>
							{event.name === EVENTS.create && (
								<div>
									<p
										className={
											dateActive || event.startDate ? 'label active' : 'label'
										}
									>
										Start date
									</p>
									<input
										type='date'
										value={event.startDate}
										autoComplete='off'
										className={!(dateActive || event.startDate) ? 'hidden' : ''}
										name='startDate'
										onChange={handleChange}
										onFocus={() => setDateActive(true)}
										onBlur={() => setDateActive(false)}
									/>
									{errors.date && <p className='error'>{errors.date}</p>}
								</div>
							)}
							{event.name === EVENTS.terminate && (
								<div>
									<p
										className={
											dateActive || event.terminationDate
												? 'label active'
												: 'label'
										}
									>
										End date
									</p>
									<input
										type='date'
										value={event.terminationDate}
										autoComplete='off'
										className={
											!(dateActive || event.terminationDate) ? 'hidden' : ''
										}
										name='terminationDate'
										onChange={handleChange}
										onFocus={() => setDateActive(true)}
										onBlur={() => setDateActive(false)}
									/>
									{errors.date && <p className='error'>{errors.date}</p>}
								</div>
							)}
						</div>
						<div>
							<div>
								{event.name === EVENTS.create && (
									<>
										<p
											className={
												premiumActive || !isNaN(event.premium as number)
													? 'label active'
													: 'label'
											}
										>
											Premium
										</p>
										<input
											type='number'
											spellCheck='false'
											value={event.premium}
											name='premium'
											autoComplete='off'
											onChange={handleChange}
											onFocus={() => setPremiumActive(true)}
											onBlur={() => setPremiumActive(false)}
										/>
										{errors.premium && (
											<p className='error'>{errors.premium}</p>
										)}
									</>
								)}
							</div>
							<button ref={submitBtnRef} type='submit'>
								Submit
							</button>
						</div>
					</>
				)}
			</div>
		</form>
	)
}

export default ContractEvent
