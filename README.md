#  Hiring Test - Software Engineer (Front-end) 
##  Catalog Application 

This is a simple page using the following technologies
- JavaScript Framework: ReactJS
- HTML/CSS

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements
Need Node.js installed on your environement.

### Node
    $ node --version
    v12.16.3

    $ npm --version
    6.14.6
    
## Install

    $ cd PROJECT
    $ npm install
    
## Start & watch
    $ npm start
    
    Runs the app in the development mode.
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
## Languages & dependencies
### JavaScript
- [React](http://facebook.github.io/react) is used for UI.
### Dependencies
- [Bootstrap](https://getbootstrap.com/)  CSS framework base
- [react-paginate](https://github.com/AdeleD/react-paginate) A ReactJS component that creates a pagination
  
##Explain main function
 * function```executeSearch```, have 5 steps: 
     - step 1: create 2 Map `invertedIndex` and `idToRecord`
        - invertedIndex:  contain all words in data name 
                Eg
                      ```
                             {
                              "acer": [123,124], 
                              "laptop": [123, 126],
                                ...
                             } 
                             ```
        - idToRecord: Object with structure 
                      ```
                             { 
                              "123": product_1, 
                              "125": product_2,
                               ...
                             } 
                        ```
     
     - Step 2: split and lowerCase searchTerms to ```recordIds```. E.g: "aCer LapToP" => searchTerms = [acer, laptop]
     - Step 3: execute the loop to search(searchTerms): use the ```invertedIndex``` to get all matching recordIds
        Output is with searchTerms `laptop acer` : 
                     ```
                        {
                            "acer": 123, 124, 126,
                            "laptop": 123, 124, 125
                        }
                    ```
     - Step 4: Merge value of item with keys `acer` and `laptop`. Result is `foundRecordIds` : [123,124]
     - Step 5: We have arrays `foundRecordIds`, use `idToRecord` to get list `foundRecords`
       
    - Result is **foundRecords**   
    
###Performant: 
 -  Convert Arrays to Map to decrease time complexity (form `O(n)` to `0(1)`)
 -  Limit or avoid loop in loop
 -  With case loop in a loop with searchTerms: the searchTerms is short array (from input user, split by white space ` ` ), it is not impacted too much to performant.
 -  User custom hook ```useDebounce``` to avoid execute too frequently function `executeSearch`. It's not necessary. Debounce will delay 500ms to execute search when user typing.
 
###Cons
 - Performant is bad when apply paging in client side, using `[...products].splice(argument)` with very large data is take up a lot of resources,
 - With very large data, need better the solution (split data search, move handle search to server,...)