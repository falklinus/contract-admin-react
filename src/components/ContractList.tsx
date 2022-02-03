import { Contract } from '../interfaces'
import ContractItem from './ContractItem'

const ContractList = ({ contracts }: { contracts: Contract[] }) => {
	return (
		<ul className='contractList'>
			{contracts.map(contract => (
				<ContractItem key={contract.contractId} contract={contract} />
			))}
		</ul>
	)
}

export default ContractList
