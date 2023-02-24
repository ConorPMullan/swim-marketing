import styled from "styled-components";
import Paper from "@mui/material/Paper";
import { Tooltip, TooltipProps } from "@mui/material";

interface ITooltipProps extends TooltipProps {
  $isOpen: boolean;
}

export const DrawerPaper = styled(Paper)`
  && {
    background-color: transparent;
  }
`;

export const StyledTooltipContent = styled.div``;

export const StyledTooltip = styled(Tooltip)<ITooltipProps>`
  .MuiTooltip-tooltip {
    display: ${({ $isOpen }) => ($isOpen ? "none" : "block")};
    background-color: "red";
  }
`;
