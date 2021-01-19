import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Chip,
  Grid,
  TextField,
  Typography,
  Container,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import React, { useState } from "react";
import "./App.css";
import { Skeleton } from "@material-ui/lab";

import { Sidebar } from "./Sidebar";

function App() {
  const [keywords, setKeywords] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState("");

  const handleChipDelete = (key) => {
    setKeywords(
      keywords.filter(function (item) {
        return item.key !== key;
      })
    );
  };

  return (
    <Box>
      <Sidebar width="120px"></Sidebar>
      <Box style={{ padding: 35, width: "calc(100% - 120px)", float: "right" }}>
        <Typography
          style={{ fontFamily: "Roboto", fontWeight: 500 }}
          variant="h6"
        >
          <FontAwesomeIcon
            size={"xs"}
            icon={faChevronRight}
            style={{ marginRight: 10 }}
          ></FontAwesomeIcon>
          Scan a document
        </Typography>
        <Box style={{ marginTop: "45px", width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    style={{ width: "100%" }}
                    label="Document Name"
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={{ width: "50%" }}
                    label="Keywords Input"
                    variant="outlined"
                    helperText={
                      <Typography variant="caption">
                        Separate keywords by typing the `Enter` key.
                      </Typography>
                    }
                    value={currentKeyword}
                    onChange={(e) => {
                      setCurrentKeyword(e.target.value);
                    }}
                    onKeyPress={(ev) => {
                      if (ev.key === "Enter") {
                        // Do code here
                        ev.preventDefault();
                        setKeywords([
                          ...keywords,
                          {
                            label: currentKeyword,
                            key: Math.random().toString(36).substring(7),
                          },
                        ]);
                        setCurrentKeyword("");
                      }
                    }}
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  {keywords.map((number) => (
                    <Chip
                      style={{ margin: 2 }}
                      color="primary"
                      onDelete={() => {
                        handleChipDelete(number.key);
                      }}
                      key={number.key}
                      label={number.label}
                    ></Chip>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    style={{ width: "100%" }}
                    variant="contained"
                    color="primary"
                  >
                    Scan Now
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="filled" style={{ width: "100%" }}>
                    <Select style={{ width: "100%" }}>
                      <MenuItem value={10}>
                        <Grid container>
                          <Grid item xs={3}>
                            <img
                              width={25}
                              src="https://ssl.gstatic.com/images/branding/product/2x/hh_drive_96dp.png"
                            ></img>
                          </Grid>
                          <Grid item xs={9}>
                            Google Drive
                          </Grid>
                        </Grid>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rect" width={"100%"} height={600}></Skeleton>
              <Container style={{ width: "100%" }}>
                <Typography style={{ textAlign: "center" }} variant="caption">
                  Scan preview will appear here.
                </Typography>
              </Container>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
