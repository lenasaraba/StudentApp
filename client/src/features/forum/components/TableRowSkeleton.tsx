import { Box, Chip, Grid, Skeleton } from "@mui/joy";

export default function TableRowSkeleton() {
  return (
    <tr
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 0",
        //height:"100%"
      }}
    >
      {/* First Column Skeleton */}
      <td
        style={{
          flex: 1,
          border: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{ height: "30%", width: "100%", margin: 1, position: "relative" }}
        >
          <Skeleton animation="wave" sx={{ position: 0 }} />
        </Box>
      </td>

      {/* Second Column Skeleton */}
      <td
        style={{
          flex: 1,
          border: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{ height: "30%", width: "100%", margin: 1, position: "relative" }}
        >
          <Skeleton animation="wave" sx={{ position: 0 }} />
        </Box>
      </td>

      {/* Third Column Skeleton */}
      <td
        style={{
          flex: 1,
          border: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{ height: "30%", width: "100%", margin: 1, position: "relative" }}
        >
          <Skeleton animation="wave" sx={{ position: 0 }} />
        </Box>
      </td>

      {/* Fourth Column Skeleton */}
      <td
        style={{
          flex: 1,
          border: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{ height: "30%", width: "100%", margin: 1, position: "relative" }}
        >
          <Skeleton animation="wave" sx={{ position: 0 }} />
        </Box>
      </td>

      {/* Fifth Column Skeleton */}
      <td
        style={{
          flex: 1,
          border: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // margin: 1,
            justifyContent: "space-around",
            width: "100%",
            position: "relative",
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: "20%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              position: "relative",
              // height: "100%",
              aspectRatio: "1", 
              // padding:"1rem 0",
              boxSizing:"border-box",
              alignItems:"center"
            }}
          >
            <Skeleton
              animation="wave"
              variant="circular"
              width="80%"
              height="80%"
              sx={{ position: 0 }}
            />
          </Box>
          <Box
            sx={{
              height: "30%",
              width: "80%",
              margin: 1,
              position: "relative",
            }}
          >
            <Skeleton animation="wave" sx={{ position: 0 }} />
          </Box>
        </Box>
      </td>
    </tr>

    // <Box
    //   component="tr"
    //   sx={{
    //     width: "100%",
    //     display: "flex",
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     alignItems: "center",
    //     padding: "8px 0",
    //   }}
    // >
    //   <Box
    //     component="td"
    //     sx={{
    //       padding: "0 12px",
    //       flex: 1,
    //       height: "fit-content",
    //       border: 0,
    //     }}
    //   >
    //     <div>
    //       <Skeleton
    //         animation="wave"
    //         height={10}
    //         width="60%"
    //         style={{ marginBottom: 1 }}
    //       />
    //       <Skeleton animation="wave" height={10} width="80%" />
    //     </div>
    //   </Box>

    //   <Box
    //     component="td"
    //     sx={{
    //       padding: "0 12px",
    //       flex: 1,
    //       height: "fit-content",
    //       border: 0,
    //     }}
    //   >
    //     <Skeleton animation="wave" height={10} width="50%" />
    //     <Skeleton animation="wave" height={10} width="40%" />
    //   </Box>

    //   <Box
    //     component="td"
    //     sx={{
    //       padding: "0 12px",
    //       flex: 1,
    //       height: "fit-content",
    //       border: 0,
    //     }}
    //   >
    //     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    //       <Skeleton variant="circular" width={20} height={20} />
    //       <Skeleton animation="wave" height={10} width="60%" />
    //     </Box>
    //   </Box>

    //   <Box
    //     component="td"
    //     sx={{
    //       padding: "0 12px",
    //       flex: 1,
    //       height: "fit-content",
    //       border: 0,
    //     }}
    //   >
    //     <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
    //       <Skeleton
    //         animation="wave"
    //         variant="circular"
    //         width={40}
    //         height={40}
    //       />
    //       <div>
    //         <Skeleton animation="wave" height={10} width="60%" />
    //         <Skeleton animation="wave" height={10} width="80%" />
    //       </div>
    //     </Box>
    //   </Box>
    // </Box>
  );
}
