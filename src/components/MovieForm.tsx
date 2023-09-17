import { useFormik } from "formik";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Box, Button, FormLabel } from "@mui/material";
import MovieReviewValidator from "../validators/MovieReviewValidator";
import { toast } from "react-toastify";

interface IMovieFormProps {
  movieID: string | number;
}

const MovieForm = ({ movieID }) => {
  const formSaver = (values) => {
    fetch(
      `https://comforting-starlight-f3456a.netlify.app/.netlify/functions/submitReview/${movieID}`,
      {
        method: "POST",
        body: values,
      }
    )
      .then((response) => response.json())
      .then((json) => toast(json.message, { type: "success" }))
      .catch((error) => toast(error.message, { type: "error" }));
  };

  const form = useFormik({
    initialValues: {
      review: undefined,
    },
    validationSchema: MovieReviewValidator,
    onSubmit: (values) => formSaver(values),
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormLabel>Review</FormLabel>
        <TextareaAutosize
          minRows={3}
          placeholder="Review..."
          value={form.values.review}
          onChange={(e) => form.setFieldValue("review", e.target.value)}
          onBlur={() => form.setFieldTouched("review")}
        />
        {form.errors.review ? form.errors.review : <></>}
      </Box>
      <Button type="submit" disabled={!form.isValid}>
        Submit Review
      </Button>
    </form>
  );
};

export default MovieForm;
