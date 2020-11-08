import React, {useEffect, useState} from 'react';
import {large_data} from "../../utils/data";
import Pagination from "../../component/pagination/Pagination";
import Product from "../../component/product/Product";
import "./Categories.css"

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

const pageSize = 10;

function Categories() {
  const [products, setProducts] = useState(large_data);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    setPaginatedProducts([...products].splice(pageIndex * pageSize, pageSize))
  }, [products, pageIndex])

  const handleChangeText = e => {
    const {value} = e.target;
    setTextSearch(value);
    setPageIndex(0);
    setProducts(executeSearch(value, large_data));
  }
  const handlePageChange = e => {
    setPageIndex(e.selected)
  }

  return (
    <div className="min-vh-70 pt-3">
      <div className="text-center">
        <input name="input" className="w-75" value={textSearch} placeholder="Type to search ..."
               onChange={handleChangeText}/>
      </div>
      <div className="pt-3 pb-3 list-product">
        {paginatedProducts.map((el) => {
          return <Product data={el} key={el.id} highlights={textSearch}/>
        })}
      </div>
      {paginatedProducts.length > 0 ? <Pagination
        pageCount={Math.ceil(products.length / pageSize)}
        onPageChange={handlePageChange}/> : <div>Not found</div>}

    </div>
  );
}

export default Categories;
