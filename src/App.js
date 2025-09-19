import {useState} from "react";

function SearchBar({filterText , inStock ,onFilterTextChange ,onInStockChange}) {
  return (
      <>
          <form>
        <input type="text"  value={filterText} placeholder="Search..." onChange={(e)=>onFilterTextChange(e.target.value)}/>
          <label>
              <input type="checkbox" checked={inStock} onChange={(e)=>onInStockChange(e.target.checked)}/> Only show products in stock
          </label>
          </form>
      </>
      )

}

function ProductTable({products , filterText ,inStock}) {
    let rows = []
    let lastItem = null
    products.forEach(product=> {
        if (
            product.name.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ) {
            return;
        }
        if (inStock && !product.stocked) {
            return;
        }
        if(product.name !== lastItem){
        rows.push(<ProductCategoryRow  key={`category-${product.category}`} category={product.category}/>)
    }

        rows.push(<ProductRow key={`product-${product.name}`}  product={product}/> )
            lastItem = product.category

    })
    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

function ProductCategoryRow({ category }) {
    return (
        <tr>
            <th colSpan="2">{category}</th>
        </tr>
    );
}


function ProductRow({ product }) {
    return (
        <tr>
            <td>{product.name}</td>
            <td>{product.price}</td>
        </tr>
    );
}


function FilterableProductTable({products}) {
    const [filterText , setFilterText] = useState('')
    const [inStock , setInStock] = useState(false)

  return (
      <>
        <SearchBar filterText={filterText} inStock={inStock} onFilterTextChange={setFilterText}
                   onInStockChange={setInStock}/>
        <ProductTable products={products} filterText={filterText} inStock={inStock} />
      </>
      )

}

export default function App() {
  return (
    <div>
      <FilterableProductTable products={PRODUCTS}/>
    </div>
  );
}


const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];