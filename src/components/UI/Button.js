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
  &:active {
    animation: subtlePulse 0.4s cubic-bezier(0.5, 0, 0, 0.05);
  }
  img {
    height: 10px;
  }
  @keyframes subtlePulse {
    0% {
      transform: scale(1.1);
    }
    100% {
      transform: translateY(1);
    }
  }
`;

export default Button;