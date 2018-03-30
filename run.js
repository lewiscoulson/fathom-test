let mappedCategories = [];

const makeCategoriesObject = (cat) => {
  const catArr = cat.split(' = ');

  return {
    id: catArr[0],
    name: catArr[1]
  };
}

const getLink = (_) => {
  return `<div><a href='http://www.netflix.com/browse/genre/${_.id}' target="_blank">${_.name}</a></div>`;
}

const updateResults = (results) => {
  let frag = '';
  results.forEach(_ => frag += getLink(_));
  document.getElementById('root').innerHTML = frag;
}

const setBindings = () => {
  document.getElementById('category-search').addEventListener('keyup', (e) => {
    let filteredCategories = mappedCategories.filter(_ => _.name.toLowerCase().includes(e.target.value.toLowerCase()));
    updateResults(filteredCategories);
  })
}

const getHTMLDoc = (htmlString) => {
  const parser = new DOMParser();
  return parser.parseFromString(htmlString, "text/html");
}

const getCategories = () => {
  fetch('/data.html')
    .then((response) => response.text())
    .then((htmlString) => {
      let categories = [];
      const paras = getHTMLDoc(htmlString).querySelectorAll('p');
      const hasParas = paras.length >= 1;

      if (hasParas) {
        paras.forEach(_ => _.textContent.includes(' = ') ? categories.push(_.innerHTML) : null);
      }

      mappedCategories = categories.map(makeCategoriesObject);

      updateResults(mappedCategories);
    });
}

const init = () => {
  getCategories();
  setBindings();
}

init();