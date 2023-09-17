import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableSortLabel } from "@mui/material";
import { FC, useMemo, useState } from "react";
import { IJoinedMovieToCompany } from "../types/index.types";

interface IMovieTableProps {
  movies: IJoinedMovieToCompany[];
  selectedMovie: number | undefined;
  setSelectedMovie: (id: number) => void;
}

const MovieTable: FC<IMovieTableProps> = ({
  movies,
  selectedMovie,
  setSelectedMovie,
}) => {
  const [order, setOrder] = useState("desc");
  const [isSortedByReview, setIsSortedByReview] = useState(false);

  const compareAverageReviews = (review1: string, review2: string) => {
    if (parseFloat(review2) < parseFloat(review1)) {
      return -1;
    }
    if (parseFloat(review2) > parseFloat(review1)) {
      return 1;
    }
    return 0;
  };

  const sortByReview = () => {
    if (isSortedByReview) {
      return movies.sort((a, b) =>
        order === "desc"
          ? compareAverageReviews(a.averageReviewScore, b.averageReviewScore)
          : -compareAverageReviews(a.averageReviewScore, b.averageReviewScore)
      );
    } else return movies;
  };

  const handleSort = () => {
    setIsSortedByReview(true);
    setOrder(order === "asc" ? "desc" : "asc");
  };

  const rows: IJoinedMovieToCompany[] = useMemo(() => {
    return sortByReview();
  }, [order, isSortedByReview]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Film Title</TableCell>
            <TableCell align="right">Company</TableCell>
            <TableCell align="right">Release Year</TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={isSortedByReview}
                direction={order}
                onClick={handleSort}
              >
                {"Average Review Score"}
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((movie) => (
            <TableRow
              key={movie.id}
              sx={{}}
              selected={movie.id === selectedMovie}
              onClick={() => setSelectedMovie(movie.id)}
            >
              <TableCell component="th" scope="row">
                {movie.title}
              </TableCell>
              <TableCell align="right" component="th" scope="row">
                {movie.filmCompany}
              </TableCell>
              <TableCell align="right">{movie.releaseYear}</TableCell>
              <TableCell align="right">{movie.averageReviewScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieTable;
