import styled from 'styled-components';
import { useEmployees } from '../employees/useEmployees';
import { useDoctors } from '../doctors/useDoctors';
import Stats from './Stats';
import Spinner from '../../ui/Spinner';
import { useSpecialties } from '../specialties/useSpecialties';
import { useExpenses } from '../expenses/useExpenses';
import { usePayments } from '../payments/usePayments';
import { useAppointments } from '../appointments/useAppoitments';
import { useSurgeries } from '../surgeries/useSurgeries';
import { useRecentIncomes } from './useRecentIncomes.js';
import IncomesChart from './IncomesChart';
import { useRecentExpenses } from './useRecentExpenses';
import { useCategories } from '../categories/useCategories';
import ExpensesChart from './ExpensesChart';

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 40rem auto;
	gap: 2.4rem;
`;

function DashboardLayout() {
	const { isLoading: isLoadingDoctors, doctors } = useDoctors();
	const { isLoading: isLoadingEmployees, employees } = useEmployees();
	const { isLoading: isLoadingSpecialties, specialties } = useSpecialties();
	const { isLoading: isLoadingExpenses, expenses } = useExpenses();
	const { isLoading: isLoadingPayments, payments } = usePayments();
	const { isLoading: isLoadingAppointments, appointments } = useAppointments();
	const { isLoading: isLoadingSurgeries, surgeries } = useSurgeries();
	const { isLoading: isLoadingCategories, categories } = useCategories();

	const {
		isLoading: isLoadingRecentIncomes,
		incomes,
		numDays,
	} = useRecentIncomes();

	const { isLoading: isLoadingRecentExpenses, expenses: recentExpenses } =
		useRecentExpenses();

	if (
		isLoadingDoctors ||
		isLoadingEmployees ||
		isLoadingSpecialties ||
		isLoadingExpenses ||
		isLoadingPayments ||
		isLoadingAppointments ||
		isLoadingCategories ||
		isLoadingSurgeries ||
		isLoadingRecentIncomes
	)
		return <Spinner />;

	return (
		<StyledDashboardLayout>
			<Stats
				doctors={doctors}
				employees={employees}
				specialties={specialties}
				expenses={expenses}
				payments={payments}
				appointments={appointments}
				surgeries={surgeries}
			/>
			<IncomesChart
				incomes={incomes}
				numDays={numDays}
				isLoadingRecentIncomes={isLoadingRecentIncomes}
			/>
			<ExpensesChart
				expenses={recentExpenses}
				numDays={numDays}
				categories={categories}
				isLoadingRecentExpenses={isLoadingRecentExpenses}
			/>
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;
