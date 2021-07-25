import { useState, useEffect } from "react";
import {
  UpdatePlayerOneWin,
  UpdatePlayerTwoWin,
} from "./reducers/PlayerOneReducer";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const initialState = { PlayerOneName: "", PlayerTwoName: "" };
  const { PlayerOneWins, PlayerTwoWins, seconds } = useSelector(
    (state) => state.PlayerOne
  );
  const [PlayerName, SetPlayerName] = useState(initialState);
  const [sec, setSeconds] = useState(seconds);
  const [timer, settimer] = useState(null);
  const [Domchange, setDomChange] = useState(true);
  const [CurrentWinner, setCurrentWinner] = useState("");
  const [Difference, setDifference] = useState(null);

  const { PlayerOneName, PlayerTwoName } = PlayerName;
  const dispatch = useDispatch();
  let funcs = ["UpdatePlayerTwoWin", "UpdatePlayerOneWin"];

  const submitForm = (e) => {
    e.preventDefault();
    setDomChange(false);
  };

  const StopIntervale = () => {
    if (PlayerOneWins > PlayerTwoWins) {
      setDifference(PlayerOneWins - PlayerTwoWins);
      localStorage.setItem("Winner", PlayerOneName);
    } else {
      localStorage.setItem("Winner", PlayerTwoName);
      setDifference(PlayerTwoWins - PlayerOneWins);
    }
    setCurrentWinner(localStorage.getItem("Winner"));
    clearInterval(timer);
  };
  const SaveData = () => {
    setSeconds(null);
  };
  useEffect(() => {
    if (sec === 10) {
      let fucReturn = funcs[Math.floor(Math.random() * funcs.length)];
      if (fucReturn == "UpdatePlayerOneWin") {
        dispatch(UpdatePlayerOneWin());
        setSeconds(0);
      } else {
        dispatch(UpdatePlayerTwoWin());
        setSeconds(0);
      }
    }

    if (Domchange === false) {
      settimer(sec != 10 && setInterval(() => setSeconds(sec + 1), 1000));
    }

    return () => clearInterval(timer);
  }, [sec, Domchange]);

  const handalChangeInput = (e) => {
    const { name, value } = e.target;
    SetPlayerName({ ...PlayerName, [name]: value });
  };

  return (
    <div className="App">
      <div className="Tennis">
        <div className="timer">
          <h1>
            {sec}:<span>second</span>
          </h1>
        </div>
        <hr></hr>
        {Domchange ? (
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label for="PlayerOne" className="form-label">
                PlayerOne
              </label>
              <input
                type="text"
                onChange={handalChangeInput}
                name="PlayerOneName"
                className="form-control"
                value={PlayerOneName}
                id="PlayerOne"
              />
            </div>
            <div className="mb-3">
              <label for="PlayerTwo" className="form-label">
                PlayerTwo
              </label>
              <input
                onChange={handalChangeInput}
                value={PlayerTwoName}
                type="text"
                name="PlayerTwoName"
                className="form-control"
                id="PlayerTwo"
              />
            </div>

            <button type="submit" className="btn btn-outline-dark">
              Start
            </button>
          </form>
        ) : (
          <>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="Player">
                    <h1>
                      <span>PlayerName</span>:{PlayerOneName}
                    </h1>
                    <h1>{PlayerOneWins}</h1>
                  </div>
                </div>
              </div>
              <br></br>
              <hr style={{ margin: "0px" }}></hr>
              <div className="row">
                <div className="col-md-6">
                  <div className="Player">
                    <h1>
                      <span>PlayerName</span>:{PlayerTwoName}
                    </h1>
                    <h1>{PlayerTwoWins}</h1>
                  </div>
                  <hr style={{ margin: "0px" }}></hr>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <h5>Current Winner:</h5>
                </div>
                <div className="col-md-6">
                  <h5>{CurrentWinner}</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <h5>with Difference:</h5>
                </div>
                <div className="col-md-6">
                  <h5>{Difference}</h5>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <button onClick={StopIntervale} className="btn btn-dark">
                  Stop Game
                </button>
                <button onClick={SaveData} className="btn btn-success">
                  Save Data
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
