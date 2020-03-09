import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Matches from "./Matches";
import "./App.css";

const LOAD_CRIC = gql`
  query getSchedule($type: String!, $status: String!, $page: Int!) {
    schedule(type: $type, status: $status, page: $page) {
      matchID
      seriesName
      homeTeamName
      awayTeamName
      matchNumber
      startDate
      venue
      matchScore {
        teamID
        teamShortName
      }
    }
  }
`;

function App() {
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("upcoming");
  const { loading, error, data } = useQuery(LOAD_CRIC, {
    variables: {
      type,
      status,
      page: 0
    }
  });

  const statusChange = status => {
    setStatus(status);
  };
  const typeChange = type => {
    setType(type);
  };

  return (
    <div className="ph3 relative bg-light-gray">
      <div className="pr0">
        <div className="black-70 f4 b db pt3 pb2">Schedule</div>
        <div className="flex flex-column flex-row-ns justify-between items-center">
          <div className="bg-white pt3 pl4 pr4 br2 overflow-hidden w-50-ns w-100">
            <div className="w-100 pa1 relative flex items-center justify-center">
              <span
                onClick={() => statusChange("upcoming")}
                className={
                  "black-20 pointer f7 fw6 pa2 w-100 tc ba b--black-10 br-0" +
                  (status === "upcoming" ? " bg-white red" : " bg-near-white")
                }
              >
                UPCOMING
              </span>
              <span
                onClick={() => statusChange("running")}
                className={
                  "black-20 pointer f7 fw6 pa2 w-100 tc ba b--black-10 br-0" +
                  (status === "running" ? " bg-white red" : " bg-near-white")
                }
              >
                RUNNING
              </span>
              <span
                onClick={() => statusChange("completed")}
                className={
                  "black-20 pointer f7 fw6 pa2 w-100 tc ba b--black-10 " +
                  (status === "completed" ? " bg-white red" : " bg-near-white")
                }
              >
                COMPLETED
              </span>
            </div>
          </div>
          <div className="flex justify-center items-center w-40-ns w-100">
            <div className="pt3 tc bg-white flex justify-around w-100">
              <span
                onClick={() => typeChange("all")}
                className={
                  "gray pointer f7 ph3 pv2 w-30 " +
                  (type === "all" ? "bb b--dark-red" : "")
                }
              >
                All
              </span>
              <span
                onClick={() => typeChange("international")}
                className={
                  "gray pointer f7 ph3 pv2 w-30 " +
                  (type === "international" ? "bb b--dark-red" : "")
                }
              >
                International
              </span>
              <span
                onClick={() => typeChange("domestic")}
                className={
                  "gray pointer f7 ph3 pv2 w-30 " +
                  (type === "domestic" ? "bb b--dark-red" : "")
                }
              >
                Domestic
              </span>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <p>loading.....</p>
      ) : error ? (
        <p>error...</p>
      ) : data && data.schedule.length > 0 ? (
        <div className="flex w-100 flex-column min-vh-100 bg-light-gray">
          <Matches data={data} />
        </div>
      ) : (
        <div>
          <p>no data</p>
        </div>
      )}
    </div>
  );
}

export default App;
