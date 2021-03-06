import styled, { css } from 'styled-components'
import Flex from 'atoms/Flex'
import {
  color, weight,
} from 'styles/global'

export const grayColor = css`
  color: ${(props) => color.GRAY};
`

export const Container = styled(Flex)`
  height: 5rem;
  margin: 0.5rem 0;
  min-width: 10rem;
  justify-content: space-between;
  &:hover{
    background: ${color.HOVER_GRAY};
  }
`

export const RoomInfoWrapper = styled.div`
  display: flex;
  align-items:center;
  max-width: 80%;
`

export const ImgWrapper = styled.div`
  margin: 1rem;
  width: auto;
`

export const InfoWrapper = styled.div`
  display:flex;
  flex-direction: column;
  justify-content:center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 80%;
  width: 100%;
`

export const Row = styled.div`
  display:flex;
  justify-content: left;
`

export const UserListWrapper = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-right: 1rem;
  min-width: 0;
  display: block;
  font-weight: ${weight.STRONG};
`

export const NumWrapper = styled.span`
  ${(props) => grayColor};
`

export const LastMsgWrapper = styled.div`
  margin-right: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  font-weight: lighter;
`

export const SubInfoWrapper = styled(Flex)`
  flex-direction: column;
  align-items: flex-end;
  flex: 1;
  padding:1rem;
  span {
    ${(props) => grayColor};
  } 
`

export const Time = styled.span`
  font-size: 0.7rem;
`
