const getPlatformAvatarColour = (platformId: number) => {
  switch (platformId) {
    case 1:
      return "white";
    case 2:
      return "yellow";
    case 3:
      return "#292929";
    case 4:
      return "white";
    case 5:
      return "white";
    case 6:
      return "white";
    case 7:
      return "white";
    case 8:
      return "#1c93e3";
    default:
      return "white";
  }
};
const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      color: "white",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};

export { getPlatformAvatarColour, stringAvatar };
