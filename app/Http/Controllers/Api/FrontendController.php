<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\SubSubCategory;
use App\Models\Product;
use App\Models\ProductAttributes;
class FrontendController extends Controller
{
    //Header
    public function getNavCategories()
    {
        $categories=Category::with('subcategory','subcategory.subsubcategory')->where('status',1)->get();
 
        return response([
            'categories'=>$categories
        ]);
    }

    //Home

    public function categorieswithproducts()
    {
        $categorieswithproducts=Category::with('subcategory')->with('subsubcategory')->with('product')->inRandomOrder()->take(6)->get();
        return response([
            'categorieswithproducts'=>$categorieswithproducts
        ]);
    }

    //Product Info
    public function productinfo($slug)
    {
        $product=Product::where('slug',$slug)->with('category')->with('subcategory')->with('subsubcategory')->with('attr')->with('discount.deals')->first();
        return response([
            'product'=>$product
        ]);
    }

    public function getpricewithsku($id)
    {
        $product=ProductAttributes::find($id);
        return response([
            'price'=>$product->price,
            'sku'=>$product->sku,
            'size'=>$product->size
        ]);
    }

    //Shop

    public function getAllProducts()
    {
        $products=Product::get();
        return response([
            'allProducts'=>$products
        ]);
    }

    public function getCategoryProducts($id)
    {
        $allproduct=Product::Where('category_id',$id)->inRandomOrder()->get();
        return response([
           'allProducts'=> $allproduct

        ]);
    }
    public function getSubCategoryProducts($id)
    {
        $allproduct=Product::Where('subcategory_id',$id)->inRandomOrder()->get();
        return response([
           'allProducts'=> $allproduct

        ]);
    }
    public function getSubSubCategoryProducts($id)
    {
        $allproduct=Product::Where('sub_subcategory_id',$id)->inRandomOrder()->get();
        return response([
           'allProducts'=> $allproduct

        ]);
    }


    //Search
    public function getSearchProducts($search)
    {
            $products=Product::where('product_name', 'LIKE', "%{$search}%")->orWhere('product_description','LIKE',"%{$search}%")->get();
            return response([
                'searchProducts'=>$products
            ]);
    }
}
