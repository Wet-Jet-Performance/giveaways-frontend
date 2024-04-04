
const Giveaways = ({giveaways}) => {
  giveaways = giveaways.map((giveaway) => {
    return (<div key={giveaway.id}>
      <h4> {giveaway.name} </h4>
      <p> {giveaway.start_date} - {giveaway.end_date} </p>
    </div>
  )})

  return (
    <div>
      {giveaways}
    </div>
  );
};

export default Giveaways;
