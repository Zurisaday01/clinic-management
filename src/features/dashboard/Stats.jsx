/* eslint-disable react/prop-types */
import Stat from './Stat';

import { FaMoneyBill, FaUserNurse, FaUserMd } from 'react-icons/fa';
import { BiSolidCategory } from 'react-icons/bi';
import { formatCurrency } from '../../utils/helpers';

function Stats({
	doctors,
	employees,
	specialties,
	expenses,
	payments,
	appointments,
	surgeries,
}) {
	const totalExpensesAmount = expenses.reduce(
		(acc, expense) => acc + +expense.amount,
		0
	);

	const totalPaymentsAmount = payments.reduce(
		(acc, payment) => acc + +payment.amount,
		0
	);

	const totalAppointmentsAmount = appointments.reduce(
		(acc, appointment) => acc + +appointment.amount,
		0
	);
	const totalSurgeriesAmount = surgeries.reduce(
		(acc, surgery) => acc + +surgery.amount,
		0
	);

	return (
		<>
			<Stat
				icon={<FaUserMd />}
				title='Doctors'
				value={doctors.length}
				color='blue'
			/>
			<Stat
				icon={<FaUserNurse />}
				title='Employees'
				value={employees.length}
				color='yellow'
			/>
			<Stat
				icon={<BiSolidCategory />}
				title='Specialties'
				value={specialties.length}
				color='indigo'
			/>

			<Stat
				icon={<FaMoneyBill />}
				title='Incomes'
				value={formatCurrency(totalAppointmentsAmount + totalSurgeriesAmount)}
				color='green'
			/>
			<Stat
				icon={<FaMoneyBill />}
				title='Expenses'
				value={formatCurrency(totalExpensesAmount + totalPaymentsAmount)}
				color='red'
			/>
		</>
	);
}

export default Stats;
