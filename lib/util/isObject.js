export default function(element) {
  if (Object(element) === element) return true;
  return false;
}
