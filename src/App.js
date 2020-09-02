import React from "react";
import "./styles.css";

let ID = 0;
const DATA = [
  {
    id: ++ID,
    plate: "ES222XX",
    reason: "Guida in stato di ebbrezza"
  },
  {
    id: ++ID,
    plate: "ES222XX",
    reason: "Sosta vietata"
  },
  {
    id: ++ID,
    plate: "ES222XX",
    reason: "Attraversamento ZTL"
  },
  {
    id: ++ID,
    plate: "ES222XX",
    reason: "Eccesso di velocità"
  },
  {
    id: ++ID,
    plate: "ES222XX",
    reason: "Semaforo non rispettato"
  },
  {
    id: ++ID,
    plate: "ES222XX",
    reason: "Attraversamento ZTL"
  },
  {
    id: ++ID,
    plate: "ES222XX",
    reason: "Guida in stato di ebbrezza"
  }
];

export default function App() {
  const [
    selectedId, // State Value at current render cycle
    setSelectedId // State Updater (referentially stable)
    // setSelectedId( nextValue: number | null ) : void
  ] = React.useState(null);
  // useState( initialValue: number | null )

  return (
    <>
      <h1>Selected ID: {String(selectedId)}</h1>
      <CommitPolluter />
      <div className="App">
        {DATA.map((ticket) => (
          <TicketCardMemo
            key={ticket.id}
            id={ticket.id}
            plate={ticket.plate}
            reason={ticket.reason}
            selected={ticket.id === selectedId}
            onSelect={setSelectedId}
          />
        ))}
      </div>
    </>
  );
}

const TicketCardMemo = React.memo(TicketCard);

function TicketCard(props) {
  const {
    id,
    plate,
    reason,
    selected,
    // setSelectedId non va bene perché:
    // 1. è imperativo
    // 2. non fa capire che è una funzione
    // 3. non fa capire che è un event handler! (on#####!)
    // 4. non rispetta il least responsibility principle
    // onClick non va bene perché:
    // 1. troppo specifico!
    //    e se volessi associarlo ad altra interazione?!
    //    (meglio “onPress” ma non proprio)
    // 2. troppo generico non fa capire come usarlo
    // 3. HA UNA FIRMA DIVERSA DA onClick!!!
    onSelect
  } = props;

  wait(100);

  function handleClick() {
    onSelect(id);
  }

  return (
    <div
      onClick={handleClick}
      className="TicketCard"
      style={{
        background: selected
          ? "dodgerblue"
          : undefined
      }}
    >
      <h3>{plate}</h3>
      <p>{reason}</p>
    </div>
  );
}

function CommitPolluter() {
  /*const [, update] = React.useReducer(
    (s) => s + 1,
    0
  );

  React.useEffect(() => {
    const intervalId = setInterval(update, 400);

    return () => {
      clearInterval(intervalId);
    };
  }, []);*/

  return null;
}

function wait(ms) {
  const was = performance.now();

  while (true) {
    if (performance.now() - was > ms) {
      break;
    }
  }
}
