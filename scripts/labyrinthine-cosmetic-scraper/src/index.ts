import { extractData } from './steps/extract';
import { fetchCosmeticsPage } from './steps/fetch';

(async() => {

  const cosmeticsPage = await fetchCosmeticsPage();

  const data = extractData(cosmeticsPage);

  console.log(data);

})();
