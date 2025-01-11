// /* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useEffect, useMemo, useState } from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
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
import Checkbox from "@mui/joy/Checkbox";
import {
  debounce,
  Grid,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
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
import { fetchFilters, fetchThemesAsync, setThemesParams } from "../themeSlice";
import LoadingComponent from "../../../app/layout/LoadingComponent";

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

export default function ThemeTable() {
  const [order, setOrder] = useState<Order>("desc");
  const [selected, setSelected] = useState<readonly string[]>([]);
  //const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const themesType = searchParams.get("type");

  const { themeStatus, category, filtersLoaded, themesParams, themesLoaded } =
    useAppSelector((state) => state.theme);

  console.log(themeStatus);
  console.log(category);

  const [searchTerm, setSearchTerm] = useState(themesParams.searchTerm);

  const debouncedSearch = useMemo(
    () =>
      debounce((event: any) => {
        dispatch(setThemesParams({ searchTerm: event.target.value }));
        dispatch(fetchThemesAsync());
      }, 1000),
    [dispatch] // Zavisi samo od dispatch-ap
  );

  const allThemes = useAppSelector((state) => state.theme.themes);

  useEffect(() => {
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

  if (!filtersLoaded) return <LoadingComponent message="Učitavanje tema..." />;

  console.log({ themeStatus });
  const renderFilters = () => (
    <>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Status"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        >
          {themeStatus &&
            themeStatus.length > 0 &&
            themeStatus.map((status, index) => (
              <Option key={index} value={status}>
                {status}
              </Option>
            ))}
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Kategorija</FormLabel>
        <Select size="sm" placeholder="Kategorija">
          {category &&
            category.length > 0 &&
            category.map((cat, index) => (
              <Option key={index} value={cat}>
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
          <FormLabel>Pretraži prema ključnoj riječi</FormLabel>
          <Input
            size="sm"
            placeholder="Pretraga.."
            startDecorator={<SearchIcon />}
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
          overflow: "auto",
          minHeight: 0,
          mt: 2,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "8px",
            "--TableCell-paddingX": "12px",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "12px 12px" }}>
                <JoyLink
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  endDecorator={<ArrowDropDownIcon />}
                  sx={[
                    {
                      fontWeight: "lg",
                      "& svg": {
                        transition: "0.2s",
                        transform:
                          order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                      },
                    },
                  ]}
                >
                  {order === "asc" ? "Najstarije" : "Najnovije"}
                </JoyLink>
              </th>
              <th style={{ padding: "12px 12px" }}>Datum</th>
              <th style={{ padding: "12px 12px" }}>Status</th>
              <th style={{ padding: "12px 12px" }}>Kreator</th>
            </tr>
          </thead>
          <tbody>
            {allThemes &&
              [...allThemes].sort(getComparator(order, "id")).map((theme) => (
                <tr key={theme.id}>
                  <td>
                    <div>
                      <MuiTypo
                        component={Link}
                        to={`../forum/${theme.id}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          cursor: "pointer",
                        }}
                      >
                        {theme.title}
                      </MuiTypo>
                      <MuiTypo>{theme.description}</MuiTypo>
                    </div>
                  </td>
                  <td>
                    {/* DATUM TREBA FINO UREDITI FORMAT */}

                    <Typography level="body-xs">
                      {new Date(theme.date).toLocaleTimeString("sr-RS", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}<span style={{color:'light'}}>{"  |  "}</span>
                      {new Date(theme.date).toLocaleDateString("sr-RS", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </Typography>
                  </td>
                  <td>
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={
                        {
                          true: <CheckRoundedIcon />,
                          false: <BlockIcon />,
                        }[theme.active]
                      }
                      color={
                        {
                          true: "success",
                          false: "danger",
                        }[theme.active] as ColorPaletteProp
                      }
                    >
                      {theme.active ? "Aktivno" : "Završeno"}
                    </Chip>
                  </td>
                  <td>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <Avatar size="sm">
                        {theme.user.firstName.charAt(0).toUpperCase()}
                      </Avatar>
                      <div>
                        <Typography level="body-xs">
                          {theme.user.firstName} {theme.user.lastName}
                        </Typography>
                        <Typography level="body-xs">
                          {theme.user.email}
                        </Typography>
                      </div>
                    </Box>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Sheet>
    </>
  );
}
