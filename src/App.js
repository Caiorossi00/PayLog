import React, { useState, useEffect } from "react";
import "./App.css";

function TimeCalculatorApp() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [hoursWorked, setHoursWorked] = useState(null);
  const [totalPay, setTotalPay] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    calculateTotalPay();
  }, [hoursWorked]);

  const calculateHoursWorked = () => {
    const startHour = parseInt(startTime.split(":")[0]);
    const startMinute = parseInt(startTime.split(":")[1]);
    const endHour = parseInt(endTime.split(":")[0]);
    const endMinute = parseInt(endTime.split(":")[1]);

    if (
      isNaN(startHour) ||
      isNaN(startMinute) ||
      isNaN(endHour) ||
      isNaN(endMinute) ||
      startHour > endHour ||
      (startHour === endHour && startMinute >= endMinute)
    ) {
      setErrorMessage(
        "Horários inválidos. A saída deve ser posterior à entrada."
      );
      setHoursWorked(null);
      setTotalPay(null);
      return;
    }

    let hours = endHour - startHour;
    let minutes = endMinute - startMinute;

    if (minutes < 0) {
      hours--;
      minutes += 60;
    }

    setHoursWorked(hours + minutes / 60);
    setErrorMessage("");
  };

  const calculateTotalPay = () => {
    if (hoursWorked && hourlyRate) {
      setTotalPay(hoursWorked * hourlyRate);
    } else {
      setTotalPay(null);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="input-boxes">
          <input
            type="time"
            placeholder="Entrada"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="time"
            placeholder="Saída"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <input
            type="number"
            placeholder="Valor/Hora"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
          />
          <button onClick={calculateHoursWorked}>Calcular</button>
        </div>
        <div className="results">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {hoursWorked !== null && (
            <p>Horas trabalhadas: {hoursWorked.toFixed(2)}</p>
          )}
          {totalPay !== null && <p>Valor total: R$ {totalPay.toFixed(2)}</p>}
        </div>
      </div>
    </div>
  );
}

export default TimeCalculatorApp;
