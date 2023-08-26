import React from 'react';
import { SliderThumb } from '@mui/material';
import { ThumbIcon } from '../../../../Icons';

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}
export function CustomThumb(props: AirbnbThumbComponentProps) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <ThumbIcon />
    </SliderThumb>
  );
}
