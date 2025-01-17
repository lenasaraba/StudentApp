// /* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useMemo, useState } from "react";
// import { ColorPaletteProp } from "@mui/joy/styles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import { debounce, TableBody, Theme } from "@mui/material";
import { Typography as MuiTypo } from "@mui/material";

import { Link as JoyLink } from "@mui/joy";
import { Typography } from "@mui/joy";
import { Link } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  fetchFilters,
  fetchThemesAsync,
  resetThemesParams,
  setThemesParams,
} from "../themeSlice";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import TableRowSkeleton from "./TableRowSkeleton";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof never>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
interface ThemeTableProps {
  theme: Theme; // Define the 'theme' prop type
}
export default function ThemeTable({ theme }: ThemeTableProps) {
  const [order, setOrder] = useState<Order>("desc");

  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const themesType = searchParams.get("type");
  console.log("111111111111111111111111111111111111111 " + searchParams);
  const {
    themeStatus,
    category,
    filtersLoaded,
    themesParams,
    themesLoaded,
    status,
  } = useAppSelector((state) => state.theme);

  const [searchTerm, setSearchTerm] = useState(themesParams.searchTerm);
  console.log("2222222222222222222222222222222222222 " + searchTerm);

  const debouncedSearch = useMemo(
    () =>
      debounce((event: any) => {
        // console.log(
        //   "-----------------------------------------------" + event.target.value
        // );
        setSearchTerm(event.target.value);
        dispatch(setThemesParams({ searchTerm: event.target.value }));
        dispatch(fetchThemesAsync());
      }, 1000),
    [dispatch] // Zavisi samo od dispatch-ap
  );

  const allThemes = useAppSelector((state) => state.theme.themes);

  //themestype: my ili all
  useEffect(() => {
    // console.log(themesType);
    dispatch(setThemesParams({ type: themesType }));
    dispatch(fetchThemesAsync());
  }, [themesType, dispatch]);

  const user = useAppSelector((state) => state.account.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (themesType === "my" && !user) {
      navigate("/login");
    }
  }, [user, themesType, navigate]);

  useEffect(() => {
    if (!themesLoaded) dispatch(fetchThemesAsync());
  }, [themesLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  useEffect(() => {
    return () => {
      debouncedSearch.clear();
    };
  }, [debouncedSearch]);

  console.log(
    "444444444444444444444444444444444444444444444 " + themesParams.searchTerm,
    themesParams.category
  );
  // console.log(filtersLoaded)
  if (!filtersLoaded) return <LoadingComponent message="Učitavanje tema..." />;

  // if (themeStatus.includes("pending") || !themesLoaded)
  // return <TableRowSkeleton />;
  // console.log({ themeStatus });
  const renderFilters = () => (
    <>
      <FormControl size="sm">
        <FormLabel sx={{ color: theme.palette.primary.main }}>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Status"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
          onChange={(event, value) => {
            // console.log("Selected value:", value);
            dispatch(setThemesParams({ themeStatus: value }));
            dispatch(fetchThemesAsync());
          }}
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.background.default,
            color: theme.palette.primary.main,

            "&:hover": {
              backgroundColor: theme.palette.action.hover, // Hover effect on the select button
            },
            "&.Mui-focused": {
              borderColor: theme.palette.primary.main, // Focus state for the select component
            },
          }}
        >
          {themeStatus &&
            themeStatus.length > 0 &&
            themeStatus.map((status, index) => (
              <Option
                key={index}
                value={status}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.primary.main,
                }}
              >
                {status}
              </Option>
            ))}
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel sx={{ color: theme.palette.primary.main }}>
          Kategorija
        </FormLabel>
        <Select
          size="sm"
          placeholder="Kategorija"
          onChange={(event, value) => {
            console.log("Selected category:", value);
            dispatch(setThemesParams({ category: value }));
            dispatch(fetchThemesAsync());
          }}
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.background.default,
            color: theme.palette.primary.main,

            "&:hover": {
              backgroundColor: theme.palette.action.hover, // Hover effect on the select button
            },
            "&.Mui-focused": {
              borderColor: theme.palette.primary.main, // Focus state for the select component
            },
          }}
          //ne znam sta je
          slotProps={{
            listbox: {
              sx: {
                maxHeight: "300px",
                color: "red",
              },
            },
          }}
        >
          {category &&
            category.length > 0 &&
            category.map((cat, index) => (
              <Option
                key={index}
                value={cat}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.primary.main,
                  //ne radi
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                {cat}
              </Option>
            ))}
        </Select>
      </FormControl>
    </>
  );
  return (
    <>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 0,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel sx={{ color: theme.palette.primary.main }}>
            Pretraži prema ključnoj riječi
          </FormLabel>
          <Input
            size="sm"
            placeholder="Pretraga.."
            startDecorator={<SearchIcon />}
            onChange={(event: any) => {
              setSearchTerm(event.target.value);
              debouncedSearch(event);
            }}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderColor: theme.palette.background.default,
              color: theme.palette.primary.main,
            }}
          />
        </FormControl>
        {renderFilters()}
      </Box>

      <Sheet
        className="ThemesContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          // overflow: "auto",
          minHeight: 0,
          mt: 2,
          borderColor: theme.palette.background.paper,
          backgroundColor: "transparent",
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground": theme.palette.background.paper,
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground": theme.palette.action.focus,
            "--TableCell-paddingY": "8px",
            "--TableCell-paddingX": "12px",
            backgroundColor: theme.palette.background.paper,
            display: "block",
            tableLayout: "fixed", // Dodajemo fixed layout za preciznije pozicioniranje
            width: "100%",
          }}
        >
          <thead style={{ width: "100%", display: "flex" }}>
            <tr
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between", // Koristimo space-between da rasporedimo sadržaj
                alignItems: "center", // Osiguravamo da su stavke poravnate
              }}
            >
              <th style={{ width: "25%", flex: 1 }}>
                <JoyLink
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    fontWeight: "lg",
                    "& svg": {
                      transition: "0.2s",
                      transform:
                        order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                    },
                    color: theme.palette.primary.main,
                  }}
                >
                  {order === "asc" ? "Najstarije" : "Najnovije"}
                </JoyLink>
              </th>
              <th
                style={{
                  // padding: "12px 12px",
                  color: theme.palette.primary.main,
                  // width: "25%",
                  flex: 1,
                }}
              >
                Datum
              </th>
              <th
                style={{
                  color: theme.palette.primary.main,
                  //  width: "25%",
                  flex: 1,
                }}
              >
                Kategorija
              </th>
              <th
                style={{
                  // padding: "12px 12px",
                  color: theme.palette.primary.main,
                  // width: "25%",
                  flex: 1,
                }}
              >
                Status
              </th>
              <th
                style={{
                  color: theme.palette.primary.main,
                  // width: "25%",
                  flex: 1,
                }}
              >
                Kreator
              </th>
            </tr>
          </thead>
          <TableBody
            sx={{
              maxHeight: "50vh",
              overflowY: "auto",
              backgroundColor: theme.palette.background.default,
              display: "block",
              width: "100%",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: theme.palette.background.paper, // Boja skrola
                borderRadius: "8px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: theme.palette.primary.dark, // Boja hvataljke na hover
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent", // Prozirna pozadina skrola
              },
            }}
          >
            {status.includes("pending") || !themesLoaded ? (
              <TableRowSkeleton />
            ) : (
              allThemes &&
              [...allThemes].sort(getComparator(order, "id")).map((theme1) => (
                <tr
                  key={theme1.id}
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between", // Koristimo space-between da rasporedimo sadržaj
                    alignItems: "center", // Osiguravamo da su stavke poravnate
                    padding: "8px 0", // Povećavamo visinu redova za bolju vidljivost
                    transition: "background-color 0.3s ease", // Efekat prelaza boje
                    // "&:hover": {
                    //   backgroundColor: "#f0f0f0", // Pozadina na hover (možeš promeniti boju)
                    // },
                  }}
                >
                  <td
                    style={{
                      padding: "0 12px",
                      flex: 1,
                      height: "fit-content",
                      border: 0,
                    }}
                  >
                    <div>
                      <MuiTypo
                        component={Link}
                        to={`../forum/${theme1.id}`}
                        sx={{
                          textDecoration: "none",
                          color: theme.palette.action.active,
                          cursor: "pointer",
                          overflow: "hidden", // Sakriva sadržaj koji prelazi kontejner
                          display: "-webkit-box", // Neophodno za multi-line truncation
                          WebkitBoxOrient: "vertical", // Omogućava višelinijski prikaz
                          WebkitLineClamp: 1, // Maksimalan broj linija (menjajte po potrebi)
                          lineHeight: "1", // Podešava razmak između linija
                          height: "1em", // Fiksna visina: broj linija * lineHeight
                          textOverflow: "ellipsis", // Dodaje tri tačke
                          fontWeight: "normal", // Normalna težina teksta inicijalno
                          "&:hover": {
                            color: theme.palette.primary.main, // Boja za hover stanje
                            fontWeight: "bold", // Boldovanje na hover
                          },
                        }}
                      >
                        {theme1.title}
                      </MuiTypo>
                      <MuiTypo
                        sx={{
                          color: theme.palette.action.active,
                          overflow: "hidden", // Sakriva sadržaj koji prelazi kontejner
                          display: "-webkit-box", // Neophodno za multi-line truncation
                          WebkitBoxOrient: "vertical", // Omogućava višelinijski prikaz
                          WebkitLineClamp: 1, // Maksimalan broj linija (menjajte po potrebi)
                          lineHeight: "1", // Podešava razmak između linija
                          height: "1em", // Fiksna visina: broj linija * lineHeight
                          textOverflow: "ellipsis", // Dodaje tri tačke
                        }}
                      >
                        {theme1.description}
                      </MuiTypo>
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "0 12px",
                      flex: 1,
                      height: "fit-content",
                      border: 0,
                    }}
                  >
                    <Typography
                      level="body-xs"
                      sx={{
                        color: theme.palette.action.active,
                      }}
                    >
                      {new Date(theme1.date).toLocaleTimeString("sr-RS", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                      <span style={{ color: "light" }}>{"  |  "}</span>
                      {new Date(theme1.date).toLocaleDateString("sr-RS", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </Typography>
                  </td>
                  <td
                    style={{
                      padding: "0 12px",
                      flex: 1,
                      height: "fit-content",
                      border: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        color: theme.palette.action.active,
                      }}
                    >
                      {" "}
                      {theme1.course != null
                        ? theme1.course.name
                        : "Slobodna tema"}
                    </Typography>
                  </td>
                  <td
                    style={{
                      padding: "0 12px",
                      flex: 1,
                      height: "fit-content",
                      border: 0,
                    }}
                  >
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={
                        {
                          true: <CheckRoundedIcon />,
                          false: <BlockIcon />,
                        }[theme1.active]
                      }
                      sx={{
                        backgroundColor: theme1.active
                          ? theme.palette.text.primaryChannel
                          : theme.palette.text.secondaryChannel, // Prilagođene boje
                        color: "#fff", // Tekst u beloj boji
                        borderRadius: "16px", // Primer prilagođenog oblika
                      }}
                    >
                      {theme1.active ? "Aktivno" : "Zatvoreno"}
                    </Chip>
                  </td>
                  <td
                    style={{
                      padding: "0 12px",
                      flex: 1,
                      height: "fit-content",
                      border: 0,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <Avatar
                        size="sm"
                        sx={{ bgcolor: theme.palette.primary.main }}
                      >
                        {theme1.user.firstName.charAt(0).toUpperCase()}
                      </Avatar>
                      <div>
                        <Typography
                          level="body-xs"
                          sx={{
                            color: theme.palette.action.active,
                          }}
                        >
                          {theme1.user.firstName} {theme1.user.lastName}
                        </Typography>
                        <Typography
                          level="body-xs"
                          sx={{
                            color: theme.palette.action.active,
                          }}
                        >
                          {theme1.user.email}
                        </Typography>
                      </div>
                    </Box>
                  </td>
                </tr>
              ))
            )}
          </TableBody>
        </Table>
      </Sheet>
    </>
  );
}
