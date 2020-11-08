import React, {useEffect, useState} from 'react';
import {large_data} from "../../utils/data";
import Pagination from "../../component/pagination/Pagination";
import Product from "../../component/product/Product";
import useDebounce from "../../utils/useDebounce";
import "./Categories.css"

// more explain in readme
const executeSearch = (searchText, allRecords) => {
  if (!searchText || !searchText.trim()) {
    return allRecords;
  }
  const idToRecord = {};
  const invertedIndex = {};
  const foundRecords = [];

  const countFoundObject = {};
  const foundRecordIds = [];

  //Step 1: create invertedIndex and idToRecord from array input
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

  //Step 2: split and lowerCase searchTerms
  const searchTerms = new Set(searchText.toLowerCase().trim().split(" "));

  //Step 3 & 4:
  // loop searchTerms to find match keys in invertedIndex
  // Merge value of item and get foundRecordIds
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
  //Step 5: from ids return records
  foundRecordIds.forEach(id => {
    if (idToRecord[id]) {
      foundRecords.push(idToRecord[id]);
    }
  });

  //Result
  return foundRecords;
}

//fixed 10 item per page
const pageSize = 10;

function Categories() {
  const [products, setProducts] = useState(large_data);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);

  // custom hooks useDebounce  can avoid execute too frequently search function
  // delay 500ms
  const debouncedSearchTerm = useDebounce(textSearch, 500);
  useEffect(() => {
      if (debouncedSearchTerm) {
        setProducts(executeSearch(debouncedSearchTerm, large_data));
      } else {
        setProducts(large_data);
      }
    },
    [debouncedSearchTerm]
  );
  console.log('paginatedProducts',paginatedProducts)

  // watching pageIndex and products change and update paginatedProducts
  useEffect(() => {
    setPaginatedProducts([...products].splice(pageIndex * pageSize, pageSize));
  }, [products, pageIndex])

  const handleChangeText = e => {
    const {value} = e.target;
    setTextSearch(value);
    setPageIndex(0);
  }

  const handlePageChange = e => {
    setPageIndex(e.selected);
  }

  return (
    <div className="min-vh-70 pt-3">
      <div className="text-center">
        <input
          name="input"
          className="w-75"
          value={textSearch}
          placeholder="Type to search ..."
          onChange={handleChangeText}/>
      </div>
      <div className="pt-3 pb-3 list-product">
        {paginatedProducts.map((el) => {
          return <Product data={el} key={el.id} highlights={textSearch}/>
        })}
      </div>
      {paginatedProducts.length > 0 ?
        <Pagination
          pageCount={Math.ceil(products.length / pageSize)}
          onPageChange={handlePageChange}
        /> :
        <div>Not found</div>}
    </div>
  );
}

export default Categories;
