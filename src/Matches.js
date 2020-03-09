import React from "react";

function Matches({ data }) {
  return (
    <div>
      <section className="mt3">
        <div className="w-100 db flex flex-wrap">
          {data.schedule.map(data => (
            <div className="w-50-ns w-100-m w-100 mb3 ">
              <div className="mr3 bg-white br2 pointer helvetica">
                <div className="flex justify-between items-center pa3 bg-white">
                  <span className="f7 fw5">{data.seriesName}</span>
                  <span className="f7 gray mr2"> ❯ </span>
                </div>
                <div className="mh3 pb2">
                  <p className="ma0 mv3 f7 fw5">
                    {data.matchNumber}.{data.venue}
                  </p>
                  {data.matchScore.map(team => (
                    <div className="flex mb2">
                      <div className="flex w-40 flex-column justify-center items-evenly">
                        <div className="flex">
                          <img
                            className="h1 w15 shadow-4"
                            src={`https://images.cricket.com/teams/${team.teamID}_flag.png`}
                          ></img>
                          <span className="pl3 w-50 f6 fw5">
                            {team.teamShortName}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div class="flex justify-center">
                    <span class="w-50 f7 v-mid pa1 br4 f8 fw5 tc gray bg-washed-red  mt1  truncate">
                      {new Date(Number(data.startDate)).toDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Matches;
