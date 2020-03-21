// export const colorScheme = [
//   '#cf3c3c', // red
//   '#cf6d3c', // orange
//   '#ce9d3b', // gold
//   '#cece3b', //yellow
//   '#9dce3b', //lime green
//   '#6cce3b', // bright green
//   '#3bce6c', //green
//   '#3bce9d', //sea green
//   '#3bcece', //turquoise
//   '#3b9dce', // light blue
//   '#3b6cce', //blue
//   '#3b3bce', // royal blue
//   '#6c3bce', // Indigo purple
//   '#9d3bce', // purple
//   '#ce3bce', //fucshia
//   '#ce3b89', //magenta
// ];

export const colorSchemeHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  }

  return color;
};
