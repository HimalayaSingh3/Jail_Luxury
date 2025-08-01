import {
  Checkbox,
  Chip,
  FormControlLabel,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import TextAreaSkeleton from "../textAreaSkeleton";

const FilterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  textTransform: "uppercase",
  fontSize: theme.typography.pxToRem(16),
  color: theme.custom.primaryButtonFontColor,
}));

const FilterColorWrapper = styled("div")(({ theme }) => ({
  color: theme.palette.ascentColor.main,
  "&.Mui-checked": { color: theme.palette.ascentColor.main },
  display: "flex",
  flexDirection: "column",
  // Custom scrollbar styles
}));
const CheckboxWrapper = styled(Checkbox)(({ theme }) => ({
  color: theme.custom.primaryButtonFontColor,
  "&.Mui-checked": { color: theme.palette.ascentColor.main },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(1),
  width: theme.typography.pxToRem(24),
  height: theme.typography.pxToRem(24),
}));


const StyledText = styled(Typography)(({ theme }) => ({
  color: theme.custom.primaryButtonFontColor,
}));

function FilterColorComponent({
  colorArr,
  colorLoading,
  selectedFilters,
  handleCheckboxChange,
}) {
  return (
    <>
      <FilterTitle>Colours</FilterTitle>
      <FilterColorWrapper>
        {
          colorArr?.data?.map((color) => (
            <FormControlLabel
              key={"color" + color?.pk_color_id}
              control={
                <CheckboxWrapper
                  checked={selectedFilters?.color?.includes(color?.pk_color_id)}
                  onChange={() =>
                    handleCheckboxChange("color", color?.pk_color_id)
                  }
                />
              }
              label={
                <div style={{display:"flex",flexDirection:"row"}}>
                  <StyledChip
                    key={color?.color_hex}
                    sx={{ backgroundColor: `${color?.color_hex}` }}
                  />{" "}
                  <StyledText>{color?.color_name}</StyledText>
                </div>
              }
            />
          ))
       }
      </FilterColorWrapper>
    </>
  );
}

export default FilterColorComponent;
