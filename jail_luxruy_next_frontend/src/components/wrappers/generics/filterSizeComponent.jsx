import { Chip, styled, Typography } from "@mui/material";
import React, { useCallback } from "react";

const FilterTitle = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: theme.typography.pxToRem(16),
    color: theme.custom.primaryButtonFontColor,
}));

const FilterWrapper = styled("div")(({ theme }) => ({
  marginTop:"1vh",
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(1),
  flexWrap:"wrap"
}));



const StyledChip = styled(Chip)(({ theme }) => ({
  color:theme.custom.primaryButtonFontColor,
  fontSize: theme.typography.pxToRem(14),
  fontWeight: "bold",
  borderRadius: "1vh", // Ensures a circular shape
  maxWidth: theme.typography.pxToRem(200),
  height: theme.typography.pxToRem(40),
  minWidth: theme.typography.pxToRem(70), // Prevents shrinking
  minHeight: theme.typography.pxToRem(40),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  overflow: "hidden", // Ensures no content overflows
  whiteSpace: "nowrap", // Prevents text from breaking
  backgroundColor: "transperant",
  '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
  },
}));


const FilterSizeComponent = React.memo(({ sizeArr = [], selectedFilters = {}, handleCheckboxChange }) => {
    const handleClick = useCallback((sizeId) => {
        handleCheckboxChange("size", sizeId);
    }, [handleCheckboxChange]);

    return (
        <>
            <FilterTitle>Size</FilterTitle>
            <FilterWrapper>
                {sizeArr.data.map((size) => (
                    <StyledChip
                        key={size.pk_size_id}
                        label={size.size_name}
                        onClick={() => handleClick(size.pk_size_id)}
                        className={selectedFilters.size?.includes(size.pk_size_id) ? "Mui-selected" : ""}
                    />
                ))}
            </FilterWrapper>
        </>
    );
});


export default FilterSizeComponent;
