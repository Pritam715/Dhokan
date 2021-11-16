<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;

class CustomerUser extends Model
{
    use HasFactory,HasApiTokens;
    protected $table='customer_users';
   
    protected $guarded = [];
}
