import { Box, Chip, Grid, Skeleton } from "@mui/joy";

export default function RowSkeleton() {
  return (
    <tr
      style={{
        borderBottom: "1px solid",
        // borderWidth:"90%",
        // borderCollapse: "collapse",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between", // Koristimo space-between da rasporedimo sadržaj
        alignItems: "center", // Osiguravamo da su stavke poravnate
        padding: "8px 0", // Povećavamo visinu redova za bolju vidljivost
        transition: "background-color 0.3s ease",
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
          padding: "0 12px",
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
              boxSizing: "border-box",
              alignItems: "center",
            }}
          >
            <Skeleton
              animation="wave"
              variant="circular"
              width="60%"
              height="60%"
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
      {/* <td
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
      </td> */}

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
    </tr>
  );
}
