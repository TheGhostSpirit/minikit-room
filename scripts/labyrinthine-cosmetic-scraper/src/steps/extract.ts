import { JSDOM } from 'jsdom';

export const extractData = (html: string) => {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const tableRowsQuery = document.querySelectorAll('#tpt-1 tbody');
  const tableRows = [...tableRowsQuery.values()];
  console.log(tableRows[0].childNodes);
  return tableRows;
  // return [...tableRows].map(e => {
  //   return {
  //     id: 0,
  //     type: '',
  //     source: '',
  //     icon: ''
  //   };
  // });
};
