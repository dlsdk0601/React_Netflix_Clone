
const API_KEY = "c59e98a271b3b7212d7e0a7dc7a71182";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovies{
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
    name: string;
}

export interface IgetMoviesResult{
    data: {
        maximum: string;
        minimum: string;
    },
    page: number;
    results: IMovies[],
    total_pages: number;
    total_results: number;
}

export function getMovies(){
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(res => res.json());
}

export function getTopMovies(){
    return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(res => res.json());
}

export function getLatesMovies(){
    return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`).then(res => res.json());
}

export function getAiringTv(){
    return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(res => res.json());
}

export function getLastestTv(){
    return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}`).then(res => res.json());
}

export function getPopTv(){
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then(res => res.json());
}
