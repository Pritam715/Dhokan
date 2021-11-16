<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SubCategory;
use App\Models\SubSubCategory;

class Category extends Model
{
    use HasFactory;

    protected $table='categories';

    protected $guarded = [];
    // protected $fillable=[
    //     'name',
    //     'priority',
    // ];
    public function subcategory()
    {
        return $this->hasMany(SubCategory::class,'category_id');

    }
    // public function navsubsubcategory()
    // {
    //     return $this->hasMany(SubSubCategory::class,'sub_category_id','id');
    // }


    public function subsubcategory()
    {
          return $this->hasMany(SubSubCategory::class,'category_id');
    }

    public function product()
    {
        return $this->hasMany(Product::class,'category_id')->inRandomOrder()->take(10);
    }
}
