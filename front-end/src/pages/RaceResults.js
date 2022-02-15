import React from "react";
import RaceNavbar from "../components/RaceNavbar";
import { Container, Row, Col } from "reactstrap";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      raceResults: [],
      racerZeroWins: 0,
      racerOneWins: 0,
      racerTwoWins: 0,
      isLoaded: false,
      error: null,
    };
  }

  //calculate win total for each racer
  racerWinTotals = () => {
    let raceData = this.state.raceResults;
    for (var key in raceData) {
      for (var key2 in raceData[key]) {
        if (raceData[key][key2].id === "mach5") {
          this.setState((prevState) => ({
            racerZeroWins: prevState.racerZeroWins + 1,
          }));
        } else if (raceData[key][key2].id === "snakeOiler") {
          this.setState((prevState) => ({
            racerOneWins: prevState.racerOneWins + 1,
          }));
        } else if (raceData[key][key2].id === "mach4") {
          this.setState((prevState) => ({
            racerTwoWins: prevState.racerTwoWins + 1,
          }));
        }
      }
    }
  };

  //Get race results
  componentDidMount() {
    fetch("http://localhost:3000/api/winners/")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          raceResults: json,
          isLoaded: true,
        }, () => {
          this.racerWinTotals();
        });
      })
      .catch((err) => {
        console.log(err);
      });
      setTimeout(this.racerWinTotals, 0)
  }

  render() {
    const { isLoaded, raceResults, racerZeroWins, racerOneWins, racerTwoWins } =
      this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <Container>
            <Row>
              <Col md="12">
                <RaceNavbar />
              </Col>
            </Row>
            <Row>
              <Col>
                <h3 onClick={() => this.racerWinTotals()}>Leaderboard</h3>
                <ul>
                  <li>Mach 5 - {racerZeroWins}</li>
                  <li>Snake Oiler - {racerOneWins}</li>
                  <li>Mach 4 - {racerTwoWins}</li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <h3>The Amazing Race - Winners</h3>
                <ol>
                  {raceResults.map((raceResult) => (
                    <li key={raceResult.racer.raceId}>
                      <strong>Race ID:</strong> {raceResult.raceId},{" "}
                      <strong>Winner:</strong> {raceResult.racer.name}
                    </li>
                  ))}
                </ol>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}
