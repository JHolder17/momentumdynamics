import React from "react";
import RaceNavbar from "./components/RaceNavbar";
import RacerProgress from "./components/RacerProgress";
import $ from "jquery";
import { Container, Row, Col, Button } from "reactstrap";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      racers: [],
      isLoaded: false,
      error: null,
      racerZeroPosition: 0,
      racerOnePosition: 0,
      racerTwoPosition: 0,
      winner: "",
    };
  }

  startRace = () => {
    //show race track
    $("#raceTrack").css("display", "block");

    //make call to api to start race and update each racers position
    var sse = new EventSource("http://localhost:3000/api/race/start");

    const getRealtimeData = (data) => {
      if (data.racerPosition[0].position > 100) {
        $("#winner").css("display", "block");
        this.setState({ winner: data.racerPosition[0].racerId });
      } else if (data.racerPosition[1].position > 100) {
        $("#winner").css("display", "block");
        this.setState({ winner: data.racerPosition[1].racerId });
      } else if (data.racerPosition[2].position > 100) {
        $("#winner").css("display", "block");
        this.setState({ winner: data.racerPosition[2].racerId });
      }
      this.setState({
        racerZeroPosition: data.racerPosition[0],
        racerOnePosition: data.racerPosition[1],
        racerTwoPosition: data.racerPosition[2],
      });
    };

    sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));

    sse.onerror = () => {
      console.log("Sorry try again :'(");
      sse.close();
    };
    return () => {
      sse.close();
    };
  };

  //Get the information on Racers
  componentDidMount() {
    fetch("http://localhost:3000/api/racers/")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          racers: json,
          isLoaded: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      isLoaded,
      racers,
      racerZeroPosition,
      racerOnePosition,
      racerTwoPosition,
      winner,
    } = this.state;
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
              <Col md="12">
                <h3>Meet your racers</h3>
                <ol>
                  {racers.map((racer) => (
                    <li key={racer.id}>{racer.name}</li>
                  ))}
                </ol>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <h4>Lets Get Ready To Race!!!</h4>
                <Button
                  color="primary"
                  size="lg"
                  block
                  onClick={() => this.startRace()}
                >
                  Start Race
                </Button>
              </Col>
            </Row>
            <div id="winner">
              <Row>
                <Col md="12">
                  <h4>The winner is {winner}!</h4>
                </Col>
              </Row>
            </div>
            <div id="raceTrack">
              <Row>
                <Col md="12">
                  <RacerProgress
                    color="success"
                    name={racerZeroPosition.racerId}
                    position={racerZeroPosition.position}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <RacerProgress
                    color="info"
                    name={racerOnePosition.racerId}
                    position={racerOnePosition.position}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <RacerProgress
                    color="warning"
                    name={racerTwoPosition.racerId}
                    position={racerTwoPosition.position}
                  />
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      );
    }
  }
}
