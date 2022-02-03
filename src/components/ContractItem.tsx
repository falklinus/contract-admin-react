import { Contract } from '../interfaces'

const ContractItem = ({ contract }: { contract: Contract }) => {
	return (
		<li className='contractItem'>
			<p>{contract.contractId}</p>
			<p>{contract.premium.toLocaleString()} kr</p>
			<p>{contract.startDate}</p>
			<p>{contract.terminationDate}</p>
		</li>
	)
}

export default ContractItem
