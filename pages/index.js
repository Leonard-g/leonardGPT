import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/text-completions", {
      method: "POST",
      body: JSON.stringify({ prompt: `Parafrasea el siguiente texto: ${inputText}` }),
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      console.log({ responseText: data.choices[0].text });
      setResponseText(data.choices[0].text);
    } else {
      setResponseText("No se encontró ninguna respuesta");
    }

    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="header">
        <p>Sigueme en Instagram @gleonard.py</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="text-boxes">
          <div className="text-box">
            <label htmlFor="input-text">Escribe:</label>
            <textarea
              id="input-text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Escriba su texto aquí"
              style={{ height: "300px", width: "100%", padding: "12px", fontSize: "1.2rem", borderRadius: "6px", border: "2px solid #0070f3", backgroundColor: "#ffffff", color: "#333333" }}
            />
          </div>
          <div className="text-box">
            <label htmlFor="output-text">Resultado:</label>
            <textarea
              id="output-text"
              value={responseText}
              readOnly
              placeholder="..."
              style={{ height: "300px", width: "100%", padding: "12px", fontSize: "1.2rem", borderRadius: "6px", border: "2px solid #0070f3", backgroundColor: "#ffffff", color: "#333333" }}
            />
          </div>
        </div>
        <div className="button-container">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Consultar"}
          </button>
          <button className="button-clear" type="button" onClick={() => {
            setInputText("");
            setResponseText("");            
          }}>
            Limpiar
          </button>
        </div>
      </form>

      <style jsx>{`
  .header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: #333333;
  }  
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    max-width: 90vw;
    height: 100vh;
    background-color: #f2f8ff;
    border-radius: 16px;
    padding: 32px;
  }

  pre {
    white-space: pre-wrap;
    font-size: 1.2rem;
    font-weight: 600;
    font-family: "Roboto", sans-serif;
    margin-top: 1.5rem;
    color: #333333;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
  }

  .text-boxes {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .text-box {
    width: 48%;
    margin-bottom: 20px;
  }

  textarea {
    width: 100%;
    max-width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    margin-right: 10px;
    font-size: 1.2rem;
    font-weight: 600;
    font-family: "Roboto", sans-serif;
    background-color: #ffffff;
    color: #333333;
    border: 2px solid #0070f3;
    resize: vertical;
    height: 200px;
  }

  button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    background-color: #0070f3;
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 600;
    font-family: "Roboto", sans-serif;
    transition: background-color 0.2s ease;
    margin-top: 20px;
    width: 150px;
    margin-right: 10px;
  }

  button:hover {
    background-color: #0062c7;
  }

  .response-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin-top: 2rem;
  }

  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .button-wrapper button:first-child {
    animation: slideInFromLeft 0.5s ease-in-out;
    animation-delay: 0.2s;
    animation-fill-mode: forwards;
  }

  .button-wrapper button:last-child {
    animation: slideInFromLeft 0.5s ease-in-out;
    animation-delay: 0.4s;
    animation-fill-mode: forwards;
  }
      `}</style>
    </div>
  );
}
