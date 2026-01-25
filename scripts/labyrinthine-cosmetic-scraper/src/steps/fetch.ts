import fetch from 'node-fetch';

export const fetchCosmeticsPage = async () => {
  const response = await fetch('https://labyrinthine.fandom.com/wiki/Customisation');
  return response.text();
};
