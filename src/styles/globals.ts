import { colors, typography, spacing, breakpoints, borderRadius } from './tokens';

const cssReset = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${typography.sansSerif};
    background-color: ${colors.bg};
    color: ${colors.text};
    line-height: ${typography.normal};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code, pre {
    font-family: ${typography.mono};
  }

  a {
    color: ${colors.accent};
    text-decoration: none;
    transition: color 150ms ease;
  }

  a:hover {
    color: ${colors.accentBlue};
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    transition: all 150ms ease;
  }

  input, textarea, select {
    font-family: inherit;
    color: inherit;
    background-color: ${colors.bgCard};
    border: 1px solid ${colors.border};
    padding: ${spacing['2']} ${spacing['3']};
    border-radius: ${borderRadius.base};
  }

  input:focus, textarea:focus, select:focus {
    outline: 2px solid rgba(234, 179, 8, 0.35);
    outline-offset: 1px;
    border-color: ${colors.accent};
  }
`;

export default cssReset;
