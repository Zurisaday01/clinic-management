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
import { eachDayOfInterval, subDays, format, isSameDay } from 'date-fns';
import Spinner from '../../../../../the-wild-oasis/src/ui/Spinner';
import { formatDate, normalizedDate } from '../../utils/helpers';

const StyledSalesChart = styled(DashboardBox)`
	grid-column: 1 / -1;

	/* Hack to change grid line colors */
	& .recharts-cartesian-grid-horizontal line,
	& .recharts-cartesian-grid-vertical line {
		stroke: var(--color-grey-300);
	}
`;

const IncomesChart = ({ incomes, numDays, isLoadingIncomes }) => {
	const { isDarkMode } = useDarkMode();

	if (isLoadingIncomes) return <Spinner />;

	// create the dates for each result get thanks to the filtered tag
	const allDates = eachDayOfInterval({
		start: subDays(new Date(), numDays - 1),
		end: new Date(),
	});

	// Thu Jun 29 2023 00:00:00 GMT-0600 (Central Standard Time)
	const data = allDates.map(date => {
		return {
			label: formatDate(date),
			totalAppointments: incomes?.appointments
				.filter(appointment =>
					isSameDay(date, normalizedDate(appointment.date))
				)
				.reduce((acc, appointment) => acc + appointment.amount, 0),
			totalSurgeries: incomes?.surgeries
				.filter(sugery => isSameDay(date, normalizedDate(sugery.date)))
				.reduce((acc, sugery) => acc + sugery.amount, 0),
		};
	});

	const colors = isDarkMode
		? {
				totalAppointments: { stroke: '#4f46e5', fill: '#4f46e5' },
				totalSurgeries: { stroke: '#22c55e', fill: '#22c55e' },
				text: '#e5e7eb',
				background: '#18212f',
		  }
		: {
				totalAppointments: { stroke: '#4f46e5', fill: '#c7d2fe' },
				totalSurgeries: { stroke: '#16a34a', fill: '#dcfce7' },
				text: '#374151',
				background: '#fff',
		  };

	return (
		<StyledSalesChart>
			<Heading as='h2'>
				Incomes from {format(allDates.at(0), 'MMM dd yyyy')} &mdash;{' '}
				{format(allDates.at(-1), 'MMM dd yyyy')}
			</Heading>
			<ResponsiveContainer height={300} width='100%'>
				<AreaChart data={data}>
					<XAxis
						dataKey='label'
						tick={{ fill: colors.text }}
						tickLine={{ stroke: colors.text }}
					/>
					<YAxis
						unit='$'
						tick={{ fill: colors.text }}
						tickLine={{ stroke: colors.text }}
					/>
					<CartesianGrid strokeDasharray='4' />
					<Tooltip contentStyle={{ backgroundColor: colors.background }} />
					<Area
						dataKey='totalAppointments'
						type='monotone'
						stroke={colors.totalAppointments.stroke}
						fill={colors.totalAppointments.fill}
						strokeWidth={2}
						name='Appointments'
						unit='$'
					/>
					<Area
						dataKey='totalSurgeries'
						type='monotone'
						stroke={colors.totalSurgeries.stroke}
						fill={colors.totalSurgeries.fill}
						strokeWidth={2}
						name='Surgeries'
						unit='$'
					/>
				</AreaChart>
			</ResponsiveContainer>
		</StyledSalesChart>
	);
};
export default IncomesChart;
