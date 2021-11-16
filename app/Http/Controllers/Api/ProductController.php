<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\SubSubCategory;
use App\Models\Product;
use Image;
class ProductController extends Controller
{
    

    public function  getcategory()
    {
        $category = Category::where('status',1)->get();

        return response([
            'category'=> $category
        ]);
    }

    public function getSubSubCategory($id)
    {

         $subsubcategory=SubSubCategory::where('sub_category_id',$id)->where('status',1)->get();
         return response([
             'message'=>'success',
             'subsubcategory'=>$subsubcategory,
         ]);
    }


    public function index()
    {
        $product = Product::with('category')->with('subcategory')->with('subsubcategory')->orderBy('id','Desc')->get();
        return response([
            'message'=>'success',
            'product'=> $product
        ]);
    }


    public function updateStatus($id)
    {
     
            
        $product=Product::find($id);
        if($product->status === 0)
        {
            $product->status= 1;
        }
        else
        {
            $product->status=0;
        }

        $product->save();

        return response([
            'message'=>'success'
        ]);


    }



    public function productdetails($id)
    {
           $productdetails=Product::where('id',$id)->with('category')->with('subcategory')->with('subsubcategory')->first();
            return response([
                'product_details'=>$productdetails
            ]);
     
        }
    
    public function store(Request $request)
    {

    
        $data=$request->data;
        try{ 
       
           
            $product=new Product;
            $product->category_id=$data['categoryid'];
            $product->subcategory_id=$data['subcategoryid'];
            $product->sub_subcategory_id=$data['subsubcategoryid'];
            $product->product_name=$data['product_name'];
            $product->slug=Str_slug($data['product_name'],'-');
            $product->product_price=$data['product_price'];
            $product->product_description=$data['product_description'];
            if($data['clothing_product']=='true')
            {
                $product->clothing_product=1;
            }
            else{
                
                $product->clothing_product=0;
            }
            
   
       
       

            if($data['image'])
            {
            $file=$data['image'];

            list($imgType, $imgBase64) = explode(';', $file);
            list(, $imgBase64) = explode(',', $imgBase64);
            $fileName =str_random(10) . '.png';
            $path = public_path() . "/Images/Products/" . $fileName;
       

            file_put_contents($path,base64_decode($imgBase64) );

            $image = Image::make($path)->resize(1200, 1000);
            $image=$image->save($path);

            $product->image=$fileName;

            }
            $product->save();
            return response([
                'message'=> 'success',
                // 'product'=>$product
            ]);
        }catch(\Exception $e){
            return response([
                'message'=>'error'
                
            ]);
        }
    }


    public function update(Request $request,$id)
    {
        
        $data=$request->data;
        try{ 
       
           
            $product=Product::find($id);
  
                $product->category_id=$data['categoryid'];
                $product->subcategory_id=$data['subcategoryid'];
                $product->sub_subcategory_id=$data['subsubcategoryid'];
                $product->product_name=$data['product_name'];
                $product->slug=Str_slug($data['product_name'],'-');
                $product->product_price=$data['product_price'];
        
                $product->product_description=$data['product_description'];
            if($data['clothing_product']=='true' && $data['clothing_product']== 1 )
            {
                $product->clothing_product=1;
            }
            else{
                
                $product->clothing_product=0;
            }
            
   
       
       

            if($data['image'])
            {
            $file=$data['image'];

            list($imgType, $imgBase64) = explode(';', $file);
            list(, $imgBase64) = explode(',', $imgBase64);
            $fileName =str_random(10) . '.png';
            $path = public_path() . "/Images/Products/" . $fileName;
       

            file_put_contents($path,base64_decode($imgBase64) );

            $image = Image::make($path)->resize(1200, 1000);
            $image=$image->save($path);

            $product->image=$fileName;

            }
            $product->save();
            return response([
                'message'=> 'success',
                'product'=>$product
            ]);
        }catch(\Exception $e){
            return response([
                'message'=>'error'
                
            ]);
        }
    }


    public function  delete($id)
    {
        $p=Product::find($id);
        $p->delete();
     
        return response([
            'message'=>'success',
        
        ]);
    }


}
