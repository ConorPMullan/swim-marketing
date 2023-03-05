import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ICampaignModal } from "../../../../interfaces/campaign";
import CampaignForm from "../campaign-form";
import useUpdateCampaignDetails from "../../../../hooks/useUpdateCampaignDetails";
import { toast } from "react-hot-toast";
import { StatusCodes } from "http-status-codes";
import useCreateCampaign from "../../../../hooks/useCreateCampaign";

export default function EditCampaignModal(props: ICampaignModal) {
  const { handleClose, selectedCampaign, modalType } = props;
  const { mutate } = useUpdateCampaignDetails();
  const { mutate: create } = useCreateCampaign();

  const handleSubmit = async (values: any) => {
    const tryit = {
      campaignId: values.campaignId || 0,
      campaignName: values.campaignName || "",
      clientId: values.clientId || 0,
      endDate: values.endDate || null,
      startDate: values.startDate || null,
      client: values.client,
      influencers: values.influencers,
    };
    if (modalType === "edit") {
      mutate(tryit, {
        onSuccess: (response) => {
          if (response.status === StatusCodes.OK) {
            toast.success("Client successfully updated");
            handleClose();
          }
        },
        onError: () => {
          toast.error("Client could not be updated");
          throw new Error();
        },
      });
    } else if (modalType === "create") {
      console.log("CREATING", tryit);
      create(tryit, {
        onSuccess: (response) => {
          if (response.status === StatusCodes.OK) {
            toast.success("Client successfully created");
            handleClose();
          }
        },
        onError: () => {
          toast.error("Client could not be created");
          throw new Error();
        },
      });
      // const createObj: ICreateClient = {
      //   client_name: clientDetails.clientName,
      //   company_name: clientDetails.companyName,
      //   email: clientDetails.emailAddress,
      //   user_id: clientDetails.users.user_id,
      // };
      // mutateCreate(createObj, {
      //   onSuccess: (response) => {
      //     if (response.status === StatusCodes.OK) {
      //       handleClose();
      //     }
      //   },
      //   onError: () => {
      //     throw new Error();
      //   },
      // });
    }
  };

  return (
    <Container component="div" sx={{ mb: 4 }}>
      <Paper elevation={0} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center" sx={{ mb: 3 }}>
          Campaign Details
        </Typography>
        <CampaignForm
          selectedCampaign={selectedCampaign}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          modalType={modalType}
        />
      </Paper>
    </Container>
  );
}
