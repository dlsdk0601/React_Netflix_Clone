import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import React from "react";
import { useQuery } from "react-query";
import { Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getSearch, IgetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const BoxVariants_search = {
    normal: {
        scale: 1
    },
    hover: {
        scale: 1.3,
        y: -50,
        transition: {
            delay: 0.2,
            type: "tween"
        }
    }
}

const inforVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.2,
            type: "tween"
        }
    }
}

const Search = () => {

    const navigate = useNavigate();
    const { search } = useLocation();
    const { scrollY } = useViewportScroll();
    const keyword = new URLSearchParams(search).get("keyword") || "";  //js 내장 함수 
    const searchMatch = useMatch("/search/:searchId");
    
    const { data:searchList, isLoading } = useQuery<IgetMoviesResult>(["search", keyword], () => getSearch(keyword))
    const clieckSearch = searchMatch?.params.searchId && searchList?.results.find(search => String(search.id) === searchMatch?.params.searchId);

    const onBoxClicked = (id:number) => {
        navigate(`/search/${id}?query=${keyword}`);
    }

    const onOverlayClick = () => {
        navigate(`/search?query=${keyword}`);
    }

    return (
        <Warpper>
            {
                isLoading ? <Loader>Loading...</Loader>
                :
                <>
                    <Title>Search</Title>
                    <Container>
                        <AnimatePresence>
                            <Row>
                                {
                                    searchList && searchList?.results.map(mv => {
                                        return <Box 
                                            bgPhoto={makeImagePath(mv.backdrop_path, "w500")} 
                                            layoutId={mv.id + ""}
                                            onClick={() => onBoxClicked(mv.id)}
                                            key={mv.id}
                                            variants={BoxVariants_search}
                                            whileHover={"hover"}
                                            initial="normal"
                                            >
                                                <img />
                                                <Info variants={inforVariants}>
                                                    <h4>{mv.title || "that has no Name"}</h4>
                                                </Info>
                                            </Box>
                                    })
                                }
                            </Row>
                        </AnimatePresence>
                    </Container>
                    <AnimatePresence>
                        {
                            searchMatch && 
                            <>
                                <Overlay onClick={onOverlayClick} />
                                <BigMovie style={{top: scrollY.get() + 50}} layoutId={searchMatch.params.searchId + ""}>
                                    {
                                        clieckSearch ? <>
                                            <Bigcover style={{backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(clieckSearch.backdrop_path, "w500")})` }} />
                                            <BigTitle>{clieckSearch.title || "that has no Name"}</BigTitle>
                                            <BigOverview>{clieckSearch.overview}</BigOverview>
                                        </>
                                        : null
                                    }
                                </BigMovie>
                            </>
                        }
                    </AnimatePresence>
                    <Outlet />
                </>
            }
            
        </Warpper>
    );
};

const Row = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${props => props.theme.black.lighter};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4{
        text-align: center;
        font-size: 12px;
    }
`

const BigMovie = styled(motion.div)`
    position: absolute; 
    width: 40vw; 
    height: 80vh; 
    margin: 0 auto;
    left: 0; 
    right: 0;
    background-color: ${props => props.theme.black.lighter};
    border-radius: 15px;
    overflow: hidden; 
`

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0;
`

const BigOverview = styled.p`
    padding: 20px;
    color: ${props => props.theme.white.lighter};
    position: relative;
    top: -60px;
`

const Bigcover = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center center;
    height: 400px;
`;

const BigTitle = styled.h3`
    color: ${props => props.theme.white.lighter};
    text-align: left;
    font-size: 24px;
    position: relative;
    top: -60px;
    padding: 10px;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const Loader = styled.div`
    hiehgt: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Title = styled.h2`
    font-size: 24px;
    font-weight: 400;
    margin-top: 100px;
    margin-bottom: 20px;
    padding-left: 60px;
`

const Box = styled(motion.div)<{bgPhoto: string}>`
    background-color: white;
    background-image: url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center center;
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
    &:first-child{
        transform-origin: center left;
    }
    &:last-child{
        tranform-origin: center right;
    }
`

const Warpper = styled.div`
    height: 100vh;
    width: 100vw;
    margin: auto;
    background-color: black;
`

export default Search;