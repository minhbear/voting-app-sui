export function formatUnixTimestamp(timestampSec: number) {
  if (isUnixTimeExpired(timestampSec)) {
    return "Expired";
  }

  const date = new Date(timestampSec * 1000);

  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return formattedDate;
}

export function isUnixTimeExpired(unixTimeSec: number) {
  return new Date(unixTimeSec * 1000) < new Date();
}
