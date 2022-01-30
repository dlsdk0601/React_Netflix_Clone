import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import {  getMovies, getonAirtTv, getUpcomingMovies, IgetMoviesResult } from "../api";
import { useQuery } from "react-query";
import { makeImagePath } from "../utils";
import { Outlet, useMatch, useNavigate } from "react-router-dom";


const rowVaroants = {
    hidden: (isRight: boolean) => ({
        x: isRight ? window.outerWidth + 10 : -window.outerWidth - 10
    }),
    visible: {
        x: 0
    },
    exit: (isRight: boolean) => ({
        x: isRight ? -window.outerWidth - 10 : window.outerWidth + 10
    }) 
}

const rowVariants_rated = {
    hidden: (isRight_rated: boolean) => ({
        x: isRight_rated ? window.outerWidth + 10 : -window.outerWidth -10
    }),
    visible : {
        x: 0
    },
    exit: (isRight_rated: boolean) => ({
        x: isRight_rated ? -window.outerWidth -10 : window.outerWidth + 10
    })
}

const rowVariants_latest = {
    hidden: (isRight_rated: boolean) => ({
        x: isRight_rated ? window.outerWidth + 10 : -window.outerWidth -10
    }),
    visible : {
        x: 0
    },
    exit: (isRight_rated: boolean) => ({
        x: isRight_rated ? -window.outerWidth -10 : window.outerWidth + 10
    })
}

const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.2,
            type: "tween"
        }
    }   
}

const inforVariants_rated = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.2,
            type: "tween"
        }
    }
}

const inforVariants_latest = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.2,
            type: "tween"
        }
    }
}

