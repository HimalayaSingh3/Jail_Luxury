"use client";
import React from "react";
import TextAreaSkeleton from "./textAreaSkeleton";
import GenericBtns from "../buttons/GenericBtns";
import { Chip, Dialog, DialogActions, DialogTitle, IconButton, Paper, Stack, styled, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import CloseIcon from '@mui/icons-material/Close';

const StyledText = styled(Typography)(({ theme }) => ({
  color: theme.custom.primaryButtonFontColor,
}));

const StyledDiv = styled("div")(({ theme }) => ({
  color: theme.custom.primaryButtonFontColor,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  alignItems: "flex-start",
  padding: "1rem 0",
}));

const StyledPaper = styled(Paper)(({ theme, selected }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  color: theme.custom.primaryButtonFontColor,
  width: "100%",
  maxWidth: 500,
  border: selected ? `2px solid ${theme.palette.primary.main}` : "1px solid rgba(255, 255, 255, 0.12)",
  cursor: "pointer",
  transition: "border 0.2s ease-in-out",
  "&:hover": {
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  color: theme.custom.primaryButtonFontColor,
}));

function ChooseAddress({ savedAddresses, addressesLoading, toDeliverAddress, setToDeliverAddress }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleToDeliverAddressChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSelectAddress = (e, address) => {
    e.preventDefault();
    e.stopPropagation();
    setToDeliverAddress(address);
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: '80vh',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Select Delivery Address
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Stack spacing={2} sx={{ 
          px: 3,
          overflowY: 'auto',
          maxHeight: '60vh',
          '&::-webkit-scrollbar': { width: 8 },
          '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 2 }
        }}>
          {savedAddresses?.map((address) => (
            <StyledPaper
              key={address?.address_id}
              onClick={(e) => handleSelectAddress(e, address)}
              selected={toDeliverAddress?.address_id === address?.address_id}
            >
              <StyledChip
                label={`${address?.address_name} ${address?.is_default ? "(Default)" : ""}`}
                size="small"
              />
              <Typography variant="body2">{address?.address_line1}</Typography>
              {address?.address_line2 && (
                <Typography variant="body2">{address?.address_line2}</Typography>
              )}
              <Typography variant="body2">
                {address?.state}, {address?.country} - {address?.pincode}
              </Typography>
            </StyledPaper>
          ))}
        </Stack>

        <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
          <GenericBtns
            type="secondary"
            btnText="Add New Address"
            executableFunction={(e) => {
              e.preventDefault();
              router.push("/userContact");
            }}
            size="small"
          />
          <GenericBtns
            type="primary"
            btnText="Close"
            executableFunction={handleClose}
            size="small"
          />
        </DialogActions>
      </Dialog>

      {addressesLoading ? (
        <TextAreaSkeleton />
      ) : (
        <StyledDiv>
          <Typography variant="h6" gutterBottom>Delivery Address</Typography>
          <Typography variant="body1">
            <strong>Recipient:</strong> {toDeliverAddress?.deliver_to}
          </Typography>
          <Typography variant="body1">{toDeliverAddress?.adress_line1}</Typography>
          {toDeliverAddress?.address_line2 && (
            <Typography variant="body1">{toDeliverAddress?.adress_line2}</Typography>
          )}
          <Typography variant="body1">
            {toDeliverAddress?.state}, {toDeliverAddress?.pincode}
          </Typography>
          <Typography variant="body1">Phone: {toDeliverAddress?.phone_number}</Typography>
          
          <GenericBtns
            type="secondary"
            btnText="Change Address"
            executableFunction={handleToDeliverAddressChange}
            sx={{ mt: 2 }}
            minWidth="100%"
          />
        </StyledDiv>
      )}
    </div>
  );
}

export default ChooseAddress;