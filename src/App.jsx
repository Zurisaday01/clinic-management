import GlobalStyles from './styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

import Employees from './pages/Employees';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Surgeries from './pages/Surgeries';
import Expenses from './pages/Expenses';
import Payments from './pages/Payments';
import Categories from './pages/Categories';
import Specialties from './pages/Specialties';
import Settings from './pages/Settings';
import Users from './pages/Users';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './ui/AppLayout';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './ui/ProtectedRoute';
import { DarkModeProvider } from './context/DarkModeContext';

// Used to interact with a cache:
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
		},
	},
});

function App() {
	return (
		<DarkModeProvider>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<GlobalStyles />
				<BrowserRouter>
					<Routes>
						<Route
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}>
							<Route index element={<Navigate replace to='dashboard' />} />
							<Route path='dashboard' element={<Dashboard />} />
							<Route path='users' element={<Users />} />
							<Route path='employees' element={<Employees />} />
							<Route path='doctors' element={<Doctors />} />
							<Route path='appointments' element={<Appointments />} />
							<Route path='surgeries' element={<Surgeries />} />
							<Route path='expenses' element={<Expenses />} />
							<Route path='payments' element={<Payments />} />
							<Route path='categories' element={<Categories />} />
							<Route path='specialties' element={<Specialties />} />
							<Route path='settings' element={<Settings />} />
							<Route path='account' element={<Account />} />
						</Route>
						<Route path='login' element={<Login />} />
						<Route path='*' element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
				<Toaster
					position='top-center'
					gutter={12}
					containerStyle={{ margin: '8px' }}
					toastOptions={{
						// Default options
						success: {
							duration: 3000,
						},
						error: {
							duration: 5000,
						},
						style: {
							fontSize: '16px',
							maxWidth: '500px',
							padding: '16px 34px',
							backgroundColor: 'var(--color-grey-0',
							color: 'var(--color-grey-700',
						},
					}}></Toaster>
			</QueryClientProvider>
		</DarkModeProvider>
	);
}

export default App;

/*
NOTE: index

place it on the page you want to see as soon as you open the app

*/

/*
NOTE: 

<Route index element={<Dashboard />} />
<Route path='dashboard' element={<Dashboard />} />
||
declarative aproach
||
<Route index element={<Navigate replace to='dashboard' />} />
<Route path='dashboard' element={<Dashboard />} />



*/

/*
NOTE:

 ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}


const Heading = styled.h1`

`
h1 => h3

<Heading as="h3">Title</Heading/>

*/
