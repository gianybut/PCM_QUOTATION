import React from 'react'

const ProductModal = () => {
  return (
    <div className='flex'>
      <label htmlFor="">Product Name</label>
      <input type="text" placeholder='Enter Product Name' />

      <label htmlFor="">Product Type</label>
      <select name="productType" id="">
        <option value="perfume">PERFUME</option>
        <option value="carDiffuser">CAR DIFFUSER</option>
        <option value="alcohol">ALCOHOL</option>
        <option value="dishWasher">DISH WASHER</option>
        <option value="cologne">COLOGNE</option>
        <option value="fabCon">FABRIC CONDITIONER</option>
        <option value="handSoap">HAND SOAP</option>
        <option value="miscellaneous">MISCELLANEOUS</option>
      </select>

      <label htmlFor="">Product Sizes</label>
      <input type="number" />
      <select name="units" id="">
        <option value="ml">ml</option>
        <option value="liters">Liters</option>
        <option value="gallons">gal</option>
        <option value="grams">g</option>
      </select>

      <label htmlFor="">Product Prices</label>
      <input type="number" />


    </div>
  )
}

export default ProductModal
