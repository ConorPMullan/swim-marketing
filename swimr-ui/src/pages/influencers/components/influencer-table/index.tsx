import { Button, Checkbox } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

export const getColumns = (
  handleConfirmChange: (values: any) => void,
  onButtonClick: (e: any, row: any) => void
): GridColDef[] => {
  return [
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
    {
      field: "actions",
      headerName: "Actions",
      editable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            onClick={(e) => onButtonClick(e, params.row)}
            variant="contained"
          >
            Delete
          </Button>
        );
      },
    },
  ];
};
