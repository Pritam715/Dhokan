<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Deals;

class ProductDiscount extends Model
{
    use HasFactory;
    protected $table='product_discounts';
    protected $guarded=[];


    public function deals()
    {
        return $this->belongsTo(Deals::class,'deal_id');
    }

}
