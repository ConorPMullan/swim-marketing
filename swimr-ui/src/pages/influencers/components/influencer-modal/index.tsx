import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InfluencerForm from "../influencer-form";
import toast from "react-hot-toast";
import { StatusCodes } from "http-status-codes";
import useCreateInfluencer from "../../../../hooks/useCreateInfluencer";
import useGetInfluencers from "../../../../hooks/useGetInfluencers";

interface IInfluencerModal {
  handleClose: () => void;
}

export default function EditInfluencerModal(props: IInfluencerModal) {
  const { handleClose } = props;
  const { refetch } = useGetInfluencers();
  const { mutate: create } = useCreateInfluencer();

  const handleSubmit = async (values: any) => {
    create(values, {
      onSuccess: (response) => {
        if (response.status === StatusCodes.OK) {
          toast.success("Influencer successfully created");
          refetch();
          handleClose();
        }
      },
      onError: () => {
        toast.error("Influencer could not be created");
        throw new Error();
      },
    });
  };

  return (
    <Container component="div" sx={{ mb: 4 }}>
      <Paper elevation={0} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center" mb={2}>
          New Influencer
        </Typography>
        <InfluencerForm handleSubmit={handleSubmit} handleClose={handleClose} />
      </Paper>
    </Container>
  );
}
