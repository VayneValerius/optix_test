export interface IMovie {
  id: number | string;
  reviews: number[];
  title: string;
  filmCompanyId: number | string;
  cost: number;
  releaseYear: number;
}

export interface IMovieCompany {
  id: number | string;
  name: string;
}

export type IJoinedMovieToCompany = Pick<
  IMovie,
  "id" | "title" | "cost" | "releaseYear"
> & {
  averageReviewScore: string;
  filmCompany: string;
};
