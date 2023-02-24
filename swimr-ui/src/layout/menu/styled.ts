import styled from "styled-components";
import { Tooltip, TooltipProps } from "@mui/material";

interface ITooltipProps extends TooltipProps {
  $isOpen: boolean;
}

export const StyledTooltipContent = styled.div``;

export const StyledTooltip = styled(Tooltip)<ITooltipProps>`
  .MuiTooltip-tooltip {
    display: ${({ $isOpen }) => ($isOpen ? "none" : "block")};
    background-color: "red";
  }
`;
