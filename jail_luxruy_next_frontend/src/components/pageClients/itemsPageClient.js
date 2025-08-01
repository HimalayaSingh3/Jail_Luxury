"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Grid, useMediaQuery, useTheme, styled } from "@mui/material";
import GridWrapper from "@/components/wrappers/GridWrapper";
import SortFilterComponent from "@/components/wrappers/sortFilterComponent";
import SortFilterComponentMobile from "@/components/wrappers/SortFilterComponentMobile";
import FilterWrapper from "@/components/wrappers/FilterWrapper";
import FilterDrawerMobile from "@/components/wrappers/FilterDrawerMobile";
import PaginationComponent from "@/components/paginationComponent/pagination";
import { usePathname } from "next/navigation";
import { debounce } from "lodash";
import TruckLoader from "../loaders/truckLoader";
import ThreeDotLoader from "../loaders/threeDotLoader";

// Styled Components
const PageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: "100vw",
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
}));

const ContentContainer = styled("div")(({ theme, isMobileOrTablet }) => ({
  display: "flex",
  flexDirection: isMobileOrTablet ? "column" : "row",
  width: "90vw",
  margin: "0 5vw",
  flexGrow: 1,
  padding: theme.spacing(2),
  
}));

const PageHeaderComp = styled("div")(({ theme, isMobileOrTablet }) => ({
  width: "100%",
  backgroundColor: theme.custom.banner,
  color: theme.typography.color,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  fontSize: theme.typography.pxToRem(60),
  fontFamily: "aboreto",
}));

const MainContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  flexGrow: 1,
  gap: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.secondary.main}`,
}));

export default function ItemsPageClient({
  ItemsData,
  initialFilters,
  initialPage,
  sizeFilterArr,
  allColors,
  userInput,
  initialSortBy,
  initialSortOrder,
  sortConfigArr
}) {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);
  const [itemsArr, setItemsArr] = useState(ItemsData?.data);
  const [page, setPage] = useState(initialPage);
  const [sortDetail, setSortDetail] = useState({
    sortBy: initialSortBy || "",
    sortOrder: initialSortOrder || "",
  });
  const [sortBy, setSortBy] = useState(initialSortBy || "Sort By");
  const [gridLoading, setGridLoading] = useState(false);

  useEffect(() => {
    setGridLoading(ItemsData?.loading);
  }, [ItemsData?.loading]);

  const createQueryString = useCallback(
    (filters, page, sortBy, sortOrder) => {
      const params = [];
      if (userInput) params.push(`userInput=${userInput}`);
      if (page) params.push(`page=${page}`);
      if (filters.gender) params.push(`gender=${filters.gender}`);
      if (filters.size?.length) params.push(`size=${filters.size.join(",")}`);
      if (filters.color?.length)
        params.push(`color=${filters.color.join(",")}`);
      if (filters?.price?.length)
        params.push(`price=${filters?.price.join(",")}`);
      if (sortBy) params.push(`sortBy=${sortBy}`);
      if (sortOrder) params.push(`sortOrder=${sortOrder}`);
      return params.join("&");
    },
    [userInput]
  );

   const useDeviceType = () => {
      const isTouchDevice = useMediaQuery('(hover: none) and (pointer: coarse)');
      const isIpadPro = useMediaQuery(
        '(min-width: 1024px) and (max-width: 1366px) and (orientation: portrait), (min-width: 1366px) and (max-width: 1024px) and (orientation: landscape)'
      );
  
      if (isIpadPro) {
        return 'touch';
      }
  
      return isTouchDevice ? 'touch' : 'pc';
    };
    const deviceType = useDeviceType();

  const updateFilters = useCallback(
    debounce((newFilters, newPage, sortBy, sortOrder) => {
      const queryString = createQueryString(
        newFilters,
        newPage,
        sortBy,
        sortOrder
      );
      router.push(`${pathname}?${queryString}`);
    }, 300),
    [pathname, createQueryString]
  );

  const onApplyFilters = (newFilters) => {
    setGridLoading(true);
    setSelectedFilters(newFilters);
    setPage(1);
    updateFilters(newFilters, 1, sortDetail.sortBy, sortDetail.sortOrder);
  };

  const onClearFilters = () => {
    console.log("onClearFilter ran")
    setGridLoading(true);
    const clearedFilters = {
      gender: "",
      size: [],
      color: [],
      price: [0, 10000],
    };
    setSelectedFilters(clearedFilters);
    setPage(1);
    setSortBy("Sort By");
    setSortDetail({ sortBy: "", sortOrder: "" });
    updateFilters(clearedFilters, 1, "", "");
  };

  const handlePageChange = (newPage) => {
    console.log("itemsPageClient 2", sortDetail.sortBy, sortDetail.sortOrder);
    setPage(newPage);
    updateFilters(
      selectedFilters,
      newPage,
      sortDetail.sortBy,
      sortDetail.sortOrder
    );
  };

  const handleSortChange = useCallback((value, sortBy, sortOrder) => {
    console.log("handleSortChange ran",value, sortBy, sortOrder)
    setGridLoading(true);
    if (value) {
      setSortBy(value); // Update the selected sorting option
    }
    updateFilters(selectedFilters, page, sortBy, sortOrder);
  }, [sortBy]);

  
  useEffect(() => {
    setSelectedFilters(initialFilters);
    setPage(initialPage);
    setItemsArr(ItemsData?.data);
    setGridLoading(false);
  }, [initialFilters, initialPage, ItemsData]);

  const cardName = pathname.split("/").pop();

  return (
    <PageContainer>
      {cardName && <PageHeaderComp>{cardName.toUpperCase()}</PageHeaderComp>}
      <ContentContainer isMobileOrTablet={isMobileOrTablet}>
        {deviceType === 'touch' ? (
          <FilterDrawerMobile
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            setShowFilters={setShowFilters}
            showFilters={showFilters}
            sizeFilterArr={sizeFilterArr}
            allColors={allColors}
            onApplyFilters={onApplyFilters}
            onClearFilters={onClearFilters}
          />
        ) : (
          <FilterWrapper
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            sizeFilterArr={sizeFilterArr}
            allColors={allColors}
            onApplyFilters={onApplyFilters}
            onClearFilters={onClearFilters}
          />
        )}

        <MainContent>
          {deviceType === 'touch' ? (
            <SortFilterComponentMobile
              setShowFilters={setShowFilters}
              setSortDetail={setSortDetail}
              sortBy={sortBy}
              setSortBy={setSortBy}
              handleSortChange={handleSortChange}
              sortConfigArr={sortConfigArr}
            />
          ) : (
            <SortFilterComponent
              setShowFilters={setShowFilters}
              setSortDetail={setSortDetail}
              sortBy={sortBy}
              setSortBy={setSortBy}
              handleSortChange={handleSortChange}
              sortConfigArr={sortConfigArr}
            />
          )}
          {gridLoading ? (
            <div style={{minHeight:"70%", display:"flex",justifyContent:"center",alignItems:"center"}}>  <ThreeDotLoader/></div>
          
          ) : (
            <GridWrapper
              itemsArr={itemsArr}
              type="Product"
              loading={ItemsData?.loading}
            />
          )}
          <PaginationComponent
            page={page}
            setPage={handlePageChange}
            totalPages={ItemsData?.totalPages}
          />
        </MainContent>
      </ContentContainer>
    </PageContainer>
  );
}
