<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SubCategory;
use App\Models\Category;

class SubCategoryController extends Controller
{
    //

    public function  getcategory()
    {
        $category = Category::where('status',1)->get();

        return response([
            'category'=> $category
        ]);
    }

    public function index()
    {
        $subcategory = SubCategory::with('category')->get();

        return response([
            'subcategory'=> $subcategory
        ]);
    }

    public function updateStatus($id)
    {
     
            
        $subcategory=SubCategory::find($id);
        if($subcategory->status === 0)
        {
            $subcategory->status= 1;
        }
        else
        {
            $subcategory->status=0;
        }

        $subcategory->save();

        return response([
            'message'=>'success'
        ]);


    }


    public function store(Request $request)
    {

    
        $data=$request->data;
        try{ 
            $subcategory=SubCategory::create([
                'category_id'=>$data['category_id'],
                'subcategory_name'=>$data['subcategory_name'],
                'slug'=>Str_slug($data['subcategory_name'],'-'),
          
            ]);

            // $branch=Branch::select('id','name')->get();
            return response([
                'message'=> 'success'
            ]);
        }catch(\Exception $e){
            return response([
                'message'=>'error'
                
            ]);
        }
    }


    public function edit($id)
    {
        $subcategory= SubCategory::where('id',$id)->first();
        return response([
            'message'=>'success',
            'subcategory'=>$subcategory,
        ]);
    }

    public function update(Request $request,$id)
    {      
        $data =  $request->data;
        try{ 
                                          
            $c=SubCategory::find($id);
            $c->subcategory_name = $data['subcategory_name'];
            $c->category_id=$data['category_id'];
            $c->slug=Str_slug($data['subcategory_name'],'-');
            $c->save();
            return response([
                'message'=> 'success'
            ]);
        }catch(\Exception $e){
            return $e;
            return response([
                'message'=>'error'
            ]);
        }

    }

    public function  delete($id)
    {
        $subcategory=SubCategory::find($id);
        $subcategory->delete();
        $subcategory->subsubcategory()->delete();
        return response([
            'message'=>'success',
            'subcategory'=>$subcategory,
        ]);
    }


}
