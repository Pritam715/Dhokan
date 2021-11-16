<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Hash;

class UserController extends Controller
{
    public function login(Request $request)
    {

     
        try{
            $user = User::where('email',$request->email)->first();
            if($user && Hash::check($request->password, $user->password)){
                $tokenResult = $user->createToken('Personal Access Token');
                $token = $tokenResult->token;
                $token->save();
           
                return response([
                    'message'=>'Login Success !',
                    'token' => $tokenResult->accessToken,
                    'user'=> $user,
            
                ]);
            }else{
                return response([
                    'message'=>'Credentials doesnot match !'
                ]);
            }
           
        }catch(\Exception $e){
            return response([
                'message'=>'Login Failed'
            ]);
        }
    }
}
