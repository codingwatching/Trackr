import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SearchBar = ({ title, element, search, setSearch }) => {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: {
            sm: "flex",
            xs: "flex",
            md: "none",
          },
          flexGrow: 1,
        }}
      >
        {isSearching ? (
          <>
            <IconButton
              component="label"
              onClick={() => {
                setIsSearching(false);
                setSearch("");
              }}
              sx={{
                mr: 1,
                background: "#eaecf0",
                color: "black",
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="Search"
              sx={{ flexGrow: 1 }}
              size="small"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </>
        ) : (
          <>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
            >
              {title}
            </Typography>

            <IconButton
              component="label"
              onClick={() => setIsSearching(true)}
              sx={{
                mr: 1,
                color: "black",
                background: "#eaecf0",
              }}
            >
              <SearchIcon />
            </IconButton>
          </>
        )}
      </Box>

      <Box
        sx={{
          display: {
            sm: "none",
            xs: "none",
            md: "flex",
          },
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
        >
          {title}
        </Typography>

        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Search"
          sx={{ mr: 1, color: "blue" }}
          size="small"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {!isSearching && element}
    </>
  );
};

export default SearchBar;
