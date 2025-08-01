

"use client";

import {
  Box,
  IconButton,
  Typography,
  styled,
  Skeleton,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import RemoveIcon from "@mui/icons-material/Remove";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import TruncatedText from "@/components/wrappers/TruncatedText";
import { addToCart } from "@/utils/API_lib";
import { useCallback, useState } from "react";
import NoDataComponent from "@/components/wrappers/noDataComponent";
import ChevronDownIcon from "@mui/icons-material/ExpandMore";

// Styled Components (keep the same)
const CartRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(150px, 2fr) repeat(4, minmax(80px, 1fr)) 40px",
  alignItems: "center",
  
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: "#f5f5f5",
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(5, 2fr) 40px",
    minWidth: "80vw",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(3, 2fr) 40px",
    "& > :nth-of-type(3), & > :nth-of-type(5)": { display: "none" },
  },
}));

const ProductImage = styled(Box)(({ theme }) => ({
  width: "20vh",
  height: "20vh",
  aspectRatio: "1/1",
  
  backgroundColor: "#fff",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    width: "23vw",
    height: "12vh",
  },
}));

const SizeBox = styled(Box)(({ theme }) => ({
  width: 60,
  border: "1px solid #ddd",
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
  overflow: "hidden", // Prevents content from overflowing
  whiteSpace: "nowrap", // Prevents text from wrapping
  textOverflow: "ellipsis", // Adds ellipsis if text overflows
  padding: theme.spacing(0.5), // Adds padding to ensure content doesn't touch the edges
  [theme.breakpoints.down("sm")]: {
    width: 40, 
    marginLeft: "2rem",
  },
  [theme.breakpoints.down("lg")]: {
    width: 50, 
    marginLeft: "2rem",
  },
  [theme.breakpoints.down("md")]: {
    width: 40, 
    marginLeft: "2rem",
  },
}));


const HeaderText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem",
  },
  color: theme.custom.primaryButtonFontColor,
}));

const ResponsiveBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  flexDirection: "row",
}));

const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "8px",
}));

const NumberControl = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor:"white",
  [theme.breakpoints.down("sm")]: {
    marginLeft:"3rem",
  },[theme.breakpoints.down("md")]: {
    marginLeft:"3rem",
  },
  [theme.breakpoints.down("lg")]: {
    marginLeft:"3rem",
  },



}));

const NumberQuantity = styled("input")(({ theme }) => ({
  padding: "0.25rem",
  border: "0",
  width: theme.typography.pxToRem(50),
  textAlign: "center",
  borderTop: theme.palette.ascentColor.main,
  borderBottom: theme.palette.ascentColor.main,
  "-moz-appearance": "textfield",
  "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  [theme.breakpoints.down("sm")]: {
    width: theme.typography.pxToRem(15),
    
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: "transparent",
  
  boxShadow: "none",
  "&:before": {
    display: "none",
  },
  margin: 1,
  width: "100%",
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  minHeight: "auto",
  marginTop:"1rem",
  padding: 0,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
  
  "& .MuiAccordionSummary-content": {
    margin: 0,
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: theme.custom.primaryButtonFontColor,
  },
}));

const AccordionDetailsStyled = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));
const productName = styled(Typography)(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: "15vw",
  fontSize: "7vh",
  lineHeight: 1.2,
  fontWeight: 500,
  color: theme.palette.text.primary,
  transition: "all 0.3s ease",

  // Responsive adjustments
  [theme.breakpoints.down("lg")]: {
    maxWidth: "20vw",
    fontSize: "6vh",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "25vw",
    fontSize: "5vh",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "30vw",
    fontSize: "4vh",
    whiteSpace: "normal", // Allow text to wrap on small screens
    display: "-webkit-box",
    WebkitLineClamp: 2, // Limit to 2 lines
    WebkitBoxOrient: "vertical",
  },
  [theme.breakpoints.down("xs")]: {
    maxWidth: "40vw",
    fontSize: "3vh",
    WebkitLineClamp: 1, // Limit to 1 line on extra small screens
  },
}));

