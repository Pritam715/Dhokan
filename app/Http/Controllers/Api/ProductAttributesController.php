<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductAttributes;

class ProductAttributesController extends Controller
{

    public function index($id)
    {
        $attr=ProductAttributes::where('product_id',$id)->get();
        return response([
            'attr'=>$attr

        ]);
    }
    
    public function store(Request $request)
    {

        $data=$request->data;
        try{ 
            foreach($data['inputlist'] as $key=>$attr)
            {

                    $attribute=new ProductAttributes;
                    $attribute->product_id=$attr['product_id'];
                    $attribute->sku=strtoupper($attr['sku']);
                    $attribute->size=strtoupper($attr['size']);
                    $attribute->price=$attr['price'];
                    $attribute->stock=$attr['stock'];
                    $attribute->save();
                    
                
            }
  
            return response([
                'message'=> 'success',
                // 'attributes'=>$result  
              
            ]);




        }catch(\Exception $e){
            return response([
                'message'=>'error'
                
            ]);
        }

    }

    public function delete($id)
    {
        $attr=ProductAttributes::find($id);
        $attr->delete();
        return response([
             'message'=>'success'
        ]);
    }

    public function update(Request $request,$id)
    {
        $data=$request->data;
        try{ 
            foreach($data['inputlist'] as $key=>$attr)
            {
            
                // $attribute=ProductAttributes::find($id);
                // $attribute->product_id=$attr['product_id'];
                // $attribute->sku=strtoupper($attr['sku']);
                // $attribute->size=strtoupper($attr['size']);
                // $attribute->price=$attr['price'];
                // $attribute->stock=$attr['stock'];
                // $attribute->save();
                ProductAttributes::where(['id'=>$attr['id']])->update(['sku'=>strtoupper($attr['sku']),
                'size'=>strtoupper($attr['size']),'price'=>$attr['price'],'stock'=>$attr['stock']]);
            
                  
                    
                
            }
  
            return response([
                'message'=> 'success',
             
              
            ]);

        }catch(\Exception $e){
            return response([
                'message'=>'error',
                // 'attr'=>$attribute
                
            ]);
        }
         
    }
}
