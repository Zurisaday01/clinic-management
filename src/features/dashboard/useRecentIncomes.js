import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { subDays } from 'date-fns';
import { getAppointmentsAfterDate } from '../../services/apiAppointment';
import { getSurgeriesAfterDate } from '../../services/apiSurgeries';

export function useRecentIncomes() {
	const [searchParams] = useSearchParams();

	const numDays = !searchParams.get('last')
		? 7
		: Number(searchParams.get('last'));

	// Subtract the specified number of days from the given date.
	const queryDate = subDays(new Date(), numDays).toISOString();

	const { isLoading, data: incomes } = useQuery({
		queryFn: async () => {
            const dataAppointments = await getAppointmentsAfterDate(queryDate)
            const dataSurgeries = await getSurgeriesAfterDate(queryDate)

            return {appointments: dataAppointments, surgeries: dataSurgeries}
        },
		queryKey: ['incomes', `last-${numDays}`],
	});


	return { isLoading, incomes, numDays };
}
