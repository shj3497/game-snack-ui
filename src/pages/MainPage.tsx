import Picture, {PictureProps} from '@/components/_atoms/Picture';
import {Box, Button, styled} from '@mui/material';

import Banner1x from '@/assets/main/main-banner@1x.jpg';
import Banner2x from '@/assets/main/main-banner@2x.jpg';
import Banner3x from '@/assets/main/main-banner@3x.jpg';
import games from '@/lib/utils/games';
import {Link} from 'react-router-dom';
import useUserInfoConfig from '@/lib/store/user-info-config/useUserInfoConfig';

const Container = styled('div')`
  max-width: 640px;
  min-width: 360px;
  width: 100%;
  margin: 0 auto;
  padding: 16px;
`;

const GameContentList = styled('div')`
  display: flex;
  margin-top: 23px;
  flex-direction: column;
  gap: 18px 0;
`;

const GameContent = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .text-wrap {
    .title {
      margin: 0;
      color: #000;
      font-family: Pretendard;
      font-size: 15px;
      font-weight: 500;
      line-height: 16px; /* 106.667% */
      margin-bottom: 8px;
    }
    .description {
      margin: 0;
      color: #b1b7c4;
      font-family: Pretendard;
      font-size: 13px;
      font-weight: 500;
      line-height: 16px; /* 123.077% */
    }
  }
`;

const StyledButton = styled(Button)(({theme}) => ({
  backgroundColor: theme.palette.game_pink.main,
  color: '#fff',
  borderRadius: '100px',
  padding: '8px 0',
  height: '30px',
  fontFamily: 'Pretendard',
  fontSize: '12px',
  fontWeight: 600,
}));

const bannerSources: PictureProps['sources'] = {
  srcSet: {
    '1x': Banner1x,
    '2x': Banner2x,
  },
  type: 'image/jpeg',
};

const MainPage = () => {
  const {updateUserInfo} = useUserInfoConfig();
  return (
    <Container>
      <Picture
        sources={bannerSources}
        src={bannerSources.srcSet['2x']}
        alt="간단한 게임 참여하면 리워드 지급"
        sx={{
          borderRadius: '10px',
          overflow: 'hidden',
          width: '100%',
          height: 'auto',
          aspectRatio: '328 / 164',
        }}
        defaultStyle
      />

      <GameContentList>
        {games.map((game) => (
          <Box display="flex" width="100%" gap="15px" key={game.link}>
            <Picture
              sources={game.icon}
              src={game.icon.srcSet['2x']}
              width={52}
              height={52}
              sx={{
                minWidth: '52px',
                minHeight: '52px',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />

            <GameContent>
              <div className="text-wrap">
                <h3 className="title">{game.title}</h3>
                <p className="description">{game.description}</p>
              </div>
              <Link
                to={game.link}
                onClick={() => {
                  updateUserInfo(game.userInfo);
                }}
              >
                <StyledButton>참여하기</StyledButton>
              </Link>
            </GameContent>
          </Box>
        ))}
      </GameContentList>
    </Container>
  );
};
export default MainPage;
