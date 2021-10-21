module.exports = function commentFormat(comment) {
  return comment
    .split('\n')
    .map(line => {
      if (line.trim()) {
        // 6 spaces
        return `      ${line}`;
      }

      return line;
    })
    .join('\n');
};
