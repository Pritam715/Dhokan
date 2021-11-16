<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Deals;

class DealController extends Controller
{

    public function index()
    {
        $deals = Deals::orderBy('id','Desc')->get();

        return response([
            'deals'=> $deals
        ]);
    }

    public function updateStatus($id)
    {
     
            
        $deals=Deals::find($id);
        if($deals->status === 0)
        {
            $deals->status= 1;
        }
        else
        {
            $deals->status=0;
        }

        $deals->save();

        return response([
            'message'=>'success'
        ]);


    }

    
    public function store(Request $request)
    {

    
        $data=$request->data;
        try{ 
            $category=Deals::create([
                'name'=>$data['name'],
                'discount'=>$data['discount'],
                'slug'=>Str_slug($data['name'],'-'),
          
            ]);

       
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
        $deals= Deals::where('id',$id)->first();
        return response([
            'message'=>'success',
            'deals'=>$deals,
        ]);
    }


    public function update(Request $request,$id)
    {      
        $data =  $request->data;
        try{ 
                                          
            $d=Deals::find($id);
            $d->name = $data['name'];
            $d->discount=$data['discount'];
            $d->slug=Str_slug($data['name'],'-');
            $d->save();
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
        $d=Deals::find($id);
        $d->delete();

        return response([
            'message'=>'success',

        ]);
    }


}
