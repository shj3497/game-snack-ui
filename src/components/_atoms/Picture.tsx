import {styled, SxProps, Theme} from '@mui/material';
import {ImgHTMLAttributes} from 'react';

export interface PictureProps extends ImgHTMLAttributes<HTMLImageElement> {
  sources: {
    srcSet: {
      '1x': string;
      '2x'?: string;
      '3x'?: string;
    };
    media?: string;
    type?: string;
    alt?: string;
  };
  sx?: SxProps<Theme>;
  defaultStyle?: boolean;
}

const Container = styled('picture')``;

const Img = styled('img')<{ defaultStyle?: boolean }>`
  ${(props) =>
    props.defaultStyle &&
    `
      width: 100%;
      height: 100%;
    `}
`;

const Picture: React.FC<PictureProps> = ({sources, sx, defaultStyle, ...props}) => {
  const {className, onClick, ...imgProps} = props;
  const srcSet = Object.entries(sources.srcSet)
    .map(([key, value]) => `${value} ${key}`)
    .join(', ');
  return (
    <Container
      className={className}
      onClick={onClick}
      sx={{display: 'flex', ...sx}}
    >
      <source srcSet={srcSet} type={sources.type} media={sources.media} />
      <Img alt="" {...imgProps} defaultStyle={defaultStyle} />
    </Container>
  );
};

export default Picture;
