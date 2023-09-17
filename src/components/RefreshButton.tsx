import { FC } from "react";
import { Button } from "@mui/material";
import { IJoinedMovieToCompany } from "../types/index.types";

interface IRefreshButtonProps {
  getDataAndSetCompanies: () => Promise<void>;
}

const RefreshButton: FC<IRefreshButtonProps> = ({ getDataAndSetCompanies }) => {
  return (
    <Button
      onClick={() => {
        getDataAndSetCompanies();
      }}
    >
      Refresh Movies
    </Button>
  );
};

export default RefreshButton;
