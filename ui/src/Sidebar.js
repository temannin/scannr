import {
  faCamera,
  faSlidersH,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";

export function Sidebar(width) {
  const [darkMode, setDarkMode] = useState(false);

  const sidebarStyle = {
    width: width,
    minHeight: "100vh",
    backgroundColor: darkMode ? "black" : "#f5f6fa",
    position: "fixed",
    left: 0,
  };

  return (
    <div style={sidebarStyle}>
      <Container>
        <Grid
          style={{ marginTop: "20px" }}
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Button
              variant="outlined"
              style={{
                width: 50,
                height: 50,
                textTransform: "none",
              }}
            >
              <FontAwesomeIcon
                color={darkMode ? "white" : "black"}
                size="lg"
                icon={faCamera}
              />
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              style={{
                width: 50,
                height: 50,
                textTransform: "none",
              }}
            >
              <FontAwesomeIcon
                color={darkMode ? "white" : "black"}
                size="lg"
                icon={faSlidersH}
              />
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
