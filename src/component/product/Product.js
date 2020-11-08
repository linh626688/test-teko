import React from 'react';

const renderHighLightString = (name, searchText) => {
  if (!searchText || !searchText.trim()) {
    return name;
  }
  const searchWords = searchText.trim().split(" ");
  const pattern = new RegExp(`(${searchWords.join('|')})`, 'gi');
  return name.replace(pattern, match => `<mark>${match}</mark>`)

}
const priceStyle = {fontWeight : 400, color: 'red'};

function Product({data, highlights}) {
  return (
    <div className="card">
      <img className="card-img-top" src={data.imageUrl} alt={data.id}/>
      <div className="card-body">
        <div className="card-text"><p dangerouslySetInnerHTML={{__html: renderHighLightString(data.name, highlights)}}/>
        </div>
        <div style={priceStyle}>$ {data.price}</div>
      </div>

    </div>
  );
}

export default Product;
