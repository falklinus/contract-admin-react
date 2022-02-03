import { useState, useEffect } from 'react'
import { range } from '../util'
import ChevronLeft from './ChevronLeft'
import ChevronRight from './ChevronRight'

interface Props {
	current: number
	total: number
	setPage: any
}

const PageButtons = ({ current, total, setPage }: Props) => {
	const [pageNumbers, setPageNumbers] = useState<number[]>([])

	useEffect(() => {
		if (total < 9) return setPageNumbers(range(2, total - 1))
		if (current < 6) return setPageNumbers(range(2, 8))
		if (current > total - 6) return setPageNumbers(range(total - 7, total - 1))
		return setPageNumbers(range(current - 3, current + 3))
	}, [current, total])
	return (
		<div className='pageButtons'>
			<button
				style={{ padding: '0.5rem', stroke: '#262626' }}
				onClick={() => current > 1 && setPage(current - 1)}
			>
				<ChevronLeft />
			</button>
			<button
				className={1 === current ? 'active' : ''}
				onClick={() => setPage(1)}
			>
				{1}
			</button>
			{pageNumbers.map(n => (
				<button
					key={n}
					className={n === current ? 'active' : ''}
					onClick={() => setPage(n)}
				>
					{n}
				</button>
			))}
			<button
				className={total === current ? 'active' : ''}
				onClick={() => setPage(total)}
			>
				{total}
			</button>
			<button
				style={{ padding: '0.5rem', stroke: '#262626' }}
				onClick={() => current < total && setPage(current + 1)}
			>
				<ChevronRight />
			</button>
		</div>
	)
}

export default PageButtons
