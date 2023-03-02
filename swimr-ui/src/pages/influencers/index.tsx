import React, { useEffect, useState } from "react";
import {
  InfluencerDivider,
  InfluencerPanel,
  InfluencerWrapper,
} from "./styled";
import { FlexDiv } from "../clients/styled";
import {
  Button,
  Checkbox,
  Grid,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import useGetInfluencers from "../../hooks/useGetInfluencers";
import ModalComponent from "../../components/modal";
import EditInfluencerModal from "./components/influencer-modal";
import { IInfluencers } from "../../interfaces/influencer";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

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
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [tableRows, setTableRows] = useState<ITableRow[]>([]);
  const handleCreateModal = () => {
    setModalType("create");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, editable: false },
    {
      field: "influencerName",
      headerName: "Influencer Name",

      editable: true,
      flex: 1,
    },
    {
      field: "platform",
      headerName: "Platform",

      editable: true,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",

      editable: true,
      flex: 1,
    },
    {
      field: "active",
      headerName: "Is Active?",
      editable: true,
      flex: 1,
      renderCell: (params) => {
        return (
          <Checkbox
            checked={params.row.active}
            onChange={() => handleConfirmChange(params.row)}
          />
        );
      },
    },
    {
      field: "pricePerPost",
      headerName: "Price Per Post",
      editable: true,
      flex: 1,
    },
  ];

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

  const handleConfirmChange = (clickedRow: { id: number; active: boolean }) => {
    console.log("clicked", clickedRow);
    const updatedData = tableRows.map((x) => {
      if (x.id === clickedRow.id) {
        return {
          ...x,
          active: !clickedRow.active,
        };
      }
      return x;
    });
    console.log("returned", updatedData);
    setTableRows(updatedData);
  };

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
            onClick={handleCreateModal}
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
        <EditInfluencerModal handleClose={handleClose} modalType={modalType} />
      </ModalComponent>
    </InfluencerWrapper>
  );
};

export default Influencers;
