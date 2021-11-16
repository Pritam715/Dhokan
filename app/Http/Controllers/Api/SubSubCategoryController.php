<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\SubSubCategory;
class SubSubCategoryController extends Controller
{
    

    public function index()
    {
        $subsubcategory = SubSubCategory::with('category')->with('subcategory')->get();

        return response([
            'subsubcategory'=> $subsubcategory
        ]);
    }

    public function  getcategory()
    {
        $category = Category::where('status',1)->get();

        return response([
            'category'=> $category
        ]);
    }

    public function getSubcategory($id)
    {

         $subcategory=SubCategory::where('category_id',$id)->where('status',1)->get();
         return response([
             'message'=>'success',
             'subcategory'=>$subcategory,
         ]);
    }


    public function updateStatus($id)
    {
     
            
        $subcategory=SubSubCategory::find($id);
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
            $subcategory=SubSubCategory::create([
                'category_id'=>$data['category_id'],
                'sub_category_id'=>$data['sub_category_id'],
                'sub_subcategory_name'=>$data['sub_subcategory_name'],
                'slug'=>Str_slug($data['sub_subcategory_name'],'-'),
          
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
        $subsubcategory= SubSubCategory::where('id',$id)->first();
        return response([
            'message'=>'success',
            'subsubcategory'=>$subsubcategory,
        ]);
    }

    public function update(Request $request,$id)
    {      
        $data =  $request->data;
        try{ 
                                          
            $c=SubSubCategory::find($id);
            $c->category_id = $data['category_id'];
            if($data['sub_category_id'])
            {
                $c->sub_category_id=$data['sub_category_id'];
            }
      
            $c->sub_subcategory_name=$data['sub_subcategory_name'];
            $c->slug=Str_slug($data['sub_subcategory_name'],'-');
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
        $s=SubSubCategory::find($id);
        $s->delete();
        return response([
            'message'=>'success',
            'subsubcategory'=>$s,
        ]);
    }


}
