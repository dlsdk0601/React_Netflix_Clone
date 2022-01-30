import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import {  getAiringTv, getonAirtTv, getPopTv, IgetMoviesResult } from "../api";
import { useQuery } from "react-query";
import { makeImagePath } from "../utils";
import { Outlet, useMatch, useNavigate } from "react-router-dom";


const rowVaroants_tv = {
    hidden: (isRight_tv: boolean) => ({
        x: isRight_tv ? window.outerWidth + 10 : -window.outerWidth - 10
    }),
    visible: {
        x: 0
    },
    exit: (isRight_tv: boolean) => ({
        x: isRight_tv ? -window.outerWidth - 10 : window.outerWidth + 10
    }) 
}

const rowVariants_tv_rated = {
    hidden: (isRight_tv_rated: boolean) => ({
        x: isRight_tv_rated ? window.outerWidth + 10 : -window.outerWidth -10
    }),
    visible : {
        x: 0
    },
    exit: (isRight_tv_rated: boolean) => ({
        x: isRight_tv_rated ? -window.outerWidth -10 : window.outerWidth + 10
    })
}

const rowVariants_tv_latest = {
    hidden: (isRight_tv_rated: boolean) => ({
        x: isRight_tv_rated ? window.outerWidth + 10 : -window.outerWidth -10
    }),
    visible : {
        x: 0
    },
    exit: (isRight_tv_rated: boolean) => ({
        x: isRight_tv_rated ? -window.outerWidth -10 : window.outerWidth + 10
    })
}

const infoVariants_tv = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.2,
            type: "tween"
        }
    }   
}

const inforVariants_tv_rated = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.2,
            type: "tween"
        }
    }
}

const inforVariants_tv_latest = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.2,
            type: "tween"
        }
    }
}

