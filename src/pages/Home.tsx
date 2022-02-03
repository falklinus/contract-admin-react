import { useState, useEffect } from 'react'
import { fetchContracts } from '../services'

import { Contract } from '../interfaces'

import Contracts from '../components/Contracts'
import PageButtons from '../components/PageButtons'
import ContractEvent from '../components/ContractEvent'

const Home = () => {
	const [contracts, setContracts] = useState<Contract[]>([])
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [sort, setSort] = useState('contractId')

	const update = () => {
		fetchContracts({ page, limit: 10, sort })
			.then(res => {
				setContracts(res.data)
				setTotalPages(res.paging.total)
			})
			.catch(err => console.error(err))
	}

	useEffect(() => {
		fetchContracts({ page, limit: 10, sort })
			.then(res => {
				setContracts(res.data)
				setTotalPages(res.paging.total)
			})
			.catch(err => console.error(err))
	}, [page, sort])
	return (
		<div className='home'>
			<ContractEvent update={update} />
			<Contracts setSort={setSort} contracts={contracts} />
			<PageButtons current={page} total={totalPages} setPage={setPage} />
		</div>
	)
}

export default Home
