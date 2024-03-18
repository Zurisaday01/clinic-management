import { formatDistance, parseISO, isSameDay } from 'date-fns';
import { differenceInDays } from 'date-fns/esm';

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) => {
  return (formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In'))}

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );


export const sortDateAndAmount = (data, searchParams) => {

  const sortBy = searchParams.get('sortBy') || 'date-desc';

	const [field, direction] = sortBy.split('-');
	const modifier = direction === 'asc' ? 1 : -1;

  let sortedData;
	
  if (sortBy.includes('date')) {
		sortedData = data.sort(
			(a, b) => (new Date(a[field]) - new Date(b[field])) * modifier
		);
	} else {
		sortedData = data.sort((a, b) => (a[field] - b[field]) * modifier);
	}

  return sortedData
}

const padToTwo = (number) => {
	return number > 9 ? number : '0' + number;
};

export const formatDate = (date) => {
	const year = new Date(date).getUTCFullYear();
	const month = new Date(date).getUTCMonth() + 1;
	const day = new Date(date).getUTCDate();

	return `${year}-${padToTwo(month)}-${padToTwo(day)}`;
};

export const normalizedDate = (date) => {
	return new Date(
		new Date(date).getTime() +
			Math.abs(new Date(date).getTimezoneOffset() * 60000)
	);
};


export function sumAmounts(obj, date) {
  let result = {};

  // Initialize all keys with 0
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let totalKey = `Total${key.charAt(0).toUpperCase()}${key.slice(1)}`;
      result[totalKey] = 0;
    }
  }

  // Calculate sums from non-empty arrays
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let arr = obj[key];
      if (arr.length > 0) {
        let totalKey = `Total${key.charAt(0).toUpperCase()}${key.slice(1)}`;
        result[totalKey] = arr
          .filter(expense => isSameDay(date, normalizedDate(expense.date)))
          .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
      }
    }
  }

  return result;
}