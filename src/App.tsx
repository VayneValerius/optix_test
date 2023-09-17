import { useState, useEffect } from "react";
import MovieTable from "./components/MovieTable";
import { Box, CircularProgress, Container } from "@mui/material";
import ErrorBoundary from "./components/ErrorBoundary";
import RefreshButton from "./components/RefreshButton";
import MovieForm from "./components/MovieForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  IJoinedMovieToCompany,
  IMovie,
  IMovieCompany,
} from "./types/index.types";

export const App = () => {
  const [movies, setMovies] = useState<IJoinedMovieToCompany[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!movies.length) {
      getDataAndSetCompanies();
    }
  }, []);

  const getMovieData = async (): Promise<IMovie[]> => {
    const movieData: IMovie[] = await fetch(
      "https://comforting-starlight-f3456a.netlify.app/.netlify/functions/movies",
      { method: "GET" }
    ).then(async (response) => {
      const movieResponse = await response.json();
      return movieResponse;
    });
    return movieData;
  };

  const getMovieCompanies = async (): Promise<IMovieCompany[]> => {
    const movieCompanies: IMovieCompany[] = await fetch(
      "https://comforting-starlight-f3456a.netlify.app/.netlify/functions/movieCompanies",
      { method: "GET" }
    ).then(async (response) => {
      const movieResponse = await response.json();
      return movieResponse;
    });
    return movieCompanies;
  };

  const getAverageReviewScore = (reviews: number[]): string => {
    if (reviews && reviews.length > 0) {
      const reviewsLength: number = reviews.length;
      const totalReviewScore: number = reviews.reduce(
        (total, next) => total + next,
        0
      );
      const meanReviewScore: number = totalReviewScore / reviewsLength;
      const roundedReviewScore: string = (
        Math.round(meanReviewScore * 10) / 10
      ).toFixed(1);
      return roundedReviewScore;
    }
    return "N/A";
  };

  const getDataAndSetCompanies = async (): Promise<void> => {
    try {
      setHasError(false);
      setLoading(true);
      const localMovies: any[] = await getMovieData();
      const localCompanies: any[] = await getMovieCompanies();

      const generatedMovieData: IJoinedMovieToCompany[] = localMovies.map(
        (movie) => {
          const filmCompany = localCompanies.filter((company) => {
            if (company.id === movie.filmCompanyId) {
              return company;
            }
          });
          return {
            id: movie.id,
            averageReviewScore: getAverageReviewScore(movie.reviews),
            title: movie.title,
            filmCompany: filmCompany[0].name,
            cost: movie.cost,
            releaseYear: movie.releaseYear,
          };
        }
      );
      setMovies(generatedMovieData);
      setLoading(false);
    } catch {
      setHasError(true);
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Container>
        <ErrorBoundary>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                height: "100vh",
                minWidth: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <h2>Welcome to the Movie Database!</h2>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <p style={{ marginRight: "30px" }}>
                  Total movies displayed: {movies.length}
                </p>
                <RefreshButton
                  getDataAndSetCompanies={getDataAndSetCompanies}
                />
              </Box>
              {hasError ? (
                movies && movies.length ? (
                  <>
                    <MovieTable
                      movies={movies}
                      selectedMovie={selectedMovie}
                      setSelectedMovie={setSelectedMovie}
                    />
                    <br />
                    <div>
                      {selectedMovie && <p>Please leave a review below</p>}
                      {selectedMovie && <MovieForm movieID={selectedMovie} />}
                    </div>
                  </>
                ) : (
                  <></>
                )
              ) : (
                <h1>Something has gone wrong, please try again</h1>
              )}
            </>
          )}
        </ErrorBoundary>
      </Container>
    </>
  );
};
