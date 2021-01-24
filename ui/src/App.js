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
  Switch,
  FormGroup,
  FormControlLabel,
  CircularProgress,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Skeleton } from "@material-ui/lab";

import { Sidebar } from "./Sidebar";
import ScannerAPI from "./API";

const validFilename = require("valid-filename");
let scannerInterface = ScannerAPI.initialize("1");

function App() {
  const [documentName, setDocumentName] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [useOCR, setUseOCR] = useState(true);
  const [attachDate, setAttachDate] = useState(true);
  const [scanInProgress, setScanInProgress] = useState(false);
  const [canSaveToCloud, setCanSaveToCloud] = useState(false);

  useEffect(() => {
    scannerInterface.then((data) => {
      scannerInterface = data;
    });
  }, []);

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
          Scan a document{" "}
        </Typography>
        <Box style={{ marginTop: "45px", width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} align="right">
              <Button
                style={{ width: "20%" }}
                variant="contained"
                color="primary"
                disabled={!canSaveToCloud || scanInProgress}
              >
                Publish to Cloud
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    style={{ width: "100%" }}
                    disabled={scanInProgress}
                    label="Document Name"
                    variant="outlined"
                    helperText="Must be a valid filename"
                    value={documentName}
                    onChange={(e) => {
                      setDocumentName(e.target.value);
                    }}
                    error={!validFilename(documentName)}
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    style={{ width: "100%" }}
                    disabled={scanInProgress}
                    label="Keywords Input"
                    variant="outlined"
                    helperText={
                      <Typography variant="caption">
                        Separate keywords by typing the `Enter` or `Tab` key.
                      </Typography>
                    }
                    value={currentKeyword}
                    onChange={(e) => {
                      setCurrentKeyword(e.target.value);
                    }}
                    onKeyDown={(ev) => {
                      console.log(ev.key);
                      if (ev.key === "Enter" || ev.key === "Tab") {
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
                <Grid item xs={6}>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={useOCR}
                          disabled={scanInProgress}
                          onChange={() => setUseOCR(!useOCR)}
                          name="checkedA"
                        />
                      }
                      label="Use OCR?"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={attachDate}
                          onChange={() => setAttachDate(!attachDate)}
                          name="checkedA"
                          disabled={scanInProgress}
                        />
                      }
                      label="Attach date to filename?"
                    />
                  </FormGroup>
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
                    disabled={scanInProgress}
                    style={{ width: "100%" }}
                    endIcon={
                      scanInProgress ? (
                        <CircularProgress size={20} color="white" />
                      ) : null
                    }
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      setScanInProgress(true);
                      scannerInterface
                        .scan({ title: documentName })
                        .then(
                          (data) =>
                            new Promise((resolve) =>
                              setTimeout(() => resolve(data), 2000)
                            )
                        )
                        .then((data) => {
                          console.log(data);
                          if (data.status !== "error") {
                            setScanInProgress(false);
                            setCanSaveToCloud(true);
                          }
                        });
                    }}
                  >
                    {scanInProgress ? "Scanning ..." : "Add Page"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rect" width={"100%"} height={600}></Skeleton>
              <Button
                style={{ marginTop: "15px" }}
                variant="outlined"
                color="primary"
                disabled={scanInProgress}
              >
                Preview
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
