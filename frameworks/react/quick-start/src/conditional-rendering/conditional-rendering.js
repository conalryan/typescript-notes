function ConditionalRendering() {

  let content;
  let isLoggedIn = false;

  if (isLoggedIn) {
    // content = <AdminPanel />;
    content = `logged in`;
  } else {
    // content = <LoginForm />;
    content = `logged out`;
  }
  return (
    <div className="conditional-rendering">
      <h3>Conditional Rendering</h3>
      <div>
        { content }
      </div>
    </div>
  );
}

export default ConditionalRendering;