const BoxVariants_tv = {
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

const BoxVariants_tv_rated = {
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

const BoxVariants_tv_latest = {
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


const Tv = () => {

    const offset = 6;
    const navigate = useNavigate();
    const bigMovieMatch = useMatch("/tv/:tvId");
    const { scrollY } = useViewportScroll();

    const [ leaving_tv, setleaving_tv ] = useState(false);
    const [ leaving_tv_rated, setleaving_tv_rated ] = useState(false);
    const [ leaving_tv_latest, setleaving_tv_latest ] = useState(false);

    const [ index_tv, setindex_tv ] = useState(0);
    const [ index_tv_rated, setindex_tv_rated ] = useState(0);
    const [ index_tv_latest, setindex_tv_latest ] = useState(0);

    const [ isRight_tv, setisRight_tv ] = useState(true)
    const [ isRight_tv_rated, setisRight_tv_rated ] = useState(true)
    const [ isRight_tv_latest, setisRight_tv_latest ] = useState(true)

    const { data: tvList, isLoading: loading } = useQuery<IgetMoviesResult>(["tv", "airing"], getAiringTv);
    const { data: onAirTvList } = useQuery<IgetMoviesResult>(["tv", "rated"], getonAirtTv);
    const { data: latestTvList } = useQuery<IgetMoviesResult>(["tv", "pop"], getPopTv);

    const clickedTv = bigMovieMatch?.params.tvId && tvList?.results.find((mv, index) => String(mv.id) === bigMovieMatch.params.tvId);
    const clicked_rated_tv = bigMovieMatch?.params.tvId && onAirTvList?.results.find((mv, index) => String(index+10) === bigMovieMatch.params.tvId);
    const clicked_latest_tv = bigMovieMatch?.params.tvId && latestTvList?.results.find((mv, index) => String(index+20) === bigMovieMatch.params.tvId);
    
    const toggleleaving_tv = () => {
        setleaving_tv(prev => !prev);
    }

    const toggleleaving_tv_rated = () => {
        setleaving_tv_rated(prev => !prev);
    }

    const toggleleaving_tv_latest = () => {
        setleaving_tv_latest(prev => !prev);
    }

    const increaseindex_tv = () => {
        if(tvList){
            if(leaving_tv) return;
                toggleleaving_tv();
                setisRight_tv(true);
                const totalMovie = tvList?.results.length - 1;
                const maxindex_tv = Math.floor(totalMovie / offset );
                setindex_tv(prev => prev === maxindex_tv - 1 ? 0 : prev + 1 );
        }
    }

    const increaseindex_tv_rated = () => {
        if(onAirTvList){
            if(leaving_tv_rated) return;
                toggleleaving_tv_rated();
                setisRight_tv_rated(true);
                const totalMovie = onAirTvList?.results.length - 2;
                const maxindex_tv = Math.floor(totalMovie / offset );
                setindex_tv_rated(prev => prev === maxindex_tv - 1 ? 0 : prev + 1 );
        }
    }

    const increaseindex_tv_latest = () => {
        if(latestTvList){
            if(leaving_tv_latest) return;
                toggleleaving_tv_latest();
                setisRight_tv_latest(true);
                const totalMovie = latestTvList?.results.length - 2;
                const maxindex_tv = Math.floor(totalMovie / offset );
                setindex_tv_latest(prev => prev === maxindex_tv - 1 ? 0 : prev + 1 );
        }
    }

    const decreaseindex_tv = () => {
        if(tvList){
            if(leaving_tv) return;
                toggleleaving_tv();
                setisRight_tv(false);
                const totalMovie = tvList?.results.length - 1;
                const maxindex_tv = Math.floor(totalMovie / offset );
                setindex_tv(prev => prev === 0 ? maxindex_tv - 1 : prev === maxindex_tv - 1 ? 0 : prev - 1 );
        }
    }

    const decreaseindex_tv_rated = () => {
        if(onAirTvList){
            if(leaving_tv_rated) return;
                toggleleaving_tv_rated();
                setisRight_tv_rated(false);
                const totalMovie = onAirTvList?.results.length - 2;
                const maxindex_tv = Math.floor(totalMovie / offset );
                setindex_tv_rated(prev => prev === 0 ? maxindex_tv - 1 : prev === maxindex_tv - 1 ? 0 : prev - 1 );
        }
    }

    const decreaseindex_tv_latest = () => {
        if(latestTvList){
            if(leaving_tv_latest) return;
                toggleleaving_tv_latest();
                setisRight_tv_latest(false);
                const totalMovie = latestTvList?.results.length - 2;
                const maxindex_tv = Math.floor(totalMovie / offset );
                setindex_tv_latest(prev => prev === 0 ? maxindex_tv - 1 : prev === maxindex_tv - 1 ? 0 : prev - 1 );
        }
    }

    const onBoxClicked_tv = (movieId: number) => {
        navigate(`/tv/${movieId}`);
    };

    const onOverlayClick_tv = () => {
        navigate("/tv");
    }

    return (
        <Wrapper>
           {
                loading ? <Loader>Loading...</Loader>
                :
                <>
                    <Banner bgPhoto={makeImagePath(tvList?.results[0].backdrop_path || "")}>
                        <Title>{tvList?.results[0].name}</Title>
                        <Overview>{tvList?.results[0].overview || "there is no Overview"}</Overview>
                    </Banner>
                    <Slider topNumber={-100}>
                        <LeftArrow onClick={decreaseindex_tv} />
                        <NextArrow onClick={increaseindex_tv} />
                        <AnimatePresence onExitComplete={toggleleaving_tv} initial={false} custom={isRight_tv} >
                            <SotTitle>Tv</SotTitle>
                            <Row
                                custom={isRight_tv}
                                variants={rowVaroants_tv}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                key={index_tv}
                                transition={{ type: "tween", duration: 1 }}
                            >
                                {
                                    tvList && tvList?.results
                                    .slice(1)
                                    .slice(offset*index_tv, offset*index_tv + offset)
                                    .map( (mv, index) => (
                                        <Box
                                            layoutId={mv.id + ""}
                                            onClick={() => onBoxClicked_tv(mv.id)}
                                            variants={BoxVariants_tv}
                                            key={mv.id}
                                            bgPhoto={makeImagePath(mv.backdrop_path, "w500")}
                                            whileHover={"hover"}
                                            initial="normal"
                                        >
                                            <img />
                                            <Info variants={infoVariants_tv}>
                                                <h4>{mv.name}</h4>
                                            </Info>
                                        </Box>
                                    ))
                                }
                            </Row>
                        </AnimatePresence>
                    </Slider>
                    {/* <Slider topNumber={200}>
                        <LeftArrow onClick={decreaseindex_tv_rated} />
                        <NextArrow onClick={increaseindex_tv_rated} />
                        <AnimatePresence onExitComplete={toggleleaving_tv_rated} initial={false} custom={isRight_tv_rated} >
                            <SotTitle>Top Rated Tv</SotTitle>
                            <Row
                                custom={isRight_tv_rated}
                                variants={rowVariants_tv_rated}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                key={index_tv_rated}
                                transition={{ type: "tween", duration: 1 }}
                            >
                                {
                                    onAirTvList && onAirTvList?.results
                                    .slice(2)
                                    .slice(offset*index_tv_rated, offset*index_tv_rated + offset)
                                    .map( (mv, index) => (
                                        <Box
                                            layoutId={index + 10 + ""}
                                            onClick={() => onBoxClicked_tv(index + 10)}
                                            variants={BoxVariants_tv_rated}
                                            key={index + 10}
                                            bgPhoto={makeImagePath(mv.backdrop_path, "w500")}
                                            whileHover={"hover"}
                                            initial="normal"
                                        >
                                            <img />
                                            <Info variants={inforVariants_tv_rated}>
                                                <h4>{mv.name}</h4>
                                            </Info>
                                        </Box>
                                    ))
                                }
                            </Row>
                        </AnimatePresence>
                    </Slider>
                    <Slider topNumber={500}>
                        <LeftArrow onClick={decreaseindex_tv_latest} />
                        <NextArrow onClick={increaseindex_tv_latest} />
                        <AnimatePresence onExitComplete={toggleleaving_tv_latest} initial={false} custom={isRight_tv_latest} >
                            <SotTitle>Top Best Tv</SotTitle>
                            <Row
                                custom={isRight_tv_latest}
                                variants={rowVariants_tv_latest}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                key={index_tv_latest}
                                transition={{ type: "tween", duration: 1 }}
                            >
                                {
                                    latestTvList && latestTvList?.results
                                    .slice(2)
                                    .slice(offset*index_tv_latest, offset*index_tv_latest + offset)
                                    .map( (mv, index) => (
                                        <Box
                                            layoutId={index + 20 + ""}
                                            onClick={() => onBoxClicked_tv(index + 20)}
                                            variants={BoxVariants_tv_latest}
                                            key={index + 20}
                                            bgPhoto={makeImagePath(mv.backdrop_path, "w500")}
                                            whileHover={"hover"}
                                            initial="normal"
                                        >
                                            <img />
                                            <Info variants={inforVariants_tv_latest}>
                                                <h4>{mv.name}</h4>
                                            </Info>
                                        </Box>
                                    ))
                                }
                            </Row>
                        </AnimatePresence>
                    </Slider> */}
                    <AnimatePresence>
                            {
                                bigMovieMatch &&
                                <>
                                    <Overlay onClick={onOverlayClick_tv} />
                                    <BigMovie style={{top: scrollY.get() + 50}} layoutId={bigMovieMatch.params.tvId + ""}>
                                    {
                                        clickedTv ? <>
                                            <Bigcover style={{backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(clickedTv.backdrop_path, "w500")})` }} />
                                            <BigTitle>{clickedTv.name}</BigTitle>
                                            <BigOverview>{clickedTv.overview || "there is no Overview"}</BigOverview>
                                        </>
                                        // : clicked_rated_tv ? <>
                                        //     <Bigcover style={{backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(clicked_rated_tv.backdrop_path, "w500")})` }} />
                                        //     <BigTitle>{clicked_rated_tv.title}</BigTitle>
                                        //     <BigOverview>{clicked_rated_tv.overview || "there is no Overview"}</BigOverview>
                                        // </>
                                        // : clicked_latest_tv ? <>
                                        //     <Bigcover style={{backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(clicked_latest_tv.backdrop_path, "w500")})` }} />
                                        //     <BigTitle>{clicked_latest_tv.title}</BigTitle>
                                        //     <BigOverview>{clicked_latest_tv.overview || "there is no Overview"}</BigOverview>
                                        // </>
                                        : null
                                    }
                                    </BigMovie>
                                </>
                            }
                    </AnimatePresence>
                    <Outlet />
                </>
            }
        </Wrapper>
    );
}

const LeftArrow = styled.div`
    width: 35px;
    height: 35px;
    z-index_tv: 100;
    position: absolute;
    top: -5px;
    left: 25px;
    border-top: 5px solid white;
    border-left: 5px solid white;
    transform: rotate(-45deg);
`;

const NextArrow = styled.div`
    width: 35px;
    height: 35px;
    z-index_tv: 100;
    position: absolute;
    top: -5px;
    right: 25px;
    border-top: 5px solid white;
    border-right: 5px solid white;
    transform: rotate(45deg);
`;


const SotTitle = styled.h2`
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 20px;
    padding-left: 60px;
`;

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

const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${ props => props.theme.black.lighter};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4{
        text-align: center;
        font-size: 12px
    }
`

const Title = styled.h2`
    font-size: 48px;
    margin-bottom: 10px;
`

const Overview = styled.p`
    font-size: 18px;
    width: 50%;
`

const Wrapper = styled.div`
    background: black;
    height: 150vh;
`

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{ bgPhoto:string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) , url(${ (props) => props.bgPhoto});
    background-size: cover;
`

const Slider = styled.div<{topNumber: number}>`
    position: relative;
    top: ${props => props.topNumber}px;
`;

const Row = styled(motion.div)`
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    width: 100%;
`;

//괄호가 있을때는 이렇게 적어준다 . 
const Box = styled(motion.div)<{bgPhoto:string}>`
    background-color: white;
    background-image: url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center center;
    height: 200px;
    &:first-child{
        transform-origin: center left;
    }
    &:last-child{
        transform-origin: center right;
    }
`;


export default Tv;