export default function CartComponent({
  item,
  handleDeleteFromCart,
  fetchData,
  loading,
  setLoading,
}) {
  const router = useRouter();
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Device detection
  const useDeviceType = () => {
    const isTouchDevice = useMediaQuery("(hover: none) and (pointer: coarse)");
    const isIpadPro = useMediaQuery(
      "(min-width: 1024px) and (max-width: 1366px) and (orientation: portrait), (min-width: 1366px) and (max-width: 1024px) and (orientation: landscape)"
    );

    if (isIpadPro) {
      return "touch";
    }

    return isTouchDevice ? "touch" : "pc";
  };

  const deviceType = useDeviceType();
  const isGlobalLoading = loading || deleteLoading !== null;

  // Accordion toggle handler
  const handleAccordionToggle = (panelId) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panelId : null);
  };

  // Quantity change handler
  const handleQuantityChange = useCallback(
    async (productId, productDetailId, delta) => {
      if (isGlobalLoading) return;
      setLoading(true);
      try {
        await addToCart(productDetailId, productId, delta);
        await fetchData();
      } catch (error) {
        console.error("Error updating cart:", error);
      } finally {
        setLoading(false);
      }
    },
    [isGlobalLoading, fetchData]
  );

  // Delete handler
  const handleDelete = useCallback(
    async (productDetailId, productId) => {
      if (isGlobalLoading) return;
      setDeleteLoading(productDetailId);
      try {
        await handleDeleteFromCart(productDetailId, productId);
        await fetchData();
      } catch (error) {
        console.error("Error deleting item:", error);
      } finally {
        setDeleteLoading(null);
      }
    },
    [isGlobalLoading, handleDeleteFromCart, fetchData]
  );

  // Mobile Accordion Component
  const MobileAccordionItem = useCallback(
    ({ item }) => {
      const panelId = item?.product_details?.products_details_id;

      return (
        <StyledAccordion
          expanded={expandedAccordion === panelId}
          onChange={handleAccordionToggle(panelId)}
        >
          <StyledAccordionSummary
            expandIcon={<ChevronDownIcon />}
            aria-controls={`${panelId}-content`}
            id={`${panelId}-header`}
          >
            <ResponsiveBox sx={{ gap: 1, flexDirection: "column" }}>
              <ProductImage>
                {isGlobalLoading ? (
                  <Skeleton variant="rectangular" width="100%" height="100%" />
                ) : (
                  <Image
                    src={item?.gallery_details?.gallary?.images[0]}
                    alt={item?.product_details?.product_name}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      router.push(
                        `/item/${item?.product_details?.product_name}?pid=${item?.product_details?.product_id}&pdid=${item?.product_details?.products_details_id}`
                      );
                    }}
                  />
                )}
              </ProductImage>
              {isGlobalLoading ? (
                <Skeleton variant="text" width="80%" height={24} />
              ) : (
                <TruncatedText className="productName">
                  {item?.product_details?.product_name || "No Name"}
                </TruncatedText>
              )}
            </ResponsiveBox>

            <ResponsiveBox>
              {isGlobalLoading ? (
                <Skeleton variant="rectangular" width={32} height={32} />
              ) : (
                <SizeBox>
                  <Typography fontSize={10} sx={{ whiteSpace: "normal", wordWrap: "break-word", textAlign: "center" }}>
                    {item?.size_details?.size_name}
                  </Typography>
                </SizeBox>
              )}
            </ResponsiveBox>

            <ResponsiveBox>
              <NumberControl>
                {isGlobalLoading ? (
                  <Skeleton variant="rectangular" width={20} height={20} />
                ) : (
                  <IconButton
                    size="small"
                    disabled={item?.cart_details?.quantity <= 1 || isGlobalLoading}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleQuantityChange(
                        item?.product_details?.product_id,
                        item?.product_details?.products_details_id,
                        -1
                      );
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                )}
                {isGlobalLoading ? (
                  <Skeleton variant="rectangular" width={50} height={32} />
                ) : (
                  <NumberQuantity
                    type="number"
                    name="number"
                    value={item?.cart_details?.quantity}
                    readOnly
                  />
                )}
                {isGlobalLoading ? (
                  <Skeleton variant="rectangular" width={20} height={20} />
                ) : (
                  <IconButton
                    size="small"
                    disabled={isGlobalLoading}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleQuantityChange(
                        item?.product_details?.product_id,
                        item?.product_details?.products_details_id,
                        1
                      );
                    }}
                  >
                    <AddOutlinedIcon />
                  </IconButton>
                )}
              </NumberControl>
            </ResponsiveBox>
          </StyledAccordionSummary>

          <AccordionDetailsStyled>
            <ResponsiveBox>
              {isGlobalLoading ? (
                <Skeleton variant="text" width={50} height={24} />
              ) : (
                <>
                  <Typography variant="h6">Product Price</Typography>
                  <Typography variant="h6">
                    ₹{item?.product_details?.product_price_inr}
                  </Typography>
                </>
              )}
            </ResponsiveBox>
            <ResponsiveBox>
              {isGlobalLoading ? (
                <Skeleton variant="text" width={50} height={24} />
              ) : (
                <>
                  <Typography variant="h6">Subtotal: </Typography>
                  <Typography variant="h6">
                    ₹
                    {(
                      item?.product_details?.product_price_inr *
                      item?.cart_details?.quantity
                    )?.toFixed(2)}
                  </Typography>
                </>
              )}
            </ResponsiveBox>

            <ResponsiveBox>
              {isGlobalLoading ? (
                <Skeleton variant="circular" width={32} height={32} />
              ) : (
                <IconButton
                  size="small"
                  disabled={isGlobalLoading}
                  onClick={(e) =>
                    handleDelete(
                      item?.product_details?.products_details_id,
                      item?.product_details?.product_id
                    )
                  }
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </ResponsiveBox>
          </AccordionDetailsStyled>
        </StyledAccordion>
      );
    },
    [expandedAccordion, isGlobalLoading, handleQuantityChange, handleDelete]
  );

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", p: 0 }}>
      {deviceType === "pc" ? (
        <>
          <CartRow sx={{ backgroundColor: "transparent", mb: 2 }}>
            <HeaderText>Product</HeaderText>
            <HeaderText>Size</HeaderText>
            <HeaderText>Price</HeaderText>
            <HeaderText>Quantity</HeaderText>
            <HeaderText>Subtotal</HeaderText>
            <div />
          </CartRow>

          {item?.map((i) => {
            const isDeleteLoading =
              deleteLoading === i?.product_details?.products_details_id;

            return (
              <CartRow key={i?.product_details?.products_details_id}>
              <ResponsiveBox sx={{ gap: 1, flexDirection: "column" }}>
                <ProductImage>
                  {isGlobalLoading ? (
                    <Skeleton variant="rectangular" width="100%" height="100%" />
                  ) : (
                    <Image
                      src={i?.gallery_details?.gallary?.images[0]}
                      alt={i?.product_details?.product_name}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        router.push(
                          `/item/${i?.product_details?.product_name}?pid=${i?.product_details?.product_id}&pdid=${i?.product_details?.products_details_id}`
                        );
                      }}
                    />
                  )}
                </ProductImage>
                {isGlobalLoading ? (
                  <Skeleton variant="text" width="80%" height={24} />
                ) : (
                  <TruncatedText maxWidth="90%" fontSize="0.5vh">
                    {i?.product_details?.product_name || "No Name"}
                  </TruncatedText>
                )}
              </ResponsiveBox>

              <ResponsiveBox>
                {isGlobalLoading ? (
                  <Skeleton variant="rectangular" width={32} height={32} />
                ) : (
                  <SizeBox>
                    <Typography variant="h6">
                      {i?.size_details?.size_name}
                    </Typography>
                  </SizeBox>
                )}
              </ResponsiveBox>

              <ResponsiveBox>
                {isGlobalLoading ? (
                  <Skeleton variant="text" width={50} height={24} />
                ) : (
                  <Typography variant="h6">
                    ₹{i?.product_details?.product_price_inr}
                  </Typography>
                )}
              </ResponsiveBox>

              <ResponsiveBox>
                <NumberControl>
                  {isGlobalLoading ? (
                    <Skeleton variant="rectangular" width={20} height={20} />
                  ) : (
                    <IconButton
                      size="small"
                      disabled={i?.cart_details?.quantity <= 1 || isGlobalLoading}
                      onClick={() =>
                        handleQuantityChange(
                          i?.product_details?.product_id,
                          i?.product_details?.products_details_id,
                          -1
                        )
                      }
                    >
                      <RemoveIcon />
                    </IconButton>
                  )}
                  {isGlobalLoading ? (
                    <Skeleton variant="rectangular" width={50} height={32} />
                  ) : (
                    <NumberQuantity
                      type="number"
                      name="number"
                      value={i?.cart_details?.quantity}
                      readOnly
                    />
                  )}
                  {isGlobalLoading ? (
                    <Skeleton variant="rectangular" width={20} height={20} />
                  ) : (
                    <IconButton
                      size="small"
                      disabled={isGlobalLoading}
                      onClick={() =>
                        handleQuantityChange(
                          i?.product_details?.product_id,
                          i?.product_details?.products_details_id,
                          1
                        )
                      }
                    >
                      <AddOutlinedIcon />
                    </IconButton>
                  )}
                </NumberControl>
              </ResponsiveBox>

              <ResponsiveBox>
                {isGlobalLoading ? (
                  <Skeleton variant="text" width={50} height={24} />
                ) : (
                  <Typography variant="h6">
                  ₹
                    {(
                      i?.product_details?.product_price_inr *
                      i?.cart_details?.quantity
                    )?.toFixed(2)}
                  </Typography>
                )}
              </ResponsiveBox>

              <ResponsiveBox>
                {isGlobalLoading ? (
                  <Skeleton variant="circular" width={32} height={32} />
                ) : (
                  <IconButton
                    size="small"
                    disabled={isGlobalLoading}
                    onClick={(e) =>
                      handleDelete(
                        i?.product_details?.products_details_id,
                        i?.product_details?.product_id
                      )
                    }
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </ResponsiveBox>
            </CartRow>
            );
          })}

          {item?.length === 0 && <NoDataComponent />}
        </>
      ) : (
        <>
          {item?.map((i) => (
            <MobileAccordionItem
              key={i?.product_details?.products_details_id}
              item={i}
            />
          ))}
        </>
      )}
    </Box>
  );
}