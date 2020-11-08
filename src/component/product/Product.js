import React from 'react';

const renderHighLightString = (name, searchText) => {
  if (!searchText || !searchText.trim()) {
    return name;
  }
  const searchWords = searchText.trim().split(" ");
  const pattern = new RegExp(`(${searchWords.join('|')})`, 'gi');
  return name.replace(pattern, match => `<mark>${match}</mark>`)

}

function Product({data, highlights}) {
  return (
    <div>
      {data.id} --- <p dangerouslySetInnerHTML={{__html: renderHighLightString(data.name, highlights)}}/>
    </div>
  );
}

export default Product;
