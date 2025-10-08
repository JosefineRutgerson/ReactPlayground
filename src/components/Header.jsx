import bankLogo from "../img/bank.png";


export default function Header() {
  return (
    <header>
      <div className="header-left">
        <img src={bankLogo} alt="Logo" width="40" height="40" />
      </div>
      <div className="header-right">
        <p>My React playground</p>
      </div>
    </header>
  );
}