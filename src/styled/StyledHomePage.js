import styled from 'styled-components';

export const GamesContainer = styled.div`
    display:flex;
    flex-wrap:wrap;
    flex-direction:column;
    align-items:center;
    width:100%;
    margin:10px auto;
`
export const GamesH1= styled.h1 `
    text-decoration: underline solid;
`

export const GamesListContainer = styled.div`
    display: flex;
    flex-wrap:wrap;
    justify-content:left;
    flex-direction:column;
    width:80%;
    border-style: solid;
    border-color:#f0f0f0;
    borer-width:2px;
`
export const GameEntry = styled.div`
    display:flex;
    flex-wrap:wrap;
    flex-direction:row;
`
export const GameTitle = styled.p`
    width:30%
`

export const GameGenre = styled.p`
    width:20%
`

export const GameSystem = styled.p`
    width:20%
`
export const GameRelease = styled.p`
    width:10%
`