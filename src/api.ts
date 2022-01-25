
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


