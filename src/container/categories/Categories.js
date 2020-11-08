import React, {useEffect, useState} from 'react';
import {large_data} from "../../utils/data";
import Pagination from "../../component/pagination/Pagination";
import Product from "../../component/product/Product";

const executeSearch = (searchText, allRecords) => {
  if (!searchText || !searchText.trim()) {
    return allRecords;
  }
  const idToRecord = {};
  const invertedIndex = {};
  const foundRecords = [];

  const countFoundObject = {};
  const foundRecordIds = [];
  allRecords.forEach(record => {
    if (record.id) {
      const nameWords = new Set(record.name.toLowerCase().trim().split(" "));
      nameWords.forEach(word => {
        if (invertedIndex[word]) {
          invertedIndex[word].push(record.id)
        } else {
          invertedIndex[word] = [record.id]
        }
      })
      idToRecord[record.id] = {...record};
    }
  })
  const searchTerms = new Set(searchText.toLowerCase().trim().split(" "));
  searchTerms.forEach(term => {
    if (invertedIndex[term]) {
      invertedIndex[term].forEach(id => {
        if (countFoundObject[id]) {
          countFoundObject[id] += 1;
        } else {
          countFoundObject[id] = 1;
        }
      })
    }
  })
  Object.keys(countFoundObject).forEach(obj => {
    if (countFoundObject[obj] === searchTerms.size) {
      foundRecordIds.push(obj)
    }
  })

  foundRecordIds.forEach(id => {
    if (idToRecord[id]) {
      foundRecords.push(idToRecord[id]);
    }
  });

  return foundRecords;
}

const pageSize = 2;

function Categories() {
  const [products, setProducts] = useState(large_data);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  console.log('pageIndex', pageIndex)

  useEffect(() => {
    setPaginatedProducts([...products].splice(pageIndex * pageSize, pageSize))
  }, [products, pageIndex])

  const handleChangeText = e => {
    const {value} = e.target;
    setTextSearch(value);
    setProducts(executeSearch(value, large_data));
  }
  const handlePageChange = e => {
    console.log('page change', e)
    setPageIndex(e.selected)
  }

  console.log('paginatedProducts', paginatedProducts)
  return (
    <div>
      <input name="input" value={textSearch} onChange={handleChangeText}/>
      <div>
        {paginatedProducts.map((el) => {
          return <Product data={el} key={el.id} highlights={textSearch}/>
        })}
        <Pagination
          style={{position: 'absolute', bottom: 0}}
          pageCount={Math.ceil(products.length / pageSize)}
          onPageChange={handlePageChange}/>
      </div>
    </div>
  );
}

export default Categories;
