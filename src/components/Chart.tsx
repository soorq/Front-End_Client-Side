import { FC} from "react"
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts"

interface IChart {
	totalIn: number
	totalEx: number
}

interface IData {
	value: number
	name: string
}

const COLORS:string[] = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Chart: FC<IChart> = ({totalIn, totalEx}) => {
	const data = new Array<IData>(
		{value: totalEx, name: 'Expense'},
		{value: totalIn, name: 'Expense'},
	)
	return (
		<>
			<PieChart width={310} height={240}>
				<Pie
					data={data}
					cx={"50%"}
					cy={"50%"}
					innerRadius={0}
					outerRadius={80}
					fill='#8884d8'
					paddingAngle={2}
					dataKey='value'
				>
					{data.map(( _, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Legend />
				<Tooltip />
			</PieChart>
		</>
	)
}

export default Chart
