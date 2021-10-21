module.exports = function footerLinks(list) {
  const links = list.filter(link => link.footer);
  const halfAmount = Math.ceil(links.length / 2);

  const firstHalf = links.slice(0, halfAmount);
  const secondHalf = links.slice(-halfAmount);

  return [firstHalf, secondHalf];
};
