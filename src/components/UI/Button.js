import Styled from 'styled-components';

const Button = Styled.button`
  background: #3FD088;
  border: none;
  padding: 0px 21px 1px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  border-radius: 24px;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgb(20 150 17 / 30%);
  letter-spacing: 1px;
  &:focus {
    outline: none;
  }
`;

export default Button;