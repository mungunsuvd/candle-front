export const TemplateProcessor = (text = "", data = {}) =>
  text
    .split(" ")
    .reduce(
      (p, n) => [
        ...p,
        ...(n.startsWith("{{") && n.endsWith("}}")
          ? [data[n.substring(2, n.length - 2)], " "]
          : [n, " "]),
      ],
      []
    );
