function Interpolation() {
  let user = {
    name: 'Bob'
  };

  return (
    <div className="Interpolation">
      <h3>Interpolation</h3>
      {user.name}
    </div>
  );
}

export default Interpolation;