import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { HiOutlineUsers } from 'react-icons/hi2';
import { RxDashboard } from 'react-icons/rx';
import { PiMoney } from 'react-icons/pi';
import { RiNurseLine, RiSurgicalMaskLine } from 'react-icons/ri';
import { AiOutlineMedicineBox, AiOutlineSetting } from 'react-icons/ai';
import { TbReportMedical, TbReportMoney } from 'react-icons/tb';
import {
	MdOutlineSpaceDashboard,
	MdOutlineMedicalInformation,
} from 'react-icons/md';

const NavList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

const SubTitle = styled.span`
	font-size: 1.5rem;
	color: var(--color-grey-400);
`;

// Using styled components with a third party library
const StyledNavLink = styled(NavLink)`
	&:link,
	&:visited {
		display: flex;
		align-items: center;
		gap: 1.2rem;

		color: var(--color-grey-600);
		font-size: 1.6rem;
		font-weight: 500;
		padding: 1.2rem 2.4rem;
		transition: all 0.3s;
	}

	/* This works because react-router places the active class on the active NavLink */
	&:hover,
	&:active,
	&.active:link,
	&.active:visited {
		color: var(--color-grey-800);
		background-color: var(--color-grey-50);
		border-radius: var(--border-radius-sm);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}

	&:hover svg,
	&:active svg,
	&.active:link svg,
	&.active:visited svg {
		color: var(--color-brand-600);
	}
`;

function MainNav() {
	return (
		<nav>
			<NavList>
				<li>
					<StyledNavLink to='/dashboard'>
						<RxDashboard />
						<span>Dashboard</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/users'>
						<HiOutlineUsers />
						<span>Users</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/employees'>
						<RiNurseLine />
						<span>Employees</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/doctors'>
						<AiOutlineMedicineBox />
						<span>Doctors</span>
					</StyledNavLink>
				</li>
				<li>
					<SubTitle>Incomes</SubTitle>

					<ul>
						<li>
							<StyledNavLink to='/appointments'>
								<TbReportMedical />
								<span>Appointments</span>
							</StyledNavLink>
						</li>
						<li>
							<StyledNavLink to='/surgeries'>
								<RiSurgicalMaskLine />
								<span>Surgeries</span>
							</StyledNavLink>
						</li>
					</ul>
				</li>
				<li>
					<SubTitle>Expenses</SubTitle>

					<ul>
						<li>
							<StyledNavLink to='/expenses'>
								<TbReportMoney />
								<span>Expenses</span>
							</StyledNavLink>
						</li>
						<li>
							<StyledNavLink to='/payments'>
								<PiMoney />
								<span>Pay employees</span>
							</StyledNavLink>
						</li>
					</ul>
				</li>
				<li>
					<SubTitle>Settings</SubTitle>

					<ul>
						<li>
							<StyledNavLink to='/categories'>
								<MdOutlineSpaceDashboard />
								<span>Expenses category</span>
							</StyledNavLink>
						</li>
						<li>
							<StyledNavLink to='/specialties'>
								<MdOutlineMedicalInformation />
								<span>Specialties</span>
							</StyledNavLink>
						</li>
						<li>
							<StyledNavLink to='/settings'>
								<AiOutlineSetting />
								<span>General</span>
							</StyledNavLink>
						</li>
					</ul>
				</li>
			</NavList>
		</nav>
	);
}

export default MainNav;

/*
NOTE: NavLink does not couse re render between pages

*/
