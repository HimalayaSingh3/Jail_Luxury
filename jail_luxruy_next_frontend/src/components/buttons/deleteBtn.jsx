import { styled } from "@mui/material/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useRouter } from "next/navigation";
import { deleteFromUserWishlist, fetchUserWishlist } from "@/utils/API_lib";
import { Button } from "@mui/material";

// Styled Button Component
const DeleteButton = styled(Button)(({ theme }) => ({
  borderRadius: "10%",
  backgroundColor: "transparent",
  border: "none",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "none",
  cursor: "pointer",
  transitionDuration: "0.3s",
  overflow: "hidden",
  position: "relative",
  
  
  height:"40px",
  padding: "0", // Remove padding to make the container thinner
  border: `solid 0.1vh ${theme.palette.primary.main}`,
  "&:hover": {
    borderRadius: "1vh",
    transitionDuration: "0.3s",
    backgroundColor: theme.palette.error.main, // Use theme for error color
    alignItems: "center",
  },
  "& .svgIcon": {
    fontSize: "4vh",
    transitionDuration: "0.3s",
    color:theme.palette.primary.main,
  },
  "&:hover .svgIcon": {
    maxWidth: theme.typography.pxToRem(20),
    transitionDuration: "0.3s",
    transform: "translateY(60%)",
    display:"none"
  },
  "&::before": {
    position: "absolute",
    top: "-20px",
    content: '"Delete"',
    color: theme.palette.common.white, // Use theme for text color
    transitionDuration: "0.3s",
    fontSize: "10px",
    opacity: 0,
  },
  "&:hover::before": {
    fontSize: "10px",
    opacity: 1,
    transform: "translateY(30px)",
    transitionDuration: "0.3s",
  },
}));

function DeleteBtn({ item, setWishlistData , setWishlistLoading}) {
  const router = useRouter();

  const handleDeleteWishlistItem = async (productDetailsId, productId) => {
    setWishlistLoading(true)
    await deleteFromUserWishlist(productDetailsId, productId);
    const data = await fetchUserWishlist(); // Fetch updated wishlist data
    setWishlistData(data); // Update state with fetched data
    setWishlistLoading(false)
  };

  return (
    <DeleteButton
      variant="error"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleDeleteWishlistItem(item?.product_detail_id, item?.product_id);
      }}
    >
      <DeleteForeverIcon className="svgIcon" />
    </DeleteButton>
  );
}

export default DeleteBtn;