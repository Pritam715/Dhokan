<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    
    public function index()
    {
        $category = Category::get();

        return response([
            'category'=> $category
        ]);
    }

    public function updatePopularity($id)
    {
     
            
        $category=Category::find($id);
        if($category->popularity === 0)
        {
            $category->popularity= 1;
        }
        else
        {
            $category->popularity=0;
        }

        $category->save();

        return response([
            'message'=>'success'
        ]);


    }

    public function updateStatus($id)
    {
     
            
        $category=Category::find($id);
        if($category->status === 0)
        {
            $category->status= 1;
        }
        else
        {
            $category->status=0;
        }

        $category->save();

        return response([
            'message'=>'success'
        ]);


    }


    public function store(Request $request)
    {

    
        $data=$request->data;
        try{ 
            $category=Category::create([
                'name'=>$data['name'],
                'priority'=>$data['priority'],
                'slug'=>Str_slug($data['name'],'-'),
          
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
        $category= Category::where('id',$id)->first();
        return response([
            'message'=>'success',
            'category'=>$category,
        ]);
    }


    public function update(Request $request,$id)
    {      
        $data =  $request->data;
        try{ 
                                          
            $c=Category::find($id);
            $c->name = $data['name'];
            $c->priority=$data['priority'];
            $c->slug=Str_slug($data['name'],'-');
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
        $category=Category::find($id);
        $category->delete();
        $category->subcategory()->delete();
        $category->subsubcategory()->delete();
        return response([
            'message'=>'success',
            'category'=>$category,
        ]);
    }



}
