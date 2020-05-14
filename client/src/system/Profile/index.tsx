import React, { FC } from 'react';
import * as S from 'system/Profile/styles';
import Icon from 'Icon/Icon';
import { color } from 'styles/global';
import TextIcon from 'components/TextIcon';
import { Link } from 'react-router-dom'
interface Prop {
  /** 유져 식별자 */
  id: string;
  /** 유저 이름 */
  userName: string;
  /** 상태메시지 */
  statusMessage: string;
  /** 프로필닫기 핸들러 */
  onRemoveClick: (() => void);

  refs? : any
}

/**
 * 친구 목록을 하나 클릭 했을 때 뜨는 Modal 에 들어갈 내용
 */
const Profile: FC<Prop> = ({
  id,
  userName,
  statusMessage = '',
  onRemoveClick,
  refs
}) => {
  
  return (
        <S.Container ref ={refs.profileElement}>
          <Icon icon='PersonFilled' color={color.GRAY} size='4rem' />
          <S.NameWrapper>{userName}</S.NameWrapper>
          {
            statusMessage
            && <S.StatusWrapper>{statusMessage}</S.StatusWrapper>
          }
          <S.Footer ref = {refs.footerElement}>
            <Link to={{
              pathname: '/chat',
              state: {
                id,
                userName,
              }
            }} style={{ textDecoration: 'none' }}>
              <TextIcon
                icon='Send'
                color={color.GRAY}
                text='1:1 채팅'
                textColor={color.BLACK}
                iconPosition='top'
              />
            </Link>
            <TextIcon
              icon='Close'
              color={color.GRAY}
              text='삭제'
              textColor={color.BLACK}
              iconPosition='top'
              onClick={onRemoveClick}
            />
          </S.Footer>
        </S.Container>
  );
};

export default Profile;
