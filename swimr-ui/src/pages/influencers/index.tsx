import { useEffect, useState } from "react";
import { InfluencerWrapper } from "./styled";
import { FlexDiv } from "../clients/styled";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import useGetInfluencers from "../../hooks/useGetInfluencers";
import ModalComponent from "../../components/modal";
import EditInfluencerModal from "./components/influencer-modal";
import { IInfluencers } from "../../interfaces/influencer";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmationModal from "../../components/confirmation-modal";
import useDeleteInfluencer from "../../hooks/useDeleteInfluencer";
import { StatusCodes } from "http-status-codes";
import toast from "react-hot-toast";
import { getColumns } from "./components/influencer-table";

interface ITableRow {
  id: number;
  influencerName: string;
  platform: string;
  email: string;
  active: boolean;
  pricePerPost: string;
}
const Influencers = () => {
  const { data: influencerData, refetch } = useGetInfluencers();
  const { mutate } = useDeleteInfluencer();
  const [open, setOpen] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [tableRows, setTableRows] = useState<ITableRow[]>([]);
  const [selectedRow, setSelectedRow] = useState<number>();

  const handleClose = () => setOpen(false);

  const onButtonClick = (e: any, row: any) => {
    e.stopPropagation();
    if (row.id) {
      setSelectedRow(row.id);
      openConfirmationModal();
    }
  };

  useEffect(() => {
    const rowData = influencerData?.data.map((influencer: IInfluencers) => {
      return {
        id: influencer.influencerId,
        influencerName: influencer.influencerName,
        platform: influencer.platform.platform_name,
        email: influencer.email,
        active: influencer.isActive,
        pricePerPost: influencer.pricePerPost,
      };
    });
    setTableRows(rowData || []);
  }, [influencerData]);

  // const handleConfirmChange = (clickedRow: { id: number; active: boolean }) => {
  //   const updatedData = tableRows.map((x) => {
  //     if (x.id === clickedRow.id) {
  //       return {
  //         ...x,
  //         active: !clickedRow.active,
  //       };
  //     }
  //     return x;
  //   });
  //   setTableRows(updatedData);
  // };

  const handleDeleteModal = () => {
    if (selectedRow) {
      mutate(
        { influencerId: selectedRow },
        {
          onSuccess: (response) => {
            if (response.status === StatusCodes.OK) {
              toast.success("Influencer successfully deleted");
              refetch();
              handleClose();
            }
          },
          onError: () => {
            toast.error("Influencer could not be deleted");
            throw new Error();
          },
        }
      );
    }
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleConfirmation = () => {
    handleDeleteModal();
    handleCloseConfirmation();
  };

  const openConfirmationModal = () => {
    setOpenConfirmation(true);
  };

  const columns = getColumns(handleCloseConfirmation, onButtonClick);

  return (
    <InfluencerWrapper>
      <FlexDiv
        style={{ justifyContent: "space-between", alignItems: "flex-end" }}
      >
        <Typography variant="h4" sx={{ m: 2, mb: 0 }}>
          Influencers
        </Typography>
        <Grid sx={{ mr: 3 }}>
          <IconButton
            sx={{ backgroundColor: "#c7621e" }}
            onClick={() => setOpen(true)}
          >
            <Add />
          </IconButton>
        </Grid>
      </FlexDiv>
      <Grid container sx={{ mb: 0 }}>
        <DataGrid
          rows={tableRows}
          columns={columns}
          pageSize={7}
          checkboxSelection={false}
          disableSelectionOnClick
          autoHeight
          sx={{ background: "black", borderRadius: "10px", m: 2, mt: 1, mb: 1 }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Grid>
      <Grid sx={{ m: 2, mt: 0 }} display={"flex"} justifyContent={"flex-end"}>
        <Button
          onClick={() => {
            refetch();
          }}
        >
          RESET
        </Button>
        <Button>SAVE CHANGES</Button>
      </Grid>
      <ModalComponent open={open} handleClose={handleClose}>
        <EditInfluencerModal handleClose={handleClose} />
      </ModalComponent>
      <ConfirmationModal
        open={openConfirmation}
        handleClose={handleCloseConfirmation}
        handleConfirmation={handleConfirmation}
        textToDisplay="Are you sure you want to delete this influencer?"
      />
    </InfluencerWrapper>
  );
};

export default Influencers;
