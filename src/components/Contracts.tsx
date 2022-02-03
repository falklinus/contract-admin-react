import { useState } from 'react'

import ContractList from './ContractList'
import { Contract } from '../interfaces'

const Contracts = ({
	contracts,
	setSort,
}: {
	contracts: Contract[]
	setSort: any
}) => {
	const [idSort, setIdSort] = useState<string>('-')
	const [premiumSort, setPremiumSort] = useState<string>('')
	const [fromSort, setFromSort] = useState<string>('')
	const [toSort, setToSort] = useState<string>('')

	return (
		<div className='contracts'>
			<div className='header'>
				<div className='title'>Contracts</div>
				<div className='headings'>
					<p
						onClick={() => {
							setSort([idSort, 'contractId'].join(''))
							setIdSort(prevIdSort => (prevIdSort === '' ? '-' : ''))
						}}
						data-sort={idSort === '-' ? '👇' : '☝'}
					>
						ID
					</p>
					<p
						onClick={() => {
							setSort([premiumSort, 'premium'].join(''))
							setPremiumSort(prevPremiumSort =>
								prevPremiumSort === '' ? '-' : ''
							)
						}}
						data-sort={premiumSort === '-' ? '👇' : '☝'}
					>
						Premium
					</p>
					<p
						onClick={() => {
							setSort([fromSort, 'startDate'].join(''))
							setFromSort(prevFromSort => (prevFromSort === '' ? '-' : ''))
						}}
						data-sort={fromSort === '-' ? '👇' : '☝'}
					>
						From
					</p>
					<p
						onClick={() => {
							setSort([toSort, 'terminationDate'].join(''))
							setToSort(prevToSort => (prevToSort === '' ? '-' : ''))
						}}
						data-sort={toSort === '-' ? '👇' : '☝'}
					>
						To
					</p>
				</div>
			</div>
			<ContractList contracts={contracts} />
		</div>
	)
}

export default Contracts
