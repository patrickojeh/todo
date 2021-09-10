import Styled from 'styled-components';

const Button = Styled.button`
  background: #d32f2f;
  border: none;
  padding: 0px 21px 1px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  border-radius: 24px;
  text-transform: uppercase;
  letter-spacing: .5px;
  &:focus {
    outline: none;
  }
`;

export default Button;