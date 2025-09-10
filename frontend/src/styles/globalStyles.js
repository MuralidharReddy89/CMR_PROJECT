import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Inter, Roboto, Helvetica, Arial, sans-serif; background: #f5f7fb; color: #222; }
  a { color: inherit; text-decoration: none; }
  button { cursor: pointer; }
`;
