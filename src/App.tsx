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
  return +(hours + minutes / 60).toFixed(3);
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

const Table = () => {
  const numberOfWeeks = 1;
  const weeks = Array(numberOfWeeks).fill(2);
  const [values, setValues] = useState(
    weeks.flatMap(() => [0, 0, 0, 0, 0, 0, 0])
  );
  const onChange = (index: number, newValue: number) => {
    setValues(values.map((value, i) => (i === index ? newValue : value)));
  };
  const total = +values.reduce((p, v) => p + v, 0).toFixed(3)
  const overTime = +(total - 40).toFixed(3)
  const standard = overTime > 0 ? 40 : total
  return (
    <>
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
            {values.map((value, i) => (
              <td key={i}>{value}</td>
            ))}
            <th>Standard: {standard} {overTime > 0 ? `| Overtime: ${overTime}` : ''}</th>
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
