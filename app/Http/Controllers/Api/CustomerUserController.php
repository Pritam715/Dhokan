<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CustomerUser;
use Hash;
use App\Notifications\SendEmail;
use Illuminate\Support\Facades\Mail;
use Notification;

class CustomerUserController extends Controller
{
    

    public function signup(Request $request)
    {
        $data=$request->data;
        try{

            $verifyemail=CustomerUser::where('email',$data['email'])->first();
            $verifynumber=CustomerUser::where('mobile_no',$data['mobile_no'])->first();

            if($verifyemail)
            {
                return response([
                    'emailerror'=>'Email Already Exists!',  
                ]);
            }
            else if($verifynumber)
            {
                return response([
                    'mobileerror'=>'Mobile No Already Exists!',  
                ]);
            }
            else{
                
            $customer=new CustomerUser;
            $customer->name=$data['username'];
            $customer->email=$data['email'];
            $customer->mobile_no=$data['mobile_no'];
            $customer->password=Hash::make($data['password']);
            $customer->token_activation=str_random(6);
            $customer->save();
            Notification::route('mail', $data['email'])->notify(new SendEmail($customer));

            // $customer=CustomerUser::create([
            //     'name'=>$data['username'],
            //     'email'=>$data['email'],
            //     'mobile_no'=>$data['mobile_no'],
            //     'password'=>Hash::make($data['password']),
            //     'token_activation'=>str_random(6)
          
            // ]);
            return response([
                'message'=>'success',  
            ]);


            }



        }
    
        catch(\Exception $e){
            return response([
                'message'=>'error'
                
            ]);
        }
    }


    public function verify(Request $request)
    {
        $data=$request->data;
        try
        {
            $verify=CustomerUser::where('email',$data['email'])->first();
            if($verify->token_activation == $data['otp'])
            {
                $verify->isVerified = 1;
                $verify->save();
                $tokenResult = $verify->createToken('Personal Access Token');
                $token = $tokenResult->token;
                $token->save();
           
                return response([
                    'message'=>'success',
                    'token' => $tokenResult->accessToken,
                    'user'=> $verify,
                ]);

            }
  
        }
        catch(\Exception $e){
            return response([
                'message'=>'error'
                
            ]);
        }

    }



    public function signin(Request $request)
    {
        $data=$request->data;
        try
        {

            if(is_numeric($data['emailormobile'])){

                $verify=CustomerUser::where('mobile_no',$data['emailormobile'])->first();
  
                      if($verify)
                      {
                          if($verify && Hash::check($data['password'], $verify->password)){
                              $tokenResult = $verify->createToken('Personal Access Token');
                              $token = $tokenResult->token;
                              $token->save();
                         
                              return response([
                                  'message'=>'success',
                                  'token' => $tokenResult->accessToken,
                                  'user'=> $verify,
                          
                              ]);
                          }else{
                              return response([
                                  'errormessage'=>'Password doesnot match !'
                              ]);
                          }
                      }
                      else{
                        return response([
                            'errormessage'=>'Mobile Number Doesnot exist!'
                        ]);
                      }
          

     
              }

              elseif (filter_var($data['emailormobile'], FILTER_VALIDATE_EMAIL)) {

                $verify=CustomerUser::where('email',$data['emailormobile'])->first();
                if($verify)
                {
                    if($verify && Hash::check($data['password'], $verify->password)){
                        $tokenResult = $verify->createToken('Personal Access Token');
                        $token = $tokenResult->token;
                        $token->save();
                   
                        return response([
                            'message'=>'success',
                            'token' => $tokenResult->accessToken,
                            'user'=> $verify,
                    
                        ]);
                    }else{
                        return response([
                            'errormessage'=>'Password doesnot match !'
                        ]);
                    }
                }
                else{
                  return response([
                      'errormessage'=>'Email Doesnot exist!'
                  ]);
                }
    


              }
              else{
                return response([
                    'errormessage'=>'Invalid Email Or Mobile Number!'
                ]);
              }

   
             
       
        }
        catch(\Exception $e){
            return response([
                'message'=>'error'
                
            ]);
        }
    }



    public function resend(Request $request)
    {
        $data=$request->data;
        try{
            if(is_numeric($data['emailormobile'])){

                $verify=CustomerUser::where('mobile_no',$data['emailormobile'])->first();
  
                      if($verify)
                      {
                        
                              return response([
                                  'message'=>'success',
                              ]);
                        
                      }
                      else{
                        return response([
                            'errormessage'=>'Mobile Number Doesnot exist!'
                        ]);
                      }
          

     
              }

              elseif (filter_var($data['emailormobile'], FILTER_VALIDATE_EMAIL)) {

                $verify=CustomerUser::where('email',$data['emailormobile'])->first();
                if($verify)
                {
                    Notification::route('mail', $data['emailormobile'])->notify(new SendEmail($verify));

                        return response([
                            'message'=>'success',
                        ]);
                  
                }
                else{
                  return response([
                      'errormessage'=>'Email Doesnot exist!'
                  ]);
                }
    


              }
              else{
                return response([
                    'errormessage'=>'Invalid Email Or Mobile Number!'
                ]);
              }

        }
        catch(\Exception $e)
       {

       }
    }
}
