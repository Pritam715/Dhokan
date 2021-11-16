<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Deals;
use App\Models\ProductDiscount;
class ProductDiscountController extends Controller
{

    public function index($id)
    {
        $discount=ProductDiscount::where('product_id',$id)->orderBy('id','Desc')->first();
        return response([
             'discount'=>$discount
        ]);
    }
    

    public function getDeals()
    {
        $deals=Deals::where('status','1')->get();
        return response([
            'message'=>'success',
            'deals'=>$deals
        ]);
    }

    public function store(Request $request)
    {

        $data=$request->data;
        if($data['discount_id'] === null)
        {
            $deal=new ProductDiscount;
            $deal->product_id=$data['product_id'];
            $deal->deal_id=$data['deal_id'];
            $deal->save();

        }
        else{

            $deal=ProductDiscount::where(['id'=>$data['discount_id']])->update(['deal_id'=>$data['deal_id']]);
        
        }
  
        return response([
            'message'=>'success'
        ]);
    }
}
