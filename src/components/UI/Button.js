import Styled from 'styled-components';

const Button = Styled.button`
  background: #fff;
  border: none;
  padding: 4px 1px 0px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  height: 40px;
  border-radius: 24px;
  box-shadow: 0 2px 16px rgb(0 0 0 / 10%);
  text-transform: uppercase;
  letter-spacing: .5px;
  width: 40px;
  &:focus {
    outline: none;
  }
  img {
    height: 10px;
  }
`;

export default Button;