const BoxVariants = {
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

const BoxVariants_rated = {
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

const BoxVariants_latest = {
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

const Home = () => {

    const offset = 6;
    const navigate = useNavigate();
    const bigMovieMatch = useMatch("/movies/:movieId");
    const { scrollY } = useViewportScroll();

    const [ leaving, setLeaving ] = useState(false);
    const [ leaving_rated, setLeaving_rated ] = useState(false);
    const [ leaving_latest, setLeaving_latest ] = useState(false);

    const [ index, setIndex ] = useState(0);
    const [ index_rated, setIndex_rated ] = useState(0);
    const [ index_latest, setIndex_latest ] = useState(0);

    const [ isRight, setIsRight ] = useState(true)
    const [ isRight_rated, setIsRight_rated ] = useState(true)
    const [ isRight_latest, setIsRight_latest ] = useState(true)

    const { data: movieList, isLoading } = useQuery<IgetMoviesResult>(["movies", "nowPlaying"], getMovies);
    const { data: topMovieList } = useQuery<IgetMoviesResult>(["movies", "onair"], getonAirtTv);
    const { data: latestMovieList } = useQuery<IgetMoviesResult>(["movies", "upcoming"], getUpcomingMovies);
    
    const clickedMovie = bigMovieMatch?.params.movieId && movieList?.results.find(mv => String(mv.id) === bigMovieMatch.params.movieId);
    const clicked_rated_movie = bigMovieMatch?.params.movieId && topMovieList?.results.find(mv => String(mv.id) === bigMovieMatch.params.movieId);
    const clicked_latest_movie = bigMovieMatch?.params.movieId && latestMovieList?.results.find(mv => String(mv.id) === bigMovieMatch.params.movieId);
    
    
    const toggleLeaving = () => {
        setLeaving(prev => !prev);
    }

    const toggleLeaving_rated = () => {
        setLeaving_rated(prev => !prev);
    }

    const toggleLeaving_latest = () => {
        setLeaving_latest(prev => !prev);
    }

    const increaseIndex = () => {
        if(movieList){
            if(leaving) return;
                toggleLeaving();
                setIsRight(true);
                const totalMovie = movieList?.results.length - 1;
                const maxIndex = Math.floor(totalMovie / offset );
                setIndex(prev => prev === maxIndex - 1 ? 0 : prev + 1 );
        }
    }

    const increaseIndex_rated = () => {
        if(topMovieList){
            if(leaving_rated) return;
                toggleLeaving_rated();
                setIsRight_rated(true);
                const totalMovie = topMovieList?.results.length - 2;
                const maxIndex = Math.floor(totalMovie / offset );
                setIndex_rated(prev => prev === maxIndex - 1 ? 0 : prev + 1 );
        }
    }

    const increaseIndex_latest = () => {
        if(latestMovieList){
            if(leaving_latest) return;
                toggleLeaving_latest();
                setIsRight_latest(true);
                const totalMovie = latestMovieList?.results.length - 2;
                const maxIndex = Math.floor(totalMovie / offset );
                setIndex_latest(prev => prev === maxIndex - 1 ? 0 : prev + 1 );
        }
    }

    const decreaseIndex = () => {
        if(movieList){
            if(leaving) return;
                toggleLeaving();
                setIsRight(false);
                const totalMovie = movieList?.results.length - 1;
                const maxIndex = Math.floor(totalMovie / offset );
                setIndex(prev => prev === 0 ? maxIndex - 1 : prev === maxIndex - 1 ? 0 : prev - 1 );
        }
    }

    const decreaseIndex_rated = () => {
        if(topMovieList){
            if(leaving_rated) return;
                toggleLeaving_rated();
                setIsRight_rated(false);
                const totalMovie = topMovieList?.results.length - 2;
                const maxIndex = Math.floor(totalMovie / offset );
                setIndex_rated(prev => prev === 0 ? maxIndex - 1 : prev === maxIndex - 1 ? 0 : prev - 1 );
        }
    }

    const decreaseIndex_latest = () => {
        if(latestMovieList){
            if(leaving_latest) return;
                toggleLeaving_latest();
                setIsRight_latest(false);
                const totalMovie = latestMovieList?.results.length - 2;
                const maxIndex = Math.floor(totalMovie / offset );
                setIndex_latest(prev => prev === 0 ? maxIndex - 1 : prev === maxIndex - 1 ? 0 : prev - 1 );
        }
    }

    const onBoxClicked = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    };

    const onOverlayClick = () => {
        navigate("/");
    }

    return (
        <Wrapper>
            {
                isLoading ? <Loader>Loading...</Loader>
                :
                <>
                    <Banner bgPhoto={makeImagePath(movieList?.results[0].backdrop_path || "")}>
                        <Title>{movieList?.results[0].title}</Title>
                        <Overview>{movieList?.results[0].overview}</Overview>
                    </Banner>
                    <Slider topNumber={-100}>
                        <LeftArrow onClick={decreaseIndex} />
                        <NextArrow onClick={increaseIndex} />
                        <AnimatePresence onExitComplete={toggleLeaving} initial={false} custom={isRight} >
                        {/* //onExitComplete 은 애니메이션이 끝난후 실행하는 함수 */}
                        {/* initial 새로고침할대 미끄러져 나오는거 방지. 초기 함수를 false 시킨거임 */}
                            <SotTitle>Movie</SotTitle>
                            <Row
                                custom={isRight}
                                variants={rowVaroants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                key={index}
                                transition={{ type: "tween", duration: 1 }}
                            >
                                {
                                    movieList && movieList?.results
                                    .slice(1)
                                    .slice(offset*index, offset*index + offset)
                                    .map( mv => (
                                        <Box
                                            layoutId={mv.id + ""}
                                            onClick={() => onBoxClicked(mv.id)}
                                            variants={BoxVariants}
                                            key={mv.id}
                                            bgPhoto={makeImagePath(mv.backdrop_path, "w500")}
                                            whileHover={"hover"}
                                            initial="normal"
                                        >
                                            <img />
                                            <Info variants={infoVariants}>
                                                <h4>{mv.title}</h4>
                                            </Info>
                                        </Box>
                                    ))
                                }
                            </Row>
                        </AnimatePresence>
                    </Slider>
                    <Slider topNumber={200}>
                        <LeftArrow onClick={decreaseIndex_rated} />
                        <NextArrow onClick={increaseIndex_rated} />
                        <AnimatePresence onExitComplete={toggleLeaving_rated} initial={false} custom={isRight_rated} >
                            <SotTitle>Top Rated Movies</SotTitle>
                            <Row
                                custom={isRight_rated}
                                variants={rowVariants_rated}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                key={index_rated}
                                transition={{ type: "tween", duration: 1 }}
                            >
                                {
                                    topMovieList && topMovieList?.results
                                    .slice(2)
                                    .slice(offset*index_rated, offset*index_rated + offset)
                                    .map( mv => (
                                        <Box
                                            layoutId={mv.id + ""}
                                            onClick={() => onBoxClicked(mv.id)}
                                            variants={BoxVariants_rated}
                                            key={mv.id}
                                            bgPhoto={makeImagePath(mv.backdrop_path, "w500")}
                                            whileHover={"hover"}
                                            initial="normal"
                                        >
                                            <img />
                                            <Info variants={inforVariants_rated}>
                                                <h4>{mv.name}</h4>
                                            </Info>
                                        </Box>
                                    ))
                                }
                            </Row>
                        </AnimatePresence>
                    </Slider>
                    <Slider topNumber={500}>
                        <LeftArrow onClick={decreaseIndex_latest} />
                        <NextArrow onClick={increaseIndex_latest} />
                        <AnimatePresence onExitComplete={toggleLeaving_latest} initial={false} custom={isRight_latest} >
                            <SotTitle>Top Best Movies</SotTitle>
                            <Row
                                custom={isRight_latest}
                                variants={rowVariants_latest}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                key={index_latest}
                                transition={{ type: "tween", duration: 1 }}
                            >
                                {
                                    latestMovieList && latestMovieList?.results
                                    .slice(2)
                                    .slice(offset*index_latest, offset*index_latest + offset)
                                    .map( mv => (
                                        <Box
                                            layoutId={mv.id + ""}
                                            onClick={() => onBoxClicked(mv.id)}
                                            variants={BoxVariants_latest}
                                            key={mv.id}
                                            bgPhoto={makeImagePath(mv.backdrop_path, "w500")}
                                            whileHover={"hover"}
                                            initial="normal"
                                        >
                                            <img />
                                            <Info variants={inforVariants_latest}>
                                                <h4>{mv.title}</h4>
                                            </Info>
                                        </Box>
                                    ))
                                }
                            </Row>
                        </AnimatePresence>
                    </Slider>
                    <AnimatePresence>
                            {
                                bigMovieMatch &&
                                <>
                                    <Overlay onClick={onOverlayClick} />
                                    <BigMovie style={{top: scrollY.get() + 50}} layoutId={bigMovieMatch.params.movieId + ""}>
                                    {
                                        clickedMovie ? <>
                                            <Bigcover style={{backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(clickedMovie.backdrop_path, "w500")})` }} />
                                            <BigTitle>{clickedMovie.title}</BigTitle>
                                            <BigOverview>{clickedMovie.overview}</BigOverview>
                                        </>
                                        : clicked_rated_movie ? <>
                                            <Bigcover style={{backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(clicked_rated_movie.backdrop_path, "w500")})` }} />
                                            <BigTitle>{clicked_rated_movie.title}</BigTitle>
                                            <BigOverview>{clicked_rated_movie.overview}</BigOverview>
                                        </>
                                        : clicked_latest_movie ? <>
                                            <Bigcover style={{backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(clicked_latest_movie.backdrop_path, "w500")})` }} />
                                            <BigTitle>{clicked_latest_movie.title}</BigTitle>
                                            <BigOverview>{clicked_latest_movie.overview}</BigOverview>
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
        </Wrapper>
    );
}

const LeftArrow = styled.div`
    width: 35px;
    height: 35px;
    z-index: 100;
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
    z-index: 100;
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
    height: 200vh;
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


export default Home;