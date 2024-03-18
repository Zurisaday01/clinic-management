import styled, { css } from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

const StyledLogo = styled.div`
	text-align: center;
	font-size: 3rem;

	color: ${props =>
		props.type === 'dark' &&
		css`
		var(--color-brand-500)
	`};

	color: ${props =>
		props.type === 'light' &&
		css`
		var(--color-brand-400)
	`};
`;

function Logo() {
	const { isDarkMode } = useDarkMode();

	return <StyledLogo type={isDarkMode ? 'dark' : 'light'}>Clinic</StyledLogo>;
}

export default Logo;
