import React from 'react';
import svg from '../assets/buzzcopper.svg';

const Welcome: React.FC = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <Logo style={{
      height: '50vh',
      objectFit: 'cover',
      margin: '0 auto',
    }} />
  </div>
);

interface ILogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export const Logo = (props: ILogoProps) => (
  <img style={props.style} src={svg} alt="BuzzCopper" />
);

export default Welcome;
