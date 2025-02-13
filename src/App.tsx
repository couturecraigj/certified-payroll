import { Fragment, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const turnHoursAndMinutesIntoHoursFloat = (value: string) => {
  const [hoursString, minutesString] = value.split(":");
  let hours = 0,
    minutes = 0;
  if (minutesString) {
    minutes = Number(minutesString);
  }
  if (hoursString) {
    hours = Number(hoursString);
  }
  return +(hours + minutes / 60).toFixed(4);
};

const Tr = ({
  onChange,
}: {
  onChange: (index: number, value: number) => void;
}) => {
  return (
    <Fragment>
      <td>
        <input
          onChange={(event) =>
            onChange(0, turnHoursAndMinutesIntoHoursFloat(event.target.value))
          }
        />
      </td>
      <td>
        <input
          onChange={(event) =>
            onChange(1, turnHoursAndMinutesIntoHoursFloat(event.target.value))
          }
        />
      </td>
      <td>
        <input
          onChange={(event) =>
            onChange(2, turnHoursAndMinutesIntoHoursFloat(event.target.value))
          }
        />
      </td>
      <td>
        <input
          onChange={(event) =>
            onChange(3, turnHoursAndMinutesIntoHoursFloat(event.target.value))
          }
        />
      </td>
      <td>
        <input
          onChange={(event) =>
            onChange(4, turnHoursAndMinutesIntoHoursFloat(event.target.value))
          }
        />
      </td>
      <td>
        <input
          onChange={(event) =>
            onChange(5, turnHoursAndMinutesIntoHoursFloat(event.target.value))
          }
        />
      </td>
      <td>
        <input
          onChange={(event) =>
            onChange(6, turnHoursAndMinutesIntoHoursFloat(event.target.value))
          }
        />
      </td>
    </Fragment>
  );
};

const buildDays = (
  values: number[]
): [number, number, number, Array<[number, number]>] => {
  const days: Array<[number, number]> = [];
  let total = 0;
  let standard = 0;
  let overtime = 0;
  for (const value of values) {
    if (overtime > 0) {
      days.push([0, value]);
      overtime = overtime + value;
      total = total + value;
      continue;
    }
    if (total + value > 40) {
      overtime = total + value - 40;
      days.push([value - overtime, overtime]);
      standard = 40;
      total = total + value;
      continue;
    }
    days.push([value, 0]);
    total = total + value;
    standard = standard + value;
  }
  return [total, standard, overtime, days];
};

const Table = () => {
  const numberOfWeeks = 1;
  const weeks = Array(numberOfWeeks).fill(2);
  const [values, setValues] = useState(
    weeks.flatMap(() => [0, 0, 0, 0, 0, 0, 0])
  );
  const onChange = (index: number, newValue: number) => {
    setValues(values.map((value, i) => (i === index ? newValue : value)));
  };

  const [total, standard, overTime, days] = buildDays(values);
  // const overTime = +(total - 40).toFixed(3);
  // const standard = overTime > 0 ? 40 : total;
  return (
    <>
      Total Hours {total}
      <table>
        <thead>
          <tr>
            {/* @ts-expect-error */}
            {weeks.map((v, i) => (
              <Fragment key={i}>
                <th>Sunday</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Total</th>
              </Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* @ts-expect-error */}
            {weeks.map((v, i) => (
              <Tr key={i} onChange={onChange} />
            ))}
          </tr>
          <tr>
            {days.map(([standard, overtime], i) => (
              <td key={i}>
                {!standard && !overtime ? (
                  ""
                ) : (
                  <>
                    <div>{`S: ${+standard.toFixed(3)}`}</div>
                    {overtime ?<div>{`${`O: ${+overtime.toFixed(3)}`}`}</div>:
                    null}
                  </>
                )}
              </td>
            ))}
            <th>
              Standard: {+standard.toFixed(3)}{" "}
              {overTime > 0 ? `| Overtime: ${+overTime.toFixed(3)}` : ""}
            </th>
          </tr>
        </tbody>
      </table>
    </>
  );
};

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Table />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
