export default function NavIcon({ img }) {
  if (!img) {
    img = "../img/default.png";
  }
  return (
    <img src={img} alt="Länk ikon" />
  );
}