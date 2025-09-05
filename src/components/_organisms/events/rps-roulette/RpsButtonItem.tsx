import Picture, {PictureProps} from '@/components/_atoms/Picture';
import {Button, ButtonProps, styled} from '@mui/material';
import {FC} from 'react';

type Props = {
  btnOffSources: PictureProps['sources'];
  btnOnSources: PictureProps['sources'];
  isLightOn?: boolean;
} & ButtonProps;

const Container = styled(Button)`
  position: relative;
  min-width: auto;
  width: 74px;
  height: 68px;
  padding: 0;
  color: #818181;

  img,
  picture {
    user-select: none;
    pointer-events: none;
  }
`;

const RpsButtonItem: FC<Props> = ({
  btnOffSources,
  btnOnSources,
  isLightOn = false,
  ...props
}) => {
  return (
    <Container {...props}>
      <Picture
        sources={btnOffSources}
        alt={btnOffSources.alt}
        src={btnOffSources.srcSet['2x']}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
      />
      <Picture
        sources={btnOnSources}
        alt={btnOnSources.alt}
        src={btnOnSources.srcSet['2x']}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          opacity: isLightOn ? 1 : 0,
        }}
      />
    </Container>
  );
};
export default RpsButtonItem;
