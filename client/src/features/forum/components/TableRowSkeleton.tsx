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
      }}
    >
      {/* First Column Skeleton */}
      <td
        style={{
          flex: 1,
          height: "30px",
          border: 0,
          width: "25%",
          padding: 0,

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Skeleton animation="wave" height={10} width="20%" />
      </td>

      {/* Second Column Skeleton */}
      <td
        style={{
          flex: 1,
          height: "30px",
          border: 0,
          width: "25%",
          padding: 0,

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Skeleton animation="wave" height={10} width="20%" />
      </td>

      {/* Third Column Skeleton */}
      <td
        style={{
          flex: 1,
          height: "30px",
          border: 0,
          width: "25%",
          padding: 0,

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Skeleton animation="wave" height={10} width="20%" />
      </td>

      {/* Fourth Column Skeleton */}
      <td
        style={{
          flex: 1,
          height: "30px",
          border: 0,
          width: "25%",
          padding: 0,

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            padding: 0,
            margin: 0,
            justifyContent: "space-around",
          }}
        >
          <Box>
            <Skeleton
              animation="wave"
              variant="circular"
              width={30}
              height={30}
            />
          </Box>

          <Box>
            {/* <Skeleton animation="wave" height={10} width="20%" /> */}
            <Skeleton animation="wave" height={10} width="15%" />
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
