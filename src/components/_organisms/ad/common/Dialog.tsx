import {styled} from '@mui/material';
import classNames from 'classnames';
import {FC, HTMLAttributes} from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  useBackdrop?: boolean;
}

const Container = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  z-index: 3000;
  display: none;
  transition: all 300ms ease;

  &.open {
    display: block;
  }
`;

const Paper = styled('div')`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Backdrop = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const AdDiv = styled('div')`
  width: 100%;
  max-width: 450px;
  height: auto;
  aspect-ratio: 2 / 3;
`;

const Dialog: FC<Props> = ({
  open = false,
  className,
  useBackdrop = false,
  children,
  ...props
}) => {
  return (
    <Container {...props} className={classNames({open}, className)}>
      <Paper>
        <Backdrop className={classNames({useBackdrop})} />
        {children}
      </Paper>
    </Container>
  );
};

export default Dialog;
