/* eslint-disable react/prop-types */
import styled from 'styled-components';
import DashboardBox from './DashboardBox';
import Heading from '../../ui/Heading';
import { useDarkMode } from '../../context/DarkModeContext';
import {
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	AreaChart,
	ResponsiveContainer,
} from 'recharts';
import { eachDayOfInterval, subDays, format } from 'date-fns';
import Spinner from '../../../../../the-wild-oasis/src/ui/Spinner';
import { formatDate, sumAmounts } from '../../utils/helpers';

const StyledSalesChart = styled(DashboardBox)`
	grid-column: 1 / -1;

	/* Hack to change grid line colors */
	& .recharts-cartesian-grid-horizontal line,
	& .recharts-cartesian-grid-vertical line {
		stroke: var(--color-grey-300);
	}
`;

const ExpensesChart = ({
	expenses,
	numDays,
	categories,
	isLoadingExpenses,
}) => {
	const { isDarkMode } = useDarkMode();

	if (isLoadingExpenses) return <Spinner />;

	// create the dates for each result get thanks to the filtered tag
	const allDates = eachDayOfInterval({
		start: subDays(new Date(), numDays - 1),
		end: new Date(),
	});

	let expensesByCategory = {};
	categories.forEach(category => {
		expensesByCategory[category.name.split(' ').join('')] = [];
	});
	expenses.forEach(expense => {
		expensesByCategory[expense.category.name].push(expense);
	});

	const data = allDates.map(date => {
		const result = sumAmounts(expensesByCategory, date);

		return {
			label: formatDate(date),
			...result,
		};
	});

	// use this to generate the Area Chart
	let arrayExpensesCategories = [];
	for (let key in expensesByCategory) {
		if (expensesByCategory.hasOwnProperty(key)) {
			arrayExpensesCategories.push(
				`Total${key.charAt(0).toUpperCase()}${key.slice(1)}`
			);
		}
	}

	return (
		<StyledSalesChart>
			<Heading as='h2'>
				Expenses from {format(allDates.at(0), 'MMM dd yyyy')} &mdash;{' '}
				{format(allDates.at(-1), 'MMM dd yyyy')}
			</Heading>
			<ResponsiveContainer height={300} width='100%'>
				<AreaChart data={data}>
					<XAxis
						dataKey='label'
						tick={{ fill: isDarkMode ? '#e5e7eb' : '#374151' }}
						tickLine={{ stroke: isDarkMode ? '#e5e7eb' : '#374151' }}
					/>
					<YAxis
						unit='$'
						tick={{ fill: isDarkMode ? '#e5e7eb' : '#374151' }}
						tickLine={{ stroke: isDarkMode ? '#e5e7eb' : '#374151' }}
					/>
					<CartesianGrid strokeDasharray='4' />
					<Tooltip
						contentStyle={{ backgroundColor: isDarkMode ? '#18212f' : '#fff' }}
					/>

					{arrayExpensesCategories.map(categoryName => (
						<Area
							dataKey={categoryName}
							type='monotone'
							stroke='#00A6FF'
							fill='#00A6FF'
							strokeWidth={2}
							name={categoryName.slice(5)}
							unit='$'
						/>
					))}
				</AreaChart>
			</ResponsiveContainer>
		</StyledSalesChart>
	);
};
export default ExpensesChart;
