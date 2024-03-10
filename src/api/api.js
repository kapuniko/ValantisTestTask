import md5 from 'md5';

const API_URL = 'https://api.valantis.store:41000/';
const PASSWORD = 'Valantis';

const generateAuthString = () => {
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return md5(`${PASSWORD}_${timestamp}`);
};

const fetchAPI = async (params) => {
  try {
    const authString = generateAuthString();
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': authString
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from API');
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

const fetchProductDetails = async (ids) => {
  try {
    const uniqueIds = Array.from(new Set(ids)); // Ensure unique ids
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': md5(`${PASSWORD}_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`)
      },
      body: JSON.stringify({
        action: 'get_items',
        params: { ids: uniqueIds }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export { fetchAPI, fetchProductDetails };