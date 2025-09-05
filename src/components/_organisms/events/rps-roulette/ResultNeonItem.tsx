import Picture, {PictureProps} from '@/components/_atoms/Picture';
import {styled} from '@mui/material';
import {FC} from 'react';

interface Props {
  neonOnSources: PictureProps['sources'];
  neonOffSources: PictureProps['sources'];
  isNeonOn?: boolean;
}

const Container = styled('div')`
  position: relative;
  width: 81px;
  height: 75px;

  img,
  picture {
    user-select: none;
    pointer-events: none;
  }
`;

const ResultNeonItem: FC<Props> = ({
  neonOffSources,
  neonOnSources,
  isNeonOn = false,
}) => {
  return (
    <Container>
      <Picture
        sources={neonOffSources}
        alt={neonOffSources.alt}
        src={neonOffSources.srcSet['2x']}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
      />
      <Picture
        sources={neonOnSources}
        alt={neonOnSources.alt}
        src={neonOnSources.srcSet['2x']}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',

          opacity: isNeonOn ? 1 : 0,
        }}
      />
    </Container>
  );
};
export default ResultNeonItem;
