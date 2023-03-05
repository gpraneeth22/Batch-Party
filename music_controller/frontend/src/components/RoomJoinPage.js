import React, { Component } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export class RoomJoinPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: "",
      error: "",
    };
    this.handleTextFieldSubmit = this.handleTextFieldSubmit.bind(this);
    this.enterRoomButtonPressed = this.enterRoomButtonPressed.bind(this);
  }

  handleTextFieldSubmit(e) {
    this.setState({
        roomCode : e.target.value
    });
  }

  enterRoomButtonPressed(){
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            code: this.state.roomCode
        })
    };
    fetch('/api/join-room', requestOptions).then((response) => {
        if (response.ok) {
            this.props.history.push(`/room/${this.state.roomCode}`);
        } else {
            this.setState({error: "Room not found"});
        }
    }).catch((err) => {
        console.error(err);
    })
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            error={this.state.error}
            label="Code"
            variant="outlined"
            placeholder="Enter a Room Code"
            helperText={this.state.error}
            value={this.state.roomCode}
            onChange={this.handleTextFieldSubmit}
          />
        </Grid>
        <Grid item xs={12} align="center" >
          <Button variant="contained" color="primary" onClick={this.enterRoomButtonPressed} >
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
}
